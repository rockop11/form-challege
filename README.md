# React Personal Information Form

This project is a form application created with **React**, **TypeScript**, **Material UI**, **Redux Toolkit**, and **RTK Query**. The form collects personal information from a user, validates the data, and displays error messages when necessary. The country data is fetched from a public API and used in a dropdown field within the form.

## Requirements

- **React + TypeScript** with the latest available version.
- **Material UI** for UI components and theming.
- **Redux Toolkit Query** to make requests to a public API and populate the country dropdown.
- **React Hook Form** for form validation.

## Features

- **Form Fields:**
  - First Name
  - Middle Name
  - Last Name
  - Address Line 1
  - Address Line 2 (optional)
  - City
  - State (using either a text field or a select field)
  - Country (using data fetched from the public API)
  - Zip Code
  - Date of Birth
  - Age

- **Field Validation:**
  - Required fields (First Name, Last Name, etc.) will show an error if left blank.
  - Zip Code validation to ensure it's in the correct format (e.g., 5 digits for the US).
  - Date of Birth validation to ensure it's a valid date.
  - All errors are displayed using Material UI’s `TextField` and `HelperText` components.

- **API used:**
  - **Rest Countries v3.1 API** (GET https://restcountries.com/v3.1/all) to fetch the list of countries and populate the country dropdown.

- **Form Submission:**
  - Upon submitting the form, the collected data is logged to the browser console using `console.log()` (no backend required).




## Technologies Used

- **React** (latest version)
- **TypeScript**
- **Material UI** (for UI components)
- **Redux Toolkit** (for global state management)
- **RTK Query** (for making API requests)
- **React Hook Form** (for form validation)



## Installation

To get started, follow the steps below:

### 1. Clone this repository:
```bash
  git clone https://github.com/rockop11/form-challege.git
```

## 2. Change folder:
```bash
  cd form-challenge
```

## 3. Install dependencies:
```bash
  npm install
```

## 4. Run project:
```bash
  npm run dev
```

## 5. Open Project:
- visit localhost:5173