import React from 'react'
export default function Food({nav}){
  const [q,setQ]=React.useState('')
  return (
    <section className="vstack">
      <div className="card vstack">
        <div className="title" style={{fontSize:16}}>Еда</div>
        <input placeholder="Поиск по рецептам" value={q} onChange={e=>setQ(e.target.value)} className="btn" />
        <div className="subtitle">Здесь будут ПП-рецепты. Пока заглушка.</div>
      </div>
    </section>
  )
}
