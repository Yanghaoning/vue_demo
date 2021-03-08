import md5 from 'js-md5';

//加密方法
export function Encrypt(time, module, fn) {
    //秘钥规则
    var key = "COMMON@KEY.API";
    var sign = md5(time + key + module + fn)
    return sign;
}
export function getTimes(len) {
    var times = (new Date().getTime() / 1000).toString();
    var newTimes = times.slice(0, len) * 1;
    return newTimes;
}

export function isPhone(){
    return window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|MicroMessenger)/i);
}




