import AddTagPage from './AddTagPage';
import UpdateTagPage from './UpdateTagPage';

export const TagsPageConfig = {
  routes: [
    {
      path: '/tags/add-tag/:id',
      exact: true,
      component: AddTagPage,
    },
    {
      path: '/tags/:id',
      exact: true,
      component: UpdateTagPage,
    },
  ],
};
