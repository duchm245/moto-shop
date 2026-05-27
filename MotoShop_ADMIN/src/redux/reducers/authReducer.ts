import Types from "../types";

const userLocal: string | null = localStorage.getItem('user');
const initialState = {
  user: userLocal ? JSON.parse(userLocal) : null,
  token: localStorage.getItem('token') || null,
};

const ReducerAuth = (state = initialState, action) => {
  const { type, value } = action;
  switch (type) {
    case Types.LOGIN:
      return {
        user: value.user,
        token: value.token,
      };
    case Types.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        user: null,
        token: null,
      };

    default: {
      return state;
    }
  }
};

export default ReducerAuth;