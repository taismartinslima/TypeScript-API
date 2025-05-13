# TypeScript API

This repository was created in an effort to learn how to create REST-API's with TypeScript. Following best practices in production environments I not only set up the repository for my own personal use, but put much effort into understanding GitHub Actions Workflows, including many collaborative tools like ESLint and Prettier so development in a team is not only possible but functional.

It was quite a wonderful teaching exercise.

## Technologies & Tools Used

- __Node.js__: Basis of this project to leverage the benefits of server-side JavaScript.
- __TypeScript__: Improved code quality and static typing.
- __Express.js__: To create a robust and scalable REST-API.
- __ESLint__: Static code analysis to identify and fix problematic patterns as they happen.
- __Prettier__: Code formatting to ensure consistency and aesthetically pleasing code.
- __CORS__: Handling Cross-Origin Resource Sharing to allow controlled access to resources from different domains.
- __Workflows & Scripts__: Environment specific scripts handle not only linting and formatting, but also the test environment before commiting. Additional safeguards are used using GitHub Actions. 

## Project Setup

Follow the steps below to set up the project on your local system:

1. Clone the GitHub Repository: `git clone git@github.com:reneSpeaks/TypeScript-API.git`
2. Install dependencies `npm i`
3. Copy and fill out .env.Example to create .env.development & .env.production
4. Start development Server: `npm run dev`
5. Open URL: `http://localhost:3001`