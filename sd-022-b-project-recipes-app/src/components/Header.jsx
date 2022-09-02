import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  function redirect() {
    history.push('/profile');
  }

  function toggleSearchBar() {
    setShowSearchBar(!showSearchBar);
  }

  const { title, disableSearch } = props;
  return (
    <fieldset>
      <legend>
        Header
      </legend>
      <h1 data-testid="page-title">{ title }</h1>
      <button type="button" onClick={ redirect }>
        <img src={ profileIcon } alt="Ícone de perfil" data-testid="profile-top-btn" />
      </button>

      { !disableSearch && (
        <button type="button" onClick={ toggleSearchBar }>
          <img src={ searchIcon } alt="Ícone de pesquisa" data-testid="search-top-btn" />
        </button>)}
      { showSearchBar && (<SearchBar />)}
    </fieldset>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  disableSearch: PropTypes.bool,
}.isRequired;

export default Header;
