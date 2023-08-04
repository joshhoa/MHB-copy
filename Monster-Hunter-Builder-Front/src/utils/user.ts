import { UserResponse } from '../@types/user';

export const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem('user');
  // Make it a javascript object
  const userData = userDataStr ? (JSON.parse(userDataStr) as UserResponse) : null;
  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
