import Types from '../types';

export interface CompareItem {
  id: number;
  name: string;
  img: string;
  salePrice: number;
  price: number;
}

const CompareAction = {
  addToCompare: (item: CompareItem) => ({ type: Types.COMPARE_ADD, payload: item }),
  removeFromCompare: (id: number) => ({ type: Types.COMPARE_REMOVE, payload: id }),
  clearCompare: () => ({ type: Types.COMPARE_CLEAR }),
};

export default CompareAction;
