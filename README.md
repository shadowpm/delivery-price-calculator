# Delivery price calculator

This project is a tool for calculating the delivery cost based on given data.

In this project, you find a form on the left side of the page, and a cost breakdown card on the right side. 

By entering Cart value, delivery distance, amount of items, and time (with a default value of the current date and time), you will get the calculated delivery cost.

## Table of Contents
- [Installation](#installation)
- [Calculations](#calculations)
- [Technical decisions](#technical-decisions)
- [UI, UX decisions, accessibility](#ui-ux-decisions-accessibility)
  - [Accessibility](#accessibility)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run format`](#npm-run-format)
  - [`npm run build`](#npm-run-build)

## Installation

To run this project, make sure you have Node.js and npm installed on your machine. You can download them from https://nodejs.org/.

At the time this project is compatible with node v20.5.1, and npm version 9.8.0>, so it is recommended to have the same versions installed to avoid further complications.

After having this requirements in place, you may run `npm install`, and then you can start te project by running `npm start`:

```console
npm install
npm start
```

Now you can open http://localhost:3000 to view it in the browser.


## Calculations:

The delivery price calculations, are as follows:

* If the cart value is less than 10€, a small order surcharge is added to the delivery price.

* A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination.

* If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€

* The delivery fee can never be more than 15€, including possible surcharges.

* The delivery is free (0€) when the cart value is equal or more than 200€.

* During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€). 

## Technical decisions

This project is powered by React.

While making the technical choices, I always prioritize simplicity, and scalability.

I try to avoid adding many packages before it's needed.

As for the project structure, I added a "components" folder. Inside you can find different components of the page in an independent folder, with their corresponding styles file.

Also you can find a "ui" folder, containing the reusable and dynamic ui pieces of the project; such as Input field component, button component, and tooltip component.

Outside of the components folder, you can find the "utils" folder, which contains all calculation functions, as well as a constants folder which I find very cruicial. Because there are many calculation constants in this project, and having a costants file, although being hard to setup at first, but makes maintaining and changing this constants in the future so much easier and bug proof.

For the datepicker, I chose to utilize "react-datepicker".
As it is a largely used package, and I preffer the design over the native datetime-local input, which has no submit button, or automatic closing, which I find it to be a bit confusing.

## UI, UX decisions, accessibility

Making an accessible UI, and an intuitive and user friendly UX, is always what keeps me so interested and passionate about Frontend development.

Though I personally really like a clean and modern multi-page form, I decided to have it all in one page, as I felt like this is supposed to be more of a backoffice tool. So that's the decision I settled for.

You can find that the page design is responsive.

### Accesibility

For the page accessibility, I chose to go with very high contrast colors.

I used the <b>fieldsett</b> and <b>legend</b> tags to provide description and grouping.

Each textfield has a label, name and id, and you can find the entry example in the placeholder.

The input fields have a type (which is number), and also a validation is in place.

At the end, I used chrome lighthouse tool, to check the page accessiibility score.

Here are some accessibility resources that utilized:
* https://www.a11yproject.com/posts/how-to-write-accessible-forms/

* https://www.w3.org/WAI/tutorials/forms/

* https://www.w3.org/WAI/tutorials/forms/instructions/

* https://a11y-style-guide.com/style-guide/section-forms.html#kssref-forms-text-fields


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run format`

Runs Prettier through all files (except node_modules, build, and dist) to assure uniform syntax.

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. By running this command, you will format the code so that it's all the way syntactically consistant.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.