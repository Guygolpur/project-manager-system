import React from 'react'
import PersonalDetailsCard from '../components/PersonalDetailsCard'
import ProjectsDetailTable from '../components/ProjectsDetailTable'

function Home() {

    return (
        <div className="App-home">
            <PersonalDetailsCard />
            <ProjectsDetailTable />
        </div>
    )
}

export default Home