
fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log(response); // Log the response
    return response.json();
  })
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    console.error(error);
  });
  