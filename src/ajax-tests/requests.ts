import fetch from 'node-fetch';

var body = {
    "id": "1",
    "name": "React.js Essentials",
    "description": "A fast-paced guide to designing and building scalable and maintainable web apps with React.js.",
    "quantity": "10"
};

var body2 = {
    "id": "2",
    "name": "React.js NON-Essentials",
    "description": "Not much in this book",
    "quantity": "500"
};

// fetch('http://localhost:8080/api/items', {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' },
// })
//     .then(res => res.json())
//     .then(json => console.log(json));


async function postData() {
    const res = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        body: JSON.stringify(body2),
        headers: { 'Content-Type': 'application/json' },
    });
    const json = await res.json();
    console.log(json);
}


postData();