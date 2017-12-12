module.exports = {
  'HOME: User should be able to see a home page': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/')
      .waitForElementVisible('body', 4000)
      .pause(2000)
      .assert.containsText('.heading', 'Communicate Group Messages Instantly')
      .end();
  },
  'SIGNUP: User should be able to access the register page': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/register')
      .waitForElementVisible('body', 4000)
      .pause(2000)
      .assert.containsText('.heading', 'Register With PostIt')
      .end();
  },
  'LOGIN: User should be able to access the login page': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/login')
      .waitForElementVisible('body', 4000)
      .pause(2000)
      .assert.containsText('.form-brief', 'LOGIN')
      .end();
  },
  'FORGOT PASSWORD: User should be able to see the forgot password page':
  (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/request-password')
      .waitForElementVisible('body', 4000)
      .pause(2000)
      .assert.containsText('.form-brief', 'REQUEST FOR A NEW PASSWORD')
      .end();
  },
  'NOT FOUND: User should be see a not found page':
  (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/#/unknown-route')
      .waitForElementVisible('body', 4000)
      .pause(2000)
      .assert.containsText('.not-found-page', 'Not Found')
      .end();
  },
  'API DOCS: User should be see the API documentation page':
  (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:3001/api-docs')
      .waitForElementVisible('body', 4000)
      .pause(2000)
      .assert.containsText('#introduction', 'Introduction')
      .end();
  },
};
