/**
 * 返回打招呼
 * @param {string} say
 * @return {string}
 */
exports.sayHi = function (say) {
    return "hello, " + say;
};

/**
 * 获得 cookie 中指定名称的值
 * @param {string} name
 * @return {string}
 */
exports.getCookie = function (name) {
    return document.cookie
        .match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
        ? decodeURIComponent(RegExp.$2) : '';
};

/**
 * 获取QQ号，其在cookie中的格式类似 uin=o12345678，需要返回 12345678
 * @return {number}
 */
exports.getUin = function () {
    var u = this.getCookie('uin');
    return u && parseInt(u.replace(/\D/g, ''), 10) || null;
};
