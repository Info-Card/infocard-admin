import React, { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from '../../components/AdminBreadcrumbs/AdminBreadcrumbs';
import { useSelector } from 'react-redux';

const DashboardPage = (props) => {
  const { history } = props;

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    }
  }, [history, authUser]);

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <AdminBreadcrumbs path={history} />
    </AdminLayout>
  );
};

export default DashboardPage;
