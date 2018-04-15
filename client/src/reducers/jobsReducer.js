import {
  JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  ADD_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
  JOBS_FAILURE,
  REMOVE_ERRORS,
} from '../actions/jobsActions';

const initialState = {
  loading: false,
  jobsList: [],
  errors: []
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_REQUEST:
      return Object.assign({}, state, { loading: true, errors: [] });
    case GET_JOBS_SUCCESS:
      return Object.assign(
        {},
        state,
        { jobsList: [...action.payload], loading: false, errors: [] },
      );
    case ADD_JOB_SUCCESS:
      return Object.assign(
        {},
        state,
        { jobsList: [...state.jobsList, action.payload], loading: false, errors: [] },
      );
    case DELETE_JOB_SUCCESS: {
      return Object.assign(
        {},
        state,
        {
          jobsList: state.jobsList.filter(job => job._id !== action.payload),
          loading: false,
          errors: [],
        },
      );
    }
    case JOBS_FAILURE:
      return Object.assign({}, state, { errors: [...action.payload], loading: false });
    case REMOVE_ERRORS:
      return Object.assign({}, state, { errors: state.errors.slice(1) });
    default:
      return state;
  }
};

export default jobsReducer;
