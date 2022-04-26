import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  render() {
    const { trackId, trackName, previewUrl } = this.props;
    return (
      <li>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <label htmlFor="Favorita">
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
