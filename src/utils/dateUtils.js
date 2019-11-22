export function formateDate(time){
    if (!time) return ''
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minu = date.getMinutes()
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return `${year}-${month}-${day} ${hours}:${minu}:${sec}` 
}