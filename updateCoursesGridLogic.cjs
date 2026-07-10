const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

// 1. Update signature
content = content.replace(
  `export default function CoursesGrid({ layout = "grid" }) {`,
  `export default function CoursesGrid({ layout = "grid", limit = null, showMoreButton = false }) {`
);

// 2. Add finalCourses computation
const searchState = `  const navigate = useNavigate();`;
const replaceState = `  const navigate = useNavigate();\n\n  const displayedCourses = activeCategory === "All" ? COURSES : COURSES.filter((c) => c.category === activeCategory);\n  const finalCourses = limit ? displayedCourses.slice(0, limit) : displayedCourses;`;
content = content.replace(searchState, replaceState);

// 3. Update Marquee mapping
content = content.replace(
  `{(activeCategory === "All" ? COURSES : COURSES.filter((c) => c.category === activeCategory)).map((course, i) => {`,
  `{finalCourses.map((course, i) => {`
);

// 4. Update Grid mapping
content = content.replace(
  `{(activeCategory === "All" ? COURSES : COURSES.filter((c) => c.category === activeCategory)).map((course, i) => {`,
  `{finalCourses.map((course, i) => {`
);

// 5. Add button
const searchButtonLocation = `          </div>
        )}
        </div>
      </section>`;
const replaceButtonLocation = `          </div>
        )}

        {showMoreButton && (
          <div className="mt-16 flex justify-center courses-heading-animate">
            <Button
              onClick={() => navigate('/courses')}
              className="px-10 h-14 rounded-full bg-[#84CC16] text-black font-bold text-lg hover:bg-[#65a30d] transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] hover:-translate-y-1 flex items-center"
            >
              Explore All Courses
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        )}
        </div>
      </section>`;

content = content.replace(searchButtonLocation, replaceButtonLocation);

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update CoursesGrid logic complete.');
