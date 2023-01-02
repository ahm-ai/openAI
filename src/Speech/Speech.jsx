import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Speech = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [alert, setAlert] = React.useState(false);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const onStart = () => {
        SpeechRecognition.startListening({ continuous: true })
    }

    const saveInLocal = () => {
        const data = document.getElementById("save_transcript_as");
        localStorage.setItem(`T:${data.value}`, transcript);
    }

    useEffect(() => {
        // console.log(transcript);
        // get last 10 words in the string with a loop
        const lastChars = transcript.substring(transcript.length - 50, transcript.length);

        if (lastChars.includes('Angel') || lastChars.includes('angel')) {
            setAlert(true)
        }

        console.log(lastChars);

    }, [transcript])

    const onClickClose = () => {
        setAlert(false)
    }

    return (
        <div>

            {alert && (
                <div onClick={onClickClose} class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <span class="font-medium">Question Asked!</span>
                </div>
            )}


            <p className=' text-gray-600 mb-2'> Microphone: {listening ? (<span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">On</span>) : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Off</span>}</p>

            <div className='mb-3'>

                <button onClick={onStart} type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-1">
                    Start</button>

                <button onClick={SpeechRecognition.stopListening} type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mr-1">
                    Stop</button>
                <button onClick={resetTranscript} type="button" className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Reset</button>

            </div>

            <form className='mb-3' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Save As</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="save_transcript_as" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                    <button onClick={saveInLocal} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
            </form>


            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transcript</label>
            <textarea id="message" rows="4" className=" h-[100vh] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={transcript}></textarea>

        </div>
    );
};
export default Speech;