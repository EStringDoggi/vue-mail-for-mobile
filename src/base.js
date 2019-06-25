exports.install = function (Vue, option) {
    // 补零
    Vue.prototype.addZero = function () {
        if (typeof this == 'number') {
            if (num < 10) {
                return '0' + this
            }
        }
        return this
    };
    Vue.prototype.dateFormat = function (dateObj) {
        // var year = dateObj.getFullYear();
        var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        var day = ("0" + dateObj.getDate()).slice(-2);
        var hour = ("0" + dateObj.getHours()).slice(-2);
        var minutes = ("0" + dateObj.getMinutes()).slice(-2);
        return month + "-" + day + ' ' + hour + ':' + minutes;
    };
    // 测试
    Vue.prototype.test0 = function () {
        console.log('测试');

    };
}