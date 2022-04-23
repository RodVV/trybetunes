import React, { Component } from 'react';
import searchAlbumAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
      artist: '',
      albuns: [],
    };

    this.handleAPIs = this.handleAPIs.bind(this);
  }

  handleChange(value) {
    this.setState({
      searchInput: value,
    });
  }

  async handleAPIs() {
    const { artist } = this.state;
    this.setState({
      loading: true,
      searchInput: '',
    });
    const waitAlbulnsApi = await searchAlbumAPI(artist);
    this.setState({
      albuns: waitAlbulnsApi,
      loading: false,
    });
  }

  render() {
    const { searchInput, loading, artist, albuns } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {loading ? <Loading /> // se loading for true, carrega Loading, se nao carrega os inputs
            : (
              <div>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  value={ searchInput }
                  onChange={ (e) => this.handleChange(e.target.value) }
                />
                <input
                  type="button"
                  data-testid="search-artist-button"
                  value="Pesquisar"
                  disabled={ searchInput.length < minLength }
                  onClick={ this.handleAPIs }
                />

              </div>
            )}
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

export default Search;
