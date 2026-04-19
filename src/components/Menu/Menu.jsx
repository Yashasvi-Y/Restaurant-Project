import { useState, useEffect } from "react";
import data from "../../constants/data";
import { Link } from "react-router-dom";
import { apiGet } from "../../utils/api";
import "./Menu.css";

const Menu = ({ showFullMenu = false }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    allergens: [],
    dietaryTags: []
  });
  const [selectedFilters, setSelectedFilters] = useState({
    allergen: null,
    dietary: null,
    category: 'Lunch'
  });
  const [loading, setLoading] = useState(false);

  // Fetch menu items and filter options on mount
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      // Fetch filter options
      const filterRes = await apiGet('/menu/filters');
      const filters = await filterRes.json();
      setFilterOptions(filters);

      // Fetch all menu items
      const itemRes = await apiGet('/menu');
      const items = await itemRes.json();
      setMenuItems(items);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const getFilteredItems = () => {
    return menuItems.filter(item => {
      let match = true;

      // Filter by category
      if (selectedFilters.category && item.category !== selectedFilters.category) {
        match = false;
      }

      // Filter by allergen (exclude items with selected allergen)
      if (selectedFilters.allergen && item.allergens?.includes(selectedFilters.allergen)) {
        match = false;
      }

      // Filter by dietary tag
      if (selectedFilters.dietary && !item.dietaryTags?.includes(selectedFilters.dietary)) {
        match = false;
      }

      return match;
    });
  };

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

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading menu...</div>;
  }

  const categories = ['Lunch', 'Dinner', 'Beverages'];
  const filteredItems = getFilteredItems();
  
  // Group items by section
  const groupedBySection = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <section className="menu py-6" id="menu">
      <div className="container">
        <div className="section-title bg-dark">
          <h2 className="text-upper text-white text-center">Menu</h2>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`menu-tab ${
                selectedFilters.category === category ? "active" : ""
              }`}
              onClick={() =>
                setSelectedFilters({ ...selectedFilters, category })
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filter Options */}
        <div className="menu-filter-section">
          <div className="filter-group">
            <label className="filter-label">Allergen:</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${selectedFilters.allergen ? "" : "active"}`}
                onClick={() => setSelectedFilters({ ...selectedFilters, allergen: null })}
              >
                All
              </button>
              {filterOptions.allergens?.map((allergen) => (
                <button
                  key={allergen}
                  className={`filter-btn ${
                    selectedFilters.allergen === allergen ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedFilters({
                      ...selectedFilters,
                      allergen: selectedFilters.allergen === allergen ? null : allergen
                    })
                  }
                >
                  No {allergen}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Dietary:</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${selectedFilters.dietary ? "" : "active"}`}
                onClick={() => setSelectedFilters({ ...selectedFilters, dietary: null })}
              >
                All
              </button>
              {filterOptions.dietaryTags?.map((tag) => (
                <button
                  key={tag}
                  className={`filter-btn ${
                    selectedFilters.dietary === tag ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedFilters({
                      ...selectedFilters,
                      dietary: selectedFilters.dietary === tag ? null : tag
                    })
                  }
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items by Section */}
        <div className="menu-sections">
          {Object.entries(groupedBySection).map(([section, items]) => (
            <div className="menu-section" key={section}>
              <h3 className="menu-section-title text-accent text-upper">{section}</h3>
              <ul className="menu-items">
                {items.map((item) => (
                  <li className="menu-item" key={item._id}>
                    <div className="menu-item-header">
                      <span className="menu-item-name fs-16">{item.name}</span>
                      <span className="menu-item-price fs-16">₹{item.price}</span>
                    </div>
                    <div className="menu-item-desc fs-14">{item.description}</div>
                    {(item.allergens?.length > 0 || item.dietaryTags?.length > 0) && (
                      <div className="menu-item-meta">
                        {item.allergens?.length > 0 && (
                          <span className="menu-tags allergens">
                            {item.allergens.join(", ")}
                          </span>
                        )}
                        {item.dietaryTags?.length > 0 && (
                          <span className="menu-tags dietary">
                            {item.dietaryTags.join(", ")}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              No items match your filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
