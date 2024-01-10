import { Grid, Typography, SvgIcon, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react';
import Image from 'next/image';
import { getUserImageUrl } from '@/utils/get-Image-url';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserOverviewTab = ({ user }: any) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stack direction="row" gap={1}>
          <Image
            src={getUserImageUrl(user)}
            alt="Image"
            width={100}
            height={100}
            priority
          />
          <Stack gap={2}>
            <Typography variant="h6">{user?.live?.name}</Typography>
            <Stack direction="row" gap={1}>
              <AccountCircleIcon />
              <Typography variant="body1">
                {user?.username}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <EmailIcon />
              <Typography variant="body1">{user?.email}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={8} md={6}></Grid>
    </Grid>
  );
};

export default UserOverviewTab;
