/**
 * @description MainApp : 3d场景管理器
 * **/
import AppScene from "./Scene/AppScene.ts";
import AppEngine from "./Engine/AppEngine.ts";
import AppCamera from "./Camera/AppCamera.ts";
import AppmodelLoader from "./Loader/AppmodelLoader.ts";
import AppEnv from "./AppEnv.ts";
import { BaseInterface } from "./interface/BaseInterface.ts";

class MainApp implements BaseInterface {
    /**
     * @description 3d场景
     * **/
    app_scene: AppScene
    /**
     * @description 3d渲染器
     * **/
    app_engine: AppEngine
    /**
     * @description 3d相机
     * **/
    app_camera: AppCamera
    /**
     * @description 3d模型加载器
     * **/
    app_model_loader: AppmodelLoader
    /**
     * @description 3d环境
     * **/
    app_env: AppEnv
    /**
     * @description 配置
     * **/
    app_config: any
    constructor() {
        this.app_engine = new AppEngine(this)
        this.app_scene = new AppScene(this)
        this.app_camera = new AppCamera(this)
        this.app_model_loader = new AppmodelLoader(this)
        this.app_env = new AppEnv(this)
    }
    Initialize(): void {
        this.app_engine.Initialize()
        this.app_scene.Initialize()
        this.app_camera.Initialize()
        this.app_env.Initialize(this.app_config.HDRs.first.url)
    }
    /**
     * @description 异步加载数据
     * **/
    async asyncLoad() {
        await this.app_model_loader.Initialize(this.app_config.models.scene.first);
    }
    Update(): void {
        this.app_engine.object.runRenderLoop(() => {
            if (this.app_scene.object) {
                this.app_scene.object.render()
            }
        })
    }
    Destroy(): void {
        this.app_env.Destroy()
        this.app_model_loader.Destroy()
        this.app_camera.Destroy()
        this.app_scene.Destroy()
        this.app_engine.Destroy()
    }

}


export default MainApp