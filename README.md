# Page Selection Component

## Project Overview

This component features a main wrapper containing a header with "All pages" checkbox, a scrollable list of 6 individual page checkboxes with 9-state animations, divider lines, and a "Done" button with 3 visual states. The implementation prioritizes exact dimensional accuracy, precise color matching, and smooth animation states.

## Technology Stack

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety and development experience
- **Vite 7.2.4** - Build tool and development server
- **Vitest 4.0.17** - Unit testing framework
- **Testing Library** - Component testing utilities
- **ESLint** - Code linting and quality

## Project Structure

```
page-selection-component/
├── src/
│   ├── components/                                 # React components
│   │   ├── __tests__/                              # Component unit tests
│   │   │   ├── Checkbox.test.tsx
│   │   │   ├── DoneButton.test.tsx
│   │   │   ├── DividerLine.test.tsx
│   │   │   ├── ErrorHandling.test.tsx
│   │   │   ├── HeaderSection.test.tsx
│   │   │   ├── MainWrapper.test.tsx
│   │   │   ├── PageItem.test.tsx
│   │   │   ├── PageSelectionComponent.test.tsx
│   │   │   └── ScrollablePagesSection.test.tsx
│   │   ├── Checkbox.tsx                            # Checkbox with 9 animation states
│   │   ├── DividerLine.tsx                         # Visual separator component
│   │   ├── DoneButton.tsx                          # Action button with 3 states
│   │   ├── ErrorBoundary.tsx                       # Error handling wrapper
│   │   ├── HeaderSection.tsx                       # "All pages" header section
│   │   ├── MainWrapper.tsx                         # Outer container component
│   │   ├── PageItem.tsx                            # Individual page row component
│   │   ├── PageSelectionComponent.tsx              # Root component
│   │   └── ScrollablePagesSection.tsx              # Scrollable pages container
│   ├── hooks/                                      # Custom React hooks
│   │   ├── __tests__/                              # Hook unit tests
│   │   │   └── useFontLoading.test.tsx
│   │   └── useFontLoading.ts                       # Font loading detection hook
│   ├── test/                                       # Test utilities and setup
│   │   ├── helpers.ts                              # Test helper functions
│   │   ├── setup.ts                                # Test environment setup
│   │   └── vitest.d.ts                             # Vitest type definitions
│   ├── utils/                                      # Utility functions
│   │   └── cssLoadingDetection.ts                  # CSS loading detection utilities
│   ├── App.css                                     # Application styles
│   ├── App.tsx                                     # Main application component
│   ├── constants.ts                                # Centralized constants (dimensions, colors, typography)
│   ├── index.css                                   # Global styles
│   └── main.tsx                                    # Application entry point
```

## Component Architecture

### Core Components

**PageSelectionComponent** - Root component managing global state
- Manages individual page selections (array of 6 booleans)
- Derives "All pages" checkbox state automatically
- Handles checkbox animation states
- Coordinates all child components

**MainWrapper** - Outer container (370×326px)
- Provides border, shadow, and padding
- Ensures pixel-perfect dimensions
- Uses inline styles for CSS fallback resilience

**HeaderSection** - "All pages" section
- Displays master checkbox label
- Controls all 6 page checkboxes simultaneously
- Applies exact padding and typography

**Checkbox** - Interactive checkbox with 9 animation states
- State 1: Empty/Default
- State 2: Hover - Light
- State 3: Pre-click
- State 4: Transition to Checked
- State 5: Checked/Active
- State 6: Transition to Unchecked
- State 7: Disappearing
- State 8: Fading
- State 9: Return to Empty

**ScrollablePagesSection** - Scrollable container
- Displays 6 page items (Page 1-6)
- Shows 4 pages by default (max-height: 164px)
- Requires scrolling for Page 5 and Page 6

**PageItem** - Individual page row
- Displays page label and checkbox
- Maintains consistent styling with HeaderSection
- Independent animation state per checkbox

**DividerLine** - Visual separator
- 340px width with 0.7px border
- Appears after header and pages section

**DoneButton** - Action button with 3 states
- State 1: Normal (background #FFCE22)
- State 2: Hover/Active (background #FFD84D)
- State 3: After Click (returns to State 1)

**ErrorBoundary** - Error handling wrapper
- Catches rendering errors
- Displays fallback UI
- Prevents application crashes

## State Management

The component uses React's built-in state management:

- `pageSelections` - Array of 6 booleans for individual pages
- `allPagesSelected` - Derived state using useMemo
- `checkboxAnimationStates` - Map tracking animation states
- Functional state updates prevent race conditions
- React's state batching ensures atomic updates

### Automatic "All Pages" Logic

- Selecting all 6 individual pages automatically checks "All pages"
- Deselecting any page automatically unchecks "All pages"
- Checking "All pages" selects all 6 individual pages
- Unchecking "All pages" deselects all 6 individual pages

## Styling Approach

All components use inline styles exclusively to ensure:
- Exact pixel measurements
- Precise color values
- No CSS cascade interference
- Complete independence from external CSS
- Resilience to CSS loading failures

### Constants

All dimensions, colors, and typography are centralized in `src/constants.ts`:

```typescript
DIMENSIONS - Component dimensions (width, height, padding, etc.)
COLORS - Color palette (hex values)
TYPOGRAPHY - Font properties (family, size, weight, etc.)
```

## Error Handling

### Font Loading Fallback

- Primary font: Montserrat (Google Fonts)
- Fallback chain: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif
- Font loading detection via `useFontLoading` hook
- Automatic fallback if Montserrat fails to load

### CSS Loading Fallback

- All components use inline styles
- No dependency on external CSS files
- Component remains functional if CSS fails
- CSS loading detection utilities available

### Rendering Error Handling

- ErrorBoundary catches component errors
- Displays user-friendly fallback UI
- Logs detailed error information
- Prevents entire app from crashing

### Edge Case Handling

- Rapid click protection with animation state tracking
- Click queuing prevents concurrent state transitions
- Independent animation state per checkbox
- Functional state updates prevent race conditions

## Installation

```bash
npm install
```

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server at http://localhost:5173

### Build

```bash
npm run build
```
Creates production build in `dist/` directory

### Preview

```bash
npm run preview
```
Preview production build locally

### Linting

```bash
npm run lint
```
Run ESLint to check code quality

### Testing

```bash
npm test
```
Run tests in watch mode

```bash
npm run test:run
```
Run tests once (CI mode)

```bash
npm run test:ui
```
Run tests with UI interface

## Testing

The project includes comprehensive unit tests for all components:

- 76 tests across 10 test files
- Component rendering tests
- Interaction tests (clicks, hovers)
- State management tests
- Dimension and styling accuracy tests
- Error handling tests
- Font loading tests

Test utilities:
- `hexToRgb()` - Converts hex colors to RGB for comparison
- `normalizeColor()` - Normalizes color strings for testing

## Demo

You could open the demo using this link : https://page-selection-component.vercel.app/