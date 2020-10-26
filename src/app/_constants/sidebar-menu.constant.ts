import { ButtonEmum, IconEnum } from '../_enums';

export const SidebarMenuConstant: Array<{
  text: string;
  route: string;
  icon: IconEnum;
  type: ButtonEmum;
}> = [
  {
    text: 'ORDER.PENDING_ORDERS',
    route: '/orders',
    icon: IconEnum.Order,
    type: ButtonEmum.Highlighted,
  },
  {
    text: 'PRODUCT.PLURAL',
    route: '/products',
    icon: IconEnum.Product,
    type: ButtonEmum.Menu,
  },
  {
    text: 'SECTION.PLURAL',
    route: '/sections',
    icon: IconEnum.Section,
    type: ButtonEmum.Menu,
  },
  {
    text: 'STORE.SINGULAR',
    route: '/store',
    icon: IconEnum.Store,
    type: ButtonEmum.Menu,
  },
];
