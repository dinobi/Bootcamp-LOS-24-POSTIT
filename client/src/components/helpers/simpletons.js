const trim = (val) => {
  return val.trim();
}

const truncate = (str, length=10) => {
  return str.length > length ? `${str.substr(0, length)}...` : str;
}

export { trim, truncate };