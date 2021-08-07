export const addToCart = (product, user, cart) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
    cartDataFromFirebase: cart,
    user,
  });
};

export const removeFromCart = (productId, user, cart) => (dispatch) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: productId,
    cartDataFromFirebase: cart,
    user,
  });
};

export const removeOneItemFromCart = (product, user, cart) => (dispatch) => {
  dispatch({
    type: "REMOVE_ONE_ITEM_FROM_CART",
    payload: product,
    cartDataFromFirebase: cart,
    user,
  });
};

export const emptyTheCart = () => (dispatch) => {
  dispatch({
    type: "EMPTY_THE_CART",
  });
};
