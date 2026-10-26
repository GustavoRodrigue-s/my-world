// Writes the mark as standalone SVG files (favicon, downloads, slides, social
// avatars), built from the same geometry as the <Mark> component so the two
// can never drift. Colors come from the design tokens, never retyped here.
//
//   cd packages/ui && npm run generate:brand
import { mkdirSync, writeFileSync } from 'fs'
import { tokens } from '@my-world/design-system'
import { MARK_GEOMETRY, MARK_ORBIT_PATH, markSatellitePath, type MarkVariant } from './react/mark'

const outDir = process.argv[2] ?? '../../apps/web/public/brand'
const g = MARK_GEOMETRY

const { light: day, dark: night } = tokens.portfolio
const ink = day.color.foreground
const paper = day.color.surface
const rubric = day.color.accent
const ember = night.color.accent
// The Capela's star: its ink and the rubric red (black and red, like a missal).
const chapelInk = tokens.chapel.light.color.foreground
const chapelRubric = tokens.chapel.light.color.accent

function svg(body: string, extra = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${g.box} ${g.box}" width="${g.box * 4}" height="${g.box * 4}">${extra}${body}</svg>\n`
}

function mark(color: string, satelliteColor: string, variant: MarkVariant = 'satellite') {
  return svg(
    `<path d="${MARK_ORBIT_PATH}" fill="none" stroke="${color}" stroke-width="${g.stroke}"/>` +
      `<circle cx="${g.cx}" cy="${g.cy}" r="${g.core}" fill="${color}"/>` +
      `<path d="${markSatellitePath(variant)}" fill="${satelliteColor}"/>`
  )
}

// Follows the OS: ink + rubric on light tab bars, paper + ember on dark ones.
const favicon = svg(
  `<path class="i" d="${MARK_ORBIT_PATH}" fill="none" stroke-width="${g.stroke}"/>` +
    `<circle class="f" cx="${g.cx}" cy="${g.cy}" r="${g.core}"/>` +
    `<path class="s" d="${markSatellitePath('satellite')}"/>`,
  `<style>.i{stroke:${ink}}.f{fill:${ink}}.s{fill:${rubric}}` +
    `@media (prefers-color-scheme:dark){.i{stroke:${paper}}.f{fill:${paper}}.s{fill:${ember}}}</style>`
)

const files: Record<string, string> = {
  'mark.svg': mark(ink, rubric),
  'mark-paper.svg': mark(paper, ember),
  'mark-mono.svg': mark(ink, ink),
  'mark-star.svg': mark(chapelInk, chapelRubric, 'star'),
  'mark-artifact.svg': mark(ink, rubric, 'artifact'),
  'favicon.svg': favicon,
}

mkdirSync(outDir, { recursive: true })
for (const [name, content] of Object.entries(files)) {
  writeFileSync(`${outDir}/${name}`, content)
  console.log(`✓ Gerado: ${outDir}/${name}`)
}
