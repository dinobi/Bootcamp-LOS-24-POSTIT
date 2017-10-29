import actionType from '../actionTypes';

const onMemberClick = member =>
  ({
    type: actionType.MEMBER_CLICKED,
    payload: member
  });

export default onMemberClick;
