module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `http://saint1729.me/`,
    // Your Name
    name: 'Sai Nikhil Thirandas',
    // Main Site Title
    title: `Sai Nikhil Thirandas | Lead Machine Learning Engineer @ AWS Bedrock`,
    // Description that goes under your name in main bio
    description: `Lead Machine Learning Engineer at AWS Bedrock, focused on LLM Serving and Evaluation.`,
    // Optional: Twitter account handle
    author: `@saint1729`,
    // Optional: Github account URL
    github: `https://github.com/saint1729`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/saint1729/`,
    // Optional: Instagram account URL (username: saint1729)
    instagram: `https://www.instagram.com/saint1729/`,
    // Content of the About Me section
    about: `Machine Learning Engineer at AWS Bedrock with 11 years of total work experience across distributed systems, machine learning, and Generative AI. Holds a B.Tech (Hons.) from IIT Kharagpur and M.S. in Applied Mathematics from Northeastern University. Strong foundation in Data Structures & Algorithms, System Designing, and Mathematics (Calculus, Linear Algebra, Probability & Statistics).

Core expertise includes LLM/Agent evaluation, ML Model Serving, NLP, Computer Vision, and Distributed Computing. Proficient in PyTorch, TensorFlow, LangChain, CrewAI, and Google ADK for building production ML systems. Co-authored research paper on domain-specific pre-training (DoPAMine). Passionate about designing innovative solutions that improve accuracy, efficiency, and reliability in production ML systems.`,
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
        name: 'Amazon Web Services | Machine Learning Engineer',
        tenure: 'July 2022 - Present',
        description: '', /*Tech lead for Helios (LLM/Agent evaluation framework). Designed custom BPE tokenizer (256K vocab) for Nova models. Built quality classifier models and distributed inference pipelines on AWS EMR. Evaluated LLMs for Artificial Analysis Intelligence Index benchmarks. Implemented license plate recognition system. Co-authored research paper on domain-specific pre-training (DoPAMine).',/**/
        link: 'https://aws.amazon.com/',
      },
      {
        name: 'Waterline Data Science | Lead Machine Learning Engineer',
        tenure: 'December 2018 - August 2020',
        description: '',
        link: 'https://www.hitachivantara.com/en-us/products/data-management-analytics/lumada-data-catalog.html',
      },
      {
        name: 'Oracle | Senior Software Engineer',
        tenure: 'August 2015 - November 2018',
        description: '',
        link: 'https://www.oracle.com/erp/project-portfolio-management-cloud/',
      },
      {
        name: 'Altair Engineering | Senior Research Engineer',
        tenure: 'May 2013 - August 2015',
        description: '',
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
        name: 'Machine Learning & AI',
        description:
          'LLMs, Generative AI, Agent Systems, LLM/Agent Evaluation, Computer Vision, NLP, Deep Learning, Regression, Classification, Ranking, Recommendation Systems, Clustering, Dimensionality Reduction, Feature Engineering, OCR',
      },
      {
        name: 'Frameworks & Libraries',
        description:
          'PyTorch, TensorFlow, DeepSpeed, vLLM, HuggingFace Transformers, LangChain, CrewAI, Google ADK, OpenCV, NumPy, pandas, Matplotlib, scikit-learn, SymPy, Spark, Hadoop',
      },
      {
        name: 'Tools & Platform',
        description:
          'AWS SageMaker, AWS EMR, AWS Lambda, AWS S3, AWS Step Functions, Git, Docker, Kafka, Hive, Zookeeper, Elasticsearch, Linux, Jupyter Notebook, PyCharm, IntelliJ IDEA',
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
