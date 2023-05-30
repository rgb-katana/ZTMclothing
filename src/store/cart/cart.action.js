import { CART_ACTION_TYPES } from './cart.types';

import createAction from '../../utils/reducer/reducer.utils';

export const setIsCartOpen = isOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
};

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, itemToRemove) => {
  const isPresent = cartItems.find(item => item.id === itemToRemove.id);

  if (isPresent.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, itemToDelete) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToDelete.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItem = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem);
};

export const removeItemFromCart = (cartItems, productToAdd) => {
  const newCartItem = removeCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem);
};

export const clearItemFromCart = (cartItems, productToAdd) => {
  const newCartItem = clearCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem);
};
