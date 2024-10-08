// BlogPage.js

import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

const articles = [
  {
    title: 'Inauguration of the ITEE Training Program for the CSE Students held at CSEDU',
    link: 'https://du.ac.bd/webPost/35/21969',
  },
  {
    title: 'Orientation of the 30th batch of CSEDU',
    link: 'https://du.ac.bd/webPost/35/21902',
  },
  {
    title: 'Workshop on BAETE Accreditation and CO-PO Attainment Held at CSEDU',
    link: 'https://du.ac.bd/webPost/35/21948',
  },
  {
    title:
      'Professional Masters in Information and Cyber Security (PMICS) প্রোগ্রামের ৩য় ব্যাচের ওরিয়েন্টেশন প্রোগ্রাম অনুষ্ঠিত',
    link: 'https://du.ac.bd/webPost/35/21881',
  },
  {
    title: "A seminar on 'Trauma Management ' held at CSEDU",
    link: 'https://du.ac.bd/webPost/35/21867',
  },
  {
    title:
      '৪৮তম আন্তর্জাতিক কলেজিয়েট প্রোগ্রামিং প্রতিযোগিতার (আইসিপিসি) ওয়ার্ল্ড ফাইনাল-২০২৪ এ ঢাকা বিশ্ববিদ্যালয়ের সাফল্য',
    link: 'https://du.ac.bd/webPost/35/21850',
  },
  {
    title:
      "Seminar on 'Navigating Your Future: A Comprehensive Guide to Higher Studies in the USA.' held at CSEDU",
    link: 'https://du.ac.bd/webPost/35/21949/',
  },
  {
    title:
      'CSEDU PhD student has been awarded the prestigious Drs. Muhammad Harunur and Fatema Rashid Scholarship Award',
    link: 'https://du.ac.bd/webPost/35/21724',
  },
  {
    title: 'Code Samurai 2024 Celebration with Japanese Ambassador Iwama Kiminori',
    link: 'https://du.ac.bd/webPost/35/21514',
  },
  // Add more articles as needed
];

const BlogPage = () => {
  const cardStyle = {
    height: '250px', // Set a fixed height for all cards
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom align="center">
        Events
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Explore all the events of CSEDUAA
      </Typography>

      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={cardStyle}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {article.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogPage;
