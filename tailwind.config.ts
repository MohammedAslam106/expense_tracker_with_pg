// import type { Config } from 'tailwindcss'

import { withUt } from "uploadthing/tw";
import {nextui} from "@nextui-org/react";
 
export default withUt({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens:{
        'mobile-h':{'raw':'(max-height:400px)'},
        'sm':'800px',
        'xs':{'raw':'(max-width:500px)'}
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
});

// const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//       screens:{
//         'mobile-h':{'raw':'(max-height:400px)'},
//         'sm':'800px',
//         'xs':{'raw':'(max-width:500px)'}
//       }
//     },
//   },
//   plugins: [],
// }
// export default config
