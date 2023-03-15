import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.handleHeader();
  }

  handleHeader = async () => {
    this.setState({
      isLoading: true,
    });

    const user = await getUser();
    this.setState({
      isLoading: false,
      userName: user.name,
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h2 className="trybeTunes">TrybeTunes</h2>
        <div className="header-main">
          <nav className="header-nav">
            <Link to="/search">
              <h3 data-testid="link-to-search">Search</h3>
            </Link>

            <Link to="/favorites">
              <h3 data-testid="link-to-favorites">Favorites</h3>
            </Link>

            <Link to="/profile">
              <h3 data-testid="link-to-profile">Profile</h3>
            </Link>
          </nav>
          <div className="header-login">
            { isLoading
              ? <Loading />
              : <p data-testid="header-user-name">{ userName }</p> }
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
