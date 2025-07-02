import React, { useContext } from "react";
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from "../../components/context/StoreContext";

const FoodDisplay = () => {
  const { category, searchResults, food_list } = useContext(StoreContext);

  const filteredFood = category === "All"
    ? food_list
    : food_list.filter(item => item.category === category);

  const displayList = searchResults.length > 0 ? searchResults : filteredFood;

  return (
    <div className="food-display" id="food-display">
      {searchResults.length > 0 ? (
        <>
          <h2>Search Results</h2>
          <div className="food-grid">
            {searchResults.map((item, index) => (
<FoodItem key={item._id} {...item} />

            ))}
          </div>
        </>
      ) : (
        <>
          {category === "All"
            ? [...new Set(food_list.map(item => item.category))].map((cat) => (
                <div key={cat} id={cat}>
                  <h2>{cat}</h2>
                  <div className="food-grid">
                    {food_list
                      .filter(item => item.category === cat)
                      .map((item, index) => (
                        <FoodItem key={item._id || index} {...item} />
                      ))}
                  </div>
                </div>
              ))
            : (
              <div id={category}>
                <h2>{category}</h2>
                <div className="food-grid">
                  {filteredFood.map((item, index) => (
                    <FoodItem key={item._id || index} {...item} />
                  ))}
                </div>
              </div>
            )
          }
        </>
      )}
    </div>
  );
};

export default FoodDisplay;
