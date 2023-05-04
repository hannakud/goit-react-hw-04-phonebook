import PropTypes from 'prop-types';
import css from './ContactList.module.css';
export const ContactList = ({ list, onDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {list.map(({ id, name, number }) => {
        return (
          <li className={css.contactItem} key={id}>
            <span>{name}: </span>
            <span>{number} </span>
            <button className={css.button} onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
