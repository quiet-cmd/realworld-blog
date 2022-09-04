import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Tag from '../tag';
import { TextInput, TextAreaInput } from '../form/form';
import * as action from '../../redux/article/article-action';

import classes from './new-article.module.scss';

const NewArticle = ({ createArticle, tagList = [] }) => {
  const [tags, setTags] = useState(tagList);
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setTags((e) =>
      e.reduce((acc, e) => {
        index += 1;
        return [...acc, { text: e, id: index }];
      }, [])
    );
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
    const res = await createArticle(newData);
    if (!res) return setError(() => true);
    history.push(`/articles/${res}`);
  };

  const renderTags = tags.map(({ id, ...props }) => {
    return <Tag key={id} {...props} deleteTag={() => deleteTag(id)} />;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const opt = { maxLength: null };

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit((data) => submit(data))}>
      <legend>Create new article</legend>
      <TextInput register={register} errors={errors} name={'title'} label={'Title'} opt={opt} />
      <TextInput register={register} errors={errors} name={'description'} label={'Short description'} opt={opt} />
      <TextAreaInput register={register} errors={errors} name={'body'} label={'Text'} opt={opt} />
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

const mapStateToProps = ({ articleReducer }) => {
  return {
    tagList: articleReducer?.tagList,
  };
};

export default connect(mapStateToProps, action)(NewArticle);
