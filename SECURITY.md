# Security Policy

## Scope

This project handles sensitive inputs from vulnerable users (immigration status, official letters). We take security seriously.

**In scope:**
- API key leakage or exposure
- Prompt injection attacks via the letter decoder or visa finder
- Any vulnerability that could expose user inputs to third parties
- Dependencies with known critical vulnerabilities

**Out of scope:**
- The accuracy of immigration information (use GitHub Issues for this)

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Email **security@immigrant-guide.dev** with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will acknowledge within 48 hours and aim to patch within 7 days.

## Our security practices

- No user inputs are logged or stored — all AI calls are stateless
- The Anthropic API key is server-side only (Vercel env vars), never exposed to the browser
- All AI responses include a disclaimer that they are not legal advice
- Dependencies are checked via `npm audit` in CI on every PR
