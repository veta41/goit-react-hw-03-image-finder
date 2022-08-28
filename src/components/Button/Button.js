import { LoadMoreBtn, Container } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore, isLoading }) => {
  return (
    <Container>
      <LoadMoreBtn type="button" onClick={onLoadMore} disabled={isLoading}>
        Load more
      </LoadMoreBtn>
    </Container>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Button;
