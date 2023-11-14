import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
  };
  render() {
    const { id, name, number, deleteHandler } = this.props;

    return (
      <li key={id}>
        {name}: {number}
        <button type="button" id={id} onClick={deleteHandler}>
          Delete
        </button>
      </li>
    );
  }
}

export default ContactItem;
