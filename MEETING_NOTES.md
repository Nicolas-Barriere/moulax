# Moulax — Meeting Notes

**Date:** February 16, 2026  
**Participants:** William + Emile + Nico (brainstorming session)

---

## 1. Vision

Build a **local personal finance aggregator and advisor** — a "Finari"-like tool that consolidates all financial accounts in one place, tracks expenses automatically, and provides AI-powered budgeting and investment guidance.

The core motivation: **"I'm too lazy to open Excel and manually track expenses for two weeks."** The tool should work continuously, with minimal manual input.

---

## 2. Core Features Discussed

### 2.1 Multi-Account Aggregation
- Consolidate balances from **all** accounts in one view:
  - **Banks:** Boursorama, Caisse d'Épargne, La Banque Postale
  - **Neobanks:** Revolut
  - **Brokerage:** Bourse Direct
  - **Crypto:** Binance, hardware wallet (Ledger)
  - **Savings:** Livret Jeune, Assurance Vie
- Show total net worth and per-account breakdown

### 2.2 Expense Tracking & Budgeting
- Automatic categorization of expenses (food, subscriptions, transport, etc.)
- Monthly dashboard: how much spent, on what, vs. budget
- Subscription tracking (Spotify, Prime, etc.)
- Voice/dictation input: "I just spent 30€ on groceries" and it logs it
- Photo receipt scanning (OCR)

### 2.3 Financial Projections & Planning
- **Monte Carlo simulations** for financial projections
- Know upcoming expenses (e.g., metro pass renewal next month)
- Goal-based planning: "I want 800€ for a summer trip — can I save that?"
  - AI suggests a savings plan and where to source the money
- Long-term projection: real estate purchase, starting a company

### 2.4 Investment Tracking & Advice
- Portfolio visualization: asset allocation by type (stocks, bonds, crypto, cash)
- Rate of return tracking per product
- Flag bad contracts (e.g., insurance with 4% management fees)
- Basic AI-powered allocation suggestions:
  - "I want 60% equity, 10% bonds, 10% crypto"
  - "I feel like taking more risk" → adjust recommendations
  - Adapt advice based on time horizon and upcoming expenses

### 2.5 AI Chatbot Interface
- Natural language queries: "How much did I spend on food last month?"
- Interactive budgeting: "I don't want to spend more than X on Y"
- Smart suggestions: which account to pull money from for a large expense
- **Not** autonomous decision-making — the user stays in control, the AI plans and advises

---

## 3. Technical Discussion

### 3.1 Data Access — The Biggest Challenge

| Method | Pros | Cons |
|--------|------|------|
| **Bank APIs** | Clean, real-time | Most French banks don't offer public APIs (Boursorama has none) |
| **CSV Export** | Available everywhere | Manual, requires logging into each bank |
| **Open Banking (PSD2/DSP2)** | Standardized, all EU banks must comply | Requires being an authorized third-party provider (ACPR) or paying a data provider |
| **Browser Automation** (Playwright, Chrome extension) | Can scrape any bank site | Fragile, security concerns, banks may block |
| **Aggregator APIs** (Budget Insight, Powens, Plaid) | Professional-grade | Costly, the user pays or becomes a paying customer |

**Consensus:** Data access is the #1 friction point. Open Banking is the cleanest path but has regulatory/cost barriers. Browser automation (à la Claude Computer Use / Chrome extension) is a pragmatic fallback.

### 3.2 AI / LLM Strategy

- **Model choice:** Open-source, small models preferred — **Qwen** mentioned as strong for lightweight tasks
- **Self-hosting concerns:**
  - VPS too weak for LLM inference
  - GPU cloud instances are expensive and slow to boot
  - Idea: on-demand instances (spin up, run inference, shut down) but cold start + storage costs are a problem
- **Privacy:** Sending financial data (IBANs, balances, transactions) to external LLMs is a hard no
  - Local inference or self-hosted is preferred
  - The model sees expenses but should never have write access to accounts

### 3.3 Architecture Ideas

- **MCP (Model Context Protocol) tools** to let the AI call functions (fetch balances, categorize, simulate)
- Could start as a **CLI + local LLM** setup, evolve into a web dashboard
- Chrome extension approach for bank data scraping (inspired by Claude's browser use)

---

## 4. Inspirations

- **[Finary](https://finary.com):** French wealth tracker, does account aggregation and asset exposure analysis — but paid, and depends on third-party data providers
- **[Public](https://public.com):** US investing app with an AI feature that creates custom stock screeners from natural language ("Invest in S&P 500 companies where CEOs bench more than 50kg") — impressive but hard to replicate
- **Linxo / Bankin':** French budget apps using Open Banking
- **La Mécanique des Comptes (Machinery scheme):** Shows which assets you're exposed to

---

## 5. Open Questions

1. **How to handle bank authentication securely?** Storing credentials is risky. Even encrypted, you need the user present to decrypt. Trade-off between convenience (24/7 auto-sync) and security.
2. **Is Open Banking accessible to indie developers?** Or do you need to go through (and pay) a licensed aggregator?
3. **How to prevent LLM hallucinations on financial advice?** Edge case: AI tells you to liquidate assets you can't access (PEA lock-in period, etc.)
4. **How to handle data the AI can't know?** E.g., "You can ask your parents for money" — the model lacks full context of the user's life.
5. **Cost model for self-hosting?** Shared instance among friends? Pay-per-use cloud?

---

## 6. Personal Insights & Recommendations

### What's strong about this idea
- **Real pain point.** Tracking finances across 5+ accounts is genuinely painful, especially in France where bank UX is notoriously bad. This scratches a real itch.
- **AI adds genuine value here.** Unlike many "slap an LLM on it" projects, financial planning benefits enormously from natural language interaction. "Can I afford a trip this summer?" is a question only an AI with your data context can answer well.
- **Local-first is a differentiator.** Privacy-conscious users (especially in France/EU) would value a tool that never sends their data to the cloud.

### What to watch out for
- **Scope creep is the #1 risk.** The conversation drifted from "track my expenses" to "investment advisor + Monte Carlo simulations + portfolio rebalancing." Start with one thing and nail it. I'd recommend: **expense tracking with multi-account balance aggregation first.**
- **Don't build the data pipeline first.** Start with manual CSV imports. Get the dashboard, categorization, and chatbot working on static data before tackling the gnarly bank connection problem. You'll stay motivated because you'll have something usable fast.
- **The LLM doesn't need to be large.** For expense categorization and budget queries, a 7B–14B parameter model (Qwen 2.5, Mistral) running on a Mac with `llama.cpp` or `ollama` is more than sufficient. No cloud needed for v1.
- **Open Banking is a rabbit hole.** Unless one of you has fintech regulatory experience, don't go there for v1. CSV import + optional browser automation is pragmatic.

### Suggested MVP Scope

```
Phase 1 — "Know where your money is"
├── Manual CSV import from banks (Boursorama, Revolut, Caisse d'Épargne)
├── Transaction categorization (AI-assisted)
├── Dashboard: balances, monthly spend by category, trends
└── Local chatbot: "How much did I spend on food?"

Phase 2 — "Plan your money"
├── Budget goals and tracking
├── Expense projections (recurring expenses, upcoming bills)
├── "Can I afford X?" natural language queries
└── Subscription detection and alerts

Phase 3 — "Grow your money"
├── Investment portfolio tracking (manual input or CSV)
├── Asset allocation visualization
├── Monte Carlo projections
└── Basic rebalancing suggestions

Phase 4 — "Automate everything"
├── Browser automation for bank data fetching
├── Open Banking integration (if viable)
├── Smart money movement suggestions
└── Crypto wallet tracking (on-chain reads)
```

### Tech Stack Suggestion

| Layer | Recommendation | Why |
|-------|---------------|-----|
| **Language** | Python | Fast prototyping, great for data + AI |
| **Local LLM** | Ollama + Qwen 2.5 (7B/14B) | Free, private, runs on Mac |
| **AI Framework** | LangChain or plain function-calling | MCP tools for structured bank data access |
| **Data Storage** | SQLite | Local, zero-config, portable |
| **Dashboard** | Streamlit or Gradio (v1), then Next.js | Quick to build, iterate fast |
| **Bank Data** | CSV import (v1), Playwright (v2) | Pragmatic, no regulatory burden |

---

*"The best personal finance app is the one you actually use."*  
*Start small, stay local, ship fast.*
