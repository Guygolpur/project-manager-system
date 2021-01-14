import React, { useState, useEffect } from 'react'
import PersonalDetailsCard from '../components/PersonalDetailsCard'
import ProjectDetailsCard from '../components/ProjectDetailsCard'
import ProjectsDetailTable from '../components/ProjectsDetailTable'

function Home(props) {

    return (
        <div className="App-home">
            <PersonalDetailsCard />
            <ProjectsDetailTable />
            {/* <ProjectDetailsCard /> */}
        </div>
    )
}

export default Home