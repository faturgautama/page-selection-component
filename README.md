# Page Selection Component

A pixel-perfect implementation of a page selection component based on Figma design specifications.

## Live Demo

[View Live Demo](https://page-selection-component.vercel.app/)

## Checklist Implementation

- [x] All 8 checkbox states are implemented
- [x] All button states are implemented
- [x] Component size exactly matches the example
- [x] Button size exactly matches the example
- [x] Checkbox shape exactly matches the example
- [x] Page scrolling works (6 pages total, 4 visible by default)
- [x] All colors exactly match the example
- [x] All indents between elements exactly match the example
- [x] If all pages are selected, the "All pages" checkbox is selected automatically

## Technology Stack

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4

## Project Structure

```
src/
├── components/
│   ├── Checkbox.tsx              # Checkbox with 8 animation states
│   ├── DividerLine.tsx           # Visual separator
│   ├── DoneButton.tsx            # Action button with 3 states
│   ├── HeaderSection.tsx         # "All pages" header
│   ├── MainWrapper.tsx           # Main container
│   ├── PageItem.tsx              # Individual page row
│   ├── PageSelectionComponent.tsx # Root component
│   └── ScrollablePagesSection.tsx # Scrollable pages container
├── constants.ts                   # Dimensions, colors, typography
├── App.tsx                        # Main app component
└── main.tsx                       # Entry point
```

## Component Features

### Checkbox States (8 states)

1. Empty/Default
2. Hover - Light
3. Pre-click
4. Transition to Checked
5. Checked/Active
6. Transition to Unchecked
7. Disappearing
8. Fading (returns to State 1)

### Button States (3 states)

1. Normal (background #FFCE22)
2. Hover/Active (background #FFD84D)
3. After Click (returns to Normal)

### Automatic Selection Logic

- Selecting all 6 individual pages automatically checks "All pages"
- Deselecting any page automatically unchecks "All pages"
- Checking "All pages" selects all 6 individual pages
- Unchecking "All pages" deselects all 6 individual pages

### Scrolling Behavior

- 6 pages total (Page 1 through Page 6)
- 4 pages visible by default
- Pages 5 and 6 require scrolling to view

## Design Specifications

### Dimensions

- Main Wrapper: 370×326px
- Checkbox: 25×25px
- Checkbox Icon: 17×12px
- Done Button: 340×40px
- Divider Line: 340px width

### Colors

- Main Border: #EEEEEE
- Text Primary: #1F2128
- Divider Border: #CDCDCD
- Checkbox Light Blue: #5087F8
- Checkbox Dark Blue: #2469F6
- Button Normal: #FFCE22
- Button Hover: #FFD84D

### Typography

- Font Family: Montserrat Regular
- Font Weight: 400
- Font Size: 14px
- Line Height: 130%

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts development server at http://localhost:5173

## Build

```bash
npm run build
```

Creates production build in `dist/` directory

## Preview

```bash
npm run preview
```

Preview production build locally
