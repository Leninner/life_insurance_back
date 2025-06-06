# Life Insurance Backend

This is a NestJS backend application for a life insurance management system.

## Features

- User authentication and authorization with JWT
- Role-based access control
- Insurance policy management
- Client management
- Contract management
- Reimbursement processing

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- PostgreSQL (v16 or higher)
- Docker and Docker Compose (optional, for containerized database)

### Step-by-Step Setup Guide

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd life-insurance-back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project with the following variables:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=life_insurance
   DB_SSL=false

   # Application Configuration
   PORT=3000
   NODE_ENV=development 

   # Auth
   JWT_SECRET=your-secret-key

   # Storage
   STORAGE_TYPE=s3

   # AWS Credentials (replace with your actual credentials)
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=us-east-1
   AWS_BUCKET=life-insurance-bucket
   ```

4. Start the PostgreSQL database with Docker:
   ```bash
   docker compose up -d
   ```

5. Build the application:
   ```bash
   npm run build
   ```

6. Run database migrations:
   ```bash
   npm run migration:run
   ```

7. Start the application:
   ```bash
   npm run start:dev
   ```

### Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## Default Super Admin User

After running migrations, a default super admin user is created:

- Email: superadmin@example.com
- Password: superadmin123

**Important:** Change the password of this user after the first login in a production environment.

## Available Scripts

- `npm run build`: Build the application
- `npm run format`: Format code using Prettier
- `npm run start`: Run the application
- `npm run start:dev`: Run the application in development mode with hot reload
- `npm run start:debug`: Run the application in debug mode
- `npm run start:prod`: Run the compiled application
- `npm run lint`: Run ESLint
- `npm run test`: Run tests
- `npm test:watch`: Run tests in watch mode
- `npm test:cov`: Run tests with coverage
- `npm run migration:generate`: Generate a migration based on entity changes
- `npm run migration:run`: Run pending migrations
- `npm run migration:revert`: Revert the last migration
- `npm run sonar:analyze`: Run SonarQube analysis

## SonarQube Analysis

To run SonarQube analysis, you need to set the `SONAR_TOKEN` environment variable.

```bash
chmod +x run-sonar.sh
./run-sonar.sh <your-sonar-token>
```

# Insurance Plans

## Available Insurance Plans

### 1. Basic Health Insurance
- **Type**: Health
- **Description**: Basic medical coverage for consultations and emergencies
- **Requirements**:
  - Minimum age: 18 years
  - No pre-existing conditions
- **Base Price**: $50.00/month
- **Coverage Amount**: $25,000
- **Additional Coverage Cost**: $10
- **Additional Benefit Cost**: $10
- **Payment Frequencies**:
  - Monthly: $50.00
  - Quarterly: $150.00
  - Yearly: $600.00

### 2. Premium Life Insurance
- **Type**: Life
- **Description**: Complete financial protection for your family
- **Requirements**:
  - Minimum age: 25 years
  - Medical examination required
- **Base Price**: $100.00/month
- **Coverage Amount**: $50,000
- **Additional Coverage Cost**: $15
- **Additional Benefit Cost**: $15
- **Payment Frequencies**:
  - Monthly: $100.00
  - Quarterly: $300.00
  - Yearly: $1,200.00

### 3. Comprehensive Health Insurance
- **Type**: Health
- **Description**: Complete medical coverage with additional benefits
- **Requirements**:
  - Minimum age: 18 years
  - No pre-existing conditions
  - Permanent residence
- **Base Price**: $150.00/month
- **Coverage Amount**: $100,000
- **Additional Coverage Cost**: $25
- **Additional Benefit Cost**: $20
- **Payment Frequencies**:
  - Monthly: $150.00
  - Quarterly: $450.00
  - Yearly: $1,800.00

## Features

Each insurance plan includes:
- Multiple payment frequency options
- Coverage relations with specific amounts
- Benefit relations with additional costs
- Custom requirements based on plan type
- Progressive pricing based on coverage level
