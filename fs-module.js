import fs from "fs";

// dev dipendencies
// dependenices
console.log(performance.now());
// const txt = fs.readFileSync('./text.txt', 'utf-8');
// console.log(txt);

let data = [{
    id: 1
}, {
    id: 2
}];
let id = "1";
id = data.find(p => p.id === (+id)); // give the full object data
console.log(id.id);
fs.readFile('./text.txt', 'utf-8', (err, txt) => {
    console.log(txt);
    return;
});

console.log(performance.now());