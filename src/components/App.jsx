import { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = formValue => {
    const isExist = this.state.contacts.some(
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
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
      filter: '',
    }));
  };

  onChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  getFilteredContactsList = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
    const filteredContactsList = this.getFilteredContactsList();
    const emptyMessage = this.state.filter
      ? `No contacts macth "${this.state.filter}"`
      : 'Phonebook is empty. Add contacts first';

    return (
      <main className={css.main}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChangeFilter={this.onChangeFilter}
        />
        {filteredContactsList.length ? (
          <ContactList
            list={filteredContactsList}
            onDeleteContact={this.onDeleteContact}
          />
        ) : (
          <div>{emptyMessage}</div>
        )}
      </main>
    );
  }
}
