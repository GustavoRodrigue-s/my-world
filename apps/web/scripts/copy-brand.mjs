// Copies the brand SVGs built by the design system (packages/design-system,
// `generated/brand/`) into public/brand, where Next serves them. Runs before
// `dev` and `build`; public/brand is not committed.
import { cpSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const from = dirname(fileURLToPath(import.meta.resolve('@my-world/design-system/brand/favicon.svg')))
const to = fileURLToPath(new URL('../public/brand', import.meta.url))
rmSync(to, { recursive: true, force: true })
cpSync(from, to, { recursive: true })
