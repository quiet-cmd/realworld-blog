import classNames from 'classnames';

import classes from './class-names.module.scss';

export const errorClass = (data) => {
  return classNames({
    [classes.normal]: !data,
    [classes.error]: data,
  });
};
