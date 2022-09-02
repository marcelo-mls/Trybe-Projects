import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from './Loading';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputArtistSearch: '',
      lastArtistSearched: '',
      isLoading: false,
      arrOfAlbums: [],
      shouldRender: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { inputArtistSearch } = this.state;
    this.setState({
      isLoading: true,
      lastArtistSearched: inputArtistSearch,
    });

    const albums = await searchAlbumsAPI(inputArtistSearch);
    this.setState({
      arrOfAlbums: albums,
      isLoading: false,
      shouldRender: true,
    }, () => this.setState({ inputArtistSearch: '' }));
  }

  render() {
    const charLimit = 2;
    const {
      inputArtistSearch,
      lastArtistSearched,
      isLoading,
      arrOfAlbums,
      shouldRender,
    } = this.state;

    return (
      <div data-testid="page-search" className="page">
        Search
        <Header />
        { isLoading && <Loading />}
        <label htmlFor="inputArtistSearch">
          Pesquisar
          <input
            type="text"
            name="inputArtistSearch"
            id="inputArtistSearch"
            data-testid="search-artist-input"
            placeholder="Artista"
            value={ inputArtistSearch }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ inputArtistSearch.length < charLimit }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { (shouldRender && arrOfAlbums.length === 0)
          ? <h3>Nenhum álbum foi encontrado</h3>
          : (
            <>
              <h3>{`Resultado de álbuns de: ${lastArtistSearched}`}</h3>
              <main className="mainAlbums">
                {arrOfAlbums.map((album) => (
                  <AlbumCard
                    key={ album.collectionId }
                    collectionId={ album.collectionId }
                    collectionName={ album.collectionName }
                    artworkUrl100={ album.artworkUrl100 }
                    releaseDate={ album.releaseDate }
                  />
                ))}
              </main>
            </>
          )}
      </div>
    );
  }
}

export default Search;
