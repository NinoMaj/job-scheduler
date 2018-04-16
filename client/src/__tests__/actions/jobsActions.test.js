import {
  GET_JOBS_SUCCESS,
  ADD_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
  JOBS_FAILURE,
  getJobsSuccess,
  addJobSuccess,
  deleteJobSuccess,
  jobsFailure,
} from '../../actions/jobsActions';

test('get jobs success action should have correct type', () => {
  const data = [
    {
      _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
    },
    {
      _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
    },
  ];

  const action = getJobsSuccess(data);

  expect(action.type).toEqual(GET_JOBS_SUCCESS);
});

test('get jobs success action should have correct payload', () => {
  const data = [
    {
      _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
    },
    {
      _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
    },
  ];

  const action = getJobsSuccess(data);

  expect(action.payload).toEqual(data);
});

test('add job success action should have correct type', () => {
  const data = {
    _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
  };

  const action = addJobSuccess(data);

  expect(action.type).toEqual(ADD_JOB_SUCCESS);
});

test('add job success action should have correct payload', () => {
  const data = {
    _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
  };

  const action = addJobSuccess(data);

  expect(action.payload).toEqual(data);
});

test('remove job success action should have correct type', () => {
  const id = 1;

  const action = deleteJobSuccess(id);

  expect(action.type).toEqual(DELETE_JOB_SUCCESS);
});

test('remove job success action should have correct payload', () => {
  const id = 1;

  const action = deleteJobSuccess(id);

  expect(action.payload).toEqual(id);
});

test('job failure action should have correct type', () => {
  const errorMsg = 'Error while doing somehting with the job.';

  const action = jobsFailure(errorMsg);

  expect(action.type).toEqual(JOBS_FAILURE);
});

test('remove job success action should have correct payload', () => {
  const errorMsg = 'Error while doing something with the job.';

  const action = jobsFailure(errorMsg);

  expect(action.payload).toEqual(errorMsg);
});