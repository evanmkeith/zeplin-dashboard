import React from 'react'; 

export default function Screen({ screen, idx, projectId }) {
    console.log(projectId)
    const screenUrl = `https://app.zeplin.io/project/${projectId}/screen/${screen.id}`

    return (
        <div className='screen' key={idx}>
            <a className='screen-link' href={screenUrl} target='_blank'><img className='screen-image' src={screen.image.thumbnails.large} alt={screen.name}/>
            <p className='screen-title'>{screen.name}</p></a>
        </div>
    )
};
