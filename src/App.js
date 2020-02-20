import React, {useState} from 'react';

import ReactSlackPreviewer from './ReactSlackPreviewer/ReactSlackPreviewer.js'


const wrapperStyles = {backgroundColor: 'orange', border: 'solid 8px limegreen'}


const App = () => {
  const [input, setInput] = useState('')
  const handleInput = (e) => {
    const text = e.target.value
    setInput(text)
  }


  return (
    <>
    <textarea className="input"
      value={input}
      onChange={handleInput}
    />

    <ReactSlackPreviewer text={input} wrapperStyles={wrapperStyles}
    />
    </>
  )

}

export default App

