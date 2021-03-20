import React from 'react';
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = {
    root: {
      background: '#42b72a',
      borderRadius: '6px',
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 16px',
      width: '302px',
      size: '20px',
      fontWeight:'bold',
      '&:hover': {
       background: '#3f932e',
      },
    },
  };

  function ClassNames(props) {
    const { classes, children, className, ...other } = props;
  
    return (
      <Button className={clsx(classes.root, className)} {...other}>
        {children || 'class names'}
      </Button>
    );
  }
  
  ClassNames.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };
  
  export default withStyles(styles)(ClassNames);