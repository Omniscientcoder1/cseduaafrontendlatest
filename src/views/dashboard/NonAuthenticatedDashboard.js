import { Button, Divider, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import CommitteeSlider from 'src/components/shared/CommitteeSlider';
import { getCommittee } from 'src/services/query/committee';
import { auth, provider } from 'src/views/authentication/auth/firebaseConfig';
import cards from 'src/views/dashboard/components/Cards'; // Importing the cards array
import CustomCard from 'src/views/dashboard/components/CustomCard';
// Import images
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AuthContext } from 'src/context/AuthContext';
import { privateAxios } from 'src/services/request/axiosConfig';
import { setTokenInHeader } from 'src/services/request/axiosHelper';

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
    width: '2560px', // Example size, adjust as needed
    height: '1440px', // Example size, adjust as needed
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
  googleButton: {
    backgroundColor: '#db4437',
    color: '#fff',
    padding: '10px 20px',
    marginTop: '10px',
    marginBottom: '15px',
    '&:hover': {
      backgroundColor: '#c23321',
    },
  },
}));

// const NonAuthenticatedDashboard = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();

// const handleGoogleSignIn = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       localStorage.setItem('email', user.email); // Save user email
//       navigate('/dashboard'); // Redirect to dashboard after sign-in
//     })
//     .catch((error) => {
//       console.error('Error during Google Sign-In:', error);
//     });
// };

// const [committee, setCommittee] = useState([]);

// const fetchCommittee = async () => {
//   try {
//     const res = await getCommittee();
//     setCommittee(res);
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//   fetchCommittee();
// }, []);

// const handleCardClick = () => {
//   navigate('/auth/login'); // Redirect to login page on card click
// };
const NonAuthenticatedDashboard = () => {
  const { loginToAccount } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Google Sign-In function with token verification
  const handleGoogleSignIn = () => {
    setLoading(true);

    const handleSubmit = async (data) => {
      try {
        const res = await loginToAccount(data);
        console.log(res);
        toast.success(`You are successfully logged in.`);
      } catch (error) {
        const statusCode = error.response?.status;

        // Handle different toasts based on the status code
        if (statusCode === 401) {
          toast.error('Invalid Login Credentials.'); // Toast for 401 Unauthorized
        } else if (statusCode === 403) {
          toast.warning('Your account is pending approval.'); // Toast for 403 Forbidden
        } else {
          toast.error(`An error occurred.`); // Generic error toast
        }

        console.log(error);
      } finally {
      }
    };

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const user = result.user;
    //     user.getIdToken().then((idToken) => {
    //       // Send the token to your Django backend for verification
    //       fetch('http://localhost:8000/accounts/google-signin/', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ idToken }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           if (data.error) {
    //             console.error('Error:', data.error);
    //           } else {
    //             console.log('Sign-in successful:', data);
    //             localStorage.setItem('accessToken', data.token);
    //             localStorage.setItem('refreshToken', data.token); // If you have a refresh token
    //             const access_token = localStorage.getItem('accessToken');
    //             const refresh_token = localStorage.getItem('refreshToken');
    //             if (access_token) {
    //               navigate('/dashboard');
    //             } else {
    //               navigate('/home');
    //             }
    //             // Change the route to your dashboard
    //           }
    //         })
    //         .catch((error) => {
    //           console.error('Error during Google Sign-In:', error);
    //         })
    //         .finally(() => {
    //           setLoading(false); // Stop loading once the process is complete
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error during Google Sign-In:', error);
    //     setLoading(false); // Stop loading if there is an error
    //   });
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        user.getIdToken().then((idToken) => {
          // Send the token to your Django backend for verification
          fetch('http://localhost:8000/accounts/google-signin/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          })
            .then(async (response) => {
              const data = await response.json();

              // if (response.ok) {
              //   const username = data.user.username;
              //   const password = data.user.password;
              //   console.log(username, password);
              //   // Prepare the data to pass to handleSubmit
              //   const loginData = {
              //     username,
              //     password,
              //   };

              // Call handleSubmit with the username and password
              // await handleSubmit(loginData);

              // Store the token in localStorage
              localStorage.setItem('accessToken', data.token);
              localStorage.setItem('refreshToken', data.token);
              setTokenInHeader(privateAxios.defaults);

              const access_token = localStorage.getItem('accessToken');
              if (access_token) {
                navigate('/dashboard');
              } else {
                navigate('/home');
              }
              // } else {
              //   console.error('Error:', data);
              //   toast.error('Sign-in failed.');
              // }
            })
            .catch((error) => {
              console.error('Error during Google Sign-In:', error);
              toast.error('An error occurred during sign-in.');
            })
            .finally(() => {
              setLoading(false); // Stop loading once the process is complete
            });
        });
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
        toast.error('Failed to sign in with Google.');
        setLoading(false); // Stop loading if there is an error
      });
  };

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
    navigate('/home/blog-page'); // Redirect to login page on card click
  };

  // Handlers to open and close the modal
  const handleRegisterModalOpen = () => setShowRegisterModal(true);
  const handleRegisterModalClose = () => setShowRegisterModal(false);
  return (
    <div>
      {/* Hero Section */}

      <div className={classes.heroSection}>
        <motion.div
          className={classes.leftContainer}
          initial={{ opacity: 0, x: -100 }} // Start 100px to the left
          animate={{ opacity: 1, x: 0 }} // Animate to original position
          transition={{ duration: 1, delay: 0.5 }} // Adjust duration and delay as needed
        >
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
            {/* <Button variant="contained" className={classes.googleButton} onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button> */}

            <div className={classes.dividerText}>or</div>

            <Button
              variant="contained"
              className={classes.greenButton}
              onClick={handleRegisterModalOpen} // Open modal on click
            >
              Apply for New Membership
            </Button>

            <div className={classes.dividerText}>
              <span>forgot password?</span>
              <a href="/auth/forgot-password" style={{ color: '#007bff', marginLeft: '10px' }}>
                Reset Password
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Video */}

        <motion.div
          className={classes.videoContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <iframe
            width="600"
            height="300"
            src="https://www.youtube.com/embed/VtuPSHhwjY8"
            title="Dhaka University: Centennial Illumination | Documentary"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={classes.videoStyles}
          ></iframe>
        </motion.div>
      </div>

      {/* Welcome Section */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ textAlign: 'justify' }}
        >
          <Typography variant="h3">Welcome to CSEDUAA</Typography>
        </motion.h3>

        <Divider
          sx={{
            height: 4,
            backgroundColor: '#00000',
            margin: '16px 0',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ textAlign: 'justify' }}
        >
          <p style={{ textAlign: 'justify' }}>
            The Department of Computer Science and Engineering (CSE) at University of Dhaka (also
            known as Dhaka University or DU) is a place where brightest of minds from all over the
            country assemble for a greater future. The department, popularly known as CSEDU, has
            been inspiring the best and brightest for more than twenty three years in fostering the
            frontiers of Computer Science and Engineering. We consider all members of the community
            as catalysts of evolution and inspire them to break away from traditional learn and
            apply mentality to create new knowledge and instigate others to do the same. Our
            credibility and efficacy of the methods of education is reflected by our alumni who have
            been performing with excellence in their respective fields; in the top ranking
            universities as teachers and researchers and in the top companies all around the world
            as software engineers and IT specialists. Our students are well equipped to take the
            challenge to stand out as the leaders of tomorrow. We welcome all in our community who
            are willing to take the challenge. Welcome to progress. Welcome to CSEDU.
          </p>
        </motion.p>
      </div>

      {/* About Section */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textAlign: 'justify' }}
        >
          <Typography variant="h3">About CSEDUAA</Typography>
        </motion.h3>
        <Divider
          sx={{
            height: 4,
            backgroundColor: '#000',
            margin: '16px 0',
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textAlign: 'justify' }}
        >
          <p style={{ textAlign: 'justify' }}>
            CSEDU Alumni Association is a vibrant community of past graduates who have walked the
            halls of the University of Dhaka's prestigious CSE department. This association is not
            just an alumni network; it is a family of professionals, pioneers, and trailblazers who
            have gone on to make significant contributions in the field of technology and beyond.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Through CSEDUAA, alumni have the opportunity to give back to their alma mater in various
            ways, including guest lectures, scholarship programs, and collaborative research
            projects. The association is dedicated to upholding the legacy of excellence associated
            with the CSE department of the University of Dhaka and strives to contribute positively
            to the tech community both locally and globally.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Joining CSEDUAA is more than just staying connected; it's about being a part of a
            continuing journey of innovation and excellence. We welcome all CSEDU alumni to be a
            part of this ever-growing family.
          </p>
        </motion.p>
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
            <motion.div
              key={index}
              className={classes.customCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
            >
              <CustomCard title={card.title} description={card.description} image={card.image} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alumni Success Stories Section */}
      {/* <div className={classes.sectionContainer}>
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
      </div> */}

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
      {/* Register Modal */}
      <Modal open={showRegisterModal} onClose={handleRegisterModalClose}>
        <div
          style={{
            padding: '20px',
            maxWidth: '500px',
            margin: 'auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            outline: 'none',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Join the CSEDU Alumni Association
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <Typography variant="body1" gutterBottom>
            Thank you for your interest in joining the Dhaka University CSE Alumni Association.
            Becoming a member allows you to reconnect, stay updated, and contribute to our
            community.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>How to Register:</strong> You can apply for membership by following the steps in
            the guide below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleRegisterModalClose();
              navigate('/auth/register');
            }}
            fullWidth
            style={{ marginTop: '10px' }}
          >
            Proceed to Register
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            href="/registration-guide.pdf" // Path to the PDF in the public folder
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice
            fullWidth
            sx={{ mt: 2 }}
          >
            View Registration Guide (PDF)
          </Button>
        </div>
      </Modal>
      {/* Footer Section */}
      <div className={classes.footer}>
        <Typography variant="body1">
          © 2024 Dhaka University Computer Science and Engineering Alumni Association. All rights
          reserved.
        </Typography>

        <div>
          <a href="/home/privacy-policy" className={classes.footerLink}>
            Privacy Policy
          </a>
          <a href="/home/return-and-refund-policy" className={classes.footerLink}>
            Return and Refund Policy
          </a>
          <a href="/home/terms-and-conditions" className={classes.footerLink}>
            Terms and Conditions
          </a>
          <a href="/home/about-us" className={classes.footerLink}>
            About Us
          </a>
        </div>
        <img
          src="/payment-banner.png" // Path to your image in the public folder
          alt="Footer Logo"
          style={{
            width: '100%', // Set width to 100% to cover the full length of the footer
            height: 'auto', // Keep height auto to maintain aspect ratio
            marginTop: '30px', // Remove margin to ensure no gaps at the top
            marginBottom: '0', // Remove bottom margin for a clean fit
            padding: '0', // Ensure no padding
          }}
        />
      </div>
    </div>
  );
};

export default NonAuthenticatedDashboard;
