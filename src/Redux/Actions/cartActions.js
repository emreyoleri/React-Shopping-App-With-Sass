export const getCart = (cart) => (dispatch) => {
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };
  