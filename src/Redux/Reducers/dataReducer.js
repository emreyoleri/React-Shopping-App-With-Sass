const initialState = {
  users: [],
  currentUser: null,
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        users: payload,
      };

    case "SELECT_USER":
      localStorage.setItem("currentUser", JSON.stringify(payload));
      return {
        ...state,
        currentUser: payload,
      };
    case "SIGN_OUT":
      localStorage.removeItem("currentUser");
      return {
        ...state,
        cart: [],
        currentUser: null,
      };

  
    default:
      return state;
  }
};

export default dataReducer;
