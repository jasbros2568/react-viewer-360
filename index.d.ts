import type { ComponentType } from 'react'

export interface Viewer360Props {
  /** Array of frame URLs. Use this or `src` + `count`. */
  frames?: string[]
  /** Frame URL containing an `{i}` placeholder (0-based), e.g. `https://cdn/x/frame_{i}.webp`. */
  src?: string
  /** Number of frames when using `src`. */
  count?: number
  /** Accessible label. Default `360° view`. */
  alt?: string
  /** Spin until the first interaction. Default `true` (off for reduced motion). */
  autoplay?: boolean
  /** Milliseconds per frame while spinning. Default `60`. */
  speed?: number
  /** Drag multiplier; 1 = one container width per full turn. Default `1`. */
  sensitivity?: number
  /** Flip the drag direction. */
  reverse?: boolean
  /** Extra class on the root element. */
  className?: string
}

declare const Viewer360: ComponentType<Viewer360Props>
export { Viewer360 }
export default Viewer360
