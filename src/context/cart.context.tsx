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
}

export const CartContext = createContext<ICartProvider>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  getTotal: () => 0,
  isItemInCart: () => false,
  getTotalCount: () => 0,
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: any) => {
  const [items, setItems] = useState<any>([]);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
