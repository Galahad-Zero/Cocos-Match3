export const DefaultAnimationsEnum = cc.Enum({ '<None>': 0 });

type EnumAttr = { component: cc.Component; propName: string; enumDef: any };

function setEnumAttr(obj: cc.Component, propName: string, enumDef: any): void {
    if (!CC_EDITOR) {
        return;
    }

    (cc.Class as any).attr(obj, propName, {
        type: 'Enum',
        enumList: (cc.Enum as any).getList(enumDef)
    });
}

function refreshEditor(enumArray: EnumAttr[], node: cc.Node): void {
    if (!CC_EDITOR) {
        return;
    }

    for (const { component, propName, enumDef } of enumArray) {
        setEnumAttr(component, propName, enumDef);
    }

    (global as any).Editor.Utils.refreshSelectedInspector('node', node.uuid);
}


export function updateAnimationEnum(
    spineComp: sp.Skeleton,
    context: cc.Component,
    propName: string
): void {
    if (!CC_EDITOR) {
        return;
    }

    let animEnum = DefaultAnimationsEnum;
    const { skeletonData } = (spineComp || Object.create(null)) as any;
    if (skeletonData) {
        animEnum = skeletonData.getAnimsEnum();
    }

    refreshEditor(
        [{ component: context, propName, enumDef: animEnum }],
        context.node
    );
}