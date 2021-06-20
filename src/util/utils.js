export function dateFormat(date) {
    let m = ("0" + (date.getMonth() + 1)).substr(-2);
    let r = ("0" + date.getDate()).substr(-2);
    return date.getFullYear() + "年" + m + "月" + r + "日";
}

export function dateParse(date) {
    let d = date.substring(0, 4) + "/" + date.substring(5, 7) + "/" + date.substring(8, 10) + " 00:00:00";
    return new Date(Date.parse(d));
}

export function dateTrans(date) {
    return date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8, 10);
}