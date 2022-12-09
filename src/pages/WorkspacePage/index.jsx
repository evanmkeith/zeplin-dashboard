import * as zeplinApi from '../../api/zeplin.service';
import Workspace from '../../components/Workspace';
import '../../styles/css/workspace.css';
import Project from '../../components/Project';
import { useLocation } from 'react-router-dom';
import {
    useState, 
    useEffect
} from 'react';


export default function WorkspacePage() {
    const { state: { workspace } = {} } = useLocation();
    const [ screens, setScreens ] = useState([]);
    const [ showOptions, setShowOptions ] = useState(false);
    const projects = workspace.workspace.allProjects;

    const getScreens = async() => {
        const projects = workspace.workspace.allProjects;
        const screens = (await Promise.all(projects.map(
            async (project) => zeplinApi.getProjectScreens(project),
          ))).flat();
        setScreens(screens);
    };

    const downloadScreenImages = async(e) => {
        e.preventDefault();
        const screenImages = await zeplinApi.downloadAllScreens(screens);
    };

    const showOptionsHandler = (e, action) => {
        e.preventDefault();
        setShowOptions(action);
    }
    
    useEffect(()=>{
        getScreens();
    }, [])

    return (
        <div> 
            <div id='projects-container'>
                <h3>{workspace.workspace.workspaceName == 'Personal Workspace' ? 'Personal' : workspace.workspace.workspaceName} Workspace</h3>
                <h4>Projects ({projects.length})</h4>
                <div id='projects'>
                    {projects.map((p, idx) => {
                        const projectScreens = screens.filter(screen => screen.projectName == p.name);
                        return (
                            <Project project={p} idx={idx} screens={projectScreens} workspace={workspace}/>
                        )
                    })}
                </div>
            </div>
            <div id='workspace-options'> 
                <span  id='workspace-options_more'className="material-symbols-outlined" onMouseOver={(e) => showOptionsHandler(e, true)} onMouseLeave={(e) => showOptionsHandler(e, false)}>
                    more_horiz
                </span>
                { showOptions ? (
                    <div className='workspace-options_buttons' onMouseOver={(e) => showOptionsHandler(e, true)} onMouseLeave={(e) => showOptionsHandler(e, false)}>
                        <button onClick={(e) => downloadScreenImages(e)}>Download All Screen Images</button>
                    </div>
                ) : (<></>) }
            </div>
        </div>
    )
};