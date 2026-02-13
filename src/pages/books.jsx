import { graphql } from 'gatsby';
import React from 'react';

import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Books = ({ data }) => {
  const books = [
    {
      title: 'Agentic Design Patterns',
      description: 'A comprehensive guide to building AI agent systems using design patterns. Covers prompt chaining, routing, parallelization, reflection, tool use, and planning with implementations in LangChain, CrewAI, and Google ADK.',
      url: '/books/agentic-design-patterns/',
      github: 'https://github.com/saint1729/agentic-design-patterns'
    }
  ];

  return (
    <Layout>
      <SEO title="Books" />
      <Header metadata={data.site.siteMetadata} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Books</h1>
        <div className="grid gap-6">
          {books.map((book, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-3">
                <a 
                  href={book.url} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  {book.title}
                </a>
              </h2>
              <p className="text-gray-700 mb-4">{book.description}</p>
              <div className="flex gap-4">
                <a 
                  href={book.url}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read Book →
                </a>
                <a 
                  href={book.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Books;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        name
        title
        description
        about
        author
        github
        linkedin
        instagram
      }
    }
  }
`;
