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
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_REQUEST:
      return Object.assign({}, state, { loading: true });
    case GET_JOBS_SUCCESS:
      return Object.assign(
        {},
        state,
        { jobsList: [...action.payload], loading: false },
      );
    case ADD_JOB_SUCCESS:
      return Object.assign(
        {},
        state,
        { jobsList: [...state.jobsList, action.payload], loading: false },
      );
    case DELETE_JOB_SUCCESS: {
      return Object.assign(
        {},
        state,
        {
          jobsList: state.jobsList.filter(job => job._id !== action.payload),
          loading: false,
        },
      );
    }
    case JOBS_FAILURE:
      return Object.assign({}, state, { errors: action.payload, loading: false });
    case REMOVE_ERRORS:
      return Object.assign({}, state, { errors: [] });
    default:
      return state;
  }
};

export default jobsReducer;
