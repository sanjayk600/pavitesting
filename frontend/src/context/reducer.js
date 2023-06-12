export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        usertype: action.usertype,
        userid: action.userid,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        usertype: null,
        userid: null,
      };

    default:
      return state;
  }
};
export default reducer;
