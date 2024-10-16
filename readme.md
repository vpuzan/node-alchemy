# Node alchemy

##

- [Installation and Setup](#installation-and-setup)
- [Install ESLint Locally](#install-eslint-locally)
- [Running ESLint](#running-eslint)
- [ESLint Rules Explanation](#eslint-rules-explanation)
- [Lint-Staged Configuration](#lint-staged-configuration)

## Installation and Setup

### Install Dependencies

1. Clone the repository:

   ```bash
    git clone https://github.com/vpuzan/node-alchemy.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Install ESLint Locally

To set up ESLint, follow these steps:

1. Install plugins and ESLint :
   ```bash
   npm install --save-dev eslint eslint-plugin-node eslint-plugin-promise eslint-plugin-security eslint-plugin-import eslint-config-airbnb-base eslint-config-prettier @typescript-eslint/eslint-plugin typescript
   ```

## Running ESLint

To run ESLint locally for development and debugging, use the following command:

```bash
npx eslint .
```

## ESLint Rules Explanation

```
semi: Enforces consistent use of semicolons at the end of statements. Setting it to "always" ensures that every statement is terminated with a semicolon, which can improve code readability and prevent unexpected errors.
no-undef: Warns about variables that are used before they are defined. This helps to catch typos and prevent runtime errors caused by undefined variables.
no-unused-vars: Warns about variables that are declared but never used. This helps to keep your code clean and efficient by removing unnecessary variables.
@typescript-eslint/no-unused-vars: Turns off the specific rule for unused variables in TypeScript. This is often done to avoid conflicts with TypeScript's own type checking.
consistent-return: Warns if functions sometimes return a value and sometimes return undefined. Enforcing consistent return behavior can make code easier to understand and reason about.
quotes: Enforces consistent use of single quotes for strings. This improves code consistency and readability. The avoidEscape option helps to reduce the need for backslashes in strings.
indent: Enforces a consistent indentation level of 2 spaces. Proper indentation makes code easier to read and understand.
import/extensions: Turns off the rule that requires file extensions in import statements. This can be useful when using a build system that handles file extensions automatically.
import/prefer-default-export: Turns off the rule that prefers default exports. This can be useful when using libraries that do not use default exports.
no-shadow: Warns when variables are declared with the same name as a variable in an outer scope. This can help to avoid naming conflicts and make code easier to reason about.
```

## Lint-Staged Configuration

To set up `lint-staged`, which allows you to run linters on pre-committed files, follow these steps:

1. Install `lint-staged` as a development dependency:

   ```bash
   npm install lint-staged --save-dev
   ```

2. Add configuration to package.json:

```{
   "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"]
  }
```

3. Set up Husky to run on pre-commit:

```bash
  npx husky install
```

lint-staged will now automatically run before each commit, ensuring that all staged JavaScript and TypeScript files are linted and formatted according to your specified rules.