# **Next.js Datagain Assignment**

## **Overview**
This project is built with **Next.js**, utilizing various modern libraries and tools to create a robust, feature-rich web application. It includes a dynamic **AG Grid table**, a **calendar management page**, and **state management using Redux Toolkit**.

---

## **Key Features**
1. **Sidebar**
   - Expand and collapse functionality for improved navigation.

2. **State Management**
   - State is managed globally using **Redux Toolkit**.
   - CRUD operations for dynamic data management.

3. **Toast Notifications**
   - Success and error notifications for actions, implemented using **shadcn**.

4. **Dynamic Modal**
   - Modal forms for creating and editing data.

5. **Data Grid**
   - Data is displayed in a table format using **AG Grid**, offering advanced functionalities.

6. **Calendar Management**
   - Built-in calendar where users can:
     - Click on a date to view a **popup with dropdowns** for adding events or reminders.
     - Events and reminders are shown in **different colors**.
     - Selected dates show their events and reminders at the bottom of the calendar.
   - Accessible via the **calendar menu item**.

---

## **Folder Structure**
```
src/
├── app/
│   ├── calendar/        # Calendar management page
│   ├── favicon.ico      # App favicon
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── ReduxProvider.tsx # Redux provider wrapper
├── components/          # Reusable UI components
├── features/            # Redux Toolkit slices and features
├── hooks/               # Custom hooks
├── lib/                 # Helper functions or utilities
└── store/               # Redux store setup
```

## **Tech Stack**
- **Next.js**: Framework for server-side rendering and static site generation.
- **Redux Toolkit**: Simplified state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn**: For UI components and toast notifications.
- **Lucide React**: Icon library.
- **React-Responsive-Modal**: For modal dialogs.
- **React-Datepicker**: For date selection in forms.
- **date-fns**: Utility library for manipulating and formatting dates.
- **AG Grid**: Advanced table for data display and manipulation.

---

## **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Pritam-Git01/datagain
   cd datagain


## Installation Guide

### Steps

1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npm run dev
```

3. Open the application
Navigate to: `http://localhost:3000`

# Project Documentation

## Usage

### Sidebar
- Toggle between expanded and collapsed states for improved navigation.

### CRUD Operations
- Use the provided **modal forms** to create or edit data.
- Any operation triggers a **toast notification**.

### Table
- Data is presented in an **AG Grid table** with sorting, filtering, and pagination.

### Calendar
- Access the calendar via the **Calendar menu item**.
- Click on a date to open a popup with two options:
  * **Add Event**
  * **Add Reminder**
- Events and reminders appear in **different colors**.
- Details of the selected date are displayed at the bottom.

## Configuration
- Modify global settings in `next.config.js`.
- Add Tailwind customizations in `tailwind.config.js`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run start` | Start the production server |
| `npm run lint` | Lint and fix code issues |

## Best Practices
- Follow the **folder structure** for scalability.
- Use **Redux Toolkit slices** for feature-specific state management.
- Centralize reusable components in the `components/` folder.

## License
This project is licensed under the **MIT License**.
   

