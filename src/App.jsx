import { useState } from 'react'
import './App.css'
import { MainComponent } from './MainComponent/MainComponent'

function App() {

  const [active, setActive] = useState(1);

  const selectedClass = `inline-block p-4 rounded-t-lg border-b-2 border-transparent text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500`;
  const defaultClass = `inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`


  return (
    <div className="App" >


      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">

          <li className="mr-2" role="presentation">
            <button onClick={() => setActive(1)} className={`${active == 1 ? selectedClass : defaultClass}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Grammar Check</button>
          </li>

          <li className="mr-2" role="presentation">
            <button onClick={() => setActive(2)} className={`${active == 2 ? selectedClass : defaultClass}`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Q/A</button>
          </li>

        </ul>
      </div>

      <label htmlFor="default-toggle" className="mb-4 inline-flex relative items-center cursor-pointer">
        {/* <input type="checkbox" value="" id="default-toggle" className="sr-only peer"
          onClick={() => setDavinci(!isDavinci)}
          checked
        /> */}
        {/* <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="mld-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Davinci</span> */}
      </label>

      <MainComponent intent={active} />
    </div >
  )
}

export default App
