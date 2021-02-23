module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `http://saint1729.me/`,
    // Your Name
    name: 'Sai Nikhil Thirandas',
    // Main Site Title
    title: `Sai Nikhil | Graduate Student - Applied Mathematics | Aspiring Machine Learning Engineer`,
    // Description that goes under your name in main bio
    description: `An aspiring Machine Learning Engineer. I'm looking for internships and co-ops in Machine Learning/Data Science for Summer 2021`,
    // Optional: Twitter account handle
    author: `@saint1729`,
    // Optional: Github account URL
    github: `https://github.com/saint1729`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/saint1729/`,
    // Content of the About Me section
    about: `I'm pursuing a master's degree in Applied Mathematics at Northeastern University - College of Science with a concentration in Machine Learning and Statistics.`,
    // Optional: List your projects, they must have `name` and `description`. `link` is optional.
    projects: [
      {
        name: 'Data Modeling - Markov Chain',
        description:
          'Performed Time Series Analysis of average runs of opening batters in baseball from years 1871 – 2015 with a Markov Chain with 9 states on the dataset (rows = 101,333) obtained from Sean Lahman\'s website.',
        link: 'http://saint1729.me/MATH7241.pdf',
      },
      {
        name: 'Predator-Prey Mathematical Modeling',
        description:
          'Modeled Predator (Bald Eagle) – Prey (Rodents) population growth using Lotka-Volterra equations modified with weak Allee effect and pesticide constant and obtained simulated population plots with/independent of time.',
        link: 'http://saint1729.me/MATH5131.pdf',
      },
      {
        name: 'Algorithm for coupled time-varying Ordinary Differential Equations',
        description:
          'Proposed analytical solution for solving special cases (constant coefficient, self-symmetric) for set of first order coupled time varying coefficient ordinary differential equations. Also, implemented Runge-Kutta 4th order algorithm for solving set of non-homogenous coupled time varying ODEs.',
        link: 'http://saint1729.me/IITKGP.pdf',
      },
    ],
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'Microsoft',
        description: 'Software Engineer II (L62), September 2020 - September 2020.',
        link: 'https://www.microsoft.com/',
      },
      {
        name: 'Hitachi Vantara',
        description: 'Senior Software Engineer, December 2018 - August 2020',
        link: 'https://www.hitachivantara.com/en-us/products/data-management-analytics/lumada-data-catalog.html',
      },
      {
        name: 'Oracle',
        description: 'Software Engineer II, August 2015 - November 2018',
        link: 'https://www.oracle.com/erp/project-portfolio-management-cloud/',
      },
      {
        name: 'Altair Engineering',
        description: 'Software Engineer, May 2013 - August 2015',
        link: 'https://www.altair.com/hyperworks/',
      },
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Languages',
        description:
          'Python, R, Java, SQL, PHP, Perl, HTML, CSS, TypeScript, Visual Basic, MATLAB, Mathematica',
      },
      {
        name: 'Machine Learning',
        description: 'Regression, Classification, Clustering, Dimensionality Reduction, Decision Trees, Random Forests, Bagging, Boosting, Neural Networks, Feature Engineering, Principal Component Analysis',
      },
      {
        name: 'Frameworks',
        description:
          'Hadoop, Apache Spark, NumPy, pandas, Matplotlib, scikit-learn, SymPy, Jupyter',
      },
      {
        name: 'Additional',
        description:
          'Git, Jenkins, JIRA, Docker, Excel, IntelliJ IDEA, PyCharm',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: `blog`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-190445738-1`, // Optional Google Analytics
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `saint1729`,
        short_name: `saint1729`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
