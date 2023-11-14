import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactList extends Component {
  static propTypes = { children: PropTypes.node };
  render() {
    return <ul>{this.props.children}</ul>;
  }
}

export default ContactList;
