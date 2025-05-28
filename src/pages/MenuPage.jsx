import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';
import "./MenuPage.css";

export default function MenuPage() {
  return (
    <>
      <Header />
      <Menu showFullMenu={true}/>
      <Footer />
    </>
  );
}
