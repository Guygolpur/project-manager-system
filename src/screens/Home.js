import React, { useState, useEffect } from 'react'
import PersonalDetailsCard from '../components/PersonalDetailsCard'
import ProjectDetailsCard from '../components/ProjectDetailsCard'

function Home(props) {

    return (
        <div className="App-home">
            <PersonalDetailsCard />
            <ProjectDetailsCard />
        </div>
    )
}

export default Home