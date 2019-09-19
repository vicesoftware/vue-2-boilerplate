# Vue Boilerplate

<!-- TOC -->

- [Vue Boilerplate](#vue-boilerplate)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
  - [Goals and Values](#goals-and-values)
  - [Folder Structure](#folder-structure)
  - [Best Practices](#best-practices)
    - [Don't access \$store in components](#dont-access-store-in-components)
      - [How to avoid \$store for actions](#how-to-avoid-store-for-actions)
      - [How to avoid \$store for state](#how-to-avoid-store-for-state)
      - [How to avoid \$store in getters](#how-to-avoid-store-in-getters)

<!-- /TOC -->

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Goals and Values

1. Create high velocity starting point
2. Allow maintaining velocity overtime
3. Easy to understand
4. Easy to change

## Folder Structure

We are using the following folder structure

```
- src
   - assets
   - common
   - layout
   - modules
   - ui
   - views
   - main.js
   - router.js
   - store.js
```

where

- assets
  - images and other static content
- common
  - crosscutting concerns other than UI widgets
- layout
  - components like `NavBar`, `Footer`, etc... that are just used to postion and style the page
- modules
  - contains self contianed commonjs modules contain one or more components, styles and/or vuex store related files. Each module would either map to an application feature or a domain entity.
- ui
  - contains cross cutting UI components like `Modal`, `BusyIndicator`, `NotificationPopup`. These are UI widgets that are used by lots of other components and generally not domain specific.
- views
  - contains all of the pages of our app that are registered with in `router.js`. This provides an easy starting point to finding code as you can browse the apps pages to find where you need to go.
- main.js
  - entry point to app
- router.js
  - contains Vue Router configuration
- store.js
  - root of Vuex store

## Best Practices

Below are best practices that should be followed and that we should help each other adhere to in code reviews.

### Don't access \$store in components

We don't want to couple components to the store implementation details. This will allow us to easily change the details of how the our store is implemented or even allow us to use something other than a vuex store in the future (an unlikley scenario but noble goal).

#### How to avoid \$store for actions

**Bad**

```javascript
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
```

**Good**

```javascript
  created() {
    this.fetchEvents({
      // I don't know there is a store
      perPage: this.perPage,
      page: this.page
    })
  },
  methods: {
    ...mapActions({ fetchEvents: 'event/fetchEvents' })
  },
```

#### How to avoid \$store for state

**Bad**

```vue
<EventCard
  v-for="event in $store.state.event.events"
  :key="event.id"
  :event="event"
/>
```

**_Bad_**

```vue
<EventCard v-for="event in event.events" :key="event.id" :event="event" />
```

```javascript
  computed: {
    event() {
      return this.$store.state.event
    }
```

**Good**

```vue
<EventCard v-for="event in event.events" :key="event.id" :event="event" />
```

```javascript
  computed: {
    ...mapState(['event'])
  }
```

#### How to avoid \$store in getters

We should put getters in the store that the data lives in. The details of how that data is accessed is a store concern. We want restructuring our state atom to be easy and easiest way to improve that is by coupling state access detials with the store, and not with the components.

## TODO
[] Create testing sample
[] Create testing documentation
[] Document module pattern
[] Document standard interface
