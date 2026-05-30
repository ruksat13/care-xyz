import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import services from "../../data/services";
import useAuth from "../../hooks/useAuth";
import { FaStar, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const ServiceDetail = () => {
    const { service_id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const service = services.find((s) => s.id === service_id);

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-700">Service not found!</h2>
                <Link to="/" className="mt-4 text-teal-500 hover:underline">Go Home</Link>
            </div>
        );
    }

    const handleBook = () => {
        if (!user) {
            navigate("/login", { state: { from: { pathname: `/booking/${service.id}` } } });
        } else {
            navigate(`/booking/${service.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Helmet>
                <title>{service.title} | Care.xyz</title>
                <meta name="description" content={service.short_description} />
            </Helmet>

            <div className="max-w-5xl mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-teal-500 hover:text-teal-600 mb-6 font-medium"
                >
                    <FaArrowLeft /> Back
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Image */}
                    <div className="h-72 overflow-hidden">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8">
                        {/* Title Row */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div>
                                <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full font-medium">
                                    {service.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-800 mt-2">{service.title}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <FaStar className="text-yellow-400" />
                                    <span className="text-gray-600 font-medium">{service.rating}</span>
                                    <span className="text-gray-400 text-sm">({service.total_bookings}+ bookings)</span>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center min-w-[160px]">
                                <p className="text-sm text-gray-500">Starting from</p>
                                <p className="text-3xl font-bold text-teal-600">৳{service.price_per_hour}</p>
                                <p className="text-xs text-gray-400">per hour</p>
                                <p className="text-sm text-gray-500 mt-1">৳{service.price_per_day} / day</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">About This Service</h2>
                            <p className="text-gray-500 leading-relaxed">{service.description}</p>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">What's Included</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-600">
                                        <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Book Button */}
                        <button
                            onClick={handleBook}
                            className="w-full md:w-auto bg-teal-500 hover:bg-teal-600 text-white px-12 py-4 rounded-xl font-bold text-lg transition"
                        >
                            Book This Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;