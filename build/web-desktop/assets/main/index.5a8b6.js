window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AudioMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e417rKmulBNK0agg1QyJYm", "AudioMgr");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AudioMgr = class AudioMgr extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgm = null;
        this.clickAudio = null;
        this.swapAudio = null;
      }
      playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
      }
      stopMusic() {
        cc.audioEngine.stopMusic();
      }
      pauseMusic() {
        cc.audioEngine.pauseMusic();
      }
      resumeMusic() {
        cc.audioEngine.resumeMusic();
      }
      _playEffect(audioClip) {
        cc.audioEngine.playEffect(audioClip, false);
      }
      playClickAudio() {
        this._playEffect(this.clickAudio);
      }
      playSwapAudio() {
        this._playEffect(this.swapAudio);
      }
    };
    __decorate([ property(cc.AudioClip) ], AudioMgr.prototype, "bgm", void 0);
    __decorate([ property(cc.AudioClip) ], AudioMgr.prototype, "clickAudio", void 0);
    __decorate([ property(cc.AudioClip) ], AudioMgr.prototype, "swapAudio", void 0);
    AudioMgr = __decorate([ ccclass ], AudioMgr);
    exports.default = AudioMgr;
    cc._RF.pop();
  }, {} ],
  BaseBlock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08e0fRGA5hAXLQI92b8m1AS", "BaseBlock");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BaseBlock = class BaseBlock extends cc.Component {
      constructor() {
        super(...arguments);
        this.skeleton = null;
        this._config = null;
        this._style = null;
      }
      getConfig() {
        return this._config;
      }
      getStyle() {
        return this._style;
      }
      unuse() {
        this.skeleton.setToSetupPose();
        this.skeleton.clearTracks();
        this._config = null;
        this._style = null;
      }
      reuse(config, style, parent) {
        this._config = config;
        this._style = style;
        const targetStyle = this._style.getAnimationInfo(this._config.special);
        this.skeleton.skeletonData = targetStyle.skeletonData;
        parent && this.node.setParent(parent);
        this.skeleton.setAnimation(0, targetStyle.animation, targetStyle.isLoop);
      }
    };
    __decorate([ property(sp.Skeleton) ], BaseBlock.prototype, "skeleton", void 0);
    BaseBlock = __decorate([ ccclass ], BaseBlock);
    exports.default = BaseBlock;
    cc._RF.pop();
  }, {} ],
  BaseEffect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "250f7cnmhtLjLVVSfWrN4Xw", "BaseEffect");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    let BaseEffect = class BaseEffect extends cc.Component {
      constructor() {
        super(...arguments);
        this.skeleton = null;
      }
      reuse(style, initPos, parent, cd) {
        this.node.setPosition(initPos);
        this.node.setParent(parent);
        this.skeleton.skeletonData = style.skeletonData;
        this.skeleton.setAnimation(0, style.animation, style.isLoop);
        this.skeleton.setEndListener(() => {
          cd();
        });
      }
      unuse() {
        this.skeleton.skeletonData = null;
      }
    };
    __decorate([ property(sp.Skeleton) ], BaseEffect.prototype, "skeleton", void 0);
    BaseEffect = __decorate([ ccclass, requireComponent(sp.Skeleton) ], BaseEffect);
    exports.default = BaseEffect;
    cc._RF.pop();
  }, {} ],
  BlockMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2421ePwsr5F+pN0qE2ptvkX", "BlockMgr");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BlockStyleProperty_1 = require("./BlockStyleProperty");
    const BaseBlock_1 = require("./BaseBlock");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BlockMgr = class BlockMgr extends cc.Component {
      constructor() {
        super(...arguments);
        this.blockPrefab = null;
        this.blockStyleArr = [];
        this._blockLoop = null;
      }
      getBlockStyle(blockType) {
        return this.blockStyleArr.find(style => style.blockType === blockType);
      }
      getBlock(blockConfig, parent) {
        const blockStyle = this.getBlockStyle(blockConfig.type);
        if (!blockStyle) return null;
        const block = this.getBlockLoop().get(blockConfig, blockStyle, parent);
        if (!block) {
          const newBlock = cc.instantiate(this.blockPrefab);
          const blockComp = newBlock.getComponent(BaseBlock_1.default);
          blockComp.reuse(blockConfig, blockStyle, parent);
          return blockComp;
        }
        return block.getComponent(BaseBlock_1.default);
      }
      putBlock(block) {
        this._blockLoop.put(block.node);
      }
      getBlockLoop() {
        this._blockLoop || (this._blockLoop = new cc.NodePool(BaseBlock_1.default));
        return this._blockLoop;
      }
      onDestroy() {
        this._blockLoop && this._blockLoop.clear();
        this._blockLoop = null;
      }
    };
    __decorate([ property(cc.Prefab) ], BlockMgr.prototype, "blockPrefab", void 0);
    __decorate([ property({
      type: [ BlockStyleProperty_1.default ]
    }) ], BlockMgr.prototype, "blockStyleArr", void 0);
    BlockMgr = __decorate([ ccclass ], BlockMgr);
    exports.default = BlockMgr;
    cc._RF.pop();
  }, {
    "./BaseBlock": "BaseBlock",
    "./BlockStyleProperty": "BlockStyleProperty"
  } ],
  BlockStyleProperty: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7afc9TN+7pKqqgy16xAhYqW", "BlockStyleProperty");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameTypes_1 = require("../GameTypes");
    const SpineProperty_1 = require("../common/SpineProperty");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BlockStyleProperty = class BlockStyleProperty extends cc.Component {
      constructor() {
        super(...arguments);
        this.blockType = GameTypes_1.BlockType.BLOCK_TYPE_1;
        this.normalAnimationClip = null;
        this.rowAnimationClip = null;
        this.columnAnimationClip = null;
        this.bombAnimationClip = null;
        this.specialAnimationClip = null;
      }
      getAnimationInfo(blockSpecialType) {
        switch (blockSpecialType) {
         case GameTypes_1.BlockSpecialType.ROW:
          return this.rowAnimationClip;

         case GameTypes_1.BlockSpecialType.COLUMN:
          return this.columnAnimationClip;

         case GameTypes_1.BlockSpecialType.BOOM:
          return this.bombAnimationClip;

         case GameTypes_1.BlockSpecialType.SPECIAL_BOOM:
          return this.specialAnimationClip;

         default:
          return this.normalAnimationClip;
        }
      }
    };
    __decorate([ property({
      type: cc.Enum(GameTypes_1.BlockType)
    }) ], BlockStyleProperty.prototype, "blockType", void 0);
    __decorate([ property(SpineProperty_1.default) ], BlockStyleProperty.prototype, "normalAnimationClip", void 0);
    __decorate([ property(SpineProperty_1.default) ], BlockStyleProperty.prototype, "rowAnimationClip", void 0);
    __decorate([ property(SpineProperty_1.default) ], BlockStyleProperty.prototype, "columnAnimationClip", void 0);
    __decorate([ property(SpineProperty_1.default) ], BlockStyleProperty.prototype, "bombAnimationClip", void 0);
    __decorate([ property(SpineProperty_1.default) ], BlockStyleProperty.prototype, "specialAnimationClip", void 0);
    BlockStyleProperty = __decorate([ ccclass ], BlockStyleProperty);
    exports.default = BlockStyleProperty;
    cc._RF.pop();
  }, {
    "../GameTypes": "GameTypes",
    "../common/SpineProperty": "SpineProperty"
  } ],
  ConfigTypes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc9d2QL0ShMFonuzNdXftVo", "ConfigTypes");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  EffectMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "433f9EqP35LTpbUg1DnP8uC", "EffectMgr");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BaseEffect_1 = require("./BaseEffect");
    const SpineProperty_1 = require("../common/SpineProperty");
    const GameTypes_1 = require("../GameTypes");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EffectMgr = class EffectMgr extends cc.Component {
      constructor() {
        super(...arguments);
        this.effectRootNode = null;
        this.effectPrefab = null;
        this.normalEffect = null;
        this.rowEffect = null;
        this.columnEffect = null;
        this.rowEffectAudio = null;
        this.columnEffectAudio = null;
        this.bombEffectAudio = null;
        this.specialBombEffectAudio = null;
        this.effectAudio = null;
        this.comboAudioList = [];
        this.commentAudioList = [];
        this._effectLoop = null;
      }
      onLoad() {
        this._effectLoop = new cc.NodePool(BaseEffect_1.default);
      }
      effectHandler(grid, gameCheckInfo, cd) {
        const {canEliminateCheckInfos: canEliminateCheckInfos} = gameCheckInfo;
        const effectInfoList = [];
        for (const eliminateCheckInfo of canEliminateCheckInfos) {
          const {eliminateBlockType: eliminateBlockType, entryLocation: entryLocation, contiguousLocations: contiguousLocations} = eliminateCheckInfo;
          if (eliminateBlockType !== GameTypes_1.BlockSpecialType.NONE) {
            const style = this.getSpineProperty(eliminateBlockType);
            style && effectInfoList.push({
              location: entryLocation,
              style: style
            });
          }
          for (const location of contiguousLocations) effectInfoList.push({
            location: location,
            style: this.normalEffect
          });
        }
        let step = 0;
        const effectCount = effectInfoList.length;
        const endCallBack = () => {
          step++;
          step === effectCount && cd && cd();
        };
        for (const effectInfo of effectInfoList) {
          const {location: location, style: style} = effectInfo;
          const pos = grid.getCellPosition(location);
          this.getEffect(style, pos, endCallBack);
        }
      }
      getSpineProperty(special) {
        switch (special) {
         case GameTypes_1.BlockSpecialType.NONE:
          return this.normalEffect;

         case GameTypes_1.BlockSpecialType.ROW:
          return this.rowEffect;

         case GameTypes_1.BlockSpecialType.COLUMN:
          return this.columnEffect;

         default:
          return null;
        }
      }
      getEffect(style, initPos, cd) {
        let effect = this._effectLoop.get(style, initPos, this.effectRootNode, () => {
          this.putEffect(effect);
          cd && cd();
        });
        if (!effect) {
          const newEffect = cc.instantiate(this.effectPrefab);
          const effectComp = newEffect.getComponent(BaseEffect_1.default);
          effectComp.reuse(style, initPos, this.effectRootNode, () => {
            this.putEffect(newEffect);
            cd && cd();
          });
          effect = newEffect;
        }
        return effect.getComponent(BaseEffect_1.default);
      }
      putEffect(effectNode) {
        this._effectLoop.put(effectNode);
      }
      setRootPosition(position) {
        this.effectRootNode.setPosition(position);
      }
      playComboAudio(combo) {
        const audioClip = this.comboAudioList[combo - 1];
        audioClip && this._playEffectAudio(audioClip);
      }
      playCommentAudio(totalCombo) {
        const commentList = [ 11, 9, 7, 5, 3 ];
        const commentIndex = commentList.findIndex(comment => totalCombo >= comment);
        if (-1 === commentIndex) return;
        const audioClip = this.commentAudioList[commentIndex];
        audioClip && this._playEffectAudio(audioClip);
      }
      _playEffectAudio(audioClip) {
        audioClip && cc.audioEngine.playEffect(audioClip, false);
      }
    };
    __decorate([ property(cc.Node) ], EffectMgr.prototype, "effectRootNode", void 0);
    __decorate([ property(cc.Prefab) ], EffectMgr.prototype, "effectPrefab", void 0);
    __decorate([ property({
      displayName: "\u666e\u901a\u7279\u6548",
      type: SpineProperty_1.default
    }) ], EffectMgr.prototype, "normalEffect", void 0);
    __decorate([ property({
      displayName: "\u884c\u7279\u6548",
      type: SpineProperty_1.default
    }) ], EffectMgr.prototype, "rowEffect", void 0);
    __decorate([ property({
      displayName: "\u5217\u7279\u6548",
      type: SpineProperty_1.default
    }) ], EffectMgr.prototype, "columnEffect", void 0);
    __decorate([ property(cc.AudioClip) ], EffectMgr.prototype, "rowEffectAudio", void 0);
    __decorate([ property(cc.AudioClip) ], EffectMgr.prototype, "columnEffectAudio", void 0);
    __decorate([ property(cc.AudioClip) ], EffectMgr.prototype, "bombEffectAudio", void 0);
    __decorate([ property(cc.AudioClip) ], EffectMgr.prototype, "specialBombEffectAudio", void 0);
    __decorate([ property(cc.AudioClip) ], EffectMgr.prototype, "effectAudio", void 0);
    __decorate([ property([ cc.AudioClip ]) ], EffectMgr.prototype, "comboAudioList", void 0);
    __decorate([ property([ cc.AudioClip ]) ], EffectMgr.prototype, "commentAudioList", void 0);
    EffectMgr = __decorate([ ccclass ], EffectMgr);
    exports.default = EffectMgr;
    cc._RF.pop();
  }, {
    "../GameTypes": "GameTypes",
    "../common/SpineProperty": "SpineProperty",
    "./BaseEffect": "BaseEffect"
  } ],
  EliminateUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "599801hXItCBautMEeOFnaQ", "EliminateUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.releaseSpecialBlock = exports.specialBlockGenerator = exports.generateSpecialBlock = exports.getEliminateType = void 0;
    const GameTypes_1 = require("../GameTypes");
    const GameUtils_1 = require("./GameUtils");
    const Grid_1 = require("./Grid");
    function getEliminateType(entry, eliminateBlockInfos) {
      const rowCount = eliminateBlockInfos.reduce((acc, info) => acc + (info.location.row === entry.row ? 1 : 0), 0);
      const columnCount = eliminateBlockInfos.reduce((acc, info) => acc + (info.location.column === entry.column ? 1 : 0), 0);
      if (rowCount >= 5) return GameTypes_1.EliminateType.BASE_5;
      if (columnCount >= 5) return GameTypes_1.EliminateType.BASE_5;
      if (4 === rowCount) return columnCount >= 3 ? GameTypes_1.EliminateType.IRREGULAR_5 : GameTypes_1.EliminateType.BASE_4_ROW;
      if (4 === columnCount) return rowCount >= 3 ? GameTypes_1.EliminateType.IRREGULAR_5 : GameTypes_1.EliminateType.BASE_4_COLUMN;
      if (3 === rowCount) return columnCount >= 3 ? GameTypes_1.EliminateType.IRREGULAR_5 : GameTypes_1.EliminateType.BASE_3;
      if (3 === columnCount) return rowCount >= 3 ? GameTypes_1.EliminateType.IRREGULAR_5 : GameTypes_1.EliminateType.BASE_3;
    }
    exports.getEliminateType = getEliminateType;
    function generateSpecialBlock(blockConfig, eliminateType) {
      if (eliminateType === GameTypes_1.EliminateType.BASE_3) return null;
      const baseBlockConfig = {
        type: blockConfig.type,
        special: GameTypes_1.BlockSpecialType.NONE
      };
      switch (eliminateType) {
       case GameTypes_1.EliminateType.BASE_4_ROW:
        baseBlockConfig.special = GameTypes_1.BlockSpecialType.ROW;
        break;

       case GameTypes_1.EliminateType.BASE_4_COLUMN:
        baseBlockConfig.special = GameTypes_1.BlockSpecialType.COLUMN;
        break;

       case GameTypes_1.EliminateType.BASE_5:
        baseBlockConfig.special = GameTypes_1.BlockSpecialType.SPECIAL_BOOM;
        break;

       case GameTypes_1.EliminateType.IRREGULAR_5:
        baseBlockConfig.special = GameTypes_1.BlockSpecialType.BOOM;
        break;

       default:
        return null;
      }
      return baseBlockConfig;
    }
    exports.generateSpecialBlock = generateSpecialBlock;
    function specialBlockGenerator(eliminateCheckInfo, gameCheckInfo) {
      if (eliminateCheckInfo.eliminateBlockType !== GameTypes_1.BlockSpecialType.NONE) return;
      const eliminateBlockInfos = eliminateCheckInfo.contiguousLocations.reduce((acc, location) => {
        const blockConfig = gameCheckInfo.gameMapInfo[location.row][location.column];
        return acc.concat({
          location: location,
          blockConfig: blockConfig
        });
      }, []);
      const entryLocation = eliminateCheckInfo.entryLocation;
      const eliminateType = getEliminateType(entryLocation, eliminateBlockInfos);
      if (eliminateType === GameTypes_1.EliminateType.BASE_3) return;
      const blockConfig = gameCheckInfo.gameMapInfo[entryLocation.row][entryLocation.column];
      const newSpecailBlock = generateSpecialBlock(blockConfig, eliminateType);
      if (newSpecailBlock) {
        const location = Grid_1.stringifyLocation(entryLocation.row, entryLocation.column);
        gameCheckInfo.newSpecailBlocks[location] = newSpecailBlock;
      }
    }
    exports.specialBlockGenerator = specialBlockGenerator;
    function releaseSpecialBlock(eliminateCheckInfo, alreadyEliminateBlocks, gameCheckInfo) {
      const eliminateBlockInfos = eliminateCheckInfo.contiguousLocations.reduce((acc, location) => {
        const blockConfig = gameCheckInfo.gameMapInfo[location.row][location.column];
        return acc.concat({
          location: location,
          blockConfig: blockConfig
        });
      }, []);
      const specialBlockConfig = eliminateBlockInfos.filter(info => info.blockConfig.special !== GameTypes_1.BlockSpecialType.NONE);
      const entryLocation = eliminateCheckInfo.entryLocation;
      while (specialBlockConfig.length > 0) {
        let extraEliminateLocations = [];
        const specialBlockInfo = specialBlockConfig.shift();
        if (specialBlockInfo.blockConfig.special === GameTypes_1.BlockSpecialType.ROW) {
          const targetRow = specialBlockInfo.location.row;
          const colCount = gameCheckInfo.gameMapInfo[targetRow].length;
          const effectedLocations = new Array(colCount).fill(null).map((_, index) => ({
            row: targetRow,
            column: index
          }));
          extraEliminateLocations = effectedLocations.filter(location => !alreadyEliminateBlocks.some(l => GameUtils_1.isLocationEqual(l, location)));
        } else if (specialBlockInfo.blockConfig.special === GameTypes_1.BlockSpecialType.COLUMN) {
          const targetColumn = specialBlockInfo.location.column;
          const rowCount = gameCheckInfo.gameMapInfo.length;
          const effectedLocations = new Array(rowCount).fill(null).map((_, index) => ({
            row: index,
            column: targetColumn
          }));
          extraEliminateLocations = effectedLocations.filter(location => !alreadyEliminateBlocks.some(l => GameUtils_1.isLocationEqual(l, location)));
        } else if (specialBlockInfo.blockConfig.special === GameTypes_1.BlockSpecialType.BOOM) {
          const centerLocation = specialBlockInfo.location;
          const effectLocations = [];
          const isInRange = (row, column) => row >= 0 && row < gameCheckInfo.gameMapInfo.length && column >= 0 && column < gameCheckInfo.gameMapInfo[0].length;
          const rowOffsetList = [ -1, 0, 1 ];
          const columnOffsetList = [ -1, 0, 1 ];
          for (const row of rowOffsetList) for (const column of columnOffsetList) {
            const targetRow = centerLocation.row + row;
            const targetColumn = centerLocation.column + column;
            isInRange(targetRow, targetColumn) && effectLocations.push({
              row: targetRow,
              column: targetColumn
            });
          }
          const offsetList = [ cc.v2(2, 0), cc.v2(0, 2), cc.v2(-2, 0), cc.v2(0, -2) ];
          for (const offset of offsetList) {
            const targetRow = centerLocation.row + offset.x;
            const targetColumn = centerLocation.column + offset.y;
            isInRange(targetRow, targetColumn) && effectLocations.push({
              row: targetRow,
              column: targetColumn
            });
            extraEliminateLocations = effectLocations.filter(location => !alreadyEliminateBlocks.some(l => GameUtils_1.isLocationEqual(l, location)));
          }
        } else if (specialBlockInfo.blockConfig.special === GameTypes_1.BlockSpecialType.SPECIAL_BOOM) {
          const entryBlockConfig = gameCheckInfo.gameMapInfo[entryLocation.row][entryLocation.column];
          const targetType = entryBlockConfig.type;
          const effectLocations = [];
          for (let row = 0; row < gameCheckInfo.gameMapInfo.length; row++) {
            const rowBlocks = gameCheckInfo.gameMapInfo[row];
            for (let col = 0; col < rowBlocks.length; col++) {
              const block = rowBlocks[col];
              block.type === targetType && block.special !== GameTypes_1.BlockSpecialType.SPECIAL_BOOM && effectLocations.push({
                row: row,
                column: col
              });
            }
          }
          extraEliminateLocations = effectLocations.filter(location => !alreadyEliminateBlocks.some(l => GameUtils_1.isLocationEqual(l, location)));
        }
        const extraEliminateBlockInfos = extraEliminateLocations.reduce((acc, location) => {
          const blockConfig = gameCheckInfo.gameMapInfo[location.row][location.column];
          const blockInfo = {
            location: location,
            blockConfig: blockConfig
          };
          blockConfig.special !== GameTypes_1.BlockSpecialType.NONE && specialBlockConfig.push(blockInfo);
          return acc.concat(blockInfo);
        }, []);
        gameCheckInfo.canEliminateCheckInfos.push({
          entryLocation: specialBlockInfo.location,
          eliminateBlockType: specialBlockInfo.blockConfig.special,
          contiguousLocations: extraEliminateBlockInfos.map(info => info.location)
        });
        alreadyEliminateBlocks.push(...extraEliminateLocations);
      }
    }
    exports.releaseSpecialBlock = releaseSpecialBlock;
    cc._RF.pop();
  }, {
    "../GameTypes": "GameTypes",
    "./GameUtils": "GameUtils",
    "./Grid": "Grid"
  } ],
  GameConst: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17bdde2kGNE4qVD5ng8fK0k", "GameConst");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DirectionVector = exports.Direction = exports.TOUCH_BLOCK_EVENT = void 0;
    exports.TOUCH_BLOCK_EVENT = "TOUCH_BLOCK_EVENT";
    var Direction;
    (function(Direction) {
      Direction["NONE"] = "none";
      Direction["UP"] = "up";
      Direction["DOWN"] = "down";
      Direction["LEFT"] = "left";
      Direction["RIGHT"] = "right";
    })(Direction = exports.Direction || (exports.Direction = {}));
    exports.DirectionVector = {
      [Direction.UP]: new cc.Vec2(0, 1),
      [Direction.DOWN]: new cc.Vec2(0, -1),
      [Direction.LEFT]: new cc.Vec2(-1, 0),
      [Direction.RIGHT]: new cc.Vec2(1, 0)
    };
    cc._RF.pop();
  }, {} ],
  GameFinPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8fbfGYbVhBQbAYCnXRPDAH", "GameFinPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let NewClass = class NewClass extends cc.Component {
      constructor() {
        super(...arguments);
        this.label = null;
        this.text = "hello";
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
    __decorate([ property ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([ ccclass ], NewClass);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  GameFsm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cea7bT4edhLnIlAunX1zEM2", "GameFsm");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameState = void 0;
    var GameState;
    (function(GameState) {
      GameState["READY"] = "ready";
      GameState["PLAYING"] = "playing";
      GameState["CHECKING"] = "checking";
      GameState["ELIMINATING"] = "eliminating";
      GameState["DROPPING"] = "dropping";
      GameState["GAME_OVER"] = "gameOver";
      GameState["GAME_WIN"] = "gameWin";
    })(GameState = exports.GameState || (exports.GameState = {}));
    class GameFsm {
      constructor(initialState = GameState.READY) {
        this._stateChangeCallbacks = [];
        this._currentState = initialState;
        this._stateTransitions = new Map();
        this._initStateTransitions();
      }
      _initStateTransitions() {
        this._stateTransitions.set(GameState.READY, [ GameState.PLAYING ]);
        this._stateTransitions.set(GameState.PLAYING, [ GameState.CHECKING, GameState.GAME_OVER, GameState.GAME_WIN ]);
        this._stateTransitions.set(GameState.CHECKING, [ GameState.PLAYING, GameState.ELIMINATING, GameState.GAME_OVER, GameState.GAME_WIN ]);
        this._stateTransitions.set(GameState.ELIMINATING, [ GameState.DROPPING, GameState.GAME_OVER, GameState.GAME_WIN ]);
        this._stateTransitions.set(GameState.DROPPING, [ GameState.CHECKING, GameState.GAME_OVER, GameState.GAME_WIN ]);
        this._stateTransitions.set(GameState.GAME_OVER, [ GameState.READY ]);
        this._stateTransitions.set(GameState.GAME_WIN, [ GameState.READY ]);
      }
      get currentState() {
        return this._currentState;
      }
      canTransitionTo(toState) {
        const allowedStates = this._stateTransitions.get(this._currentState);
        return !!allowedStates && allowedStates.includes(toState);
      }
      changeState(newState, force = false) {
        if (this._currentState === newState) {
          console.warn(`[GameFsm] \u5df2\u7ecf\u5904\u4e8e\u72b6\u6001: ${newState}`);
          return false;
        }
        if (!force && !this.canTransitionTo(newState)) {
          console.warn(`[GameFsm] \u65e0\u6cd5\u4ece\u72b6\u6001 ${this._currentState} \u8f6c\u6362\u5230 ${newState}`);
          return false;
        }
        const oldState = this._currentState;
        this._currentState = newState;
        console.log(`[GameFsm] \u72b6\u6001\u8f6c\u6362: ${oldState} -> ${newState}`);
        this._notifyStateChange(oldState, newState);
        return true;
      }
      onStateChange(callback) {
        this._stateChangeCallbacks.includes(callback) || this._stateChangeCallbacks.push(callback);
      }
      offStateChange(callback) {
        const index = this._stateChangeCallbacks.indexOf(callback);
        -1 !== index && this._stateChangeCallbacks.splice(index, 1);
      }
      _notifyStateChange(fromState, toState) {
        this._stateChangeCallbacks.forEach(callback => {
          try {
            callback(fromState, toState);
          } catch (error) {
            console.error("[GameFsm] \u72b6\u6001\u53d8\u5316\u56de\u8c03\u6267\u884c\u9519\u8bef:", error);
          }
        });
      }
      isState(state) {
        return this._currentState === state;
      }
      isGameActive() {
        return this._currentState !== GameState.GAME_OVER && this._currentState !== GameState.GAME_WIN && this._currentState !== GameState.READY;
      }
      canPlayerOperate() {
        return this._currentState === GameState.PLAYING;
      }
      reset() {
        const oldState = this._currentState;
        this._currentState = GameState.READY;
        console.log(`[GameFsm] \u72b6\u6001\u673a\u91cd\u7f6e\u5230: ${GameState.READY}`);
        this._notifyStateChange(oldState, GameState.READY);
      }
      destroy() {
        this._stateChangeCallbacks = [];
        console.log("[GameFsm] \u72b6\u6001\u673a\u5df2\u9500\u6bc1");
      }
    }
    exports.default = GameFsm;
    cc._RF.pop();
  }, {} ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c02cw4FGRGB4JIbDeJ/JlD", "GameMgr");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayPanel_1 = require("./PlayPanel");
    const GameConst_1 = require("./GameConst");
    const TouchHandler_1 = require("./TouchHandler");
    const GameTypes_1 = require("./GameTypes");
    const GameUtils_1 = require("./common/GameUtils");
    const EliminateUtils_1 = require("./common/EliminateUtils");
    const GameUI_1 = require("./ui/GameUI");
    const EffectMgr_1 = require("./effects/EffectMgr");
    const AudioMgr_1 = require("../AudioMgr");
    const BlockMgr_1 = require("./block/BlockMgr");
    const GameFsm_1 = require("./common/GameFsm");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameMgr = class GameMgr extends cc.Component {
      constructor() {
        super(...arguments);
        this.playPanel = null;
        this.gameUI = null;
        this.touchHandler = null;
        this.blockMgr = null;
        this.effectMgr = null;
        this.audioMgr = null;
        this._selectedLocation = null;
        this._gameFsm = null;
        this._gameCheckInfo = null;
      }
      onLoad() {
        this._gameFsm = new GameFsm_1.default(GameFsm_1.GameState.READY);
        this._gameFsm.onStateChange(this.onStateChange.bind(this));
        this.touchHandler.node.on(GameConst_1.TOUCH_BLOCK_EVENT, this.onTouchEvent, this);
      }
      start() {
        this.audioMgr.playMusic();
      }
      initGamePanel(levelConfig) {
        this.playPanel.initGamePanel(levelConfig, this.blockMgr, this.effectMgr);
        this.gameUI.initGameUI(0, levelConfig.stepLimit);
        this._gameFsm.changeState(GameFsm_1.GameState.PLAYING);
      }
      onStateChange(fromState, toState) {
        switch (toState) {
         case GameFsm_1.GameState.READY:
          this.onReady();
          break;

         case GameFsm_1.GameState.PLAYING:
          this.onPlaying();
          break;

         case GameFsm_1.GameState.CHECKING:
          this.onChecking();
          break;

         case GameFsm_1.GameState.ELIMINATING:
          this.onEliminating();
          break;

         case GameFsm_1.GameState.DROPPING:
          this.onDropping();
          break;

         case GameFsm_1.GameState.GAME_OVER:
          this.onGameOver();
          break;

         case GameFsm_1.GameState.GAME_WIN:
          this.onGameWin();
        }
      }
      onTouchEvent(event) {
        if (!this._gameFsm.canPlayerOperate() || !this.gameUI.haveStepCount()) return;
        const {type: type, location: location} = event;
        type === TouchHandler_1.TouchDetailEventType.click ? this.onClickBlock(location) : type === TouchHandler_1.TouchDetailEventType.drag && this.onDragBlock(location, event.direction || GameConst_1.Direction.NONE);
      }
      onClickBlock(location) {
        if (!this._selectedLocation) {
          this._selectedLocation = location;
          return;
        }
        const isSameBlock = this._selectedLocation.row === location.row && this._selectedLocation.column === location.column;
        if (isSameBlock) {
          this._selectedLocation = null;
          return;
        }
        const isNeighbor = GameUtils_1.isNeighborLocation(this._selectedLocation, location);
        if (isNeighbor) {
          this.swapBlocks(this._selectedLocation, location);
          this._selectedLocation = null;
        } else this._selectedLocation = location;
      }
      onDragBlock(location, direction) {
        const swapLocation = GameUtils_1.getSwapLocation(location, direction);
        this.playPanel.isInBounds(swapLocation) && this.swapBlocks(swapLocation, location);
        this._selectedLocation = null;
      }
      swapBlocks(location1, location2) {
        this._gameCheckInfo = this.generatetBaseGameCheckInfo();
        this._gameCheckInfo.checkBlockEntry = [ location1, location2 ];
        const gameMapInfo = this._gameCheckInfo.gameMapInfo;
        const tempConfig = gameMapInfo[location2.row][location2.column];
        gameMapInfo[location2.row][location2.column] = gameMapInfo[location1.row][location1.column];
        gameMapInfo[location1.row][location1.column] = tempConfig;
        this._gameCheckInfo.swapBlocks = [ location1, location2 ];
        this.audioMgr.playSwapAudio();
        this._gameFsm.changeState(GameFsm_1.GameState.CHECKING);
      }
      onReady() {
        console.log("\u6e38\u620f\u72b6\u6001\u51c6\u5907\u5b8c\u6210");
      }
      onPlaying() {
        console.log("\u6e38\u620f\u72b6\u6001\u6e38\u73a9\u4e2d");
        this._gameCheckInfo = null;
        this.touchHandler.setEnabled(true);
      }
      onChecking() {
        this.touchHandler.setEnabled(false);
        const excludeLocations = [];
        for (const entry of this._gameCheckInfo.checkBlockEntry) {
          const contiguousLocations = this.playPanel.getContiguousBlocks(entry, this._gameCheckInfo.gameMapInfo, excludeLocations);
          if (contiguousLocations.length >= 3) {
            excludeLocations.push(...contiguousLocations);
            this._gameCheckInfo.canEliminateCheckInfos.push({
              entryLocation: entry,
              eliminateBlockType: GameTypes_1.BlockSpecialType.NONE,
              contiguousLocations: contiguousLocations
            });
          }
        }
        if (this._gameCheckInfo.swapBlocks) {
          const [location1, location2] = this._gameCheckInfo.swapBlocks;
          const blockConfig1 = this._gameCheckInfo.gameMapInfo[location1.row][location1.column];
          const blockConfig2 = this._gameCheckInfo.gameMapInfo[location2.row][location2.column];
          blockConfig1.special === GameTypes_1.BlockSpecialType.SPECIAL_BOOM && this._gameCheckInfo.canEliminateCheckInfos.push({
            entryLocation: location2,
            eliminateBlockType: GameTypes_1.BlockSpecialType.NONE,
            contiguousLocations: [ location1 ]
          });
          blockConfig2.special === GameTypes_1.BlockSpecialType.SPECIAL_BOOM && this._gameCheckInfo.canEliminateCheckInfos.push({
            entryLocation: location1,
            eliminateBlockType: GameTypes_1.BlockSpecialType.NONE,
            contiguousLocations: [ location2 ]
          });
        }
        if (this._gameCheckInfo.canEliminateCheckInfos.length > 0) {
          this._gameCheckInfo.swapBlocks && this.gameUI.decrementStepCount();
          this._gameFsm.changeState(GameFsm_1.GameState.ELIMINATING);
        } else if (this._gameCheckInfo.swapBlocks) {
          const [location1, location2] = this._gameCheckInfo.swapBlocks;
          this.playPanel.swapAndBackBlocks(location1, location2, () => {
            this._gameFsm.changeState(GameFsm_1.GameState.PLAYING);
          });
        } else this.checkGameOver();
      }
      onEliminating() {
        const alreadyEliminateBlocks = this._gameCheckInfo.canEliminateCheckInfos.reduce((acc, info) => acc.concat(info.contiguousLocations), []);
        for (const eliminateCheckInfo of this._gameCheckInfo.canEliminateCheckInfos) {
          EliminateUtils_1.specialBlockGenerator(eliminateCheckInfo, this._gameCheckInfo);
          EliminateUtils_1.releaseSpecialBlock(eliminateCheckInfo, alreadyEliminateBlocks, this._gameCheckInfo);
        }
        let score = 0;
        for (const eliminateCheckInfo of this._gameCheckInfo.canEliminateCheckInfos) {
          const blockCount = eliminateCheckInfo.contiguousLocations.length;
          score += GameTypes_1.EliminateScore.EliminateBlockScore * blockCount;
          switch (eliminateCheckInfo.eliminateBlockType) {
           case GameTypes_1.BlockSpecialType.ROW:
            score += GameTypes_1.EliminateScore.Base4RowScore;
            break;

           case GameTypes_1.BlockSpecialType.COLUMN:
            score += GameTypes_1.EliminateScore.Base4ColumnScore;
            break;

           case GameTypes_1.BlockSpecialType.BOOM:
            score += GameTypes_1.EliminateScore.Irregular5Score;
            break;

           case GameTypes_1.BlockSpecialType.SPECIAL_BOOM:
            score += GameTypes_1.EliminateScore.Base5Score;
          }
        }
        score *= this._gameCheckInfo.chainCount;
        this.gameUI.incrementScore(score);
        this.effectMgr.playComboAudio(this._gameCheckInfo.chainCount);
        this.playPanel.eliminateBlocks(this._gameCheckInfo, () => {
          this._gameFsm.changeState(GameFsm_1.GameState.DROPPING);
        });
      }
      onDropping() {
        this.playPanel.generateNewSpecialBlocks(this._gameCheckInfo);
        this.playPanel.dropRandomBlocks(entryList => {
          const baseGameCheckInfo = this.generatetBaseGameCheckInfo();
          baseGameCheckInfo.checkBlockEntry = entryList;
          baseGameCheckInfo.chainCount = this._gameCheckInfo.chainCount + 1;
          this._gameCheckInfo = baseGameCheckInfo;
          console.log("drop check: ", this._gameCheckInfo);
          this._gameFsm.changeState(GameFsm_1.GameState.CHECKING);
        });
      }
      onGameOver() {
        this.gameUI.showGameOverPanel();
        this.audioMgr.stopMusic();
        this.touchHandler.setEnabled(false);
      }
      onGameWin() {
        this.gameUI.showGameWinPanel();
        this.audioMgr.stopMusic();
        this.touchHandler.setEnabled(false);
      }
      checkGameOver() {
        const curScore = this.gameUI.getScore();
        const targetScore = this.playPanel.getLevelConfig().targetScore;
        if (curScore >= targetScore) this._gameFsm.changeState(GameFsm_1.GameState.GAME_WIN); else if (this.gameUI.haveStepCount()) {
          const {chainCount: chainCount} = this._gameCheckInfo;
          this.effectMgr.playCommentAudio(chainCount - 1);
          this._gameFsm.changeState(GameFsm_1.GameState.PLAYING);
        } else this._gameFsm.changeState(GameFsm_1.GameState.GAME_OVER);
      }
      backToLevelSelect() {
        cc.director.loadScene("LevelSelect");
      }
      generatetBaseGameCheckInfo() {
        const gameMapInfo = this.playPanel.getBlockMapInfo();
        const checkBlockEntry = [];
        const canEliminateBlocks = [];
        const eliminateScore = 0;
        const newSpecailBlocks = {};
        return {
          gameMapInfo: gameMapInfo,
          checkBlockEntry: checkBlockEntry,
          swapBlocks: null,
          chainCount: 1,
          canEliminateCheckInfos: canEliminateBlocks,
          eliminateScore: eliminateScore,
          newSpecailBlocks: newSpecailBlocks
        };
      }
      onDestroy() {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
      }
    };
    __decorate([ property(PlayPanel_1.default) ], GameMgr.prototype, "playPanel", void 0);
    __decorate([ property(GameUI_1.default) ], GameMgr.prototype, "gameUI", void 0);
    __decorate([ property(TouchHandler_1.default) ], GameMgr.prototype, "touchHandler", void 0);
    __decorate([ property(BlockMgr_1.default) ], GameMgr.prototype, "blockMgr", void 0);
    __decorate([ property(EffectMgr_1.default) ], GameMgr.prototype, "effectMgr", void 0);
    __decorate([ property(AudioMgr_1.default) ], GameMgr.prototype, "audioMgr", void 0);
    GameMgr = __decorate([ ccclass ], GameMgr);
    exports.default = GameMgr;
    cc._RF.pop();
  }, {
    "../AudioMgr": "AudioMgr",
    "./GameConst": "GameConst",
    "./GameTypes": "GameTypes",
    "./PlayPanel": "PlayPanel",
    "./TouchHandler": "TouchHandler",
    "./block/BlockMgr": "BlockMgr",
    "./common/EliminateUtils": "EliminateUtils",
    "./common/GameFsm": "GameFsm",
    "./common/GameUtils": "GameUtils",
    "./effects/EffectMgr": "EffectMgr",
    "./ui/GameUI": "GameUI"
  } ],
  GameSetting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8db45p9tGtFdJ6odCIkAXoi", "GameSetting");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const const_1 = require("./const");
    const Utils_1 = require("./Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameSetting = class GameSetting extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgmVolumeCrl = null;
        this.effectVolumeCrl = null;
        this._config = {
          bgmVolume: 1,
          effectVolume: 1
        };
      }
      start() {
        this._config = Utils_1.getLocalData(const_1.UserSettingItemName);
        this.bgmVolumeCrl.progress = this._config.bgmVolume;
        this.effectVolumeCrl.progress = this._config.effectVolume;
        this.bindEvents();
      }
      bindEvents() {
        this.bgmVolumeCrl.node.on("slide", this.onBgmVolumeChange, this);
        this.effectVolumeCrl.node.on("slide", this.onEffectVolumeChange, this);
      }
      onBgmVolumeChange(slider) {
        this._config.bgmVolume = slider.progress;
        Utils_1.setLocalData(const_1.UserSettingItemName, this._config);
        cc.audioEngine.setMusicVolume(this._config.bgmVolume);
      }
      onEffectVolumeChange(slider) {
        this._config.effectVolume = slider.progress;
        Utils_1.setLocalData(const_1.UserSettingItemName, this._config);
        cc.audioEngine.setEffectsVolume(this._config.effectVolume);
      }
    };
    __decorate([ property(cc.Slider) ], GameSetting.prototype, "bgmVolumeCrl", void 0);
    __decorate([ property(cc.Slider) ], GameSetting.prototype, "effectVolumeCrl", void 0);
    GameSetting = __decorate([ ccclass ], GameSetting);
    exports.default = GameSetting;
    cc._RF.pop();
  }, {
    "./Utils": "Utils",
    "./const": "const"
  } ],
  GameTypes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af7ddcT/VBBvp+fjpoDy5EO", "GameTypes");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EliminateScore = exports.EliminateType = exports.BlockSpecialType = exports.BlockType = void 0;
    var BlockType;
    (function(BlockType) {
      BlockType[BlockType["BLOCK_TYPE_1"] = 1] = "BLOCK_TYPE_1";
      BlockType[BlockType["BLOCK_TYPE_2"] = 2] = "BLOCK_TYPE_2";
      BlockType[BlockType["BLOCK_TYPE_3"] = 3] = "BLOCK_TYPE_3";
      BlockType[BlockType["BLOCK_TYPE_4"] = 4] = "BLOCK_TYPE_4";
      BlockType[BlockType["BLOCK_TYPE_5"] = 5] = "BLOCK_TYPE_5";
    })(BlockType = exports.BlockType || (exports.BlockType = {}));
    var BlockSpecialType;
    (function(BlockSpecialType) {
      BlockSpecialType["NONE"] = "none";
      BlockSpecialType["ROW"] = "row";
      BlockSpecialType["COLUMN"] = "column";
      BlockSpecialType["BOOM"] = "boom";
      BlockSpecialType["SPECIAL_BOOM"] = "special_boom";
    })(BlockSpecialType = exports.BlockSpecialType || (exports.BlockSpecialType = {}));
    var EliminateType;
    (function(EliminateType) {
      EliminateType["BASE_3"] = "base_3";
      EliminateType["BASE_4_ROW"] = "base_4_row";
      EliminateType["BASE_4_COLUMN"] = "base_4_column";
      EliminateType["BASE_5"] = "base_5";
      EliminateType["IRREGULAR_5"] = "irregular_5";
    })(EliminateType = exports.EliminateType || (exports.EliminateType = {}));
    var EliminateScore;
    (function(EliminateScore) {
      EliminateScore[EliminateScore["EliminateBlockScore"] = 10] = "EliminateBlockScore";
      EliminateScore[EliminateScore["Base4RowScore"] = 50] = "Base4RowScore";
      EliminateScore[EliminateScore["Base4ColumnScore"] = 50] = "Base4ColumnScore";
      EliminateScore[EliminateScore["Base5Score"] = 200] = "Base5Score";
      EliminateScore[EliminateScore["Irregular5Score"] = 100] = "Irregular5Score";
    })(EliminateScore = exports.EliminateScore || (exports.EliminateScore = {}));
    cc._RF.pop();
  }, {} ],
  GameUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e8d5d3E5EFNgoBEGUgk4bqf", "GameUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameUI = class GameUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.scoreLabel = null;
        this.stepCountLabel = null;
        this.gameOverPanel = null;
        this.gameWinPanel = null;
        this._score = 0;
        this._stepCount = 0;
      }
      initGameUI(score, stepCount) {
        this._score = score;
        this._stepCount = stepCount;
        this.scoreLabel.string = this._score.toString();
        this.stepCountLabel.string = this._stepCount.toString();
      }
      setScore(score) {
        this.scoreLabel.string = score.toString();
      }
      setStepCount(stepCount) {
        this.stepCountLabel.string = stepCount.toString();
      }
      decrementStepCount() {
        this._stepCount--;
        this.stepCountLabel.string = this._stepCount.toString();
      }
      incrementScore(score) {
        this._score += score;
        this.scoreLabel.string = this._score.toString();
      }
      haveStepCount() {
        return this._stepCount > 0;
      }
      getScore() {
        return this._score;
      }
      showGameOverPanel() {
        this.gameOverPanel.active = true;
      }
      showGameWinPanel() {
        this.gameWinPanel.active = true;
      }
    };
    __decorate([ property(cc.Label) ], GameUI.prototype, "scoreLabel", void 0);
    __decorate([ property(cc.Label) ], GameUI.prototype, "stepCountLabel", void 0);
    __decorate([ property(cc.Node) ], GameUI.prototype, "gameOverPanel", void 0);
    __decorate([ property(cc.Node) ], GameUI.prototype, "gameWinPanel", void 0);
    GameUI = __decorate([ ccclass ], GameUI);
    exports.default = GameUI;
    cc._RF.pop();
  }, {} ],
  GameUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f37beS03lEQbYYCdX32yi0", "GameUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getRandomBlockConfig = exports.getSwapLocation = exports.isNeighborLocation = exports.getNeighborLocations = exports.getDirection = exports.isLocationEqual = void 0;
    const GameConst_1 = require("../GameConst");
    const GameTypes_1 = require("../GameTypes");
    const DirectionList = [ GameConst_1.Direction.UP, GameConst_1.Direction.DOWN, GameConst_1.Direction.LEFT, GameConst_1.Direction.RIGHT ];
    function isLocationEqual(location1, location2) {
      return location1.row === location2.row && location1.column === location2.column;
    }
    exports.isLocationEqual = isLocationEqual;
    function getDirection(delta) {
      let minAngle = Infinity;
      let minDirection = GameConst_1.Direction.NONE;
      for (const direction of DirectionList) {
        const dirVec = GameConst_1.DirectionVector[direction];
        const angle = delta.normalize().angle(dirVec);
        if (angle < minAngle) {
          minAngle = angle;
          minDirection = direction;
        }
      }
      return minDirection;
    }
    exports.getDirection = getDirection;
    function getNeighborLocations(location) {
      return [ {
        row: location.row - 1,
        column: location.column
      }, {
        row: location.row + 1,
        column: location.column
      }, {
        row: location.row,
        column: location.column - 1
      }, {
        row: location.row,
        column: location.column + 1
      } ];
    }
    exports.getNeighborLocations = getNeighborLocations;
    function isNeighborLocation(location1, location2) {
      if (location1.row === location2.row) return 1 === Math.abs(location1.column - location2.column);
      if (location1.column === location2.column) return 1 === Math.abs(location1.row - location2.row);
      return false;
    }
    exports.isNeighborLocation = isNeighborLocation;
    function getSwapLocation(location, direction) {
      if (direction === GameConst_1.Direction.NONE) return location;
      const directionVector = GameConst_1.DirectionVector[direction];
      return {
        row: location.row + directionVector.y,
        column: location.column + directionVector.x
      };
    }
    exports.getSwapLocation = getSwapLocation;
    function getRandomBlockConfig() {
      const blockConfigs = [ {
        type: GameTypes_1.BlockType.BLOCK_TYPE_1,
        special: GameTypes_1.BlockSpecialType.NONE
      }, {
        type: GameTypes_1.BlockType.BLOCK_TYPE_2,
        special: GameTypes_1.BlockSpecialType.NONE
      }, {
        type: GameTypes_1.BlockType.BLOCK_TYPE_3,
        special: GameTypes_1.BlockSpecialType.NONE
      }, {
        type: GameTypes_1.BlockType.BLOCK_TYPE_4,
        special: GameTypes_1.BlockSpecialType.NONE
      }, {
        type: GameTypes_1.BlockType.BLOCK_TYPE_5,
        special: GameTypes_1.BlockSpecialType.NONE
      } ];
      return blockConfigs[Math.floor(Math.random() * blockConfigs.length)];
    }
    exports.getRandomBlockConfig = getRandomBlockConfig;
    cc._RF.pop();
  }, {
    "../GameConst": "GameConst",
    "../GameTypes": "GameTypes"
  } ],
  Grid: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c4d0KLw/pIGYWbNi2f5qjI", "Grid");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseLocation = exports.stringifyLocation = void 0;
    const GameUtils_1 = require("./GameUtils");
    function stringifyLocation(row, column) {
      return `${row},${column}`;
    }
    exports.stringifyLocation = stringifyLocation;
    function parseLocation(location) {
      const [row, column] = location.split(",").map(Number);
      return {
        row: row,
        column: column
      };
    }
    exports.parseLocation = parseLocation;
    class Grid {
      constructor(width, height, cellSize, cellSpacing) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cellSpacing = cellSpacing;
        this.data = new Array(height).fill(null).map(() => new Array(width).fill(null));
      }
      getWidth() {
        return this.width;
      }
      getHeight() {
        return this.height;
      }
      getData() {
        return this.data;
      }
      setData(data) {
        this.data = data;
      }
      getCell({row: row, column: column}) {
        return this.data[row][column];
      }
      setCell({row: row, column: column}, data) {
        this.data[row][column] = data;
      }
      getCellPosition({row: row, column: column}) {
        const x = column * (this.cellSize.width + this.cellSpacing) + this.cellSize.width / 2;
        const y = row * (this.cellSize.height + this.cellSpacing) + this.cellSize.height / 2;
        return new cc.Vec2(x, y);
      }
      getTouchedLocation(position) {
        const row = Math.floor(position.y / (this.cellSize.height + this.cellSpacing));
        const column = Math.floor(position.x / (this.cellSize.width + this.cellSpacing));
        return this.isInBounds({
          row: row,
          column: column
        }) ? {
          row: row,
          column: column
        } : null;
      }
      isInBounds({row: row, column: column}) {
        return column >= 0 && column < this.width && row >= 0 && row < this.height;
      }
      getNeighbors({row: row, column: column}) {
        const neighborLocations = GameUtils_1.getNeighborLocations({
          row: row,
          column: column
        });
        return neighborLocations.reduce((neighbors, neighborLocation) => {
          this.isInBounds(neighborLocation) && neighbors.push(this.getCell(neighborLocation));
          return neighbors;
        }, new Array());
      }
      getNeighborsLocations({row: row, column: column}) {
        const neighborLocations = GameUtils_1.getNeighborLocations({
          row: row,
          column: column
        });
        return neighborLocations.filter(neighborLocation => this.isInBounds(neighborLocation));
      }
      getGridSize() {
        const {width: width, height: height} = this.cellSize;
        const totalWidth = width * this.width + this.cellSpacing * (this.width - 1);
        const totalHeight = height * this.height + this.cellSpacing * (this.height - 1);
        return new cc.Size(totalWidth, totalHeight);
      }
      clear() {
        this.data = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null));
      }
    }
    exports.default = Grid;
    cc._RF.pop();
  }, {
    "./GameUtils": "GameUtils"
  } ],
  LevelBtn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f17d5ylaJdMV6RCIQiA9KAa", "LevelBtn");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property, requireComponent: requireComponent} = cc._decorator;
    let LevelBtn = class LevelBtn extends cc.Component {
      constructor() {
        super(...arguments);
        this.levelInfo = null;
      }
      getLevelInfo() {
        return this.levelInfo.json;
      }
    };
    __decorate([ property(cc.JsonAsset) ], LevelBtn.prototype, "levelInfo", void 0);
    LevelBtn = __decorate([ ccclass, requireComponent(cc.Button) ], LevelBtn);
    exports.default = LevelBtn;
    cc._RF.pop();
  }, {} ],
  LevelMenu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f85c1f1NnhGUKKyEHy60ry2", "LevelMenu");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AudioMgr_1 = require("../AudioMgr");
    const GameMgr_1 = require("../gamePlay/GameMgr");
    const LevelBtn_1 = require("./LevelBtn");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LevelSelect = class LevelSelect extends cc.Component {
      constructor() {
        super(...arguments);
        this.audioMgr = null;
      }
      start() {
        this.audioMgr.playMusic();
      }
      onEntryLevel(event) {
        const target = event.target;
        const levelBtn = target.getComponent(LevelBtn_1.default);
        if (!levelBtn) return;
        const levelConfig = levelBtn.getLevelInfo();
        this.runGame(levelConfig);
      }
      runGame(levelConfig) {
        const onLaunched = (err, scene) => {
          if (err) console.error(err); else {
            const gameMgr = scene.getComponentInChildren(GameMgr_1.default);
            gameMgr.initGamePanel(levelConfig);
          }
        };
        cc.director.loadScene("Game", onLaunched);
      }
      backToMenu() {
        cc.director.loadScene("Menu");
      }
      onDestroy() {
        this.audioMgr.stopMusic();
      }
    };
    __decorate([ property(AudioMgr_1.default) ], LevelSelect.prototype, "audioMgr", void 0);
    LevelSelect = __decorate([ ccclass ], LevelSelect);
    exports.default = LevelSelect;
    cc._RF.pop();
  }, {
    "../AudioMgr": "AudioMgr",
    "../gamePlay/GameMgr": "GameMgr",
    "./LevelBtn": "LevelBtn"
  } ],
  LevelView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6d658SppBJl7QlmBx0y081", "LevelView");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const const_1 = require("../const");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LevelView = class LevelView extends cc.Component {
      onLoad() {
        this.node.on(const_1.EntryLevelEvent, this.onEntryLevel, this);
      }
      onEntryLevel(levelInfo) {
        console.log(levelInfo);
      }
      onDestroy() {
        this.node.off(const_1.EntryLevelEvent, this.onEntryLevel, this);
      }
    };
    LevelView = __decorate([ ccclass ], LevelView);
    exports.default = LevelView;
    cc._RF.pop();
  }, {
    "../const": "const"
  } ],
  Menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35749JAclxLhpQ1YbuhyrAn", "Menu");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AudioMgr_1 = require("./AudioMgr");
    const const_1 = require("./const");
    const GameSetting_1 = require("./GameSetting");
    const Utils_1 = require("./Utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Menu = class Menu extends cc.Component {
      constructor() {
        super(...arguments);
        this.audioMgr = null;
        this.gameSetting = null;
      }
      onLoad() {
        const hasSettingData = Utils_1.HasLocalData(const_1.UserSettingItemName);
        hasSettingData || Utils_1.setLocalData(const_1.UserSettingItemName, {
          bgmVolume: 1,
          effectVolume: 1
        });
      }
      start() {
        this.audioMgr.playMusic();
      }
      chooseLevel() {
        cc.director.loadScene("LevelSelect");
      }
      showSetting() {
        this.gameSetting.node.active = true;
      }
      closeSetting() {
        this.gameSetting.node.active = false;
      }
      onDestroy() {
        this.audioMgr.stopMusic();
      }
    };
    __decorate([ property(AudioMgr_1.default) ], Menu.prototype, "audioMgr", void 0);
    __decorate([ property(GameSetting_1.default) ], Menu.prototype, "gameSetting", void 0);
    Menu = __decorate([ ccclass ], Menu);
    exports.default = Menu;
    cc._RF.pop();
  }, {
    "./AudioMgr": "AudioMgr",
    "./GameSetting": "GameSetting",
    "./Utils": "Utils",
    "./const": "const"
  } ],
  PlayPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72c79TFnwVJN7E6xajFitRz", "PlayPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const BaseBlock_1 = require("./block/BaseBlock");
    const Grid_1 = require("./common/Grid");
    const GameUtils_1 = require("./common/GameUtils");
    const GameTypes_1 = require("./GameTypes");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayPanel = class PlayPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.gridRootNode = null;
        this.rowCount = 6;
        this.columnCount = 8;
        this.cellWidth = 70;
        this.cellHeight = 70;
        this.cellSpacing = 2;
        this._grid = null;
        this._blockMgr = null;
        this._effectMgr = null;
        this._levelConfig = null;
        this._blockParentMap = new Map();
      }
      initGamePanel(levelConfig, blockMgr, effectMgr) {
        this._blockMgr = blockMgr;
        this._effectMgr = effectMgr;
        this._levelConfig = levelConfig;
        this.initGrid(levelConfig);
        this.initBlocks();
      }
      initGrid(levelConfig) {
        const {width: width, height: height} = levelConfig.gameMap;
        this._grid = new Grid_1.default(width, height, new cc.Size(this.cellWidth, this.cellHeight), this.cellSpacing);
        this.gridRootNode.setContentSize(this._grid.getGridSize());
        this.node.setContentSize(this._grid.getGridSize());
      }
      initBlocks() {
        const blockInfos = this._levelConfig.gameMap.blocks;
        const keys = Object.keys(blockInfos);
        for (const key of keys) {
          const {row: row, column: column} = Grid_1.parseLocation(key);
          const blockConfig = blockInfos[key];
          this.generateBlock({
            row: row,
            column: column
          }, blockConfig);
        }
      }
      getBlockParent(blockType) {
        let blockParent = this._blockParentMap.get(blockType);
        if (!blockParent) {
          blockParent = new cc.Node(`block_parent_${blockType}`);
          this._blockParentMap.set(blockType, blockParent);
          this.gridRootNode.addChild(blockParent);
        }
        return blockParent;
      }
      getBlockByLocation(location) {
        if (this._grid.isInBounds(location)) return this._grid.getCell(location);
        return null;
      }
      getBlockByPosition(position) {
        const location = this._grid.getTouchedLocation(position);
        return location ? this.getBlockByLocation(location) : null;
      }
      getLocationByPosition(position) {
        return this._grid.getTouchedLocation(position);
      }
      getContiguousBlocks(location, mapInfo, excludeLocations) {
        if (excludeLocations.some(excludeLocation => GameUtils_1.isLocationEqual(excludeLocation, location))) return [];
        const contiguousLocations = [];
        const queue = [ location ];
        const typeIsSame = (location1, location2) => {
          const config1 = mapInfo[location1.row][location1.column];
          const config2 = mapInfo[location2.row][location2.column];
          return config1.type === config2.type && config1.special !== GameTypes_1.BlockSpecialType.SPECIAL_BOOM && config2.special !== GameTypes_1.BlockSpecialType.SPECIAL_BOOM;
        };
        const hasContiguous = location1 => contiguousLocations.some(location2 => GameUtils_1.isLocationEqual(location1, location2));
        const hasExclude = location1 => excludeLocations.some(excludeLocation => GameUtils_1.isLocationEqual(location1, excludeLocation));
        const inQueue = location1 => queue.some(location2 => GameUtils_1.isLocationEqual(location1, location2));
        while (queue.length > 0) {
          const currentLocation = queue.shift();
          contiguousLocations.push(currentLocation);
          const neighborsLocations = this._grid.getNeighborsLocations(currentLocation);
          for (const neighborLocation of neighborsLocations) !typeIsSame(currentLocation, neighborLocation) || hasContiguous(neighborLocation) || hasExclude(neighborLocation) || inQueue(neighborLocation) || queue.push(neighborLocation);
        }
        const rowList = contiguousLocations.map(location => location.row);
        const columnList = contiguousLocations.map(location => location.column);
        const rowSet = new Set(rowList);
        const columnSet = new Set(columnList);
        const validContiguousLocations = [];
        rowSet.forEach(row => {
          const rowLocations = contiguousLocations.filter(location => location.row === row);
          rowLocations.length >= 3 && validContiguousLocations.push(...rowLocations);
        });
        columnSet.forEach(column => {
          const columnLocations = contiguousLocations.filter(location => location.column === column);
          columnLocations.length >= 3 && validContiguousLocations.push(...columnLocations);
        });
        return [ ...new Set(validContiguousLocations) ];
      }
      eliminateBlocks(gameCheckInfo, cd) {
        const {swapBlocks: swapBlocks} = gameCheckInfo;
        if (swapBlocks) {
          const [location1, location2] = swapBlocks;
          const block1 = this.getBlockByLocation(location1);
          const block2 = this.getBlockByLocation(location2);
          this.swapBlocks(block1, block2, location1, location2, () => {
            this.eliminateHandler(gameCheckInfo, cd);
          });
        } else this.eliminateHandler(gameCheckInfo, cd);
      }
      eliminateHandler(gameCheckInfo, cd) {
        const {canEliminateCheckInfos: canEliminateCheckInfos} = gameCheckInfo;
        for (const eliminateCheckInfo of canEliminateCheckInfos) {
          const {contiguousLocations: contiguousLocations} = eliminateCheckInfo;
          for (const location of contiguousLocations) {
            const block = this.getBlockByLocation(location);
            this.putBlock(block, location);
          }
        }
        this._effectMgr.effectHandler(this._grid, gameCheckInfo, cd);
      }
      putBlock(block, location) {
        this._grid.setCell(location, null);
        this._blockMgr.putBlock(block);
      }
      swapBlocks(block1, block2, location1, location2, cd) {
        this._grid.setCell(location1, block2);
        this._grid.setCell(location2, block1);
        const pos1 = this._grid.getCellPosition(location1);
        const pos2 = this._grid.getCellPosition(location2);
        let step = 0;
        const actionCd = () => {
          step++;
          2 === step && cd();
        };
        const nodeActionSeq1 = cc.sequence(cc.moveTo(.3, pos2), cc.callFunc(actionCd));
        const nodeActionSeq2 = cc.sequence(cc.moveTo(.3, pos1), cc.callFunc(actionCd));
        block1.node.runAction(nodeActionSeq1);
        block2.node.runAction(nodeActionSeq2);
      }
      swapAndBackBlocks(location1, location2, cd) {
        const block1 = this.getBlockByLocation(location1);
        const block2 = this.getBlockByLocation(location2);
        const pos1 = this._grid.getCellPosition(location1);
        const pos2 = this._grid.getCellPosition(location2);
        let step = 0;
        const actionCd = () => {
          step++;
          2 === step && cd();
        };
        cc.tween(block1.node).sequence(cc.moveTo(.3, pos2), cc.moveTo(.3, pos1), cc.callFunc(actionCd)).start();
        cc.tween(block2.node).sequence(cc.moveTo(.3, pos1), cc.moveTo(.3, pos2), cc.callFunc(actionCd)).start();
      }
      dropRandomBlocks(cd) {
        const emptyList = {};
        const data = this._grid.getData();
        for (let row = 0; row < data.length; row++) {
          const rowData = data[row];
          for (let column = 0; column < rowData.length; column++) {
            const cell = rowData[column];
            if (null === cell) {
              emptyList[column] || (emptyList[column] = []);
              emptyList[column].push({
                row: row,
                column: column
              });
            }
          }
        }
        const entryList = [];
        const blockDropInfos = [];
        for (const columnKey in emptyList) {
          const column = Number(columnKey);
          const columnList = emptyList[column];
          let startDropRow = columnList[0].row;
          for (let row = startDropRow + 1; row < data.length; row++) {
            const cell = data[row][column];
            if (!cell) continue;
            const targetLocation = {
              row: startDropRow++,
              column: column
            };
            entryList.push(targetLocation);
            blockDropInfos.push({
              location: {
                row: row,
                column: column
              },
              block: cell,
              dropTime: .3,
              targetDropLocation: targetLocation
            });
            this._grid.setCell({
              row: row,
              column: column
            }, null);
            this._grid.setCell(targetLocation, cell);
          }
          let startGenerateRow = data.length;
          for (let row = startGenerateRow; row < startGenerateRow + columnList.length; row++) {
            const targetLocation = {
              row: startDropRow++,
              column: column
            };
            entryList.push(targetLocation);
            const randomBlockConfig = GameUtils_1.getRandomBlockConfig();
            const block = this.generateBlock(targetLocation, randomBlockConfig, this._grid.getCellPosition({
              row: row,
              column: column
            }));
            blockDropInfos.push({
              location: targetLocation,
              block: block,
              dropTime: .3,
              targetDropLocation: targetLocation
            });
          }
        }
        let step = 0;
        const actionCd = () => {
          step++;
          step === blockDropInfos.length && cd(entryList);
        };
        for (const blockDropInfo of blockDropInfos) {
          const {block: block, dropTime: dropTime, targetDropLocation: targetDropLocation} = blockDropInfo;
          const targetPos = this._grid.getCellPosition(targetDropLocation);
          cc.tween(block.node).sequence(cc.moveTo(dropTime, targetPos), cc.callFunc(actionCd)).start();
        }
      }
      generateNewSpecialBlocks(gameCheckInfo) {
        const {newSpecailBlocks: newSpecailBlocks} = gameCheckInfo;
        const keys = Object.keys(newSpecailBlocks);
        for (const key of keys) {
          const location = Grid_1.parseLocation(key);
          const isEmpty = null === this._grid.getCell(location);
          if (isEmpty) {
            const blockConfig = newSpecailBlocks[key];
            this.generateBlock(location, blockConfig);
          }
        }
      }
      generateBlock(location, blockConfig, initPos) {
        const blockParent = this.getBlockParent(blockConfig.type);
        const block = this._blockMgr.getBlock(blockConfig, blockParent);
        this._grid.setCell(location, block);
        block.node.setPosition(initPos || this._grid.getCellPosition(location));
        return block;
      }
      getBlockMapInfo() {
        return this._grid.getData().map(row => row.map(block => block && block.getConfig()));
      }
      isInBounds(location) {
        return this._grid.isInBounds(location);
      }
      getLevelConfig() {
        return this._levelConfig;
      }
      getAllBlock() {
        const blockList = this.gridRootNode.getComponentsInChildren(BaseBlock_1.default);
        return blockList;
      }
    };
    __decorate([ property(cc.Node) ], PlayPanel.prototype, "gridRootNode", void 0);
    __decorate([ property({
      displayName: "\u7f51\u683c\u884c\u6570",
      min: 1,
      step: 1
    }) ], PlayPanel.prototype, "rowCount", void 0);
    __decorate([ property({
      displayName: "\u7f51\u683c\u5217\u6570",
      min: 1,
      step: 1
    }) ], PlayPanel.prototype, "columnCount", void 0);
    __decorate([ property({
      displayName: "\u7f51\u683c\u5355\u4f4d\u5bbd\u5ea6"
    }) ], PlayPanel.prototype, "cellWidth", void 0);
    __decorate([ property({
      displayName: "\u7f51\u683c\u5355\u4f4d\u9ad8\u5ea6"
    }) ], PlayPanel.prototype, "cellHeight", void 0);
    __decorate([ property({
      displayName: "\u7f51\u683c\u5355\u4f4d\u95f4\u8ddd"
    }) ], PlayPanel.prototype, "cellSpacing", void 0);
    PlayPanel = __decorate([ ccclass ], PlayPanel);
    exports.default = PlayPanel;
    cc._RF.pop();
  }, {
    "./GameTypes": "GameTypes",
    "./block/BaseBlock": "BaseBlock",
    "./common/GameUtils": "GameUtils",
    "./common/Grid": "Grid"
  } ],
  SpineProperty: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bf0b1n5fJtCup7qyvYlancw", "SpineProperty");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SpineProperty = class SpineProperty {
      constructor() {
        this.skeletonData = null;
        this.animation = "";
        this.isLoop = true;
      }
    };
    __decorate([ property({
      type: sp.SkeletonData
    }) ], SpineProperty.prototype, "skeletonData", void 0);
    __decorate([ property() ], SpineProperty.prototype, "animation", void 0);
    __decorate([ property() ], SpineProperty.prototype, "isLoop", void 0);
    SpineProperty = __decorate([ ccclass("SpineProperty") ], SpineProperty);
    exports.default = SpineProperty;
    cc._RF.pop();
  }, {} ],
  SpineUtils: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "7d5e6y8o6ZAEIJyyApdsvNe", "SpineUtils");
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.updateAnimationEnum = exports.DefaultAnimationsEnum = void 0;
      exports.DefaultAnimationsEnum = cc.Enum({
        "<None>": 0
      });
      function setEnumAttr(obj, propName, enumDef) {
        true;
        return;
      }
      function refreshEditor(enumArray, node) {
        true;
        return;
      }
      function updateAnimationEnum(spineComp, context, propName) {
        true;
        return;
      }
      exports.updateAnimationEnum = updateAnimationEnum;
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  TouchHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8410exNREhD+rUlI1pgwF8x", "TouchHandler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TouchDetailEventType = void 0;
    const GameConst_1 = require("./GameConst");
    const GameUtils_1 = require("./common/GameUtils");
    const PlayPanel_1 = require("./PlayPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var TouchDetailEventType;
    (function(TouchDetailEventType) {
      TouchDetailEventType[TouchDetailEventType["click"] = 0] = "click";
      TouchDetailEventType[TouchDetailEventType["drag"] = 1] = "drag";
    })(TouchDetailEventType = exports.TouchDetailEventType || (exports.TouchDetailEventType = {}));
    let TouchHandler = class TouchHandler extends cc.Component {
      constructor() {
        super(...arguments);
        this.target = null;
        this.playPanel = null;
        this._isEnabled = true;
        this._isDragging = false;
        this._hasEmitEvent = false;
        this._startPos = null;
      }
      onLoad() {
        this.initTouchEvents();
      }
      initTouchEvents() {
        this.target.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      }
      onTouchStart(e) {
        if (!this._isEnabled) return;
        this._isDragging = false;
        this._hasEmitEvent = false;
        const pos = this.target.convertToNodeSpaceAR(e.getLocation());
        this._startPos = pos;
      }
      onTouchMove(e) {
        if (!this._isEnabled) return;
        const pos = this.target.convertToNodeSpaceAR(e.getLocation());
        const delta = pos.sub(this._startPos);
        const direction = this.getDirection(delta);
        if (direction === GameConst_1.Direction.NONE) return;
        this._isDragging = true;
        const location = this.playPanel.getLocationByPosition(pos);
        if (!this._hasEmitEvent) {
          this.node.emit(GameConst_1.TOUCH_BLOCK_EVENT, {
            type: TouchDetailEventType.drag,
            location: location,
            direction: direction
          });
          this._hasEmitEvent = true;
        }
      }
      onTouchEnd(e) {
        if (!this._isEnabled) return;
        if (!this._isDragging && !this._hasEmitEvent) {
          const pos = this.target.convertToNodeSpaceAR(e.getLocation());
          const location = this.playPanel.getLocationByPosition(pos);
          this.node.emit(GameConst_1.TOUCH_BLOCK_EVENT, {
            type: TouchDetailEventType.click,
            location: location
          });
          this._hasEmitEvent = true;
        }
        this._isDragging = false;
        this._startPos = null;
      }
      getDirection(delta, threshold = 10) {
        const absDelta = delta.mag();
        if (absDelta < threshold) return GameConst_1.Direction.NONE;
        return GameUtils_1.getDirection(delta);
      }
      setEnabled(enabled) {
        this._isEnabled = enabled;
      }
      onDestroy() {
        this.target.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.target.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.target.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      }
    };
    __decorate([ property(cc.Node) ], TouchHandler.prototype, "target", void 0);
    __decorate([ property(PlayPanel_1.default) ], TouchHandler.prototype, "playPanel", void 0);
    TouchHandler = __decorate([ ccclass ], TouchHandler);
    exports.default = TouchHandler;
    cc._RF.pop();
  }, {
    "./GameConst": "GameConst",
    "./PlayPanel": "PlayPanel",
    "./common/GameUtils": "GameUtils"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c766HSbEhDWbQm3mx+/R2d", "Utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setLocalData = exports.getLocalData = exports.HasLocalData = void 0;
    function HasLocalData(name) {
      const str = cc.sys.localStorage.getItem(name);
      return "[object Object]" !== str;
    }
    exports.HasLocalData = HasLocalData;
    function getLocalData(name) {
      const str = cc.sys.localStorage.getItem(name);
      return JSON.parse(str);
    }
    exports.getLocalData = getLocalData;
    function setLocalData(name, obj) {
      cc.sys.localStorage.setItem(name, JSON.stringify(obj));
    }
    exports.setLocalData = setLocalData;
    cc._RF.pop();
  }, {} ],
  const: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1275eaBAoJDPLtM9f9YYYm7", "const");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EntryLevelEvent = exports.UserSettingItemName = void 0;
    exports.UserSettingItemName = "UserSetting";
    exports.EntryLevelEvent = "EntryLevelEvent";
    cc._RF.pop();
  }, {} ]
}, {}, [ "AudioMgr", "GameSetting", "Menu", "Utils", "const", "GameConst", "GameMgr", "GameTypes", "PlayPanel", "TouchHandler", "BaseBlock", "BlockMgr", "BlockStyleProperty", "EliminateUtils", "GameFsm", "GameUtils", "Grid", "SpineProperty", "SpineUtils", "BaseEffect", "EffectMgr", "GameFinPanel", "GameUI", "LevelBtn", "LevelMenu", "LevelView", "ConfigTypes" ]);