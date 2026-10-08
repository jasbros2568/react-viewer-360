# @jasbros2568/react-viewer-360

Drag-to-rotate **360° viewer** for React, built from a sequence of images (the classic jewellery / product turntable).

- Mouse, touch and pen drag (vertical page scroll still works on touch)
- Scrub slider, play/pause, auto-spin until the user interacts
- Keyboard: `←` `→` step a frame, `Space` toggles spin
- Preloads all frames with a progress bar so rotation is instant
- Respects `prefers-reduced-motion`
- No dependencies besides React · styles are injected automatically · TypeScript types included

## Install

```bash
npm i @jasbros2568/react-viewer-360
```

Requires React 18 or newer.

## Usage

```jsx
import Viewer360 from '@jasbros2568/react-viewer-360'

// A URL template with {i} (0-based) plus the number of frames
export function Ring() {
  return (
    <div style={{ width: 480, aspectRatio: '1' }}>
      <Viewer360 src="https://cdn.example.com/ring/frame_{i}.webp" count={90} alt="Ring 360° view" />
    </div>
  )
}

// or an explicit list of URLs
<Viewer360 frames={['/a.jpg', '/b.jpg', '/c.jpg']} />
```

The viewer fills its parent, so give the parent a width and height (or an `aspect-ratio`).

When the frames change (for example a different colour), give the component a `key` so it resets:

```jsx
<Viewer360 key={color} src={frames[color].src} count={frames[color].count} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | – | Frame URL containing `{i}`, e.g. `…/frame_{i}.webp` |
| `count` | `number` | – | Number of frames when using `src` |
| `frames` | `string[]` | – | Explicit frame URLs (use instead of `src`/`count`) |
| `alt` | `string` | `360° view` | Accessible label |
| `autoplay` | `boolean` | `true` | Spin until the first interaction (off for reduced motion) |
| `speed` | `number` | `60` | Milliseconds per frame while spinning |
| `sensitivity` | `number` | `1` | Drag multiplier; `1` = one container width per full turn |
| `reverse` | `boolean` | `false` | Flip the drag direction |
| `className` | `string` | `''` | Extra class on the root element |

## Styling

The root element has the class `v360`; override it in your CSS (for example `.v360 { background: #fff; border-radius: 12px; }`).
Other classes: `v360__img`, `v360__bar`, `v360__btn`, `v360__hint`, `v360__loading`.

## Server-side rendering

Safe for SSR (Next.js, Remix): nothing touches `window` or `document` until it runs in the browser. In Next.js App Router, use it from a Client Component (`'use client'`).

## License

MIT
