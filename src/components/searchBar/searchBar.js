import React from "react";
import backButton from '../../assets/Back.png';
import searchButton from '../../assets/search.png';
import './searchBar.css';

const SearchBar = ({searchText, handleInputBlur, handleInputChange, handleBackButtonClicked}) => {
  const handleBlur = () => {
    handleInputBlur();
  }

  return (
    <div className="search_bar">
      <img src={backButton} alt='back button' width="30" height="30" onClick={handleBackButtonClicked}></img>
      <input className="input_box" value={searchText} onBlur={(event) => handleBlur(event.target.value)} onChange={(event) => handleInputChange(event.target.value)}></input>
      <img src={searchButton} alt='search button' width="30" height="30" onClick={handleBlur}></img>
    </div>
  )
};

export default SearchBar;
