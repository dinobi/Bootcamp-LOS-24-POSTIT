import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onRemoveMember from '../../actions/removeMember';
import onAddMember from '../../actions/addMember';
/**
 *
 *
 * @class Members
 * @extends {React.Component}
 */
class Members extends React.Component {
	/**
	 * @returns {*}
	 * @memberof SideMenu
	 */
  render() {
		const { members } = this.props;
    return (
      <div className="members-list">
        <div class="table-div">
          <table ng-if="gameLogs.length > 0">
            <thead>
              <h5>Members</h5>
            </thead>
            { members.map((member, index) =>
              <tbody>
              <tr key={index}>
                <td>{ member.username }</td>
                <td><i className="fa fa-user-times right"></i></td>
              </tr>
            </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onRemoveMember, onAddMember }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
