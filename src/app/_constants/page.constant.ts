import { PageModel } from '../_models';
import { RouteNamesEnums } from '../_enums';

export const PageConstant: { [key in RouteNamesEnums]: PageModel } = {
  [RouteNamesEnums.ORDERS]: {
    title: 'ORDER.PLURAL',
    description: 'ORDER.DESCRIPTION',
    action: null,
  },
  [RouteNamesEnums.STORE]: {
    title: 'STORE.SINGULAR',
    description: 'STORE.DESCRIPTION',
    action: null,
  },
  [RouteNamesEnums.PRODUCTS]: {
    title: 'PRODUCT.PLURAL',
    description: 'PRODUCT.DESCRIPTION',
    action: {
      text: 'PRODUCT.ADD',
      id: 'product-add',
      route: '/products/add',
    },
  },
  [RouteNamesEnums.PRODUCT_ADD]: {
    title: 'PRODUCT.PLURAL',
    description: 'PRODUCT.ADD',
    action: null,
  },
  [RouteNamesEnums.PRODUCT_EDIT]: {
    title: 'PRODUCT.PLURAL',
    description: 'PRODUCT.EDIT',
    action: null,
  },
  [RouteNamesEnums.SECTIONS]: {
    title: 'SECTION.PLURAL',
    description: 'SECTION.DESCRIPTION',
    action: {
      text: 'SECTION.ADD',
      id: 'section-add',
      route: '/sections/add',
    },
  },
  [RouteNamesEnums.SECTION_ADD]: {
    title: 'SECTION.PLURAL',
    description: 'SECTION.ADD',
    action: null,
  },
  [RouteNamesEnums.SECTION_EDIT]: {
    title: 'SECTION.PLURAL',
    description: 'SECTION.ADD',
    action: null,
  },
};
