// function getData() {
//     return new Promise((resolve, reject) => {
//         resolve(data);
//     });
// }

let add = 123;
const getData = async () => {

    // if (true) {
    //     return "data 1";
    // }
    let data = await 456;
    console.log("data----", data);
    return await 23;
}

const getDataText = getData().then((value) => {
    console.log(value);
});
console.log(getDataText);
console.log("data 2", add);
