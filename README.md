
## Usage 

```
import ReactSlackPreviewer from 'reactslack-previewer'

```


###Example
```
 <ReactSlackPreviewer 
    text={"*okok* _italic_ \n * stuff  \n * more stuff  \n >quote \n \n `code`"}

    wrapperStyles={{
     backgroundColor: 'teal',
     borderRadius: '20px'
    }}

    displayStyles={{
     borderRadius: 'inherit'
    }}
   />
```


###Props

|Prop name|    Description|
|:----------|:-------------|
| **text**  (required)  | string of markdown to preview  | 
| **wrapperStyles** (optional)|  inline style object to style outer component   
| **displayStyles** (optional) |  inline style object to style display component|


