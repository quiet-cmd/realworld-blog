import blogServices from '../../services/blog-services';

const service = new blogServices();

export const findArticle = (value) => ({ type: 'GET-PAGE', value: value });

export const getArticle = (slug) => {
  return async (dispatch) => {
    const res = await service.getPageArticles(slug);
    dispatch(findArticle(res));
  };
};

export const createArticle = (data) => {
  return async (dispatch) => {
    const res = await service.createArticle(data);
    if (res === null) return false;
    dispatch(findArticle(res));
    return res.article.slug;
  };
};
