import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, SearchBarForm } from './SearchForm.styled';

class SearchForm extends Component {
  state = { value: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  // Записывает в состояние class SearchForm текст введенный в инпут
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value: value });
  };

  // Записывает в пропс onSubmit текущее состояние
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <SearchBarForm onSubmit={this.handleSubmit}>
        <Button onSubmit={this.handleSubmit} type="button">
          <Icon />
        </Button>
        <Input
          type="text"
          name="qwery"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
      </SearchBarForm>
    );
  }
}

export default SearchForm;
