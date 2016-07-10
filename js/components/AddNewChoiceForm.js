import React, { PropTypes } from 'react';

class AddNewChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onEditEnter = this.onEditEnter.bind(this);
  }

  onEditClick() {
    this.setState({
      edit: !this.state.edit
    });
  }

  onEditEnter(e) {
    if (e.charCode == 13 && this.state.edit) this.setState({edit: false});
  }

  render() {
    return (
      <li className='list-choice-item'>
        <input type='text' className={this.state.edit ? '' : 'hidden'} onChange='' onKeyPress={this.onEditEnter}></input>
        <button type='button' className={this.state.edit ? 'hidden' : 'btn btn-block'} onClick={this.onEditClick}>Add New Choice</button>
      </li>);
  }
}

AddNewChoiceForm.PropTypes = {

};

module.exports = AddNewChoiceForm;
