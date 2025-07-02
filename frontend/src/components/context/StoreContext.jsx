import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cartItems, setCartItems] = useState({});

  // ✅ AddToCart function
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // ✅ RemoveFromCart function
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  // Fetch food data
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/food/list`);
        if (res.data.success) {
          setFoodList(res.data.data);
        } else {
          console.error("Food fetch failed:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood();
  }, []);

  const getTotalCartAmount = () => {
    let total = 0;
    for (let itemId in cartItems) {
      const item = foodList.find((food) => food._id === itemId);
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };

  const searchFoodItems = (query) => {
    const lowerQuery = query.toLowerCase();
    const results = foodList.filter((food) =>
      food.name.toLowerCase().includes(lowerQuery)
    );
    setSearchResults(results);
  };

  return (
    <StoreContext.Provider
      value={{
        food_list: foodList,
        setFoodList,
        category,
        setCategory,
        searchResults,
        setSearchResults,
        token,
        setToken,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        searchFoodItems,
        addToCart,         // ✅ include in context
        removeFromCart,    // ✅ include in context
        url: BASE_URL      // ✅ optionally include for use in FoodItem
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
