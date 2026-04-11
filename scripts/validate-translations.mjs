#!/usr/bin/env node
/**
 * Validates that all locale translation files have the same keys as the English source.
 * Run with: node scripts/validate-translations.mjs
 * Also runs in CI on every PR.
 */

import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

const MESSAGES_DIR = join(process.cwd(), 'messages')
const SOURCE_LOCALE = 'en'

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    return typeof value === 'object' && value !== null
      ? flattenKeys(value, fullKey)
      : [fullKey]
  })
}

const sourceFile = join(MESSAGES_DIR, SOURCE_LOCALE, 'common.json')
const source = JSON.parse(readFileSync(sourceFile, 'utf-8'))
const sourceKeys = new Set(flattenKeys(source))

const locales = readdirSync(MESSAGES_DIR).filter(
  (d) => d !== SOURCE_LOCALE && existsSync(join(MESSAGES_DIR, d, 'common.json'))
)

let hasErrors = false

for (const locale of locales) {
  const file = join(MESSAGES_DIR, locale, 'common.json')
  const translation = JSON.parse(readFileSync(file, 'utf-8'))
  const translationKeys = new Set(flattenKeys(translation))

  const missing = [...sourceKeys].filter((k) => !translationKeys.has(k))
  const extra = [...translationKeys].filter((k) => !sourceKeys.has(k))

  if (missing.length || extra.length) {
    hasErrors = true
    console.error(`\n❌ ${locale}/common.json`)
    if (missing.length) {
      console.error(`   Missing keys (${missing.length}):`)
      missing.forEach((k) => console.error(`     - ${k}`))
    }
    if (extra.length) {
      console.error(`   Extra keys not in English source (${extra.length}):`)
      extra.forEach((k) => console.error(`     + ${k}`))
    }
  } else {
    console.log(`✓ ${locale}/common.json`)
  }
}

if (hasErrors) {
  console.error('\n❌ Translation validation failed. Fix the issues above.')
  process.exit(1)
} else {
  console.log(`\n✅ All ${locales.length} translation files are valid.`)
}
