// Styles are injected once at runtime so consumers don't need to import a CSS file.
const CSS = `
.v360 { position: relative; width: 100%; height: 100%; overflow: hidden; background: #f4f0ea; cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; outline-offset: -2px; }
.v360:active { cursor: grabbing; }
.v360__img { width: 100%; height: 100%; object-fit: contain; pointer-events: none; display: block; }
.v360__loading { position: absolute; inset: auto 0 0 0; padding: 12px 16px; background: rgba(255,255,255,.85); font-size: 13px; text-align: center; }
.v360__loading i { display: block; height: 3px; margin-top: 8px; background: #121212; transition: width .15s; }
.v360__bar { position: absolute; left: 12px; right: 12px; bottom: 12px; display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 999px; background: rgba(255,255,255,.9); box-shadow: 0 2px 10px rgba(0,0,0,.12); cursor: default; }
.v360__btn { width: 28px; height: 28px; border: 0; border-radius: 50%; background: #121212; color: #fff; font-size: 10px; cursor: pointer; flex: none; }
.v360__bar input { flex: 1; min-width: 0; accent-color: #121212; }
.v360__hint { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); padding: 6px 14px; border-radius: 999px; background: rgba(18,18,18,.75); color: #fff; font-size: 12px; pointer-events: none; }
`

export function injectStyles() {
  if (typeof document === 'undefined' || document.getElementById('rv360-styles')) return
  const el = document.createElement('style')
  el.id = 'rv360-styles'
  el.textContent = CSS
  document.head.appendChild(el)
}
