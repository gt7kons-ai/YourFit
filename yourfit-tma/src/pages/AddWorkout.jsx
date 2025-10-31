import React from 'react'

export default function AddWorkout({nav}){
  const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null
  const [type,setType]=React.useState('')
  const [dt,setDt]=React.useState(()=>new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16))
  const [h,setH]=React.useState(1)
  const [m,setM]=React.useState(0)
  const [intens,setIntens]=React.useState('medium')
  const [feel,setFeel]=React.useState('ok')

  const duration = h*60+m
  const valid = type && duration>0 && dt

  React.useEffect(()=>{
    if(!tg) return
    tg.MainButton.setText('Сохранить тренировку')
    valid ? tg.MainButton.enable() : tg.MainButton.disable()
    tg.MainButton.show()
    const onClick = async ()=>{
      if(!valid) return
      const payload = {
        type: type==='strength'?'strength':type==='cardio'?'cardio':'group',
        startISO: new Date(dt).toISOString(),
        durationMin: duration,
        intensity: intens,
        feeling: feel,
        createdAt: new Date().toISOString()
      }
      try{
        const api = import.meta.env.VITE_API_URL
        if(api){
          const r = await fetch(api+'/api/workouts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
          if(!r.ok) throw new Error('HTTP '+r.status)
        }else{
          tg.sendData(JSON.stringify({kind:'workout_simple', data: payload}))
        }
        tg.HapticFeedback?.notificationOccurred?.('success')
        tg.showPopup?.({title:'Готово 💪',message:'Тренировка сохранена!'},()=> nav('journal'))
      }catch(e){
        tg.HapticFeedback?.notificationOccurred?.('error')
        tg.showAlert?.('Не удалось сохранить: '+(e.message||'ошибка'))
      }
    }
    tg.onEvent('mainButtonClicked', onClick)
    return ()=>{ tg.offEvent('mainButtonClicked', onClick); tg.MainButton.hide() }
  },[tg,type,dt,h,m,intens,feel,valid,nav])

  return (
    <section className="vstack">
      <div className="card vstack">
        <div className="title" style={{fontSize:16}}>Добавить тренировку</div>
        <div className="chips">
          {['strength','cardio','group'].map(v=>(
            <button key={v} className={'chip'+(type===v?' active':'')} onClick={()=>setType(v)}>{v==='strength'?'Силовая':v==='cardio'?'Кардио':'Групповая'}</button>
          ))}
        </div>
        <label>Дата и время
          <input className="btn" type="datetime-local" value={dt} onChange={e=>setDt(e.target.value)} />
        </label>
        <div className="row">
          <label>Часы
            <select className="btn" value={h} onChange={e=>setH(+e.target.value)}>
              {Array.from({length:6},(_,i)=>i).map(x=><option key={x} value={x}>{x}</option>)}
            </select>
          </label>
          <label>Минуты
            <select className="btn" value={m} onChange={e=>setM(+e.target.value)}>
              {[0,15,30,45].map(x=><option key={x} value={x}>{x}</option>)}
            </select>
          </label>
        </div>
        <div className="chips">
          {['easy','medium','hard'].map(v=>(
            <button key={v} className={'chip'+(intens===v?' active':'')} onClick={()=>setIntens(v)}>{v==='easy'?'Легко':v==='medium'?'Средне':'Жёстко'}</button>
          ))}
        </div>
        <div className="chips">
          {['bad','ok','good'].map(v=>(
            <button key={v} className={'chip'+(feel===v?' active':'')} onClick={()=>setFeel(v)}>{v==='bad'?'Плохо':v==='ok'?'Нормально':'Отлично'}</button>
          ))}
        </div>
        {!valid && <div className="small">Выбери тип и длительность &gt; 0 — и можно сохранять 🚀</div>}
      </div>
    </section>
  )
}
