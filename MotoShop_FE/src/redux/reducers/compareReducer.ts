import Types from '../types';
import { CompareItem } from '../actions/compareAction';

const MAX_COMPARE = 4;

interface CompareState {
  items: CompareItem[];
}

const initialState: CompareState = { items: [] };

const CompareReducer = (state = initialState, action: any): CompareState => {
  switch (action.type) {
    case Types.COMPARE_ADD:
      if (state.items.length >= MAX_COMPARE) return state;
      if (state.items.find((i) => i.id === action.payload.id)) return state;
      return { ...state, items: [...state.items, action.payload] };

    case Types.COMPARE_REMOVE:
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };

    case Types.COMPARE_CLEAR:
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default CompareReducer;
