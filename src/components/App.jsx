import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';

import Button from './Button/Button';
import ImageInfo from './ImageInfo/ImageInfo';
import Modal from './Modal/Molal';
import Searchbar from './Searchbar/Searchbar';

// import { Box } from './Box';



class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    page: 1,
    src: '',
    alt: '',
    moreVisible: false,
  };

  // Функция для смены состояния модального окна с видимого на невидимое и получения данных для показа в модалке
  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));

    if (!this.state.showModal) {
      this.setState({ src: e.target.dataset.src, alt: e.target.alt });
    }
  };

  //Функция для получения из формы текста введенного пользователем в инпут
  submitForm = e => {
    this.setState({ page: 1 });
    this.setState({ searchQuery: e.value });
  };

  // Функция для показа или скрытия кнопки "Загрузить еще"
  moreButtonRender = () => {
    this.setState({ moreVisible: true });
  };
  moreButtonHide = () => {
    this.setState({ moreVisible: false });
  };

  clickMoreButton = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { showModal, moreVisible, searchQuery, page, src, alt } = this.state;
    const {submitForm, toggleModal, moreButtonRender, clickMoreButton,  moreButtonHide,  } = this;
    return (
      <>
        <Searchbar onSubmit={submitForm} />
        <ImageInfo
          searchQuery={searchQuery}
          page={page}
          onClick={toggleModal}
          moreButtonRender={moreButtonRender}
          moreButtonHide={moreButtonHide}
        />
        {moreVisible && <Button onClick={clickMoreButton} />}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={src} alt={alt} />
          </Modal>
        )}

        <GlobalStyle/>
      </>
    );
  }
}
export default App;