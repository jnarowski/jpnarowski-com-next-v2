# Financial Tax Burden Calculator PRD

**Date:** October 16, 2025
**Version:** 1.0

## Overview

A web-based tax calculator designed to estimate federal tax liability on phantom equity payouts and model the impact of various tax reduction strategies. The tool will help users compare investment scenarios (business losses, real estate professional status, oil investments) to make informed decisions about tax optimization. Target launch: Today (initial version).

## Problem Statement

- **Problem:** Receiving a large phantom equity payout creates significant tax uncertainty. Without clear visibility into how different investment strategies affect tax burden, it's impossible to make informed decisions about whether pursuing real estate professional status, active business losses, or other strategies is worth the effort and capital allocation.
- **Why now:** Phantom equity payout is imminent, requiring immediate decision-making about tax strategy deployment before the tax year closes.
- **Cost of inaction:** Paying potentially hundreds of thousands more in taxes than necessary, or conversely, pursuing expensive tax strategies that don't materially improve outcomes.

## Objectives & Success Metrics

**Primary Objective:** Enable confident decision-making about tax strategy deployment by providing clear, accurate estimates of tax burden under different scenarios.

**Key Metrics:**

- Calculation accuracy within ±$5,000 of actual tax liability for standard scenarios
- User can model 3+ different strategies in under 5 minutes
- Tool is shared with 5+ family/friends within first month

**Measurement Timeline:**

- 30 days: Initial personal use validates calculation accuracy
- 60 days: Shared with family/friends, gather feedback on usability
- 90 days: Consider additional tax strategies based on user requests

## Users

**Primary Persona:** High-income individual receiving large one-time compensation event

- **Job to be done:** Understand true after-tax proceeds from phantom equity payout and determine if complex tax strategies (real estate professional, active business losses) are worth pursuing
- **Current frustrations:** Tax calculators are either too simple (don't handle strategies) or too complex (require CPA-level knowledge). No way to quickly model and compare multiple scenarios.

## Solution Requirements

| Requirement | Priority | User Story | Acceptance Criteria |
|-------------|----------|------------|---------------------|
| Base Tax Calculation | P0 | As a user, I want to enter my payout amount and annual income so that I can see my federal tax liability | Calculates federal income tax using 2025 brackets and rates; displays tax owed and net proceeds |
| Active Business Loss Strategy | P0 | As a user, I want to input active business losses so that I can see how they offset my tax burden | Reduces taxable income by loss amount; recalculates tax and displays savings |
| Real Estate Professional Strategy | P0 | As a user, I want to input real estate investments with REP status so that I can see potential tax benefits | Calculates passive loss offset when REP criteria met; shows tax impact |
| Oil Investment Strategy | P0 | As a user, I want to model oil & gas investments so that I can see intangible drilling cost deductions | Applies IDC deduction rules; shows immediate tax benefit |
| URL State Persistence | P0 | As a user, I want my inputs saved in the URL so that I can share or reload my scenario | All form inputs encoded in URL query params; state restored on page load |
| Multiple Strategy Comparison | P1 | As a user, I want to add multiple strategies simultaneously so that I can see combined effects | Supports adding 2+ strategies; shows cumulative tax impact |
| Calculation Transparency | P1 | As a user, I want to see how calculations are performed so that I can trust the results | Displays formulas, tax brackets applied, and step-by-step breakdown |
| Strategy Education | P1 | As a user, I want to understand each tax strategy so that I know if I might qualify | Info section with descriptions and qualification criteria for each strategy |
| FICA/Medicare Tax | P2 | As a user, I want to see payroll taxes so that I have complete picture | Includes FICA and Medicare calculations for W-2 income |
| State Tax Estimation | P3 | As a user, I want state tax calculations so that I see total liability | Future: Add state-specific calculations |

**Priority Levels:**
- P0 (Must Have) - MVP blockers
- P1 (Should Have) - Important but not blockers
- P2 (Could Have) - Nice to have
- P3 (Won't Have) - Future consideration

## Technical Specification

### Architecture Approach

- **Type:** Monolith (Next.js app within existing site)
- **API Style:** Client-side only (no backend needed)
- **Frontend:** SSR page with client-side calculations
- **Infrastructure:** Deployed with existing Next.js site (Vercel/similar)

### Technical Decisions

- **Core Stack:** Next.js 15 + React + TypeScript
- **Database:** None (URL-based state only)
- **Auth:** None (public tool)
- **Key Dependencies:**
  - Existing shadcn/ui components for consistent styling
  - URL query string management (URLSearchParams)
  - Tax calculation logic as pure TypeScript functions

### Integration Requirements

- **External Systems:** None
- **Data Sync:** URL query params update on input change
- **API Constraints:** N/A

### Performance Requirements

- **Response Time:** Instant calculation (<100ms) on input change
- **Scale:** Single-user calculations (no backend scale concerns)
- **Availability:** Matches main site availability

### Security & Compliance

- **Data Privacy:** No PII stored on server; all data in client-side URL params only
- **Compliance:** No compliance requirements (informational/educational tool only)
- **Auth Requirements:** None (public access)

**Important Disclaimer:** Tool must clearly state it provides estimates only and is not tax advice; users should consult tax professionals for actual tax planning.

## Constraints & Assumptions

**Constraints:**
- Must launch today (very tight timeline)
- 2025 federal tax law only (no historical years)
- Approximation accuracy (±$5K acceptable)
- No user accounts or server-side persistence

**Assumptions:**
- 2025 federal tax brackets and rates are finalized
- User has basic understanding of tax concepts (knows what W-2 income is)
- User inputs are reasonable/valid ranges
- Real estate professional status qualification is binary (yes/no)

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Tax law changes mid-year | Low | Medium | Add prominent "2025 tax year" label; plan for annual updates |
| Calculation errors mislead decisions | Medium | High | Include detailed formula breakdown; add disclaimer; validate against known test cases |
| Users misunderstand qualifications | Medium | Medium | Clear educational content; link to IRS resources; emphasize consulting professionals |
| URL length limits with complex scenarios | Low | Low | Use abbreviated param names; consider compression if needed |

## Out of Scope

- State income tax calculations (future consideration)
- Alternative Minimum Tax (AMT) calculations
- Capital gains vs ordinary income distinction
- Detailed real estate depreciation schedules
- Multi-year tax planning
- Saving/exporting scenarios (beyond URL sharing)
- Mobile app version
- User accounts or authentication

## Definition of Done

- [ ] User can input payout amount and annual income, see federal tax calculation
- [ ] User can add business loss strategy and see tax impact
- [ ] User can add real estate professional strategy and see tax impact
- [ ] User can add oil investment strategy and see tax impact
- [ ] All inputs persist in URL and restore on page reload
- [ ] Calculation breakdown section shows formulas and steps
- [ ] Educational section explains each strategy with qualification criteria
- [ ] Real estate professional definition clearly documented
- [ ] Disclaimer about educational/estimation purpose is prominent
- [ ] Tool matches site design system (purple accents, dark mode support)
- [ ] Page is publicly accessible at `/tools/tax-calculator` or similar route
- [ ] Validated against known test case: $1M W-2 income calculation
