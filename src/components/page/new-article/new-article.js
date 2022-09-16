import React, { useLayoutEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { LoadingContext } from 'react-router-loading';

import FormArticle from '../../layout/form-article';
import * as action from '../../../redux/article/article-action';

import './new-article.scss';

const NewArticle = ({ newArticle, article }) => {
  const loadingContext = useContext(LoadingContext);

  const getData = async () => {
    await newArticle();
    loadingContext.done();
  };
  useLayoutEffect(() => {
    getData();
  }, []);
  const props = Object.keys(article).length ? article : null;

  return <>{props && <FormArticle {...props} />}</>;
};

const mapStateToProps = ({ articleReducer: { article } }) => {
  return {
    article: article,
  };
};
export default connect(mapStateToProps, action)(NewArticle);
