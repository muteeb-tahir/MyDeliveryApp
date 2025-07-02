import React, { useContext } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { StoreContext } from '../../components/context/StoreContext';

const ExploreMenu = () => {
  const { category, setCategory, setSearchResults } = useContext(StoreContext);

  const handleCategoryClick = (selectedCategory) => {
    // Toggle category
    const newCategory = category === selectedCategory ? 'All' : selectedCategory;
    setCategory(newCategory);

    // Clear search results (only if user had searched before)
    setSearchResults([]);

    // Scroll to food section
    const foodSection = document.getElementById('food-display');
    if (foodSection) {
      foodSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Optionally scroll to that specific category inside the food section
    setTimeout(() => {
      const targetCategory = document.getElementById(selectedCategory);
      if (targetCategory) {
        targetCategory.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>🍽️ Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover delicious categories tailored to every taste — from light bites to hearty meals. Click to explore!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(item.menu_name)}
            className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
          >
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
