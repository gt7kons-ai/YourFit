import React from 'react'
export const routes = ['home','journal','exercises','food','coach','add']
export function useHashRoute(){
  const [route,setRoute]=React.useState(get())
  React.useEffect(()=>{
    const on=()=>setRoute(get())
    window.addEventListener('hashchange',on); return ()=>window.removeEventListener('hashchange',on)
  },[])
  function get(){ return (location.hash.replace('#/','')||'home') }
  return [route,(r)=>location.hash = '/'+r]
}
