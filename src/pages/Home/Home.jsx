import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Services from "./Services";
import About from "./About";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Care.xyz | Trusted Baby & Elderly Care Services</title>
        <meta name="description" content="Care.xyz provides reliable and professional baby care, elderly care, and sick people care services at home. Book a caretaker easily." />
      </Helmet>
      <Banner />
      <Services />
      <About />
      <Testimonials />
    </div>
  );
};

export default Home;