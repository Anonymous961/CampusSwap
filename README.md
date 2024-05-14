# CampusSwap

Welcome to campusSwap, your go-to platform for trading and swapping goods within the campus community! Whether you're a student looking to sell textbooks, trade gadgets, or even find a roommate, campusSwap provides a seamless solution for buying, selling, and swapping items within your university or college campus.

## Features

- **User Authentication**: Secure user authentication system allows users to sign up, log in, and manage their profiles.
- **Product Listings**: Easily create, edit, and delete product listings with detailed descriptions and images.
- **Search and Filter**: Efficient search and filter functionality to find products based on categories, keywords, or location.
- **Real-time Chat**: Integrated real-time chat system using Socket.IO for instant communication between buyers and sellers.
- **Hybrid Database**: Utilizes a hybrid database structure with MongoDB for flexibility and PostgreSQL for relational data using Sequelize ORM.
- **Responsive Design**: Fully responsive design ensures optimal viewing and interaction experience across devices.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB, PostgreSQL
- **ORM**: Sequelize
- **Real-time Communication**: Socket.IO

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/campusSwap.git
```

2. Navigate to the project directory:

```
cd campusSwap
```

2.1 For Backend

```
cd server
```

- Install dependencies

```
yarn
```

- Set up envrironment variables:

```
#create .env file and it should look like this
MYPORT=4000
RANDOM=123
MONGO_URI=<MONGODB_URL>
SECRET=<SECRET_PHRASE>
DATABASE_URL=<POSTGRESSQL_URL>
FRONTEND_URL=<FRONTEND_URL>
```

- run server

```
yarn run dev
```

2.2 For frontend

```
cd client
```

- Install dependencies

```
yarn
```

- Set up envrironment variables:

```
#create .env file and it should look like this
VITE_APP_BACKEND_URL=<BACKEND_URL>
```

- run frontend

```
yarn run dev
```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

Contributions are welcome! If you'd like to contribute to CampusSwap, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.
