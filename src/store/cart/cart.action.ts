import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

import createAction, {
  withMatcher,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const isPresent = cartItems.find(item => item.id === productToAdd.id);
  if (isPresent) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] => {
  const isPresent = cartItems.find(item => item.id === itemToRemove.id);

  if (isPresent && isPresent.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  itemToDelete: CartItem
): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== itemToDelete.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (isOpen: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItem = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItem);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToAdd: CartItem
) => {
  const newCartItem = removeCartItem(cartItems, productToAdd);
  return setCartItems(newCartItem);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToAdd: CartItem
) => {
  const newCartItem = clearCartItem(cartItems, productToAdd);
  return setCartItems(newCartItem);
};
