//var MarkdownIt = require('markdown-it')
const markdownItSlack = require('markdown-it-slack');
const md = require('markdown-it')().use(markdownItSlack);

const rules = {
 'normalize': false,       
 'block': false,           
 'inline': false,          
 'linkify': false,         
 'replacements': false,   
 'smartquotes': false, 

 'table': false,      
 'code': false,       
 'fence': false,      
 'blockquote': false, 
 'hr': false,         
 'list': false,       
 'reference': false,  
 'heading': false,    
 'lheading': false,   
 'html_block': false, 
 'paragraph': false, 


  'text': false,       
  'newline': false,      
  'escape': false,       
  'backticks': false,    
  'strikethrough': false,
  'emphasis': false,     
  'link': false,         
  'image': false,        
  'autolink': false,     
  'html_inline': false,  
  'entity': false,        

  'balance_pairs': false,
  'text_collapse': false,
}

  /*
const md = new MarkdownIt('zero')
            .enable(['emphasis', 'code', 'strikethrough'])
            .enable('strikethrough')
            */

const starter = "ok blah *more words _react markdown_ still* now  ~new~ end"

const parsed = md.parse(starter, {}) 


console.log(parsed)
console.log(parsed[1])
