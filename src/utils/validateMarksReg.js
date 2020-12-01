const validateMarksReg = (marksreg) => {

    if (marksreg.point === "") {
        return false
    }
    if (marksreg.point == null) {
        return false
    }
    if (marksreg.point < 0 || 10 < marksreg.point) {
        return false
    }
    return true
}
const validateListMarksReg = (listMarksreg) => {
    for (let i = 0; i < listMarksreg.length; i++) {
        if (validateMarksReg(listMarksreg[i]) === false) {
            return false
        }
    }
    return true
}
//giua ky 1
const validateMarksGK1 = (marks) => {
    if (marks.mid_st_semester_point === "") {
        return false
    }
    if (marks.mid_st_semester_point < 0 || 10 < marks.mid_st_semester_point) {
        return false
    }
    return true
}
const validateListMarksGK1 = (ListMarks) => {
    for (let i = 0; i < ListMarks.length; i++) {
        if (validateMarksGK1(ListMarks[i]) === false) {
            return false
        }
    }
    return true
}
//cuoi ky 1
const validateMarksCK1 = (marks) => {
    if (marks.end_st_semester_point === "") {
        return false
    }
    if (marks.end_st_semester_point < 0 || 10 < marks.end_st_semester_point) {
        return false
    }
    return true
}
const validateListMarksCK1 = (ListMarks) => {
    for (let i = 0; i < ListMarks.length; i++) {
        if (validateMarksCK1(ListMarks[i]) === false) {
            return false
        }
    }
    return true
}
// giua ky 2
const validateMarksGK2 = (marks) => {
    if (marks.mid_nd_semester_point === "") {
        return false
    }
    if (marks.mid_nd_semester_point < 0 || 10 < marks.mid_nd_semester_point) {
        return false
    }
    return true
}
const validateListMarksGK2 = (ListMarks) => {
    for (let i = 0; i < ListMarks.length; i++) {
        if (validateMarksCK2(ListMarks[i]) === false) {
            return false
        }
    }
    return true
}

// Cuoi ky 2
const validateMarksCK2 = (marks) => {
    if (marks.end_nd_semester_point === "") {
        return false
    }
    if (marks.end_nd_semester_point < 0 || 10 < marks.end_nd_semester_point) {
        return false
    }
    return true
}
const validateListMarksCK2 = (ListMarks) => {
    for (let i = 0; i < ListMarks.length; i++) {
        if (validateMarksCK2(ListMarks[i]) === false) {
            return false
        }
    }
    return true
}




export {
    validateMarksReg,
    validateListMarksReg,
    validateListMarksGK1,
    validateListMarksCK1,
    validateListMarksGK2,
    validateListMarksCK2,

}