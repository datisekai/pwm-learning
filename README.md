# PWM Learning - Ecommerce Platform

## Project Description

PWM Learning is a full-featured ecommerce platform built with Next.js, offering both customer-facing storefront and admin dashboard. The platform includes:

### Customer Features

- Product browsing and searching
- Shopping cart functionality
- Blog system with categories
- User authentication (login/register)
- Order history and tracking
- User profile management
- Product filtering and sorting

### Admin Features

- Product management (CRUD operations)
  - Product attributes
  - Categories
  - Species
  - SKU management
- Order management
- User management
- Permission system
- Blog management
- Slider/Banner management
- UI Home customization
- Statistics and analytics

## Tech Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **API Client**: Axios
- **Authentication**: Custom implementation with middleware

## Project Structure

```
pwm-learning/
├── actions/        # API action creators
├── components/     # React components
├── config/         # Configuration files
├── models/         # TypeScript interfaces/types
├── pages/          # Next.js pages
├── public/         # Static assets
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd pwm-learning
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode

## Features Documentation

### Authentication

- Login and registration system
- Protected routes with middleware
- Role-based access control

### Product Management

- Hierarchical categorization (Categories > Species > Products)
- SKU and attribute management
- Product search and filtering

### Order System

- Shopping cart functionality
- Order tracking
- Order history

### Content Management

- Blog system with categories
- Slider/Banner management
- UI customization options

### Admin Dashboard

- Comprehensive admin interface
- User management
- Permission system
- Statistics and analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]
