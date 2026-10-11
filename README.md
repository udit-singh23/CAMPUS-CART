# Campus Cart

Campus Cart is a simple and modern shopping application for browsing everyday essentials in one place. It allows users to explore products, search and filter the inventory, view product details, and manage their shopping bag through a clean and responsive interface.

The application is built with React and focuses on reusable components, interactive UI elements, client-side routing, and a smooth shopping experience.

## Features

- **Product Inventory** — Browse 12 products with names, categories, prices, stock quantities, ratings, and descriptions.
- **Product Cards** — View product information and access individual product pages.
- **Search** — Find products by name, category, or description.
- **Category Filter** — Filter products by Electronics, Study Gear, and Bags & Daily.
- **Sorting** — Arrange products by price or customer rating.
- **Product Details** — View product descriptions, prices, ratings, and available stock, with quantity selection.
- **Shopping Cart** — Add products, update quantities, remove items, or clear the shopping bag.
- **Price Calculation** — Calculate the subtotal, delivery charges, and final order amount.
- **Free Delivery** — Orders of ₹1,500 or more qualify for free delivery.
- **Cart Persistence** — Cart data is stored in browser `localStorage` and remains available after a page refresh.
- **Demo Checkout** — Complete a simulated checkout without processing a real payment.
- **Responsive Design** — The interface adapts to desktop and mobile screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Building the user interface with components |
| JavaScript (ES6+) | Application logic and event handling |
| JSX | Writing UI elements inside JavaScript |
| React Router v6 | Navigation between application pages |
| Vite | Development server and build tool |
| CSS | Styling and responsive layouts |
| Browser localStorage | Saving cart data between page refreshes |

## React Concepts Demonstrated

The project demonstrates functional components, JSX, props, event handling, React hooks, lists and keys, conditional rendering, forms, and client-side routing.

- **useState** — Manages cart items, search input, sorting, and quantity selection.
- **useEffect** — Saves cart updates to browser localStorage.
- **useMemo** — Calculates cart totals and filtered product results.
- **Props** — Passes product data and cart functions between components.
- **Conditional Rendering** — Displays empty states, stock availability, and checkout messages.
- **React Router** — Handles navigation between the home page, inventory, product details, and shopping cart.

## Getting Started

### Prerequisites

Install Node.js 18 or later and npm.

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project folder:

```bash
cd product-inventory-shopping-cart-v2
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### Production Build

To check whether the application can be built for production, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
product-inventory-shopping-cart-v2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── style.css
    └── data/
        └── products.js
```

### Main Files

- **main.jsx** — Entry point that renders the React application inside BrowserRouter.
- **App.jsx** — Contains the application routes, product pages, cart logic, and main UI components.
- **style.css** — Contains the visual styling, layout, and responsive design rules.
- **products.js** — Stores the sample product information used by the application.
- **package.json** — Lists the project dependencies and available npm scripts.
- **vite.config.js** — Configures Vite and the React plugin.

## Application Routes

| Route | Purpose |
|---|---|
| `/` | Home page with featured products and cart summary |
| `/products` | Product inventory with search, filtering, and sorting |
| `/products/:id` | Details of an individual product |
| `/cart` | Shopping bag, quantity controls, and order summary |
| `*` | Fallback page for unknown routes |

## Future Improvements

- User registration and login.
- Backend API integration for product management.
- Database integration for inventory and orders.
- Order history and delivery tracking.
- Integration with a secure payment gateway.

## Notes

- Product information is sample data maintained in the project files.
- Cart information is saved in the browser's localStorage.
- The checkout process is for demonstration purposes only and does not collect payments.
- The application does not currently use a backend database or user authentication.
