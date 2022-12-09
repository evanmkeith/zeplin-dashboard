import * as zeplinApi from '../../api/zeplin.service';
import Workspace from '../../components/Workspace';
import '../../styles/css/workspaces.css';
import {
    useState, 
    useEffect
} from 'react';


export default function Workspaces({ projects, user }) {

    return (
        <div id='workspaces-container'> 
            <h3>Workspaces</h3>
            <div id='workspaces'> 
                {projects.map((w, idx) => {
                    return (<Workspace workspace={w} index={idx}/>)
                })}
            </div>
        </div>
    )
};