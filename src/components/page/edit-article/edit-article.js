import React, { useLayoutEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';

import FormArticle from '../../layout/form-article';
import * as action from '../../../redux/article/article-action';

import './edit-article.scss';

const EditArticle = ({ match, getArticle, article }) => {
  const [isError, setIsError] = useState();
  const loadingContext = useContext(LoadingContext);

  const getData = async () => {
    const res = await getArticle(match.params.slug);
    setIsError(() => !res);
    loadingContext.done();
  };

  useLayoutEffect(() => {
    getData();
  }, []);
  
  const props = Object.keys(article).length ? article : null;
  if (isError) return <Redirect to="/404/" />;
  return <>{props && <FormArticle {...props} />}</>;
};

const mapStateToProps = ({ articleReducer: { article } }) => {
  return {
    article: article,
  };
};

export default connect(mapStateToProps, action)(EditArticle);
