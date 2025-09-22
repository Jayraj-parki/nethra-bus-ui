import FeaturesRow from "@/components/landing_page/FeaturesRow";
import HeroBanner from "@/components/landing_page/HeroBanner";
import SearchBusForm from "@/components/landing_page/SearchBusForm";



export default function HomePage() {
  return (
    <>
      <main className="container rows mx-auto col-12 col-lg-10 mt-lg-4 mt-2">
        <HeroBanner/>
        <SearchBusForm/>
        <FeaturesRow/>
      </main>
    </>
  );
}
