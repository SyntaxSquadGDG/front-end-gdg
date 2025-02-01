'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactDOM from 'react-dom';
import sanitizeHtml from 'sanitize-html';
import rehypeRaw from 'rehype-raw';

const MarkdownRenderer = ({ markdown }) => {
  // Select the target div outside of the component for the portal
  const sanitizedMarkdown = sanitizeHtml(markdown, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'div',
      'p',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ],
    allowedAttributes: {
      a: ['href'],
      div: ['style'],
    },
  });

  return (
    // Use React Portal to render the markdown content outside its normal DOM hierarchy
    <div className="reset-to-native break-words">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {sanitizedMarkdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

