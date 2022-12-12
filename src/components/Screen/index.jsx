import React from 'react'; 

export default function Screen({ screen, idx, projectId }) {
    console.log(projectId)
    const screenUrl = `https://app.zeplin.io/project/${projectId}/screen/${screen.id}`

    return (
        <div className='screen' key={idx}>
            <img className='screen-image' src={screen.image.thumbnails.large} alt={screen.name}/>
            <a className='screen-link' href={screenUrl} target='_blank'>{screen.name}</a>
        </div>
    )
};
