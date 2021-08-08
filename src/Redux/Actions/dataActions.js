export const getUsers = (users) => (dispatch) => {
  dispatch({
    type: "GET_USERS",
    payload: users,
  });
};

export const selectUser = (user) => (dispatch) => {
  dispatch({
    type: "SELECT_USER",
    payload: user,
  });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: "SIGN_OUT",
  });
};

