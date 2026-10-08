import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { injectStyles } from './styles'

injectStyles()

const mod = (n, m) => ((n % m) + m) % m

/**
 * Drag-to-rotate 360° product viewer built from a sequence of images.
 *
 * Provide frames either as `frames` (array of URLs) or as `src` (a URL with an
 * `{i}` placeholder) plus `count`.
 *
 * Props
 *  - frames, src, count   frame sources (see above)
 *  - alt                  accessible label
 *  - autoplay             spin until the first interaction (default true, off if reduced motion)
 *  - speed                ms per frame while spinning (default 60)
 *  - sensitivity          drag multiplier; 1 = one container width per full turn (default 1)
 *  - reverse              flip the drag direction
 *  - className            extra class on the root
 */
export default function Viewer360({ frames, src, count, alt = '360° view', autoplay = true, speed = 60, sensitivity = 1, reverse = false, className = '' }) {
  const list = useMemo(
    () => frames || Array.from({ length: count || 0 }, (_, i) => src.replace('{i}', i)),
    [frames, src, count],
  )
  const total = list.length
  const rootRef = useRef(null)
  const drag = useRef(null)
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [playing, setPlaying] = useState(() => autoplay && !(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches))
  const [touched, setTouched] = useState(false)
  const ready = total > 0 && loaded >= total

  // Preload every frame so rotation is instant; errors still count as "done".
  useEffect(() => {
    let cancelled = false
    let done = 0
    const imgs = list.map((url) => {
      const img = new Image()
      const finish = () => { if (!cancelled) setLoaded(++done) }
      img.onload = finish
      img.onerror = finish
      img.src = url
      return img
    })
    return () => {
      cancelled = true
      imgs.forEach((img) => { img.onload = null; img.onerror = null })
    }
  }, [list])

  // Auto-spin until the user takes over.
  useEffect(() => {
    if (!playing || !ready) return
    const id = setInterval(() => setIndex((i) => mod(i + 1, total)), speed)
    return () => clearInterval(id)
  }, [playing, ready, speed, total])

  const onPointerDown = (e) => {
    if (!ready) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, start: index }
    setPlaying(false)
    setTouched(true)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const width = rootRef.current.clientWidth || 1
    const frames = Math.round(((e.clientX - drag.current.x) * sensitivity * total) / width)
    setIndex(mod(drag.current.start + (reverse ? -frames : frames), total))
  }
  const onPointerUp = () => { drag.current = null }

  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      setPlaying(false)
      setTouched(true)
      setIndex((i) => mod(i + (e.key === 'ArrowRight' ? 1 : -1), total))
    } else if (e.key === ' ') {
      e.preventDefault()
      setPlaying((p) => !p)
    }
  }, [total])

  if (!total) return null

  return (
    <div
      ref={rootRef}
      className={`v360 ${className}`}
      role="group"
      aria-roledescription="360 degree viewer"
      aria-label={alt}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img className="v360__img" src={list[index]} alt={alt} draggable={false} />

      {!ready && (
        <div className="v360__loading" role="status">
          <span>Loading 360° view… {Math.round((loaded / total) * 100)}%</span>
          <i style={{ width: `${(loaded / total) * 100}%` }} />
        </div>
      )}

      {ready && (
        <div className="v360__bar" onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" className="v360__btn" onClick={() => { setPlaying((p) => !p); setTouched(true) }} aria-label={playing ? 'Pause rotation' : 'Play rotation'}>
            {playing ? '❚❚' : '▶'}
          </button>
          <input
            type="range"
            min={0}
            max={total - 1}
            value={index}
            onChange={(e) => { setPlaying(false); setTouched(true); setIndex(Number(e.target.value)) }}
            aria-label="Rotate"
          />
        </div>
      )}

      {ready && !touched && <span className="v360__hint">Drag to rotate</span>}
    </div>
  )
}
