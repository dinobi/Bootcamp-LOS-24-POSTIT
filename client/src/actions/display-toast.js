export const ADD_TOAST_MESSAGE = 'ADD_TOAST_MESSAGE';
export const DELETE_TOAST_MESSAGE = 'DELETE_TOAST_MESSAGE';

const addToastMessage = message => ({
  type: ADD_TOAST_MESSAGE,
  message
});

const deleteToastMessage = id => ({
  type: DELETE_TOAST_MESSAGE,
  id
});

export { addToastMessage, deleteToastMessage };
