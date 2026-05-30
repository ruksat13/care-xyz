import { Link } from "react-router-dom";
import services from "../../data/services";
import { FaStar } from "react-icons/fa";

const Services = () => {
    return (
        <section id="services" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">
                        Our <span className="text-teal-500">Services</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        We provide reliable and professional care services for your loved ones — anytime, anywhere.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
                        >
                            <div className="overflow-hidden h-52">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full font-medium">
                                    {service.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                    {service.short_description}
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <FaStar />
                                        <span className="text-gray-700 text-sm font-medium">{service.rating}</span>
                                    </div>
                                    <span className="text-teal-600 font-semibold text-sm">
                                        ৳{service.price_per_day}/day
                                    </span>
                                </div>
                                <Link
                                    to={`/service/${service.id}`}
                                    className="block text-center bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl font-medium transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;