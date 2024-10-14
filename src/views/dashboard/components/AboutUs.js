import { Container, Typography } from '@mui/material';

const AboutUs = () => (
  <Container>
    <Typography variant="h3" gutterBottom>
      About Us
    </Typography>
    <Typography variant="body1">
      <p style={{ textAlign: 'justify' }}>
        CSEDU Alumni Association is a vibrant community of past graduates who have walked the halls
        of the University of Dhaka's prestigious CSE department. This association is not just an
        alumni network; it is a family of professionals, pioneers, and trailblazers who have gone on
        to make significant contributions in the field of technology and beyond.
      </p>

      <p style={{ textAlign: 'justify' }}>
        Through CSEDUAA, alumni have the opportunity to give back to their alma mater in various
        ways, including guest lectures, scholarship programs, and collaborative research projects.
        The association is dedicated to upholding the legacy of excellence associated with the CSE
        department of the University of Dhaka and strives to contribute positively to the tech
        community both locally and globally.
      </p>

      <p style={{ textAlign: 'justify' }}>
        Joining CSEDUAA is more than just staying connected; it's about being a part of a continuing
        journey of innovation and excellence. We welcome all CSEDU alumni to be a part of this
        ever-growing family.
      </p>
    </Typography>
  </Container>
);

export default AboutUs;
