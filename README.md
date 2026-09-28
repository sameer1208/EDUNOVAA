# ServiceHub – Management Portal

A modern and responsive **Service Management Portal** built with React and TypeScript. The application provides a clean dashboard and customer management interface with search, filtering, sorting, validation, and customer details functionality.

## 🚀 Features

### Dashboard

* Overview dashboard for the management portal
* Clean and responsive layout
* Sidebar navigation
* Header navigation

### Customer Management

* View all customers
* Search customers by name, email, phone, or service
* Filter customers by status
* Sort customer records
* View detailed customer information
* Add new customers
* Form validation
* Duplicate email validation
* Phone number validation
* Email format validation
* Success notifications using toast messages

### UI & UX

* Responsive design
* Modern dashboard layout
* Reusable React components
* Interactive sidebar navigation
* Active navigation states
* Modal-based customer details and creation
* Responsive sidebar for smaller screens

## 🛠️ Tech Stack

* **React.js**
* **TypeScript**
* **React Router**
* **React Icons**
* **React Hot Toast**
* **CSS3**
* **Vite**

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project

```bash
cd servicehub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 🔐 Login

The application includes a login screen with protected application routes.

After successful login, users are redirected to the dashboard.

Authentication state is currently handled on the frontend using browser local storage.

> For production use, authentication should be connected to a secure backend authentication system.

## 👥 Customer Management

Customers are currently managed using frontend state and mock data.

Each customer contains:

```text
ID
Name
Email
Phone
Status
Service
Joined Date
```

When adding a customer, the application validates:

* Required name
* Valid email format
* Unique email address
* 10-digit phone number
* Required service

New customers are added dynamically to the customer table.

## 🔔 Notifications

The project uses **React Hot Toast** for user feedback.

Example:

```tsx
toast.success("Customer added successfully!");
```

Toast notifications are displayed at the bottom-right of the application.

## 📱 Responsive Design

The application is designed to work across different screen sizes.

On smaller screens:

* Sidebar collapses
* Navigation labels are hidden
* Icons remain accessible
* Main content adjusts automatically

## 🧩 Routing

The application uses React Router for navigation.

Current routes include:

```text
/login
/dashboard
/customers
```

Protected application routes are handled through the main application layout.

## 📊 Current Data Handling

The current version uses mock customer data and frontend state management.

The application can later be extended with:

* REST APIs
* Backend database
* Redux Toolkit
* Server-side pagination
* Authentication APIs
* Role-based access control
* CRUD APIs

## 🔮 Future Improvements

Planned improvements can include:

* Backend API integration
* Database integration
* JWT authentication
* Role-based permissions
* Customer edit and delete functionality
* Server-side search and filtering
* Pagination
* Customer analytics
* Settings management
* User profile management
* Production deployment

## 📦 Build for Production

Create a production build using:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Create a Pull Request.

## 📄 License

This project is intended for learning, development, and demonstration purposes.
