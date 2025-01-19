# Taskical

Taskical is a React Native application designed for task management. With Taskical, you can easily create, update, and organize tasks. The app also features a filtering and searching mechanism to keep your tasks accessible.

## Features
- Add tasks with title and description.
- Mark tasks as pending or complete.
- Edit or delete tasks.
- Filter and search tasks by their title or description.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Ching-Chieh-Wang/Taskical.git
   cd Taskical
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npx expo start
   ```

## Usage
1. Use the Add Task form to create new tasks.
2. Click on a task to view or edit its details.
3. Use the search bar to filter tasks by title or description.
4. Use the status toggle buttons to switch between pending and complete tasks.

## Technology Stack
- **React Native**: UI and core functionality.
- **Expo**: Development platform for React Native.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling.

## Context Management
Taskical uses React Context API to manage the application state. It includes the following:
- Task creation
- Task status updates
- Task filtering and searching

## Folder Structure
- \`components/\`: Contains reusable components like \`TaskActionNav\` and \`TaskEditCard\`.
- \`context/\`: Contains the task management logic using React Context and Reducer.
- \`types/\`: Defines TypeScript types and enums for better type safety.

## Development
Ensure that you have the following installed:
- Node.js
- npm or yarn
- Expo CLI


## License
This project is licensed under the MIT License.

## Author
Developed by Jingjie Wang
