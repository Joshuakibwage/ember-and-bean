'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { CartItem, CartInput } from "@/types/cart";

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; payload: CartInput }
  | { type: "REMOVE_ITEM"; payload: { lineId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { lineId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

const STORAGE_KEY = "ember-and-bean-cart";

// same item, different servedAs, are different cart lines
const lineId = (item: Pick<CartItem, "slug" | "servedAs">) =>
  `${item.slug}-${item.servedAs ?? "default"}`;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };

    case "ADD_ITEM": {
      const id = lineId(action.payload);
      const existing = state.items.find((i) => lineId(i) === id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            lineId(i) === id ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        };
      }

      return { items: [...state.items, action.payload] };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => lineId(i) !== action.payload.lineId) };
      }
      return {
        items: state.items.map((i) =>
          lineId(i) === action.payload.lineId ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => lineId(i) !== action.payload.lineId) };

    case "CLEAR_CART":
      return state.items.length === 0 ? state : { items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartInput) => void;
  updateQuantity: (item: Pick<CartItem, "slug" | "servedAs">, quantity: number) => void;
  removeItem: (item: Pick<CartItem, "slug" | "servedAs">) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // load from localStorage once, client-side only — avoids SSR/hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
    } catch {
      // corrupted or inaccessible storage — start with an empty cart, don't crash
    }
  }, []);

  // persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
      updateQuantity: (item, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { lineId: lineId(item), quantity } }),
      removeItem: (item) => dispatch({ type: "REMOVE_ITEM", payload: { lineId: lineId(item) } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};