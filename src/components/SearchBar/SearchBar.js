import React, { Component } from 'react';
import { StyledBtn, StyledForm, StyledInput } from './SearchBar.styled';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { query } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledInput
          type="text"
          id="searchInput"
          value={query}
          onChange={this.handleChange}
          placeholder="Search images..."
        />
        <StyledBtn type="submit">Search</StyledBtn>
      </StyledForm>
    );
  }
}
