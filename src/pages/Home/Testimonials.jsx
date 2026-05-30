import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Fatema Begum",
    role: "Mother of 2",
    image: "https://i.ibb.co/placeholder1.jpg",
    review: "Care.xyz helped me find the most amazing babysitter for my kids. She was professional, loving, and my children absolutely adored her!",
    rating: 5,
  },
  {
    id: 2,
    name: "Karim Hossain",
    role: "Son of elderly parent",
    image: "https://i.ibb.co/placeholder2.jpg",
    review: "The elderly care service was exceptional. The caretaker was compassionate, punctual, and treated my father with great respect.",
    rating: 5,
  },
  {
    id: 3,
    name: "Nasrin Akter",
    role: "Patient's family member",
    image: "https://i.ibb.co/placeholder3.jpg",
    review: "After my mother's surgery, we needed urgent home care. Care.xyz provided a trained nurse within hours. Truly life-saving service!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            What Our <span className="text-teal-500">Clients Say</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Thousands of families trust Care.xyz for their loved ones. Here's what they say about us.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <FaQuoteLeft className="text-teal-400 text-3xl mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{t.review}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-1 text-yellow-400">
                  {Array(t.rating).fill(0).map((_, i) => <FaStar key={i} className="text-sm" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;