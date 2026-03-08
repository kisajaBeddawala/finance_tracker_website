# 💰 Finance Tracker Web Application

A modern, full-stack personal finance management application built with Next.js, MongoDB, and TailwindCSS. Track your expenses, manage budgets, and achieve your financial goals with an intuitive and responsive interface.

![Finance Tracker](https://img.shields.io/badge/Version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)

## 🚀 Features

### 🔐 Authentication & Security
- Secure user registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Account lockout after failed attempts
- Email verification system

### 💳 Financial Management
- **Transaction Tracking**: Record income and expenses with categories
- **Budget Management**: Set monthly budgets and track spending
- **Financial Goals**: Create and monitor savings goals
- **Multi-Currency Support**: Handle different currencies
- **Analytics Dashboard**: Visual insights into spending patterns

### 👤 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Customizable appearance
- **Real-time Updates**: Live data synchronization
- **Export Data**: Download transaction history
- **Notifications**: Budget alerts and goal reminders

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: TailwindCSS 4
- **State Management**: React Context API
- **Charts**: Chart.js / Recharts

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **API**: Next.js API Routes

### Development
- **Code Quality**: ESLint
- **Package Manager**: npm/yarn/pnpm
- **Version Control**: Git

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/finance-tracker-web.git
cd finance-tracker-web
```
### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```
### Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure
```finance-tracker-web/
├── components/          # Reusable React components
├── pages/               # Next.js pages (App Router)
├── api/                 # API routes for backend logic
├── models/              # Mongoose models
├── styles/              # TailwindCSS styles
├── utils/               # Utility functions
├── .env.local           # Environment variables
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
└── ...
``` 
## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

