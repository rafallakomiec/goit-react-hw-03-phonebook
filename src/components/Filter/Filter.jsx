import { Component } from 'react';
import Proptypes from 'prop-types';

class Filter extends Component {
  static propTypes = {
    changeHandler: Proptypes.func.isRequired,
    filterVal: Proptypes.string.isRequired,
  };

  render() {
    const { changeHandler, filterVal } = this.props;
    return (
      <label>
        Find contacts by name:
        <input type="text" name="filterInput" onChange={changeHandler} value={filterVal} />
      </label>
    );
  }
}

export default Filter;
