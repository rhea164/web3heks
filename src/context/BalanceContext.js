// BalanceContext.js
import createDataContext from "./createDataContext";

const balanceReducer = (state, action) => {
  switch (action.type) {
    case 'update_balance':
      return { ...state, balance: action.payload };
    case 'update_contributions':
      return { ...state, userContributions: action.payload };
    case 'update_badges':
      return { ...state, badges: action.payload };
    default:
      return state;
  }
};

const updateBalance = (dispatch) => {
  return (amount) => {
    dispatch({ type: 'update_balance', payload: amount });
  };
};

const updateContributions = (dispatch) => {
  return (count) => {
    dispatch({ type: 'update_contributions', payload: count });
  };
};

const updateBadges = (dispatch) => {
  return (badges) => {
    dispatch({ type: 'update_badges', payload: badges });
  };
};

const initialState = {
  balance: 1.0, // Initial balance in SOL
  userContributions: 0,
  badges: []
};

export const { Context, Provider } = createDataContext(
  balanceReducer,
  { updateBalance, updateContributions, updateBadges },
  initialState
);