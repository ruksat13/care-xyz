# Care.xyz - Baby Sitting & Elderly Care Service Platform

## Live Site
🔗 [https://classy-centaur-ac3ba3.netlify.app](https://classy-centaur-ac3ba3.netlify.app)

## About
Care.xyz is a web application that provides reliable and trusted care services for children, elderly, and other family members. Users can easily find and book caretakers for babysitting, elderly care, or special care at home.

## Features
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ User Authentication (Email/Password + Google Login)
- ✅ Dynamic Booking with Duration & Location Selection
- ✅ Total Cost Calculation (Duration × Service Charge)
- ✅ Booking Status (Pending / Confirmed / Completed / Cancelled)
- ✅ My Bookings Page with View Details & Cancel Booking
- ✅ Services Overview (Baby Care, Elderly Care, Sick People Care)
- ✅ Service Detail Pages with Book Service button
- ✅ Email Invoice on Booking Confirmation
- ✅ Metadata on Home & Service Detail pages
- ✅ 404 Not Found Page

## Pages & Routes
| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/service/:service_id` | Service Detail Page |
| `/booking/:service_id` | Booking Page (Private) |
| `/my-bookings` | My Bookings Page (Private) |
| `/login` | Login Page |
| `/register` | Register Page |
| `*` | 404 Not Found |

## Technologies Used
- React.js
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- EmailJS
- React Hot Toast
- React Icons
- Vite

## Environment Variables
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=


## Run Locally
```bash
git clone https://github.com/ruksat13/care-xyz.git
cd care-xyz
npm install
npm run dev
```