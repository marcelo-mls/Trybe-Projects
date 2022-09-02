import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  function getUserMail() {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    return userEmail ? userEmail.email : 'Anonimo';
  }

  function clearLocalStorage() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div>
      <Header title="Profile" disableSearch />
      <form>
        <p data-testid="profile-email">{getUserMail()}</p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;
