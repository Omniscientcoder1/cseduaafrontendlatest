import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, Link } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios'; // Import axios for making API requests
import { getCommittee } from 'src/services/query/committee';
import CommitteeSlider from 'src/components/shared/CommitteeSlider';
import CustomCard from 'src/views/dashboard/components/CustomCard';
import cards from 'src/views/dashboard/components/Cards'; // Importing the cards array
// Import images
import backgroundQuote1 from 'src/assets/images/background_quote1.png';
import backgroundQuote2 from 'src/assets/images/background_quote2.png';

const useStyles = makeStyles((theme) => ({
  // Hero section and button styles...
  heroSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    position: 'relative',
    flexWrap: 'wrap',
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
    },
    '@media (max-width: 768px)': {
      padding: '15px',
    },
    '@media (max-width: 576px)': {
      padding: '10px',
    },
  },
  leftContainer: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '20px',
    marginBottom: '20px',
    '@media (max-width: 1024px)': {
      maxWidth: '100%',
      marginBottom: '20px',
      paddingRight: '0',
    },
    position: 'relative',
    zIndex: 2, // Ensure the form stays above the background image
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
    '@media (max-width: 1024px)': {
      textAlign: 'center',
    },
    '@media (max-width: 576px)': {
      fontSize: '1.5rem',
    },
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#f5a623',
    marginBottom: '20px',
    '@media (max-width: 1024px)': {
      textAlign: 'center',
    },
    '@media (max-width: 576px)': {
      fontSize: '1.2rem',
    },
  },
  inputField: {
    marginBottom: '15px',
    width: '100%',
    '@media (max-width: 576px)': {
      fontSize: '0.9rem',
    },
  },
  button: {
    backgroundColor: '#007bff !important',
    color: '#fff !important',
    padding: '10px 20px !important',
    marginTop: '10px',
    marginBottom: '15px !important',
    '@media (max-width: 1024px)': {
      width: '100%',
      marginBottom: '10px !important',
    },
    '@media (max-width: 576px)': {
      fontSize: '0.9rem !important',
    },
    '&:hover': {
      backgroundColor: '#0056b3 !important',
    },
  },
  googleButton: {
    backgroundColor: '#db4437 !important',
    color: '#fff !important',
    padding: '10px 20px !important',
    marginTop: '10px',
    marginBottom: '15px !important',
    '@media (max-width: 1024px)': {
      width: '100%',
      marginBottom: '10px !important',
    },
    '@media (max-width: 576px)': {
      fontSize: '0.9rem !important',
    },
    '&:hover': {
      backgroundColor: '#c23321 !important',
    },
  },
  secondaryButton: {
    backgroundColor: '#dc3545 !important',
    color: '#fff !important',
    padding: '10px 20px !important',
    marginTop: '10px',
    marginBottom: '15px !important',
    '@media (max-width: 1024px)': {
      width: '100%',
      marginBottom: '10px !important',
    },
    '@media (max-width: 576px)': {
      fontSize: '0.9rem !important',
    },
    '&:hover': {
      backgroundColor: '#c82333 !important',
    },
  },
  greenButton: {
    backgroundColor: '#28a745 !important',
    color: '#fff !important',
    padding: '10px 20px !important',
    marginTop: '10px',
    marginBottom: '15px !important',
    '@media (max-width: 1024px)': {
      width: '100%',
      marginBottom: '10px !important',
    },
    '@media (max-width: 576px)': {
      fontSize: '0.9rem !important',
    },
    '&:hover': {
      backgroundColor: '#218838 !important',
    },
  },
  dividerText: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    color: '#666',
    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid #ddd',
      margin: '0 10px',
    },
  },
  videoContainer: {
    flex: '1 1 50%',
    zIndex: 2, // Ensure the video stays above the background image
    paddingLeft: '20px',
    '@media (max-width: 1024px)': {
      maxWidth: '100%',
      order: -1,
      marginBottom: '20px',
      paddingLeft: '0',
    },
  },
  videoStyles: {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  backgroundImage: {
    position: 'absolute',
    width: '200px', // Example size, adjust as needed
    height: '200px', // Example size, adjust as needed
    zIndex: 1, // Ensure the image stays behind the content
    opacity: 0.5, // Adjust opacity as needed
    pointerEvents: 'none', // Prevent interaction with the image
  },
  sectionTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginTop: '40px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  sectionContainer: {
    padding: '20px 40px',
    backgroundColor: '#f9f9f9',
    marginBottom: '40px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  customCard: {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 40px',
    textAlign: 'center',
  },
  footerLink: {
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const NonAuthenticatedDashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // Initialize navigate

  const [committee, setCommittee] = useState([]);

  const fetchCommittee = async () => {
    try {
      const res = await getCommittee();
      setCommittee(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCommittee();
  }, []);

  const handleCardClick = () => {
    navigate('/auth/login'); // Redirect to login page on card click
  };

  return (
    <div>
      {/* Background Images */}
      <img
        src={backgroundQuote1}
        alt="Background 1"
        className={classes.backgroundImage}
        style={{ bottom: '10%', left: '10%' }}
      />
      <img
        src={backgroundQuote2}
        alt="Background 2"
        className={classes.backgroundImage}
        style={{ top: '10%', right: '10%' }}
      />

      {/* Hero Section */}
      <div className={classes.heroSection}>
        <div className={classes.leftContainer}>
          <h3 className={classes.title}>Dhaka University CSE Alumni Association</h3>
          <p className={classes.subtitle}>
            Reconnect with your <span style={{ color: '#f5a623 !important' }}>Peers</span>.
          </p>

          {/* <TextField
            label="Username"
            placeholder="abcd@example.com"
            variant="outlined"
            className={classes.inputField}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className={classes.inputField}
          /> */}
          <Button
            variant="contained"
            className={classes.button}
            href="/auth/login" // Use href to link to /auth/login
          >
            Login as Member
          </Button>

          <div className={classes.dividerText}>or</div>

          <Button variant="contained" className={classes.greenButton} href="/auth/register">
            Apply for New Membership
          </Button>

          <div className={classes.dividerText}>
            <span>forgot password?</span>
            <a href="#" style={{ color: '#007bff', marginLeft: '10px' }}>
              Reset Password
            </a>
          </div>
        </div>

        {/* Right Side: Video */}
        <div className={classes.videoContainer}>
          <video className={classes.videoStyles} controls>
            <source src="path-to-your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Welcome Section */}
      <div>
        <Typography variant="h3">Welcome to CSEDU</Typography>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000000',
            margin: '16px 0',
          }}
        />
        <p style={{ textAlign: 'justify' }}>
          The Department of Computer Science and Engineering (CSE) at University of Dhaka (also
          known as Dhaka University or DU) is a place where brightest of minds from all over the
          country assemble for a greater future. The department, popularly known as CSEDU, has been
          inspiring the best and brightest for more than twenty three years in fostering the
          frontiers of Computer Science and Engineering. We consider all members of the community as
          catalysts of evolution and inspire them to break away from traditional learn and apply
          mentality to create new knowledge and instigate others to do the same. Our credibility and
          efficacy of the methods of education is reflected by our alumni who have been performing
          with excellence in their respective fields; in the top ranking universities as teachers
          and researchers and in the top companies all around the world as software engineers and IT
          specialists. Our students are well equipped to take the challenge to stand out as the
          leaders of tomorrow. We welcome all in our community who are willing to take the
          challenge. Welcome to progress. Welcome to CSEDU.
        </p>
      </div>

      {/* About Section */}
      <div>
        <Typography variant="h3">About CSEDUAA</Typography>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000',
            margin: '16px 0',
          }}
        />
        <p style={{ textAlign: 'justify' }}>
          CSEDU Alumni Association is a vibrant community of past graduates who have walked the
          halls of the University of Dhaka's prestigious CSE department. This association is not
          just an alumni network; it is a family of professionals, pioneers, and trailblazers who
          have gone on to make significant contributions in the field of technology and beyond.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Through CSEDUAA, alumni have the opportunity to give back to their alma mater in various
          ways, including guest lectures, scholarship programs, and collaborative research projects.
          The association is dedicated to upholding the legacy of excellence associated with the CSE
          department of the University of Dhaka and strives to contribute positively to the tech
          community both locally and globally.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Joining CSEDUAA is more than just staying connected; it's about being a part of a
          continuing journey of innovation and excellence. We welcome all CSEDU alumni to be a part
          of this ever-growing family.
        </p>
      </div>

      {/* Current Committee Section */}
      <div>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000',
            margin: '16px 0',
          }}
        />
        <Typography variant="h3">Current Committee</Typography>
        <CommitteeSlider committee={committee} />
      </div>

      {/* Event Highlights Section */}
      <div className={classes.sectionContainer}>
        <Typography variant="h3">Event Highlights</Typography>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000',
            margin: '16px 0',
          }}
        />
        <div className={classes.cardGrid}>
          {cards.slice(0, 2).map((card, index) => (
            <div
              key={index}
              className={classes.customCard}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
            >
              <CustomCard title={card.title} description={card.description} image={card.image} />
            </div>
          ))}
        </div>
      </div>

      {/* Alumni Success Stories Section */}
      <div className={classes.sectionContainer}>
        <Typography variant="h3">Alumni Success Stories</Typography>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000',
            margin: '16px 0',
          }}
        />
        <div className={classes.cardGrid}>
          {cards.slice(2, 4).map((card, index) => (
            <div
              key={index}
              className={classes.customCard}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
            >
              <CustomCard title={card.title} description={card.description} image={card.image} />
            </div>
          ))}
        </div>
      </div>

      {/* Get Involved Section */}
      <div className={classes.sectionContainer}>
        <Typography variant="h3">Get Involved</Typography>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000',
            margin: '16px 0',
          }}
        />
        <p style={{ textAlign: 'justify' }}>
          We encourage all alumni to stay connected and get involved in the various initiatives and
          programs organized by CSEDUAA. Whether it's mentoring current students, attending alumni
          events, or contributing to scholarship funds, your involvement is crucial to the success
          of our community.
        </p>
        <div className={classes.buttonContainer}>
          {/* <Button variant="contained" className={classes.button}>
            Learn More
          </Button> */}
        </div>
      </div>

      {/* Footer Section */}
      <div className={classes.footer}>
        <Typography variant="body1">
          © 2024 Dhaka University Computer Science and Engineering Alumni Association. All rights
          reserved.
        </Typography>
        <div>
          <a href="/privacy-policy" className={classes.footerLink}>
            Privacy Policy
          </a>
          <a href="/terms-of-service" className={classes.footerLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default NonAuthenticatedDashboard;
