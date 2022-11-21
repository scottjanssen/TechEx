# TechEx

## Background, Motivation and Scope

Given the state of the U.S economy, Americans are looking away from the stock and bond market as an avenue to growing their retirement fund. What many people don’t know is that exchange rates can be utilized in this exact fashion in order to make a profit – albeit with a lot more personal involvement. The goal of our application, TechEX, is to streamline this process of “currency hopping” by providing machine learning (ML) models in order to better project the transactions needed to maximize profit. At its base, the application will be able to execute simple exchange rate commands and display historical data. The addition of the ML models takes a simple single page web application to the next level in terms of complexity and work required.  As students, we aim to expand upon the topics explored in project 1 (software development lifecycle, common production tools/technologies for web development, as well as professional teamwork and communication) while also exploring machine learning as both a technology and concept.  

## Project Management
Our project management tool of choice, Zenhub, adds a Kanban board structure to GitHub. It allows for GitHub bugs and stories to be connected to the board and displayed in a visual fashion. We have been meeting once a week via Microsoft Teams to update each other on our progress, and usually text each other multiple times a day when small things come up.

In general, we've had relativily flexible responsibilities given our scattered expertise. Below is a table summarizing our individual roles:

| Team Member Name | Roles |
| ----------- | ----------- |
| Scott Janssen | Backend Engineer, QA Lead, Project Manager |
| Summer Sneed | Frontend Engineer, UI Lead |
| Sam Lee | Backend Engineer, Algorithms Expert |
| Balaram Behera | Frontend Engineer, ML Expert, Requirements Lead |

Note that these roles are not static. Team members are expected to contribute whereever needed, especially if they are proficient in areas that they are not focussed on for this project.

## Literature Review

## Software Technologies
To create TechEx, we decided to follow the MERN (Mongo, Express, React and Node) stack. There are several reasons why we chose this stack over our previous usage of Java and React. Firstly, all of the separate MERN technologies work exceptionally well together. It's very easy to connect a Mongo database to an Express backend, and Express integrates well with a React frontend given that they are written in the same language. The second reason for using MERN over another grouping of technologies is that the frontend and backend are both written in JavaScript. This makes it significantly easier for us as students to work efficiently in a short timeframe. Additionally, Mongo is very easy to use out of the box and provides an interactive UI to help inexperienced developers understand the workings of a basic database system. 

//Balaram, add a paragraph here about the ML technologies used

As of writing this report, we plan on deploying our application to Google App Engine.

## Project Lifecycle
Given the short time given to plan, design and execute this project, we've had to move quickly with little or no time for iteration. With this in mind, we've mostly followed a waterfall based lifecycle for the duration of development. The first week consisted of cementing our ideas, choosing technologies and writing some barebones code. Weeks 2-4 have been dedicated to writing code for our application, running ML models and creating tests to verify our design. The final week will be dedicated to making any finishing touches, deploying our application and writing any documentation required.

## Requirements

### Functional

### Non-Functional

## Design

## Testing

### Blackbox Testing
For Blackbox testing, we wanted to implement realistic, functional tests that mirrored what users would actually experiences when using our application. In order to achieve this, we needed to find a complex testing framework that can mimic those actions. Enter the Cypress testing framework. Cypress is a JavaScript based library that relies on HTML ids and classnames to perform actions on UI elements. For example, using Cypress, a developer could automate writing in a specific textbox and comparing the result to an expected one. Similar principles can be applied to our own application. Below is a table describing all cypress tests performed

| Test Name | Description |
| ----------- | ----------- |
| Null Currencies Check | Cypress automates the conditional case in the event that a currency exchange is attempted to be made without selecting a currency to start and/or end from. In the event this occurs, the UI should return a result of: "Error: Cannot have null currencies" |
| 0 Value Check | Cypress automates the conditional case in the event that a currency exchange is attempted to be made, but, a value of 0 is inputted as the value to translate. In the event this occurs, the UI should return a result of: "Error: Cannot have a zero value" |
| Negative Value Check | Cypress automates the conditional case in the event that a currency exchange is attempted to be made, but, a negative value is inputted as the value to translate. In the event this occurs, the UI should return a result of: "Error: Cannot have a negative value" |
| Correct Value Check | Cypress automates the conditional case in the event that a correct currency exchange is performed. In order for a currency exchange to be proper, a start and end curency must be selected, and the value of conversion must be positive (but not zero). In the event all of these occur, the test will pass. |

### Whitebox Testing

Given the purpose of our application, whitebox testing is a bit more difficult. It is hard to test the effectiveness of ML applications, and even harder to test the dynamics of using ML within an application. What we can do, however, is test the validity of our backend endpoints. We have two types so far: convert, which returns the result of a currency conversion, and timeseries, which returns historical conversion data between two dates. To perform our whitebox tests, we utilized jest, a popular javascript testing framework. Below are the test cases we performed.

| Test Name | Description |
| ----------- | ----------- |
| /convert USD to EURO | This test performs a conversion of 5 Euros to an X amount of USD. The test checks if the status response is 200. |
| /convert EURO to USD | This test performs a conversion of 25 USD to an X amount of Euro. If the status response is 200, the test passes. |
| /timeseries USD 1 | This test grabs all historical conversion data for the USD from May 1st, 2012 to May 5th, 2012. If the status response is 200, the test passes. |
| /timeseries USD 2 | This test grabs all historical conversion data for the USD from November 5th, 2017 to November 8th, 2017. If the status response is 200, the test passes. |

## UI
