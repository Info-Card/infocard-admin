// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";

const navigationConfig = [
  {
    id: 'Main',
    title: '',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'apps',
        url: '/',
        exact: true,
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        icon: 'person',
        url: '/users',
        exact: true,
      },
      {
        id: 'categories',
        title: 'Categories',
        type: 'item',
        icon: 'category',
        url: '/categories',
        exact: true,
      },
      {
        id: 'batches',
        title: 'Batches',
        type: 'item',
        icon: 'category',
        url: '/batches',
        exact: true,
      },
    ],
  },
];

export default navigationConfig;
