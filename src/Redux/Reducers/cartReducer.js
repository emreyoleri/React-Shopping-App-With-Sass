const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case "GET_CART":
      return {
        ...state,
        cart: payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
