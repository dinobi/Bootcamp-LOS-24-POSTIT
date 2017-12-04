import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { IconButton } // eslint-disable-line no-unused-vars
from '../../../commonViews';

/**
 * Members Component
 * Displays a list of group members
 *
 * @method Members
 * @returns {Object} JSX
 * @param {Object} props
 */
const Members = ({ members, user, onRemoveMember }) =>
  <div className="members-list">
    {
      members.map((member, index) => {
        return (
          members[0].username === user.username ?
            <div className="chip" key={index}>
              {member.username}
              <IconButton
                iconClass="fa fa-user-times removeButton tooltipped"
                dataPosition="bottom"
                dataDelay="50"
                dataTooltip={`remove ${member.username}`}
                onClick= {() =>
                onRemoveMember({
                  authUser: members[0].username,
                  username: member.username
                })}
              />
            </div>
            :
            <li className="chip" key={index}>
            <i className="fa fa-circle"></i>
            &nbsp;&nbsp;{member.username}
          </li>
        );
      })
    }
  </div>;

Members.defaultProps = {
  members: [],
  user: {},
  onRemoveMember: () => { }
};
Members.propTypes = {
  members: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onRemoveMember: PropTypes.func.isRequired
};

export default Members;

