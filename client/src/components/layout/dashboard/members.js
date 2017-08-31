import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onMemberClick } from '../../../actionCreators';

class Members extends React.Component {
  constructor() {
    super();
    this.state = {
      member: this.props.member,
    };
  }

  createMembersList(){
    return this.props.member.map((member) => {
      return (
        <li
          key={member.id}
          onClick = { () => this.props.onMemberClick(member) }
        >
          <a>{ member.userName }</a>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="members-list">
        <ul>
          { this.createMembersList() }
        </ul>
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

/**
 * 
 * @param {dispatch}
 * 
 * @return {object}
 */
const mapDispatchToProps = dispatch =>
  (
    bindActionCreators({ onMemberClick: onMemberClick }, dispatch)
  );

export default connect(mapStateToProps, mapDispatchToProps)(Members);
