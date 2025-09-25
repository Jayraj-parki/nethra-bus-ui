import AvailableBuses from "@/components/available_bus_page/AvailableBuses";


export default function AvailableBusPage() {
    const sampleBus = {
        image: "/bus-sample.jpg",
        name: "Express Travels",
        rating: "4.2",
        code: "EXP-001",
        type: "Sleeper",
        driver: "Rajesh Kumar",
        route: "Mumbai → Pune → Delhi",
        features: ["AC", "WiFi", "Charging Point", "Water Bottle"],
        departure: { time: "10:30 PM", city: "Delhi" },
        duration: "8h 00m",
        arrival: { time: "06:30 AM", city: "Kolkata" },
        striked: "2400",
        discount: "15",
        price: "2040",
        perPerson: "1020",
        seats: 25,
        totalSeats: 40
    }

    return (
        <>
            <main className="container rows mx-auto col-12 col-lg-10 mt-lg-4  mt-3">
                <AvailableBuses />
            </main>
        </>
    );
}
