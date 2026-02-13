import { Link } from 'gatsby';
import React from 'react';

const classes = {
  wrapper: 'mb-6',
  name: 'font-semibold text-gray-900 pb-1',
  tenure: 'text-sm text-gray-500 font-normal',
  description: 'text-md text-gray-600 font-light',
};

const SummaryItem = ({ name, tenure, description, link = false, internal = false }) => {
  // Force full page reload for book sites (separate Gatsby instances)
  const isBookLink = link && (link.startsWith('/blog/agentic-design-patterns') || link.match(/^\/blog\/[^\/]+\/$/));
  const useInternalLink = internal && !isBookLink;
  
  let linkContent;
  if (useInternalLink) {
    linkContent = <Link to={link}>{name}</Link>;
  } else if (link) {
    linkContent = <a href={link}>{name}</a>;
  }

  return (
    <div className={classes.wrapper}>
      <div className="flex items-baseline justify-between flex-wrap">
        <h3
          className={`${classes.name} ${
            link ? 'hover:underline hover:text-black' : ''
          }`}
        >
          {link ? linkContent : name}
        </h3>
        {tenure && <span className={classes.tenure}>{tenure}</span>}
      </div>
      {description && <p className={classes.description}>{description}</p>}
    </div>
  );
};

export default SummaryItem;
