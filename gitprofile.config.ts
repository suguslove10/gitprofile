// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'suguslove10', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [
          'suguslove10/finance-me-microservice',
          'suguslove10/MERN-docker-compose',
          'suguslove10/cloud-migration-planner',
          'suguslove10/cloud-migration-strategy-planner',
        ], // List of repository names to display.
      },
    },
    external: {
      header: 'Special Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [],
    },
  },
  seo: {
    title: 'Portfolio of Suguresh - Associate Cloud Engineer',
    description:
      'Associate Cloud Engineer specializing in AWS, DevOps, and infrastructure automation. Experienced in CI/CD pipelines (Jenkins, GitHub Actions), containerization (Docker, Kubernetes), and IaC (Terraform).',
    imageURL: '',
  },
  social: {
    linkedin: 'suguresh',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '',
    discord: '',
    telegram: '',
    website: 'https://thesugu.com',
    phone: '8105500628',
    email: 'sugugalag@gmail.com',
  },
  resume: {
    fileUrl: 'https://drive.google.com/file/d/1nXqtiGWIGeYV-CmuGWppcxcY58vz2FDc/view?usp=sharing', // Add your resume PDF link here when available
  },
  skills: [
    'AWS',
    'Google Cloud Platform',
    'Azure',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Terraform',
    'Ansible',
    'Python',
    'YAML',
    'HTML',
    'CSS',
    'Git',
    'GitHub',
    'Linux',
    'Prometheus',
    'Grafana',
    'SonarQube',
    'CI/CD',
    'DevOps',
    'Cloud Architecture',
    'Infrastructure as Code',
    'Containerization',
    'Microservices',
  ],
  experiences: [
    {
      company: 'Seabed2Crest Technologies Private Limited',
      position: 'Associate Cloud Engineer',
      from: 'May 2025',
      to: 'Present',
      companyLink: '',
      description: '• Monitor cloud infrastructure using AWS CloudWatch, Prometheus, and Grafana.\n• Deploy applications via CI/CD pipelines (GitHub Actions, Jenkins).\n• Manage Docker images and EKS services.\n• Automate infrastructure using Terraform and CloudFormation.',
    },
    {
      company: 'F13 Technologies',
      position: 'AWS Cloud Intern',
      from: 'October 2024',
      to: 'January 2025',
      companyLink: '',
      description: '• Architected solutions using EC2, S3, Lambda, and DynamoDB.\n• Developed a Service Recommendation System (SRS) for cost optimization.\n• Implemented HRMS solution with AWS Lambda and Cognito.',
    },
  ],
  certifications: [
    {
      name: 'AWS Partner Technical Accredited',
      body: 'AWS',
      year: '2024',
      link: '',
    },
    {
      name: 'AWS Well-Architected Proficient',
      body: 'AWS',
      year: '2024',
      link: '',
    },
    {
      name: 'IBMCEP DevOps Fundamentals (CEDEVIIN)',
      body: 'IBM',
      year: '2024',
      link: '',
    },
    {
      name: 'Perform Foundational Infrastructure Tasks in Google Cloud',
      body: 'Google Cloud',
      year: '2024',
      link: '',
    },
  ],
  educations: [
    {
      institution: 'Reva University',
      degree: 'Electronics & Computer Engineering',
      from: '2020',
      to: '2024',
    },
  ],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'premium',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'caramellatte',
      'abyss',
      'silk',
      'procyon',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `
    <div class="status-bar">
      <span class="status-dot"></span>
      <span>All systems are operational</span>
      <span class="status-divider">.</span>
      <a class="status-link" href="#status" rel="noreferrer">Status</a>
      <span class="status-divider">.</span>
      <a class="status-link" href="#uptime" rel="noreferrer">Uptime</a>
    </div>
    <div class="opacity-50 text-xs mt-2">
      Made with <a class="text-primary" href="https://github.com/arifszn/gitprofile" target="_blank" rel="noreferrer">GitProfile</a> and ❤️ by Suguresh
    </div>
  `,

  services: {
    header: 'What I\'m Doing',
    services: [
      {
        title: 'Cloud Infrastructure',
        description: 'Architecting and managing scalable, secure cloud environments on AWS, Azure, and GCP using best practices.',
        icon: 'SiAmazonwebservices',
      },
      {
        title: 'DevOps & Automation',
        description: 'Building robust CI/CD pipelines and automating infrastructure using Terraform and Ansible to accelerate delivery.',
        icon: 'SiTerraform',
      },
      {
        title: 'Containerization',
        description: 'Deploying and orchestrating microservices with Docker and Kubernetes for high availability and scalability.',
        icon: 'SiKubernetes',
      },
      {
        title: 'Monitoring & SRE',
        description: 'Implementing full-stack observability with Prometheus, Grafana, and CloudWatch to ensure system reliability.',
        icon: 'SiGrafana',
      },
    ],
  },
  enablePWA: true,
};

export default CONFIG;
