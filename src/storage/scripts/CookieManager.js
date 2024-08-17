/**
 * Returns the value of the string with the provided name or undefined if it does not exist
 * @param {String} name 
 * @returns 
 */
function getCookie(name) {
    let cookies = document.cookie?.split(';') || [];
    let thisCookie = cookies.find(cookie => cookie.startsWith(`${name}=`))
    let value = thisCookie?.split('=').pop();
    return value;
}

/**
 * Stores a cookie with the name and value provided, that expires after the given seconds
 * @param {String} name of the cookie
 * @param {String} value of the cookie
 * @param {String} duration UTC String format of the expiring day
 */
function setCookie(name, value, duration) {
    const cookieBody = `${name}=${value}; expires=${duration}; path=/`
    document.cookie = cookieBody;
}

module.exports = {
    getCookie,
    setCookie
};