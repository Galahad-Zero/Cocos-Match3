import SpineProperty from '../common/SpineProperty';

const { ccclass, property, requireComponent } = cc._decorator;

@ccclass
@requireComponent(sp.Skeleton)
export default class BaseEffect extends cc.Component {
    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    public reuse(
        style: SpineProperty,
        initPos: cc.Vec2,
        parent: cc.Node,
        cd: () => void
    ): void {
        this.node.setPosition(initPos);
        this.node.setParent(parent);
        this.skeleton.skeletonData = style.skeletonData;
        this.skeleton.setAnimation(0, style.animation, style.isLoop);
        this.skeleton.setEndListener(() => {
            cd();
        });
    }

    public unuse(): void {
        // this.skeleton.clearTracks();
        this.skeleton.skeletonData = null;
    }
}
