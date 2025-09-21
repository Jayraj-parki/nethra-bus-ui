import FeaturesRow from "@/components/bus_features/FeaturesRow";
import HeroBanner from "@/components/hero_banner/HeroBanner";
import Navbar from "@/components/navbar/Navbar";
import SearchBusForm from "@/components/search_bus_form/SearchBusForm";



export default function HomePage() {
  return (
    <>
      <main className="container row mx-auto col-10 mt-5">
        <HeroBanner/>
        <SearchBusForm/>
        <FeaturesRow/>
      </main>
    </>
  );
}
