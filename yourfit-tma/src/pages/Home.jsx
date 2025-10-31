import React from 'react'
import { toast } from '../telegram.js'

const recipes = [
  'Овсянка с йогуртом и ягодами',
  'Курица с булгуром',
  'Творожные оладьи без сахара',
  'Салат с тунцом и фасолью',
  'Лосось на пару с брокколи',
  'Киноа с овощами и яйцом'
]

function pickRecipe(){
  const d = new Date()
  const day = Math.floor((d - new Date(d.getFullYear(),0,0))/86400000)
  const idx = day % recipes.length
  return recipes[idx]
}

function Ring({value=0, total=3}){
  const pct = Math.min(1, value/total)
  const R=44, C=2*Math.PI*R, off=C*(1-pct)
  return (
    <div className="progress-ring">
      <svg width="96" height="96">
        <circle cx="48" cy="48" r={R} stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="none"/>
        <circle cx="48" cy="48" r={R} stroke="var(--brand)" strokeWidth="8" fill="none" strokeDasharray={C} strokeDashoffset={off} strokeLinecap="round"/>
      </svg>
      <div className="ring-num">{Math.round(pct*100)}%</div>
    </div>
  )
}

export default function Home({nav}){
  const [weekly,setWeekly] = React.useState({goal:3, done:1, streak:2})
  const [todayMood,setTodayMood] = React.useState(()=>localStorage.getItem('yf_todayMood')||'')
  const recipeTitle = pickRecipe()

  function setMood(m){
    setTodayMood(m)
    localStorage.setItem('yf_todayMood', m)
    try{ window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light') }catch{}
    toast('Отмечено')
  }

  const last = { date:'Ср, 29 окт', dur:'1ч 15м', inten:'средне', id:'demo1' }

  return (
    <>
      <section className="card vstack">
        <h1 className="title">Привет! 👋</h1>
        <div className="subtitle">На этой неделе {weekly.done}/{weekly.goal} тренировок</div>
      </section>

      <section className="card row">
        <Ring value={weekly.done} total={weekly.goal}/>
        <div className="vstack" style={{flex:1}}>
          <div className="title">Цель недели</div>
          <div className="subtitle">Прогресс {weekly.done}/{weekly.goal}</div>
          <div className="chips">
            <div className="chip">Стрик: {weekly.streak} дн.</div>
            <a className="link" onClick={()=>nav('journal')}>Открыть дневник</a>
          </div>
        </div>
      </section>

      <section className="card row">
        <div className="vstack" style={{flex:1}}>
          <div className="one-line">Последняя: {last.date} • {last.dur} • Интенсивность: {last.inten}</div>
          <a className="link small" onClick={()=>nav('journal')}>Детали</a>
        </div>
      </section>

      <section className="card row">
        <div className="vstack" style={{flex:1}}>
          <div className="small">ПП-идея дня 🥗</div>
          <div className="one-line title" style={{fontSize:16}}>{recipeTitle}</div>
        </div>
        <button className="btn" onClick={()=>nav('food')}>Открыть “Еда”</button>
      </section>

      <section className="card vstack">
        <div className="title" style={{fontSize:16}}>Самочувствие сейчас</div>
        <div className="chips">
          <button className="chip" onClick={()=>setMood('bad')}>Плохо</button>
          <button className="chip" onClick={()=>setMood('ok')}>Нормально</button>
          <button className="chip" onClick={()=>setMood('good')}>Отлично</button>
        </div>
      </section>

      <div id="__toast" className="toast hidden">Отмечено</div>
    </>
  )
}
