import {PageModel} from '../_models';

export const PageConstant: { [key: string]: PageModel } = {
  '/orders': {
    title: 'ORDER.PLURAL',
    description: 'ORDER.DESCRIPTION',
    action: null
  },
  '/store': {
    title: 'ORDER.PLURAL',
    description: 'ORDER.DESCRIPTION',
    action: null
  },
  '/products': {
    title: 'PRODUCT.PLURAL',
    description: 'PRODUCT.DESCRIPTION',
    action: {
      text: 'PRODUCT.ADD',
      id: 'product-add',
      route: '/products/add'
    }
  },
  '/products/add': {
    title: 'PRODUCT.PLURAL',
    description: 'PRODUCT.ADD',
    action: null
  },
  '/sections': {
    title: 'SECTION.PLURAL',
    description: 'ORDER.DESCRIPTION',
    action: {
      text: 'SECTION.ADD',
      id: 'section-add',
      route: '/sections/add'
    }
  },
  '/sections/add': {
    title: 'SECTION.PLURAL',
    description: 'SECTION.ADD',
    action: null
  }
};
