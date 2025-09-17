import { CartStateItem, getCartDetails } from '@/lib/get-cart-details';
import { create } from 'zustand';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { addCartItem, deleteCartItem, fetchCart, updateItemQuantity } from '../services/cart';

export interface CartStateProps {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  cartItems: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  deleteCartItem: (id: string) => Promise<void>;
}

export const useCartStore = create<CartStateProps>((set) => ({
  cartItems: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await fetchCart();
      console.log()
      set(getCartDetails(data))
    } catch (err) {
      set({ error: true })
      console.log(err)
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id, quantity) => {
    try {
      set({ loading: true, error: false });
      const data = await updateItemQuantity(id, quantity);
      set(getCartDetails(data))
    } catch (err) {
      set({ error: true })
      console.log(err)
    } finally {
      set({ loading: false })
    }
  },
  addCartItem: async (values) => {
    try {
      set({ loading: true, error: false });
      const data = await addCartItem(values);
      set(getCartDetails(data))
    } catch (err) {
      set({ error: true })
      console.log(err)
    } finally {
      set({ loading: false })
    }
  },
  deleteCartItem: async (id) => {
    try {
      set((state) => {
        state.cartItems.find(item => item.id === id)!.disabled = true
        return ({ loading: true, error: false, cartItems: state.cartItems })
      });
      const data = await deleteCartItem(id);
      set(getCartDetails(data))
    } catch (err) {
      set({ error: true })
      console.log(err)
    } finally {
      set((() => ({ loading: false })))
    }
  }
}))