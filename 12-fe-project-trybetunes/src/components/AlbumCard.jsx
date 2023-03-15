import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const {
      collectionId,
      collectionName,
      artworkUrl100,
      releaseDate,
    } = this.props;

    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div className="albumCard">
          <p>{collectionName}</p>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p>{releaseDate}</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  releaseDate: PropTypes.string,
}.isRequired;

export default AlbumCard;
