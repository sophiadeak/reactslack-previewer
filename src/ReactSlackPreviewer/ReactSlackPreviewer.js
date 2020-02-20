import React, {useState} from 'react';
import './ReactSlackPreviewer.scss';

import Markdown from "markdown-it";
import MarkdownSlack from 'slack-markdown-it';
import emoji from 'markdown-it-emoji'
import parse from 'html-react-parser';
import slackDefaultPhoto from './slack-default-photo.png'

const md = Markdown();

md.use(MarkdownSlack);
md.use(emoji)

md.renderer.rules.fence = (tokens, idx, slf) => {
  const token = tokens[idx]
  const content = md.utils.escapeHtml(token.content)
    return  '<pre><div id="fence">'
    + token.info +'\n' + content 
        + '</div></pre>\n';
}

const ReactSlackPreviewer = ({wrapperStyles, displayStyles, text, slackFrame}) => {

  console.log("SLACK", slackFrame)
  return (
    <div className="rs-wrapper" style={wrapperStyles || {}}>
      {slackFrame &&
        <img src={slackDefaultPhoto} alt="Profile"/>
      }
      <div className="reactslack-previewer" style={displayStyles || {}}>
            {parse(md.render(text))} 
      </div>
    </div>
  );
}

export default ReactSlackPreviewer;

