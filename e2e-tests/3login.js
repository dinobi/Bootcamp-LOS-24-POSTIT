module.exports = {
  'LOGIN: User should get an error if fields are empty': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .click('button#login')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error. Spaces or blank fields are not allowed')
      .end();
  },
  'LOGIN: User should get an error if username does not exist': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'foo_bar')
      .setValue('input#password', 'foo12345')
      .click('button#login')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Authentication failed. Username is incorrect or does not exist')
      .end();
  },
  'LOGIN: User should get an error if email does not exist': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'foo_bar@postit.com')
      .setValue('input#password', 'foo12345')
      .click('button#login')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Authentication failed. Email is incorrect or does not exist')
      .end();
  },
  'LOGIN: User should get an error if password is incorrect': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe@postit.com')
      .setValue('input#password', 'john1234567')
      .click('button#login')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Authentication failed. Incorrect password')
      .end();
  },
  'LOGIN: User should login with a correct user detail': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe@postit.com')
      .setValue('input#password', 'john12345')
      .click('button#login')
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Welcome back john_doe@postit.com')
      .end();
  }
};
