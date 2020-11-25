// // const groupBy = key => array =>
// //     array.reduce((objectsByKeyValue, obj) => {
// //         const value = obj.lecture.school_year[key]; // lay gia tri nam hoc
// //         objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
// //         return objectsByKeyValue;
// //     }, {});

// // const cars = [
// //     { brand: 'Audi', color: 'black' },
// //     { brand: 'Audi', color: 'white' },
// //     { brand: 'Ferarri', color: 'red' },
// //     { brand: 'Ford', color: 'white' },
// //     { brand: 'Peugot', color: 'white' }
// // ];

let today = Date()
console.log(today)
// const rs = [
//     {
//         "id": 1,
//         "student": {
//             "user": {
//                 "id": 6,
//                 "username": "hocsinh1",
//                 "is_teacher": false,
//                 "first_name": "Thi Nu",
//                 "last_name": "Nguyen",
//                 "gender": false,
//                 "birthday": "2020-11-15",
//                 "email": "quachhungnam1@gmail.com",
//                 "phone_number": "+84974436947",
//                 "address": "60 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu, TP Đà Nẵng"
//             },
//             "is_crew": false,
//             "classes": 1
//         },
//         "lecture": {
//             "id": 1,
//             "teacher": {
//                 "user": {
//                     "id": 3,
//                     "username": "giaovien1",
//                     "is_teacher": true,
//                     "first_name": "",
//                     "last_name": "",
//                     "gender": null,
//                     "birthday": null,
//                     "email": "giaovien1@gmail.com",
//                     "phone_number": "+84974436947",
//                     "address": "Da Nang 2"
//                 },
//                 "department": null
//             },
//             "subject": {
//                 "id": 1,
//                 "subject_name": "Toán",
//                 "grades": 10,
//                 "descriptions": ""
//             },
//             "classes": {
//                 "id": 1,
//                 "class_name": "A1",
//                 "course_year": 2020,
//                 "student": [
//                     6
//                 ]
//             },
//             "school_year": {
//                 "id": 1,
//                 "from_year": "2020-11-15",
//                 "to_year": "2021-11-15",
//                 "status": true
//             },
//             "status": true
//         },
//         "mid_st_semester_point": null,
//         "end_st_semester_point": null,
//         "gpa_st_semester_point": null,
//         "mid_nd_semester_point": null,
//         "end_nd_semester_point": null,
//         "gpa_nd_semester_point": null,
//         "gpa_year_point": null,
//         "is_public": false,
//         "is_locked": false,
//         "st_due_input": "2020-11-18",
//         "nd_due_input": "2020-11-18",
//         "marksregulary": []
//     },
//     {
//         "id": 2,
//         "student": {
//             "user": {
//                 "id": 6,
//                 "username": "hocsinh1",
//                 "is_teacher": false,
//                 "first_name": "Thi Nu",
//                 "last_name": "Nguyen",
//                 "gender": false,
//                 "birthday": "2020-11-15",
//                 "email": "quachhungnam1@gmail.com",
//                 "phone_number": "+84974436947",
//                 "address": "60 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu, TP Đà Nẵng"
//             },
//             "is_crew": false,
//             "classes": 1
//         },
//         "lecture": {
//             "id": 2,
//             "teacher": {
//                 "user": {
//                     "id": 5,
//                     "username": "giaovien2",
//                     "is_teacher": true,
//                     "first_name": "",
//                     "last_name": "",
//                     "gender": null,
//                     "birthday": null,
//                     "email": "",
//                     "phone_number": "",
//                     "address": ""
//                 },
//                 "department": null
//             },
//             "subject": {
//                 "id": 2,
//                 "subject_name": "Lý",
//                 "grades": 10,
//                 "descriptions": ""
//             },
//             "classes": {
//                 "id": 1,
//                 "class_name": "A1",
//                 "course_year": 2020,
//                 "student": [
//                     6
//                 ]
//             },
//             "school_year": {
//                 "id": 1,
//                 "from_year": "2021-11-15",
//                 "to_year": "2021-11-15",
//                 "status": true
//             },
//             "status": true
//         },
//         "mid_st_semester_point": null,
//         "end_st_semester_point": null,
//         "gpa_st_semester_point": null,
//         "mid_nd_semester_point": null,
//         "end_nd_semester_point": null,
//         "gpa_nd_semester_point": null,
//         "gpa_year_point": null,
//         "is_public": false,
//         "is_locked": false,
//         "st_due_input": "2020-11-18",
//         "nd_due_input": "2020-11-18",
//         "marksregulary": []
//     }
// ]


// let people = [
//     { name: 'Alice', age: 21, lecture: { school: 2020, year: 20 } },
//     { name: 'Max', age: 20, lecture: { school: 2020, year: 20 } },
//     { name: 'Jane', age: 20, lecture: { school: 2021, year: 21 } }
// ];

// function groupBy(objectArray, property) {
//     return objectArray.reduce(function (acc, obj) {
//         let key = obj.lecture.school_year[property]
//         if (!acc[key]) {
//             acc[key] = []
//         }
//         acc[key].push(obj)
//         return acc
//     }, {})
// }

// let groupedPeople = groupBy(rs, 'from_year')
// // console.log(JSON.stringify(groupedPeople))
// for(let key in groupedPeople ){
//     console.log(key)
//     console.log(groupedPeople[key])
//     console.log()
// }



// // //khi them diem danh gia thuong xuyen thi hien len 1 column,n
//   // const filMarkSemester = (marks, semester) => {
//   //   return marks.marksregulary.filter((item) => item.semester == semester);
//   // };

//   // const showListDGTX2 = () => {
//   //   if (filMarkSemester(marks, 2).length == 0) {
//   //     return (
//   //       <td>
//   //         <Form.Row className="float-md-right">
//   //           {props.marksState.isAddDGTX2 == false ? (
//   //             <Form.Control
//   //               readonly
//   //               style={{ width: 80 }}
//   //               size="sm"
//   //               type="text"
//   //               placeholder="DGTX"
//   //               defaultValue={""}
//   //               disabled={false}
//   //             />
//   //           ) : (
//   //             ""
//   //           )}
//   //         </Form.Row>
//   //       </td>
//   //     );
//   //   }

//   //   let ele = [];
//   //   for (let i = 0; i < filMarkSemester(marks, 2).length; i++) {
//   //     let item;
//   //     item = (
//   //       <td>
//   //         <Form.Row className="float-md-right">
//   //           <Form.Control
//   //             readonly
//   //             style={{ width: 80 }}
//   //             size="sm"
//   //             type="text"
//   //             placeholder="DGTX"
//   //             defaultValue={filMarkSemester(marks, 2)[i].point}
//   //             disabled={false}
//   //           />
//   //         </Form.Row>
//   //       </td>
//   //     );
//   //     ele.push(item);
//   //   }

//   //   return ele;
//   // };
//   // const showListDGTX1 = () => {
//   //   if (filMarkSemester(marks, 1).length == 0) {
//   //     return (
//   //       <td>
//   //         <Form.Row className="float-md-right">
//   //           {props.marksState.isAddDGTX1 == false ? (
//   //             <Form.Control
//   //               readonly
//   //               style={{ width: 80 }}
//   //               size="sm"
//   //               type="text"
//   //               placeholder="DGTX"
//   //               defaultValue={""}
//   //               disabled={false}
//   //             />
//   //           ) : (
//   //             ""
//   //           )}
//   //         </Form.Row>
//   //       </td>
//   //     );
//   //   }

//   //   let ele = [];
//   //   for (let i = 0; i < filMarkSemester(marks, 1).length; i++) {
//   //     let item;
//   //     item = (
//   //       <td>
//   //         <Form.Row className="float-md-right">
//   //           <Form.Control
//   //             readonly
//   //             style={{ width: 80 }}
//   //             size="sm"
//   //             type="text"
//   //             placeholder="DGTX"
//   //             defaultValue={filMarkSemester(marks, 1)[i].point}
//   //             disabled={false}
//   //           />
//   //         </Form.Row>
//   //       </td>
//   //     );
//   //     ele.push(item);
//   //   }

//   //   return ele;
//   // };

// // const groupByBrand = groupBy('brand');
// // const groupByColor = groupBy('color');

// // console.log(
// //     JSON.stringify({
// //         carsByBrand: groupByBrand(cars),
// //         // carsByColor: groupByColor(cars)
// //     }, null, 2)
// // );