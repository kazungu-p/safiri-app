**Safiri Bus Booking App**

Safiri is a responsive web application for booking bus travels in Kenya. The app allows users to search for routes, view destinations, read testimonials, and navigate a clean, intuitive interface.

**Table of Contents**

# Features

# Tech Stack

# Installation

# Usage

# Project Structure

# Contributing

# License

**Features**

Responsive navigation bar with hamburger menu for mobile devices

Hero section with background image and travel booking form

Search form with dynamic “From” and “To” destinations

Marketing section highlighting service benefits using reusable card components

Testimonial slider using Swiper for smooth autoplay and navigation

Modular React components for easy reuse and maintenance

# Tech Stack

Frontend: React.js (functional components, hooks)

Styling: CSS, Flexbox, Grid

Slider/Carousel: Swiper.js

State Management: useState (React)

Icons & Assets: Local SVGs and images

# Installation

## Clone the repository:

git clone https://github.com/kazungu-p/Prolabs-africa.git


## Navigate to the project directory:

cd prolabs-africa


## Install dependencies:

npm install


## Start the development server:

npm run dev


Open your browser at http://localhost:5173

# Usage

Use the navbar to navigate between pages

Fill in the booking form to search for travel routes

Explore the Why Us? section for key service benefits

View testimonials from previous travelers via the Swiper slider

# Project Structure
src/
│
├─ assets/           # Images, icons, and data files
│   ├─ data/
│   │   ├─ destinations.js
│   │   ├─ marketingData.js
│   │   └─ testimonialData.js
│   └─ images/
├─ components/       # React components
│   ├─ Navbar.jsx
│   ├─ Hero.jsx
│   ├─ Form.jsx
│   ├─ BookingForm.jsx
│   ├─ Marketing.jsx
│   ├─ Card.jsx
│   └─ Testimonials.jsx
├─ css/              # Styling for components
└─ App.jsx           # Main App component

# Contributing

Fork the repository

Create a feature branch:

git checkout -b feature/YourFeature


Commit your changes:

git commit -m "Add feature description"


Push to the branch:

git push origin feature/YourFeature


Open a Pull Request

# License

This project is open-source and available under the MIT License.