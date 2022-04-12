module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `http://saint1729.me/`,
    // Your Name
    name: 'Sai Nikhil Thirandas',
    // Main Site Title
    title: `Sai Nikhil | Graduate Student - Applied Mathematics | Aspiring Machine Learning Engineer`,
    // Description that goes under your name in main bio
    description: `I am a graduate student currently pursuing Masters in Applied Mathematics with a concentration in Machine Learning, from Northeastern University. I completed B. Tech (Hons.) from IIT Kharagpur. My primary strengths include Data Structure & Algorithm Implementation, System Designing. Besides this, I hold a strong background in Mathematics, specifically in areas of Calculus, Linear Algebra, Probability & Statistics. I'm looking for looking for fulltime opportunites in the Machine Learning space.`,
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
        name: 'Matrix Factorization for User Rating Predictions',
        description:
          'Derived update rules and implemented Weighted Alternating Least Squares for predicting missing user ratings of MovieLens data. Improved MSE by 62 % compared to baseline (mean predicting) model.',
        link: 'https://colab.research.google.com/drive/1u8FoCOaL9ugfm8udb7MYYgFeOyLQPObW?usp=sharing',
      },
      {
        name: 'Data Modeling - Markov Chain',
        description:
          'Performed Time Series Analysis of average runs of opening batters in baseball from 1871 – 2015 with a Markov Chain. Calculated autocorrelation between original time series and a simulated time series. Performed GoF test at 5 % significance level to determine valid states of Markov Chain in a two-step transition matrix.',
        link: 'http://saint1729.me/MATH7241.pdf',
      },
      {
        name: 'FaceNet - Face Recognition',
        description:
          'Encoded face image into 128-dimension feature vector (one-shot learning) using FaceNet. Implemented Triplet Loss function to compare Anchor, Positive, and Negative images in training data. Performed face verification and face recognition using the above encodings.',
        link: 'https://github.com/saint1729/coursera/blob/master/deep-learning/convoutional-neural-networks/week4/Face_Recognition.ipynb',
      },
      {
        name: 'Debiasing Word Vectors',
        description:
          'Used 50-dimensional GloVe vectors to represent words. Performed Word Analogy task. Implemented equalization algorithm presented in Boliukbasi et al., 2016 to remove gender bias.',
        link: 'https://github.com/saint1729/coursera/blob/master/deep-learning/nlp-sequence-models/week2/Operations_on_word_vectors_v2a.ipynb',
      },
    ],
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'Microsoft',
        description: 'Senior Software Engineer, September 2020 - September 2020.',
        link: 'https://www.microsoft.com/',
      },
      {
        name: 'Waterline Data Science',
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
          'Python, Java, R, C/C++, MATLAB, Mathematica, SQL, PHP, Perl, HTML, CSS, TypeScript, XML, JSON, Visual Basic',
      },
      {
        name: 'Machine Learning',
        description:
          'Regression, Classification, Ranking, Clustering, Dimensionality Reduction, Bagging, Boosting, Feature Engineering, Neural Networks, Deep Learning, Computer Vision, Natural Language Processing, Optical Character Recognition, Template Matching',
      },
      {
        name: 'Frameworks',
        description:
          'PyTorch, TensorFlow, OpenCV, NumPy, pandas, Matplotlib, scikit-learn, SymPy, Spark, Angular, Spring, JUnit, Mockito',
      },
      {
        name: 'Additional',
        description:
          'Git, Jupyter Notebook, Linux, Docker, Kafka, Hadoop, Hive, Zookeeper, Elasticsearch, PyCharm, IntelliJ IDEA, Oracle BI Publisher',
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
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
