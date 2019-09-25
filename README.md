# :rocket: Vue Boilerplate

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
  - [TODO](#todo)

<!-- /TOC -->

## :wrench: Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

or 

```
npm start
```

### Run Tests

```
npm test
```

To run without watch option `--watch`

```
npm run test:unit
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

to fix problems

```
npm run lint --fix
```

## :hearts: Goals and Values

1. Create high velocity starting point
2. Allow maintaining velocity overtime
3. Easy to understand
4. Easy to change

## :file_folder: Folder Structure

We are using the following folder structure

```
- src
   - __mocks__
   - assets
   - common
   - layout
   - components
      - layout
   - store
   - views
   - main.js
   - router.js
```

where

- `__mocks__`
  - contains Jest mocks that can be swapped with `node_modules` components at runtime in tests. See [Jest documentation](https://jestjs.io/docs/en/manual-mocks.html) for details.
- `assets`
  - images and other static content
- `common`
  - crosscutting concerns other than UI widgets
- `components`
  - contains Vue components. For complext components that have more than one component put them in a `PascalCased` folder by the same name of the most commonly exported component (example Grid) and make that component the default export in your folders `index.js` file. If you ahve other related components that need to be exported (example Column, Row, etc...) then make those named exports in your `index.js`
  - `layout`
    - components like `NavBar`, `Footer`, etc... that are just used to postion and style the page
- `store`
  - default export is root of Vuex store
  - contains one folder for each tree of the store and each store follows the standar interface described below
- `views`
  - contains all of the pages of our app that are registered with in `router.js`. This provides an easy starting point to finding code as you can browse the apps pages to find where you need to go.
- `main.js`
  - entry point to app
- `router.js`
  - contains Vue Router configuration


## :trophy: Best Practices

Below are best practices that should be followed and that we should help each other adhere to in code reviews.

### Avoid big store files by using commonjs modules
Over time our store files will get really large as they start containing all our filtering logic, http call logic, etc... To avoid this getting messy we are taking advantage of commonjs module pattern using a standard interface. For each store create we will create a new folder.

```
- store
   - busyIndicator
      - busyIndicator.actions.js
      - busyIndicator.getters.js
      - busyIndicator.mutations.js
      - busyIndicator.mutationTypes.js
      - index.js
   - store.js
```

We will create one file for each of properties of the store object we need to export for the root store to consume and also for components to consume. The `index.js` file will export these four files using the standard interface shown below.

```javascript
import mutations from './busyIndicator.mutations'
import * as getters from './busyIndicator.getters'
import * as actions from './busyIndicator.actions'
import { buildActionsTypes } from '@/common/vuexUtilities'

// initial state of this store
const state = {
  count: 0
}

// creates namespaced actions which avoids name collision and also makes debugging easier as you know where an action came from
const namespaced = true

// allows for easier refactoring of store as we use this in the root store to specify the name of this store on the state atom
export const MODULE_NAME = 'busyIndicator'

// this is all the properties that are required for each store we add to root store. we combine them under this store element here for convience when wiring up to the root store
export const store = {
  state,
  namespaced,
  mutations,
  getters,
  actions
}

// Optional, allows other modules/components to easily call this modules actions
export const actionTypes = buildActionsTypes(actions, MODULE_NAME)
```
Following this pattern has a number of advantages. One is that it make wiring up our new stores to the root store easy to setup and easy to refactor.

```javascript
export default new Vuex.Store({
  modules: {
    [BusyIndicator.MODULE_NAME]: BusyIndicator.store,
    // other stores
  },
```

Because we are using this approach if we rename our store it will be trivial to update the store as we can use the refactor tools of our IDE and just make sure we change `MODULE_NAME` in our store's `index.js` file and we are done. No magic strings to find and replace.

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
