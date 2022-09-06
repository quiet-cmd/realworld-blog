const articleReducer = (state, action) => {
  if (!state) state = { article: {} };

  switch (action.type) {
    case 'GET-PAGE':
      return { ...state, article: action.value, error: false };
    case 'NEW-PAGE':
      return { ...state, article: { body: '', description: '', title: '', tagList: [] } };
    default:
      return state;
  }
};

export default articleReducer;
