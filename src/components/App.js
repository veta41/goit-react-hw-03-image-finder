import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';

import { Container } from './App.styled';

import Modal from './Modal/Molal';
// import * as API from '../services/api';
import { getImagesAPI } from '../services/api';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    currentLargeImageURL: '',
    error: null,
    isLoading: false,
  };

  onOpenModalWithLargeImage = url => {
    this.setState({
      currentLargeImageURL: url,
    });
  };

  onModalClose = () => {
    this.setState({
      currentLargeImageURL: '',
    });
  };

  onFormSubmit = query => {
    if (query.trim().length === 0) {
      alert('Please, enter request');
      return;
    }

    this.setState({
      query,
      page: 1,
      items: [],
    });
  };

  onLoadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  addImages = async (query, page) => {
    try {
      this.setState({
        isLoading: true,
      });
      const images = await getImagesAPI(query, page);

      this.setState(prevState => ({
        items: [...prevState.items, ...images],
        isLoading: false,
      }));
      if (images.length === 0) {
        alert(
          "Sorry, we can't find anyting for your request. Please, enter another request"
        );
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.addImages(this.state.query, this.state.page);
    }
  }

  render() {
    const { items, currentLargeImageURL, isLoading, error } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onFormSubmit} isLoading={isLoading} />
        {error && <p>{error}</p>}
        {items.length > 0 && (
          <ImageGallery
            items={items}
            onClick={this.onOpenModalWithLargeImage}
          />
        )}
        {isLoading && <Loader />}
        {items.length > 0 && (
          <Button onLoadMore={this.onLoadMoreButton} isLoading={isLoading} />
        )}
        {currentLargeImageURL && (
          <Modal onClose={this.onModalClose} url={currentLargeImageURL} />
        )}

        <GlobalStyle />
      </Container>
    );
  }
}
