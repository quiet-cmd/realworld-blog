import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Result } from 'antd';

import ArticleItem from '../article-item';
import * as action from '../../redux/article/article-action';

import classes from './full-article.module.scss';

const FullArticle = ({ match, getArticle, article = {} }) => {
  const [error, setError] = useState();

  const getData = async () => {
    const res = await getArticle(match.params.slug);
    setError(() => !res);
  };
  useLayoutEffect(() => {
    getData();
  }, []);
  if (error) return <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />;
  const body = article?.body;
  const props = Object.keys(article).length ? article : null;
  return (
    <div className={classes.wrapper}>
      <div className={classes.article}>
        {props && <ArticleItem {...props} slug={match.params.slug} full={true} />}
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
