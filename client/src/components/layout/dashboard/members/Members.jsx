import React from 'react';
import { IconButton } from '../../../commonViews';

const Members = ({ members, user, onRemoveMember }) =>
  <div className="members-list">
    {
      members.map((member, index) => {
        return (
          members[0].username === user.username ?
            <li key={index}>
              <i className="fa fa-circle"></i>
              &nbsp;&nbsp;{member.username}
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
            </li>
            :
            <li key={index}>
            <i className="fa fa-circle"></i>
            &nbsp;&nbsp;{member.username}
          </li>
        );
      })
    }
  </div>;

export default Members;

