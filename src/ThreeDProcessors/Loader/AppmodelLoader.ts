import BaseAbstrcat from "../Abstract/BaseAbstrcat.ts";
import { BaseInterface } from "../interface/BaseInterface.ts";
import MainApp from "../MainApp.ts";
import { GLTFFileLoader } from '@babylonjs/loaders/glTF'
import { SceneLoader, ISceneLoaderAsyncResult, Vector3, } from "@babylonjs/core";
import { ISceneLoaderProgressEvent } from "@babylonjs/core/Loading/sceneLoader";

class AppmodelLoader extends BaseAbstrcat<ISceneLoaderAsyncResult> implements BaseInterface {
    constructor(mainApp: MainApp) {
        super(mainApp);
    }
    async Initialize(url: string): Promise<void> {
        //设置 取消增量加载 -> 一次性加载模型
        GLTFFileLoader.IncrementalLoading = false
        //其次坐标
        GLTFFileLoader.HomogeneousCoordinates = true
        await this.awakeModelLoader(url)
    }
    Update(): void {
    }
    Destroy(): void {
        for (const key in this.object) {
            this.object[key].dispose()
        }
    }
    /**
     *@description 加载模型
     *@param {string} url -加载模型的地址
     * **/
    private async awakeModelLoader(url: string) {
        await SceneLoader.ImportMeshAsync("", import.meta.env.BASE_URL + url, "", this.mainApp.app_scene.object, (event: ISceneLoaderProgressEvent) => {
            console.log(`${((event.loaded) / (event.total) * 100).toFixed(2)}%`);

        }).then((res) => {
            this.object = res
            console.log(res);
            res.meshes[0].position = Vector3.Zero()
            res.meshes[0].scaling = new Vector3(0.17, 0.17, -0.17)
        })
    }

}


export default AppmodelLoader