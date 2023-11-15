import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { OverviewBudget } from '@/sections/overview/overview-budget';
import { OverviewTotalCustomers } from '@/sections/overview/overview-total-customers';
import { OverviewTasksProgress } from '@/sections/overview/overview-tasks-progress';
import { OverviewTotalProfit } from '@/sections/overview/overview-total-profit';
import { OverviewSales } from '@/sections/overview/overview-sales';
import { OverviewLatestProducts } from '@/sections/overview/overview-latest-products';
import { DashboardLayout } from '@/layouts/dashboard/layout';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Overview | Fcorner Admin</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    ></Box>
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;
