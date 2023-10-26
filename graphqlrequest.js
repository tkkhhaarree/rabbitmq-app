const axios = require('axios')


axios({
    url: "http://localhost:5000/graphql",
    method: 'post',
    data: {
        query: `
            query {
                books{
                name
                }
            }
        `
    }
}).then(res => {console.log(res.data.data)});


/*

fetch("http://localhost:5000/graphql", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        query: `
            query {
                books{
                name
                }
            }
        `
    })
}).then(res => res.json()).then(data => {console.log(data.data)})

*/


/*

query {
  book(name: "b1") {
    name
    author{
      id
    }
  }
}

*/