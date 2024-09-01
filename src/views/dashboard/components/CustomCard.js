// src/views/dashboard/components/CustomCard.js

import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  media: {
    height: 200,
    borderRadius: '8px 8px 0 0',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
  },
}));

const CustomCard = ({ title, description, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <CardContent className={classes.content}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.description}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
