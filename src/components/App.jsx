import React, { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar/SearchBar';
import { GaleryImage } from './ImageGallery/ImageGallery';
import { LoadingMore } from './LoadMore/LoadMore';

export class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1, 
    imagesPerPage: 12,
    moreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.fetchImages(this.state.query);
    }
  }

  fetchImages = query => {
    const { currentPage, imagesPerPage } = this.state;
    const apiKey = '38392078-db89c19ac20a7bd4eddb18d45';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${currentPage}&per_page=${imagesPerPage}`;

    axios.get(apiUrl)
      .then(response => {
        const newImages = response.data.hits;

        if (newImages.length === 0) {
          this.showNoImagesFoundAlert();
          this.setState({ moreImages: false });
        } else {
          const updatedImages = this.state.images.concat(
            newImages.slice(0, imagesPerPage)
          );
          this.setState({
            images: updatedImages,
            currentPage: this.state.currentPage + 1,
            moreImages: newImages.length >= imagesPerPage,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };

  handleLoadMore = () => {
    this.fetchImages(this.state.query);
  };

  handleSearchSubmit = query => {
    if (query.trim() === '') { 
      this.showInvalidQueryAlert();
      return;
    }
  
    this.setState({ query, images: [], currentPage: 1, moreImages: true }, () => {
      this.fetchImages(query);
    });
  };

  showInvalidQueryAlert = () => {
    alert('Please enter a valid search query.');
  };

  showNoImagesFoundAlert = () => {
    alert('No images found.');
  };

  render() {
    const { images, moreImages } = this.state;

    return (
       <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <GaleryImage images={images} />
        {images.length > 0 && moreImages && (
          <LoadingMore onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
};
