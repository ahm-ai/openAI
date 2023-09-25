import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { MainComponent } from "./MainComponent/MainComponent";
import Speech from "./Speech/Speech";
import { Gpt4 } from "./gpt4/Gpt4";

function getTabNumber() {
  return window.location.href.includes("speech") ? 3 : 1;
}

function App() {
  const [active, setActive] = useState(getTabNumber());

  const selectedClass = `inline-block p-4 rounded-t-lg border-b-2 border-transparent text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500`;
  const defaultClass = `inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`;

  return (
    <div className="App">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              onClick={() => setActive(1)}
              className={`${active == 1 ? selectedClass : defaultClass}`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >
              Grammar Check
            </button>
          </li>

          <li className="mr-2" role="presentation">
            <button
              onClick={() => setActive(2)}
              className={`${active == 2 ? selectedClass : defaultClass}`}
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Q/A
            </button>
          </li>

          <li className="mr-2" role="presentation">
            <button
              onClick={() => setActive(3)}
              className={`${active == 3 ? selectedClass : defaultClass}`}
              id="speech-tab"
              data-tabs-target="#speech"
              type="button"
              role="tab"
              aria-controls="speech"
              aria-selected="false"
            >
              Speech
            </button>
          </li>
        </ul>
      </div>

      {active == 3 && <Speech />}
      {active == 2 && <Gpt4 />}
      {active == 1 && <MainComponent intent={active} />}
    </div>
  );
}

export default App;
