# 🎫 TicketBari – Online Ticket Booking Platform

TicketBari is a full-stack **Online Ticket Booking Platform** built with the **MERN stack**, where users can discover, book, and pay for travel tickets such as **Bus, Train, Launch, and Plane**.  
The platform supports **role-based access** for **Users, Vendors, and Admins**, ensuring a secure and real-world booking workflow.

---

## 🌐 Live Website
🔗 Live Link: https://online-ticket-booking-17c72.web.app

---

## 🎯 Project Purpose
The purpose of this project is to demonstrate:
- Full-stack MERN development skills
- Role-based authentication & authorization
- Real-world booking and payment flow
- Clean UI/UX and responsive dashboard design
- Secure deployment and production readiness

---

## 👥 User Roles
- **User** – Browse tickets, book tickets, and make payments
- **Vendor** – Add tickets, manage bookings, and track revenue
- **Admin** – Approve/reject tickets, manage users, and advertise tickets

---

## ✨ Key Features

### 🔐 Authentication & Security
- Email & Password authentication
- Google Social Login
- Firebase authentication
- JWT-protected APIs
- Environment variable secured Firebase & MongoDB keys
- Role-based protected routes
- Reload-safe private routes

---

### 🏠 Home Page
- Swiper.js Hero Slider
- Advertised Tickets (Admin selected – max 6)
- Latest Tickets section
- Additional custom sections (Why Choose Us, Popular Routes)

---

### 🎟️ Ticket System
- Admin-approved tickets only visible
- Search tickets by **From → To**
- Filter by transport type
- Sort by price (Low → High / High → Low)
- Pagination (6–9 tickets per page)

---

### 📄 Ticket Details (Protected)
- Full ticket information
- Countdown timer based on departure time
- Book Now modal with quantity validation
- Booking disabled if:
  - Ticket quantity = 0
  - Departure time has passed

---

### 👤 User Dashboard
- User Profile
- My Booked Tickets with booking status
- Stripe Payment integration
- Transaction History table

---

### 🧳 Vendor Dashboard
- Vendor Profile
- Add Ticket with image upload (imgbb)
- My Added Tickets with verification status
- Requested Bookings (Accept / Reject)
- Revenue Overview with charts

---

### 🛠️ Admin Dashboard
- Admin Profile
- Manage Tickets (Approve / Reject)
- Manage Users (Make Admin / Vendor, Mark Fraud)
- Advertise Tickets (Max 6 active)

---

### 💳 Payment System
- Stripe payment integration
- Secure checkout
- Automatic ticket quantity reduction after payment
- Payment disabled after departure time

---

### 🌗 UI & UX
- Fully responsive (Mobile / Tablet / Desktop)
- Dark & Light mode toggle
- Consistent color theme and typography
- Equal-height cards and grid layouts
- Loading spinners and error pages

---

## 🧰 Technologies Used

### Frontend
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- Axios
- React Hook Form
- Swiper.js
- Framer Motion
- Recharts / Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe
- dotenv
- cors

---

## 📦 NPM Packages
- axios
- firebase
- react-router-dom
- react-hook-form
- swiper
- framer-motion
- stripe
- jsonwebtoken
- dotenv
- cors



