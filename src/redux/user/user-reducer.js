const userReducer = (state, action) => {
  if (!state) state = { user: {}, isAuthorized: true };

  switch (action.type) {
    case 'SET-USER':
      return { ...state, user: action.value, isAuthorized: true };
    case 'SET-USER-ERROR':
      return { ...state, error: action.value };
    case 'SET-AUTHORIZED':
      return { ...state, isAuthorized: action.value };
    default:
      return state;
  }
};

export default userReducer;
