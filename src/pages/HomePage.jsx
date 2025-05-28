import Header from '../components/Header/Header';
import WhatWeOffer from '../components/WhatWeOffer/WhatWeOffer';
import Menu from '../components/Menu/Menu';
import DiningExperience from '../components/DiningExperience/DiningExperience';
import Gallery from '../components/Gallery/Gallery';
import Team from '../components/Team/Team';
import Support from '../components/Support/Support';
import Footer from '../components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <WhatWeOffer />
      <Menu />
      <DiningExperience />
      <Gallery />
      <Team />
      <Support />
      <Footer />
    </>
  );
}
