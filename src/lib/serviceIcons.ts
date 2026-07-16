import fs from 'node:fs'
import path from 'node:path'

// Fallback line-art icon assets from /public (used when a service has no
// iconImage set in Sanity) — recolored to currentColor at build time so the
// wrapper controls opacity/color for the default + hover states.
const ICON_FILES = ['short-form-editing', 'long-form-editing', 'motion-graphics', 'color-grading', 'audio-enhancement', 'video-clipping']

function loadIcon(filename: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'public', `${filename}.svg`)
    let svg = fs.readFileSync(filePath, 'utf-8')
    svg = svg.replace(/fill="white"/gi, 'fill="currentColor"')
    svg = svg.replace(/\s*opacity="0\.7"/gi, '')
    svg = svg.replace('<svg ', '<svg class="w-full h-full" ')
    return svg
  } catch {
    return null
  }
}

export const fallbackServiceIcons = ICON_FILES.map(loadIcon)

// Row dividers (top/bottom) use normal borders — fine, since each cell's
// top/bottom edge is only ever shared with the cell directly above/below in
// the same column, no cross-column rounding involved. Column dividers use
// the grid's own gap-x-px + divider-colored background instead of per-cell
// borders, since a container split into `cols` `1fr` tracks can leave a
// sub-pixel hairline gap between adjacent cells' borders.
export function serviceCellBorderClass(i: number, cols = 3) {
  const col = i % cols
  const row = Math.floor(i / cols)
  const classes = ['md:border-b', 'md:border-b-border-light']
  if (row === 0) classes.push('md:border-t', 'md:border-t-border-light')
  if (col === 0) classes.push('md:border-l', 'md:border-l-border-light')
  if (col === cols - 1) classes.push('md:border-r', 'md:border-r-border-light')
  return classes.join(' ')
}
