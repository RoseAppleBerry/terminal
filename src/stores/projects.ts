import * as fs from 'fs';

export function getProjectsData() {
  // Read the projects.json file
  const projectsData = fs.readFileSync('projects.json', 'utf-8');

  // Parse the JSON data
  const projects = JSON.parse(projectsData);

  return projects;
}
