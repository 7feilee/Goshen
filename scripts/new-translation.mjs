#!/usr/bin/env node
/**
 * Scaffolds a new translation file from the English source.
 * Copies all keys with values marked [TRANSLATE] so contributors know what to fill in.
 *
 * Usage: node scripts/new-translation.mjs fa
 *        node scripts/new-translation.mjs vi
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const locale = process.argv[2]

if (!locale) {
  console.error('Usage: node scripts/new-translation.mjs {locale-code}')
  console.error('Example: node scripts/new-translation.mjs fa')
  process.exit(1)
}

const MESSAGES_DIR = join(process.cwd(), 'messages')
const sourceFile = join(MESSAGES_DIR, 'en', 'common.json')
const targetDir = join(MESSAGES_DIR, locale)
const targetFile = join(targetDir, 'common.json')

if (existsSync(targetFile)) {
  console.error(`❌ ${targetFile} already exists. Delete it first if you want to regenerate.`)
  process.exit(1)
}

function markForTranslation(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'object' && value !== null
        ? markForTranslation(value)
        : `[TRANSLATE] ${value}`,
    ])
  )
}

const source = JSON.parse(readFileSync(sourceFile, 'utf-8'))
const scaffold = markForTranslation(source)

mkdirSync(targetDir, { recursive: true })
writeFileSync(targetFile, JSON.stringify(scaffold, null, 2) + '\n', 'utf-8')

console.log(`✅ Created ${targetFile}`)
console.log('')
console.log('Next steps:')
console.log(`  1. Open messages/${locale}/common.json`)
console.log('  2. Replace every "[TRANSLATE] ..." value with the correct translation')
console.log('  3. Add the locale to src/i18n/request.ts → locales array')
console.log('  4. Run: node scripts/validate-translations.mjs')
console.log('  5. Open a pull request!')
