import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';


const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  hostname: () => hostname,
  whoami: () => 'guest',
  date: () => new Date().toLocaleString(),
  echo: (args: string[]) => args.join(' '),
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'list': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  clear: () => {
    history.set([]);

    return '';
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening mailto:${packageJson.author.email}...`;
  },
  
  twitter: (args: string[]) => {
    window.open('https://twitter.com/Moataz_AlKhaldi');

    return `Feel free to follow me on Twitter!`;
  },
  linkedin: (args: string[]) => {
    window.open('https://www.linkedin.com/in/moataz-al-khaldi-3a7846213/');

    return `Feel free to connect with me on Linkedin!`;
  },
  archive: (args: string[]) => {
    window.open(' ');
  },

  project: (args: string[]) => {
      const helpText = `project: project [args].
      [args]:
        ls: list all available projects
        show: shows the project details
    
      [Examples]:
        project ls
        project show [project-name]
      `;
    
      if (args.length === 0) {
        return helpText;
      }
    
      switch (args[0]) {
        case 'ls': {
          let result = projects.map((t) => t.name.toLowerCase()).join(', ');
          
          return result;
        }
    
        case 'show': {
          if (args.length !== 2) {
            return helpText;
          }
    
          const selectedProject = projects.find((t) => t.name.toLowerCase() === selectedProject);
    
          if (!selectedProject) {
            return `Project '${selectedProject}' not found. Try 'project ls' to see all available projects.`;
          }
    
          return `Project: ${selectedProject.name}\nDescription: ${selectedProject.description}\nLink: ${selectedProject.link}`;
        }
    
        default: {
          return helpText;
        }
      }
    },
  exit: () => {
    window.close();
  },

  banner: () => `
███    ███  ██████   █████  ████████  █████  ███████      █████  ██          ██   ██ ██   ██  █████  ██      ██████  ██ 
████  ████ ██    ██ ██   ██    ██    ██   ██    ███      ██   ██ ██          ██  ██  ██   ██ ██   ██ ██      ██   ██ ██ 
██ ████ ██ ██    ██ ███████    ██    ███████   ███       ███████ ██          █████   ███████ ███████ ██      ██   ██ ██ 
██  ██  ██ ██    ██ ██   ██    ██    ██   ██  ███        ██   ██ ██          ██  ██  ██   ██ ██   ██ ██      ██   ██ ██ 
██      ██  ██████  ██   ██    ██    ██   ██ ███████     ██   ██ ███████     ██   ██ ██   ██ ██   ██ ███████ ██████  ██ 
                                                                                                                        

This Website is a work in progress with a the goal to showcase future projects and archive important events. 
v${packageJson.version}

Type 'help' to see list of available commands.
`
};
