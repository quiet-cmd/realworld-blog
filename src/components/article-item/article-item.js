import React from 'react';
import { Tag } from 'antd';
import { format } from 'date-fns';

import classes from './article-item.module.scss';

const ArticleItem = ({
  match = null,
  author: { image = null, username },
  title,
  description,
  favoritesCount,
  tagList,
  createdAt,
}) => {
  const tags = tagList.map((name, i) => <Tag key={i}>{name}</Tag>);
  console.log(match?.params?.slug);
  return (
    <div className={classes.article}>
      <div className={classes['article-info']}>
        <div className={classes.top}>
          <h2 className={classes.title}>{title}</h2>
          <label className={classes.like}>
            <input type="checkbox" className={classes.check} />
            <span className={classes.box}></span>
            <span className={classes['like-check']}>{favoritesCount}</span>
          </label>
        </div>
        <div className={classes['tag-wrapper']}>{tags}</div>
        <div className={classes.text}>{description}</div>
      </div>
      <div className={classes.user}>
        <div className={classes['user-left']}>
          <h2 className={classes.name}>{username}</h2>
          <p className={classes.date}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</p>
          {match && <button className={classes.delete}>Delete</button>}
          {match && <button className={classes.edit}>Edit</button>}
        </div>
      </div>
      <img className={classes['user-img']} src={image} alt="user-photo" />
    </div>
  );
};

export default ArticleItem;
