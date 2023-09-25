import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

let API_TOKEN = "";

export const Gpt4 = () => {
  const [input, setInput] = useState(null);
  const [keyName, setKeyName] = useState("DocKey"); // Default max tokens
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const setS3KeyName = (e) => {
    const key = e.target.value;
    console.log(key);
    localStorage.setItem("s3Key", key);
    setKeyName(key);
  };

  const handleSend = async () => {
    const OPENAI_API_KEY = API_TOKEN; // Replace with your API key
    // https://pdyyay3o14.execute-api.us-east-1.amazonaws.com/dev/v1/appendJson/{objectKey}
    const apiEndpoint = `https://pdyyay3o14.execute-api.us-east-1.amazonaws.com/dev/v1/appendJson/${keyName}`;

    let payload;

    if (input) {
      payload = [...conversation, { role: "user", content: input }];
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        destination: "https://api.openai.com/v1/chat/completions",
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      const data = await response.json();
      console.log(data);

      if (data.updatedData) {
        setConversation([...data.updatedData]);
      }

      setInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let savedKey = localStorage.getItem("s3Key");
    setKeyName(savedKey || "DocKey");
    //   Create a keyboard shorcut for command + enter
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.metaKey) {
        console.log("Command + Enter");
        document.querySelector("#submit").click();
      }
    });

    handleSend();
  }, []);

  return (
    <div>
      <div className="overflow-y-scroll w-full min-h-[60vh] p-4 mb-4 text-xs border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        {conversation.map((message, index) => (
          <div key={index} className="mb-4">
            <strong>{message.role === "user" ? "You: " : "Assistant: "}</strong>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      <form>
        <label for="chat" class="sr-only">
          Your message
        </label>
        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <textarea
            value={input}
            onChange={handleInputChange}
            id="chat"
            rows="1"
            class=" text-xs block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            onClick={handleSend}
            type="button"
            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              class="w-5 h-5 rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span class="sr-only">Send message</span>
          </button>
        </div>
      </form>
      <input value={keyName} onChange={setS3KeyName} placeholder={keyName} />
    </div>
  );
};