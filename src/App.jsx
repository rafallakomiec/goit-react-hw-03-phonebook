import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import ContactItem from './components/ContactItem/ContactItem';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = event => {
    this.setState(() => {
      return { [event.target.name]: event.target.value };
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.contacts.some(contact => contact.name.toLocaleLowerCase() === event.target.name.value.toLocaleLowerCase())) {
      alert(event.target.name.value + ' is already in contacts!');
      return;
    }

    this.setState(() => {
      return {
        contacts: [
          ...this.state.contacts,
          {
            name: event.target.name.value,
            number: event.target.number.value,
            id: nanoid(),
          },
        ],
      };
    });
  };

  handleDelete = event => {
    this.setState(() => {
      const newContacts = [...this.state.contacts];
      newContacts.splice(
        this.state.contacts.findIndex(contact => contact.id === event.target.id),
        1
      );
      return {
        contacts: newContacts
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const list =
      filter.length > 0
        ? contacts
            .filter(contact =>
              contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            )
            .map(contact => (
              <ContactItem
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
                deleteHandler={this.handleDelete}
              />
            ))
        : contacts.map(contact => (
            <ContactItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              deleteHandler={this.handleDelete}
            />
          ));

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm submitHandler={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter changeHandler={this.handleChange} filterVal={filter} />
        <ContactList>{list}</ContactList>
      </>
    );
  }
}

export default App;
