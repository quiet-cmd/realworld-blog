import blogServices from '../../services/blog-services';

const service = new blogServices();

export const findArticle = (value) => ({ type: 'GET-PAGE', value: value });
export const newArticle = () => ({ type: 'NEW-PAGE' });

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

export const editArticle = (data, slug) => {
  return async (dispatch) => {
    const res = await service.editArticle(data, slug);
    if (res === null) return false;
    dispatch(findArticle(res));
    return res.article.slug;
  };
};

export const deleteArticle = (slug) => {
  return async () => {
    await service.deleteArticle(slug);
    return true;
  };
};

export const changeFavorite = (slug, flag) => {
  return async () => {
    const res = flag ? await service.deleteFavofite(slug) : await service.addFavofite(slug);
    if (res === null) return false;
    //dispatch(findArticle(res));
    return res.article.favoritesCount;
  };
};
