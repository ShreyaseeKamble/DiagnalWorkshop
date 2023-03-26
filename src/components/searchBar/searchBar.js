import React, { useState } from "react";
import backButton from '../../assets/Back.png';
import searchButton from '../../assets/search.png';
import setSearchData from '../../redux/action/setSearchData';
import store from '../../redux/store';
import './searchBar.css';

const SearchBar = () => {
  const [ searchText, setText ] = useState('Romantic Comedy');

  const handleBlur = (value) => {
    setText(value);
    store.dispatch(setSearchData(value, store.getState().content));
  }

  return (
    <div className="search_bar">
      <img src={backButton} alt='back button' width="30" height="30"></img>
      <input className="input_box" value={searchText} onBlur={(event) => handleBlur(event.target.value)} onChange={(event) => setText(event.target.value)}></input>
      <img src={searchButton} alt='search button' width="30" height="30"></img>
    </div>
  )
};

export default SearchBar;