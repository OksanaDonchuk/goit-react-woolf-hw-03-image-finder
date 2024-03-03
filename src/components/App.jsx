import React, { Component } from 'react';
import { getImagesApi } from '../api/getimg';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const LIMIT = 12;

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    loadMore: false,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImages();
    }
  }

  handelSubmit = query => {
    if (query === this.state.query) {
      alert('Enter a new value to search for');
      return;
    }
    this.setState({
      query,
      images: [],
      page: 1,
      largeImageURL: '',
      isLoading: false,
      showModal: false,
      loadMore: false,
    });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await getImagesApi(query, page, LIMIT);
      const { hits: newImages } = data;
      this.setState(prev => ({
        images: [...prev.images, ...newImages],
        loadMore: page < Math.ceil(data.totalHits / LIMIT),
        isEmpty: newImages.length === 0 && prev.images.length === 0,
      }));
    } catch (err) {
      alert('Oops, something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handelImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  closeModalImage = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };
  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, largeImageURL, isLoading, showModal, loadMore, isEmpty } =
      this.state;
    return (
      <div className="main-container">
        <Searchbar submit={this.handelSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            handelImageClick={this.handelImageClick}
          />
        )}
        {isEmpty && (
          <h2>
            Sorry, there are no images matching your search query. Please try
            again.
          </h2>
        )}

        {loadMore && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {showModal && this.state.largeImageURL && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModalImage} />
        )}
      </div>
    );
  }
}

export default App;
