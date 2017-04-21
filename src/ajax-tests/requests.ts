import fetch from 'node-fetch';

var body = {
    "id": 1,
    "itemName": "bread",
    "quantity": 1,
    "price": 1.99
};

var body2 = {
    "id": 2,
    "itemName": "cereal",
    "quantity": 2,
    "price": 2.25
};

// fetch('http://localhost:8080/api/items', {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' },
// })
//     .then(res => res.json())
//     .then(json => console.log(json));


async function postData() {
    const res = await fetch('http://localhost:8080/api/grocery-items/', {
        method: 'POST',
        body: JSON.stringify(body2),
        headers: { 'Content-Type': 'application/json' },
    });
    const json = await res.json().catch((reason: any) => {
        console.log(reason);
    });
    console.log(json);
}

async function getData() {
    const res = await fetch('http://localhost:8080/api/grocery-items/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const json = await res.json().catch((reason: any) => {
        console.log(reason);
    });
    console.log(json);
}


// postData();
getData();