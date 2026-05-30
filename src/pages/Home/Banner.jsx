import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const slides = [
    {
        id: 1,
        title: "Trusted Baby Care Services",
        subtitle: "Professional babysitters for your little ones — safe, loving, and reliable.",
        bg: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1400&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Compassionate Elderly Care",
        subtitle: "Dedicated caretakers to support your senior family members at home.",
        bg: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1400&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Professional Sick People Care",
        subtitle: "Trained nurses and caretakers for recovering family members.",
        bg: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1400&auto=format&fit=crop",
    },
];
const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[550px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
                >
                    <img
                        src={slide.bg}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                            {slide.subtitle}
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/#services"
                                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition"
                            >
                                Explore Services
                            </Link>
                            <Link
                                to="/register"
                                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition ${index === current ? "bg-teal-400" : "bg-white/50"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;