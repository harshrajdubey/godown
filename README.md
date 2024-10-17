# Godown Inventory Management System

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Folder Structure](#folder-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Database Scheme](#database-scheme)
9. [Contributing](#contributing)

## Project Overview

The Godown Inventory Management System is a Tree View Application designed to manage and visualize the hierarchy of godowns (warehouses), sub-locations, and stored items. This application provides users with a dashboard to efficiently manage their inventory by displaying a sidebar with locations and a details panel for selected items.

## Features

- **Login Page**: Secure access to the dashboard.
- **Dashboard Page**:
  - **Sidebar**: Displays the hierarchical structure of godowns and items.
  - **Details Panel**: Shows details of the selected item.
- **Search Functionality**: Quickly find items by name.
- **Expandable Tree View**: Visualize the relationships between godowns, sub-godowns, and items.

## Technology Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js
- **Database**: Vercel Postgres
- **Deployment**: Vercel
- **Styling**: CSS, Inline styles

## Folder Structure

```plaintext
/godown
├── /app
│   ├── /api
│   │   ├── godowns/route.ts        # API for fetching godowns
│   │   └── items/route.ts          # API for fetching items
│   ├── /lib
│   │   ├── actions.ts         # Sidebar component
│   │   └── definations.ts     # Prototypes
│   │   └── sidebar.tsx        # Item Details component
│   ├── /login
│   │   ├── page.tsx           # Dashboard page
│   ├── /ui
│   │   ├── login-form.tsx     # Form Component
│   ├── /dashboard
│   │   ├── page.tsx           # Dashboard page
│   └── /globals.css            #Global Styles
├── /public
│   └── /images                # Static Images (logo)
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/harshrajdubey/godown.git
   ```

2. Navigate to the project directory:

   ```bash
   cd godown
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up the database and environment variables as necessary.

## Usage

1. Run the development server:

   ```bash
   npm run dev
   ```

2. Access the application at [http://localhost:3000/](http://localhost:3000/).
Login Details
test@test.com
123

4. For production build:

   ```bash
   npm run build
   ```

5. Deploy to Vercel:

   ```bash
   vercel deploy
   ```

## API Endpoints

- `GET /api/godowns`: Fetches a list of all godowns.
- `GET /api/items?search=term`: Fetches items based on a search term.


## Database Schema

The application utilizes three tables in the database:

### 1. `admin`

| Column     | Type   |
|------------|--------|
| username   | String |
| email      | String |
| password   | String |

### 2. `godown`

| Column        | Type   |
|---------------|--------|
| id            | String |
| name          | String  |
| parent_godown | String (nullable) |

### 3. `items`

| Column                | Type    |
|-----------------------|---------|
| item_id               | Integer |
| name                  | String  |
| quantity              | Integer |
| category              | String  |
| price                 | Decimal |
| status                | String  |
| godown_id             | Integer |
| brand                 | String  |
| attributes.type       | String  |
| attributes.material    | String  |
| attributes.warranty_years | String |
| image_url             | String  |
| attributes.size       | String  |
| attributes.color      | String  |
| attributes.age_range  | String  |
| attributes.battery_required | String |
| attributes.dimensions | String  |
| attributes.wattage    | Decimal |
| attributes.voltage     | Decimal |


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Create a pull request.
