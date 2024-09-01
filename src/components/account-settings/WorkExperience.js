// ** React Imports
import { useContext, useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from 'src/context/AuthContext';
import FormModalButton from '../tables/FormModalButton';
import { CheckboxInput, DateInput, FormBuilder, Input } from '../forms/FormBuilder';
import { createExperience, deleteExperience, updateExperience } from 'src/services/query/user';
import { toast } from 'react-toastify';

const WorkExperience = ({ setLoading }) => {
  const { userData, fetchUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(experience);
      await (experience ? updateExperience : createExperience)({ ...data, id: experience?.id });
      setOpen(false);
      toast.success(`Your Work Experience has been added.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error creating Work Experience.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      toast.success(`Your Experience has been deleted.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error deleting Experience.');
    } finally {
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <h3 className="mt-2 mb-2">Work Experience</h3>

        <FormModalButton
          open={open}
          setOpen={setOpen}
          buttonTitle="+ New Work Experience"
          heading="Add New Work Experience"
          maxWidth="sm"
        >
          <FormBuilder onSubmit={handleSubmit}>
            {(register, errors, { control, setValue }) => {
              return (
                <>
                  <Input
                    name="company_name"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.company_name}
                    class_name="col-12 mt-2"
                    label={'Company Name'}
                  />
                  <Input
                    name="branch"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.branch}
                    class_name="col-12 mt-2"
                    label={'Branch'}
                  />
                  <Input
                    name="position"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.position}
                    class_name="col-12 mt-2"
                    label={'Position'}
                  />
                  <DateInput
                    name="starting_date"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.starting_date}
                    class_name="col-12 mt-2"
                    label={'Start Date'}
                  />
                  <DateInput
                    name="ending_date"
                    errors={errors}
                    register={register}
                    defaultValue={experience?.ending_date}
                    class_name="col-12 mt-2"
                    label={'End Date'}
                  />
                  <CheckboxInput
                    register={register}
                    errors={errors}
                    defaultValue={experience?.currently_working}
                    name="currently_working"
                    label={'I currently work here'}
                  />

                  <div className="d-flex justify-content-center">
                    <Button className="me-5" type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                    <Button onClick={() => setOpen(false)} variant="contained" color="error">
                      Close
                    </Button>
                  </div>
                </>
              );
            }}
          </FormBuilder>
        </FormModalButton>
      </div>
      <div className="row mt-3">
        {userData.work_experiences?.map((experience) => (
          <div className="d-flex align-items-start mt-4">
            <div className="w-100 row">
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={experience.company_name}
                  disabled
                  label="Company"
                />
              </div>
              <div className="col-6 p-2">
                <TextField className="w-100" value={experience.branch} disabled label="Branch" />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={experience.position}
                  disabled
                  label="Position"
                />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={experience.starting_date}
                  disabled
                  label="Start Date"
                />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={
                    experience.is_currently_studying ? 'Currently Studying' : experience.ending_date
                  }
                  disabled
                  label="End Date"
                />
              </div>
            </div>
            <div className="d-flex flex-column ps-3">
              <Button
                onClick={() => {
                  setExperience(experience);
                  setOpen(true);
                }}
                color="success"
                variant="outlined"
                className="mt-2 w-100"
              >
                Edit
              </Button>
              <Button
                color="error"
                className="mt-3 w-100"
                variant="contained"
                onClick={() => handleDelete(experience.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
