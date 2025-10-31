import React from 'react'

export default function Journal({nav}){
  const items = [
    {id:'demo1', date:'2025-10-29', title:'Силовая', dur:75, intensity:'средне'}
  ]
  return (
    <>
      <section className="card vstack">
        <div className="title" style={{fontSize:16}}>Совет дня</div>
        <div className="subtitle">Разминка плеч 5–7 минут перед жимом.</div>
        <div><a className="link" onClick={()=>nav('coach')}>Спросить у тренера</a></div>
      </section>
      <section className="vstack">
        {items.map(it=>(
          <div key={it.id} className="card row">
            <div className="vstack" style={{flex:1}}>
              <div className="one-line">{new Date(it.date).toLocaleDateString()} • {it.title} • {Math.round(it.dur/60)}ч {it.dur%60}м • {it.intensity}</div>
            </div>
            <a className="btn primary" onClick={()=>nav('add')}>Добавить</a>
          </div>
        ))}
      </section>
    </>
  )
}
