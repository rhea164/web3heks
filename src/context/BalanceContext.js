import createDataContext from "./createDataContext";
import { getBalance, rewardGoodDeed, purchaseCourse,requestAirdrop, createUserAccount } from '../../solana-program/src/utils/solanaUtils';

const BalanceReducer = (state, action) => {
    switch (action.type) {
        case 'set_balance':
            return { ...state, balance: action.payload };
        case 'add_contribution':
            return { ...state, userContributions: state.userContributions + 1 };
        case 'add_badge':
            return { ...state, badges: [...state.badges, action.payload] };
        default:
            return state;
    }
}

const setBalance = (dispatch) => async () => {
    try {
        const balance = await getBalance();
        dispatch({ type: 'set_balance', payload: balance / 1e9 }); // Convert lamports to SOL
    } catch (error) {
        console.error("Failed to fetch balance:", error);
    }
};

const addContribution = (dispatch) => async () => {
    dispatch({ type: 'add_contribution' });
    try {
        await rewardGoodDeed(0.125); // Reward 0.125 SOL
        await setBalance()(dispatch); // Update balance after rewarding
    } catch (error) {
        console.error('Error rewarding good deed:', error);
    }
};

const purchaseCourseAction = (dispatch) => async (cost) => {
    try {
        await purchaseCourse(cost);
        await setBalance()(dispatch); // Update balance after purchase
    } catch (error) {
        console.error('Error purchasing course:', error);
        throw error; // Rethrow the error so it can be handled in the component
    }
};

const addBadge = (dispatch) => (badgeType) => {
    dispatch({ type: 'add_badge', payload: badgeType });
};

const checkBadgeEligibility = (dispatch) => (contributions) => {
    if (contributions === 10) {
        addBadge(dispatch)('Bronze');
    } else if (contributions === 20) {
        addBadge(dispatch)('Silver');
    } else if (contributions === 30) {
        addBadge(dispatch)('Gold');
    } else if (contributions === 40) {
        addBadge(dispatch)('Platinum');
    }
};

const initializeAccount = (dispatch) => async () => {
    try {
      await requestAirdrop();
      await createUserAccount();
      const balance = await getBalance();
      dispatch({ type: 'set_balance', payload: balance / 1e9 });
    } catch (error) {
      console.error("Failed to initialize account:", error);
    }
  };
  
  export const { Context, Provider } = createDataContext(
      BalanceReducer,
      { setBalance, addContribution, purchaseCourseAction, addBadge, checkBadgeEligibility, initializeAccount },
      { balance: 0, userContributions: 0, badges: [] }
  );
