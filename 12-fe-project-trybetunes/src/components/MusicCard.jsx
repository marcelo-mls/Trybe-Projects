import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleFavorites();
  }

  handleChange = (event) => {
    const { name, checked } = event.target;

    this.setState({
      [name]: checked,
      isLoading: true,
    },
    async () => {
      const { music } = this.props;
      const { isChecked } = this.state;

      if (isChecked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }

      this.setState({ isLoading: false });
    });
  }

  handleFavorites = () => {
    const { trackId, favoriteSongs } = this.props;
    const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);

    // isChecked controla o checkbox. isFavorite identifica se o id da musica esta incluso no array de favoritas.
    // atribuir o valor de isFavorite para o isChecked, garante que o checkbox esteja corretamente preenchido.
    this.setState({ isChecked: isFavorite });
  }

  render() {
    const { isChecked, isLoading } = this.state;
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    return (
      <div className="musicCard">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="isChecked">
          Favorita
          <input
            type="checkbox"
            name="isChecked"
            id="isChecked"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => this.handleChange(event) }
            checked={ isChecked }
          />
        </label>
        { isLoading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  favoriteSongs: PropTypes.arrayOf(PropTypes.number),
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
