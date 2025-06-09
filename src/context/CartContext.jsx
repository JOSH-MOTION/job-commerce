// src/context/CartContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [socialData, setSocialData] = useState({});

  const categories = ['All', 'Accessories', 'Shoes', 'Clothing', 'Electronics'];
  const regions = ['All', 'New York', 'London', 'Tokyo', 'Sydney'];

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const addUserProduct = useCallback((product) => {
    const newProduct = {
      ...product,
      id: `user-${Date.now()}-${Math.random()}`,
      seller: 'You',
    };
    setUserProducts((prev) => [...prev, newProduct]);
    setSocialData((prev) => ({
      ...prev,
      [newProduct.id]: { likes: 0, comments: 0, followers: 0 },
    }));
  }, []);

  const getAllProducts = useCallback(
    (category = 'All', region = 'All') => {
      let filtered = [...products, ...userProducts];
      if (category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (region !== 'All') {
        filtered = filtered.filter((p) => p.region === region);
      }
      return filtered;
    },
    [userProducts]
  );

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const toggleLike = useCallback((productId) => {
    setSocialData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        likes: (prev[productId]?.likes || 0) + (prev[productId]?.liked ? -1 : 1),
        liked: !prev[productId]?.liked,
        comments: prev[productId]?.comments || 0,
        followers: prev[productId]?.followers || 0,
      },
    }));
  }, []);

  const followSeller = useCallback((productId) => {
    setSocialData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        likes: prev[productId]?.likes || 0,
        liked: prev[productId]?.liked || false,
        comments: prev[productId]?.comments || 0,
        followers: (prev[productId]?.followers || 0) + 1,
      },
    }));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        addUserProduct,
        getAllProducts,
        getTotalItems,
        socialData,
        toggleLike,
        followSeller,
        categories,
        regions,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);