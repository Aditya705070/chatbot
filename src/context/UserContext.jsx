import React from 'react';
import { createContext } from 'react';
export const datacontext = createContext();
import main from '../gimini.js';
import { useState } from 'react';

function UserContext({ children }) {
  let[speaking, setSpeaking] =useState(false);
  let[prompt,setPrompt] = useState("Listning....."); 
  let[response , setResponse] = useState(false); // State to track the response
  // Function to convert text to speech
  function speak(text) {
    // console.log('Speaking:', text); // Debug log
    if (!text || text.trim() === '') {
      console.error('No text provided for speech synthesis.');
      return;
    }
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    let text_speech = new SpeechSynthesisUtterance(text);
    text_speech.volume = 1;
    text_speech.rate = 1;
    text_speech.pitch = 1;
    text_speech.lang = 'hi-GB';
    window.speechSynthesis.speak(text_speech);
  }

  // Function to handle AI response
  async function airesponce(prompt) {
    try {
      let text = await main(prompt); 
      let newText = text.split('**')&& text.split('*')&& text.replace("google","Aditya")&&text.replace("Google","Aditya")// Call the Gemini API
      if (newText) {
        setPrompt(newText); // Update the prompt state with the AI response
        speak(newText); 
        setResponse(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
        // Speak the response
        // console.log('AI Response:', text); // Log the response
      } else {
        console.error('No response from Gemini.');
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  }

  // Speech recognition setup
  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript.trim(); // Trim whitespace
    setPrompt(transcript); // Log the user's speech
    takeCommand(transcript.toLowerCase()); // Send the transcript to Gemini
  };

  function takeCommand(command){
    if (command.includes("open")&& command.includes("youtube")) {
      window.open("https://www.youtube.com", "_blank"); 
      speak("opening youtube");
      setResponse(true);
      setPrompt("Opening YouTube"); // Update the prompt state
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
      // Open YouTube in a new tab
    }

    else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com", "_blank"); 
      speak("opening google");// Open Chrome in a new tab
      setResponse(true);
      setPrompt("Opening Google"); // Update the prompt state
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    }

    else if(command.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
      setResponse(true);
      setPrompt(time); // Update the prompt state with the current time
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    }

    else if(command.includes("date")){
      let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
      speak(date)
      setResponse(true);
      setPrompt(date);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    }

    else{
      airesponce(command); // Call the AI response function with the command
    } 
  }

  recognition.onerror = (error) => {
    console.error('Speech Recognition Error:', error);
  };

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  );
}

export default UserContext;