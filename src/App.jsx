import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from './components/Nav'
import Home from './pages/Home';
import Workspaces from './pages/Workspaces';
import WorkspacePage from './pages/WorkspacePage';
import ProjectPage from './pages/ProjectPage';
import * as zeplinApi from './api/zeplin.service';
import _ from 'lodash';

function App() {
  const [ projects, setProjects] = useState([]);
  const [ user, setUser ]= useState([]);

  const fetchProjects = async() => {
    return await zeplinApi.getAllProjects().then((res) => {
      const fetchedProjects = res;
      const projectsBrokenIntoWorkspaces = _.uniq(fetchedProjects.map(project => project.organization ? project.organization.id : undefined)).map(workspace => {
        const projectsArray = fetchedProjects.filter(project => project.organization ? (project.organization.id == workspace) : (workspace == project.organization));
        return {
          workspaceId: workspace ? workspace : null, 
          workspaceName: workspace ? projectsArray[0].organization.name : 'Personal Workspace',
          workspaceLogo: workspace ? projectsArray[0].organization.logo : null,
          allProjects: projectsArray.map(project => {
            const keys = Object.keys(project).filter(key => key != "organization")
            const values = keys.map(key => project[key]);
            const merged = values.reduce(
                (result, field, index) => ({ ...result, [keys[index]]: field }),
              {}
            );
            return merged
          })
        }
      });
      setProjects(projectsBrokenIntoWorkspaces);
      console.log(projects)
    }).catch(err => console.log(err))
  };

  const fetchUser = async() => {
    return await zeplinApi.getUser().then(res => {
      setUser(res);
    }).catch(err => console.log(err))
  };
  
  useEffect(()=> {
    fetchProjects();
    fetchUser();
  }, []);

  return (
    <>
        <Nav user={user}/>
          <Routes>
            <Route
              path='/'
              element={<Home projects={projects} user={user}/>}
              >
            </Route>
            <Route
              path='/workspaces'
              element={<Workspaces projects={projects} user={user}/>}
              >
            </Route>
            <Route
              path='/workspace'
              element={<WorkspacePage />}
              >
            </Route>
            <Route
              path='/project'
              element={<ProjectPage />}
              >
            </Route>
          </Routes>
    </>
  )
}

export default App
