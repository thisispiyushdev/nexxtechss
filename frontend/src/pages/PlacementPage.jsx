import PlacementSuccess from "../components/PlacementSuccess";
import PageTransition from "../components/PageTransition";
import TrainingPartners from "../components/TrainingPartners";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router-dom";

export default function PlacementPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Placement Success & 95% Placement Rate | NexxTechs"
        description="See how 5000+ students got placed at top MNCs. NexxTechs provides 100% placement support for all IT training courses in Delhi."
        canonical="/placement"
      />
      <Breadcrumbs items={[{ name: "Placements", path: "/placement" }]} />
      <div className="min-h-screen">
        <PlacementSuccess />
        <TrainingPartners />


      </div>
    </PageTransition>
  );
}
