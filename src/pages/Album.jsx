import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      musicList: [],
      favMusic: [],
    };
  }

  async componentDidMount() {
    const favMusic = await getFavoriteSongs();
    this.setState({
      loading: true,
    });
    const { match: { params: { id } } } = this.props;
    const getMusicApi = await getMusics(id);
    this.setState({
      artistName: getMusicApi[0].artistName,
      artworkUrl100: getMusicApi[0].artworkUrl100,
      collectionName: getMusicApi[0].collectionName,
    });
    const arrayMusic = getMusicApi.filter((music) => music.kind === 'song');
    this.setState({
      loading: false,
      musicList: arrayMusic,
      favMusic,
    });
  }

  render() {
    const { loading,
      artistName,
      artworkUrl100,
      collectionName,
      favMusic,
      musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading />
          : (
            <>
              <label htmlFor="artist-name">
                <p data-testid="artist-name">
                  {artistName}
                </p>
                <p data-testid="album-name">
                  {collectionName}
                </p>
                <img src={ artworkUrl100 } alt={ artistName } />
              </label>
              <ul>
                {musicList.map((obj, index) => (
                  <MusicCard
                    key={ index }
                    trackName={ obj.trackName }
                    previewUrl={ obj.previewUrl }
                    trackId={ obj.trackId }
                    fullMusic={ obj }
                    checked={ favMusic.some((element) => (
                      element.trackName === music.trackName)) }
                  />
                ))}
              </ul>
            </>
          )}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.string,
  params: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default Album;
