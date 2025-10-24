"use strict";
cc._RF.push(module, '7d5e6y8o6ZAEIJyyApdsvNe', 'SpineUtils');
// Script/gamePlay/common/SpineUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimationEnum = exports.DefaultAnimationsEnum = void 0;
exports.DefaultAnimationsEnum = cc.Enum({ '<None>': 0 });
function setEnumAttr(obj, propName, enumDef) {
    if (!CC_EDITOR) {
        return;
    }
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
}
function refreshEditor(enumArray, node) {
    if (!CC_EDITOR) {
        return;
    }
    for (var _i = 0, enumArray_1 = enumArray; _i < enumArray_1.length; _i++) {
        var _a = enumArray_1[_i], component = _a.component, propName = _a.propName, enumDef = _a.enumDef;
        setEnumAttr(component, propName, enumDef);
    }
    global.Editor.Utils.refreshSelectedInspector('node', node.uuid);
}
function updateAnimationEnum(spineComp, context, propName) {
    if (!CC_EDITOR) {
        return;
    }
    var animEnum = exports.DefaultAnimationsEnum;
    var skeletonData = (spineComp || Object.create(null)).skeletonData;
    if (skeletonData) {
        animEnum = skeletonData.getAnimsEnum();
    }
    refreshEditor([{ component: context, propName: propName, enumDef: animEnum }], context.node);
}
exports.updateAnimationEnum = updateAnimationEnum;

cc._RF.pop();