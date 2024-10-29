# Byte Bazaar

Byte Bazaar is an electronic web-based platform built on the MERN stack (MongoDB, Express, React, Node.js). It provides a marketplace for users to explore and purchase tech-related products. This project is split into two parts: the frontend and the backend.

## How to Setup the Project

To get the Byte Bazaar platform up and running locally, follow these steps:

### Prerequisites:

- **Node.js** (version 16+ recommended)
- **MongoDB** (either locally or using a cloud service like MongoDB Atlas)

### Installation Steps:

1. **Clone the repository**:

   - Run the following command:
     ```bash
     git clone https://github.com/ummeabiha/ByteBazaar-SRE.git
     cd ByteBazaar-SRE
     ```

2. **Frontend Setup**:

   - Navigate to the `byte-bazar-frontend` directory:
     ```bash
     cd Byte-Bazaar-Frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```

3. **Backend Setup**:

   - Navigate to the `byte-bazaar-backend` directory:
     ```bash
     cd Byte-Bazaar-Backend/server
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```

4. **Adding .env files**:

   - Copy the .env file of frontend in byte-bazar-frontend
   - Copy the .env file of backend in server folder.

5. **Run the Application**:
   - To run the frontend and backend simultaneously, follow these steps:
     - Start the frontend:
       ```bash
       cd Byte-Bazaar-Frontend
       npm run dev
       ```
     - Start the backend:
       ```bash
       cd Byte-Bazaar-Backend/server
       nodemon run dev
       ```
## 6. Login Credentials

**Admin Panel:** To access the admin panel, change the URL to "http://localhost:5173/bytebazaar/admin-login"
   - email: admin@gmail.com
   - password: Admin123#

**User Panel:**
   - email: admin@gmail.com
   - password: Admin123#
