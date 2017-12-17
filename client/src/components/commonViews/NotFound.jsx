import React from 'react';
// import 404 from '../../../images/404.png';
import MainHeader
  from '../layout/home/MainHeader.jsx';
import Footer from './Footer.jsx';
import notFoundImage from '../../images/postit-preloader.png';

/**
 * NotFound Component
 *
 * Displays a not found page when a user hits
 * a wrong url
 *
 * @method NotFound
 *
 * @returns {Object} JSX
 */
const NotFound = () =>
  <div>
    <MainHeader />
    <div className="center not-found-page">
      <img className="bouncing" src={notFoundImage} alt="not-found-image" />
      <br />
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
    <Footer />
  </div>;


export default NotFound;
