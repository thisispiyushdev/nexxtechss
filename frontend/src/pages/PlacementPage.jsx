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
        title="Placement Success – 95% Placement Rate | NexxTechs"
        description="Discover NexxTechs placement success stories. Over 5000+ students placed at top MNCs with a 95% placement rate. Check our reviews and top salary packages."
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
