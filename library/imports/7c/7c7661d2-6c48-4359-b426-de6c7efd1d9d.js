"use strict";
cc._RF.push(module, '7c766HSbEhDWbQm3mx+/R2d', 'Utils');
// Script/Utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalData = exports.getLocalData = exports.HasLocalData = void 0;
function HasLocalData(name) {
    var str = cc.sys.localStorage.getItem(name);
    return str !== '[object Object]';
}
exports.HasLocalData = HasLocalData;
function getLocalData(name) {
    var str = cc.sys.localStorage.getItem(name);
    return JSON.parse(str);
}
exports.getLocalData = getLocalData;
function setLocalData(name, obj) {
    cc.sys.localStorage.setItem(name, JSON.stringify(obj));
}
exports.setLocalData = setLocalData;

cc._RF.pop();