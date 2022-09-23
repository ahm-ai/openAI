import React, { useRef, useState } from 'react'


const API_TOKEN = '';

export const MainComponent = () => {

    // const message = useRef()
    // const response = useRef()

    const [message, setMessage] = useState("");
    const pasteFunc = async () => {
        const cliptext = await navigator.clipboard.readText();
        setMessage(cliptext)
    }

    const [res, setRes] = useState("");
    const copyFunc = async () => {
        const copied = await navigator.clipboard.writeText(res);
        console.log(copied);
    }


    const convertFunc = async () => {
        // MAKE API CALL
        const settings = {
            "model": "text-curie-001",
            "prompt": `Correct this to standard English:\n\n ${message}.`,
            "temperature": 0,
            "max_tokens": 60,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        }

        fetch("https://api.openai.com/v1/completions", {
            body: JSON.stringify(settings),
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then((r) => r.json()).then(resp => {
            console.log(resp);
            setRes(resp?.choices[0]?.text)
        })
    }





    return (
        <>
            <div className=''>

                <button onClick={pasteFunc} type="submit" className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Paste</button>

                <button onClick={convertFunc} t type="submit" className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Convert</button>

            </div>
            {/* <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label> */}
            <textarea value={message} onChange={(e) => { setMessage(e.target.value) }} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

            <br></br>




            {/* {res} */}
            <textarea value={res} onChange={(e) => { setRes(e.target.value) }} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Response"></textarea>
            <button onClick={copyFunc} type="submit" className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Copy</button>

        </>

    )
}


function Fields() {

    return (

        <fieldset>
            <legend className="sr-only">Countries</legend>

            <div className="flex items-center mb-4">
                <input id="country-option-1" type="radio" name="countries" value="USA" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked="" />
                <label for="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    United States
                </label>
            </div>

            <div className="flex items-center mb-4">
                <input id="country-option-2" type="radio" name="countries" value="Germany" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label for="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Germany
                </label>
            </div>

            <div className="flex items-center mb-4">
                <input id="country-option-3" type="radio" name="countries" value="Spain" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label for="country-option-3" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Spain
                </label>
            </div>

            <div className="flex items-center mb-4">
                <input id="country-option-4" type="radio" name="countries" value="United Kingdom" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label for="country-option-4" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    United Kingdom
                </label>
            </div>

            <div className="flex items-center">
                <input id="option-disabled" type="radio" name="countries" value="China" className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" disabled="" />
                <label for="option-disabled" className="block ml-2 text-sm font-medium text-gray-300 dark:text-gray-700">
                    China (disabled)
                </label>
            </div>
        </fieldset>

    )
}