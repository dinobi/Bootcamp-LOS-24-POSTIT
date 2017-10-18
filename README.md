# Bootcamp-LOS-24-PostIt
I (Dinobi) took on the development of this project as part of the requirements to become a fellow at Andela  https://andela.com/. I thank Phil, Victoria, Tracy, Femi and the rest of the BFA/LFA's of bootcamp-los-24 for all their support

![postit-landing](https://user-images.githubusercontent.com/13672476/29314076-3ff95124-81b4-11e7-824c-d2757e27d5a4.png)

# PostIt

[![Build Status](https://travis-ci.org/dinobi/Bootcamp-LOS-24-POSTIT.svg?branch=master)](https://travis-ci.org/dinobi/Bootcamp-LOS-24-POSTIT) [![Coverage Status](https://coveralls.io/repos/github/dinobi/Bootcamp-LOS-24-POSTIT/badge.svg?branch=master)](https://coveralls.io/github/dinobi/Bootcamp-LOS-24-POSTIT?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/3de5caa7a72272b8098a/maintainability)](https://codeclimate.com/github/dinobi/Bootcamp-LOS-24-POSTIT/maintainability) [![dependencies Status](https://david-dm.org/dinobi/Bootcamp-LOS-24-POSTIT/status.svg)](https://david-dm.org/dinobi/Bootcamp-LOS-24-POSTIT)

**Communicate Group Messages Instantly**
> - PostIt is a simple web application built to allow family, friends and colleagues share message broadcast in a fun way anytime.

> - https://postit-webapp.herokuapp.com/

> - This project is strictly for learning purposes as instructed by Andela and not a commercial product.

**Project Stack**
> - UI Template:
    - Front End Implementation in HTML/CSS

> - Client Side: 
    - Front End Organization in React/Redux + SASS

> - Serve Side:
    - Back End Implementation in Node/Express (Server) + Sequelize/Postgres (Database and ORM)

> - Authentication and Code Base Organization
    - JWT, es6, Babel, Webpack
    
> - Testing and Best Practices
    - eslint, Airbnb JavaScript Style Guide, Mocha/Chai + chai-http

# Features
- Personalized dashboard UI for users with access
- Holistic view of every feature of the app from a welcome screen
- Quickly view all notifications based on group card UI
- Search for colleagues, friends or family who are on the platform
- Quickly create a group or add new members to your broadcast group
- Post messages with added advantage of using wikipedia search right from you dashboard
- Get messages on different medium based on message priority level
- Have fun.

# Installation and Dependencies
> - Run `npm install` to install dependencies/dev-dependencies
> - Setup Postgres
> - setup your db with the settings in `server/config/config.json`
> - Run `$ sequelize db:migrate`
> - Run `npm start exec` to start server
