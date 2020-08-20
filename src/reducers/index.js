import { CREATE_PROJECT } from '../actions/action-types';

const initialState = {
  projects: []
};

function rootReducer(state = intialState, action) {
  if (action.type === CREATE_PROJECT) {
    state.projects = [...state.projects, action.payload];
  }
  return state;
};

export default rootReducer;