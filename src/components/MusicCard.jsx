import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    const { checked } = target;
    const { songs } = this.props;
    if (checked === true) {
      this.setState({
        loading: true,
        checked,
      });
      await addSong(songs);
      console.log(addSong);
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(songs);
      console.log(removeSong);
      this.setState({
        loading: false,
        checked,
      });
    }
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { checked, loading } = this.state;
    return (
      <li>
        {loading ? <Loading />
          : (
            <>
              <p>
                {trackName}
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
                  checked={ checked }
                  onChange={ this.handleChange }
                />
                Favorita
              </label>

            </>
          )}

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
