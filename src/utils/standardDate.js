const standardDate = (data) => {
    if (data != null) {
        if (data.length >= 10) {
            let d = data.slice(8, 10)
            let m = data.slice(5, 7)
            let y = data.slice(0, 4)
            return d + "-" + m + "-" + y
        }
    }

    return data
}
export { standardDate }