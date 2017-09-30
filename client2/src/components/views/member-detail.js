import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MemberDetail extends React.Component {
  onMemberDelete(e) {
    e.preventDefualt();
    
  }
  render() {
    return (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4 truncate">
              { this.props.username }
            </span>
            <p>{this.props.member.firstName}</p>
            <p>{this.props.member.lastName}</p>
            <p>{this.props.member.email}</p>
            <p>{this.props.member.phoneNumber}</p>
            <button className="btn red" onClick={() => onMemberDelete}>Delete Member</button>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * 
 * @param {object} state - take required piece of data object as state from store
 * and return as props of members component, listing out members of a group
 * 
 * @return {object} users - return user object
 */
const mapStateToProps = state =>
  ({
    member: state.member
  });

const mapDispatchToProps = dispatch => {
  bindActionCreators({onMemberDelete: onMemberDelete},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);