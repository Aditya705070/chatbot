import React from 'react'
import { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from './assets/speak.gif';
import aiVoice from './assets/aiVoice.gif';
const App = () => {
   const {recognition, speaking, setSpeaking,prompt,response,setPrompt,setResponse} = useContext(datacontext)
   function handleButtonClick() {
    recognition.start();
  }
   
  return (
    <div className ="main">
      <img src={va} alt="Logo" id='shifra' />
      <span>I’m Shifra, Your Advance Virtual Assistant </span>
      {!speaking ? <button onClick={() => { handleButtonClick(); setSpeaking(true); setPrompt("Listening....");setResponse(false)}}>Click Here <CiMicrophoneOn /></button> : 
      <div className='response'>
        {!response ?  <img src={speakimg} alt="Speaking Animation" id='speak'/> : <img src={aiVoice} alt="AI Voice Animation" id='aigif'/>}
       
        <p>{prompt}</p>
      </div> }
      
      </div>
  )
}

export default App