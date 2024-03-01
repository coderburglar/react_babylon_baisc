import React, { useState, useEffect } from 'react';
import { Howl } from 'howler'; // 导入 Howler.js
import MainApp from './ThreeDProcessors/MainApp';
import { fetchData } from './ThreeDProcessors/utils/fetch';

// 全局音频实例
const sound = new Howl({
  src: [`${import.meta.env.BASE_URL}music/1.mp3`]
});

function App() {
  const mainApp = new MainApp();
  const [isPlay, setPlay] = useState(true);
  const [ejected, setEjected] = useState(true)
  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      try {
        console.log(import.meta.env.BASE_URL + import.meta.env.VITE_JSON_API)
        const loadjson = await fetchData(import.meta.env.BASE_URL + import.meta.env.VITE_JSON_API);
        mainApp.app_config = loadjson;
        mainApp.Initialize();
        await mainApp.asyncLoad()
        mainApp.Update()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndInitialize();

    // 页面加载完成后播放音频
    sound.play();

    // 返回一个清理函数，用于取消音频的播放
    return () => {
      sound.unload();
    };
  }, []);

  // 切换播放状态的函数
  function togglePlay() {
    setPlay(!isPlay);
  }

  // 根据播放状态播放或暂停音频
  useEffect(() => {
    if (isPlay) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [isPlay]);

  return (
    <>
      <img
        src={isPlay ? `${import.meta.env.BASE_URL}image/Vector.png` : `${import.meta.env.BASE_URL}image/Group 351.png`}
        alt="logo"
        onClick={togglePlay}
        style={{ "position": 'absolute', right: '10px', top: '5px' }}
      />
      {ejected&&<div  style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',background:'rgba(0,0,0,.5)'}}></div>}
       {ejected&& <div style={{ "position": 'absolute', left: '50%', top: '50%',transform: 'translate(-50%,-50%)',overflow:'visible',height:'content',zIndex:'3'}}>
        <div style={{ "position":'relative', width: '100%', height: '100%' ,overflow:'visible'}}>
            <img src={import.meta.env.BASE_URL + 'image/more.png'} style={{'position':'absolute',right:'2%',bottom:'4%'}}/>
            <img src={import.meta.env.BASE_URL + 'image/detail/cangjinglou_tupian.png'}/>
            <img src={import.meta.env.BASE_URL + 'image/close.png'} style={{'position':'absolute',left:'50%',bottom:'-10%',transform:'translateX(-50%)'}} onClick={()=>setEjected(false)}/>
        </div>
      </div>}
      <canvas id="render_container" style={{ width: '100%', height: '100%' }} />
    </>
  );
}

export default App;