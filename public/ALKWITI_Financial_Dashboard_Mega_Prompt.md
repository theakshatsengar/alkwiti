# ALKWITI — Financial, Sales & Business Operations Dashboard

## 1. Project Objective

Build a clean, minimalistic and highly visual financial and business dashboard for **ALKWITI**, an international sourcing and procurement business.

The dashboard is intended to function as a **founder-level financial command center**.

Its primary purpose is to help the founders understand:

- How much ALKWITI revenue has been generated
- How much product sales value has been generated
- How much gross order value has been generated
- How much money has been spent
- How much cash/savings are available
- How revenue is being allocated toward predefined goals
- Progress toward the China industrial visit
- Progress toward Dubai company incorporation
- Founder salary allocations
- Operational expense utilization
- Weekly financial performance
- Monthly financial performance

The dashboard should be **visual, simple and operationally useful**.

Do not turn this into a complex accounting ERP.

Do not add unnecessary financial metrics simply because they are technically possible.

Only track information that is relevant to ALKWITI's actual operating model.

---

## 2. Branding & Design Assets

A separate Markdown file containing the ALKWITI branding guidelines will be provided.

Use:

`[REFERENCE: ALKWITI BRANDING MD FILE]`

This branding MD file is the source of truth for the visual identity.

Follow it for:

- Colors
- Typography
- Font hierarchy
- Spacing
- UI components
- Visual language
- Buttons
- Cards
- Icons
- Overall aesthetic

### ALKWITI Logo Assets

The project will also provide ALKWITI logo assets.

There will be:

- ALKWITI logo for light backgrounds
- ALKWITI logo for dark backgrounds

Use the appropriate logo depending on the dashboard background/theme.

Do not recreate or approximate the logo.

Use the supplied logo assets.

---

## 3. Design Direction

The dashboard should be:

- Minimalistic
- Modern
- Professional
- Highly visual
- Data-driven
- Easy to understand
- Founder-friendly

It should NOT be:

- Overly fancy
- Over-animated
- Visually crowded
- Full of unnecessary charts
- A traditional accounting ERP
- Filled with excessive decorative elements

Think:

**"Founder financial command center."**

Not:

**"Enterprise accounting software."**

A founder should be able to open the dashboard and understand the current financial position within a few seconds.

---

## 4. Founding Partners

The two founding partners are:

### Founding Partner 1

**Shashank Space**

### Founding Partner 2

**Mithrha Ramakrishnan**

IMPORTANT:

The correct spelling is:

**M-I-T-H-R-E-C-H-A**

Do not use "Mithra".

---

## 5. Revenue Allocation Model

The dashboard should implement the following allocation structure.

For every recognized ALKWITI revenue amount:

### 15% — Shashank Space

15% of generated ALKWITI revenue is allocated toward Shashank Space's salary.

### 15% — Mithrha Ramakrishnan

15% of generated ALKWITI revenue is allocated toward Mithrha Ramakrishnan's salary.

Therefore:

**30% total of generated revenue → Founder salaries**

---

### 40% — China Industrial Visit

40% of generated ALKWITI revenue is allocated toward the China industrial visit.

Target:

**₹2,50,000**

This represents approximately:

- ₹1,25,000 for one founder
- ₹1,25,000 for the other founder

The target should be treated as a configurable goal.

Track:

- Target
- Amount accumulated
- Remaining amount
- Completion percentage
- Progress bar

---

### 30% — Operational Expenses

30% of generated ALKWITI revenue is allocated toward operational expenses.

This is the operational budget.

Examples may include:

- Software subscriptions
- Printing
- Brochures
- Business cards
- Marketing materials
- Business tools
- Travel
- Other legitimate operating expenses

The exact expense categories should remain configurable.

---

## 6. Dubai Incorporation Allocation

There is a separate goal:

## Dubai Company Incorporation

Target:

**₹5,00,000**

The dashboard should track progress toward this goal.

The allocation logic changes based on the China industrial visit goal.

### Before China Goal Is Complete

Allocate:

**10% of generated revenue**

toward the Dubai incorporation goal.

### After China Goal Is Complete

Allocate:

**40% of generated revenue**

toward the Dubai incorporation goal.

This should be implemented dynamically.

The dashboard should automatically determine the applicable allocation percentage based on the China industrial visit goal status.

The percentages and target amount must remain configurable in Settings.

---

## 7. Important Allocation Interpretation

The dashboard should clearly distinguish between:

### Revenue allocation

and

### Actual expenses.

For example, if ₹1,00,000 of ALKWITI revenue is generated:

- ₹15,000 → Shashank Space salary allocation
- ₹15,000 → Mithrha Ramakrishnan salary allocation
- ₹40,000 → China industrial visit
- ₹30,000 → Operational allocation

If ₹10,000 of the operational allocation is then spent on software subscriptions, that is an **actual expense**.

An allocation is not automatically an expense.

The dashboard must not confuse:

**Allocated money**

with

**Money actually spent.**

---

## 8. Revenue Model

ALKWITI is a sourcing/procurement business.

The dashboard must distinguish between the value of products being sourced and the actual revenue earned by ALKWITI.

There are three key financial sales metrics:

### 1. Product Sales Value

The value of products that ALKWITI has sourced/sold through its customers and suppliers.

This represents the underlying product transaction value.

### 2. Gross Order Value

The total value of the customer order, including:

- Product value
- Shipping
- Other applicable order-related charges

Do not unnecessarily add detailed customs-duty tracking to the dashboard.

The dashboard only needs to capture the total order value relevant to ALKWITI's business tracking.

### 3. ALKWITI Revenue / Commission

This is the actual revenue generated by ALKWITI.

ALKWITI primarily earns through its sourcing/procurement commission.

Therefore:

**ALKWITI Revenue = Commission / revenue earned by ALKWITI**

This is the number that should drive the financial allocation system.

The dashboard must NOT treat the entire product order value as ALKWITI revenue.

---

## 9. Core Financial Logic

Example:

Product Sales Value:

₹10,00,000

Shipping:

₹50,000

Gross Order Value:

₹10,50,000

ALKWITI Commission:

₹80,000

The dashboard should display all relevant values separately.

The financial allocation engine should use:

**₹80,000 ALKWITI Revenue**

rather than:

**₹10,50,000 Gross Order Value**

for salary, China trip, operational and Dubai allocation calculations.

---

## 10. Revenue Data Source

The dashboard itself should NOT be used to manually create invoices.

ALKWITI will create invoices outside the dashboard.

The dashboard should simply **fetch/import/read invoice data from the existing external source**.

Potential sources may include:

- Google Drive
- OneDrive
- Excel
- Google Sheets
- External invoice database
- API
- MCP connection
- Other appropriate integration

The exact implementation should remain exploratory.

### Developer instruction

Determine the most reliable and maintainable way to connect the dashboard to the external financial/invoice data source.

Do not assume that a specific integration must be used.

Evaluate feasible options and choose an architecture that:

- Minimizes manual work
- Avoids duplicate records
- Keeps financial data accurate
- Is easy for the founders to maintain
- Can be expanded later
- Does not require an AI layer inside the dashboard

---

## 11. No Embedded AI

Do NOT embed an AI chatbot or AI assistant inside the dashboard.

The dashboard is primarily a:

**data visualization + financial tracking + operational control system.**

External automation or integration may be used where appropriate.

For example:

- MCP
- API
- Spreadsheet connection
- Cloud storage integration
- Automated data pipeline

But the dashboard itself should not contain an AI assistant unless explicitly requested later.

---

## 12. Revenue Data Fields

When invoice/order data is imported, capture only relevant fields.

At minimum:

- Invoice/reference number
- Invoice date
- Customer
- Customer country, if available
- Product
- Product category, if available
- Product Sales Value
- Shipping
- Other relevant order charges
- Gross Order Value
- ALKWITI Commission / Revenue
- Currency
- INR equivalent
- Payment status, if available
- Payment date, if available

Do not add unnecessary fields merely for the sake of completeness.

---

## 13. Revenue Tracking

The dashboard must provide:

### Weekly Revenue

Track:

- Weekly ALKWITI revenue
- Weekly product sales value
- Weekly gross order value

Allow comparison with previous weeks.

### Monthly Revenue

Track:

- Monthly ALKWITI revenue
- Monthly product sales value
- Monthly gross order value

Allow comparison with previous months.

### Overall

Track:

- Total ALKWITI revenue
- Total product sales value
- Total gross order value

The user should be able to change the date range.

---

## 14. Primary Sales Metrics

The dashboard should focus on the following sales metrics:

### ALKWITI Revenue

Actual commission/revenue earned.

### Product Sales Value

Value of products sourced/sold.

### Gross Order Value

Product value + shipping + other relevant order charges.

### Expenses

Actual operating expenses.

### Net / Available Cash

Based on the financial data available.

Do NOT prioritize:

- Number of units sold
- Average unit price
- SKU-level inventory
- Inventory turnover
- Warehouse metrics
- Manufacturing metrics
- Detailed supply-chain KPIs

unless these are explicitly added later.

The dashboard should remain focused.

---

## 15. Main Dashboard

Create a primary dashboard screen.

### Header

Display:

**ALKWITI**

**Financial & Business Dashboard**

Use the supplied ALKWITI logo.

Include:

- Date range selector
- Currency selector
- Refresh/sync status

---

## 16. Top KPI Section

The top section should contain the most important numbers.

### KPI 1

**ALKWITI Revenue**

### KPI 2

**Product Sales Value**

### KPI 3

**Gross Order Value**

### KPI 4

**Expenses**

### KPI 5

**Available Cash / Savings**

The exact cash calculation should be transparent and based on the underlying data model.

Each KPI can optionally show a comparison against the previous period.

---

## 17. Revenue Chart

Create a prominent visual chart.

Allow switching between:

**Weekly | Monthly**

The chart should show:

- ALKWITI revenue
- Product sales value
- Gross order value

Avoid making the chart visually confusing.

The user should be able to understand the relationship between:

Product Value → Gross Order Value → ALKWITI Revenue.

---

## 18. Financial Goals Section

Create a dedicated section:

## Financial Goals

Display visual goal cards.

### China Industrial Visit

Target:

₹2,50,000

Allocation:

40%

Show:

- Amount accumulated
- Remaining amount
- Completion %
- Progress bar

### Dubai Company Incorporation

Target:

₹5,00,000

Allocation:

- 10% before China goal completion
- 40% after China goal completion

Show:

- Amount accumulated
- Remaining amount
- Completion %
- Current allocation rate
- Progress bar

### Shashank Space Salary

Allocation:

15% of revenue

Show:

- Amount allocated
- Amount paid, if payment data is available
- Remaining/unpaid allocation

### Mithrha Ramakrishnan Salary

Allocation:

15% of revenue

Show:

- Amount allocated
- Amount paid, if payment data is available
- Remaining/unpaid allocation

### Operational Budget

Allocation:

30% of revenue

Show:

- Expected operational allocation
- Actual expenses
- Remaining operational budget
- Utilization %

---

## 19. Progress Bars

Every major financial goal should have a clear visual progress bar.

Example:

**China Industrial Visit**

₹1,50,000 / ₹2,50,000

**60%**

████████████░░░░░░

Use the ALKWITI brand design language.

Do not use excessive decorative elements.

---

## 20. Expense Tracking

Expenses should be imported or connected from an appropriate external data source where feasible.

The dashboard should NOT require the founders to manually enter every expense into the dashboard.

Potential sources can include:

- Excel
- Google Sheets
- Bank transaction export
- Expense spreadsheet
- Connected financial data
- Cloud documents
- Other suitable data sources

The implementation should remain exploratory.

The developer should determine the easiest reliable workflow.

---

## 21. Expense Categories

Track relevant expense categories such as:

- Software & subscriptions
- Marketing
- Printing
- Brochures
- Business cards
- Travel
- Office
- Professional services
- Business tools
- Other operational expenses

Keep the categories simple.

Allow categories to be modified later.

---

## 22. Expense Dashboard

Display:

- Total expenses
- Weekly expenses
- Monthly expenses
- Expenses by category
- Operational budget utilization
- Largest expense categories

Use a clean chart such as:

**Monthly Expenses**

and/or

**Expenses by Category**

Do not overload the page with charts.

---

## 23. Operational Control

The dashboard should help the founders control operating expenses.

The intended operational allocation is:

**30% of ALKWITI revenue**

Calculate:

### Operational Budget

`ALKWITI Revenue × 30%`

### Actual Operational Expenses

Actual qualifying expenses.

### Remaining Operational Budget

`Operational Budget − Actual Operational Expenses`

### Operational Utilization

`Actual Operational Expenses ÷ Operational Budget`

Display this visually.

Example:

Revenue:

₹10,00,000

Operational allocation:

₹3,00,000

Actual operational expenses:

₹1,80,000

Utilization:

60%

Remaining:

₹1,20,000

---

## 24. China → Dubai Allocation Logic

The dashboard must dynamically reflect the relationship between the two goals.

### Stage 1

China goal is incomplete.

Dubai allocation:

**10%**

### Stage 2

China goal is completed.

Dubai allocation:

**40%**

The dashboard should clearly display the current stage.

Example:

**Dubai Incorporation**

Current allocation:

**10%**

Reason:

**China Industrial Visit goal not yet completed**

After completion:

**Current allocation: 40%**

Reason:

**China Industrial Visit goal completed**

This should happen automatically based on goal status.

---

## 25. Savings / Available Cash

Create a financial summary showing:

### Total Revenue

minus

### Actual Expenses

equals

### Available Cash

Where relevant, separately show:

- Goal allocations
- Salary allocations
- Actual salary payments
- Operational budget
- Actual operational expenses

Do not treat allocations as expenses unless the money has actually been spent.

The interface should make the difference between:

**Cash**

**Allocated Cash**

and

**Spent Cash**

clear.

---

## 26. INR as the Base Currency

All underlying financial data should be stored in:

**INR ₹**

Maintain precision to at least two decimal places.

INR is the source-of-truth currency.

---

## 27. INR → USD Display

Add a simple currency dropdown:

**INR ₹ | USD $**

Default:

**INR**

When USD is selected:

- Convert dashboard monetary values to USD
- Keep the underlying data in INR
- Do not modify historical INR values

Use the latest available USD/INR exchange rate.

Display the current exchange rate being used.

Example:

`USD/INR: ₹XX.XX`

`Updated: [date/time]`

If a reliable live exchange-rate source is available, use it.

Otherwise, allow the exchange rate to be configured manually.

The implementation should be designed so that the exchange-rate mechanism can be upgraded later.

---

## 28. Weekly View

Create a weekly financial view.

Show:

- ALKWITI revenue
- Product sales value
- Gross order value
- Expenses
- Available cash
- Goal contributions

Show the trend visually.

The user should be able to move between weeks.

---

## 29. Monthly View

Create a monthly financial view.

Show:

- ALKWITI revenue
- Product sales value
- Gross order value
- Expenses
- Available cash
- Goal progress
- Operational expense utilization

Include a month-over-month comparison where meaningful.

---

## 30. Data Visualization

Use charts selectively.

Recommended visualizations:

### Revenue Trend

Weekly/monthly line or bar chart.

### Product vs Order vs Revenue

Simple comparative visualization.

### Expenses

Category breakdown.

### Goal Progress

Progress bars.

### Operational Budget

Budget vs actual visualization.

Do not create charts simply to fill space.

Every visualization must answer a useful business question.

---

## 31. Recent Financial Activity

Include a compact recent activity section.

Show recent:

- Revenue records
- Invoice/order records
- Expenses
- Goal contributions

The user should be able to click into the underlying record if the data source supports drill-down.

---

## 32. Data Source Architecture

The dashboard should be built with a clear separation between:

### Data Layer

Where financial information comes from.

Potentially:

- Excel
- Google Sheets
- OneDrive
- Google Drive
- API
- MCP
- External financial system

### Calculation Layer

Where:

- Revenue calculations
- Expense calculations
- Goal allocations
- Salary allocations
- Operational budget calculations
- Currency conversions

are performed.

### Presentation Layer

Where:

- KPI cards
- Charts
- Goal progress
- Tables
- Filters

are displayed.

This separation is important so the dashboard can change its data source later without rebuilding the entire interface.

---

## 33. Automation / Data Sync

The dashboard should preferably support automatic or near-automatic synchronization with the underlying financial data source.

The founders should not have to manually copy numbers into the dashboard every time an invoice or expense is created.

Explore the most practical architecture.

Potential workflow:

**External Invoice/Data Source**

↓

**Data Source / Spreadsheet / API / MCP**

↓

**Financial Data Layer**

↓

**Calculation Engine**

↓

**ALKWITI Dashboard**

The exact implementation should be determined by the developer based on technical feasibility.

---

## 34. Data Accuracy

Financial accuracy is more important than visual effects.

The system should:

- Avoid duplicate records
- Preserve source values
- Keep INR as the underlying currency
- Clearly distinguish order value from ALKWITI revenue
- Clearly distinguish allocations from expenses
- Clearly distinguish invoiced amounts from collected amounts where payment status exists
- Avoid silently changing historical data

If an imported record is ambiguous, flag it rather than guessing.

---

## 35. Duplicate Detection

When importing invoice data, prevent duplicates.

Use available identifiers such as:

- Invoice/reference number
- Date
- Customer
- Amount

The same invoice should not be counted twice simply because it exists in multiple syncs or folders.

---

## 36. Settings

Create a lightweight Settings area.

Allow configuration of:

### Founders

Shashank Space

Mithrha Ramakrishnan

### Salary allocation

Shashank Space:

15%

Mithrha Ramakrishnan:

15%

### China industrial visit

Target:

₹2,50,000

Allocation:

40%

### Operational expenses

Allocation:

30%

### Dubai incorporation

Target:

₹5,00,000

Before China goal:

10%

After China goal:

40%

### Currency

INR / USD

### Exchange rate

USD/INR

Do not hard-code these values into the visual interface.

---

## 37. Responsive Design

Desktop/laptop should be the primary experience.

The dashboard should also work on mobile.

On mobile, prioritize:

1. ALKWITI Revenue
2. Product Sales Value
3. Gross Order Value
4. Expenses
5. Available Cash
6. Financial Goals
7. Operational Budget

Charts should remain readable on smaller screens.

---

## 38. No Unnecessary Features

Do NOT add features such as:

- Inventory management
- Warehouse management
- Unit-level sales tracking
- Detailed accounting ledger
- Detailed tax management
- Payroll management
- CRM
- Supplier management
- Customer relationship management
- AI chatbot
- Complex forecasting
- Manufacturing analytics

unless explicitly requested later.

The objective is a focused financial and business dashboard.

---

## 39. Core Questions the Dashboard Must Answer

When a founder opens the dashboard, it should immediately answer:

### Revenue

**How much ALKWITI revenue have we generated?**

**How much did we generate this week?**

**How much did we generate this month?**

### Sales

**What is the total product sales value?**

**What is the total gross order value including shipping?**

**How much commission/revenue did ALKWITI actually earn?**

### Expenses

**How much have we spent?**

**What are we spending on?**

**Are we staying within the 30% operational allocation?**

### Goals

**How close are we to the ₹2.5 lakh China industrial visit goal?**

**How close are we to the ₹5 lakh Dubai incorporation goal?**

**How much salary has been allocated to each founder?**

### Cash

**How much cash have we retained?**

**How much has actually been spent?**

**How much is allocated toward future goals?**

---

## 40. Final Product Character

The final product should feel like:

**ALKWITI's financial cockpit.**

It should be:

**Simple enough to use every week.**

**Visual enough to understand instantly.**

**Accurate enough to make financial decisions from.**

**Flexible enough to connect to different data sources later.**

**Minimal enough that it does not become another administrative task.**

Do not optimize for the number of features.

Optimize for:

**Clarity → Accuracy → Automation → Visual understanding.**

---

## 41. Building Approach

Before implementing the final dashboard:

1. Read the ALKWITI branding MD file.
2. Inspect all supplied logo assets.
3. Understand the intended brand visual language.
4. Design the underlying financial data model.
5. Define the external data-source integration approach.
6. Build the calculation/allocation engine.
7. Build the dashboard UI.
8. Validate the financial calculations using sample data.
9. Test INR/USD switching.
10. Test the China → Dubai allocation transition.
11. Test expense-budget calculations.
12. Test duplicate data handling.
13. Test responsive layouts.
14. Remove unnecessary features and visual clutter.

Use clearly marked sample data during development.

Do not mix sample data with real ALKWITI financial data.

---

## 42. Success Criteria

The dashboard is successful if a founder can open it and understand, at a glance:

**How much we made.**

**How much product business we generated.**

**How much order value we generated.**

**How much we spent.**

**How much cash we have.**

**How much we have allocated to each goal.**

**How close we are to China.**

**How close we are to Dubai incorporation.**

**How much salary has been allocated to each founder.**

**Whether operational spending is under control.**

And all of this should happen without manually entering the same financial information into multiple places.

The dashboard should be a **visual layer over the financial data**, not another place where founders have to maintain duplicate records.
