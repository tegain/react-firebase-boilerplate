# React Expensify

## Dev
```
# Start dev server
yarn run dev-server
```

Webpack will compile all JS into `public/bundle.js`, and CSS into `public/styles.css`.
SourceMaps are allowed (see `webpack.config.js` file)



## Tests
Using Jest and Enzyme



```
# Run tests
# Will search for jest.config.json file as defined in the NPM command
yarn test
```
```
#Run tests with watcher
yarn test --watch
```

Basic jest.config.json file
```json
{
  "setupFiles": [
    // Using polyfill for RequestAnimationFrame
    "raf/polyfill",
    // Enzyme config file
    "<rootDir>/src/tests/setupTests.js"
  ],
  "snapshotSerializers": [
    // Used to test snapshots
    "enzyme-to-json/serializer"
  ]
}
```

## Firebase

### Config

#### For test and development environments

Create 2 Firebase databases (real one, and test one).
Set config in `.env` files, as `KEY=value` properties.

Set the environment variables in `webpack.config.js` file (as a `new webpack.DefinePlugin()`)

Then, in the `/src/firebase/firebase.js` file, get the `process.env.FIREBASE_XX` variables.

#### For production environment, with Heroku

Access the Heroku config CLI:
```
heroku config
```

Then set each `FIREBASE_XX` variable a new variable as a `KEY=value` pair:
```
heroku config:set FIREBASE_XX=value FIREBASE_YY=value etc.
```

### Config Firebase security

On the "Rules" pages on Firebase console, we can add rules for data validation, as following.
See doc.:
- https://firebase.google.com/docs/reference/security/database/
- https://firebase.google.com/docs/database/security/user-security

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
      "$user_id": {
        ".read": "$user_id === auth.uid",
        ".write": "$user_id === auth.uid",
        "expenses": {
          "$expense_id": {
          	".validate": "newData.hasChildren(['description', 'amount', 'note', 'createdAt'])",
          	"description": {
              ".validate": "newData.isString() && newData.val().length > 0"
            },
            "note": {
              ".validate": "newData.isString()"
            },
            "amount": {
              ".validate": "newData.isNumber()"
            },
            "createdAt": {
              ".validate": "newData.isNumber()"
            },
            "$other": {
              ".validate": false
            }
          }
        },
        "$other": {
          ".validate": false
        }
      }
    }  
  }
```

## Deployment

Using Heroku CLI

See server config in `server/server.js` file.

When typing the `git push heroku master` command, Heroku will run the `start` NPM script (which starts the Node.JS server).
Heroku will then run Webpack (the production build) using the `heroku-postbuild` NPM script defined in package.json (which runs itself the `yarn run build:prod` script)

```
#Login
heroku login
```
```
# Create new app
heroku create <app_name>
```
```
# Push to git
git push
```
```
# Push to heroku
git push heroku master
```
```
# Open app
heroku open
```
```
# View server logs
heroku logs
```


