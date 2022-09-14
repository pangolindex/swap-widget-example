This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting started


1. Pangolin's SwapWidget is compatible with Next.js via Dynamic import. 
```ts
import type { SwapWidget as SwapWidgetType } from '@pangolindex/components';
...
const SwapWidget = dynamic(
  () => import('@pangolindex/components').then((module) => module.SwapWidget) as any,
  {
    ssr: false,
  },
) as typeof SwapWidgetType;
```
2. make sure you have `reactStrictMode: false` in `next.config.js` file as `@pangolindex/components` doesn't support strict mode as of now.
3. Make sure you follow Introduction guide [here](https://components-dusky.vercel.app/?path=/story/guide-introduction--page)
4. Wrap your entire app with `PangolinProvider`, make sure you are using dynamic import.

## Running locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.