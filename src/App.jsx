import Starfield from './components/Starfield';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SolarSystem from './components/SolarSystem';
import Discover from './components/Discover';
import Missions from './components/Missions';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Starfield />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <SolarSystem />
          <Discover />
          <Missions />
        </main>
        <Footer />
      </div>
    </>
  );
}
