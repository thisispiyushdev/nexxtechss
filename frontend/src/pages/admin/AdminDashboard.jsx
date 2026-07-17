import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import adminApi from "@/lib/adminApi";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Trophy, 
  FileText, 
  BookOpen, 
  Users, 
  LogOut, 
  RefreshCw, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  XCircle,
  Menu,
  X,
  Megaphone,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function AdminDashboard() {
  const { isAuthenticated, loading, logout, role } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("leads");
  const [data, setData] = useState({ leads: [], reviews: [], stats: [], blogs: [], courses: [], users: [], banners: [], noidaBanners: [] });
  const [fetching, setFetching] = useState(false);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [leadCategory, setLeadCategory] = useState("all");
  const [leadSort, setLeadSort] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const didFetch = useRef(false);

  const isCoreAdmin = role === "core";

  const TABS = [
    ...(isCoreAdmin ? [
      { id: "leads", label: "All Leads", icon: ClipboardList, desc: "All Enquiries" },
      { id: "delhi_leads", label: "Delhi Leads", icon: ClipboardList, desc: "Delhi Enquiries" },
      { id: "noida_leads", label: "Noida Leads", icon: ClipboardList, desc: "Noida Enquiries" },
    ] : [
      { id: "leads", label: role === "noida_counselor" ? "Noida Leads" : "Delhi Leads", icon: ClipboardList, desc: "Assigned enquiries" }
    ]),
    ...(isCoreAdmin ? [
      { id: "placements", label: "Placements", icon: Trophy, desc: "Reviews & Stats" },
      { id: "blogs", label: "Blogs", icon: FileText, desc: "Blog posts" },
      { id: "courses", label: "Courses", icon: BookOpen, desc: "Course catalog" },
      { id: "banners", label: "Promo Banners", icon: Megaphone, desc: "Text Promo Banners" },
      { id: "noida_banners", label: "Noida Banners", icon: ImageIcon, desc: "Noida Image Slider" },
      { id: "team", label: "Team", icon: Users, desc: "Manage admins" },
    ] : []),
  ];


  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/admin");
  }, [loading, isAuthenticated, navigate]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setFetching(true);
    try {
      const leadsPromise = adminApi.get("/leads").catch(() => ({ data: { leads: [] } }));

      let reviews = [], stats = [], blogs = [], courses = [], users = [], banners = [], noidaBanners = [];
      let leadsR = { data: { leads: [] } };

      if (isCoreAdmin) {
        const [resolvedLeads, reviewsR, statsR, blogsR, coursesR, usersR, bannersR, noidaBannersR] = await Promise.all([
          leadsPromise,
          adminApi.get("/reviews").catch(() => ({ data: [] })),
          adminApi.get("/stats").catch(() => ({ data: [] })),
          adminApi.get("/blogs").catch(() => ({ data: [] })),
          adminApi.get("/courses").catch(() => ({ data: [] })),
          adminApi.get("/users").catch(() => ({ data: [] })),
          adminApi.get("/banners").catch(() => ({ data: { data: [] } })),
          adminApi.get("/noida-banners").catch(() => ({ data: [] })),
        ]);
        leadsR = resolvedLeads;
        reviews = reviewsR.data || [];
        stats = statsR.data || [];
        blogs = blogsR.data || [];
        courses = coursesR.data || [];
        users = usersR.data || [];
        banners = bannersR.data?.data || bannersR.data || [];
        noidaBanners = noidaBannersR.data || [];
      } else {
        leadsR = await leadsPromise;
      }

      setData({
        leads: leadsR.data?.leads || leadsR.data || [],
        reviews, stats, blogs, courses, users, banners, noidaBanners
      });
    } catch { /* handled per-request */ }
    setFetching(false);
  }, [isCoreAdmin]);

  useEffect(() => {
    if (isAuthenticated && !didFetch.current) {
      didFetch.current = true;
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleDelete = async (endpoint, label) => {
    if (!window.confirm(`Delete this ${label}?`)) return;
    try {
      await adminApi.delete(endpoint);
      showToast(`${label} deleted`);
      fetchData();
    } catch { showToast(`Failed to delete ${label}`, "error"); }
  };

  const handleSave = async (method, endpoint, body, label) => {
    try {
      if (label === "lead") {
        await axios.post(`${import.meta.env.VITE_API_URL || ""}/api/enquiries`, body);
        showToast(`Lead created`);
      } else {
        await adminApi[method](endpoint, body);
        showToast(`${label} saved`);
      }
      setModal(null);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.error || `Failed to save ${label}`, "error");
    }
  };

  const handleTransfer = async (table, id, newBranch) => {
    if (!window.confirm(`Transfer this lead to ${newBranch}?`)) return;
    try {
      await adminApi.put(`/leads/transfer/${table}/${id}`, { branch: newBranch });
      showToast(`Lead transferred to ${newBranch}`);
      fetchData();
    } catch { showToast(`Failed to transfer lead`, "error"); }
  };

  const handleBulkTransfer = async (selectedIds, newBranch) => {
    if (!window.confirm(`Transfer ${selectedIds.length} leads to ${newBranch}?`)) return;
    try {
      setFetching(true);
      const leadsToTransfer = data.leads.filter(l => selectedIds.includes(l.id));
      for (const lead of leadsToTransfer) {
        await adminApi.put(`/leads/transfer/${lead.source_table}/${lead.id}`, { branch: newBranch });
      }
      showToast(`${selectedIds.length} leads transferred to ${newBranch}`);
      fetchData();
    } catch { 
      showToast(`Failed to transfer some leads`, "error"); 
      fetchData();
    }
  };

  const [assignTarget, setAssignTarget] = useState(null);

  const handleAssign = async (counselorId) => {
    if (!assignTarget) return;
    try {
      setFetching(true);
      if (assignTarget.type === "single") {
        await adminApi.put(`/leads/assign/${assignTarget.table}/${assignTarget.id}`, { counselor_id: counselorId });
        showToast(`Lead assigned successfully`);
      } else if (assignTarget.type === "bulk") {
        const leadsToAssign = data.leads.filter(l => assignTarget.ids.includes(l.id));
        for (const lead of leadsToAssign) {
          await adminApi.put(`/leads/assign/${lead.source_table}/${lead.id}`, { counselor_id: counselorId });
        }
        showToast(`${assignTarget.ids.length} leads assigned successfully`);
      }
      fetchData();
      setAssignTarget(null);
    } catch { 
      showToast(`Failed to assign lead(s)`, "error"); 
      fetchData();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading Dashboard...</p>
      </div>
    </div>
  );
  
  if (!isAuthenticated) return null;

  const filtered = (items, keys) => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(item => keys.some(k => String(item[k] || "").toLowerCase().includes(q)));
  };

  const getProcessedLeads = () => {
    let result = [...data.leads];
    
    if (isCoreAdmin) {
      if (activeTab === "delhi_leads") {
        result = result.filter(l => (l.branch || "").toLowerCase().includes("delhi"));
      } else if (activeTab === "noida_leads") {
        result = result.filter(l => (l.branch || "").toLowerCase().includes("noida"));
      }
    }
    
    if (leadCategory !== "all") {
      result = result.filter(l => {
        const src = (l.source || "").toLowerCase();
        if (leadCategory === "enquiry") return src === "enquiry";
        if (leadCategory === "brochure") return src === "brochure download";
        if (leadCategory === "contact") return src !== "enquiry" && src !== "brochure download";
        return true;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      const keys = ["name", "phone", "email", "course", "source", "branch"];
      result = result.filter(item => keys.some(k => String(item[k] || "").toLowerCase().includes(q)));
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return leadSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-lime-500" size={24} />
            <h1 className="text-lg font-bold text-white tracking-tight">NexxTechs <span className="text-lime-500 font-black">ADMIN</span></h1>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-500 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/20">
              {isCoreAdmin ? "Core Admin" : (role === "noida_counselor" ? "Noida Counselor" : "Delhi Counselor")}
            </span>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-semibold border border-slate-700"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar - Desktop */}
        <nav 
          style={{ willChange: "transform" }}
          className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 pt-20 pb-4 z-40 transition-transform duration-300 md:relative md:pt-6 md:translate-x-0",
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        )}>
          <div className="px-4 mb-6 md:hidden">
             <span className="text-xs font-bold uppercase tracking-wider text-lime-600 bg-lime-50 px-2 py-1 rounded border border-lime-100">
              {isCoreAdmin ? "Core Admin" : (role === "noida_counselor" ? "Noida Counselor" : "Delhi Counselor")}
            </span>
          </div>
          
          <div className="space-y-1 px-3">
            {TABS.map(t => {
              const Icon = t.icon;
              return (
                <button 
                  key={t.id} 
                  onClick={() => { setActiveTab(t.id); setSearch(""); setSidebarOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    activeTab === t.id 
                      ? "bg-lime-50 text-lime-700 shadow-sm shadow-lime-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon size={20} className={cn(activeTab === t.id ? "text-lime-600" : "text-slate-400 group-hover:text-slate-600")} />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-bold">{t.label}</span>
                    <span className="text-[10px] opacity-70 font-medium uppercase tracking-tighter">{t.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-stretch lg:items-center">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 outline-none shadow-sm transition-all"
                  placeholder={`Search in ${activeTab}...`} 
                  value={search}
                  onChange={e => setSearch(e.target.value)} 
                />
              </div>
              
              {/* Show filters for leads tabs */}
              {(activeTab === "leads" || activeTab === "delhi_leads" || activeTab === "noida_leads") && (
                <div className="flex flex-wrap sm:flex-nowrap gap-2">
                  <select 
                    value={leadCategory} 
                    onChange={e => setLeadCategory(e.target.value)}
                    className="flex-1 sm:flex-none px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 shadow-sm transition-all cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="enquiry">Enquiries</option>
                    <option value="brochure">Brochures</option>
                    <option value="contact">Contact</option>
                  </select>
                  
                  <select 
                    value={leadSort} 
                    onChange={e => setLeadSort(e.target.value)}
                    className="flex-1 sm:flex-none px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 shadow-sm transition-all cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => { didFetch.current = false; fetchData(); }} 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-all shadow-sm"
                disabled={fetching}
              >
                <RefreshCw size={18} className={fetching ? "animate-spin" : ""} />
                <span className="hidden lg:inline">Refresh</span>
              </button>
              
              {(isCoreAdmin || role === "receptionist" || role === "noida_receptionist") && (
                <button 
                  onClick={() => openCreateModal()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 text-slate-900 rounded-xl text-sm font-extrabold hover:bg-lime-400 active:scale-95 transition-all shadow-md shadow-lime-500/20"
                >
                  <Plus size={20} strokeWidth={3} />
                  <span>Add New</span>
                </button>
              )}
            </div>
          </div>

          {/* Active View */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {(activeTab === "leads" || activeTab === "delhi_leads" || activeTab === "noida_leads") && <LeadsTable leads={getProcessedLeads()} onDelete={handleDelete} onTransfer={handleTransfer} onBulkTransfer={handleBulkTransfer} onAssign={setAssignTarget} isCoreAdmin={isCoreAdmin} role={role} users={data.users} />}
            {activeTab === "placements" && isCoreAdmin && <PlacementsTab reviews={filtered(data.reviews, ["name","company","role"])} stats={data.stats} onDelete={handleDelete} onEdit={openEditModal} />}
            {activeTab === "blogs" && isCoreAdmin && <BlogsTable blogs={filtered(data.blogs, ["title","category"])} onDelete={handleDelete} onEdit={openEditModal} />}
            {activeTab === "courses" && isCoreAdmin && <CoursesTable courses={filtered(data.courses, ["title","slug"])} onDelete={handleDelete} onEdit={openEditModal} />}
            {activeTab === "banners" && isCoreAdmin && <BannersTable banners={filtered(data.banners, ["title","text"])} onDelete={handleDelete} onEdit={openEditModal} />}
            {activeTab === "noida_banners" && isCoreAdmin && <NoidaBannersTable banners={filtered(data.noidaBanners, ["title","link_url"])} onDelete={handleDelete} onEdit={openEditModal} />}
            {activeTab === "team" && (isCoreAdmin || role === "receptionist" || role === "noida_receptionist") && <TeamTable users={data.users} onDelete={handleDelete} onEdit={openEditModal} isCoreAdmin={isCoreAdmin} />}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={cn(
          "fixed bottom-6 right-6 px-6 py-3 rounded-2xl text-white text-sm font-bold shadow-2xl z-[100] animate-in slide-in-from-right-full duration-300 flex items-center gap-3",
          toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
        )}>
          {toast.type === "error" ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
          {toast.msg}
        </div>
      )}

      {/* Assign Modal */}
      {assignTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800">Assign Counselor</h2>
              <button onClick={() => setAssignTarget(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-sm text-slate-500">Select a counselor to assign to {assignTarget.type === "bulk" ? `${assignTarget.ids.length} leads` : "this lead"}.</p>
              <div className="space-y-2">
                {data.users.filter(u => u.role.includes("counselor") && u.is_active).map(counselor => (
                  <button 
                    key={counselor.id}
                    onClick={() => handleAssign(counselor.id)}
                    className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-lime-50 hover:text-lime-700 rounded-xl transition-colors font-medium text-slate-700 border border-slate-100 hover:border-lime-200"
                  >
                    {counselor.display_name || counselor.username} <span className="text-[10px] uppercase ml-2 text-slate-400">({counselor.role})</span>
                  </button>
                ))}
                {data.users.filter(u => u.role.includes("counselor") && u.is_active).length === 0 && (
                  <p className="text-sm text-red-500 font-medium">No active counselors found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800">{modal.title}</h2>
              <button onClick={() => setModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <ModalForm modal={modal} onSave={handleSave} role={role} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function openCreateModal() {
    const templates = {
      leads: { title: "Add Manual Lead", type: "lead", data: { name: "", phone: "", course_interested: "General", branch: role === "noida_receptionist" ? "Nexxtechs Noida" : "Nexxtechs Delhi", source: "Walk-in" } },
      delhi_leads: { title: "Add Manual Lead", type: "lead", data: { name: "", phone: "", course_interested: "General", branch: "Nexxtechs Delhi", source: "Walk-in" } },
      noida_leads: { title: "Add Manual Lead", type: "lead", data: { name: "", phone: "", course_interested: "General", branch: "Nexxtechs Noida", source: "Walk-in" } },
      placements: { title: "Add Review", type: "review", data: { name: "", role: "", company: "", image: "", text: "", is_active: true, sort_order: 0 } },
      blogs: { title: "Add Blog", type: "blog", data: { id: "", title: "", excerpt: "", author: "NexxTechs", date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), category: "Our blog", read_time: "5 min read", image: "", content: "", is_active: true } },
      courses: { title: "Add Course", type: "course", data: { slug: "", title: "", tagline: "", image: "", duration: "", level: "", overview: "", is_popular: false, is_trending: false, is_active: true, batch_timings: [], highlights: [], trending_tools: [], modules: [], brochure_url: "", sort_order: 0 } },
      banners: { title: "Add Banner", type: "banner", data: { title: "", text: "", link_url: "", link_text: "", target_page: "home", bg_color: "#84CC16", text_color: "#000000", start_date: "", end_date: "", is_active: true } },
      noida_banners: { title: "Add Noida Banner", type: "noida_banner", data: { title: "", image: "", link_url: "", sort_order: 0, is_active: true } },
      team: { title: "Add Admin", type: "user", data: { username: "", password: "", role: "counselor", display_name: "" } },
    };
    const t = templates[activeTab];
    if (t) setModal({ ...t, method: "post" });
  }

  async function openEditModal(type, item) {
    const titles = { review: "Edit Review", blog: "Edit Blog", course: "Edit Course", stat: "Edit Stat", user: "Edit Admin", banner: "Edit Banner", noida_banner: "Edit Noida Banner" };
    // Format dates for input type="datetime-local" if banner
    let editData = { ...item, password: "" };
    if (type === "banner") {
      if (editData.start_date) editData.start_date = new Date(editData.start_date).toISOString().slice(0, 16);
      if (editData.end_date) editData.end_date = new Date(editData.end_date).toISOString().slice(0, 16);
    }
    
    if (type === "blog") {
      setFetching(true);
      try {
        const res = await adminApi.get(`/blogs/${item.id}`);
        editData = { ...editData, ...res.data };
      } catch (err) {
        showToast("Failed to fetch full blog data", "error");
        setFetching(false);
        return;
      }
      setFetching(false);
    }
    
    setModal({ title: titles[type], type, data: editData, method: "put", editId: item.id || item.slug });
  }
}

/* ============== Table Components with Responsiveness ============== */

function TableContainer({ children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          {children}
        </table>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 bg-slate-50/50">
      {children}
    </th>
  );
}

function Td({ children, className }) {
  return (
    <td className={cn("px-6 py-4 text-sm font-medium text-slate-600 border-b border-slate-50", className)}>
      {children}
    </td>
  );
}

function LeadsTable({ leads, onDelete, onTransfer, onBulkTransfer, onAssign, isCoreAdmin, role, users }) {
  const [selected, setSelected] = useState(new Set());

  const toggleAll = (e) => {
    if (e.target.checked) setSelected(new Set(leads.map(l => l.id)));
    else setSelected(new Set());
  };

  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  if (!leads.length) return <EmptyState label="leads" />;
  return (
    <div className="space-y-4">
      {selected.size > 0 && (isCoreAdmin || role === "receptionist" || role === "noida_receptionist") && (
        <div className="flex items-center justify-between p-4 bg-lime-50 border border-lime-200 rounded-xl animate-in slide-in-from-top-2 duration-200">
          <span className="text-sm font-bold text-lime-800">{selected.size} lead{selected.size > 1 ? 's' : ''} selected</span>
          <div className="flex gap-2">
            <button onClick={() => { onBulkTransfer(Array.from(selected), "Nexxtechs Delhi"); setSelected(new Set()); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors">Move to Delhi</button>
            <button onClick={() => { onBulkTransfer(Array.from(selected), "Nexxtechs Noida"); setSelected(new Set()); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-purple-700 transition-colors">Move to Noida</button>
            <button onClick={() => { onAssign({ type: "bulk", ids: Array.from(selected) }); setSelected(new Set()); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors">Assign Counselor</button>
          </div>
        </div>
      )}
      <TableContainer>
        <thead>
          <tr>
            <th className="px-6 py-4 w-10 border-b border-slate-100 bg-slate-50/50">
              <input type="checkbox" checked={selected.size > 0 && selected.size === leads.length} onChange={toggleAll} className="w-4 h-4 rounded text-lime-600 focus:ring-lime-500 cursor-pointer" />
            </th>
            <Th>Name</Th>
          <Th>Contact Info</Th>
          <Th>Interest</Th>
          <Th>Branch & Page</Th>
          <Th>Source</Th>
          <Th>Date</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {leads.map(l => (
          <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 border-b border-slate-50">
              <input type="checkbox" checked={selected.has(l.id)} onChange={() => toggleOne(l.id)} className="w-4 h-4 rounded text-lime-600 focus:ring-lime-500 cursor-pointer" />
            </td>
            <Td className="text-slate-900 font-bold">{l.name}</Td>
            <Td>
              <div className="flex flex-col">
                <span className="font-bold">{l.phone}</span>
                <span className="text-xs text-slate-400 font-medium">{l.email || "No email"}</span>
              </div>
            </Td>
            <Td>
              <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-bold text-slate-600">
                {l.course || l.course_interested || "General"}
              </span>
            </Td>
            <Td>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-500">
                  {(l.branch || "—").split(" | Page: ")[0]}
                </span>
                {(l.branch || "").includes(" | Page: ") && (
                  <span className="text-[10px] text-lime-600 bg-lime-50 px-1.5 py-0.5 rounded w-fit mt-1 border border-lime-100 font-medium">
                    {(l.branch || "").split(" | Page: ")[1]}
                  </span>
                )}
                {l.transferred_from && (
                  <span className="text-[9px] font-medium text-orange-500 mt-1 uppercase tracking-wider bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 w-fit">
                    Transferred from {l.transferred_from.split(" | Page: ")[0]}
                  </span>
                )}
                {l.counselor_id && (
                  <span className="text-[9px] font-medium text-indigo-500 mt-1 uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 w-fit">
                    Assigned: {users?.find(u => u.id === l.counselor_id)?.display_name || 'Counselor'}
                  </span>
                )}
              </div>
            </Td>
            <Td>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                l.source === "Enquiry" ? "bg-blue-100 text-blue-700" : 
                l.source === "Brochure Download" ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"
              )}>
                {l.source}
              </span>
            </Td>
            <Td className="text-slate-400 tabular-nums">
              {l.created_at ? new Date(l.created_at).toLocaleDateString() : "—"}
            </Td>
            <Td>
              <div className="flex gap-1 justify-end">
                {selected.size === 0 && (isCoreAdmin || role === "receptionist" || role === "noida_receptionist") && (
                  <button 
                    onClick={() => onAssign({ type: "single", table: l.source_table, id: l.id })}
                    className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-all mr-2"
                  >
                    Assign Counselor
                  </button>
                )}
                {isCoreAdmin && (
                  <button 
                    onClick={() => onDelete(`/leads/${l.source_table}/${l.id}`, "Lead")}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
    </div>
  );
}

function PlacementsTab({ reviews, stats, onDelete, onEdit }) {
  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <Trophy size={16} /> Performance Metrics
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-lime-500 transition-all">
              <span className="text-3xl font-black text-slate-900 group-hover:text-lime-600 transition-colors">
                {s.value}<span className="text-lime-500">{s.suffix}</span>
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{s.label}</span>
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit("stat", s)} className="p-2 bg-slate-100 hover:bg-lime-100 text-slate-500 hover:text-lime-600 rounded-lg transition-all"><Edit size={14} /></button>
                <button onClick={() => onDelete(`/stats/${s.id}`, "Stat")} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-lg transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <Users size={16} /> Success Stories ({reviews.length})
        </h3>
        {!reviews.length ? <EmptyState label="reviews" /> : (
          <TableContainer>
            <thead>
              <tr>
                <Th>Student</Th>
                <Th>Placement</Th>
                <Th>Status</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <Td className="text-slate-900 font-bold">{r.name}</Td>
                  <Td>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{r.company}</span>
                      <span className="text-xs text-slate-400">{r.role}</span>
                    </div>
                  </Td>
                  <Td>
                    {r.is_active ? 
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-md w-fit"><CheckCircle2 size={12} /> Live</span> : 
                      <span className="flex items-center gap-1 text-slate-400 font-bold text-xs bg-slate-100 px-2 py-1 rounded-md w-fit">Hidden</span>
                    }
                  </Td>
                  <Td>
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => onEdit("review", r)} className="p-2 text-slate-300 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-all"><Edit size={18} /></button>
                      <button onClick={() => onDelete(`/reviews/${r.id}`, "Review")} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        )}
      </section>
    </div>
  );
}

function BlogsTable({ blogs, onDelete, onEdit }) {
  if (!blogs.length) return <EmptyState label="blogs" />;
  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>Post Details</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(b => (
          <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
            <Td className="max-w-[400px]">
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold line-clamp-1">{b.title}</span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{b.date} • {b.category}</span>
              </div>
            </Td>
            <Td>
              {b.is_active ? 
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-black uppercase">Published</span> : 
                <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-md text-xs font-black uppercase">Draft</span>
              }
            </Td>
            <Td>
              <div className="flex gap-1 justify-end">
                <button onClick={() => onEdit("blog", b)} className="p-2 text-slate-300 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-all"><Edit size={18} /></button>
                <button onClick={() => onDelete(`/blogs/${b.id}`, "Blog")} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

function CoursesTable({ courses, onDelete, onEdit }) {
  if (!courses.length) return <EmptyState label="courses" />;
  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>Course Info</Th>
          <Th>Tags</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {courses.map(c => (
          <tr key={c.slug} className="hover:bg-slate-50/50 transition-colors">
            <Td>
              <div className="flex flex-col">
                <span className="text-slate-900 font-black tracking-tight">{c.title}</span>
                <code className="text-[10px] text-lime-600 bg-lime-50 px-1.5 py-0.5 rounded w-fit mt-1">{c.slug}</code>
              </div>
            </Td>
            <Td>
              <div className="flex flex-wrap gap-1">
                {c.is_popular && <span className="text-[9px] font-black uppercase bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Popular</span>}
                {c.is_trending && <span className="text-[9px] font-black uppercase bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Trending</span>}
              </div>
            </Td>
            <Td>
              {c.is_active ? 
                <span className="text-xs font-bold text-emerald-600">Active</span> : 
                <span className="text-xs font-bold text-slate-400">Inactive</span>
              }
            </Td>
            <Td>
              <div className="flex gap-1 justify-end">
                <button onClick={() => onEdit("course", c)} className="p-2 text-slate-300 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-all"><Edit size={18} /></button>
                <button onClick={() => onDelete(`/courses/${c.slug}`, "Course")} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

function TeamTable({ users, onDelete, onEdit, isCoreAdmin }) {
  const visibleUsers = users.filter(u => u.role !== "core");
  if (!visibleUsers.length) return <EmptyState label="users" />;
  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>User</Th>
          <Th>Role</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {visibleUsers.map(u => (
          <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
            <Td>
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold">{u.name || u.username}</span>
                <span className="text-xs text-slate-400 italic">@{u.username}</span>
              </div>
            </Td>
            <Td>
              <span className={cn(
                "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest",
                u.role === "core" ? "bg-red-50 text-red-600 border border-red-100" : 
                u.role === "noida_counselor" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                "bg-blue-50 text-blue-600 border border-blue-100"
              )}>
                {u.role === "core" ? "Core Admin" : u.role === "noida_counselor" ? "Noida Counselor" : "Delhi Counselor"}
              </span>
            </Td>
            <Td>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-600">{u.is_active ? "Enabled" : "Disabled"}</span>
                <span className="text-[10px] text-slate-400 tabular-nums">Joined {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</span>
              </div>
            </Td>
            <Td>
              <div className="flex gap-1 justify-end">
                <button onClick={() => onEdit("user", u)} className="p-2 text-slate-300 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-all"><Edit size={18} /></button>
                <button onClick={() => onDelete(`/users/${u.id}`, "Admin")} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

function BannersTable({ banners, onDelete, onEdit }) {
  if (!banners.length) return <EmptyState label="banners" />;
  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>Banner Info</Th>
          <Th>Target Page</Th>
          <Th>Dates</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {banners.map(b => (
          <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
            <Td>
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold max-w-sm truncate">{b.title}</span>
                <span className="text-xs text-slate-400 mt-1 max-w-sm truncate">{b.text}</span>
              </div>
            </Td>
            <Td>
              <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-700`}>
                {b.target_page || 'home'}
              </span>
            </Td>
            <Td>
              <div className="flex flex-col gap-1 text-xs text-slate-500">
                <span><strong className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">START:</strong> {b.start_date ? new Date(b.start_date).toLocaleString() : "Now"}</span>
                <span><strong className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">END:</strong> {b.end_date ? new Date(b.end_date).toLocaleString() : "Never"}</span>
              </div>
            </Td>
            <Td>
              {b.is_active ? 
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-black uppercase">Active</span> : 
                <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-md text-[10px] font-black uppercase">Inactive</span>
              }
            </Td>
            <Td>
              <div className="flex gap-1 justify-end">
                <button onClick={() => onEdit("banner", b)} className="p-2 text-slate-300 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-all"><Edit size={18} /></button>
                <button onClick={() => onDelete(`/banners/${b.id}`, "Banner")} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

function NoidaBannersTable({ banners, onDelete, onEdit }) {
  if (!banners.length) return <EmptyState label="Noida Image Banners" />;
  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>Image</Th>
          <Th>Info</Th>
          <Th>Order</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {banners.map(b => (
          <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
            <Td>
              <img src={b.image} alt="Noida Banner" className="h-12 w-auto object-cover rounded-md shadow-sm border border-slate-200" />
            </Td>
            <Td>
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold max-w-xs truncate">{b.title || "No Title"}</span>
                <a href={b.link_url || "#"} target="_blank" rel="noopener noreferrer" className="text-[10px] text-lime-600 truncate max-w-xs">{b.link_url || "No Link"}</a>
              </div>
            </Td>
            <Td>
              <span className="text-xs font-bold text-slate-500 tabular-nums">#{b.sort_order}</span>
            </Td>
            <Td>
              {b.is_active ? 
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-black uppercase">Active</span> : 
                <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-md text-[10px] font-black uppercase">Inactive</span>
              }
            </Td>
            <Td>
              <div className="flex gap-1 justify-end">
                <button onClick={() => onEdit("noida_banner", b)} className="p-2 text-slate-300 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-all"><Edit size={18} /></button>
                <button onClick={() => onDelete(`/noida-banners/${b.id}`, "Noida Banner")} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border border-slate-100 border-dashed">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
        <Search size={32} />
      </div>
      <p className="text-slate-500 font-bold">No {label} found</p>
      <p className="text-slate-400 text-sm mt-1 text-center max-w-xs">Try adjusting your search or add a new entry to get started.</p>
    </div>
  );
}

/* ============== Modal Form Components ============== */

function ModalForm({ modal, onSave, role: currentUserRole }) {
  const [form, setForm] = useState(modal.data);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")          // Replace spaces with -
      .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
      .replace(/\-\-+/g, "-")         // Replace multiple - with single -
      .replace(/^-+/, "")             // Trim - from start of text
      .replace(/-+$/, "");            // Trim - from end of text
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const endpoints = {
      review: modal.method === "post" ? "/reviews" : `/reviews/${modal.editId}`,
      stat: `/stats/${modal.editId}`,
      blog: modal.method === "post" ? "/blogs" : `/blogs/${modal.editId}`,
      course: modal.method === "post" ? "/courses" : `/courses/${modal.editId}`,
      banner: modal.method === "post" ? "/banners" : `/banners/${modal.editId}`,
      noida_banner: modal.method === "post" ? "/noida-banners" : `/noida-banners/${modal.editId}`,
      user: modal.method === "post" ? "/users" : `/users/${modal.editId}`,
      lead: "/leads", // not used by adminApi directly, handled above
    };

    let submitForm = { ...form };
    if (modal.type === "user" && submitForm.role?.includes("receptionist") && !submitForm.display_name) {
      submitForm.display_name = "Receptionist";
    }

    await onSave(modal.method, endpoints[modal.type], submitForm, modal.type);
    setIsSubmitting(false);
  };

  const formContent = () => {
    if (modal.type === "lead") return (
      <div className="space-y-5">
        <Field label="Full Name" value={form.name} onChange={v => set("name", v)} required />
        <Field label="Phone Number" value={form.phone} onChange={v => set("phone", v)} required />
        <Field label="Email Address (Optional)" type="email" value={form.email} onChange={v => set("email", v)} />
        <Field label="Course Interested" value={form.course_interested} onChange={v => set("course_interested", v)} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Source</label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
              value={form.source} 
              onChange={e => set("source", e.target.value)}
            >
              <option value="Walk-in">Walk-in</option>
              <option value="Phone Call">Phone Call</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Branch</label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
              value={form.branch} 
              onChange={e => set("branch", e.target.value)}
            >
              <option value="Nexxtechs Delhi">Delhi Branch</option>
              <option value="Nexxtechs Noida">Noida Branch</option>
            </select>
          </div>
        </div>
      </div>
    );

    if (modal.type === "review") return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Name" value={form.name} onChange={v => set("name", v)} required />
          <Field label="Company" value={form.company} onChange={v => set("company", v)} required />
        </div>
        <Field label="Role" value={form.role} onChange={v => set("role", v)} required />
        <ImageField label="Student Photo (max 200 KB)" value={form.image} onChange={v => set("image", v)} />
        <Field label="Review Text" value={form.text} onChange={v => set("text", v)} textarea required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
          <CheckField label="Live on Website" checked={form.is_active} onChange={v => set("is_active", v)} />
          <Field label="Sort Order" type="number" value={form.sort_order} onChange={v => set("sort_order", parseInt(v) || 0)} />
        </div>
      </div>
    );

    if (modal.type === "stat") return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Label (e.g. Students)" value={form.label} onChange={v => set("label", v)} required />
          <div className="flex gap-2">
            <Field label="Value" type="number" className="flex-1" value={form.value} onChange={v => set("value", parseInt(v) || 0)} required />
            <Field label="Suffix" className="w-20" value={form.suffix} onChange={v => set("suffix", v)} />
          </div>
        </div>
        <Field label="Icon Name (Lucide icon name)" value={form.icon} onChange={v => set("icon", v)} />
        <Field label="Sort Order" type="number" value={form.sort_order} onChange={v => set("sort_order", parseInt(v) || 0)} />
      </div>
    );

    if (modal.type === "blog") return (
      <div className="space-y-5">
        <Field 
          label="URL Slug (id)" 
          value={form.id} 
          onChange={v => set("id", slugify(v))} 
          required 
          placeholder="e.g. top-20-benefits-learning-cyber-security"
        />
        <Field 
          label="Title" 
          value={form.title} 
          onChange={v => {
            setForm(p => {
              const updates = { title: v };
              if (modal.method === "post" && (!p.id || p.id === slugify(p.title || ""))) {
                updates.id = slugify(v);
              }
              return { ...p, ...updates };
            });
          }} 
          required 
        />
        <Field label="Excerpt" value={form.excerpt} onChange={v => set("excerpt", v)} textarea />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Author" value={form.author} onChange={v => set("author", v)} />
          <Field label="Category" value={form.category} onChange={v => set("category", v)} />
          <Field label="Read Time" value={form.read_time} onChange={v => set("read_time", v)} />
        </div>
        <ImageField label="Featured Image (WebP recommended)" value={form.image} onChange={v => set("image", v)} required />
        <Field label="Content (HTML Source)" value={form.content} onChange={v => set("content", v)} textarea large required />
        <CheckField label="Publish immediately" checked={form.is_active} onChange={v => set("is_active", v)} />
      </div>
    );

    if (modal.type === "course") return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field 
            label="URL Slug" 
            value={form.slug} 
            onChange={v => set("slug", slugify(v))} 
            required 
            placeholder="e.g. cloud-computing-course"
          />
          <Field 
            label="Course Title" 
            value={form.title} 
            onChange={v => {
              setForm(p => {
                const updates = { title: v };
                if (modal.method === "post" && (!p.slug || p.slug === slugify(p.title || ""))) {
                  updates.slug = slugify(v);
                }
                return { ...p, ...updates };
              });
            }} 
            required 
          />
        </div>
        <Field label="Tagline / Short Hook" value={form.tagline} onChange={v => set("tagline", v)} />
        <ImageField label="Course Banner" value={form.image} onChange={v => set("image", v)} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Duration (e.g. 3 Months)" value={form.duration} onChange={v => set("duration", v)} />
          <Field label="Level (e.g. Beginner)" value={form.level} onChange={v => set("level", v)} />
        </div>

        <Field label="Overview / Description" value={form.overview} onChange={v => set("overview", v)} textarea />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CheckField label="Popular" checked={form.is_popular} onChange={v => set("is_popular", v)} />
          <CheckField label="Trending" checked={form.is_trending} onChange={v => set("is_trending", v)} />
          <CheckField label="Active" checked={form.is_active} onChange={v => set("is_active", v)} />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
           <Field label="Highlights (comma separated)" value={Array.isArray(form.highlights) ? form.highlights.join(", ") : form.highlights} onChange={v => set("highlights", v.split(",").map(s => s.trim()).filter(Boolean))} />
           <Field label="Batch Timings (comma separated)" value={Array.isArray(form.batch_timings) ? form.batch_timings.join(", ") : form.batch_timings} onChange={v => set("batch_timings", v.split(",").map(s => s.trim()).filter(Boolean))} />
           <Field label="Trending Tools (comma separated)" value={Array.isArray(form.trending_tools) ? form.trending_tools.join(", ") : form.trending_tools} onChange={v => set("trending_tools", v.split(",").map(s => s.trim()).filter(Boolean))} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <Field label="Brochure PDF URL" value={form.brochure_url} onChange={v => set("brochure_url", v)} />
          <Field label="Sort Order" type="number" value={form.sort_order} onChange={v => set("sort_order", parseInt(v) || 0)} />
        </div>
      </div>
    );

    if (modal.type === "banner") return (
      <div className="space-y-4">
        <Field label="Banner Title (Internal reference)" value={form.title} onChange={v => set("title", v)} required />
        <Field label="Banner Text" value={form.text} onChange={v => set("text", v)} required textarea />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Page</label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
              value={form.target_page || "home"} 
              onChange={e => set("target_page", e.target.value)}
            >
              <option value="home">Home Page</option>
              <option value="noida">Noida Page</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Link URL (Optional)" value={form.link_url} onChange={v => set("link_url", v)} />
          <Field label="Link Text (e.g., 'Learn More')" value={form.link_text} onChange={v => set("link_text", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Background Color (Hex)" type="color" value={form.bg_color} onChange={v => set("bg_color", v)} />
          <Field label="Text Color (Hex)" type="color" value={form.text_color} onChange={v => set("text_color", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Start Date/Time (Local)" type="datetime-local" value={form.start_date || ""} onChange={v => set("start_date", v)} />
          <Field label="End Date/Time (Local)" type="datetime-local" value={form.end_date || ""} onChange={v => set("end_date", v)} />
        </div>
        <CheckField label="Active" checked={form.is_active} onChange={v => set("is_active", v)} />
      </div>
    );

    if (modal.type === "noida_banner") return (
      <div className="space-y-4">
        <Field label="Banner Title (Internal reference)" value={form.title} onChange={v => set("title", v)} />
        <Field label="Link URL (Optional, where to redirect on click)" value={form.link_url} onChange={v => set("link_url", v)} />
        <ImageField label="Banner Image (max 150 KB, recommended aspect ratio 21:9 or 3:1)" value={form.image} onChange={v => set("image", v)} required />
        <Field label="Sort Order" type="number" value={form.sort_order} onChange={v => set("sort_order", parseInt(v) || 0)} />
        <CheckField label="Active" checked={form.is_active} onChange={v => set("is_active", v)} />
      </div>
    );

    if (modal.type === "user") return (
      <div className="space-y-5">
        {!form.role?.includes("receptionist") && (
          <Field label="Full Name" value={form.display_name} onChange={v => set("display_name", v)} required />
        )}
        <Field label="Login Username" value={form.username} onChange={v => set("username", v)} required />
        <Field label={modal.method === "post" ? "Initial Password" : "New Password (empty to keep)"} type="password" value={form.password || ""} onChange={v => set("password", v)} required={modal.method === "post"} />
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Role</label>
          <select 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-lime-500/20 outline-none transition-all"
            value={form.role} 
            onChange={e => set("role", e.target.value)}
          >
            <option value="counselor">👤 Delhi Counselor (Delhi Leads Only)</option>
            <option value="noida_counselor">🏢 Noida Counselor (Noida Leads Only)</option>
            {currentUserRole === "core" && (
              <>
                <option value="receptionist">📞 Delhi Receptionist (Delhi Leads, Transfer & Add)</option>
                <option value="noida_receptionist">📞 Noida Receptionist (Noida Leads, Transfer & Add)</option>
                <option value="core">🔑 Core Admin (Full access)</option>
              </>
            )}
          </select>
        </div>
        {modal.method === "put" && <CheckField label="Account Enabled" checked={form.is_active} onChange={v => set("is_active", v)} />}
      </div>
    );

    return null;
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      {formContent()}
      <div className="flex gap-3 justify-end pt-6 border-t border-slate-100">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-8 py-3 bg-lime-500 text-slate-900 rounded-xl text-sm font-black hover:bg-lime-400 disabled:opacity-50 transition-all shadow-lg shadow-lime-500/20"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, textarea, large, type = "text", required, className }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Tag 
        className={cn(
          "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 outline-none transition-all placeholder:text-slate-300",
          textarea && (large ? "min-h-[300px]" : "min-h-[120px]")
        )}
        type={type} 
        value={value ?? ""} 
        onChange={e => onChange(e.target.value)} 
        placeholder={`Enter ${label.toLowerCase()}...`}
        required={required}
      />
    </div>
  );
}

  function ImageField({ label, value, onChange, required }) {
  const [error, setError] = useState("");
  // Determine MAX_KB based on whether label contains "150 KB"
  const MAX_KB = label.includes("150 KB") ? 150 : 200;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > MAX_KB * 1024) {
      setError(`Max ${MAX_KB}KB allowed. This is ${(file.size / 1024).toFixed(0)}KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-lime-500 file:text-slate-900 hover:file:bg-lime-400 cursor-pointer"
        />
        {value && (
          <div className="relative group">
            <img src={value} alt="Preview" className="w-16 h-16 rounded-lg object-cover ring-2 ring-white shadow-md" />
            <button 
              type="button" 
              onClick={() => onChange("")} 
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"
            >
              <X size={10} />
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
    </div>
  );
}

function CheckField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={cn(
        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
        checked ? "bg-lime-500 border-lime-500" : "bg-white border-slate-200 group-hover:border-lime-200"
      )}>
        <input 
          type="checkbox" 
          className="hidden" 
          checked={checked} 
          onChange={e => onChange(e.target.checked)} 
        />
        {checked && <CheckCircle2 size={14} className="text-slate-900" strokeWidth={3} />}
      </div>
      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  );
}
