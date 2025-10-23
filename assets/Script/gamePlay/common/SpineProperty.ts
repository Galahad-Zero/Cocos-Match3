const {ccclass, property} = cc._decorator;

@ccclass('SpineProperty')
export default class SpineProperty{
    @property({
        type: sp.SkeletonData,
        
    })
    skeletonData: sp.SkeletonData = null;

    @property()
    animation: string = '';

    @property()
    isLoop: boolean = true;
}
