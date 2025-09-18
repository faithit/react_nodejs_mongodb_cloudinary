# Product Management App

A full-stack application for managing products, built with **React**, **Node.js/Express**, **MongoDB**, and **Cloudinary** for image storage. 
Users can add products with images and view the product list.

---

## Features

- Add new products with name, price, description, category, and image.
- Upload images to Cloudinary and store the URL in MongoDB.
- Display all products in a responsive grid with images.
- Placeholder image used if no image is provided.

---

## Technologies Used

**Frontend:**

- React
- Axios for HTTP requests
- Tailwind CSS for styling

**Backend:**

- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary for image storage
- CORS and JSON middleware

---

## Project Structure
frontend/ # React app
├─ src/
├─ components/
├─ ProductForm.jsx
├─ ProductList.jsx
├─ App.js
└─ index.js

backend/ # Node.js/Express API
├─ config/
└─ cloudinary.js
├─ controllers/
└─ productController.js
├─ models/
└─ Product.js
├─ routes/
└─ productRoutes.js
└─ server.js

---

## Installation

### Backend

1. Clone the repository:

```bash
git clone <your-repo-url>
cd backend
```
2.Install dependencies:
