import EventEmitter from 'events';
const myEmitter = new EventEmitter();
// Throws and crashes Node.js

// console.log(myEmitter);

// Event Modules
// Event on and emit events
// myEmitter.on('error', (err) => {
//     console.error('whoops! there was an error'); // req
// });

// setTimeout(() => {
//     myEmitter.emit('error', new Error('whoops!')); // res
// }, 5000);


myEmitter.on('resUser', (resUser) => {
    console.error('whoops! there was an error', resUser); // req
});

setTimeout(() => {
    myEmitter.emit('resUser', {name : "Keval", dep : "Development"}); // res
}, 5000);

