const FeatureCard = {
    post: {
        imgDesc: '../../../images/write-post.png',
        imgAlt: 'post message image',
        title: 'Write Post',
        description: 'Compose a post and send as broadcast to group members',
        link: '#messages',
        linkTitle: 'Compose'        
    },
    createGroup: {
        imgDesc: '../../../images/create-group.png',
        imgAlt: 'create group image',
        title: 'Create Group',
        description: 'Create a new group, add members and start posting',
        link: '#Groups',
        linkTitle: 'New Group'        
    },
    addMember: {
        imgDesc: '../../../images/add-member.png',
        imgAlt: 'Add member image',
        title: 'Add Member',
        description: 'Add a new member to your created group for them to start sending and receiving posts within the group',
        link: '#Group',
        linkTitle: 'Add'        
    },
    viewMessages: {
        imgDesc: '../../../images/view-messages.png',
        imgAlt: 'View messages image',
        title: 'View Messages',
        description: 'View what your group members are writing about and stay in the know',
        link: '#Messages',
        linkTitle: 'Message'        
    },
    search: {
        imgDesc: ['../../../images/search-postit.png', '../../images/search-wikipedia.png'],
        imgAlt: ['Search postit image', 'Search wikipedia image'],
        title: ['Search Postit', 'Search Wikipedia'],
        description: ['Search for a user who has registered with postit, or any group to see if they exist on postit.',
        'Search wikipedia right from your inbox and start posting messages backed by fact.'],
        link: ['#Search', '#Search-Wiki'],
        linkTitle: 'Start'        
    }
}

export default FeatureCard;