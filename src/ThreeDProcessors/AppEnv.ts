import BaseAbstrcat from "./Abstract/BaseAbstrcat.ts";
import { BaseInterface } from "./interface/BaseInterface.ts";
import { HDRCubeTexture } from '@babylonjs/core'

class AppEnv extends BaseAbstrcat<Record<string, any>> implements BaseInterface {


    Initialize(url: string): void {
        this.object['reflectionTexture'] = this.awakeEnv(url)
    }

    Update(): void {
    }
    Destroy(): void {
        for (const key in this.object) {
            if (this.object[key].dispose && typeof this.object[key].dispose == 'function') {
                this.object[key].dispose()
            }
        }
    }

    private awakeEnv(url: string) {
        const reflectionTexture = new HDRCubeTexture(url, this.mainApp.app_scene.object, 128, false, true, false, true)
        reflectionTexture.level = 2
        const box = this.mainApp.app_scene.object.createDefaultSkybox(
            reflectionTexture,
            true,
            256,
            0,
            true,
        )
        if (box) box.visibility = 0
        return reflectionTexture
    }

}

export default AppEnv