// Write a React.js code snippet using React hooks to implement a breadcrumbs component in a React application.

// In a web application, breadcrumbs are a navigation aid that provides users with a visual representation of their location within the site's hierarchy. Breadcrumbs typically appear near the top of a page and display a trail of links, each representing a level in the hierarchy leading to the current page.

import React, { useState, useEffect } from 'react'

export default function Breadcrumbs () {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        //set breadcrumbs data here
        const breadcrumbData = [
            { label: 'Dashboard', path: '/dashboard' },   
            { label: 'Client', path: '/client' },
            { label: 'Project', path: '/project' },   
        ];
        setBreadcrumbs(breadcrumbData);
    }, []);

    return (
        <section className='timeline-landing' style={{height:"0px",marginLeft:"5px",marginTop:"-5px"}} >
            <nav area-label='breadcrumb' >
                <ol className='breadcrumb'>
                    {
                        breadcrumbs.map((breadcrumb, index) => (
                            <li  key={index} className='breadcrumb-item'  >
                                {
                                    index === breadcrumbs.length ? (
                                        <span style={{color:"black"}}>
                                            {breadcrumb.label}
                                        </span>
                                    ) : (
                                        <a style={{color:"black"}} href={breadcrumb.path}>
                                            {breadcrumb.label}
                                        </a>
                                    )
                                }
                            </li>
                        ))
                    }
                </ol>
            </nav>
        </section>
    )
}