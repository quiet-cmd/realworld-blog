const articleReducer = (state, action) => {
  if (!state) state = { article: {}, error: false };

  switch (action.type) {
    case 'GET-PAGE':
      return { ...state, article: action.value, error: false };
    case 'NEW-PAGE':
      return { ...state, article: { body: '', description: '', title: '', tagLis: [] } };
    default:
      return state;
  }
};

export default articleReducer;
