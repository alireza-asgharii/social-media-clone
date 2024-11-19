# 📸 MiniGram

**MiniGram** is a modern and efficient Instagram clone designed to replicate the core user experience of Instagram. Built with advanced technologies, it provides essential features like user authentication, post and photo uploads, and an explore page to discover diverse content.

The user interface of MiniGram is sleek and modern, leveraging libraries like TailwindCSS and ShadcnUI to offer a fast, smooth, and visually appealing experience. This project is perfect for those seeking inspiration from Instagram or looking to learn how to build complex and professional applications.

---

## ✨ Features

- **User Authentication**: Secure sign-up and login functionality.
- **Post Management**: Users can upload and manage their photos and posts.
- **Explore Page**: Discover new and diverse content.
- **Modern and Optimized Design**: Offers a seamless and attractive user experience.
- **Responsive and Fast**: Optimized for all devices.

---

## ✨ Technologies Used

---

- **React.js**: A powerful library for building user interfaces.
- **Tailwind CSS**: A fast and responsive styling framework.
- **ShadcnUI**: A library for building modern UI components.
- **Appwrite**: A backend as a service for managing data and authentication.
- **React Query**: For managing server-side requests and data.
- **Docker**: For containerizing the application, making it easier to develop and deploy in consistent environments across different machines.

---

## 🙌 Contributing

---

To contribute to this project:

1.  Fork this repository.
2.  Create a new branch: `git checkout -b feature-name`
3.  Commit your changes: `git commit -m "Add feature-name"`
4.  Submit a pull request to the main repository.

## 📂 Project Structure

````plaintext
src/
├── components/       # Reusable components
├── pages/            # Main pages (Profile, Explore, Feed, etc.)
├── assets/           # Images and styles
├── hooks/            # React hooks (e.g., useQuery, etc.)
├── utils/            # Helper functions and configurations
└── main.jsx          # Application entry point


## 🧰 Prerequisites

- **pnpm** (preferred package manager)
- **Docker** (for containerized development and deployment)
- Access to **Appwrite** project details (for `.env` file)

## 🛠️ Getting Started

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/alireza-asgharii/social-media-clone.git
cd app-name
pnpm i

### 3. Set up the `.env` file

Create a `.env` file in the root directory and add your **Appwrite** project credentials:

```plaintext
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_STORAGE_ID=your_storage_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
VITE_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
VITE_APPWRITE_SAVES_COLLECTION_ID=your_saves_collection_id


````
