const dataFetch = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(data => data.json())
    .catch(err => alert(`${err} api data. Check that your local server is running!`))
};

export { dataFetch };