import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import WhyMesh from '../components/sections/WhyMesh';
import Architecture from '../components/sections/Architecture';
import Modules from '../components/sections/Modules';
import MessageContract from '../components/sections/MessageContract';
import Team from '../components/sections/Team';
import DemoTimeline from '../components/sections/DemoTimeline';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0A0E14] text-white selection:bg-[#3ECF8E] selection:text-black">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        <Hero />
        <WhyMesh />
        <Architecture />
        <Modules />
        <MessageContract />
        <Team />
        <DemoTimeline />
      </main>

      <Footer />
    </div>
  );
}

export default Home