## How to run
### Prerequisites
1. [NODE](https://nodejs.org/en/download)
2. [TYPESCRIPT](https://www.typescriptlang.org/download/)

### Deployed Links  
1. [Visit UI](https://tip-calculator-u5o1.vercel.app/)
2. [GitHub](https://github.com/agigibairene/tip_calculator)


## Stack & design choices
| Component         | Technology                          |
|-------------------|-------------------------------------|
| Framework         | React Typescript                    |
| Styling           | Tailwind CSS                        |

1. The choice of React is rooted in its high-performance capabilities, primarily due to its utilization of the Virtual DOM. This enhances speed and high performance. The reusability feature of React components enables maintainability by breaking user interface (UI) components into manageable pieces and reducing code repetition.

2. React TypeScript was chosen to mitigate common type errors, since is all around numeric conversions

3. For styling, Tailwind CSS, a CSS framework, was used. Its low-level utility classes allowed direct styling of elements within the .tsx files, smoothing the styling process and removing the need to navigate between files. Tailwind also made responsive design easier because it contains breakpoint utility classes 

4. Layout decision: split-pane design
    One major visual decision was splitting the interface into two equal columns on desktop and stacked layout on mobile: A split layout such that users don’t need to scroll between input and result. On mobile, it collapses into a column because horizontal space becomes limited, but the same logical flow is preserved.

5. Rounded **Amount Per Person** to the nearest whole number to avoid them paying below the amount


## Responsive & accessibility
On a 360px phone, the app switches to a single-column `flex columns` layout where inputs stack above results and everything is optimized for vertical scrolling and mobile input comfort, while on a 1440px laptop it becomes a two-column ```flex-row``` dashboard with inputs on the left and live results on the right for better side-by-side comparison.


## AI usage
- The AI suggest I use useMemo to cache my output hence optimizing my application so I implemented it for all calculations
- The AI suggested I use `min-h-screen` instead of `h-screen` to make the application scrollable on smaller screens hence I switched to `min-h-screen`
- The AI suggest I add `min-w-0` to buttons and custom input field to give them equal width hence I added it