
const response = await fetch("http://localhost:3000/users/api/user");

const data = await response.json();

console.log("status:", response.status);
console.log("Users:", data);

/*
const res = await fetch("http://localhost:3000/users/api/user", {
    method : "POST",
    headers: {
    "content-type" : "application/json"
    },
    body: JSON.stringify({
        name: "Musa"
    })
});


const dat = await res.json();

console.log("status", res.status);
console.log("User", dat);

 */
const resp = await fetch("http://localhost:3000/users/api/user/3", {
    method:  "PUT",
    headers: {
        "Content-type" : "application/json"
    },
    body: JSON.stringify({
        name: "Musa"
    })
});

const da = await resp.json();

console.log("status:", resp.status);
console.log("User:", da);

/*
const respo = await fetch("http://localhost:3000/users/api/user/3", {
    method: "DELETE"
});

const d = await respo.json();

console.log("Status:", respo.status);
console.log("User:", d); */