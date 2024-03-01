import BaseAbstrcat from "../Abstract/BaseAbstrcat.ts";
import { BaseInterface } from "../interface/BaseInterface.ts";
import MainApp from "../MainApp.ts";

import { Engine } from '@babylonjs/core'
class AppEngine extends BaseAbstrcat<Engine> implements BaseInterface {
    canvas!: HTMLCanvasElement
    constructor(mainApp: MainApp) {
        super(mainApp)
    }


    Initialize(): void {
        this.awakeEngine()
    }

    Update(): void {

    }
    Destroy(): void {
        this.object.dispose()
        this.canvas.remove()
    }
    /**
     *@private
     *@description 创建引擎
     *@param {string} [canvasID = 'render_container']  - 用于渲染Canvas元素的id
     * **/
    private awakeEngine(canvasID: string = 'render_container') {
        this.initCanvas(canvasID)
        this.object = new Engine(this.canvas, true, {
            adaptToDeviceRatio: true,
            antialias: true,
        }, true)
        this.object.setSize(this.canvas.width, this.canvas.height)
        //离线加载缓存的贴图
        this.object.enableOfflineSupport = true
        //提高性能降低清晰度，默认是1
        this.object.setHardwareScalingLevel(.5)
        this.object.doNotHandleContextLost = true
    }

    /**
     *@private
     *@description 初始化canvas操作
     *@param {string} canvasID -用于判断的Canvas元素的id
     * **/

    private initCanvas(canvasID: string) {
        try {
            this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
        } catch (e) {
            console.warn("please checkout canvasID", canvasID, "and we will init canvas")
            this.canvas = document.createElement('canvas')
            this.canvas.setAttribute('id', 'render_container')
        }

        this.canvas.style.width = '100vw'
        this.canvas.style.height = '100vh'
        //阻止默认拖拽事件
        // canvas.addEventListener("dragover",function(e){
        //     e.preventDefault()
        // })
        //window每一次修改大小都会触发resize事件
        //@ts-ignore
        window.addEventListener('resize', (e) => {
            if (window.innerWidth > 800 && window.innerHeight > 600) {
                this.canvas.width = window.innerWidth
                this.canvas.height = window.innerHeight
            }
        })
    }



}


export default AppEngine