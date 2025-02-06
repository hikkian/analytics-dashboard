# Analytics Dashboard

**Analytics Dashboard** is a web application for visualizing and analyzing sensor data stored in MongoDB. It allows users to select date ranges, display data on an interactive chart, and calculate key metrics (average, min, max, standard deviation).

---

## Features

- **Data Loading**: Select start and end dates to fetch data from MongoDB.
- **Interactive Chart**: Visualize data using Chart.js with time-based axis.
- **Metrics Calculation**: Display average, minimum, maximum, and standard deviation for the selected time range.
- **Responsive Design**: Works on both desktop and mobile devices.

---

## Technologies

- **Frontend**:
  - HTML, CSS, JavaScript
  - [Chart.js](https://www.chartjs.org/) for data visualization
  - [chartjs-adapter-date-fns](https://github.com/chartjs/chartjs-adapter-date-fns) for time axis support
- **Backend**:
  - Node.js, Express.js
  - MongoDB (with Mongoose ODM)
- **Tools**:
  - Git for version control
  - Postman (optional) for API testing

---

## Installation

### 1. Clone the Repository

git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard
2. Install Dependencies
Install backend dependencies:

cd backend
npm install
3. Set Up MongoDB

Install MongoDB locally or use a cloud service like MongoDB Atlas.

Update the MongoDB connection URI in backend/database/connection.js if needed.

Seed the database with sample data:

node backend/database/seed.js
4. Start the Backend Server

node backend/index.js
The server will run at http://localhost:5000.

5. Open the Frontend
Open frontend/index.html in a web browser (e.g., using Live Server in VS Code).

Usage
Select a Start Date and End Date.

Click Load Data to fetch data and display it on the chart.

Metrics will automatically update below the chart.

Project Structure

analytics-dashboard/
├── backend/
│   ├── database/
│   │   ├── connection.js    # MongoDB connection
│   │   └── seed.js          # Database seeding script
│   ├── models/
│   │   └── Measurement.js   # MongoDB schema
│   ├── routes/
│   │   └── measurements.js  # API endpoints
│   └── index.js             # Server setup
├── frontend/
│   ├── index.html           # Main HTML file
│   ├── style.css            # Styling
│   └── script.js            # Chart logic & API calls
├── .gitignore
└── README.md
API Endpoints
GET /api/measurements?field=<field>&start_date=<date>&end_date=<date>
Returns data for a specific field within a date range.

GET /api/measurements/metrics?field=<field>&start_date=<date>&end_date=<date>
Returns calculated metrics for a specific field.

Author
Hikkian
Visit my [GitHub profile](https://github.com/hikkian).

Acknowledgments
Chart.js for the powerful charting library.

MongoDB for the flexible NoSQL database.

Express.js for the minimalist web framework.