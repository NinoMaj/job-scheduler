import axios from 'axios';

import { API_ROOT, JOBS_API } from '../constants/paths';
import { showNotification } from './uiActions';

const LOCALHOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const JOBS_REQUEST = 'JOBS_REQUEST';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const JOBS_FAILURE = 'JOBS_FAILURE';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const jobsRequest = () => ({ type: JOBS_REQUEST });
export const jobsFailure = err => ({ type: JOBS_FAILURE, payload: err });

export const getJobsSuccess = jobs =>
  ({ type: GET_JOBS_SUCCESS, payload: jobs });

export const getJobs = () => async (dispatch) => {
  dispatch(jobsRequest());

  try {
    const res = await axios({
      method: 'get',
      url: `${LOCALHOST}${API_ROOT}${JOBS_API}`,
    });

    dispatch(getJobsSuccess(res.data));
  } catch (e) {
    const errorMsg = 'Error while fetching jobs.';
    dispatch(jobsFailure(errorMsg));
  }
};

export const addJobSuccess = job =>
  ({ type: ADD_JOB_SUCCESS, payload: job });

export const addJob = job => async (dispatch) => {
  dispatch(jobsRequest());

  try {
    const res = await axios({
      method: 'post',
      url: `${LOCALHOST}${API_ROOT}${JOBS_API}`,
      data: job,
    });
    dispatch(addJobSuccess(res.data));
    dispatch(showNotification({ message: 'New job has been added.' }));
  } catch (e) {
    const errorMsg = 'Error while adding job.';
    dispatch(jobsFailure(errorMsg));
  }
};

export const deleteJobSuccess = job =>
  ({ type: DELETE_JOB_SUCCESS, payload: job });

export const deleteJob = jobId => async (dispatch) => {
  dispatch(jobsRequest());

  try {
    const res = await axios({
      method: 'delete',
      url: `${LOCALHOST}${API_ROOT}${JOBS_API}/${jobId}`,
    });
    dispatch(deleteJobSuccess(res.data));
    dispatch(showNotification({ message: 'The job has been removed.' }));
  } catch (e) {
    const errorMsg = 'Error while deleting job.';
    dispatch(jobsFailure(errorMsg));
  }
};

export const removeErrors = () => ({ type: REMOVE_ERRORS });
