import MainApp from "../MainApp.ts";

/**
 * @description 基本抽象类
 *
 *
 * **/
abstract class BaseAbstrcat<T>{
    object:T ={} as T
    mainApp:MainApp
    constructor(mainApp:MainApp) {
        this.mainApp = mainApp
    }
}


export  default  BaseAbstrcat