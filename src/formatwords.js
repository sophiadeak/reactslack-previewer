
const initial = "*words blah _italic_* ok end"
const norm = "asdf qwerqwe jklj jgajgoij"

const isBold = word => (word.startsWith('*') && word.endsWith('*') && word.length > 1)

const cleanWord = word => word.substring(1, word.length - 1)

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

  else
  {


  const bolds = text.split(  /(\*.*?\*)/sg);
  console.log(bolds)


    bolds.map(chunk => {

      // if(isBold(chunk)) 


    })

    //is italic

    
    //is bold
    
  }
}


FormatWords(initial)


export default FormatWords
