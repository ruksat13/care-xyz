import { FaShieldAlt, FaClock, FaUserCheck, FaHeart } from "react-icons/fa";

const stats = [
    { icon: <FaUserCheck className="text-teal-500 text-3xl" />, value: "500+", label: "Verified Caretakers" },
    { icon: <FaHeart className="text-teal-500 text-3xl" />, value: "1200+", label: "Happy Families" },
    { icon: <FaClock className="text-teal-500 text-3xl" />, value: "24/7", label: "Available Support" },
    { icon: <FaShieldAlt className="text-teal-500 text-3xl" />, value: "100%", label: "Trusted & Safe" },
];

const About = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop"
                            alt="About Care.xyz"
                            className="rounded-2xl shadow-xl w-full object-cover h-96"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white px-6 py-4 rounded-2xl shadow-lg">
                            <p className="text-3xl font-bold">5+</p>
                            <p className="text-sm">Years of Trust</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            About <span className="text-teal-500">Care.xyz</span>
                        </h2>
                        <p className="text-gray-500 mb-4 leading-relaxed">
                            Care.xyz is a trusted platform connecting families with verified and professional caretakers. We believe every family deserves access to reliable care — whether it's for a newborn, an elderly parent, or a recovering family member.
                        </p>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Our mission is to make caregiving easy, secure, and accessible for everyone — right from the comfort of your home.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                                    {stat.icon}
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;