import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageBoard from './MessageBoard';
import {
  DashHeader, SideMenu, Copyright
} from '../../views';
import loadGroupMessages from '../../../actions/load-group-messages';
import loadGroupMembers from '../../../actions/load-group-members';

/**
 * @class {Group} - Group class component
 */
class Group extends React.Component {
  /**
   * @param {props} - class constructor props
  */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }
  /**
   * @return {undefined} - Returns action creators.
   * */
  componentWillMount() {
    this.props.loadGroupMessages();
    this.props.loadGroupMembers();
  }
  /**
   * @return {undefined} - returns presentationals.
   * */
  render() {
    const { messages, members } = this.props;
    const posts = messages;
    const groupName = location.href.split('/')[location.href.split('/').length - 1];

    const backToGroup = (
      <li>
        <a href="#groups">
          <i className="fa fa-chevron-left" />&nbsp;&nbsp;Back
        </a>
      </li>
    );
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu back={ backToGroup } active="groups"/>
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content group-gui">
                <div className="bot-msg">
                  <h3>{ groupName }</h3>
                  <p>Message Board</p>
                </div>
                <div>
                  <div className="row">
                    <div className="col s9 m9">
                      {
                        posts.length > 0 ?
                        <MessageBoard posts={ posts } /> :
                        <h3 className="black-text">{ posts.message }</h3>
                      }
                    </div>
                    <div className="col s3 m3 members-list">
                      <div className="member-list-title">
                        <h5>Members</h5>
                      </div>
                      { members.map((member, index) =>
                        <li key={index}><i className="fa fa-user"></i>&nbsp;&nbsp;{member.username}</li>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.groupMessages,
  members: state.members.groupMembers
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loadGroupMessages, loadGroupMembers }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Group);
