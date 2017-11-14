import React from 'react';
import jwtDecode from 'jwt-decode';
import connect from 'react-redux';
import swal from 'sweetalert';

class AuthUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    componentWillMount() {
      if (localStorage.getItem('userAuth') === null) {
        location.hash = '#login';
        return;
      }
      return 'hasAuth';
    }
    componentDidMount() {
      if (this.props.message === 'Authentication failed. Invalid access token') {
        swal({
          text: 'Reauthenticate',
          icon: 'error'
        });
      }
    }

}
function mapStateToProps(state) {
  return {
    message: state.auth.message
  };
}

export default connect(mapStateToProps)(AuthUser);
