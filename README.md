# Bootcamp-LOS-24-PostIt
I (Dinobi) took on the development of this project as part of the requirements to become a fellow at [Andela](https://andela.com/). I thank Phil, Victoria, Tracy, Femi and the rest of the BFA/LFA's of bootcamp-los-24 for all their support

![postit-landing](https://user-images.githubusercontent.com/13672476/29314076-3ff95124-81b4-11e7-824c-d2757e27d5a4.png)

# PostIt
[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/dinobi/Bootcamp-LOS-24-POSTIT.svg?branch=develop)](https://travis-ci.org/dinobi/Bootcamp-LOS-24-POSTIT) [![Coverage Status](https://coveralls.io/repos/github/dinobi/Bootcamp-LOS-24-POSTIT/badge.svg?branch=develop)](https://coveralls.io/github/dinobi/Bootcamp-LOS-24-POSTIT?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/3de5caa7a72272b8098a/maintainability)](https://codeclimate.com/github/dinobi/Bootcamp-LOS-24-POSTIT/maintainability) [![dependencies Status](https://david-dm.org/dinobi/Bootcamp-LOS-24-POSTIT/status.svg)](https://david-dm.org/dinobi/Bootcamp-LOS-24-POSTIT)

## About
#### Communicate Group Messages Instantly
PostIt is an open source web application built to allow family, friends and colleagues share prioritized messages as broadcast in a fun way anytime.

#### Features
- Personalized dashboard UI for users with access
- Holistic view of every feature of the app from a welcome screen
- Create group, search and add family/friends/colleagues who already have an account to your broadcast group
- Post messages with added advantage of using wikipedia search right from you dashboard
- Get email notification for prioritized messages.
- Have fun.

    [Access PostIt](https://postit-webapp.herokuapp.com/)

## Technology Stack (PERN)

#### Client Side: 
    - Front End Organization in REACT and REDUX
    - Uses SASS for styling and WEBPACK for bundling

#### Serve Side:
    - Back end implementation is built on NODE, using
    EXPRESS as the server and SEQUELIZE as the ORM for
    communicating with the POSTGRES DB.

#### Authentication and Code Base Organization
    - Written in ES6 and uses BABEL for transpiling down
    to ES5 and JWT for authentication.  
    
#### Style Checking and Best Practices
    - Uses ESLINT which was configured to use Airbnb-base rules for style checking

## Usage

#### Installation and Dependencies

1. Install [`node`](https://nodejs.org/en/download/), version 5 or greater is required

2. Install [`postgres`](https://www.postgresql.org/download/)

3. Clone the repo and cd into it

    ```
    git clone https://github.com/dinobi/Bootcamp-LOS-24-POSTIT.git
    cd Bootcamp-LOS-24-POSTIT
    ```

4. Install dependencies

    ```
    npm install
    ```

5. Configure Postgres

    ```
    In the application root directory, use the config settings in
    `server/config/config.js` to setup your postgres db
    ```

6. Run database migrations

    ```
    $ sequelize db:migrate
    ```

7. Build the assets and start the app

    ```
    - npm run build
    - npm start
    ```

## Testing

The app uses `Mocha/Chai` and `Chai-Http` for backend testing, and `Jest` for
frontend testing

- install `Mocha`, `nyc` and `jest-cli` globally: `npm i mocha nyc jest-cli -g`
> - `npm test-dev` - run the unit test suite 
> - `npm test` - run the unit test for backend and display code coverage result
> - `client-test` - run the unit test for frontend and display code coverage result

## Api Docs
The PostIt api documentation source is located in the `server/api-docs`
directory, while the documentation site is:
- [api-docs](https://postit-webapp.herokuapp.com/api-docs)


## Contributing
Check the [contributing](contributing.md) file, it contains everything you need to know.

## Credits

## License
[MIT](https://github.com/dinobi/Bootcamp-LOS-24-POSTIT/blob/develop/LICENSE)

## FAQ
#### Is this an Open-Source Application?


    Yes it is, and contributing to the development of this
    application is by raising PRs
    

#### Who can contribute?

    Anyone!. This application is open to all those who want to
    contribute to open-source development and are willing to follow
    set standards for contributing.
    
#### Is there a set standard for PRs to this repository?

    Yes, there are set conventions for PRs to this repository and can be found
    in the project wiki.
    
#### What language was used to develop this application?

    This project is a full stack Javascript application
    
#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and is open for
    whatever you may choose to use it for.
    
