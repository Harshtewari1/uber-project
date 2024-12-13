# Backend User Authentication Documentation

## Project Overview
- **Authentication System**: User registration and login
- **Technologies Used**: 
  - Express.js
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT)
  - Bcrypt for password hashing

## Authentication Workflow
1. User Registration
2. User Login
3. Token-based Authentication

# User Registration Endpoint

## Endpoint Details
- **URL**: `/user/register`
- **Method**: `POST`
- **Purpose**: Create a new user account

## Request Payload
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

## Validation Rules
### Firstname
- Required field
- Minimum length: 3 characters
- Type: String

### Lastname
- Optional field
- Minimum length: 3 characters
- Type: String

### Email
- Required field
- Must be valid email format
- Unique across system
- Minimum length: 5 characters

### Password
- Required field
- Minimum length: 6 characters
- Will be hashed before storage

## Success Response
- **HTTP Status**: `201 Created`
- **Response Body**:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

## Error Scenarios
### Validation Errors
- **HTTP Status**: `400 Bad Request`
- **Possible Reasons**:
  - Invalid email format
  - Firstname less than 3 characters
  - Password less than 6 characters

### Duplicate Email
- **HTTP Status**: `400 Bad Request`
- **Reason**: Email already registered

## Example Registration Request
```bash
curl -X POST http://your-domain.com/user/register \
     -H "Content-Type: application/json" \
     -d '{
           "fullname": {
             "firstname": "John", 
             "lastname": "Doe"
           },
           "email": "john@example.com",
           "password": "secure123"
         }'
```

# User Login Endpoint

## Endpoint Details
- **URL**: `/user/login`
- **Method**: `POST`
- **Purpose**: Authenticate user and generate access token

## Request Payload
```json
{
  "email": "string",
  "password": "string"
}
```

## Validation Rules
### Email
- Required field
- Must be valid email format
- Must be registered in system

### Password
- Required field
- Minimum length: 6 characters
- Must match stored password

## Success Response
- **HTTP Status**: `200 OK`
- **Response Body**:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

## Error Scenarios
### Validation Errors
- **HTTP Status**: `400 Bad Request`
- **Possible Reasons**:
  - Invalid email format
  - Password less than 6 characters

### Authentication Errors
- **HTTP Status**: `401 Unauthorized`
- **Possible Reasons**:
  - Email not found
  - Incorrect password

## Example Login Request
```bash
curl -X POST http://your-domain.com/user/login \
     -H "Content-Type: application/json" \
     -d '{
           "email": "john@example.com",
           "password": "secure123"
         }'
```

# User Profile Endpoint

## Endpoint Details
- **URL**: `/user/profile`
- **Method**: `GET`
- **Purpose**: Retrieve authenticated user's profile information
- **Authentication Required**: Yes (Bearer Token)

## Request Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

## Response
### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

### Error Responses
- **Status Code**: `401 Unauthorized`
  - Occurs when no token is provided or token is invalid

# User Logout Endpoint

## Endpoint Details
- **URL**: `/user/logout`
- **Method**: `GET`
- **Purpose**: Log out the authenticated user and invalidate the current token
- **Authentication Required**: Yes (Bearer Token)

## Request Headers
```http
Authorization: Bearer <JWT_TOKEN>
```

## Response
### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "message": "User logged out successfully"
}
```

### Error Responses
- **Status Code**: `401 Unauthorized`
  - Occurs when no token is provided or token is invalid

# Captain Registration API Documentation

## Register New Captain
This endpoint allows new captains (drivers) to register in the system. It handles captain profile creation with vehicle details and performs various validations.

### Endpoint Details
- **URL**: `/captain/register`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body Schema
```json
{
  "fullname": {
    "firstname": "string",    // Required, min 3 characters
    "lastname": "string"      // Optional, min 3 characters if provided
  },
  "email": "string",         // Required, must be valid email format
  "password": "string",      // Required, min 6 characters
  "vehicle": {
    "color": "string",       // Required, min 3 characters
    "plate": "string",       // Required, min 3 characters
    "capacity": "number",    // Required, min value 1
    "vehicleType": "string"  // Required, must be: car|motorcycle|auto
  }
}
```

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secure123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation Rules
1. **Name Validation**
   - First name must be at least 3 characters
   - Last name, if provided, must be at least 3 characters

2. **Email Validation**
   - Must be a valid email format
   - Must be unique in the system
   - Automatically converted to lowercase

3. **Password Requirements**
   - Minimum 6 characters
   - Stored securely using bcrypt hashing

4. **Vehicle Details**
   - Color: minimum 3 characters
   - Plate: minimum 3 characters
   - Capacity: must be at least 1
   - Vehicle Type: must be one of ['car', 'motorcycle', 'auto']

### Success Response
- **Status Code**: `200 OK`
```json
{
  "success": true,
  "message": "Captain registered successfully",
  "data": {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
}
```

### Error Responses

1. **Validation Error (400 Bad Request)**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

2. **Duplicate Email (409 Conflict)**
```json
{
  "success": false,
  "message": "Email already exists",
  "error": "Duplicate email address"
}
```

3. **Server Error (500 Internal Server Error)**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details..."
}
```

### Testing in Postman
1. Create a new POST request
2. Set URL to: `http://localhost:YOUR_PORT/captain/register`
3. Set Headers:
   - Key: `Content-Type`
   - Value: `application/json`
4. In Body tab:
   - Select "raw"
   - Select "JSON"
   - Copy and modify the example request above
5. Send request and verify response

### Notes
- New captains are set to "inactive" status by default
- Password is automatically hashed before storage
- Email addresses are stored in lowercase
- All validation errors are returned together if multiple fields fail validation

## Security Considerations
- Passwords hashed with bcrypt
- JWT tokens for authentication
- Tokens valid for subsequent authenticated requests

## Troubleshooting
- Verify all required fields
- Check email format
- Ensure password meets length requirements
- Confirm credentials during login

# Captain Login API

## Login Captain
Authenticate existing captain and get access token.

### Endpoint Details
- **URL**: `/captain/login`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body
```json
{
  "email": "string",    // Required, valid email
  "password": "string"  // Required, min 6 characters
}
```

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "secure123"
}
```

### Success Response
- **Status Code**: `200 OK`
```json
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response
- **Status Code**: `401 Unauthorized`
```json
{
  "message": "Invalid email or password"
}
```

# Captain Profile API

## Get Captain Profile
Get the authenticated captain's profile information.

### Endpoint Details
- **URL**: `/captain/profile`
- **Method**: `GET`
- **Authentication**: Required (JWT Token)

### Headers Required
```
Authorization: Bearer <jwt_token>
```
OR
```
Cookie: token=<jwt_token>
```

### Success Response
- **Status Code**: `200 OK`
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response
- **Status Code**: `401 Unauthorized`
```json
{
  "message": "Unauthorized"
}
```

# Captain Logout API

## Logout Captain
Logout the currently authenticated captain and invalidate their token.

### Endpoint Details
- **URL**: `/captain/logout`
- **Method**: `GET`
- **Authentication**: Required (JWT Token)

### Headers Required
```
Authorization: Bearer <jwt_token>
```
OR
```
Cookie: token=<jwt_token>
```

### Success Response
- **Status Code**: `200 OK`
```json
{
  "message": "Logout successfully"
}
```

### Error Response
- **Status Code**: `401 Unauthorized`
```json
{
  "message": "Unauthorized"
}
```

### Authentication Notes
1. **Token Handling**:
   - Tokens can be provided via Authorization header or cookie
   - Tokens are automatically blacklisted after logout
   - Blacklisted tokens will be rejected for all authenticated requests

2. **Security**:
   - All authenticated endpoints require valid, non-blacklisted token
   - Tokens are JWT format and contain captain's ID
   - Expired or invalid tokens return 401 Unauthorized

3. **Best Practices**:
   - Always store tokens securely
   - Clear tokens on client side after logout
   - Include token in every authenticated request
