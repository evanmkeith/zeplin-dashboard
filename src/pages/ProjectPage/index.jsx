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
    const [ formats, setFromats ] = useState([]);
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

    const downloadProjectAssets = async(e) => {
        e.preventDefault();
        if(formats.length < 1){
            return alert('Please select a format or formats prior to downloading assets.')
        }
        const projectAssets = await Promise.all(screens.screens.map(
            (screen) => zeplinApi.getProjectAssetData(screen, projectId, formats),
          ));

        if(projectAssets.flat().length < 1) {
            return alert('There are no assets in that format, please select another and try again.')
        };

        return zeplinApi.downloadProjectAssets(projectAssets.flat());
    };

    const formData = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const selectedFormats = formats;
        if(checked) {
            selectedFormats.push(value);
            setFromats(selectedFormats);
        } else {
            const idx = selectedFormats.indexOf(value)
            selectedFormats.splice(idx, 1)
            setFromats(selectedFormats);
        };
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
            <div id='project-options'> 
                <span  id='project-options_more'className="material-symbols-outlined" onMouseOver={(e) => showOptionsHandler(e, true)} onMouseLeave={(e) => showOptionsHandler(e, false)}>
                    more_horiz
                </span>
                { showOptions ? (
                    <div className='project-options_buttons' onMouseOver={(e) => showOptionsHandler(e, true)} onMouseEnter={() => setFromats([])} onMouseLeave={(e) => showOptionsHandler(e, false)}>
                        <button onClick={(e) => downloadScreenImages(e)} className='download-button'>Download All Project Screen Images</button>
                        <div id='download-assets-container'>
                            <button onClick={(e) => downloadProjectAssets(e)} className='download-button'>Download All Project Assets</button>
                            <form id='download-assets-form' onChange={(e) => formData(e)}>
                                <label for='png'>png:</label>
                                <input key={Math.random()} type='checkbox' name='png' value='png'/>
                                <label for='jpg'>jpg:</label>
                                <input type='checkbox' name='jpg' value='jpg'/>
                                <label for='webp'>webp:</label>
                                <input type='checkbox' name='webp' value='webp'/>
                                <label for='svg'>svg:</label>
                                <input type='checkbox' name='svg' value='svg'/>
                                <label for='pdf'>pdf:</label>
                                <input type='checkbox' name='pdf' value='pdf'/> 
                            </form>
                        </div>
                    </div>
                ) : (<></>) }
            </div>
        </div>
    )
};