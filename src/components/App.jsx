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
    showLoadMore: false,
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });
      const data = await getImagesApi(query, page, LIMIT);
      this.setState(prevState => ({
        images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
        showLoadMore: page < Math.ceil(data.totalHits / LIMIT),
      }));
    } catch (error) {
      alert('Oops, something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      showLoadMore: false,
      showModal: false,
      largeImageURL: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = ({ largeImageURL }) => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showModal, showLoadMore, largeImageURL } =
      this.state;

    return (
      <div>
        <Searchbar handleSubmit={this.handleSearchSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {showLoadMore && <Button loadClick={this.handleLoadMore} />}
        {showModal && (
          <Modal img={largeImageURL} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
