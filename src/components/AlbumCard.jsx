import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate } = this.props;

    return (
      <div>
        <p>
          Artist:
          { artistName }
        </p>
        <p>
          { collectionName }
        </p>
        <p>
          Price:
          { collectionPrice }
        </p>
        <img src={ artworkUrl100 } alt={ artistName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Álbum
        </Link>
        <p>
          Release Date:
          { releaseDate }
        </p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.string,
  artworkUrl100: PropTypes.string,
  releaseDate: PropTypes.string,
}.isRequired;

export default AlbumCard;
