import React, { PropTypes } from 'react';

class AddNewChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      title: ''
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onEditEnter = this.onEditEnter.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onEditClick() {
    this.setState({
      edit: !this.state.edit
    });
  }

  onTitleChange(e) {
    this.setState({title: e.target.value});
  }

  onEditEnter(e) {
    if (e.charCode == 13 && this.state.edit) {
      this.props.handleAddChoice(e.target.value);
      this.setState({edit: false, title: ''});
    }
  }

  render() {
    return (
      <li className='list-choice-item'>
        <input
          type='text'
          className={this.state.edit ? 'form-control' : 'hidden'}
          onChange={this.onTitleChange}
          onKeyPress={this.onEditEnter}
          placeholder='Enter New Choice Name'
          value={this.state.title}
        >
        </input>
        <button type='button' className={this.state.edit ? 'hidden' : 'btn btn-block'} onClick={this.onEditClick}>Add New Choice</button>
      </li>);
  }
}

AddNewChoiceForm.PropTypes = {
  handleAddChoice: PropTypes.func.isRequired
};

module.exports = AddNewChoiceForm;
