import Navbar from "../components/Navbar";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Products from "../components/Products.jsx";
import BackToTopButton from "../components/BackToTop.jsx";
function HomePage() {
  return (
    <>
      <Navbar />
        <Hero />
        <About/>
      <Products />
        <Contact/>
        <Footer />
<BackToTopButton />
    </>
  );
}
export default HomePage;