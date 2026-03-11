# US Tax Guide — CalcHub Reference

> A comprehensive guide to US tax concepts covered by CalcHub's US calculators.
> Organized from big picture → specific details. Based on 2026 tax year.
> Sources: IRS Publications, state tax department sites.

---

## Table of Contents

1. [The Big Picture](#1-the-big-picture)
2. [Federal Income Tax — Common Structure](#2-federal-income-tax--common-structure)
3. [Self-Employment Tax (1099)](#3-self-employment-tax-1099)
4. [W-2 vs 1099: Employee vs Self-Employed](#4-w-2-vs-1099-employee-vs-self-employed)
5. [Business Deductions](#5-business-deductions)
6. [State Income Tax](#6-state-income-tax)
7. [Estimated Quarterly Payments](#7-estimated-quarterly-payments)
8. [Commonly Confused Concepts](#8-commonly-confused-concepts)

---

## 1. The Big Picture

### 1-1. How the US Tax System Works

Unlike many countries, the US requires taxpayers to **self-report and self-pay** their taxes. There is no government-calculated tax bill — you file a return, compute what you owe, and pay.

```
US Tax Structure
├── Federal Taxes (paid to IRS)
│   ├── Income Tax — progressive rates on taxable income
│   ├── Self-Employment Tax — Social Security + Medicare for the self-employed
│   ├── Capital Gains Tax
│   └── Estate & Gift Tax
│
├── State Taxes (paid to state)
│   ├── State Income Tax — varies by state (0% to 13.3%)
│   ├── State Sales Tax
│   └── Property Tax
│
└── Payroll Taxes (employment-based)
    ├── FICA (employees) — Social Security 6.2% + Medicare 1.45%
    └── SE Tax (self-employed) — Social Security 12.4% + Medicare 2.9%
```

### 1-2. CalcHub's Coverage

| Calculator | Target User | Tax Types |
|-----------|-------------|-----------|
| 1099 Tax Calculator | Freelancers, independent contractors | Federal + SE Tax + State |
| W-2 vs 1099 Comparison | Workers choosing employment type | FICA vs SE Tax comparison |
| Home Office Deduction | Self-employed working from home | Business deduction |
| Mileage Deduction | Self-employed using personal vehicle | Business deduction |

### 1-3. The Core Tax Calculation Flow

Every federal income tax return follows this path:

```
Gross Income
  (−) Adjustments (SE Tax deduction, etc.)
= Adjusted Gross Income (AGI)
  (−) Deductions (Standard or Itemized)
= Taxable Income
  (×) Tax Brackets → Tax Liability
  (−) Credits
= Tax Owed (or Refund)
```

- **AGI**: The most important number on your return. Many deductions and credits phase out at certain AGI levels.
- **Taxable Income**: The amount that actually gets taxed.
- **Credits vs Deductions**: Credits reduce tax dollar-for-dollar; deductions reduce the income subject to tax.

---

## 2. Federal Income Tax — Common Structure

### 2-1. Filing Status

Your filing status determines your tax brackets, standard deduction, and eligibility for certain credits.

| Filing Status | Who Qualifies | Standard Deduction (2026) |
|--------------|---------------|--------------------------|
| **Single** | Unmarried, no dependents | $15,000 |
| **Married Filing Jointly (MFJ)** | Married couples filing together | $30,000 |
| **Head of Household (HoH)** | Unmarried with qualifying dependent | $22,500 |
| Married Filing Separately | Married couples filing apart | $15,000 |

> CalcHub supports Single, MFJ, and HoH.

### 2-2. Federal Tax Brackets (2026, Single)

The US uses a **marginal tax rate** system — each bracket only applies to income within that range.

| Taxable Income | Rate |
|---------------|------|
| $0 – $11,600 | 10% |
| $11,600 – $47,150 | 12% |
| $47,150 – $100,525 | 22% |
| $100,525 – $191,950 | 24% |
| $191,950 – $243,725 | 32% |
| $243,725 – $609,350 | 35% |
| Over $609,350 | 37% |

**Example — $80,000 Taxable Income (Single):**

| Bracket | Income in Bracket | Tax |
|---------|------------------|-----|
| 10% | $11,600 | $1,160 |
| 12% | $35,550 | $4,266 |
| 22% | $32,850 | $7,227 |
| **Total** | | **$12,653** |

- Marginal rate: 22% (the bracket your last dollar falls in)
- Effective rate: 15.8% ($12,653 ÷ $80,000)

### 2-3. Federal Tax Brackets — Married Filing Jointly (2026)

| Taxable Income | Rate |
|---------------|------|
| $0 – $23,200 | 10% |
| $23,200 – $94,300 | 12% |
| $94,300 – $201,050 | 22% |
| $201,050 – $383,900 | 24% |
| $383,900 – $487,450 | 32% |
| $487,450 – $731,200 | 35% |
| Over $731,200 | 37% |

### 2-4. Federal Tax Brackets — Head of Household (2026)

| Taxable Income | Rate |
|---------------|------|
| $0 – $16,550 | 10% |
| $16,550 – $63,100 | 12% |
| $63,100 – $100,500 | 22% |
| $100,500 – $191,950 | 24% |
| $191,950 – $243,700 | 32% |
| $243,700 – $609,350 | 35% |
| Over $609,350 | 37% |

### 2-5. Standard Deduction vs Itemized Deduction

Every filer chooses one:

| | Standard Deduction | Itemized Deduction |
|--|-------------------|-------------------|
| How it works | Fixed amount based on filing status | Sum of qualifying expenses |
| When to use | When itemized total < standard amount | When itemized total > standard amount |
| Common items | N/A | Mortgage interest, state/local taxes (SALT, capped at $10K), charitable donations, medical expenses (above 7.5% AGI) |

> Most filers take the standard deduction (~90% of taxpayers).

---

## 3. Self-Employment Tax (1099)

> CalcHub Calculator: `/us/1099-tax-calculator`

### 3-1. Who Is Self-Employed?

- Freelancers and independent contractors (receive 1099-NEC)
- Gig workers (Uber, DoorDash, Etsy sellers, etc.)
- Sole proprietors
- Anyone who earns $400+ in self-employment income

### 3-2. What Is Self-Employment Tax?

When you work for an employer, payroll taxes (FICA) are split 50/50. Self-employed individuals pay **both halves** — this is Self-Employment Tax.

```
FICA (Employee):
  Social Security: 6.2%  ← employer pays matching 6.2%
  Medicare:        1.45% ← employer pays matching 1.45%
  Total employee:  7.65%

SE Tax (Self-Employed):
  Social Security: 12.4% (both halves)
  Medicare:         2.9% (both halves)
  Total:           15.3%
```

### 3-3. SE Tax Calculation

```
① Net Business Income = Gross Income − Business Expenses
② SE Tax Base = Net Business Income × 92.35%
③ SE Tax = SE Tax Base × 15.3%
④ SE Tax Deduction = SE Tax × 50% (deductible from AGI)
```

**Why 92.35%?** The IRS only taxes 92.35% of net income to approximate the fact that employers don't pay payroll tax on their matching contribution. It's a fairness adjustment.

**Why 50% deduction?** Employees don't pay income tax on their employer's share of FICA. The 50% SE tax deduction gives self-employed individuals equivalent treatment.

### 3-4. Complete 1099 Tax Calculation

```
① Gross Income (total 1099 earnings)
② (−) Business Expenses
③ = Net Business Income
④ SE Tax = ③ × 92.35% × 15.3%
⑤ SE Tax Deduction = ④ × 50%
⑥ AGI = ③ − ⑤
⑦ Taxable Income = ⑥ − Standard Deduction
⑧ Federal Tax = progressive brackets on ⑦
⑨ State Tax = state-specific calculation
⑩ Total Tax = ④ + ⑧ + ⑨
⑪ Net Income = ③ − ⑩
⑫ Quarterly Payment = ⑩ ÷ 4
```

**Example — Freelance Developer, $120,000 gross, $20,000 expenses, Single, CA:**

| Line | Amount |
|------|--------|
| Net Business Income | $100,000 |
| SE Tax (100K × 92.35% × 15.3%) | $14,130 |
| SE Tax Deduction (50%) | $7,065 |
| AGI | $92,935 |
| Standard Deduction | $15,000 |
| Taxable Income | $77,935 |
| Federal Tax | ~$12,250 |
| CA State Tax | ~$3,200 |
| **Total Tax** | **~$29,580** |
| **Effective Rate** | **~29.6%** |
| Quarterly Payment | ~$7,395 |

### 3-5. Social Security Wage Base

Social Security tax (12.4% portion) only applies up to a wage base limit:

- **2026 limit**: ~$176,100 (adjusted annually for inflation)
- Income above this: only Medicare (2.9%) applies
- Additional Medicare Tax: 0.9% on income above $200K (single) / $250K (MFJ)

> CalcHub's current engine does not cap Social Security — a simplification for typical freelancer incomes.

---

## 4. W-2 vs 1099: Employee vs Self-Employed

> CalcHub Calculator: `/us/w2-vs-1099-calculator`

### 4-1. The Key Difference

The same $100,000 of income is taxed very differently depending on employment status:

| | W-2 Employee | 1099 Self-Employed |
|--|-------------|-------------------|
| Payroll tax | FICA 7.65% (employer pays other 7.65%) | SE Tax 15.3% (you pay both) |
| Business expenses | Generally not deductible | Deductible from gross income |
| Tax deduction for payroll | None needed (employer's share isn't your income) | 50% of SE Tax deductible |
| Benefits | Employer may provide (health, 401k match) | Self-funded |
| Filing | W-2 form, taxes withheld by employer | 1099-NEC, quarterly estimated payments |

### 4-2. When Is 1099 Better?

Despite the higher payroll tax rate, 1099 status can result in **lower total tax** when:

1. **Significant business expenses** — these reduce both income tax AND SE tax base
2. **Home office / mileage deductions** — exclusive to self-employed
3. **SEP IRA contributions** — self-employed can contribute up to 25% of net income (max ~$69,000)
4. **QBI deduction** — 20% deduction on qualified business income (Section 199A)

### 4-3. W-2 Tax Calculation

```
① Gross Income (salary)
② FICA = ① × 7.65%
③ Taxable Income = ① − Standard Deduction
④ Federal Tax = progressive brackets on ③
⑤ State Tax = state-specific
⑥ Total Tax = ② + ④ + ⑤
⑦ Net Income = ① − ⑥
```

### 4-4. Side-by-Side Example ($100K, Single, TX)

| | W-2 | 1099 (no expenses) | 1099 ($20K expenses) |
|--|-----|--------------------|--------------------|
| Gross Income | $100,000 | $100,000 | $100,000 |
| Net Business Income | — | $100,000 | $80,000 |
| Payroll/SE Tax | $7,650 | $14,130 | $11,304 |
| Federal Tax | ~$13,842 | ~$12,247 | ~$8,876 |
| State Tax (TX) | $0 | $0 | $0 |
| **Total Tax** | **~$21,492** | **~$26,377** | **~$20,180** |
| **Net Income** | **~$78,508** | **~$73,623** | **~$59,820** |

Key takeaway: Without expenses, W-2 wins. With $20K+ in legitimate expenses, 1099 can be competitive.

---

## 5. Business Deductions

### 5-1. Why Deductions Matter for Self-Employed

Business deductions reduce **net business income**, which reduces **both**:
- Federal/state income tax (via lower AGI)
- Self-employment tax (via lower SE tax base)

This double impact makes deductions especially powerful for 1099 workers.

### 5-2. Home Office Deduction

> CalcHub Calculator: `/us/home-office-deduction-calculator`

**Eligibility:** Must use space **regularly and exclusively** for business. Available only to self-employed (not W-2 remote workers).

**Two methods:**

| | Simplified Method | Regular Method |
|--|------------------|----------------|
| Calculation | $5 × office sq ft | (Office ÷ Home sq ft) × actual expenses |
| Maximum | $1,500 (300 sq ft cap) | No cap |
| Record-keeping | Minimal | Must track all home expenses |
| Best for | Small offices, low home costs | Large offices, high home costs |

**Regular Method Eligible Expenses:**
- Rent or mortgage interest (not principal)
- Utilities (electricity, water, gas, internet)
- Home insurance
- Repairs and maintenance
- Depreciation (for homeowners)

**Example — 200 sq ft office in 1,500 sq ft apartment, $2,400/mo rent:**

| Method | Calculation | Deduction |
|--------|------------|-----------|
| Simplified | 200 sq ft × $5 | **$1,000** |
| Regular | (200 ÷ 1,500) × $28,800 | **$3,840** |

→ Regular method wins when actual expenses are high relative to office size.

### 5-3. Mileage Deduction

> CalcHub Calculator: `/us/mileage-deduction-calculator`

**Eligibility:** Business miles driven for self-employment purposes. Commuting miles (home to office) do NOT count.

**Two methods:**

| | Standard Mileage Rate | Actual Expense Method |
|--|----------------------|----------------------|
| Calculation | Miles × $0.67/mile | Total vehicle costs × business use % |
| Tracking | Log miles only | Track all expenses + miles |
| Best for | Average vehicle costs | Expensive vehicles, high costs |

**Actual Expense Categories:**
- Gas / fuel
- Insurance
- Repairs and maintenance
- Depreciation
- Lease payments
- Registration, tolls, parking

**Example — 15,000 business miles, $8,000 total vehicle costs:**

| Method | Calculation | Deduction |
|--------|------------|-----------|
| Standard | 15,000 × $0.67 | **$10,050** |
| Actual | $8,000 × 100% business | **$8,000** |

→ Standard rate wins when vehicle costs per mile are below $0.67.

**Business Use Percentage:**
- If vehicle is used for both personal and business: only the business portion is deductible
- Example: 15,000 business miles out of 20,000 total = 75% business use

### 5-4. Other Common Deductions (Not in CalcHub, but important to know)

| Deduction | What | Limit |
|-----------|------|-------|
| SEP IRA | Retirement contributions | 25% of net SE income (max ~$69,000) |
| Health Insurance | Self-employed health premiums | 100% of premiums (up to net SE income) |
| QBI Deduction | Qualified Business Income | 20% of QBI (income limits apply) |
| Business Insurance | Liability, E&O insurance | Actual cost |
| Education | Business-related courses | Actual cost |
| Software & Tools | Business subscriptions | Actual cost |

---

## 6. State Income Tax

### 6-1. Overview

States independently levy income tax on top of federal tax. Rates and rules vary dramatically.

```
State Tax Landscape
├── No Income Tax (7 states)
│   TX, FL, WA, NV, WY, SD, AK
│   (+ NH and TN — no tax on wages)
│
├── Flat Tax States
│   IL (4.95%), CO (4.4%), etc.
│
└── Progressive Tax States
    CA (1%–13.3%), NY (4%–10.9%), etc.
```

### 6-2. States in CalcHub

| State | Tax Type | Top Rate | Standard Deduction | Notes |
|-------|---------|---------|-------------------|-------|
| **CA** | Progressive, 9 brackets | 13.3% | $5,540 | Highest state tax in US |
| **NY** | Progressive, 7 brackets | 10.9% | $8,000 | NYC has additional city tax (not in CalcHub) |
| **TX** | None | 0% | — | No state income tax |
| **FL** | None | 0% | — | No state income tax |
| **WA** | None | 0% | — | No state income tax |

### 6-3. California Tax Brackets (2026)

| Taxable Income | Rate |
|---------------|------|
| $0 – $10,412 | 1% |
| $10,412 – $24,684 | 2% |
| $24,684 – $38,959 | 4% |
| $38,959 – $54,081 | 6% |
| $54,081 – $68,350 | 8% |
| $68,350 – $349,137 | 9.3% |
| $349,137 – $418,961 | 10.3% |
| $418,961 – $698,271 | 11.3% |
| Over $698,271 | 12.3% |

> Mental tax rate for CA: ~$90K income → roughly 5-6% effective state rate.

### 6-4. New York Tax Brackets (2026)

| Taxable Income | Rate |
|---------------|------|
| $0 – $8,500 | 4% |
| $8,500 – $11,700 | 4.5% |
| $11,700 – $13,900 | 5.25% |
| $13,900 – $80,650 | 5.5% |
| $80,650 – $215,400 | 6% |
| $215,400 – $1,077,550 | 6.85% |
| Over $1,077,550 | 10.9% |

### 6-5. State Tax Impact on Location Decisions

For a freelancer earning $100K net (Single):

| State | State Tax | Total Tax (Federal + SE + State) | Net Income |
|-------|----------|--------------------------------|------------|
| TX / FL / WA | $0 | ~$26,400 | ~$73,600 |
| NY | ~$4,300 | ~$30,700 | ~$69,300 |
| CA | ~$4,800 | ~$31,200 | ~$68,800 |

→ Living in a no-income-tax state saves $4,000–$5,000/year at this income level.

---

## 7. Estimated Quarterly Payments

### 7-1. Why Quarterly Payments Exist

W-2 employees have taxes withheld each paycheck. Self-employed individuals must **pay as they go** by making quarterly estimated payments — or face an underpayment penalty.

### 7-2. Due Dates

| Quarter | Income Period | Payment Due |
|---------|-------------|-------------|
| Q1 | Jan 1 – Mar 31 | **April 15** |
| Q2 | Apr 1 – May 31 | **June 15** |
| Q3 | Jun 1 – Aug 31 | **September 15** |
| Q4 | Sep 1 – Dec 31 | **January 15** (next year) |

> Note: Q2 and Q3 cover uneven periods (2 months and 3 months respectively).

### 7-3. How Much to Pay

**Safe harbor rules** — pay at least one of these to avoid penalties:

1. **100% of prior year's tax** (110% if AGI > $150K)
2. **90% of current year's tax**

**Simple approach:** Total estimated tax ÷ 4 = each quarterly payment.

### 7-4. Underpayment Penalty

If you don't pay enough through quarterly payments:
- IRS charges interest on the underpayment (currently ~8% annually)
- Penalty is calculated per quarter, not annually
- Waived if total tax owed < $1,000

---

## 8. Commonly Confused Concepts

### Marginal Rate vs Effective Rate

| | Marginal Rate | Effective Rate |
|--|--------------|----------------|
| Definition | Tax rate on your **last dollar** | Total tax ÷ total income |
| Use | Evaluating impact of additional income | Understanding actual tax burden |
| Example ($80K single) | 22% | ~15.8% |

**Why it matters:** People often say "I'm in the 22% bracket" and assume they pay 22% on everything. They don't — they pay 10% on the first $11,600, 12% on the next chunk, and only 22% on the portion above $47,150.

### 1099-NEC vs 1099-MISC vs W-2

| Form | Who Gets It | For What |
|------|-------------|----------|
| **W-2** | Employees | Wages, salary, tips |
| **1099-NEC** | Independent contractors | Non-employee compensation ($600+) |
| **1099-MISC** | Various | Rents, royalties, prizes |

### FICA vs SE Tax

| | FICA | Self-Employment Tax |
|--|------|---------------------|
| Who pays | W-2 employees + employers | 1099 self-employed |
| Social Security | 6.2% (employee) + 6.2% (employer) | 12.4% (you pay both) |
| Medicare | 1.45% (employee) + 1.45% (employer) | 2.9% (you pay both) |
| Total rate | 7.65% (employee share) | 15.3% |
| Applied to | Gross wages | 92.35% of net SE income |

### Above-the-Line vs Below-the-Line Deductions

| | Above-the-Line | Below-the-Line |
|--|---------------|----------------|
| Where | Subtracted to get AGI | Subtracted from AGI |
| Availability | Available to all filers | Standard OR itemized (choose one) |
| Examples | SE tax deduction (50%), SEP IRA | Mortgage interest, SALT, charitable |
| Benefit | Reduces AGI (affects other phase-outs) | Only reduces taxable income |

### Standard Deduction vs Business Expenses

These are **not** either/or. Self-employed individuals get **both**:

```
Gross Income
  (−) Business Expenses        ← from Schedule C
  (−) SE Tax Deduction (50%)   ← above-the-line
= AGI
  (−) Standard Deduction       ← everyone gets this
= Taxable Income
```

A common misconception: "I take the standard deduction, so I can't deduct business expenses." **Wrong.** Business expenses (Schedule C) are completely separate from the standard/itemized deduction choice.

---

_This document is a reference guide for understanding CalcHub's US tax calculator logic. For actual tax filing, consult a licensed CPA or enrolled agent, or refer to official IRS publications._
