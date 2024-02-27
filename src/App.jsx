import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import ContactItem from './components/ContactItem/ContactItem';
import localStorageHandlers from './utils/localStorageHandlers';
class App extends Component {
  #LOCAL_STORAGE_KEY = "contacts";

  state = {
    contacts: [],
    filterInput: '',
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.contacts.some(contact => contact.name.toLocaleLowerCase() === event.target.name.value.toLocaleLowerCase())) {
      alert(event.target.name.value + ' is already in contacts!');
      this.setState({
        name: '',
        number: ''
      });
      return;
    }

    this.setState(
      {
        contacts: [
          ...this.state.contacts,
          {
            name: event.target.name.value,
            number: event.target.number.value,
            id: nanoid(),
          },
        ],
        name: '',
        number: ''
      });
  };

  handleDelete = event => {
    const newContacts = [...this.state.contacts];
    newContacts.splice(
      this.state.contacts.findIndex(contact => contact.id === event.target.id),
      1
    );
    
    this.setState({
        contacts: newContacts
    })
  };

  render() {
    const { contacts, filterInput } = this.state;
    const list =
      filterInput.length > 0
        ? contacts
            .filter(contact =>
              contact.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase())
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
        <ContactForm submitHandler={this.handleSubmit} changeHandler={this.handleChange} name={this.state.name} number={this.state.number} />
        <h2>Contacts</h2>
        <Filter changeHandler={this.handleChange} filterVal={filterInput} />
        <ContactList>{list}</ContactList>
      </>
    );
  }

  componentDidMount() {
    const storageState = localStorageHandlers.load(this.#LOCAL_STORAGE_KEY);
    this.setState({ contacts: storageState === undefined ? [] : storageState});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
        localStorageHandlers.save(this.#LOCAL_STORAGE_KEY, this.state.contacts);
    }
  }
}

export default App;
