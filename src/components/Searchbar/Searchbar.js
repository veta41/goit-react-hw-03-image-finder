import PropTypes from 'prop-types';
import { SearchbarHeader } from './Searchbar.styled';

import SearchForm from './SearchForm/SearchForm';

const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmit} />
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
