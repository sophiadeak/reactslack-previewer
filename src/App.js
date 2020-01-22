import React, {useState} from 'react';
import './App.css';

import Markdown from "markdown-it";
import MarkdownSlack from 'slack-markdown-it';
import emoji from 'markdown-it-emoji'
import parse from 'html-react-parser';

const md = Markdown();

md.use(MarkdownSlack);
md.use(emoji)



//Line utility functions
const isBlockQuote = line => line.startsWith('>')
const isUnorderedList = line => (line.length > 2) && line.startsWith('-') || (line.startsWith('*') && !line.endsWith('*'))  

// Word utility functions
  
 const isItalic = word => (word.startsWith('_') && word.endsWith('_') && word.length > 1)

const isBold = word => (word.startsWith('*') && word.endsWith('*') && word.length > 1)
const isStrikeThrough = word => (word.startsWith('~') && word.endsWith('~') && word.length > 1)
const isCode = word => (word.startsWith('`') && word.endsWith('`') && word.length > 1)

const cleanWord = word => word.substring(1, word.length - 1)

const parseWord = word => {
  if(isItalic(word)){
    return <span style={{fontStyle: 'italic'}}> {cleanWord(word)} </span>
  }
  if(isBold(word)){
    return <span style={{fontWeight: 'bold'}}>  {cleanWord(word)} </span>
  }
  if(isStrikeThrough(word)){
    return <span style={{textDecoration: 'line-through solid currentcolor'}}>  {cleanWord(word)} </span>
  }
  if(isCode(word)){
    return <span className="code">  {cleanWord(word)} </span>
  }
  else return <span> {word + ' '}</span>
}


const parse3 = (text) => {
  const blocks = text.split(  /(```.*?```)/sg   );
  console.log('blocks', blocks)
  const formattedBlocks = blocks.map(block => {

    if (block.startsWith('```') && block.endsWith('```')){
      return (
        <>
        <br/>
        <p className="code-block">
          {block.substring(3, block.length - 3).split('\n').map(line => <>{line} <br/></>)}
        </p>
        <br/>
        </>
      )
    }

    else {

      // break into lines
      //const lines = text.split("\n")
      const lines = block.split('\n')
      console.log("LINES", lines)

      return lines.map(line => <> {parseLine(line)}{ (!isBlockQuote(line) && !isUnorderedList(line)) && <br/>} </>)
    }
  })

  return formattedBlocks
}



const parseLine = (line) => {

  const words = line.split(" ").map(word => parseWord(word))

  if (isBlockQuote(line)){
    return <p className="blockquote">
      {line.substring(1, line.length).split(" ").map(word => parseWord(word))}
    </p>
  }

  if (isUnorderedList(line)){
    return <li>  {line.substring(1, line.length).split(" ").map(word => parseWord(word))}
    </li>
  }

  else return line.split(" ").map(word => parseWord(word))
}





const initial = "*words blah _italic_* ok end"
const norm = "asdf qwerqwe jklj jgajgoij"


const needsFormatting = (text) => {
  //checks if text contains pairs of * _ ~ or `

  return !(text.match(/(\*.*?\*)/g) == null 
    && text.match(/(_.*?_)/g) == null  
    && text.match(/(~.*?~)/g) == null  
    && text.match(/(`.*?`)/g) == null)
}

const FormatWords = (text) => {

  if(!needsFormatting(text)){
    return text
  }

  else if(isBold(text)){
    return <span style={{fontWeight: 'bold'}}>{FormatWords(cleanWord(text))}</span>
  }

  else if(isItalic(text)) return <span style={{fontStyle: 'italic'}}>{FormatWords(cleanWord(text))}</span>

  const italics = text.split(  /(\_.*?\_)/sg);
  if(italics.length > 1){
    return italics.map(italic => FormatWords(italic)) 
  }



  const bolds = text.split(  /(\*.*?\*)/sg);
  if(bolds.length > 1) return bolds.map(bold => FormatWords(bold))


    return bolds.map(chunk => {

      return FormatWords(chunk)

      // if(isBold(chunk)) 
    })
    //is italic
    //is bold
  
}







const App = () => {
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')

  FormatWords(initial)
  const parseInput = (text) => {

      /*
    const splitLines = text.split("\n")
    const semifinal = splitLines.map( line =>  {

      const words = line.split(" ")
        
      const res = words.map(word => parseWord(word))

      return res + <br/>
    })

    const splitwords = splitLines.split(" ")
    console.log("split words", splitList)
    */

    const splitList = text.split(" ")

    const parsedList = splitList.map((word) => parseWord(word))
    return parsedList

  }

  const handleInput = (e) => {
    const text = e.target.value

    const i = parseInput(text)
    setInput(text)

    setOutput(i)

    console.log(md.parse(text), {})

  }

  console.log('input', input)

  return (
    <div className="App">
      <header className="App-header">
        <textarea className="input"
          value={input}
          onChange={handleInput}
        />

        <div  className="display" style={{background: '#ffffff', height: '400px', width: '300px', margin: '30px'}}>
 

          {parse(md.render(input))} 
      </div>


      </header>

      <div style={{height: '300px', width: '500px', position: 'absolute', bottom: '5px', backgroundColor: 'ivory'}}>


            <div><pre>{(JSON.stringify(md.parse(input),{}), null, 2)}</pre></div>

      </div>


    </div>
  );
}

export default App;
