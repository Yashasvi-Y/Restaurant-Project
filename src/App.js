import './App.css';
import './assets/js/script';
import Header from './components/Header/Header'
import WhatWeOffer from './components/WhatWeOffer/WhatWeOffer';
import Menu from './components/Menu/Menu';
import DiningExperience from './components/DiningExperience/DiningExperience';
import Gallery from './components/Gallery/Gallery';
import Team from './components/Team/Team';
import Support from './components/Support/Support';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <WhatWeOffer />
      <Menu />
      <DiningExperience/>
      <Gallery/>
      <Team/>
      <Support/>
      <Footer/>
    </div>
  );
}

export default App;