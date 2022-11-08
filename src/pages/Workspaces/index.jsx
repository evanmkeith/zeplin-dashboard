import * as zeplinApi from '../../api/zeplin.service';
import {
    useState, 
    useEffect
} from 'react';


export default function Workspaces() {
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        console.log(projects);
    }, [projects]);

    const getProjects = async(e) => {
        e.preventDefault();
        await zeplinApi.getAllProjects().then((res) => {
           setProjects(res);
        });
    };

    return (
        <div> 
            <h1>Projects</h1>
            <button onClick={(e) => getProjects(e)}>Get Projects</button>
            <p>Projects:</p>
            <ul>
                { projects.length ? projects.map((project, idx) => {
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