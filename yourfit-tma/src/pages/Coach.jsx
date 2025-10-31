import React from 'react'
export default function Coach(){
  const [text,setText]=React.useState('Привет, составь мне короткую разминку на плечи (5–7 минут).')
  const [resp,setResp]=React.useState('')
  async function send(){
    setResp('⏳ Думаю...')
    try{
      const url = '/api/ai-chat'
      const r = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:text}]})})
      if(!r.ok) throw new Error('HTTP '+r.status)
      const j = await r.json()
      setResp(j.text || 'Готово.')
    }catch(e){
      setResp('Не удалось получить ответ.')
    }
  }
  return (
    <section className="vstack">
      <div className="card vstack">
        <div className="title" style={{fontSize:16}}>Тренер (AI)</div>
        <textarea rows="3" className="btn" value={text} onChange={e=>setText(e.target.value)} />
        <button className="btn primary" onClick={send}>Отправить</button>
      </div>
      {resp && <div className="card"><div>{resp}</div><div className="small">* не медсовет</div></div>}
    </section>
  )
}
