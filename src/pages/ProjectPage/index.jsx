import * as zeplinApi from '../../api/zeplin.service';
import Screen from '../../components/Screen';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/css/projectPage.css';
import {
    useState, 
    useEffect
} from 'react';


export default function ProjectPage() {
    const navigate = useNavigate();
    const { state: {workspace, project, screens} = {} } = useLocation();
    const [ showOptions, setShowOptions ] = useState(false);
    const w = workspace.w;
    const projectId = project.project.id;

    console.log(workspace, project, screens);

    const showOptionsHandler = (e, action) => {
        e.preventDefault();
        setShowOptions(action);
    };

    const downloadScreenImages = async(e) => {
        e.preventDefault();
        const screenImages = await zeplinApi.downloadAllScreens(screens.screens);
    };

    return (
        <div> 
            <div id='screens-container'>
                <h3><span id='workspace-title_workspace'><span id='workspace-link' onClick={() => navigate(-1)}>{w.workspaceName == 'Personal Workspace' ? 'Personal' : w.workspaceName}</span> Workspace {' >> '}</span><span id='workspace-title_project'>{project.project.name} Project</span> </h3> 
                <h4>Screens ({screens.screens.length})</h4>
                <div id='screens'>
                    {screens.screens.map((screen, idx) => {
                        return (
                            <Screen screen={screen} idx={idx} projectId={projectId} /> 
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