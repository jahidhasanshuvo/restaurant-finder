# Restaurant Finder

![REACT](https://place-hold.it/80x33/433/fff?text=REACT&bold)&nbsp;
![REDUX](https://place-hold.it/80x33/506/fff?text=REDUX&bold)&nbsp;
![WEBPACK](https://place-hold.it/150x33/042/fff?text=CREATE-REACT-APP&bold)&nbsp;
![TYPESCRIPT](https://place-hold.it/130x33/104/fff?text=TYPESCRIPT&bold)&nbsp;

## What's Included

- `react`
- `create-react-app` \[For creating boilerplate\]
- `typescript`
- `redux`
- `redux middleware` \[**Thunk & logger**\]
- `redux toolkit` \[A better way to use **redux**\]
- `Antd`
- `ABEM` \[Naming convention for design\]
- `Atomic Design Principle`
- `jest`
- `puppeteer` \[for end-to-end testing\]
- `mobile responsive design`

## REQUIREMENTS

    "node": ">=14.0.0 <15.0.0"

## INSTALLATION

1. `cd /project-directory`
2. make a file named `.env`
3. copy the content of `.example.env` and paste to `.env`
4. give the following env variable value from `FOURSQUARE API`
   > REACT_APP_FOURSQUARE_CLIENT_ID=
   > REACT_APP_FOURSQUARE_CLIENT_SECRET=
   > REACT_APP_FOURSQUARE_CATEGORY=
   > REACT_APP_STARTING_POINT= 23.781353357876625, 90.40048187756598
   > REACT_APP_RADIUS_IN_METER= 3000
5. `npm install` or `yarn`
6. `npm start` or `yarn start`
7. `npm test` or `yarn test`

## LIMITATIONS

1. Collect the restaurant data and location from `Foursquare API`. And showing the map view from `google-map` using `iframe`. So the data may mismatch a little bit. And consistency depend on Foursquare.
2. There was only a single page or user interface. Thats why `react-router` is not used. For this simple task redux unnecessary but it was included because of requirements
3. Some test cases are missed because of time constraints

## Project Stucture & Architecture

### Design Strcuture

1. Atomic design principle was followed
2. User Interface can broken down into `atoms`,`molecules`, `organisms` and `template` as components.
3. The main output will be rendered as a `page`.
4. `sass` is used as a css preprocessor for styling

### Global State Structure

1. `Redux` is used as global state management
2. Store will wrap the main component to use the state globally
3. Multiple reducer can be created and will be included into the `src/redux/root.reducer.ts`

### Naming Convention

1. `camel case` is used for js function and variable
2. `pascal case` is used for naming components
3. For html tag's classname `ABEM` convention is used

### Folder Structure

#### Components & Pages

1. components are in `src/components/` folder
2. And page which is the main user interface is in `src/pages/` folder
3. each component or page may consist 3 files.
   1. .tsx [html output with some js]
   2. .scss [design file]
   3. .test.tsx [test case]

#### Assets (common js logic, styles and images )

1. Common logic and styles, images can be included in `src/assets/` folder
2. Common logic across different pages can be included `srs/assets/scripts` as `pageName.ts`
3. Mixin, variable and some common sass setup file can be included in `src/assets/styles`

#### Networks [Api call related]

1. Api url and axios funciton is included in `src/networks` folder

#### Redux

1. `src/redux/store.ts` file included all setup for redux, middleware and rootreducer.
2. `src/redux/root.reducer.ts` combine all the reducer
3. Different reducer depended on application can be included into an folder inside `src/redux` folder. Whice folder will be consists of 3 files
   1. **reducerName.slice.ts** [ here initial state, reducers, extrareducers will be included and `redux-toolkit` will generate the actions from reducers ]
   2. **reducerName.action.ts** [here thunk action and action creator funciton will be included]
   3. **reducerName.selector.ts** [selector will be included here. *we can use **`reselect`** library here for memoization the selector for increasing performance in bigger application ]
