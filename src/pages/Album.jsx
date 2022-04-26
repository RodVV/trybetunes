import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      musicList: [],
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const { match: { params: { id } } } = this.props;
    const getMusicApi = await getMusics(id);
    this.setState({
      loading: false,
      artistName: getMusicApi[0].artistName,
      artworkUrl100: getMusicApi[0].artworkUrl100,
      collectionName: getMusicApi[0].collectionName,
    });
    const arrayMusic = getMusicApi.filter((music) => music.kind === 'song');
    this.setState({
      musicList: arrayMusic,
    });
  }

  render() {
    const { loading,
      artistName,
      artworkUrl100,
      collectionName,
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
                {musicList.map((obj) => (
                  <MusicCard
                    key={ obj.trackId }
                    trackName={ obj.trackName }
                    previewUrl={ obj.previewUrl }
                    trackId={ obj.trackId }
                    fullMusic={ obj }
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
