import data from "../../constants/data";
import "./Menu.css";

const Menu =() => {
    return(
        <section className="menu py-6" id="menu">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">Our Menu</h2>
                </div>
                <div className="menu-content grid py-6">
                    {
                        data.menu.map((menu, index) => {
                            return (
                                <div className="menu-item text-center" key={index} data-aos="fade-up" data-aos-duration="2500">
                                    <div className="menu-item-icon">
                                        <img src={menu.icon} alt="menu icon" className="mx-auto"/>
                                    </div>
                                    <div className="menu-item-text">
                                        <h2>{menu.title}</h2>
                                        <p className="text mx-auto">{menu.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Menu;