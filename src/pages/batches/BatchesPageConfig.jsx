import AllBatchesPage from './AllBatchesPage';
import AddBatchPage from './AddBatchPage';

export const BatchesPageConfig = {
  routes: [
    {
      path: '/batches',
      exact: true,
      component: AllBatchesPage,
    },
    {
      path: '/batches/add-batch',
      exact: true,
      component: AddBatchPage,
    },
    {
      path: '/batches/:id',
      exact: true,
      component: AddBatchPage,
    },
  ],
};
