import * as zeplinApi from '../../api/zeplin.service';
import {
    useState, 
    useEffect
} from 'react';


export default function Workspaces({ projects, user }) {
    // const [ projects, setProjects ] = useState([]);

    // useEffect(() => {
    //     console.log(projects);
    // }, [projects]);

    // const getProjects = async(e) => {
    //     e.preventDefault();
    //     await zeplinApi.getAllProjects().then((res) => {
    //        setProjects(res);
    //     });
    // };
    const allProjects = projects[0].allProjects;

    return (
        <div> 
            <h1>Projects</h1>
            <p>Projects:</p>
            <ul>
                { allProjects ? allProjects.map((project, idx) => {
                    return (
                        <li key={idx}>
                            <p>
                                {project.name}
                            </p>
                        </li>
                    )
                }) : (<p>No projects </p>)} 
            </ul>
        </div>
    )

};