import featuredProjects from './featured'
import projects from './projects'

module.exports = {
  email: 'qnemes@gmail.com',
  featuredProjects,
  projects,
  skills: ['JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux', 'Sass'],
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/Qnemes',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/vladyslav-semeniuk/',
    },
    {
      name: 'Stackoverflow',
      url: 'https://stackoverflow.com/users/6613742/vladyslav-semeniuk',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: 'about',
    },
    {
      name: 'Work',
      url: 'projects',
    },
    {
      name: 'Contact',
      url: 'contact',
    },
  ],
  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },
}
