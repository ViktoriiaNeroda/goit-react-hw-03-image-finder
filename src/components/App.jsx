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

  handleLoadMore = () => {
    this.fetchImages(this.state.query);
  };

  fetchImages = query => {
    const { currentPage, imagesPerPage } = this.state;
    const apiKey = '38392078-db89c19ac20a7bd4eddb18d45';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${currentPage}&per_page=${imagesPerPage}`;

    axios
      .get(apiUrl)
      .then(response => {
       if (response.data.hits.length === 0) {
        this.setState({ moreImages: false });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits], 
          currentPage: prevState.currentPage + 1,
          hasMoreImages: true,
        }));
      }
    })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };


   handleSearchSubmit = query => {
       this.setState({ query, images: [], currentPage: 1, moreImages: true }, () => {
      this.fetchImages(query);

    });
  };

  render() {
    const { images, moreImages } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <GaleryImage images={images} />
        {images.length > 0 && (
          <>
            <LoadingMore onLoadMore={this.handleLoadMore} />
            {!moreImages && <p>No more images to load.</p>}
          </>
        )}
      </div>
    );
  }
};

