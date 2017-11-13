import React from 'react';
import {
	MainHeader, Footer
} from '../../commonViews';

import LandingImg from '../../../images/postit-landing.png';

const IndexHome = () =>
  <div>
    <MainHeader />
    <main className="container">
      <div className="row">
        <div className="col s12 m6 headline">
          <h1 className="heading">Communicate Group Messages Instantly</h1>
          <h6 className="brief">
            PostIt is built to allow family, friends and colleagues meetup
            in groups to share messages in a fun way whenever they want.
          </h6>
          <div className="quick-access">
            <a href="#register">
              <button className="btn btn-create">Create an account</button>
            </a>
            <p>Already joined PostIt? <a href="#login">Sign in</a></p>
          </div>
        </div>
        <div className="col s12 m6" id="landing-image">
          <img src={LandingImg} alt="postit-landing-img" />
        </div>
      </div>
    </main>
    <Footer />
  </div>;


export default IndexHome;
