import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import ArticleItem from '../article-item';
import * as action from '../../redux/article/article-action';

import classes from './full-article.module.scss';

const FullArticle = ({ match, getArticle, article = {} }) => {
  useLayoutEffect(() => {
    getArticle(match.params.slug);
  }, []);
  const body = article?.body;
  const props = Object.keys(article).length ? article : null;
  return (
    <div className={classes.wrapper}>
      <div className={classes.article}>
        {props && <ArticleItem {...props} />}
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

const mapStateToProps = ({ articleReducer: { article } }) => {
  return {
    article: article,
  };
};

export default connect(mapStateToProps, action)(FullArticle);
