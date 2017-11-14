import React from 'react';
//import 404 from '../../../images/404.png';
import {
	MainHeader, Footer
} from '../../commonViews';

const NotFound = () =>
  <div>
    <MainHeader />
    <div className="center landing">
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
    <Footer/>
  </div>;


export default NotFound;
