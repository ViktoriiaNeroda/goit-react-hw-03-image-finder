import React, { useState } from 'react';
import { StyledBtn, StyledForm, StyledInput } from './SearchBar.styled';


 export function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };
  
  return (
      <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search images..."
      />
      <StyledBtn type="submit">Search</StyledBtn>
    </StyledForm>
  );
}
