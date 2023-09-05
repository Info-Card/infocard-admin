import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../../layouts/Layout';
import LayoutContext from '../../context/LayoutContext';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function AdminLayout(props) {
  const classes = useStyles(props);
  const history = useHistory();
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    }
  }, [history, authUser]);
  return (
    <LayoutContext.Provider value={{ content: props.children }}>
      <div className={classes.root}>
        <CssBaseline />
        <Layout />
      </div>
    </LayoutContext.Provider>
  );
}

AdminLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default AdminLayout;
