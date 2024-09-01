// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import TableWithFilter from 'src/components/tables/TableWithFilter';
import {  getMembershipClaims, acceptOrDeclineMembership } from 'src/services/query/user';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import ViewPendingPopup from 'src/components/popup/ViewPendingPopup';
import { AuthContext } from 'src/context/AuthContext';

const filterFields = [
  { label: 'ID', field: 'id', type: 'string' },
  { label: 'Category', field: 'category', type: 'string' },
  { label: 'Amount Paid', field: 'amount_paid', type: 'string' },
  { label: 'Date of Registration', field: 'date_of_registration', type: 'string' },
];

const MembershipClaims = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceReload, setForceReload] = useState(false);

  const onselectionchange = (users) => {
    setSelectedUsers(users);
  };

  const handleAccept = async (id) => {
    try {
      await acceptOrDeclineMembership(id, true);      
      setForceReload((state) => !state);
      toast.success(`Claim no. ${id} has been accepted`);
    } catch (error) {
      toast.error('Error accepting claim!');
    }
  };

  const handleDecline = async (id) => {
    try {
      await acceptOrDeclineMembership(id, false);
      setForceReload((state) => !state);
      toast.warning(`Claim no. ${id} has been declined`);
    } catch (error) {
      toast.error('Error declining claim!');
    }
  };


  const columns = [
    
    { id: 'id', label: 'ID' },
    { id: 'category', label: 'Category' },
    { id: 'amount_paid', label: 'Amount Paid' },
    { id: 'date_of_registration', label: 'Date of Registration' },
    {
      id: 'actions',
      label: 'Actions',
      render: (_, row) =>
              <div>
                <Button type='contained' onClick={() => handleAccept(row.id)}>Accept</Button>
                <Button type='contained' onClick={() => handleDecline(row.id)}>Decline</Button>
              </div>
    },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Membership Claims" titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter
            forceReload={forceReload}
            columns={columns}
            filterFields={filterFields}
            fetchData={getMembershipClaims}
            onSelectionChange={onselectionchange}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default MembershipClaims;
