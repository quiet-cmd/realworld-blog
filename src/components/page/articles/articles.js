import { Pagination } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ArticleItem from '../../layout/article-item';
import * as action from '../../../redux/articles/articles-action';

import classes from './articles.module.scss';

import 'antd/dist/antd.min.css';

const Articles = ({ getPage, totalPage, articles }) => {
  useEffect(() => {
    getPage();
  }, []);
  const articleList = articles.map(({ slug, ...props }) => (
    <div key={slug} className={classes.article}>
      <ArticleItem {...props} slug={slug} />
    </div>
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
          onChange={(e) => {
            getPage(e - 1);
            window.scrollTo(0, 0);
          }}
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
