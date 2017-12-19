/**
 * Creating a new group
 */
module.exports = {
  'GROUPS: User should get an error if groupname is less than 3 characters': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john12345')
      .pause(1000)
      .click('button#login')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Welcome back john_doe@postit.com')
      .pause(1000)
      .url('http://localhost:3001/#/groups')
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'te')
      .pause(1000)
      .setValue('input#description', 'This is just a test group')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'group name is too short. minimum of 3 characters is allowed')
      .pause(1600);
  },
  'GROUPS: User should get an error if groupname is more than 15 characters': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'RainierIsASimulationsTeam')
      .pause(1000)
      .setValue('input#description', 'This is just a test group')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'group name is too long. max of 15 characters is allowed')
      .pause(1600);
  },
  'GROUPS: User should get an error if description is less than 15 characters': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'Rainier')
      .pause(1000)
      .setValue('input#description', 'So short')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'description is too short. minimum of 15 characters is allowed')
      .pause(1600);
  },
  'GROUPS: User should get an error if description is more than 45 characters': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'Rainier')
      .pause(1000)
      .setValue('input#description', 'This is just a test group and yet its name is looong')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'description is too long. max of 45 characters is allowed')
      .pause(1600);
  },
  'GROUPS: User should get an error if groupname contain invalid characters': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', '@rainier team')
      .pause(1000)
      .setValue('input#description', 'This is just a test group')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'groupname can contain only alphabets, numbers, dash and underscore')
      .pause(1600);
  },
  'GROUPS: It should create a new group with valid inputs': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'rainier-team')
      .pause(1000)
      .setValue('input#description', 'This is just a test group')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'rainier-team was created successfully')
      .pause(1600);
  },
  'GROUPS: User should get an error if groupname already exist': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .setValue('input#groupname', 'rainier-team')
      .pause(1000)
      .setValue('input#description', 'This is just a test group')
      .pause(1000)
      .click('i.fa-plus')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'rainier-team already exist')
      .pause(1600);
  },
  'GROUPS: User should be able to view the group message board': (client) => {
    client
      .waitForElementVisible('.dashboard-content', 4000)
      .url('http://localhost:3001/#/groups/rainier-team')
      .waitForElementVisible('div.message-board', 4000)
      .assert.containsText('p.message', 'Welcome to your new message board.')
      .pause(1600);
  },
  'GROUPS: User should be able to send a new group message': (client) => {
    client
      .waitForElementVisible('form.message-box', 4000)
      .setValue('textarea', 'This is our very first conversation')
      .pause(1000)
      .click('i.fa-send')
      .submitForm('#send-message')
      .waitForElementVisible('section.post-message', 1000)
      .assert.containsText('p.message', 'This is our very first conversation')
      .assert.containsText('span.tag', 'normal')
      .assert.containsText('h6.sender', 'john_doe')
      .pause(1600);
  },
  'GROUPS: User should see a members list containing group creator': (client) => {
    client
      .waitForElementVisible('div.members-list', 1000)
      .assert.containsText('div.chip', 'john_doe')
      .pause(1600);
  },
  'GROUPS: User should be able to search for other registered users': (client) => {
    client
      .waitForElementVisible('div.member-list-title', 1000)
      .click('span.addButton')
      .pause(1000)
      .waitForElementVisible('div.modal-header', 1000)
      .setValue('input#searchTerm', 'foo_bar')
      .pause(2000)
      .waitForElementVisible('li.result-item', 1000)
      .assert.containsText('div.search-result', 'foo_bar')
      .end();
  }
};
