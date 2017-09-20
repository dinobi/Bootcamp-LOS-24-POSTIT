import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, SideMenu, MessageBoard, Members, Copyright } from '../../views';
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
    props.loadGroupMessages();
    props.loadGroupMembers();
  }
  /**
   * @return {undefined} - returns presentationals.
   * */
  render() {
    const { groupMessages, groupMembers } = this.props;
    const posts = groupMessages.groupMessages;
    const members = groupMembers.groupMembers;
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
                  <h3>{ groupMessages.toGroup }</h3>
                  <p>Message Board</p>
                </div>
                <div className="features">
                  <div className="row">
                    <div className="col s12 m9">
                      <MessageBoard posts={ posts }/>
                    </div>
                    <div className="col s12 m3">
                      <Members members = { members }/>
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
  groupMessages: state.groupMessages,
  groupMembers: state.groupMembers
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loadGroupMessages, loadGroupMembers }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Group);
