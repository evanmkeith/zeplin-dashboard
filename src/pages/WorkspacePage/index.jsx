import * as zeplinApi from '../../api/zeplin.service';
import Workspace from '../../components/Workspace';
import {
    useState, 
    useEffect
} from 'react';


export default function WorkspacePage({ workspace }) {

    return (
        <div> 
            <div> 
                {projects.map((w, idx) => {
                    return (<Workspace workspace={w} index={idx}/>)
                })}
            </div>
         
        </div>
    )

};