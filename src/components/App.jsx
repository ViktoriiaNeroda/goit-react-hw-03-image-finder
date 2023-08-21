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
    imagesPerPage: 8,
  };

  fetchImages = query => {
    const { currentPage, imagesPerPage } = this.state;
    const apiKey = '38392078-db89c19ac20a7bd4eddb18d45';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${currentPage}&per_page=${imagesPerPage}`;

    axios
      .get(apiUrl)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits], 
          page: prevState.page + 1, 
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.fetchImages} />
        <GaleryImage images={images} />
        {images.length > 0 && <LoadingMore onLoadMore={this.fetchImages} />}
      </div>
    );
  }
};

