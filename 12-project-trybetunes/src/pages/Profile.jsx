import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.callGetUser();
  }

  callGetUser = async () => {
    const userData = await getUser();

    this.setState({
      isLoading: false,
      user: userData,
    });
  }

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile" className="page">
        Profile
        <Header />
        { isLoading
          ? <Loading />
          : (
            <section>
              <p>
                Nome:
                {' '}
                <span>{user.name}</span>
              </p>

              <img src={ user.image } alt={ user.name } data-testid="profile-image" />

              <p>
                Email:
                {' '}
                <span>{user.email}</span>
              </p>

              <p>
                Descrição:
                {' '}
                <span>{user.description}</span>
              </p>

              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>

            </section>
          )}
      </div>
    );
  }
}

export default Profile;
