





fetch("/api/inventory").then(res => res.json()).then((data) => {
    console.log(data);
})



fetch("/api/inventory/:").then(res => res.json()).then((data) => {
    console.log(data);
})