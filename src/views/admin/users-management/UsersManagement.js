// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import { FormBuilder, Input, Textarea } from 'src/components/forms/FormBuilder';
import FormModalButton from 'src/components/tables/FormModalButton';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import {
  createReferrals,
  getUsers,
  makeAdmin,
  removeAdmin,
  setRole,
} from 'src/services/query/user';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { adminMailSend } from 'src/services/query/mails';
import { Add, Send } from '@mui/icons-material';
import ConfirmationPopup from 'src/components/popup/ConfirmationPopup';
import SetRolePopup from 'src/components/popup/SetRolePopup';
import { AuthContext } from 'src/context/AuthContext';
import { getBatches } from 'src/constants/options';

const filterFields = [
  { label: 'Name', field: 'name', type: 'string' },
  { label: 'Username', field: 'username', type: 'string' },
  { label: 'Batch', field: 'batch', type: 'select', options: getBatches() },
  { label: 'Company', field: 'company', type: 'string' },
  { label: 'Hometown', field: 'hometown', type: 'string' },
  { label: 'Country', field: 'country', type: 'string' },
  { label: 'City', field: 'city', type: 'string' },
];

const UsersManagement = () => {
  const [open, setOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const { userData } = useContext(AuthContext);

  const onselectionchange = (users) => {
    setSelectedUsers(users);
  };

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      const res = await createReferrals(data);
      toast.success(`Your referral code is sent to ${data.referred_email}.`);
      setOpen(false);
    } catch (error) {
      toast.error('Error creating Referral code.');
    } finally {
    }
  };

  const handleMailSend = async (data) => {
    try {
      const res = await adminMailSend({
        ...data,
        recipients: selectedUsers.map((data) => data.username),
      });
      setEmailDialogOpen(false);
      toast.success('Email sent successfully.');
    } catch (error) {
      toast.error('Error sending mail');
    }
  };

  const handleAdmin = async (username) => {
    try {
      const res = await makeAdmin({
        username: username,
      });
      setEmailDialogOpen(false);
      setForceReload((state) => !state);
      toast.success('New Admin added.');
    } catch (error) {
      toast.error('Error adding new Admin!');
    }
  };

  const handleRemoveAdmin = async (username) => {
    try {
      const res = await removeAdmin(username);
      setEmailDialogOpen(false);
      setForceReload((state) => !state);
      toast.success('Admin removed.');
    } catch (error) {
      toast.error('Error removing Admin!');
    }
  };

  const handleSetRole = async (username, role) => {
    try {
      const res = await setRole({ username: username, role: role });
      setForceReload((state) => !state);
      toast.success(username + ' is now the ' + role);
    } catch (error) {
      toast.error('Error setting role');
    }
  };

  const columns = [
    { id: 'username', label: 'Name' },
    { id: 'first_name', label: 'First Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'email_address', label: 'Email' },
    { id: 'batch_number', label: 'Batch' },
    { id: 'role', label: 'Role' },
    { id: 'membership', label: 'Membership' },
    {
      id: 'admin',
      label: 'Actions',
      render: (_, row) => (
        <div>
          {!row.is_admin
            ? userData.is_admin && (
                <ConfirmationPopup size="small" onConfirm={() => handleAdmin(row.username)}>
                  <Button style={{ width: '120px' }}>Make Admin</Button>
                </ConfirmationPopup>
              )
            : userData.is_superuser && (
                <ConfirmationPopup onConfirm={() => handleRemoveAdmin(row.username)}>
                  <Button style={{ width: '120px' }} color="error">
                    Remove Admin
                  </Button>
                </ConfirmationPopup>
              )}
          <SetRolePopup role={row.role} onConfirm={handleSetRole} username={row.username}>
            <Button>Set Role</Button>
          </SetRolePopup>
        </div>
      ),
    },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <div className="d-flex justify-content-end">
            <FormModalButton
              open={open}
              setOpen={setOpen}
              className="d-flex justify-content-end"
              buttonTitle={
                <span>
                  <Add style={{ fontSize: 18, marginBottom: '2px' }} /> New Invitation
                </span>
              }
              heading="Send Invitation"
              maxWidth="sm"
            >
              <FormBuilder onSubmit={handleSubmit}>
                {(register, errors, { control }) => {
                  return (
                    <>
                      <div className="row mt-3 mb-3">
                        <Input
                          name="referred_email"
                          errors={errors}
                          required={true}
                          register={register}
                          class_name="col-12"
                          label={'Email'}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '20px',
                          width: '100%',
                        }}
                      >
                        <Button
                          className="text-right"
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ flexGrow: 1 }}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setOpen(false)}
                          color="error"
                          style={{ flexGrow: 1 }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  );
                }}
              </FormBuilder>
            </FormModalButton>
            {selectedUsers?.length > 0 && (
              <FormModalButton
                className="d-flex ms-3 justify-content-end"
                buttonTitle={
                  <span>
                    <Send style={{ fontSize: 18, marginBottom: '2px' }} /> Send Mails
                  </span>
                }
                heading="Send Mail"
                onSubmit={() => {}}
                open={emailDialogOpen}
                setOpen={setEmailDialogOpen}
                maxWidth='sm'
              >
                <FormBuilder onSubmit={handleMailSend}>
                  {(register, errors, { control }) => {
                    return (
                      <>
                        <div className="row mt-3">
                          <Input
                            name="subject"
                            register={register}
                            errors={errors}
                            required={true}
                            class_name="col-12"
                            label={'Subject'}
                          />
                          <Textarea
                            name="body"
                            register={register}
                            errors={errors}
                            required={true}
                            class_name="col-12"
                            label={'Email Body'}
                          />
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: '20px',
                              width: '100%',
                            }}
                          >
                            <Button variant="outlined" type="submit" style={{ flexGrow: 1 }}>
                              Submit
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setEmailDialogOpen(false)}
                              color="error"
                              style={{ flexGrow: 1 }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  }}
                </FormBuilder>
              </FormModalButton>
            )}
          </div>
          <CardHeader title="User Management" titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter
            forceReload={forceReload}
            columns={columns}
            filterFields={filterFields}
            fetchData={getUsers}
            onSelectionChange={onselectionchange}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default UsersManagement;
