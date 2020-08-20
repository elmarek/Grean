import { CREATE_PROJECT } from './action-types';

export function createProject(payload) {
  return { type: CREATE_PROJECT, payload}
};