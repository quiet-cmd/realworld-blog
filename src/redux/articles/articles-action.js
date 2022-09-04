import blogServices from '../../services/blog-services';

const service = new blogServices();

export const newPage = (value) => ({ type: 'SET-NEW-PAGE', value: value });
export const setTotalPage = (value) => ({ type: 'SET-TOTAL-PAGE', value: value });

export const getPage = (value = 0) => {
  return async (dispatch) => {
    const res = await service.getArticles(value * 20);
    dispatch(setTotalPage(res.articlesCount));
    dispatch(newPage(res.articles));
  };
};
