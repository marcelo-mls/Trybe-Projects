import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: {},
      isButtonDisabled: true,
      shouldRedirect: false,
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
    },
    () => this.isUserWithEmptyKeys()); // chama a validação de objetos vazios
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    const newUser = { ...user }; // cria um novo Obj com as mesmas keys
    newUser[name] = value; // atualiza cada keys especifica com o valor do evento

    this.setState(({
      user: newUser, // repassa o novo obj para o state
    }),
    () => this.isUserWithEmptyKeys()); // chama a validação de objetos vazios
  }

  // Verifica se todos os dados do Obj User estão preenchidos
  isUserWithEmptyKeys = () => {
    const { user } = this.state;
    const containsEmptyKeys = Object.values(user).includes('');

    this.setState({ isButtonDisabled: containsEmptyKeys });
  }

  // Chama a função de atualizar o login e redireciona a página. (Só acontece se o botão estiver hablitado)
  callUpdateUser = () => {
    const { user } = this.state;

    updateUser(user);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { user, isLoading, isButtonDisabled, shouldRedirect } = this.state;

    return (
      <div data-testid="page-profile-edit" className="page">
        ProfileEdit
        <Header />
        { isLoading
          ? <Loading />
          : (
            <form>
              <div>
                <label htmlFor="name">
                  Nome:
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={ user.name }
                    onChange={ this.handleChange }
                    data-testid="edit-input-name"
                  />
                </label>

                <label htmlFor="email">
                  E-mail:
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={ user.email }
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                  />
                </label>

                <label htmlFor="description">
                  Descrição:
                  <textarea
                    name="description"
                    id="description"
                    value={ user.description }
                    onChange={ this.handleChange }
                    data-testid="edit-input-description"
                  />
                </label>

              </div>
              <div>
                <label htmlFor="image">
                  URL de imagem:
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={ user.image }
                    alt={ user.name }
                    onChange={ this.handleChange }
                    data-testid="edit-input-image"
                  />
                </label>
              </div>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isButtonDisabled }
                onClick={ this.callUpdateUser }
              >
                Salvar
              </button>
            </form>
          )}
        { shouldRedirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
