// create a context for the auth state

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface ICartProvider {
  items: any;
  addItem: (item: any) => void;
  updateQuantity: (item: any, quantity: number) => void;
  removeItem: (item: any) => void;
  getTotal: () => number;
  isItemInCart: (item: any) => boolean;
  getTotalCount: () => number;
  getTaxAmount: (tax: number) => number;
  getFinalTotal: (tax: number) => number;
}

export const CartContext = createContext<ICartProvider>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  getTotal: () => 0,
  isItemInCart: () => false,
  getTotalCount: () => 0,
  getTaxAmount: () => 0,
  getFinalTotal: () => 0,
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: any) => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    if (items.length) localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setItems(JSON.parse(cart));
    }
  }, []);

  const addItem = (item: any) => {
    item = { ...item, price: Number(item.price) };
    const existingItem = items.find((i: any) => i._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
      setItems([...items]);
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (item: any, quantity: number) => {
    const existingItem = items.find((i: any) => i._id === item._id);

    if (existingItem) {
      existingItem.quantity = quantity;
      setItems([...items]);
    }
  };

  const removeItem = (item: any) => {
    setItems(items.filter((i: any) => i._id !== item._id));
  };

  const getTotal = () => {
    return items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  };

  const isItemInCart = (item: any) => {
    return items.some((i: any) => i._id === item._id);
  };

  const getTotalCount = () => {
    return items.reduce((acc: number, item: any) => acc + item.quantity, 0);
  };

  const getTaxAmount = (tax: number) => {
    const total = getTotal();
    return total * (tax / 100);
  };

  const getFinalTotal = (tax: number) => {
    const total = getTotal();
    const taxAmount = getTaxAmount(tax);
    return total + taxAmount;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        getTotal,
        isItemInCart,
        getTotalCount,
        getTaxAmount,
        getFinalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
