const axios = require('axios');
axios.post('http://localhost:4000/api/admin/categories', {
  name: "Test Cat",
  slug: "test-cat",
  status: "ACTIVE"
}, {
  // wait, without token it's 401
}).catch(e => console.log(e.response ? e.response.status : e.message));
