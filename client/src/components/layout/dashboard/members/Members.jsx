import React from 'react';
import PropTypes from 'prop-types';
import { IconButton }
from '../../../commonViews';

/**
 * Members Component
 * Displays a list of group members
 *
 * @method Members
 * @returns {Object} JSX
 * @param {Object} props
 */
const Members = ({ members, username, onRemoveMember }) =>
  <div className="members-list">
    {
      members.map((member, index) => {
        return (
          members[0].username === username ?
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
              {member.username}
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

