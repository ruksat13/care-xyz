import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTrash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-600",
    Confirmed: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
};

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const all = JSON.parse(localStorage.getItem("bookings") || "[]");
        const myBookings = all.filter((b) => b.userEmail === user?.email);
        setBookings(myBookings);
    }, [user]);

    const handleCancel = (id) => {
        const all = JSON.parse(localStorage.getItem("bookings") || "[]");
        const updated = all.map((b) =>
            b.id === id && b.status === "Pending" ? { ...b, status: "Cancelled" } : b
        );
        localStorage.setItem("bookings", JSON.stringify(updated));
        const myBookings = updated.filter((b) => b.userEmail === user?.email);
        setBookings(myBookings);
        toast.success("Booking cancelled!");
        setSelected(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
                    <p className="text-gray-500 mt-1">Track and manage all your care service bookings</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow p-12 text-center">
                        <FaCalendarAlt className="text-teal-300 text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600">No bookings yet</h3>
                        <p className="text-gray-400 mt-2">Book a service to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Image */}
                                    <img
                                        src={booking.serviceImage}
                                        alt={booking.serviceName}
                                        className="w-full md:w-32 h-32 object-cover rounded-xl flex-shrink-0"
                                    />

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">{booking.serviceName}</h3>
                                            <span className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${statusColors[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-teal-400" />
                                                <span>{booking.durationValue} {booking.durationType}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-teal-400" />
                                                <span>{booking.district}, {booking.division}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-teal-400" />
                                                <span>{new Date(booking.bookedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-teal-600 font-bold text-lg">৳{booking.totalCost}</p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setSelected(booking)}
                                                    className="flex items-center gap-2 border border-teal-500 text-teal-500 hover:bg-teal-50 px-4 py-2 rounded-xl text-sm transition"
                                                >
                                                    <FaEye /> View Details
                                                </button>
                                                {booking.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleCancel(booking.id)}
                                                        className="flex items-center gap-2 border border-red-400 text-red-400 hover:bg-red-50 px-4 py-2 rounded-xl text-sm transition"
                                                    >
                                                        <FaTrash /> Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {selected && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{selected.serviceName}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{selected.durationValue} {selected.durationType}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Division</span><span className="font-medium">{selected.division}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">District</span><span className="font-medium">{selected.district}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">City</span><span className="font-medium">{selected.city || "N/A"}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Area</span><span className="font-medium">{selected.area}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="font-medium text-right max-w-[200px]">{selected.address}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`font-semibold px-2 py-0.5 rounded-full ${statusColors[selected.status]}`}>{selected.status}</span></div>
                                <div className="flex justify-between border-t pt-3"><span className="text-gray-700 font-semibold">Total Cost</span><span className="text-teal-600 font-bold text-lg">৳{selected.totalCost}</span></div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                {selected.status === "Pending" && (
                                    <button
                                        onClick={() => handleCancel(selected.id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelected(null)}
                                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-600 py-3 rounded-xl font-medium transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;