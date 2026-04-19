import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import './MenuFilters.css';

const MenuFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    allergen: [],
    dietary: [],
    category: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    allergens: [],
    dietaryTags: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getFilterOptions();
      setFilterOptions(response.data);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAllergen = (allergen) => {
    const newAllergens = filters.allergen.includes(allergen)
      ? filters.allergen.filter((a) => a !== allergen)
      : [...filters.allergen, allergen];

    const newFilters = { ...filters, allergen: newAllergens };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleDietary = (dietary) => {
    const newDietary = filters.dietary.includes(dietary)
      ? filters.dietary.filter((d) => d !== dietary)
      : [...filters.dietary, dietary];

    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryChange = (e) => {
    const newFilters = { ...filters, category: e.target.value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      allergen: [],
      dietary: [],
      category: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const allergenEmojis = {
    nuts: '🥜',
    dairy: '🥛',
    gluten: '🌾',
    seafood: '🦐',
    eggs: '🥚',
    soy: '🫘'
  };

  const dietaryEmojis = {
    vegan: '🌱',
    vegetarian: '🥗',
    'gluten-free': '🍞',
    keto: '🥩',
    paleo: '🦴'
  };

  if (loading) {
    return <div className="filters-loading">Loading filters...</div>;
  }

  const activeFiltersCount =
    filters.allergen.length + filters.dietary.length + (filters.category ? 1 : 0);

  return (
    <div className="menu-filters">
      <div className="filters-header">
        <h3>Filter Menu</h3>
        {activeFiltersCount > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Category Filter */}
      {filterOptions.categories.length > 0 && (
        <div className="filter-section">
          <label className="filter-title">📋 Category</label>
          <div className="filter-options">
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="">All Categories</option>
              {filterOptions.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Allergen Filter */}
      {filterOptions.allergens.length > 0 && (
        <div className="filter-section">
          <label className="filter-title">⚠️ Allergens</label>
          <p className="filter-desc">Select allergens to avoid</p>
          <div className="filter-buttons">
            {filterOptions.allergens.map((allergen) => (
              <button
                key={allergen}
                className={`filter-btn ${filters.allergen.includes(allergen) ? 'active' : ''}`}
                onClick={() => toggleAllergen(allergen)}
                title={`Avoid ${allergen}`}
              >
                {allergenEmojis[allergen.toLowerCase()] || '🚫'} {allergen}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Filter */}
      {filterOptions.dietaryTags.length > 0 && (
        <div className="filter-section">
          <label className="filter-title">🌿 Dietary Preferences</label>
          <p className="filter-desc">Find items matching your diet</p>
          <div className="filter-buttons">
            {filterOptions.dietaryTags.map((dietary) => (
              <button
                key={dietary}
                className={`filter-btn dietary ${filters.dietary.includes(dietary) ? 'active' : ''}`}
                onClick={() => toggleDietary(dietary)}
                title={dietary}
              >
                {dietaryEmojis[dietary.toLowerCase()] || '🌿'} {dietary}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="active-filters">
          <p className="active-title">Active Filters:</p>
          <div className="filter-tags">
            {filters.allergen.map((allergen) => (
              <span key={`allergen-${allergen}`} className="filter-tag allergen-tag">
                Avoid: {allergen}
                <button onClick={() => toggleAllergen(allergen)}>✕</button>
              </span>
            ))}
            {filters.dietary.map((dietary) => (
              <span key={`dietary-${dietary}`} className="filter-tag dietary-tag">
                {dietary}
                <button onClick={() => toggleDietary(dietary)}>✕</button>
              </span>
            ))}
            {filters.category && (
              <span className="filter-tag category-tag">
                {filters.category}
                <button onClick={() => setFilters({ ...filters, category: '' })}>✕</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuFilters;
