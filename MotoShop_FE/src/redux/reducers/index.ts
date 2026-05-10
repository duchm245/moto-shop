import { combineReducers } from 'redux'
import AuthReducer from './authReducer';
import CartReducer from './cartReducer';
import CompareReducer from './compareReducer';


const Reducers = combineReducers({
  AuthReducer,
  CartReducer,
  CompareReducer,
})
export type RootState = ReturnType<typeof Reducers>;
export default Reducers
