import { authHeader } from './authHeader'

const API_URL = "http://127.0.0.1:8000";
// http://127.0.0.1:8000/api/token/

async function get_lecture_service(token, id) {
  try {
    let result = await fetch(`${API_URL}/api/lectures/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authHeader.Authorization,
        "Content-Type": "application/json",
      },
    });
    let resultJson = await result.json();
    // console.log(resultJson)
    return resultJson;
  } catch (error) {
    console.log(`Error is: ${error}`);
    return error;
  }
}
async function getLectureDetail(lectureId) {
  try {
    let result = await fetch(`${API_URL}/api/lectures/${lectureId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authHeader.Authorization,
        "Content-Type": "application/json",
      },
    });
    let resultJson = await result.json();
    // console.log(resultJson)
    return resultJson;
  } catch (error) {
    console.log(`Error is: ${error}`);
    return error;
  }
}

// lay danh sach lop ma giao vien day, theo nam hoc
async function get_lecture_teacher_service(teacher_id, schoolyear_id) {
  try {
    let result = await fetch(
      `${API_URL}/api/lectures/teacher/${teacher_id}/schoolyear/${schoolyear_id}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          // Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    let resultJson = await result.json();
    // console.log(resultJson)
    return resultJson;
  } catch (error) {
    console.log(`Error is: ${error}`);
    return error;
  }
}
export { get_lecture_service, get_lecture_teacher_service, getLectureDetail };
