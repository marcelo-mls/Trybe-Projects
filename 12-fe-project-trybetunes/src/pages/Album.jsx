import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistData: {},
      musicsData: [],
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.callMusicsAPIs();
  }

  callMusicsAPIs = async () => {
    const { match } = this.props;
    const musics = await musicsAPI(match.params.id);
    const favorites = await getFavoriteSongs();

    this.setState({
      isLoading: true,
      musicsData: [...musics],
      favoriteSongs: favorites,
    },
    async () => {
      const { musicsData } = this.state;

      this.setState({
        artistData: musicsData.shift(),
        isLoading: false,
      });
    });
  }

  render() {
    const { artistData, musicsData, favoriteSongs, isLoading } = this.state;

    return (
      <div data-testid="page-album" className="page">
        Album
        <Header />
        <div>
          <h3 data-testid="artist-name">{artistData.artistName}</h3>
          <h2 data-testid="album-name">{artistData.collectionName}</h2>
          <img src={ artistData.artworkUrl100 } alt={ artistData.collectionName } />
        </div>
        { isLoading
          ? <Loading />
          : (
            musicsData.map((music, index) => (
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                favoriteSongs={ favoriteSongs }
                music={ music }
              />
            )))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
