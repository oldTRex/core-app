
let jmoment = require('jalali-moment');
let moment  = require('moment');


/**
 * Returns the equivalent unixTime of the jDate
 * 
 * @param {string} jDate 
 */
export function jalaliToUnixTime(jDate) {
    if (jDate == null || jDate == '')
        return '';
    let  unixTime = jmoment(String(jDate), 'jYYYY/jM/jD').formnat('YYYY/MM/DD');
    return (new Date(unixTime)).getTime()/1000;
}

/**
 * Returns the equivalent unixTime of the date
 * 
 * @param {string} date 
 */
export function gregorianToUnixTime(date) {
    if (date == null || date == '')
        return '';
    let  unixTime = new Date(date).getTime()/1000;
    return unixTime;
}


/**
 * Returns the jalali equivalent of the given unixTime
 * 
 * @param {number} ut
 */
export function unixTimeToJalali(ut) {
    if(ut == null || ut == '')
        return '';

    let gregorian = moment.unix(ut/1000).format("YYYY/MM/DD"),
        jalali = jmoment(String(gregorian), 'YYYY/MM/DD').format('jYYYY/jMM/jDD');
    
    return jalali;
    
}

/**
 * Returns the Gregorian equivalent of the given unixTime
 * 
 * @param {number} ut
 */
export function unixTimeToGregorian(ut) {
    if(ut == null || ut == '')
        return '';

    return moment.unix(ut/1000).format("YYYY/MM/DD");
}