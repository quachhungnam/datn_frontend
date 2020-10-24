let today = new Date()
let current_schoolyear = today.getFullYear()
if (0 <= today.getMonth() && today.getMonth() <= 7) {
    current_schoolyear = current_schoolyear - 1
}

export { current_schoolyear }