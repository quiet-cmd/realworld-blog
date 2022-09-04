const ArticlesReducer = (state, action) => {
  if (!state) state = { articles: [], totalPage: 0 };

  switch (action.type) {
    case 'SET-TOTAL-PAGE':
      return { ...state, totalPage: action.value };
    case 'SET-NEW-PAGE':
      return { ...state, articles: action.value };
    default:
      return state;
  }
};

export default ArticlesReducer;
