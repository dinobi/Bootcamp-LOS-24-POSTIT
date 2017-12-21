module.exports = {
  'SIGNUP: User should get an error if fields are empty': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: One or more fields are empty')
      .end();
  },
  'SIGNUP: User should get an error if username is less than 3 characters': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'jo')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john1234')
      .pause(1000)
      .setValue('input#confirmPassword', 'john1234')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Username should be atleast 3 characters long')
      .end();
  },
  'SIGNUP: User should get an error if username is greater than 18 characters': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe_is_here_is_to_stay')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john1234')
      .pause(1000)
      .setValue('input#confirmPassword', 'john1234')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Username should not exceed 18 characters')
      .end();
  },
  'SIGNUP: User should get an error if username is not alphanumeric': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john-doe')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john1234')
      .pause(1000)
      .setValue('input#confirmPassword', 'john1234')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Username can contain only alphabets, numbers, or underscore')
      .end();
  },
  'SIGNUP: User should get an error if email is invalid': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit')
      .pause(1000)
      .setValue('input#password', 'john1234')
      .pause(1000)
      .setValue('input#confirmPassword', 'john1234')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Enter a valid email address')
      .end();
  },
  'SIGNUP: User should get an error if password is less than 6 characters': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john')
      .pause(1000)
      .setValue('input#confirmPassword', 'john')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Password should be up to 6 characters long')
      .end();
  },
  'SIGNUP: User should get an error if passwords do not match': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john12345')
      .pause(1000)
      .setValue('input#confirmPassword', 'john1234567')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(2000)
      .assert.containsText('p.error-alert', 'Error: Passwords do not match')
      .end();
  },
  'SIGNUP: User should be able to create a new account with correct details': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john12345')
      .pause(1000)
      .setValue('input#confirmPassword', 'john12345')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(4000)
      .assert.containsText('.heading', 'Get Started Guide')
      .end();
  },
  'SIGNUP: User should get an error message if username has been taken': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john12345')
      .pause(1000)
      .setValue('input#confirmPassword', 'john12345')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(1000)
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Username already exist')
      .end();
  },
  'SIGNUP: User should get an error message if email has been taken': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'john_doe123')
      .pause(1000)
      .setValue('input#email', 'john_doe@postit.com')
      .pause(1000)
      .setValue('input#password', 'john12345')
      .pause(1000)
      .setValue('input#confirmPassword', 'john12345')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(1000)
      .waitForElementVisible('div.swal-text', 1600)
      .assert.containsText('div.swal-text', 'Email already exist')
      .end();
  },
  'SIGNUP: should signup a new user with different email and unsername': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .setValue('input#username', 'foo_bar')
      .pause(1000)
      .setValue('input#email', 'foo_bar@postit.com')
      .pause(1000)
      .setValue('input#password', 'foo12345')
      .pause(1000)
      .setValue('input#confirmPassword', 'foo12345')
      .pause(1000)
      .setValue('input#phone', '08030000000')
      .pause(1000)
      .click('button#register')
      .pause(4000)
      .assert.containsText('.heading', 'Get Started Guide')
      .end();
  },
};
