import React, { useRef, useState } from "react";
import { useEffect } from "react";

let API_TOKEN;

export const MainComponent = ({ intent }) => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [presence, setPresence] = useState(0);

  useEffect(() => {
    API_TOKEN = localStorage.getItem("k");
    //   Create a keyboard shorcut for command + enter
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.metaKey) {
        console.log("Command + Enter");
        document.querySelector("#submit").click();
      }
    });
  }, []);

  useEffect(() => {
    // Grammar correction
    if (intent === 1) {
      setPrompt("Correct grammar:");
    }

    // Questions
    if (intent === 2) {
      setPrompt("I am a highly intelligent question answering bot. Q: ");
    }
  }, [intent]);

  const pasteFunc = async () => {
    try {
      const d = document.execCommand("paste");
    } catch (error) {
      console.log(error);
    }

    try {
      const cliptext = await navigator.clipboard.readText();
      setMessage(cliptext);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFunc = () => {
    setMessage("");
    setLoading(false);
  };

  const [res, setRes] = useState("");
  const copyFunc = async () => {
    const copied = await navigator.clipboard.writeText(res);
    console.log(copied);
  };

  const handleSubmit = async (promptType) => {
    setLoading(true);

    let promptValue = `${promptType ? promptType : prompt}\n\n ${message}.`;
    let aiModel = "gpt-4-turbo-preview";

    // MAKE API CALL
    const settings = {
      model: aiModel,
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        {
          role: "user",
          content: promptValue,
        },
      ],
    };

    fetch("https://saoc6n2aba.execute-api.us-east-1.amazonaws.com/test/dev", {
      body: JSON.stringify(settings),
      headers: {
        destination: "https://api.openai.com/v1/chat/completions",
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((r) => r.json())
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        try {
          let openAiResponse = JSON.parse(resp.data);
          let res = openAiResponse.choices[0].message.content;
          setRes(res);
        } catch (error) {
          setRes(error);
        }
      });
  };

  const setK = (e) => {
    const target = e.target.value;
    localStorage.setItem("k", target);
    API_TOKEN = target;
  };

  return (
    <>
      <textarea
        value={message}
        onChange={(e) => {
          // prevent command + enter from submitting
          if (e.key === "Enter" && e.metaKey) return;

          setMessage(e.target.value);
        }}
        rows="4"
        className="min-h-[10rem]  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={intent === 1 ? "Correct:" : "Q:"}
      ></textarea>
      <div className=" text-right">
        <button
          onClick={clearFunc}
          type="submit"
          className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Clear
        </button>

        <button
          onClick={pasteFunc}
          type="submit"
          className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Paste
        </button>

        <button
          id="submit"
          onClick={() =>
            !isLoading && handleSubmit("Correct this to English: ")
          }
          type="submit"
          className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Standard
        </button>

        <button
          id="submit"
          onClick={() => !isLoading && handleSubmit()}
          type="submit"
          className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Convert
        </button>
      </div>
      <br></br>

      {/* {res} */}
      <textarea
        id="response"
        value={res}
        onChange={(e) => {
          setRes(e.target.value);
        }}
        rows="4"
        className="min-h-[10rem] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Response"
      ></textarea>

      <div className=" text-right">
        {!isLoading && (
          <button
            id="copy"
            onClick={copyFunc}
            type="submit"
            className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Copy
          </button>
        )}

        {isLoading && (
          <button
            disabled
            type="button"
            className="m-5 ml-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 grid-flow-row gap-4 mb-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Prompt
          </label>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={prompt}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Presence
          </label>
          <input
            onChange={(e) => setPresence(e.target.value)}
            value={presence}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={presence}
          />
        </div>
      </div>

      <div>
        {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label> */}
        <div className="relative">
          <input
            onChange={setK}
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Set"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            SetK
          </button>
        </div>
      </div>
    </>
  );
};
