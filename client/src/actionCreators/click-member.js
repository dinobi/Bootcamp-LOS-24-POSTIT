const onMemberClick = (member) => {
  console.log(`member: ${member['First Name']} was clicked`);
  return (
  {
    type: 'MEMBER_CLICKED',
    payload: member
  }
  );
};

export default onMemberClick;
