import AllTagsPage from './AllTagsPage';
import AddTagPage from './AddTagPage';
import BatchPage from './BatchPage';

export const TagsPageConfig = {
  routes: [
    {
      path: '/tags',
      exact: true,
      component: AllTagsPage,
    },
    {
      path: '/tags/add-tag',
      exact: true,
      component: AddTagPage,
    },
    {
      path: '/tags/:id',
      exact: true,
      component: BatchPage,
    },
  ],
};
