# Vue Boilerplate

<!-- vscode-markdown-toc -->

- [Vue Boilerplate](#vue-boilerplate)
  - [1. <a name='Projectsetup'></a>Project setup](#1-a-nameprojectsetupaproject-setup)
    - [1.1. <a name='Compilesandhot-reloadsfordevelopment'></a>Compiles and hot-reloads for development](#11-a-namecompilesandhot-reloadsfordevelopmentacompiles-and-hot-reloads-for-development)
    - [1.2. <a name='Compilesandminifiesforproduction'></a>Compiles and minifies for production](#12-a-namecompilesandminifiesforproductionacompiles-and-minifies-for-production)
    - [1.3. <a name='Lintsandfixesfiles'></a>Lints and fixes files](#13-a-namelintsandfixesfilesalints-and-fixes-files)
  - [2. <a name='GoalsandValues'></a>Goals and Values](#2-a-namegoalsandvaluesagoals-and-values)
  - [3. <a name='BestPractices'></a>Best Practices](#3-a-namebestpracticesabest-practices)
    - [3.1. <a name='Dontaccessstoreincomponents'></a>Don't access \$store in components](#31-a-namedontaccessstoreincomponentsadont-access-store-in-components)
      - [3.1.1. <a name='Howtoavoidstoreforactions'></a>How to avoid \$store for actions](#311-a-namehowtoavoidstoreforactionsahow-to-avoid-store-for-actions)
      - [3.1.2. <a name='Howtoavoidstoreforstate'></a>How to avoid \$store for state](#312-a-namehowtoavoidstoreforstateahow-to-avoid-store-for-state)
      - [3.1.3. <a name='Howtoavoidstoreingetters'></a>How to avoid \$store in getters](#313-a-namehowtoavoidstoreingettersahow-to-avoid-store-in-getters)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## 1. <a name='Projectsetup'></a>Project setup

```
npm install
```

### 1.1. <a name='Compilesandhot-reloadsfordevelopment'></a>Compiles and hot-reloads for development

```
npm run serve
```

### 1.2. <a name='Compilesandminifiesforproduction'></a>Compiles and minifies for production

```
npm run build
```

### 1.3. <a name='Lintsandfixesfiles'></a>Lints and fixes files

```
npm run lint
```

## 2. <a name='GoalsandValues'></a>Goals and Values

1. Create high velocity starting point
2. Allow maintaining velocity overtime
3. Easy to understand
4. Easy to change

## 3. <a name='BestPractices'></a>Best Practices

Below are best practices that should be followed and that we should help each other adhere to in code reviews.

### 3.1. <a name='Dontaccessstoreincomponents'></a>Don't access \$store in components

We don't want to couple components to the store implementation details. This will allow us to easily change the details of how the our store is implemented or even allow us to use something other than a vuex store in the future (an unlikley scenario but noble goal).

#### 3.1.1. <a name='Howtoavoidstoreforactions'></a>How to avoid \$store for actions

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

#### 3.1.2. <a name='Howtoavoidstoreforstate'></a>How to avoid \$store for state

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

#### 3.1.3. <a name='Howtoavoidstoreingetters'></a>How to avoid \$store in getters

We should put getters in the store that the data lives in. The details of how that data is accessed is a store concern. We want restructuring our state atom to be easy and easiest way to improve that is by coupling state access detials with the store, and not with the components.
