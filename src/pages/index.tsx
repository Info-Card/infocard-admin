import { DashboardLayout } from '@/layouts/dashboard/layout';
import React from 'react';

const DashboardPage = () => {
  return <div></div>;
};

DashboardPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default DashboardPage;
