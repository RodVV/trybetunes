import React, { Component } from 'react';
import searchAlbumAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
      artistNameSearch: '',
      searchList: [],
    };

    this.handleAPIs = this.handleAPIs.bind(this);
  }

  handleChange(value) {
    this.setState({
      searchInput: value,
    });
  }

  async handleAPIs() {
    this.setState({
      loading: true,
    });
    const { searchInput } = this.state;
    const albunsApi = await searchAlbumAPI(searchInput);
    this.setState({
      loading: false,
      searchInput: '',
      searchList: albunsApi,
      artistNameSearch: searchInput,
    });
    // console.log(albunsApi);
  }

  render() {
    const { searchInput, loading, artistNameSearch, searchList } = this.state;
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
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ searchInput.length < minLength }
                  onClick={ this.handleAPIs }
                >
                  Pesquisar
                </button>
                {
                  searchList.length > 0
                    ? (
                      <div>
                        <p>{`Resultado de álbuns de: ${artistNameSearch}`}</p>
                        {searchList.map((obj) => (
                          <AlbumCard
                            key={ obj.collectionId }
                            artistName={ obj.artistName }
                            collectionId={ obj.collectionId }
                            collectionName={ obj.collectionName }
                            collectionPrice={ obj.collectionPrice }
                            artworkUrl100={ obj.artworkUrl100 }
                            releaseDate={ obj.releaseDate }
                          />
                        ))}
                      </div>
                    )
                    : <p>Nenhum álbum foi encontrado</p>
                }
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Search;
