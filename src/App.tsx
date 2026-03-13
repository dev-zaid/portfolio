import { Navbar } from "./components/Navbar.tsx";
import { Hero } from "./components/Hero.tsx";
import { About } from "./components/About.tsx";
import { Experience } from "./components/Experience.tsx";
import { Projects } from "./components/Projects.tsx";
import { Skills } from "./components/Skills.tsx";
import { Metrics } from "./components/Metrics.tsx";
import { Contact } from "./components/Contact.tsx";
import { Footer } from "./components/Footer.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Metrics />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
