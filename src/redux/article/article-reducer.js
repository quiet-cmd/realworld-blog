const articleReducer = (state, action) => {
  if (!state) state = { article: {}, error: false };

  switch (action.type) {
    case 'GET-PAGE':
      return { ...state, article: action.value, error: false };
    case 'SET-ARTICLE-ERROR':
      return { ...state, error: action.value };
    default:
      return state;
  }
};

export default articleReducer;
