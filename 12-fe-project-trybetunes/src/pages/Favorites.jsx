import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      isLoading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.callGetFavoriteSongs();
  }

  callGetFavoriteSongs = async () => {
    const favorites = await getFavoriteSongs();

    this.setState({
      favoriteSongs: favorites,
      isLoading: false,
    });
  }

  handleChange = (event) => {
    const { trackId, checked } = event.target; // Pega o checked e a prop TrackId do meu evento
    const { favoriteSongs } = this.state; // Pega a lista de favoritas que foi armazenada no estado.
    // Identifica se na lista de favoritas, tem alguma musica com o mesmo trackId da musica do evento/checkbox
    const identifySongToRemove = favoriteSongs.find((song) => song.trackId === trackId);

    // inicia o Loading e e atualiza o valor do checked do evento
    this.setState({
      isLoading: true,
      isChecked: checked,
    },
    async () => {
      // Se tiver identificado musica na linha 35. Chama a função para remove-lá
      if (identifySongToRemove && !checked) await removeSong(identifySongToRemove);
      // Após remover chama novamente função de musicas favoritas para atualizar o estado.
      const newFavoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs: newFavoriteSongs,
        isLoading: false, // retirar o Loading
      });
    });
  };

  render() {
    const { isChecked, isLoading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites" className="page">
        favorites
        <Header />
        { favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            favoriteSongs={ favoriteSongs }
            music={ music }
            onChange={ (event) => this.handleChange(event) }
            checked={ isChecked }
          />
        ))}
        { isLoading && <Loading /> }
      </div>
    );
  }
}

export default Favorites;
