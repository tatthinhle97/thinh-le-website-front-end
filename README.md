# General notes

This React app is being built using React Router framework.</br>
Create a new project with JavaScript template using this command:

```bash
npx create-react-router@latest --template remix-run/react-router-templates/javascript

```

# Create new React app using Vite

```bash
npm create vite@latest
```

# Deployment

Create a new account on [Vercel](https://vercel.com/) and follow the instructions on the website.

Note: Can either import from GitHub or use a template on Vercel.

# Editor and app configurations

## Eslint

### Install and configure ESLint

```bash
npm init @eslint/config@latest
```

[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) is an ESLint plugin that includes rules specifically for React projects.

### ESLint Stylistic

#### `@stylistic/eslint-plugin-js`

JavaScript stylistic rules for ESLint, migrated from eslint core.

```bash
npm i -D @stylistic/eslint-plugin-js
```

#### `@stylistic/eslint-plugin-jsx`

JSX stylistic rules for ESLint, migrated from eslint-plugin-react. Decoupled from React and supports generic JSX syntax.

```bash
npm i -D @stylistic/eslint-plugin-jsx
```

### Run eslint

Run this command in the terminal `npm run lint`. Remember to set `"lint": "eslint ."` in the `package.json` file.

## VsCode

### User settings

Check out the `vscode-settings.json` for my settings.

## `jsconfig.json` and `tsconfig.json`

The `tsconfig.json` file specifies the root files and the compiler options required to compile the project.

JavaScript projects can use a `jsconfig.json` file instead, which acts almost the same but has some JavaScript-related compiler flags enabled by default.

View the [TypeScript compilerOptions documentation](https://www.typescriptlang.org/tsconfig/#compilerOptions) for more information.

# Project structure

## Main flow

In a React Router v7 app, the main flow begins by wrapping the application with a router component like `<BrowserRouter>`, which enables routing capabilities. Inside this, routes are defined using the `<Routes>` component, with individual `<Route>` elements specifying a path and the component to render. Navigation between routes is handled using `<Link>` or programmatically through the `useNavigate` hook. Route-related data such as URL parameters, query strings, and location info can be accessed using hooks like `useParams`, `useSearchParams`, and `useLocation`. For nested routing, the `<Outlet>` component renders child routes in the parent layout. Additionally, React Router supports advanced features like route loaders, actions, and the useRoutes hook for dynamic route configurations.

## `sitemap.xml` generator

Execute this command `node sitemap-generator.mjs`

# Global state management with Redux

A JS library for predictable and maintainable global state management.<br>
Install Redux Toolkit and React-Redux:

```bash
npm install @reduxjs/toolkit react-redux
```

Redux components:
- Store: The central place that holds the application's state and allows state access, updates, and subscription to changes.
- Slice: A portion of the Redux state and logic.
- Reducers: Pure functions that take the current state and an action, then return the new state based on the action type.
- Actions: Plain objects describing what happened in the app, usually containing a `type` and an optional `payload`.
- Immer library: A library used by Redux Toolkit to allow writing immutable update logic in a more concise, mutable-looking style.

## Select structured pieces of state with Reselect

Select multiple slices from state.

```bash
npm install reselect
```

# CSS with Tailwind CSS

Follow the instructions on the [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) website.

Quick links:
- [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
- [Theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)

# Icons with Hugeicons

Follow the instructions on the [Huge Icons](https://docs.hugeicons.com/license/activate-license) website.

Steps:
- Create an `.npmrc` file in local environment:
```
@hugeicons-pro:registry=https://npm.hugeicons.com/
//npm.hugeicons.com/:_authToken=${HUGEICONS_AUTHENTICATION_TOKEN}
```
- Add a new environment variable `HUGEICONS_AUTHENTICATION_TOKEN` in **Settings → Environment Variables** on Vercel.

# Form components with HeadlessUI

```bash
npm install @headlessui/react
```

# Dynamic text typing with `typed.js`

```
npm install typed.js
```

# Map with Google

Follow the instructions on [Add a Google map to a React app](https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js)page.

Install these packages:

```bash
npm install @vis.gl/react-google-maps
npm i @googlemaps/markerclusterer
```

Create an API key on [Google Console](https://console.cloud.google.com/).

## Map ID

A map ID is a unique identifier that represents Google Map styling and configuration settings that are stored in Google Cloud.<br>
Go to [Maps Management](https://console.cloud.google.com/google/maps-apis/studio/maps?_gl=1*k98g7u*_ga*MTU5MTEzMTk3LjE3NDc4MjU5NjM.*_ga_NRWSTWS78N*czE3NDc4MzIxODUkbzMkZzEkdDE3NDc4MzM3NTgkajAkbDAkaDA.) page to create a map ID.

Note: Using a Map ID on Maps SDK for Android or Maps SDK for iOS triggers a map load that is charged against the Dynamic Maps SKU. See [Google Maps Billing](https://developers.google.com/maps/billing-and-pricing/pricing#dynamic-maps) for more information.

## Quick links

- [Map component](https://visgl.github.io/react-google-maps/docs/api-reference/components/map)
- [Advanced markers](https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker-)

# Design handbook

## Avoid Largest Contentful Paint (LCP)

Largest Contentful Paint (LCP) is one of the three Core Web Vitals metrics, and it represents how quickly the main content of a web page is loaded. Click [here](https://web.dev/articles/optimize-lcp#how-to-optimize-each-part) for how to optimize LCP.

Example: Loading images with big size will consume time -> Optimize images with WebP or AVIF formats.

## Cumulative Layout Shift (CLS)

CLS is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifecycle of a page. Click [here](https://web.dev/articles/optimize-lcp#how-to-optimize-each-part) for how to optimize LCP.

Example: a footer component in a layout component will be shifted down when the page content is loaded.

# Coding handbook

## Kill active process by port and PID

```bash
$ netstat -ano | findstr :5173
$ taskkill /pid 12345 /f
```

## Rebase code

Steps:
- Find the commit that **before all** added comits.
- Execute `$ git rebase -i <commit>`
- The one on top in the console is the oldest commit, keep that one and squash the remaining ones.

Example:
```
pick 938d70d Added body component
squash bd07d60 Upgrade tailwind
squash b73e85a Add header
squash abd79c7 Complete the home page
squash daadbf2 Complete about me page
squash 3b5978b Migrated project
```

- Edit the comit messages.
- Execute `git push -f` to overwrite the changes