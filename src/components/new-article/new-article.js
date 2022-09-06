import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Tag from '../tag';
import * as action from '../../redux/article/article-action';

import classes from './new-article.module.scss';

const NewArticle = ({ match, getArticle, editArticle, newArticle, createArticle, ...props }) => {
  const [tags, setTags] = useState(props.tagList);
  const [error, setError] = useState(false);
  const [body, setBody] = useState(props.body);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const slug = match?.params?.slug;
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const textfield = {
    required: {
      value: true,
      message: 'Field must not be empty',
    },
  };

  useEffect(() => {
    slug ? getArticle(slug) : newArticle();
    console.log(props);
    setTags((e) =>
      e.reduce((acc, e) => {
        index += 1;
        return [...acc, { text: e, id: index }];
      }, [])
    );
    return () => newArticle();
  }, []);

  const addTag = (text) => {
    index += 1;
    setTags(() => [...tags, { text: text, id: index }]);
  };

  const deleteTag = (deleteId) => {
    setTags((e) => e.filter(({ id }) => deleteId !== id));
  };

  const submit = async (data) => {
    const newData = { ...data, tagList: tags.reduce((acc, { text }) => [...acc, text], []) };
    let res;

    if (slug) res = await editArticle(newData, slug);
    else res = await createArticle(newData);

    if (!res) return setError(() => true);
    history.push(`/articles/${res}`);
  };

  const renderTags = tags.map(({ id, ...props }) => {
    index += 1;
    const key = id ? id : index;
    return <Tag key={key} {...props} deleteTag={() => deleteTag(key)} />;
  });

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit((data) => submit(data))}>
      <legend>{slug ? 'Edit article' : 'Create new article'}</legend>
      <label>
        Title
        <input
          {...register('title', { ...textfield })}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <strong>{errors.title?.message}</strong>
      </label>
      <label>
        Description
        <input
          {...register('description', { ...textfield })}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <strong>{errors.description?.message}</strong>
      </label>
      <label>
        Text
        <textarea
          {...register('body', { ...textfield })}
          placeholder="Text"
          type="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <strong>{errors.body?.message}</strong>
      </label>
      {renderTags}
      <Tag last={true} addTag={(text) => addTag(text)} />
      <button type="submit" className={classes.send}>
        Send
      </button>
      {error && <strong>Something went wrong</strong>}
    </form>
  );
};

let index = 0;

const mapStateToProps = ({ articleReducer: { article } }) => {
  console.log(article);
  return {
    title: article?.title || '',
    description: article?.description || '',
    body: article?.body || '',
    tagList: article?.tagList || [],
  };
};

export default connect(mapStateToProps, action)(NewArticle);
