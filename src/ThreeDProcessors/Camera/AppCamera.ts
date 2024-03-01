import BaseAbstrcat from "../Abstract/BaseAbstrcat.ts";
import { ArcRotateCamera, Tools, Vector3 } from "@babylonjs/core";
import { BaseInterface } from "../interface/BaseInterface.ts";
import MainApp from "../MainApp.ts";

class AppCamera extends BaseAbstrcat<ArcRotateCamera> implements BaseInterface {

    constructor(mainApp: MainApp) {
        super(mainApp)
    }
    Initialize(): void {
        this.awakeCamera()
    }

    Update(): void {
    }
    Destroy(): void {
        this.object.dispose()
    }
    /**
     * @private
     * @description 初始化相机
     *
     * @return {ArcRotateCamera} arcCamera - 圆弧相机
     * **/
    private awakeCamera() {
        this.object = new ArcRotateCamera(
            'camera',
            Tools.ToRadians(0),
            Tools.ToRadians(70),
            10,
            new Vector3(0.0, 0.0, 0.0),
            this.mainApp.app_scene.object,
        )
        this.object.panningSensibility = 0
        this.object.minZ = 0.01 //定义相机可以看到的最小距离
        this.object.maxZ = 10000 //定义相机可以看到的最大距离
        this.object.pinchPrecision = 60 //移动端滚轮速度 越小越灵敏
        this.object.wheelPrecision = 60 //电脑端滚轮速度 越小越灵敏
        // this.camera.pinchDeltaPercentage = 2
        //this.camera.useNaturalPinchZoom = 0.5
        this.object.wheelDeltaPercentage = 0.01 //获取或设置鼠标滚轮增量百分比或相机缩放的速度
        this.object.upperRadiusLimit = 7 //摄像机到目标的最大允许距离（
        this.object.lowerRadiusLimit = 0.01 //摄像机到目标的最小允许距离（
        this.object.upperBetaLimit = Math.PI * 0.5 //最大上下移动范围
        this.object.lowerBetaLimit = 0.6 //最小上下移动范围
        // this.object.panningAxis = new Vector3(0, 0, 0)
        this.object.allowUpsideDown = false
        //this.object.useFramingBehavior = true
        // this.object.attachControl(this.mainApp.canvas, true)
        // this.object.setPosition(new Vector3(160, 50, 0))
        this.object.position = new Vector3(3, 0, 2)
        this.object.attachControl(this.mainApp.app_engine.canvas, true)
        this.mainApp.app_scene.object.activeCamera = this.object
        // this.object.target = new Vector3(0, 0, 0)      
        // this.object.upVector = new Vector3(1, 0, 0)
    }
}


export default AppCamera