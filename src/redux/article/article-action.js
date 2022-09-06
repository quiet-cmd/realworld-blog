import blogServices from '../../services/blog-services';

const service = new blogServices();

export const findArticle = (value) => ({ type: 'GET-PAGE', value: value?.article });
export const newArticle = () => ({ type: 'NEW-PAGE' });

export const getArticle = (slug) => {
  return async (dispatch) => {
    const res = await service.getPageArticles(slug);
    if (typeof res === 'string') return false;
    dispatch(findArticle(res));
    return true;
  };
};

export const createArticle = (data) => {
  return async () => {
    const res = await service.createArticle(data);
    return typeof res === 'string' ? false : res.article.slug;
  };
};

export const editArticle = (data, slug) => {
  return async () => {
    const res = await service.editArticle(data, slug);
    return typeof res === 'string' ? false : res.article.slug;
  };
};

export const deleteArticle = (slug) => {
  return async () => {
    const res = await service.deleteArticle(slug);
    return res === 'Unexpected end of JSON input';
  };
};

export const changeFavorite = (slug, flag) => {
  return async (dispatch) => {
    const res = flag ? await service.deleteFavofite(slug) : await service.addFavofite(slug);
    if (typeof res === 'string') return false;
    dispatch(findArticle(res));
    return res.article.favoritesCount;
  };
};
