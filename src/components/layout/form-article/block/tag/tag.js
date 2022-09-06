import React, { useState } from 'react';

import classes from './tag.module.scss';

const Tag = ({ addTag, deleteTag, text = '', last = false }) => {
  const [tag, setTag] = useState(text);
  return (
    <fieldset>
      <input
        className={classes.tag}
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        disabled={!last}
      />
      <button type="button" className={classes.delete} onClick={deleteTag}>
        Delete
      </button>
      {last && (
        <button
          type="button"
          className={classes.add}
          onClick={() => {
            addTag(tag);
            setTag('');
          }}
        >
          Add tag
        </button>
      )}
    </fieldset>
  );
};

export default Tag;
