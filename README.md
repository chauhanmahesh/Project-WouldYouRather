# WouldYouRather Project

My submission of the project "WouldYouRather" where I tried to use the React and Redux concepts which I learned as part of "React & Redux".
The concepts which I tried to use in this projects are as follows:
* Composition (Rendering UI by composing different React components)
* Redux to manage the state of application, middlewares, reducers.
* material-ui for the UI. (https://material-ui.com/)
* react-minimal-pie-chart for displaying Pie Chart (https://github.com/toomuchdesign/react-minimal-pie-chart)
* React Route (To route to different pages)

## Features
* App stars with a login page where we can select from available login in dropdown. This page displays current login user avatar when we selects the login user. 'Login' action can be tapped to login into the application.
* Once login, user is redirected to home page which displays a list of unanswered questions. It also displays the option to choose between 'Unanswered' and 'Answered' questions view. The main navigation allows user to navigate between home, new question and leaderboard page.
* In the questions list, user can choose to answer any question just by tapping on either 'optionA' or 'optionB'. Once user chooses any of the option, user is redirected to question detail page where user can see how many votes given to option A and option B. Detail page also show a indicator to the option which user had selected.
* The second option in main navigation bar is 'Add Question' where user can submit new question. User needs to enter 'optionA' and 'optionB'. Once user presses 'Submit', user is redirected to home page again where the new question is now added to the list.
* The third option in the main navigation bar is 'Leaderboard' where user can see where he/she stands in terms of score. Score is decided on the number of questions user created and number of question they have answered. The leaderboard is in the order of score.

## Installation and Launching
To launch this "WouldYouRather" app:
* install all project dependencies with `npm install`
* start the development server with `npm start`

Note: You can also use `yarn install` and `yarn start`
Note: This project is also deployed at https://udacity-would-you-rather.herokuapp.com/

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html
└── src
    ├── actions
    │   ├── authedUser.js # Actions related to authed user like SET_AUTHED_USER and UNSET_AUTHED_USER.
    │   ├── questions.js # Actions related to questions like RECEIVE_QUESTIONS, ADD_QUESTION and SAVE_QUESTION_ANSWER.
    │   ├── shared.js # Actions related to whole app in general like 'handleInitialData'.
    │   └── users.js # Actions related to users like RECEIVE_USERS.
    ├── components
    │   ├── App.js # This is the root of the app. It defines all the possible path of the app.
    │   ├── Home.js # Home page which is responsible to display list of 'Unanswered' and 'Answered' questions for the authed user.
    │   ├── InvalidPage.js # Default page to be displayed if the path doesn't match with any supported path.
    │   ├── Leaderboard.js # ShRendersows a list of users with their score.
    │   ├── LeaderboardRow.js # Renders a single row of leaderboard.
    │   ├── Login.js # Renders login page which let's user is login into the app.
    │   ├── Navigation.js # Renders main app bar and let's user to navigate between different sections of the app.
    │   ├── NewQuestion.js # Renders the new question page which let's user to create new poll.
    │   ├── NewQuestionCard.js # Renders new question main card UI.
    │   ├── QuestionCard.js # Renders a single questionc card UI.
    │   ├── QuestionDetail.js # Renders a question detail card.
    │   ├── QuestionOption.js # Renders a single question option. i.e. either optionA or optionB.
    │   ├── QuestionPreviewCard.js # Renders a single question in preview mode. In preview mode, we don't display the second option.
    │   ├── QuestionPreviewCards.js # Renders a list of questions preview. It could be the list of 'Unanswered' or 'Answered'.
    │   ├── QuestionTypeNavigation.js # Renders a app bar to let user navigate between 'Unanswered' and 'Answered' questions.
    │   ├── QuestionResultChart.js # Renders a pie chart in question detail page.
    │   ├── RouteDecider.js # Component which is responsible to decide whether to redirect user to 'Login' page or 'Home' page.
    │   └── UserAvatar.js # Render user avatar UI.
    ├── middlewares
    │   ├── index.js
    │   └── logger.js
    ├── reducers
    │   ├── authedUser.js # This reducers takes the action from 'authedUser' and 'questions' and updates the state.
    │   ├── index.js # This combines all the other reducers.
    │   ├── questions.js # This reducers takes the action from 'questions' and updates the state.
    │   └── users.js # This reducers takes the action from 'questions' & 'users' and updates the state.
    ├── utils
    │   └── _DATA_.js # Contains all users, questions and provides API to fetch initial data, add new question and save question answer.
    └── index.js # Main entry point of the app and renders DOM.
```
## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).