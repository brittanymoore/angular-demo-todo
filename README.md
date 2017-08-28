# Demo: Todo

This is a demo developed from my [seed repo](https://github.com/brittanymoore/angular-seed). It extends the 
seed with todo functionality, with some example mocking and unit tests.

This repo includes the following:
* angular
* webpack
* typescript
* sass
* AOT w/ lazy-loading (@ngtools/webpack)
* unit testing with karma
* end-to-end testing with protractor
* backendless development wih mocks

## Getting Started

### Get the Code

```
git clone https://github.com/brittanymoore/angular-demo-todo.git
cd angular-demo-todo
npm install
```

### Launch the App

To run the app in development mode:

```
npm run start
```

Once the server is running, open a browser and navigate to localhost:3000.

### Build

Vertex currently has the following build modes.

| Build Mode        | Command        | Output   | EnableProdMode | Uglify | AOT   |
| ----------------- | -------------- | -------  | -------------- | ------ | ----- |
| Dev               | build          | dev      | false          | false  | false |
| Prod              | build:prod     | dist     | true           | true   | true  |

Each mode has a start command similar to the one above, which can be used to launch the app in localhost:

```
npm run start
npm run start:prod
```

### Test

Support is built-in for unit testing with Karma and end-to-end testing with Protractor.

Unit tests should be added to a file named **.spec.ts somewhere in src directory tree. To run the tests:

```
npm run test
```

E2E tests should be added to a file named **.e2e.ts somewhere in the src directory tree. To run the tests:

```
// initialize or update webdriver
npm run webdriver-manager

// run these commands in separate windows
npm run start
npm run test:e2e
```

### Mocking

This project includes a 'mock' module that provides a fake backend for 
the rest of the application. The todo service is making http calls that are
intercepted by MockModule.