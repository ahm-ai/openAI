import React, { useState, useEffect } from 'react';


let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

function Speech() {
    const [alert, setAlert] = React.useState(false);

    const useRef = React.useRef("");
    const [transcript, setTranscription] = React.useState('');
    const [interim, setInterim] = React.useState('');
    const [enableAutoScroll, setEnableAutoScroll] = React.useState(true);

    const listening = true;

    useEffect(() => {
        start()
    }, []);

    useEffect(() => {
        // Scroll to bottom of textarea
        if (enableAutoScroll) {
            const textarea = document.getElementById('message');
            textarea.scrollTop = textarea.scrollHeight;
        }
    }, [transcript, interim]);

    const start = () => {
        console.log("Starting ....")
        SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        recognition.continuous = true;

        recognition.onresult = (e) => {
            let interimTranscription = '';
            let finalTranscription = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {

                if (e.results[i].isFinal) {
                    finalTranscription += e.results[i][0].transcript;
                } else {
                    interimTranscription += e.results[i][0].transcript;
                }
            }


            if (finalTranscription.length > 1) {
                useRef.current = useRef.current + finalTranscription;
                setTranscription(useRef.current);
                setInterim('')
                checkForText(finalTranscription)
                finalTranscription = '';
                interimTranscription = '';
            } else {
                setInterim(interimTranscription)
                checkForText(interimTranscription)
                finalTranscription = '';
            }

        }

        recognition.onaudioend = () => {
            console.log('[onaudioend] :: Audio recognition has stopped.');
            start()
        }

        recognition.onsoundend = (event) => {
            console.log('[*] Sound has stopped being received');
        }

        recognition.onspeechend = () => {
            recognition.stop();
            console.log('[onspeechend] :: Speech recognition has stopped.');
            start()
        }

        recognition.start();
    }

    const saveInLocal = () => {
        const data = document.getElementById("save_transcript_as");
        localStorage.setItem(`T:${data.value}`, transcript);
    }

    const onClickClose = () => {
        setAlert(false)
    }

    const checkForText = (text = "") => {
        const lastChars = text.substring(text.length - 50, text.length);
        if (lastChars.includes('Angel') || lastChars.includes('angel')) {
            setAlert(true)
        }
        console.log(lastChars);
    }

    const toggleAutoScroll = () => {
        setEnableAutoScroll(!enableAutoScroll)
    }

    return (
        <div>

            {alert && (
                <div onClick={onClickClose} className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <span class="font-medium">Question Asked!</span>
                </div>
            )}

            {/* <button onClick={onClickEnd}>END</button> */}



            <div className='mb-3  grid grid-rows-1 grid-cols-3 '>




                <form className='mb-3 col-span-2' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Save As</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="save_transcript_as" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button onClick={saveInLocal} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    </div>
                </form>

                <div className=' px-4'>
                    <p className=' text-gray-600 '> Microphone: {listening ? (<span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">On</span>) : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Off</span>}</p>

                    <button onClick={toggleAutoScroll} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-6 px-4  py-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{enableAutoScroll ? 'AutoScrollEnabled' : 'ScrollDisabled'}</button>
                </div>
            </div>


            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transcript</label>
            <textarea id="message" rows="4" className=" h-[50vh] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                defaultValue={transcript + interim}></textarea>

        </div>
    );
}




export default Speech;
