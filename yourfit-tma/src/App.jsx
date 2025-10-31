import React from 'react'
import { useHashRoute } from './router.js'
import Home from './pages/Home.jsx'
import Journal from './pages/Journal.jsx'
import Food from './pages/Food.jsx'
import Coach from './pages/Coach.jsx'
import Exercises from './pages/Exercises.jsx'
import AddWorkout from './pages/AddWorkout.jsx'

const Brand = { name:'YourFit', logo:'', color:'' }

export default function App(){
  const [route, nav] = useHashRoute()
  React.useEffect(()=>{ window.scrollTo(0,0) },[route])
  return (
    <div className="app">
      <div className="header"><strong>{Brand.name}</strong><span className="small">{new Date().toLocaleDateString()}</span></div>
      <div className="content">
        {route==='home' && <Home nav={nav} />}
        {route==='journal' && <Journal nav={nav} />}
        {route==='food' && <Food nav={nav} />}
        {route==='coach' && <Coach nav={nav} />}
        {route==='exercises' && <Exercises nav={nav} />}
        {route==='add' && <AddWorkout nav={nav} />}
      </div>
      <nav className="tabs">
        <a className={'tab '+(route==='home'?'active':'')} onClick={()=>nav('home')}>Главная</a>
        <a className={'tab '+(route==='journal'?'active':'')} onClick={()=>nav('journal')}>Дневник</a>
        <a className={'tab '+(route==='exercises'?'active':'')} onClick={()=>nav('exercises')}>Упражнения</a>
        <a className={'tab '+(route==='food'?'active':'')} onClick={()=>nav('food')}>Еда</a>
        <a className={'tab '+(route==='coach'?'active':'')} onClick={()=>nav('coach')}>Тренер</a>
      </nav>
    </div>
  )
}
