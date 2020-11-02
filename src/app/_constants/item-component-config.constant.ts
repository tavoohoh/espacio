import { ItemNameEnum } from '../_enums';

export const ItemComponentConfigEnum: {
  [key in ItemNameEnum]: { name: string; translateKey: string };
} = {
  [ItemNameEnum.products]: {
    name: 'products',
    translateKey: 'PRODUCT',
  },
  [ItemNameEnum.sections]: {
    name: 'sections',
    translateKey: 'SECTION',
  },
};
