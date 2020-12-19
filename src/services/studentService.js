import { API_URL } from "./urlService";
async function get_list_student_service(class_id) {
  try {
    let result = await fetch(`${API_URL}/api/lectures/classes/${class_id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // Authorization: token,
        "Content-Type": "application/json",
      },
    });
    let resultJson = await result.json();
    // console.log(resultJson)
    return resultJson;
  } catch (ex) {
    console.log(`Error is: ${ex}`);
    return { error: ex };
  }
}
async function getStudentLecture(classId, yearId) {
  try {
    let result = await fetch(
      `${API_URL}/api/students/classes/${classId}/schoolyear/${yearId}/`,
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
  } catch (ex) {
    console.log(`Error is: ${ex}`);
    return { error: ex };
  }
}

//lay danh sach hoc sinh va hanh kiem
async function getStudentConduct(classId) {
  try {
    let result = await fetch(
      `${API_URL}/api/students/learningoutcomes/classes/${classId}/`,
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
    return resultJson;
  } catch (ex) {
    console.log(`Error is: ${ex}`);
    return { error: ex };
  }
}

async function postStudentConduct(obj) {
  try {
    let result = await fetch(`${API_URL}/api/learningoutcome/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (ex) {
    console.log(`Error is: ${ex}`);
    return { error: ex };
  }
}
async function patchStudentConduct(obj) {
  try {
    let result = await fetch(`${API_URL}/api/learningoutcome/${obj.id}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        // Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (ex) {
    console.log(`Error is: ${ex}`);
    return { error: ex };
  }
}

async function uploadFile(files) {
  try {
    let result = await fetch(`${API_URL}/api/uploadfile/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Authorization: token,
        // 'Content-Type': 'application/json',
      },
      body: files,
    });
    let resultJson = await result.json();
    // console.log(resultJson)
    return resultJson;
  } catch (ex) {
    console.log(`Error is: ${ex}`);
    return { error: ex };
  }
}

export {
  get_list_student_service,
  uploadFile,
  getStudentLecture,
  getStudentConduct,
  postStudentConduct,
  patchStudentConduct,
};
