import React, { useState } from 'react';
import './ReactSlackPreviewer.scss';
import Markdown from "markdown-it";
import MarkdownSlack from 'slack-markdown-it';
import emoji from 'markdown-it-emoji';
import parse from 'html-react-parser';
const md = Markdown();
md.use(MarkdownSlack);
md.use(emoji);

md.renderer.rules.fence = (tokens, idx, slf) => {
  const token = tokens[idx];
  const content = md.utils.escapeHtml(token.content);
  return '<pre><div id="fence">' + token.info + '\n' + content + '</div></pre>\n';
};

const ReactSlackPreviewer = ({
  wrapperStyles,
  displayStyles,
  text
}) => {
  return React.createElement("div", {
    className: "rs-wrapper",
    style: wrapperStyles || {}
  }, React.createElement("div", {
    className: "reactslack-previewer",
    style: displayStyles || {}
  }, parse(md.render(text))));
};

export default ReactSlackPreviewer;