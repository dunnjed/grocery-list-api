import fetch from 'node-fetch';


var body2 = {
    "itemName": "cheese",
    "quantity": 3,
    "price": 4.50
};

var body3 = {
    "itemName": "bread",
    "quantity": 1,
    "price": 1.99
};

var body4 = {
    "itemName": "pickles",
    "quantity": 1,
    "price": 3.50
};


var body = body4;

// fetch('http://localhost:8080/api/items', {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' },
// })
//     .then(res => res.json())
//     .then(json => console.log(json));


async function postData() {
    const res = await fetch('http://localhost:8000/list-item/', {
        method: 'POST',
        body: JSON.stringify(body),
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


postData();
//getData();