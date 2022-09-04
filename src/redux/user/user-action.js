import blogServices from '../../services/blog-services';

const service = new blogServices();

export const getUser = (value) => ({ type: 'SET-USER', value: value });
export const userError = (value) => ({ type: 'SET-USER-ERROR', value: value });
export const setAuthorized = (value) => ({ type: 'SET-AUTHORIZED', value: value });

export const logUp = (data) => {
  return async (dispatch) => {
    const result = await service.registerUser(data);
    if (result === null) {
      dispatch(userError(true));
      return false;
    }
    localStorage.setItem('token', result.user.token);
    dispatch(getUser(result));
    return true;
  };
};

export const logIn = (data) => {
  return async (dispatch) => {
    const result = await service.loginUser(data);
    if (result === null) {
      dispatch(userError(true));
      return false;
    }
    localStorage.setItem('token', result.user.token);
    await service.getUser();
    dispatch(getUser(result));
    return true;
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    const result = await service.updateUser(data);
    if (result === null) {
      dispatch(userError(true));
      return false;
    }
    localStorage.setItem('token', result.user.token);
    await service.getUser();
    dispatch(getUser(result));
    return true;
  };
};

export const checkAuthorization = () => {
  return async (dispatch) => {
    const result = await service.getUser();
    if (result === null) {
      dispatch(setAuthorized(false));
      return false;
    }
    dispatch(getUser(result));
    return true;
  };
};

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(setAuthorized(false));
  };
};
