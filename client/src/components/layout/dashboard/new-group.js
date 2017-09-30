import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, SideMenu, Copyright } from "../../views";
import onCreateGroup from '../../../actions/create-group';

class NewGroup extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      message: '',
			errorMessage: '',
			isLoading: false
		};
		this.onFocus = this.onFocus.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
  }
  
  onFocus() {
		this.setState({ errorMessage: '' });
	}
	/** handleLogin {e} */
	handleCreate(e) {
		e.preventDefault();
		let { groupname, description } = this;
    groupname = groupname.value.trim();
    description = description.value.trim();
		 if (groupname === '' || description === '') {
			this.setState({ errorMessage: 'Error. All field are required to create a new group' });
    } else {
      const groupData = { groupname, description };
      this.props.onCreateGroup(groupData);
		}
	}
/**
 * Dashboard layout component that enables users create new a new group.
 * 
 * @param {component} <DashHeader/> - The dashboard header navigation.
 * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @param {component} <Copyright/> - The dashboard footer copyright information.
 */
  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="groups"/>
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content">
                <div className="bot-msg">
                <h3>Create a new group</h3>
                </div>
                <div className="features">
                  <form id="create-group-form" onSubmit = { this.handleCreate }>
                    <fieldset className="input-field">
                      <input
                        onFocus = { this.onFocus }
                        placeholder="Enter a group name"
                        id="group_name"
                        type="text"
                        className="validate"
                        ref={(input) => { this.groupname = input; }}
                      />
                      <textarea
                      onFocus = { this.onFocus }
                        placeholder="Enter group description"
                        id="group-description"
                        className="validate"
                        ref={(input) => { this.description = input; }}
                      />
                      {this.state.errorMessage === '' ? '' :
                        <p className="alert error-alert">
                          <i className="fa fa-exclamation-triangle"></i>
                          &nbsp;{this.state.errorMessage}
                        </p>
                      }
                    </fieldset>
                    <button type="submit" className="btn btn-create">
                      Submit
                    </button>
                  </form>
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
  message: state.message,
  // messages: state.messages
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onCreateGroup }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);

