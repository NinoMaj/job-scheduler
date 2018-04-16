import {
  JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  ADD_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
  JOBS_FAILURE,
  REMOVE_ERROR,
} from '../../actions/jobsActions';
import jobsReducer from '../../reducers/jobsReducer';

test('should have jobs in state when get jobs action is fired', () => {
  const initialState = { loading: false, jobsList: [], errors: [] };
  const data = [
    {
      _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
    },
    {
      _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
    },
  ];

  const loadingAction = {
    type: JOBS_REQUEST,
  };

  const successAction = {
    type: GET_JOBS_SUCCESS,
    payload: data,
  };


  const state = jobsReducer(initialState, loadingAction);
  const newState = jobsReducer(state, successAction);
  expect(newState).toEqual({
    loading: false,
    jobsList: data,
    errors: [],
  });
});

test('new job is added to state when add job action is fired', () => {
  const initialState = {
    loading: false,
    jobsList: [
      {
        _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
      },
      {
        _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
      },
    ],
    errors: [],
  };

  const newJob = {
    _id: 3,
    message: 'Third',
    channel: '#someChannel',
    time: 'Fir May 21 2018 20:00:00 GMT',
  };

  const loadingAction = {
    type: JOBS_REQUEST,
  };

  const addJobAction = {
    type: ADD_JOB_SUCCESS,
    payload: newJob,
  };


  const state = jobsReducer(initialState, loadingAction);
  const newState = jobsReducer(state, addJobAction);
  expect(newState).toEqual({
    loading: false,
    jobsList: [...initialState.jobsList, newJob],
    errors: [],
  });
});

test('job is removed when delete action is fired', () => {
  const initialState = {
    loading: false,
    jobsList: [
      {
        _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
      },
      {
        _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
      },
    ],
    errors: [],
  };

  const jobToRemove = 1;

  const loadingAction = {
    type: JOBS_REQUEST,
  };

  const deleteJobAction = {
    type: DELETE_JOB_SUCCESS,
    payload: jobToRemove,
  };


  const state = jobsReducer(initialState, loadingAction);
  const newState = jobsReducer(state, deleteJobAction);
  expect(newState).toEqual({
    loading: false,
    jobsList: [initialState.jobsList[1]],
    errors: [],
  });
});

test('should have error in state when failure action is fired', () => {
  const initialState = {
    loading: false,
    jobsList: [
      {
        _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
      },
      {
        _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
      },
    ],
    errors: [],
  };

  const errorMessage = 'Error occurred';

  const loadingAction = {
    type: JOBS_REQUEST,
  };

  const failureJobAction = {
    type: JOBS_FAILURE,
    payload: errorMessage,
  };


  const state = jobsReducer(initialState, loadingAction);
  const newState = jobsReducer(state, failureJobAction);
  expect(newState).toEqual({
    loading: false,
    jobsList: initialState.jobsList,
    errors: [errorMessage],
  });
});

test('remove error when remove error action is fired', () => {
  const initialState = {
    loading: false,
    jobsList: [
      {
        _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
      },
      {
        _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
      },
    ],
    errors: ['Error occurred', 'Something went wrong'],
  };

  const removeErrorAction = {
    type: REMOVE_ERROR,
  };


  const state = jobsReducer(initialState, removeErrorAction);
  expect(state).toEqual({
    loading: false,
    jobsList: initialState.jobsList,
    errors: [initialState.errors[1]],
  });
});

test('should have initial state if action with wrong type is called', () => {
  const initialState = {
    loading: false,
    jobsList: [
      {
        _id: 1, message: 'One', channel: '#general', time: 'Sun Dec 17 2018 03:24:00 GMT', status: 'Active',
      },
      {
        _id: 2, message: 'Two', channel: '#general', time: 'Mon Nov 27 2019 22:00:42 GMT', status: 'Active',
      },
    ],
    errors: [],
  };

  const wrongAction = {
    type: 'WRONG_TYPE',
    payload: 1,
  };


  const state = jobsReducer(initialState, wrongAction);
  expect(state).toEqual(initialState);
});
