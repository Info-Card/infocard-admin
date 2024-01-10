import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams, useSearchParams } from 'next/navigation';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import Link from 'next/link';
import TagsTable from '@/modules/tags/components/TagsTable';
import { useGetUserQuery } from '@/store/user';
import UserOverviewTab from '../components/UserOverviewTab';

const UserDetailsPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState(
    searchParams.get('tab') || 'overview'
  );

  const { data } = useGetUserQuery(params?.id, {
    skip: !params?.id,
  });

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">User Details</Typography>
            <Link href={`/users/edit/${params?.id}`}>
              <Button variant="contained" size="small">
                Edit
              </Button>
            </Link>
          </Stack>
          <Card sx={{ my: 2 }}>
            <TabContext value={tab}>
              <TabList
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ px: 2 }}
              >
                <Tab label="Overview" value="overview" />
                <Tab label="Tags" value="tags" />
              </TabList>
              <TabPanel value="overview">
                <UserOverviewTab user={data} />
              </TabPanel>
              <TabPanel value="tags">
                <TagsTable user={data?.id} />
              </TabPanel>
            </TabContext>
          </Card>
        </Container>
      </Box>
    </>
  );
};

UserDetailsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default UserDetailsPage;
