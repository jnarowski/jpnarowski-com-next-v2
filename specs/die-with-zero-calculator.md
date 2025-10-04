# Feature: Die with Zero Financial Calculator

## Feature Description
A comprehensive financial calculator that helps users visualize how long their savings will last based on their age, net worth, income streams, and expenses. The calculator implements the "Die with Zero" philosophy by helping users plan to fully utilize their resources over their lifetime. It features dynamic income/expense rows, URL-based persistence, real-time calculations with monthly compound interest, partial year handling, and an interactive bar chart visualization showing net worth projections over the user's lifetime.

## User Story
As a person interested in financial planning and the "Die with Zero" philosophy
I want to model my financial future with various income and expense scenarios
So that I can visualize when my money will run out and make informed decisions about my spending and saving

## Problem Statement
Most people struggle to visualize their long-term financial trajectory, especially when considering multiple income streams (employment, side hustles, investments) and varying expense patterns (early career vs. retirement). Traditional financial calculators are often complex, require accounts/databases, and don't allow for easy scenario experimentation. Users need a simple, shareable tool that helps them understand if they're on track to "die with zero" or if they'll run out of money prematurely.

## Solution Statement
Build a client-side financial calculator that:
1. **Accepts core inputs**: Current age, net worth, expected interest rate
2. **Supports dynamic income/expense rows**: Users can add/remove multiple income streams and expense categories with custom start/end ages and monthly/annual amounts
3. **Calculates projections**: Uses monthly compounding interest and handles partial years (starting from current month/year)
4. **Visualizes results**: Displays an interactive bar chart showing net worth over time (x-axis: years/ages, y-axis: net worth)
5. **Persists state**: Encodes all parameters in URL for easy sharing and reload persistence
6. **Educates users**: Includes an intro section explaining "Die with Zero" principles

## Relevant Files
Use these files to implement the feature:

- **src/app/experiments/page.tsx** - The experiments page already exists and has beautiful design patterns we can follow. The Die with Zero calculator will be added as a new route under experiments.
- **src/components/ui/button.tsx** - shadcn/ui button component for actions (add/remove rows, etc.)
- **src/components/ui/card.tsx** - shadcn/ui card component for organizing calculator sections
- **src/lib/utils.ts** - Utility functions (cn for className merging)
- **package.json** - To understand current dependencies and add new ones if needed

### New Files

- **src/app/experiments/die-with-zero/page.tsx** - Main calculator page component
- **src/lib/die-with-zero-calculator.ts** - Core calculation logic (monthly projections, compound interest, partial years)
- **src/lib/die-with-zero-calculator.test.ts** - Unit tests for calculation logic
- **src/components/die-with-zero/CalculatorForm.tsx** - Form component for inputs (age, net worth, interest rate)
- **src/components/die-with-zero/IncomeExpenseRow.tsx** - Reusable row component for income/expense entries
- **src/components/die-with-zero/NetWorthChart.tsx** - Bar chart visualization component
- **src/components/die-with-zero/PrinciplesSection.tsx** - Intro section explaining Die with Zero philosophy
- **src/hooks/useUrlState.ts** - Custom hook for URL-based state persistence

## Implementation Plan

### Phase 1: Foundation
**Goal**: Set up the core calculation engine and mathematical formulas before any UI work.

1. **Design the calculation algorithm**:
   - Define data structures for income/expense entries (amount, frequency, startAge, endAge)
   - Implement monthly projection algorithm that:
     - Starts from current year/month (partial year handling)
     - Iterates month-by-month from current age to age 100
     - Applies income/expenses based on active age ranges
     - Applies monthly compound interest (annual rate / 12)
     - Tracks net worth at each month/year
   - Handle edge cases (net worth goes negative, income/expenses overlap, etc.)

2. **Document the formulas**:
   - Write clear mathematical formulas in markdown format
   - Include LaTeX-style notation for compound interest
   - Provide worked examples matching the user's scenarios (Example 1 & 2)

3. **Create calculation library**:
   - Build `src/lib/die-with-zero-calculator.ts` with pure functions
   - Export: `calculateNetWorthProjection()`, `getMonthlyRate()`, `getCurrentMonth()`, etc.
   - Ensure testability (no side effects, pure inputs/outputs)

### Phase 2: Core Implementation
**Goal**: Implement the UI components and wire up the calculation engine.

1. **Set up URL state management**:
   - Create `src/hooks/useUrlState.ts` custom hook
   - Implement URL encoding/decoding for all calculator params
   - Use base64 or URL-safe JSON encoding for compactness
   - Handle serialization of arrays (income/expense rows)

2. **Build form components**:
   - Create `CalculatorForm.tsx` for static inputs (age, net worth, interest rate)
   - Create `IncomeExpenseRow.tsx` reusable component with:
     - Amount input (number)
     - Frequency selector (monthly/annual dropdown)
     - Start age input (defaults to current age)
     - End age input (defaults to 100)
     - Remove button
   - Implement add/remove row functionality
   - Wire up all inputs to URL state

3. **Build chart visualization**:
   - Research and select charting library (recommend Recharts for React compatibility)
   - Create `NetWorthChart.tsx` component
   - Implement bar chart with:
     - X-axis: Years (with age labels)
     - Y-axis: Net worth (formatted as currency)
     - Bars: Color-coded (green for positive, red for negative)
     - Responsive design for mobile/desktop

4. **Create principles section**:
   - Build `PrinciplesSection.tsx` with elegant typography
   - Include 3-5 bullet points explaining "Die with Zero" concept
   - Use existing design patterns from experiments page

### Phase 3: Integration
**Goal**: Bring all components together and polish the user experience.

1. **Create the main page**:
   - Build `src/app/experiments/die-with-zero/page.tsx`
   - Compose all components (Principles → Form → Chart)
   - Implement layout matching existing site aesthetics
   - Add metadata for SEO

2. **Implement real-time updates**:
   - Connect all form changes to trigger recalculation
   - Debounce inputs for performance (if needed)
   - Update chart immediately on any parameter change
   - Show loading states if calculations are slow

3. **Polish UX details**:
   - Add helpful placeholder text
   - Include validation (e.g., age must be 18-100)
   - Show empty states ("Add your first income stream")
   - Implement mobile-responsive design
   - Add tooltips for complex inputs

## Step by Step Tasks

### Step 1: Design & Document Calculation Formulas
- Research compound interest formulas for monthly compounding
- Define data structures (TypeScript interfaces) for calculator inputs
- Write mathematical formulas in markdown with worked examples
- Document the month-by-month projection algorithm
- Create test scenarios based on user's Example 1 and Example 2
- Validate formulas with manual calculations

### Step 2: Implement Core Calculation Library
- Create `src/lib/die-with-zero-calculator.ts`
- Implement `calculateNetWorthProjection()` function
- Implement helper functions: `getMonthlyRate()`, `getCurrentMonth()`, `applyCompoundInterest()`
- Handle partial year calculations (current month → end of year)
- Create data transformation functions (monthly → yearly aggregation for chart)

### Step 3: Write Unit Tests for Calculations
- Create `src/lib/die-with-zero-calculator.test.ts`
- Test basic scenarios (Example 1 and Example 2 from requirements)
- Test edge cases: negative net worth, no income, overlapping streams
- Test partial year calculations
- Test compound interest accuracy
- Verify monthly vs annual income/expense handling
- Run tests: `pnpm test die-with-zero-calculator.test.ts`

### Step 4: Install Charting Library
- Research charting options (Recharts recommended for shadcn/ui compatibility)
- Install via `pnpm add recharts`
- Verify installation
- Test basic bar chart rendering

### Step 5: Create URL State Management Hook
- Create `src/hooks/useUrlState.ts`
- Implement URL parameter encoding/decoding
- Handle arrays (income/expense rows)
- Use compression/base64 if URLs get too long
- Write helper functions: `encodeParams()`, `decodeParams()`
- Test in browser console to verify URL roundtrip

### Step 6: Build IncomeExpenseRow Component
- Create `src/components/die-with-zero/IncomeExpenseRow.tsx`
- Implement inputs: amount, frequency dropdown, start age, end age
- Add remove button with icon
- Style with Tailwind following existing patterns
- Add prop types for onChange callbacks
- Make it reusable for both income and expenses

### Step 7: Build CalculatorForm Component
- Create `src/components/die-with-zero/CalculatorForm.tsx`
- Implement static inputs: current age, net worth, interest rate
- Add "Add Income" and "Add Expense" buttons
- Implement add/remove row logic
- Wire up to URL state hook
- Add input validation and error messages
- Style to match site design (Apple-inspired minimalism)

### Step 8: Build NetWorthChart Component
- Create `src/components/die-with-zero/NetWorthChart.tsx`
- Implement bar chart using Recharts
- Configure X-axis: years with age labels
- Configure Y-axis: currency-formatted net worth
- Color bars: green (positive), red (negative)
- Add responsive container for mobile
- Add hover tooltips showing exact values
- Style to match site color scheme (purple accents)

### Step 9: Build PrinciplesSection Component
- Create `src/components/die-with-zero/PrinciplesSection.tsx`
- Write 3-5 concise bullet points about "Die with Zero" philosophy
- Use elegant typography (Geist fonts)
- Add subtle background gradient
- Include relevant icon from lucide-react
- Match styling from experiments page

### Step 10: Create Main Calculator Page
- Create `src/app/experiments/die-with-zero/page.tsx`
- Add page metadata (title, description)
- Compose layout: PrinciplesSection → CalculatorForm → NetWorthChart
- Implement state management connecting all components
- Wire up URL state hook
- Add page container with proper spacing
- Ensure dark mode compatibility

### Step 11: Implement Real-time Calculation Updates
- Connect form inputs to trigger recalculation
- Update chart immediately on any change
- Add debouncing if performance issues arise
- Show loading state during calculations (if needed)
- Handle calculation errors gracefully

### Step 12: Add Input Validation & UX Polish
- Validate age range (18-100)
- Validate net worth (allow negative)
- Validate interest rate (-20% to 50%)
- Add helpful placeholder text ("Enter your current age")
- Show empty states for income/expense sections
- Add tooltips for complex fields
- Implement keyboard shortcuts (Enter to add row, etc.)

### Step 13: Test End-to-End Scenarios
- Test Example 1: 40 years old, $1M net worth, complex income streams
- Test Example 2: 30 years old, $500K net worth, steady income
- Test URL persistence (reload page, verify state restores)
- Test add/remove rows
- Test monthly vs annual frequency toggling
- Test negative net worth scenarios
- Test mobile responsiveness

### Step 14: Run Validation Commands
- Execute all validation commands (see section below)
- Fix any failing tests
- Fix any linting errors
- Fix any build errors
- Verify zero regressions in existing features

## Testing Strategy

### Unit Tests
1. **Calculation Logic Tests** (`die-with-zero-calculator.test.ts`):
   - Test `calculateNetWorthProjection()` with Example 1 scenario
   - Test `calculateNetWorthProjection()` with Example 2 scenario
   - Test monthly compound interest calculation accuracy
   - Test partial year handling (current month → December)
   - Test edge case: net worth goes to zero mid-projection
   - Test edge case: no income, only expenses
   - Test edge case: no expenses, only income
   - Test monthly vs annual income/expense calculations
   - Test overlapping income streams
   - Test interest rate edge cases (0%, negative %, high %)

2. **URL State Hook Tests**:
   - Test encoding/decoding roundtrip
   - Test handling of special characters
   - Test array serialization (multiple income/expense rows)
   - Test malformed URL params (graceful degradation)

3. **Component Tests** (optional, use React Testing Library):
   - Test IncomeExpenseRow renders correctly
   - Test add/remove row functionality
   - Test form validation messages
   - Test chart renders with sample data

### Integration Tests
1. **Full Calculator Flow**:
   - User enters static inputs → chart updates
   - User adds income row → chart recalculates
   - User adds expense row → chart recalculates
   - User removes row → chart updates
   - User toggles frequency → amounts recalculate
   - URL updates reflect all changes

2. **Persistence Tests**:
   - User fills out calculator → copies URL → opens in new tab → state restores
   - User refreshes page → state persists

### Edge Cases
1. **Net worth goes negative**: Chart should show red bars, projections continue
2. **No income, only expenses**: Money runs out, show when
3. **No expenses, only income**: Net worth grows indefinitely
4. **Interest rate = 0%**: No compounding, linear projection
5. **Negative interest rate**: Net worth declines over time
6. **Very high interest rate (20%+)**: Exponential growth
7. **Start age > End age**: Validation error
8. **Current age = 100**: Edge case for partial year
9. **Many income/expense rows (10+)**: Performance and UI handling
10. **Very long URL (many rows)**: Compression or warning

## Acceptance Criteria
1. ✅ User can enter current age, net worth, and expected interest rate
2. ✅ User can add multiple income streams with monthly/annual frequency, start age, and end age
3. ✅ User can add multiple expense streams with monthly/annual frequency, start age, and end age
4. ✅ User can remove any income or expense row
5. ✅ Default income/expense rows start at current age and end at age 100
6. ✅ Chart updates immediately upon any input change
7. ✅ Chart shows net worth over time (x-axis: years/ages, y-axis: net worth in dollars)
8. ✅ Chart displays positive net worth as green bars, negative as red bars
9. ✅ All calculator state persists in URL (no database required)
10. ✅ Page reload restores all calculator state from URL
11. ✅ Calculations use monthly compound interest (annual rate / 12)
12. ✅ Calculations handle partial years (starting from current month)
13. ✅ Page includes intro section explaining "Die with Zero" principles
14. ✅ Example 1 scenario produces accurate projection (manual verification)
15. ✅ Example 2 scenario produces accurate projection (manual verification)
16. ✅ Design matches site aesthetics (Apple-inspired, purple accents, dark mode support)
17. ✅ Mobile responsive design works on all screen sizes
18. ✅ All unit tests pass with 100% coverage of calculation logic
19. ✅ No regressions in existing site functionality (build, lint, tests all pass)

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `pnpm test` - Run all tests to validate the feature works with zero regressions
- `pnpm lint` - Run ESLint to ensure code quality
- `pnpm build` - Build the project to catch any TypeScript/build errors
- `pnpm dev` - Start dev server and manually test the calculator at `/experiments/die-with-zero`

### Manual Testing Checklist (during `pnpm dev`):
1. Navigate to `/experiments/die-with-zero`
2. Enter Example 1 data and verify chart shows money lasting until expected age
3. Enter Example 2 data and verify chart shows money lasting until expected age
4. Add 5 income rows and 3 expense rows, verify chart updates
5. Remove rows, verify chart updates
6. Toggle frequency (monthly ↔ annual), verify calculations change
7. Copy URL, open in new tab, verify state restores perfectly
8. Refresh page, verify state persists
9. Test on mobile device or responsive mode
10. Toggle dark mode, verify colors work correctly

## Notes

### Recommended Charting Library
**Recharts** is recommended because:
- Native React components (great DX)
- Works well with shadcn/ui and Tailwind
- Customizable and themeable
- Good documentation and community support
- Installation: `pnpm add recharts`

Alternative: `chart.js` with `react-chartjs-2` (more features but heavier)

### URL Encoding Strategy
For URL persistence, recommend using:
1. **JSON.stringify()** the state object
2. **Compress** with LZString or similar (optional, if URLs get long)
3. **base64 encode** for URL safety
4. Store in single query param: `?state=<encoded>`

Example:
```typescript
const state = { age: 40, netWorth: 1000000, ... };
const encoded = btoa(JSON.stringify(state));
window.history.replaceState(null, '', `?state=${encoded}`);
```

### Calculation Formula Reference

**Monthly Compound Interest:**
```
FV = PV × (1 + r/12)^n
Where:
- FV = Future Value
- PV = Present Value (current net worth)
- r = annual interest rate (as decimal, e.g., 0.05 for 5%)
- n = number of months
```

**Month-by-month projection algorithm:**
```typescript
for (month = currentMonth; month <= lastMonth; month++) {
  // 1. Add income if active this month
  netWorth += getActiveIncome(month)

  // 2. Subtract expenses if active this month
  netWorth -= getActiveExpenses(month)

  // 3. Apply monthly compound interest
  netWorth *= (1 + annualRate / 12)

  // 4. Store snapshot for chart
  snapshots.push({ month, netWorth })
}
```

### Design Inspiration
- Follow patterns from `src/app/experiments/page.tsx`
- Use purple accent color (`text-primary`, `bg-primary`)
- Maintain generous whitespace
- Use Geist Sans font
- Support dark mode via `next-themes`
- Mobile-first responsive design

### Future Enhancements (Out of Scope for Phase 1)
- Share button with URL copy functionality
- Export chart as image/PDF
- Multiple scenarios comparison (side-by-side)
- Inflation adjustment toggle
- Tax calculation options
- Social Security income modeling
- Life expectancy adjustment based on health factors
- Undo/redo functionality
- Save named scenarios to localStorage
