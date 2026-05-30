import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../../data/services";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

const districtsByDivision = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Manikganj", "Munshiganj"],
    Chittagong: ["Chittagong", "Cox's Bazar", "Comilla", "Feni", "Noakhali"],
    Rajshahi: ["Rajshahi", "Bogura", "Natore", "Chapainawabganj", "Sirajganj"],
    Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Narail"],
    Barisal: ["Barisal", "Patuakhali", "Bhola", "Pirojpur", "Jhalokati"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Nilphamari"],
    Mymensingh: ["Mymensingh", "Netrokona", "Kishoreganj", "Jamalpur"],
};

const citiesByDistrict = {
    Dhaka: ["Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Mohammadpur"],
    Gazipur: ["Tongi", "Joydebpur", "Kaliakair", "Kapasia"],
    Rajshahi: ["Boalia", "Motihar", "Shah Makhdum", "Paba"],
    Chittagong: ["Agrabad", "Halishahar", "Panchlaish", "Kotwali"],
};

const Booking = () => {
    const { service_id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const service = services.find((s) => s.id === service_id);

    const [durationType, setDurationType] = useState("hours");
    const [durationValue, setDurationValue] = useState(1);
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    if (!service) return <div className="min-h-screen flex items-center justify-center text-gray-600">Service not found!</div>;

    const pricePerUnit = durationType === "hours" ? service.price_per_hour : service.price_per_day;
    const totalCost = pricePerUnit * durationValue;

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!division || !district || !area || !address) {
            toast.error("Please fill all location fields!");
            return;
        }
        setLoading(true);

        const bookingData = {
            id: Date.now().toString(),
            serviceId: service.id,
            serviceName: service.title,
            serviceImage: service.image,
            userEmail: user.email,
            userName: user.displayName,
            durationType,
            durationValue,
            totalCost,
            division,
            district,
            city,
            area,
            address,
            status: "Pending",
            bookedAt: new Date().toISOString(),
        };

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
        existing.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(existing));

        // Send email invoice
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    to_name: user.displayName || "Valued Customer",
                    to_email: user.email,
                    service_name: service.title,
                    duration: `${durationValue} ${durationType}`,
                    location: `${area}, ${district}, ${division}`,
                    total_cost: `৳${totalCost}`,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            toast.success("Booking confirmed! Invoice sent to your email.");
        } catch (err) {
            console.error("Email error:", err);
            toast.success("Booking confirmed!");
        }

        setLoading(false);
        navigate("/my-bookings");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Book Service</h2>
                        <p className="text-gray-500 mt-1">Complete your booking for <span className="text-teal-500 font-semibold">{service.title}</span></p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-6">
                        {/* Step 1: Duration */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Step 1: Select Duration</h3>
                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setDurationType("hours")}
                                    className={`flex-1 py-3 rounded-xl font-medium border-2 transition ${durationType === "hours" ? "border-teal-500 bg-teal-50 text-teal-600" : "border-gray-200 text-gray-500"}`}
                                >
                                    Hours (৳{service.price_per_hour}/hr)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDurationType("days")}
                                    className={`flex-1 py-3 rounded-xl font-medium border-2 transition ${durationType === "days" ? "border-teal-500 bg-teal-50 text-teal-600" : "border-gray-200 text-gray-500"}`}
                                >
                                    Days (৳{service.price_per_day}/day)
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Number of {durationType === "hours" ? "Hours" : "Days"}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={durationType === "hours" ? 24 : 30}
                                    value={durationValue}
                                    onChange={(e) => setDurationValue(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                        </div>

                        {/* Step 2: Location */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Step 2: Select Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                    <select
                                        value={division}
                                        onChange={(e) => { setDivision(e.target.value); setDistrict(""); setCity(""); }}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        required
                                    >
                                        <option value="">Select Division</option>
                                        {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <select
                                        value={district}
                                        onChange={(e) => { setDistrict(e.target.value); setCity(""); }}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        required
                                        disabled={!division}
                                    >
                                        <option value="">Select District</option>
                                        {(districtsByDivision[division] || []).map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <select
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        disabled={!district}
                                    >
                                        <option value="">Select City</option>
                                        {(citiesByDistrict[district] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                                    <input
                                        type="text"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder="Enter your area"
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your full address"
                                    required
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                        </div>

                        {/* Step 3: Total Cost */}
                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Step 3: Cost Summary</h3>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Service</span>
                                <span>{service.title}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Duration</span>
                                <span>{durationValue} {durationType}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Rate</span>
                                <span>৳{pricePerUnit} / {durationType === "hours" ? "hr" : "day"}</span>
                            </div>
                            <div className="border-t border-teal-200 pt-3 mt-3 flex justify-between font-bold text-lg">
                                <span>Total Cost</span>
                                <span className="text-teal-600">৳{totalCost}</span>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl font-bold text-lg transition"
                        >
                            {loading ? "Confirming..." : "Confirm Booking"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;