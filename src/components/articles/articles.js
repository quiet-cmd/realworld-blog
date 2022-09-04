import { Pagination } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ArticleItem from '../article-item';
import * as action from '../../redux/articles/articles-action';

import classes from './articles.module.scss';

import 'antd/dist/antd.min.css';

const Articles = ({ getPage, totalPage, articles }) => {
  useEffect(() => {
    getPage();
  }, []);
  const articleList = articles.map(({ slug, ...props }, i) => (
    <Link key={i} to={`/articles/${slug}`}>
      <div className={classes.article}>
        <ArticleItem {...props} />
      </div>
    </Link>
  ));
  return (
    <>
      <div className={classes.articles}>
        {articleList}
        <Pagination
          className={classes.pagination}
          defaultCurrent={1}
          total={totalPage}
          pageSize={20}
          showSizeChanger={false}
          onChange={(e) => getPage(e - 1)}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ ArticlesReducer: { totalPage, articles } }) => {
  return {
    totalPage: totalPage,
    articles: articles,
  };
};

export default connect(mapStateToProps, action)(Articles);
