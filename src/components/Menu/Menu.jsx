import { useState } from "react";
import data from "../../constants/data";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = ({ showFullMenu = false }) => {
  const menuData = data.menuData;

  // For tab/category switching
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);

  // If not showing full menu, just show the intro/preview
  if (!showFullMenu) {
    return (
      <section className="menu py-6" id="menu">
        <div className="container">
          <div className="section-title bg-dark">
            <h2 className="text-upper text-white text-center">Menu</h2>
          </div>
          <div className="menu-content">
            <div className="menu-item-left" data-aos="fade-right">
              <img
                src={data.menuIntro.image}
                alt="Delicious food"
                className="menu-image"
              />
            </div>
            <div className="menu-item-right" data-aos="fade-left">
              <div className="menu-info">
                <p>{data.menuIntro.description}</p>
                <Link to="/menu" className="btn btn-accent">
                  {data.menuIntro.buttonText} <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full menu with category tabs
  const activeMenu = menuData.find(
    (menu) => menu.category === activeCategory
  );

  return (
    <section className="menu py-6" id="menu">
      <div className="container">
        <div className="section-title bg-dark">
          <h2 className="text-upper text-white text-center">Menu</h2>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs">
          {menuData.map((menu) => (
            <button
              key={menu.category}
              className={`menu-tab ${
                activeCategory === menu.category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(menu.category)}
            >
              {menu.category}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="menu-sections">
          {activeMenu.sections.map((section, idx) => (
            <div className="menu-section" key={idx}>
              {section.title && (
                <h3 className="menu-section-title text-accent text-upper">{section.title}</h3>
              )}
              <ul className="menu-items">
                {section.items.map((item, i) => (
                  <li className="menu-item" key={i}>
                    <div className="menu-item-header">
                      <span className="menu-item-name fs-16">{item.name}</span>
                      <span className="menu-item-price fs-16">₹{item.price}</span>
                    </div>
                    <div className="menu-item-desc fs-14">{item.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
