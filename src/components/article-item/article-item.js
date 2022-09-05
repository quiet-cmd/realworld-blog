import React, { useState } from 'react';
import { Tag } from 'antd';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as action from '../../redux/article/article-action';

import classes from './article-item.module.scss';

const ArticleItem = ({
  deleteArticle,
  changeFavorite,
  authorized,
  slug = null,
  author,
  title,
  description,
  favorited,
  favoritesCount,
  tagList = [],
  createdAt = null,
}) => {
  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const history = useHistory();
  const tags = tagList.map((name, i) => <Tag key={i}>{name}</Tag>);
  const image = author?.image;
  const username = author?.username;

  const onDelete = async () => {
    const res = await deleteArticle(slug);
    if (!res) return;
    history.push('/');
  };

  const changeLike = async () => {
    const res = await changeFavorite(slug, like);
    setLike((e) => !e);
    setLikeCount(() => res);
  };

  const buttonFlag = slug && authorized;

  return (
    <div className={classes.article}>
      <div className={classes['article-info']}>
        <div className={classes.top}>
          <h2 className={classes.title}>{title}</h2>
          <label className={classes.like}>
            <input
              type="checkbox"
              className={classes.check}
              checked={like}
              onChange={changeLike}
              disabled={!authorized}
            />
            <span className={classes.box}></span>
            <span className={classes['like-check']}>{likeCount}</span>
          </label>
        </div>
        <div className={classes['tag-wrapper']}>{tags}</div>
        <div className={classes.text}>{description}</div>
      </div>
      <div className={classes.user}>
        <div className={classes['user-left']}>
          <h2 className={classes.name}>{username}</h2>
          <p className={classes.date}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</p>
          {buttonFlag && (
            <button className={classes.delete} onClick={onDelete}>
              Delete
            </button>
          )}
          {buttonFlag && (
            <button className={classes.edit} onClick={() => history.push(`/articles/${slug}/edit`)}>
              Edit
            </button>
          )}
        </div>
      </div>
      <img
        className={classes['user-img']}
        src={image ? image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
        alt="user-photo"
      />
    </div>
  );
};

const mapStateToProps = ({ userReducer: { authorized } }) => {
  return {
    authorized: authorized,
  };
};

export default connect(mapStateToProps, action)(ArticleItem);
