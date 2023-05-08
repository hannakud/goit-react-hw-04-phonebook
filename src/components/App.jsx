import { useEffect, useState } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

const getFilteredContactsList = (filter, contacts) => {
  return contacts.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase().trim())
  );
};

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = formValue => {
    const isExist = contacts.some(
      el => el.name.toLowerCase() === formValue.name.trim().toLowerCase()
    );
    if (isExist) {
      alert('Contact is already exist');
      return;
    }
    const newContact = {
      id: nanoid(),
      name: formValue.name,
      number: formValue.number,
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(el => el.id !== id));
    setFilter('');
  };

  const filteredContactsList = getFilteredContactsList(filter, contacts);
  const emptyMessage = filter
    ? `No contacts macth "${filter}"`
    : 'Phonebook is empty. Add contacts first';

  return (
    <main className={css.main}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChangeFilter={event => setFilter(event.target.value)}
      />
      {filteredContactsList.length ? (
        <ContactList
          list={filteredContactsList}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <div>{emptyMessage}</div>
      )}
    </main>
  );
};
