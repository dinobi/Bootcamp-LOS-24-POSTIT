import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    const posts = messages.groupMessages;
    const gmembers = members.groupMembers;

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
              <div className="dashboard-content dashboard-myspace">
                <div className="bot-msg">
                  <h3>{ members.groupMembers.groupname }</h3>
                  <p>Message Board</p>
                  {console.log('expected posts::::::', posts)}
                  {console.log('expected members::::::', members)}
                </div>
                <div className="features">
                  <div className="row">
                    <div className="col s9 m9">
                      {/* <MessageBoard posts={ posts }/> */}
                      {
                        posts.length > 0 ?
                        posts.map((post, index) =>
                          <li key={index}>{post.message}</li>
                        ) :
                        <h3>{ posts.message }</h3>
                      }
                      <div className="message-box" id="send-message">
                        <textarea className="compose" placeholder="Type your message - always be nice...">
                        </textarea>
                        <select id="priority" className="btn btn-create"
                          ref= {(input) => { this.priority = input; }}>
                          <option value="normal">normal</option>
                          <option value="Urgent">urgent</option>
                          <option value="critical">critical</option>
                        </select>
                      </div>
                      <div>
                        <button className="btn btn-primary">
                          Send
                        </button>
                      </div>

                    </div>
                    <div className="col s3 m3">
                      {/* <Members members = { members }/> */}
                      { gmembers.map((member, index) =>
                        <li key={index}>{member.username}</li>
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
  messages: state.messages,
  members: state.members
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loadGroupMessages, loadGroupMembers }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Group);
