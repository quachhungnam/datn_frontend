

let li = [
    { username: 1, name: "Nguyen hung nam" },
    { username: 2, name: "Pham hung nam" },
    { username: 3, name: "Van hung nam" },
    { username: 5, name: "Tran hung nam" },
    { username: 10, name: "Le hung nam" },
    { username: 4, name: "Ly hung nam" },
]

const after=li.sort((a,b)=>{
    if (a.username > b.username) return 1;
    if (a.username < b.username) return -1;
    return 0;
})

console.log(after)

// const xep = (name) => {
//     // console.log(name, desc);
//     // setDesc(-desc);
//     var temp = listMarks;
//     if (name === "username") {
//         console.log("xxx");
//         temp.sort((a, b) => {
//             if (a.student.name > b.student.name) return -1;
//             if (a.student.name < b.student.name) return 1;
//             return 0;
//         });
//     }
//     console.log(temp);

//     setCount((count) => count + 1);
//     // if (name === "stt") {
//     //   temp.sort((a, b) => {
//     //     if (a.status > b.status) return -value;
//     //     if (a.status < b.status) return value;
//     //     return 0;
//     //   });
//     // }
// };