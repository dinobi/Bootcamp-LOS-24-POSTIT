module.exports = {
  'PASSWORD: User should get an error if field is empty': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/request-password')
      .waitForElementVisible('body', 4000)
      .click('button#request-password')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Email is required')
      .end();
  },
  'PASSWORD: User should get an error if email is invalid does not exist': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/request-password')
      .waitForElementVisible('body', 4000)
      .setValue('input#email', 'foo_bar@postit')
      .click('button#request-password')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Enter a valid email')
      .end();
  },
  'PASSWORD: User should get an error if email does not exist': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/request-password')
      .waitForElementVisible('body', 4000)
      .setValue('input#email', 'johnie@postit.com')
      .click('button#request-password')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'We do not have this email in our record')
      .end();
  },
  'PASSWORD: User should see button change state to sending if email exists': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/request-password')
      .waitForElementVisible('body', 4000)
      .setValue('input#email', 'john_doe@postit.com')
      .click('button#request-password')
      .pause(2000)
      .assert.containsText('button#request-password', 'SENDING...')
      .end();
  }
};
