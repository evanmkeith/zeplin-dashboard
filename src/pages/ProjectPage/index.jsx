import * as zeplinApi from '../../api/zeplin.service';
import Workspace from '../../components/Workspace';
import Project from '../../components/Project';
import { useLocation } from 'react-router-dom';
import {
    useState, 
    useEffect
} from 'react';


export default function ProjectPage() {
    const { state } = useLocation();

    console.log(state);

    return (
        <div> 
            {/* <div> 
                <h4>{workspace.workspace.workspaceName == 'Personal Workspace' ? 'Personal' : workspace.workspace.workspaceName} Workspace  </h4>
            </div> */}
            {/* <button onClick={(e) => downloadScreenImages(e)}>Download All Screen Images</button> */}
        </div>
    )
};