import React from 'react';

class MySpace extends React.Component {
    render() {
      return (
        <body className="amber">
        <header>
            <nav className="amber">
              <div class="nav-wrapper">
                <a href="index.html" className="dashboard-logo"><img src="./images/postit-logo.png" title="PostIt"/></a>
                <a icon-label="mobile-menu" class="nav-mobile">
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
                <ul className="nav-list right hide-on-med-and-down">
                  <li className="nav-item"><a href="#">About</a></li>
                  <li className="nav-item"><a href="auth.postit/login.html">Login</a></li>
                  <li className="nav-item"><a href="auth.postit/register.html">Register</a></li>
                  <li className="nav-item"><a href="auth.postit/login.html"><button class="btn btn-create">Create a new group</button></a></li>
                </ul>
              </div>
              <div className="mobile-nav">
                <div className="container" id="mobile-nav"></div>					
              </div>
            </nav>
        </header>
        </body>
      );
    }
}

