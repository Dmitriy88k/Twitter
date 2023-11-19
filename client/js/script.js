const apiToken = localStorage.getItem('token');

fetch(`${backendUrl}/tweets`, {
    headers: {
        Authorization: apiToken,
    },
})
    .then(r => r.json())
    .then(console.log);
