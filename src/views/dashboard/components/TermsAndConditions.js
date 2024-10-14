import { Container, Typography } from '@mui/material';

const TermsAndConditions = () => (
  <Container>
    <Typography variant="h3" gutterBottom>
      Terms and Conditions
    </Typography>
    <Typography variant="body1">
      <p>Only members of alumni association is allowed to Pay.</p>
      <p>
        Refundable amount will be refunded within 7 to 10 working days from the date of resolution
        of the complaint.
      </p>
    </Typography>
  </Container>
);

export default TermsAndConditions;
