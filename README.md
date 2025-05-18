# TypeScript API 🚀

Welcome to the **TypeScript API** repository! This project is a robust Node.js application built with TypeScript and Express.js. It incorporates ESLint, Prettier, and more to ensure a clean and maintainable codebase. 

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Features

- **TypeScript Support**: Enjoy the benefits of static typing.
- **Express.js Framework**: Build RESTful APIs easily.
- **ESLint Integration**: Keep your code clean and consistent.
- **Prettier Formatting**: Automatically format your code.
- **Husky for Git Hooks**: Ensure quality checks before commits.
- **Vitest for Testing**: Fast and reliable testing framework.
- **Well-structured Boilerplate**: Start your projects quickly with a solid foundation.

## Technologies Used

This project utilizes a variety of technologies to enhance development and performance:

- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: An opinionated code formatter.
- **Husky**: Prevents bad `git commit`, `git push`, and more by using hooks.
- **Vitest**: A testing framework designed for speed and simplicity.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/taismartinslima/TypeScript-API.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd TypeScript-API
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add your environment variables. Use the `.env.example` file as a reference.

5. **Run the Application**:

   ```bash
   npm start
   ```

Your application should now be running on `http://localhost:3000`.

## Usage

You can interact with the API using tools like Postman or curl. Here are some example requests:

### Get All Items

```http
GET /api/items
```

### Create a New Item

```http
POST /api/items
Content-Type: application/json

{
  "name": "New Item",
  "description": "Item description"
}
```

### Update an Item

```http
PUT /api/items/:id
Content-Type: application/json

{
  "name": "Updated Item",
  "description": "Updated description"
}
```

### Delete an Item

```http
DELETE /api/items/:id
```

## Running Tests

To run tests, use the following command:

```bash
npm test
```

This will execute the test suite using Vitest.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

For the latest releases, visit the [Releases section](https://github.com/taismartinslima/TypeScript-API/releases). Download the necessary files and execute them as needed.

![Download Releases](https://img.shields.io/badge/Download%20Releases-Here-brightgreen)

Feel free to check back regularly for updates and new features!

---

Thank you for checking out the **TypeScript API** project! We hope you find it useful for your development needs. If you have any questions or feedback, please feel free to reach out. Happy coding!