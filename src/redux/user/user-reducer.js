const userReducer = (state, action) => {
  if (!state) state = { user: {}, error: false, authorized: false };

  switch (action.type) {
    case 'SET-USER':
      return { ...state, user: action.value, error: false, authorized: true };
    case 'SET-USER-ERROR':
      return { ...state, error: action.value };
    case 'SET-AUTHORIZED':
      return { ...state, authorized: action.value };
    default:
      return state;
  }
};

export default userReducer;
