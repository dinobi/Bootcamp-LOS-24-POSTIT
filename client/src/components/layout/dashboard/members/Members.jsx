import React from 'react';
import { IconButton } from '../../../commonViews';

const Members = props =>
  <div className="members-list">
    {
      props.members.map((member, index) => {
        return (
          props.members[0].username === props.user.username ?
            <li key={index}>
              <i className="fa fa-hashtag"></i>
              &nbsp;&nbsp;{member.username}
              <IconButton
                iconClass="fa fa-user-times removeButton tooltipped"
                dataPosition="bottom"
                dataDelay="50"
                dataTooltip={`remove ${member.username}`}
                onClick= {() =>
                props.onRemoveMember({
                  username: member.username
                })}
              />
            </li>
            :
            <li key={index}>
            <i className="fa fa-hashtag"></i>
            &nbsp;&nbsp;{member.username}
          </li>
        );
      })
    }
  </div>;

export default Members;

