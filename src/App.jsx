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
    filter: '',
    changeOccurred: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.contacts.some(contact => contact.name.toLocaleLowerCase() === event.target.name.value.toLocaleLowerCase())) {
      alert(event.target.name.value + ' is already in contacts!');
      return;
    }

    this.setState({
        contacts: [
          ...this.state.contacts,
          {
            name: event.target.name.value,
            number: event.target.number.value,
            id: nanoid(),
          },
        ],
        changeOccurred: true
      });
  };

  handleDelete = event => {
    const newContacts = [...this.state.contacts];
    newContacts.splice(
      this.state.contacts.findIndex(contact => contact.id === event.target.id),
      1
    );
    
    this.setState({
        contacts: newContacts,
        changeOccurred: true
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

  componentDidMount() {
    const storageState = localStorageHandlers.load(this.#LOCAL_STORAGE_KEY);
    this.setState({ contacts: storageState === undefined ? [] : storageState});
  }
  

  componentDidUpdate(prevProps, prevState) {
    console.log(1);
    if (prevState.changeOccurred) {
      console.log(2);
      const isSucceed = localStorageHandlers.save(this.#LOCAL_STORAGE_KEY, prevState.contacts);
      if (isSucceed) {
        console.log(3);
        this.setState({changeOccurred: false});
      }
    }
  }
}

export default App;
