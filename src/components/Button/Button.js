import { LoadMoreBtn, Container } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <Container>
      <LoadMoreBtn onClick={onClick}> Load more</LoadMoreBtn>
    </Container>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
