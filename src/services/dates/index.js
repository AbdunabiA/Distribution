export const getLastDay = () => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    return `${year}-${month < 10 ? "0" + month : month}-${day - 1 < 10 ? "0" + day - 1 : day - 1}`
}
export const getThisDay = () => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    return `${year}-${month < 10 ? "0" + month : month}-${day}`
}
export const getLastMonth = () => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let Lastmonth = month - 1
    return `${year}-${Lastmonth < 10 ? "0" + Lastmonth : Lastmonth}`
}
export const getLastYear = () => {
    let today = new Date()
    let year = today.getFullYear()
    return `${year - 1}`
}
export const getThisYear = () => {
    let today = new Date()
    let year = today.getFullYear()
    return `${year}`
}
export const getDate = (date) => {
    let today = new Date(date)
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`
}
export const thisMonth = () => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    return `${year}-${month < 10 ? "0" + month : month}`
}
export const formatDate = (data) => {
    let obj = {}
    Object.keys(data).forEach(elem => {
        let item = new Date(elem)
        let year = item.getFullYear()
        let month = item.getMonth() + 1
        let day = item.getDate()
        obj[year + '-' + month + '-' + day] = data[elem]
    })
    return obj
}
export const generateDate = (data) => {
    let item = new Date(data)
    let year = item.getFullYear()
    let month = item.getMonth() + 1
    let day = item.getDate()
    return `${year}-${month < 10 ? "0" + month : month}-${day}`
}