import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userNameInput: '',
    };
  }

  componentDidMount() {
    this.userLogin();
  }

  async userLogin() {
    this.setState({ loading: true });
    const waitUser = await getUser();
    this.setState({
      loading: false,
      userNameInput: waitUser.name,
    });
  }

  render() {
    const { loading, userNameInput } = this.state;
    return (
      <>
        <header data-testid="header-component">
          <h1 data-testid="header-user-name">{ userNameInput }</h1>
          <Route>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/album/:id">Album</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            <Link to="/profile/edit">ProfileEdit</Link>
          </Route>
        </header>
        {loading && <Loading />}
      </>
    );
  }
}

export default Header;
