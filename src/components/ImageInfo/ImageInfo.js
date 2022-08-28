import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import { getImagesAPI } from 'services/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageInfo extends Component {
  state = {
    status: Status.IDLE,
    error: null,
    totalHits: null,
    hits: [],
  };
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    moreButtonRender: PropTypes.func.isRequired,
    moreButtonHide: PropTypes.func.isRequired,
  };

  // Асинхронная функция, которая сначала сравнивает предыдущий и следующий пропсы и если они отличаются, делает запрос на АРI
  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (
      (prevSearchQuery.trim() !== nextSearchQuery.trim() &&
        nextSearchQuery.trim().length > 0) ||
      nextPage > prevPage
    ) {
      this.setState({
        status: Status.PENDING,
      });
      this.props.moreButtonHide();
      try {
        const { totalHits, hits } = await getImagesAPI(
          nextSearchQuery,
          nextPage
        );
        if (totalHits === 0) {
          Notify.failure(
            `Sorry, images with title ${nextSearchQuery} missing. Try other words.`
          );
        }
        if (totalHits === this.state.hits.length + hits.length) {
          this.props.moreButtonHide();
        }
        if (totalHits > this.state.hits.length + hits.length) {
          this.props.moreButtonRender();
        }
        if (nextPage > 1) {
          this.setState({
            hits: [...prevState.hits, ...hits],
            status: Status.RESOLVED,
            totalHits: totalHits,
          });
        }
        if (nextPage === 1) {
          this.setState({
            hits: hits,
            status: Status.RESOLVED,
            totalHits: totalHits,
          });
        }
      } catch (error) {
        this.setState({
          error,
          status: Status.REJECTED,
        });
        this.props.moreButtonHide();
        Notify.failure(`Sorry, something went wrong.`);
      }
    }
  }

  render() {
    const { hits, status } = this.state;
    if (status === 'idle') {
      return <div> </div>;
    }
    if (status === 'pending') {
      return (
        <>
          <ImageGallery hits={hits} onClick={this.props.onClick} />
          <Loader />
        </>
      );
    }
    if (status === 'rejected') {
      return <div></div>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery hits={hits} onClick={this.props.onClick} />
        </>
      );
    }
  }
}

export default ImageInfo;
