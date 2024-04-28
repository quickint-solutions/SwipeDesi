// create a context for the auth state

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface ICartProvider {
  items: any;
  addItem: (item: any, quantity?: number) => void;
  updateQuantity: (item: any, quantity: number) => void;
  removeItem: (item: any) => void;
  getTotal: () => number;
  isItemInCart: (item: any) => boolean;
  getTotalCount: () => number;
  getTaxAmount: (tax: number) => number;
  getFinalTotal: (tax: number) => number;
  applyCoupon: (coupon: string) => void;
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
  applyCoupon: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: any) => {
  const [items, setItems] = useState<any>([]);
  const [coupon, setCoupon] = useState<string>('');

  useEffect(() => {
    if (items.length) localStorage.setItem('cart', JSON.stringify(items));
    else localStorage.removeItem('cart');

    if (coupon) localStorage.setItem('coupon', coupon);
    else localStorage.removeItem('coupon');
  }, [items]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    const coupon = localStorage.getItem('coupon');
    if (cart) {
      setItems(JSON.parse(cart));
    }

    if (coupon) {
      setCoupon(coupon);
    }
  }, []);

  const addItem = (item: any, quantity: number = 1) => {
    item = { ...item, price: Number(item.price) };
    const existingItem = items.find((i: any) => i._id === item._id);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      setItems([...items]);
    } else {
      setItems([...items, { ...item, quantity: quantity || 1 }]);
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

  const applyCoupon = async (couponId: string) => {
    try {
      const response = await axios.get(`/coupons/validate?code=${couponId}`);
      if (response.data.length) {
        setCoupon(coupon);
      } else {
        throw new Error('Invalid coupon');
      }
    } catch (error) {
      throw new Error('Invalid coupon');
    }
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
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
