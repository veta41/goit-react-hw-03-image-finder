import React, { Component } from 'react';
import {
  Input,
  SearchBarForm,
  Icon,
  SearchbarHeader,
  Button,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  handleChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  resetInput() {
    this.setState({ inputValue: '' });
  }

  render() {
    const { inputValue } = this.state;
    const { onSubmit, isLoading } = this.props;

    return (
      <SearchbarHeader>
        <SearchBarForm
          onSubmit={e => {
            e.preventDefault();
            onSubmit(inputValue);
            this.resetInput();
          }}
        >
          <Button type="submit" disabled={isLoading}>
            <Icon />
          </Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </SearchBarForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
