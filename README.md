# Campus Cart

Campus Cart is a modern shopping application designed to make browsing everyday essentials simple and convenient. Users can explore products, search and filter the inventory, compare prices and ratings, view product details, and manage their shopping cart through a clean, responsive interface.

Built with React, the application demonstrates reusable components, interactive features, client-side routing, and cart management in a single-page shopping experience.

## Features

- **Product Inventory** — Browse 12 products with names, categories, prices, stock quantities, ratings, and descriptions.
- **Product Cards** — Explore products and navigate to their individual detail pages.
- **Search** — Find products using their names, categories, or descriptions.
- **Category Filtering** — Filter products by Electronics, Study Gear, and Bags & Daily.
- **Sorting** — Sort products by price or product rating.
- **Product Details** — View product descriptions, prices, ratings, and available stock, with quantity selection.
- **Shopping Cart** — Add products, increase or decrease quantities, remove individual items, or clear the cart.
- **Order Summary** — Calculate the subtotal, delivery charges, and final order amount.
- **Free Delivery** — Get free delivery on orders of ₹1,500 or more.
- **Cart Persistence** — Save cart information in browser `localStorage` so it remains available after refreshing the page.
- **Demo Checkout** — Experience a simulated checkout without processing a real payment.
- **Responsive Interface** — Use the application on desktop and mobile screens.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Building the user interface |
| JavaScript (ES6+) | Application logic and event handling |
| JSX | Describing UI elements in JavaScript |
| React Router v6 | Client-side navigation |
| Vite | Development server and build tool |
| CSS | Styling and responsive layouts |
| Browser localStorage | Persisting cart data between page refreshes |

## React Concepts Demonstrated

The project demonstrates the following React concepts:

- **Functional Components** — Organize the interface into reusable components.
- **JSX** — Combine JavaScript expressions with UI markup.
- **Props** — Pass product information and functions between components.
- **useState** — Manage application state, including cart items, search, sorting, and quantity selection.
- **useEffect** — Handle side effects such as saving cart updates to `localStorage`.
- **useMemo** — Memoize calculations and derived product or cart data.
- **Lists and Keys** — Render product collections and cart items.
- **Event Handling** — Respond to search input, button clicks, and quantity changes.
- **Conditional Rendering** — Display empty states, stock availability, and checkout messages.
- **React Router** — Navigate between the home page, inventory, product details, and cart.

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) version 18 or later. npm is included with Node.js.

### Installation

**Clone the repository**

```bash
git clone https://github.com/udit-singh23/CAMPUS-CART.git
```

**Navigate to the project directory**

```bash
cd CAMPUS-CART
```

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### Production Build

To create a production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

Run the preview command after creating the production build.

## Project Structure

```text
CAMPUS-CART/
├── src/
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Main Files

- **`main.jsx`** — Entry point that renders the React application.
- **`App.jsx`** — Contains the main interface, application routes, product views, and cart functionality.
- **`style.css`** — Defines the visual styling, layout, and responsive design.
- **`products.js`** — Stores the sample product information used by the application.
- **`package.json`** — Defines project dependencies and npm scripts.
- **`vite.config.js`** — Configures Vite and its React plugin.
- **`.gitignore`** — Specifies files and directories that Git should ignore.

## Application Routes

| Route | Description |
|---|---|
| `/` | Home page with featured products and cart summary |
| `/products` | Product inventory with search, filtering, and sorting |
| `/products/:id` | Individual product details |
| `/cart` | Shopping cart, quantity controls, and order summary |
| `*` | Fallback page for unknown routes |

## Future Improvements

- User registration and authentication.
- Backend API integration for product management.
- Database integration for inventory and order records.
- Order history and delivery tracking.
- Secure payment gateway integration.

## Notes

- Product information is sample data maintained in the project files.
- Cart information is stored in the browser's `localStorage`.
- The checkout process is for demonstration purposes only and does not process real payments.
- The application currently does not use a backend database or user authentication.
