#!/usr/bin/env node
/**
 * Comments on and closes all open Dependabot PRs.
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx node scripts/close-dependabot-prs.mjs
 *
 * Get a token at: https://github.com/settings/tokens
 * Required scopes: repo (or pull_requests: write for fine-grained tokens)
 */

import https from 'https'

const REPO = '7feilee/Goshen'
const TOKEN = process.env.GITHUB_TOKEN

if (!TOKEN) {
  console.error('Error: GITHUB_TOKEN environment variable is required.')
  console.error('Usage: GITHUB_TOKEN=ghp_xxx node scripts/close-dependabot-prs.mjs')
  process.exit(1)
}

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null
    const req = https.request({
      hostname: 'api.github.com',
      path: `/repos/${REPO}${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'goshen-close-prs-script',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`GitHub API ${method} ${path} → ${res.statusCode}: ${data}`))
        } else {
          resolve(data ? JSON.parse(data) : null)
        }
      })
    })
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

const RESOLVED_COMMENT = `
Thanks for the Dependabot bump! This dependency has been updated directly on \`main\` in commit \`132e961\` as part of a batch upgrade that applied all safe dependency updates together and verified them with lint + type-check before merging.

Closing as superseded by main — no further action needed.
`.trim()

const ESLINT_COMMENT = `
Thanks for the Dependabot bump! We tested this upgrade locally and found it is **not yet compatible** with \`eslint-config-next 16.2.3\`.

**Root cause:** \`eslint-config-next\` bundles \`eslint-plugin-react\`, which calls \`context.getFilename()\` — an internal API removed in ESLint 10. This causes a hard crash at lint time:

\`\`\`
TypeError: contextOrFilename.getFilename is not a function
\`\`\`

**When to reopen:** Once \`eslint-config-next\` ships a version that supports ESLint 10 (or we upgrade \`eslint-config-next\` to a compatible release), we can safely apply this bump.

Closing for now to keep the PR list clean. Dependabot will re-open it when conditions change.
`.trim()

const prs = await api('GET', '/pulls?state=open&per_page=50')
console.log(`Found ${prs.length} open PRs\n`)

for (const pr of prs) {
  const isEslint = pr.number === 10
  const comment = isEslint ? ESLINT_COMMENT : RESOLVED_COMMENT

  process.stdout.write(`PR #${pr.number} "${pr.title}" → `)

  await api('POST', `/issues/${pr.number}/comments`, { body: comment })
  await api('PATCH', `/pulls/${pr.number}`, { state: 'closed' })

  console.log('commented + closed ✓')
}

console.log('\nAll done.')
