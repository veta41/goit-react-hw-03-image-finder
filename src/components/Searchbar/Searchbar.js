import propTypes from 'prop-types';
import {
  Button,
  Icon,
  Input,
  SearchbarHeader,
  SearchForm,
} from './Searchbar.styled';

const Searchbar = ({ onSearch }) => {
  const searchImages = e => {
    e.preventDefault();
    const input = e.target.elements.input;

    if (input.value === '') {
      return;
    }

    onSearch(input.value);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={searchImages}>
        <Button type="submit">
          <Icon />
        </Button>

        <Input
          name="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};

export default Searchbar;
