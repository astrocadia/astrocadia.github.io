# Gumband V2

## Design Guidelines

Source of truth for the design guidelines is contained in a [Figma Doc](https://www.figma.com/file/WXkouxbpbj3I6bP5bBDvJk/GBV2-Design-System)

Navigation and general layout wireframe: [Figma wireframe](https://www.figma.com/file/sRsnal6knaTzqsoioMOwGu/Navigation?node-id=2595-41158&t=vuNNGfvtzz07WlZV-0)

Review if MUI to our design system: [MUI React Component Breakdown](https://www.notion.so/deeplocal/e037102945654bfab8ee7cc655728676?v=e051e91da7c84c5c92b00599c50968e9&p=77c1ffb20b3b4bbd81c37a06adbb372a&pm=s)

## Libraries / Reference

- [React v18](https://react.dev/blog/2022/03/29/react-v18)
- [Vite](https://vitejs.dev/) - Build system (replaces webpack and webpack-devserver)
- [Storybook](https://storybook.js.org/) - Specifically need to use v7 (pre-release) in order to work with Vite
- [MUI](https://mui.com/) - Base system used for components.  We will likely try to re-skin them so that our design looks better 
- [React Router](https://reactrouter.com/en/main)
- [PostCSS](https://postcss.org/)
- [Airbnb Eslint](https://github.com/airbnb/javascript)
- [Redux Toolkit](https://redux-toolkit.js.org/) - More specifically, the section on [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) as that is the desired way to call the API

## TODO

- [X] Base Vite set up
- [X] Eslint
- [X] Prettier
- [X] Stylelint
- [X] CSS nesting
- [X] CSS imports
- [X] CSS normalize
- [X] CSS Extends
- [ ] CSS mixins (?)
- [X] React Router 6
- [X] Starting Button component
- [X] Story book
- [ ] Document expected code layout
- [ ] Add documentation on the PostCSS plugins
- [ ] Testing env
- [X] Create npm commands in package.json to help automate tasks
- [X] Dockerfile
- [X] Pipeline
- [X] Review `<Outlet />` for React Router

## VSCode extensions

- ESLint
- Prettier
- Stylelint

## Stylelinting

Need to remove VCcode's default linting otherwise it will pick up errors that stylelint actually thinks is ok.  In settings.json add

```
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false
```

## Design Guidelines

Source of truth for the design guidelines is contained in a [Figma Doc](https://www.figma.com/file/WXkouxbpbj3I6bP5bBDvJk/GBV2-Design-System)

## Slack

During the refresh, questions can be asked on `#gumband-ux-refresh`
