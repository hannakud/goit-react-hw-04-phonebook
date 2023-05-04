import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onChangeFilter }) => {
  return (
    <div>
      <label className={css.labelFilter}>
        {' '}
        Filter by name<input
          value={value}
          onChange={onChangeFilter}
        ></input>{' '}
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
