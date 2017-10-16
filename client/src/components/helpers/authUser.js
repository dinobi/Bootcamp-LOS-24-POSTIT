import React from 'react';
import jwtDecode from 'jwt-decode';
import connect from 'react-redux';

class AuthUser extends React.Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      location.hash = '#login';
    }
  }

  render() {
    const user = localStorage.getItem('authToken');
    if (this.props.isLoggedIn) {
      const decoded = jwtDecode(user);
      return this.props.children;
    } else {
      return null;
    }
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.userIsAuthenticated
  };
}

export default connect(mapStateToProps)(AuthUser);
