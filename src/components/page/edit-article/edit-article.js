import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormArticle from '../../layout/form-article';
import * as action from '../../../redux/article/article-action';

import './edit-article.scss';

const EditArticle = ({ match, getArticle, article }) => {
  const [error, setError] = useState();
  const getData = async () => {
    const res = await getArticle(match.params.slug);
    setError(() => !res);
  };
  useLayoutEffect(() => {
    getData();
  }, []);
  const props = Object.keys(article).length ? article : null;
  if (error) return <Redirect to="/404/" />;
  return <>{props && <FormArticle {...props} />}</>;
};

const mapStateToProps = ({ articleReducer: { article } }) => {
  return {
    article: article,
  };
};

export default connect(mapStateToProps, action)(EditArticle);
