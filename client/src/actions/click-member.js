import actionType from '../constants';

const onMemberClick = (member) => {
  console.log(`member: ${member['First Name']} was clicked`);
  return (
  {
    type: actionType.MEMBER_CLICKED,
    payload: member
  }
  );
};

export default onMemberClick;
