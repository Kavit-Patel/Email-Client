# Email Client Application

A feature-rich email client built using **Next.js**, designed to replicate the core functionalities of an application like Outlook. It provides an intuitive user experience for reading, managing, and filtering emails.

The application is live and can be accessed here: [**Email Client Azure**](https://email-client-azure.vercel.app/).

---

## Features

### Core Features

- **Email List View**

  - Displays a list of emails fetched from the API.
    https://flipkart-email-mock.vercel.app
  - Differentiates between **read** and **unread** emails using distinct styles.

- **Email Detail View**

  - Clicking on an email opens its details in a master-detail layout:
    - **Master View (Left):** Displays the email list.
    - **Detail View (Right):** Shows the selected email:
  - Email body is fetched dynamically upon selection.

- **Mark as Favorite**

  - Emails can be marked/unmarked as favorite from the detail view.

- **Filtering**
  - Filter emails by:
    - Favorites.
    - Read.
    - Unread.

### Additional Enhancements

- **Pagination**
  - Handles long email lists by fetching data page by page.
- **Persistent Storage**
  - Favorites and read statuses persist since stored in localstorage.

---

## APIs Used

### 1. Email List API

Fetches a paginated list of emails.

- **Endpoint:** `https://flipkart-email-mock.now.sh/`
- **Paginated:** `https://flipkart-email-mock.now.sh/?page=<pageNumber>`

### 2. Email Body API

Fetches the content of a specific email.

- **Endpoint:** `https://flipkart-email-mock.now.sh/?id=<email-item-id>`

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Tailwindcss
- **Deployment:** [Vercel](https://email-client-azure.vercel.app/)

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**
   git clone [<repository_url>](https://github.com/Kavit-Patel/Email-Client.git)
   cd email-client
2. **env**
   NEXT_PUBLIC_EMAIL_LIST = https://flipkart-email-mock.vercel.app
3. **run**
   npm run dev
