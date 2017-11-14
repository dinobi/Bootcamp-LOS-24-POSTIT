const requireAuth = () => {
  if (localStorage.getItem('userAuth') === null) {
    location.hash = '#login';
    return;
  }
};

export default requireAuth;
