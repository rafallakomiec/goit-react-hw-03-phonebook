import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    changeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  };

  render() {
    const { name, number, submitHandler, changeHandler } = this.props;

    return (
      <form onSubmit={submitHandler}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Enter a name of the contact here..."
            required
            onChange={changeHandler}
            value={name}
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Enter a phone number here..."
            required
            onChange={changeHandler}
            value={number}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
