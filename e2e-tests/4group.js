module.exports = {
  'GROUPS: User should be able to login': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe@postit.com')
      .setValue('input#password', 'john12345')
      .click('button#login')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Welcome back john_doe@postit.com')
      .pause(1000)
      .url('http://localhost:3001/#/groups')
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'te')
      .setValue('input#description', 'This is just a test group')
      .end();
  },
};
