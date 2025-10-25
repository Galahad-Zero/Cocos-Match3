"use strict";
cc._RF.push(module, 'b1c16c/5+hHE55RtPKz28tU', 'HotUpdateMgr');
// Script/HotUpdateMgr.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HotUpdatePanel_1 = require("./HotUpdatePanel");
const { ccclass, property } = cc._decorator;
/**
 * 版本号比较函数
 * @param versionA 版本号A
 * @param versionB 版本号B
 * @returns 如果版本号A大于版本号B, 返回1; 如果版本号A小于版本号B, 返回-1; 如果版本号A等于版本号B, 返回0
 */
function versionCompareHandle(versionA, versionB) {
    cc.log('热更新版本号比较: version A is ' +
        versionA +
        ', version B is ' +
        versionB);
    const vA = versionA.split('.');
    const vB = versionB.split('.');
    for (let i = 0; i < vA.length; ++i) {
        const a = parseInt(vA[i]);
        const b = parseInt(vB[i] || '0');
        if (a === b) {
            continue;
        }
        else {
            return a - b;
        }
    }
    if (vB.length > vA.length) {
        return -1;
    }
    else {
        return 0;
    }
}
let HotUpdateMgr = class HotUpdateMgr extends cc.Component {
    constructor() {
        super(...arguments);
        this.manifestUrl = null;
        this.hotUpdatePanel = null;
        // 热更新资源管理器
        this._am = null;
        // 热更新资源存储路径
        this._storagePath = '';
        // 是否正在更新
        this._updating = false;
        // 是否可以重试
        this._canRetry = false;
        // 失败次数
        this._failCount = 0;
    }
    /**
     * 加载, 初始化热更新资源管理器
     */
    onLoad() {
        if (!cc.sys.isNative) {
            this.hotUpdatePanel.node.active = false;
            return;
        }
        // 获取存储路径, 用于存储热更新资源
        this._storagePath =
            (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') +
                'match-3-remote-asset';
        cc.log('热更新资源存储路径: ' + this._storagePath);
        // 初始化热更新资源管理器
        this._am = new jsb.AssetsManager('', this._storagePath, versionCompareHandle);
        // 设置验证回调，用于验证资源是否下载正确
        this._am.setVerifyCallback((path, asset) => {
            // 是否是压缩文件
            const compressed = asset.compressed;
            // md5值
            const expectedMD5 = asset.md5;
            // 相对路径
            const relativePath = asset.path;
            // 文件大小
            //const size = asset.size;
            if (compressed) {
                this.hotUpdatePanel.setInfo('验证通过: ' + relativePath);
                return true;
            }
            else {
                this.hotUpdatePanel.setInfo('验证通过: ' + relativePath + ' (' + expectedMD5 + ')');
                return true;
            }
        });
        this.hotUpdatePanel.setInfo('热更新准备就绪，请检查或直接更新。');
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // 某些Android设备在并发任务过多时可能会降低下载速度。
            // 该值可能不准确，请进行更多测试，找到最适合您的游戏的值。
            // 设置最大并发任务数为2
            this._am.setMaxConcurrentTask &&
                this._am.setMaxConcurrentTask(2);
            this.hotUpdatePanel.setInfo('最大并发任务数限制为2');
        }
        // 设置文件进度和字节进度
        this.hotUpdatePanel.setFileProgress(0);
        this.hotUpdatePanel.setByteProgress(0);
    }
    checkCb(event) {
        cc.log('热更新检查回调 Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                // 没有找到本地清单文件，热更新跳过
                this.hotUpdatePanel.setInfo('没有找到本地清单文件，热更新跳过...');
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                // 下载清单文件失败，热更新跳过
                this.hotUpdatePanel.setInfo('下载清单文件失败，热更新跳过...');
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                // 解析清单文件失败，热更新跳过
                this.hotUpdatePanel.setInfo('解析清单文件失败，热更新跳过...');
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                // 已经是最新版本，热更新跳过
                this.hotUpdatePanel.setInfo('已经是最新版本，热更新跳过...');
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                // 发现新版本，请尝试更新
                this.hotUpdatePanel.setInfo('发现新版本，请尝试更新... (总字节数: ' +
                    this._am.getTotalBytes() +
                    'bytes)');
                // 设置检查按钮为不可用
                this.hotUpdatePanel.setCheckBtnActive(false);
                // 设置文件进度为0
                this.hotUpdatePanel.setFileProgress(0);
                // 设置字节进度为0
                this.hotUpdatePanel.setByteProgress(0);
                break;
            default:
                return;
        }
        // 设置事件回调为空
        this._am.setEventCallback(null);
        // 设置正在更新状态为false
        this._updating = false;
    }
    /**
     * 检查更新
     */
    checkUpdate() {
        if (this._updating) {
            this.hotUpdatePanel.setInfo('正在检查或更新...');
            return;
        }
        // 如果资源管理器未初始化，则加载本地清单
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // 解析md5 url
            let url = this.manifestUrl.nativeUrl;
            if (cc.loader.md5Pipe) {
                // 使用md5管道转换url
                url = cc.loader.md5Pipe.transformURL(url);
            }
            // 加载本地清单
            this._am.loadLocalManifest(url);
        }
        // 如果本地清单未加载或未加载完成，则返回
        if (!this._am.getLocalManifest() ||
            !this._am.getLocalManifest().isLoaded()) {
            this.hotUpdatePanel.setInfo('加载本地清单失败...');
            return;
        }
        // 设置事件回调
        this._am.setEventCallback(this.checkCb.bind(this));
        // 开始检查更新
        this._am.checkUpdate();
        // 设置正在更新状态为true
        this._updating = true;
    }
    updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.hotUpdatePanel.setInfo('没有找到本地清单文件，热更新跳过...');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                // 设置字节进度
                this.hotUpdatePanel.setByteProgress(event.getPercent());
                // 设置文件进度
                this.hotUpdatePanel.setFileProgress(event.getPercentByFile());
                // 设置文件标签: 已下载文件数 / 总文件数
                this.hotUpdatePanel.setFileLabel(event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                // 设置字节标签: 已下载字节数 / 总字节数
                this.hotUpdatePanel.setByteLabel(event.getDownloadedBytes() + ' / ' + event.getTotalBytes());
                // 设置信息: 更新文件
                var msg = event.getMessage();
                if (msg) {
                    this.hotUpdatePanel.setInfo('Updated file: ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                // 下载、解析清单文件失败，热更新跳过
                this.hotUpdatePanel.setInfo('下载、解析清单文件失败，热更新跳过...');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                // 已经是最新版本，热更新跳过
                this.hotUpdatePanel.setInfo('已经是最新版本，热更新跳过...');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                // 更新完成
                this.hotUpdatePanel.setInfo('更新完成... ' + event.getMessage());
                // 设置需要重启为true
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                // 更新失败
                this.hotUpdatePanel.setInfo('更新失败... ' + event.getMessage());
                // 设置重试按钮为可用
                this.hotUpdatePanel.setRetryBtnActive(true);
                // 设置正在更新状态为false
                this._updating = false;
                // 设置可以重试为true
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                // 资源更新错误
                this.hotUpdatePanel.setInfo('资源更新错误: ' +
                    event.getAssetId() +
                    ', ' +
                    event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                // 解压错误
                this.hotUpdatePanel.setInfo('解压错误: ' + event.getMessage());
                break;
            default:
                break;
        }
        if (failed) {
            // 设置事件回调为空
            this._am.setEventCallback(null);
            this._updating = false;
        }
        // 如果需要重启，则重启游戏
        if (needRestart) {
            // 设置事件回调为空
            this._am.setEventCallback(null);
            // 获取搜索路径
            var searchPaths = jsb.fileUtils.getSearchPaths();
            //它返回的是一个数组，数组中第一个元素永远是 storagePath，然后才是 manifest 中的 searchPaths 列表（都会跟 storagePath 拼接）
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            // 将新的搜索路径添加到搜索路径列表中
            for (var i = 0; i < newPaths.length; i++) {
                if (searchPaths.indexOf(newPaths[i]) == -1) {
                    Array.prototype.unshift.apply(searchPaths, [newPaths[i]]);
                }
            }
            // 将搜索路径列表保存到本地存储
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            // 设置搜索路径
            jsb.fileUtils.setSearchPaths(searchPaths);
            // 停止所有音频
            cc.audioEngine.stopAll();
            // 重启游戏
            cc.game.restart();
        }
    }
    /**
     * 热更新
     */
    hotUpdate() {
        if (this._am && !this._updating) {
            // 设置事件回调
            this._am.setEventCallback(this.updateCb.bind(this));
            // 如果资源管理器未初始化，则加载本地清单
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    // 使用md5管道转换url
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                // 加载本地清单
                this._am.loadLocalManifest(url);
            }
            // 重置失败次数
            this._failCount = 0;
            // 开始更新
            this._am.update();
            // 设置更新按钮为不可用
            this.hotUpdatePanel.setUpdateBtnActive(false);
            // 设置正在更新状态为true
            this._updating = true;
        }
    }
    retry() {
        if (!this._updating && this._canRetry) {
            this.hotUpdatePanel.setRetryBtnActive(false);
            this._canRetry = false;
            // 设置信息: 重试失败资源下载
            this.hotUpdatePanel.setInfo('重试失败资源下载...');
            this._am.downloadFailedAssets();
        }
    }
    showUpdateUI() {
        this.hotUpdatePanel.node.active = true;
    }
    onDestroy() {
        this._am && this._am.setEventCallback(null);
    }
};
__decorate([
    property(cc.Asset)
], HotUpdateMgr.prototype, "manifestUrl", void 0);
__decorate([
    property(HotUpdatePanel_1.default)
], HotUpdateMgr.prototype, "hotUpdatePanel", void 0);
HotUpdateMgr = __decorate([
    ccclass
], HotUpdateMgr);
exports.default = HotUpdateMgr;

cc._RF.pop();