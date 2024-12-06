
# Cypress Registration Form Test Automation

This project contains end-to-end tests for a registration form using Cypress. It includes tests for form validation, submit button functionality, and progress bar behavior.
## Installation
To get started with the project, clone the repository and install the required dependencies.

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/my-cypress-project.git
   cd my-cypress-project
```
1. Install dependencies using npm :
```bash
   npm install
```

## Usage
### Running Cypress Locally

After installing the dependencies, you can run Cypress locally using the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner in your browser, where you can interact with and run tests manually.

To run tests headlessly in the terminal, use:

```bash
npx cypress run
```
### Running a Specific Test

You can also run a specific test file with:
```bash
npx cypress run --spec 'cypress/e2e/registrationFormTests.cy.js'
```
## Commands

In this project, the following custom Cypress commands are added in the `cypress/support/commands.js` file:

- **`Getelement`**: A custom command to get an element by its `data-cy` attribute.
  Example usage:
```js
  cy.Getelement('username-input');
```



  - **`getElementAndType`**: A custom command to get an element and type text into it.
  Example usage:
```js
  cy.getElementAndType('username-input', 'ValidUser123');
```