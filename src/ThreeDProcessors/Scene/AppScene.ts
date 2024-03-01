import BaseAbstrcat from "../Abstract/BaseAbstrcat.ts";
import { BaseInterface } from "../interface/BaseInterface.ts";
import MainApp from "../MainApp.ts";
import { Scene, Color3, KeyboardEventTypes, PointerEventTypes, SceneRecorder, Database } from '@babylonjs/core'

class AppScene extends BaseAbstrcat<Scene> implements BaseInterface {
    detail: any = null
    constructor(maiApp: MainApp) {
        super(maiApp);
    }

    Initialize(): void {
        //这个地方这么写为了以后切换场景做扩展
        this.object = this.awakeScene()
        //开启缓存
        Database.IDBStorageEnabled = true
    }

    Update(): void {
    }
    Destroy(): void {
        this.object.dispose()
        this.detail = {}
    }

    /**
     *@description 初始化场景
     *@param {boolean} quickFlag = false - 快速构建标记，默认false
     *@param {boolean} interfact = false - 特殊交互事件标记,默认false
     *@param {boolean} recordFlag = false  - 是否记录场景操作
     * **/
    private awakeScene(quickFlag: boolean = false, interfact = false, recordFlag: boolean = false) {
        const scene = new Scene(this.mainApp.app_engine.object, {
            //使用唯一索引
            useGeometryUniqueIdsMap: true
        })
        if (quickFlag) {
            this.quicklyBuildScene(scene)
            return scene
        }
        if (interfact) {
            this.interfact()
        }
        if (recordFlag) {
            this.detail = this.recordScne(scene)
        }
        //设置背景颜色
        scene.clearColor.set(0, 0, 0, 0)
        //透明背景
        scene.autoClear = false
        //八叉树
        // scene.createOrUpdateSelectionOctree()
        //加载纹理后删除
        // scene.cleanCachedTextureBuffer()
        return scene
    }
    private quicklyBuildScene(scene: Scene) {
        scene.createDefaultCameraOrLight()
        const helper = this.object.createDefaultEnvironment({
            enableGroundMirror: true
        })
        //修改颜色
        helper?.setMainColor(Color3.Blue())
    }

    //交互事件
    private interfact() {
        //键盘交互
        this.object.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    console.log("KEY DOWN: ", kbInfo.event.key);
                    break;
                case KeyboardEventTypes.KEYUP:
                    console.log("KEY UP: ", kbInfo.event.code);
                    break;
            }
        });
        //指针交互
        this.object.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    console.log("POINTER DOWN");
                    break;
                case PointerEventTypes.POINTERUP:
                    console.log("POINTER UP");
                    break;
                case PointerEventTypes.POINTERMOVE:
                    console.log("POINTER MOVE");
                    break;
                case PointerEventTypes.POINTERWHEEL:
                    console.log("POINTER WHEEL");
                    break;
                case PointerEventTypes.POINTERPICK:
                    console.log("POINTER PICK");
                    break;
                case PointerEventTypes.POINTERTAP:
                    console.log("POINTER TAP");
                    break;
                case PointerEventTypes.POINTERDOUBLETAP:
                    console.log("POINTER DOUBLE-TAP");
                    break;
            }
        });
    }

    /**
     * @private
     * @description 记录场景操作
     * @param {Scene} scene - 场景
     * **/
    private recordScne(scene: Scene) {
        const record = new SceneRecorder()
        record.track(scene)
        const detail = record.getDelta()
        return detail
    }

}


export default AppScene