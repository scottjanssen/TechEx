# TechEx

## GCP Deployment

First create the JAR file of the Spring Boot Application using the following command in the directory `/spring-boot/`

```
$ mvn package
```

Then change all API request URLs to use https://api-dot-location-search-361515.ue.r.appspot.com.

and then build the Node.js package using the following commands in the directory `/react/`

```
$ npm install
$ npm run build
```

Then we upload the following files/directories to our Cloud Shell in our GCP Project's App Engine.
Remember to first delete any of the files in the Cloud Shell that are already there before uploading.

```
/react/build/
/react/frontend.yaml
/spring-boot/target/LocationSearch-1.jar
/spring-boot/src/main/appengine/backend.yaml
```

Then run the following deployment commands to deploy the application in the Cloud Shell terminal.
First for the back-end:

```
$ gcloud app deploy backend.yaml
```

Then the front-end:

```
$ gcloud app deploy frontend.yaml
```

Now the app should be running at https://location-search-361515.ue.r.appspot.com.

## Local Deployment

### Frontend

* Navigate to the "react" folder
* Ensure that you have the latest version of node.js installed
* Install all of the packages needed to run the application using
```
npm install
```
* Run the frontend using the command
```
npm start
```

### Backend

* Navigate to the "express" folder
* Ensure that you have the latest version of node.js installed
* Install all of the packages needed to run the application using
```
npm install
```
* Run the backend using the command
```
npm start
```
or 
```
node index.js
```

## Local Test Running

### Backend Whitebox Tests via JEST

* Run the test suite using the command
```
npm run test
```

### Frontend Tests via Cypress

* First, ensure that both the backend and frontend are running as outlined in the previous steps.
* Open up another terminal window and navigate to the "react" folder.
* Run the following command:
```
npm install cypress --save-dev
```
Now, to run the tests via the cli, type the following in the terminal:
```
npx cypress open
```

As you may notice, the cypress application will open. Select end to end (E2E) testing and select chrome as the preferred browser.

Now, you will be greeted with a variety of test suites. Most of them are samples, but the one at the bottom named "convert" is the one we want to run. Click on it and it will begin to run, navigating through the app. Once the testing suite ends, you are welcome to step through each step of an individual test to see what is going on.

## Application File Hierarchy

Frontend is under "react" and Backend is under "express".

react/cypress/e2e:
* convert.cy.js: blackbox cypress tests

react/src/:
* App.js: Code related to linking pages
* currencyList.js: Static list of currencies utilized in the dropdown components
* MainPage.js: JavaScript file that represents the main page of the application, where all components are imported.
* index.js: Root start of all the codes
* index.css: CSS for index.js
* reportWebVitals.js: Code for testing performance
* setupTests.js: Code for jest tests for DOM

react/src/components/:
* Buttons.js: Common buttons used within the application
* Dropdown.js: File which contains all of the dropdowns and text inputs to be used at the top of the page.
* Footer.js: Footer of every page in the application
* Header.js: Header of every page in the application
* HistoricalChart.js: D3.js chart that displays historical data as well as predicted data from our ML model. 
* SumEx.js: table to display list of transactions, has been omitted in the application due to lack of time.

prediction/:
* Contains ML models, training data and images.

express/:
* index.js: Root start of the backend service.

express/db/:
* conn.js: File which orchistrates connection to the database and associated methods.

express/resources/:
* Contains ML model to be utilized on the backend

express/routes/:
* record.js: Contians all backend endpoints, some of which are used on the frontend, which others are internal and are only used within the backend itself.

express/tests/:
* masterTest.test.js: Utilizes JEST to test most used endpoints with different combinations of inputs. Performs Whitebox testing.

## Using the Application

Immediately after starting up the single-page application, users will be greeted with a variety of components. 

Starting with the first row of boxes, a dropdown and a textbox will be placed adjacent to each other. The left dropdown represents the currency to convert from (your starting currency). The textbox to the right of that dropdown is the amount to convert from.

The second row of items represents the desired results of the transaction. The left dropdown represents the currency to convert to. The right textbox is the final result of the transaction once the user presses submit. 

Once all 3 boxes have data entered in them, press submit and your result will appear in the lower right textbox. Additionally, a graph will be populated below which shows the historical records for conversion between those two currencies. In addition, pressing the magnifying glass button on the lower right-hand side of the graph adds the predicted trends from the ML model. We hope users can use the prediction data in order to make a little bit of money during these trying times in the stock market. 
