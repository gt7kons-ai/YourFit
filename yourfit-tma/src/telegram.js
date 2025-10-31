// Minimal Telegram WebApp helpers
export function initTelegram() {
  const tg = window.Telegram?.WebApp
  if (!tg) return null
  try { tg.ready() } catch {}
  // BackButton will be controlled per-view
  applyTheme(tg.themeParams)
  tg.onEvent?.('themeChanged', () => applyTheme(tg.themeParams))
  tg.onEvent?.('theme_changed', () => applyTheme(tg.themeParams)) // compatibility
  return tg
}

export function applyTheme(tp={}){
  const root = document.documentElement.style
  if (tp.bg_color) root.setProperty('--bg', tp.bg_color)
  if (tp.secondary_bg_color) root.setProperty('--bg-secondary', tp.secondary_bg_color)
  if (tp.text_color) root.setProperty('--text', tp.text_color)
  if (tp.hint_color) root.setProperty('--text-muted', tp.hint_color)
  if (tp.button_color) root.setProperty('--brand', tp.button_color)
  if (tp.button_text_color) root.setProperty('--accent', tp.button_text_color)
  if (tp.section_bg_color) root.setProperty('--card', tp.section_bg_color)
  if (tp.link_color) root.setProperty('--brand', tp.link_color)
}

export function toast(msg){
  let el = document.querySelector('#__toast')
  if(!el){
    el = document.createElement('div')
    el.id='__toast'; el.className='toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.classList.remove('hidden')
  setTimeout(()=>el.classList.add('hidden'), 1500)
}
