# Lesson Scheduler Frontend

## Table of Content

- [Description](#description)
- [Technology Used](#technology-used)
- [Requirement](#requirements)
- [Local Setup](#local-setup)

## Description

The backend for TFIP to manage teachers schedules such as leaves and sections. Managers are able to login and carry out the following features:

- View teacher details
- View leave details
- View section details
- View teacher schedules
- Create sections
- Approve/Reject Leaves
- Resolve teacher leave conflict (with sections) by reassigning teachers

## Technology Used

- [React](https://react.dev/)

## Requirements

- [React v19.1.1 ](https://nodejs.org/en)
- [Node.js v22](https://nodejs.org/en)

## Local Setup

Run the following codes in the terminal to set up the project.

```bash
# Step 1: Create a copy of the .env file
cp .env.example .env

# Step 2: Install application dependencies using npm
npm install

# Step 3: Ensure that backend (class_scheduler_be) is running. (Refer to README.md in class_scheduler_be for set up)

# Step 4: Run application using npm
npm run dev

```
