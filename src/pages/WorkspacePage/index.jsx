import * as zeplinApi from '../../api/zeplin.service';
import Workspace from '../../components/Workspace';
import Project from '../../components/Project';
import { useLocation } from 'react-router-dom';
import {
    useState, 
    useEffect
} from 'react';


export default function WorkspacePage() {
    const { state: { workspace } = {} } = useLocation();
    const [ screens, setScreens ] = useState([]);
    const projects = workspace.workspace.allProjects;
    console.log('workspace: ', workspace);  
    console.log('Projects', projects);

    const getScreens = async() => {
        const projects = workspace.workspace.allProjects;
        const screens = (await Promise.all(projects.map(
            async (project) => zeplinApi.getProjectScreens(project),
          ))).flat();
        
        setScreens(screens);
    };

    console.log('Screens: ', screens);

    const downloadScreenImages = async(e) => {
        e.preventDefault();
        const screenImages = await zeplinApi.downloadAllScreens(screens);
        console.log(screenImages);
    };
    
    useEffect(()=>{
        getScreens();
    }, [])

    return (
        <div> 
            <div> 
                <h4>{workspace.workspace.workspaceName == 'Personal Workspace' ? 'Personal' : workspace.workspace.workspaceName} Workspace</h4>
            </div>
            <div>
                <p>Projects</p>
                    {projects.map((p, idx) => {
                        const projectScreens = screens.filter(s => s['projectName'] == p.name);
                        console.log(projectScreens);
                        return (
                            <Project project={p} idx={idx} screens={projectScreens}/>
                        )
                    })}
            </div>
            {/* <button onClick={(e) => downloadScreenImages(e)}>Download All Screen Images</button> */}
        </div>
    )
};