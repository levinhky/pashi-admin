import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const DefaultLayout= ({ children }) => {
    React.useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [children])
    return (
        <div>
            <div className='sidebar'><Sidebar/></div>
            <section className='home-section'>
                <nav><Navbar/></nav>
                <div className='home-content'>
                   {children}
                </div>
            </section>
        </div>
    )
}


export default DefaultLayout;