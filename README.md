# TUTE_DUDE

## Assignment - 2

### Objective

The goal of this assignment is to create a basic To-Do application using React. The app will allow users to add tasks to a list, manage the state of these tasks, and ensure a dynamic user interface.

### Requirements

#### Todo: Add an Input Field
- Text Input Field: Provide a text input field where users can type in the title of their to-do task.
- Button: Create a button to add a Todo
- Show Alert: On button click, display an alert if the input field is empty when entering a todo. If the input is not empty, show a successful add message.

#### Display Added Items
- List of Tasks: After clicking the "Add" button, the task should appear below the input field as part of a to-do list.
- Add complete functionality: Use a checkbox with each todo for showing complete when the checkbox is checked

#### UI/UX
- Dynamic Rendering: The list of added to-dos should be displayed below the input field and rendered dynamically without reloading the page.
- Attractive Design: Create a good-looking website 
- Submission Guidelines
- Deploy the React code on Netlify and Vercel.
- If you don’t know how to deploy React code on a free hosting platform, watch this YouTube video [Watch Video](https://youtu.be/AP0fKMrmyKA?si=wKbklcCA3rGCFDb7)
- Deploy Link: Submit Deploy Link in Readme.md file of task-related GitHub repo.
- Submission Link: Submit the GitHub repo Link in the Submission Box.

### Assignment - 2 Deployment
View the [Todo App](https://tutedude-to-do-app-assignment-2.netlify.app/)

## Assignment - 3

### Objective

Creating a React application for an online shoe store involves several components and functionalities that work together to provide a seamless shopping experience. This guide will help you build a basic version of such an application, focusing on state management with the useState hook.

### Requirements

Your task is to develop a React application for a shoe store. It allows customers to view available shoes and add them to their shopping cart using the useState hook provided by React. The application should consist of the following key components:

#### Displaying Shoes:
You can display a collection of shoes available for purchase on the left side. Each shoe should include relevant information such as name, price, and an image.

#### Shopping Cart:
I'd like for you to implement a shopping cart on the right where users can add selected shoes and view their choices. The cart should display the name, price, and quantity of each item.

#### Add to Cart: 
Enable users to add shoes to their shopping cart by clicking on an "Add to Cart" button associated with each shoe. Implement the logic to update the cart state accordingly using the useState hook.

#### Remove from Cart:
Allow users to remove items from their shopping cart. Implement functionality to decrease the quantity.

#### Cart Total:
Display the total cost of all items in the shopping cart.

### Assignment - 3 Deployment
View the [Shoe Store App](https://tutedude-shoe-store-app-assignment-3.netlify.app/)

## Assignment - 5

### Objective
Develop a React application for an online shoe store with the capability to manage state using Redux. Implement a payment feature that allows users to transition seamlessly from the shopping cart to a payment page. Users should be able to view their cart contents, return to shopping, and enter credit card details for payment processing.

### Problem Description:
Let's make the app using React-Redux, and Redux Toolkit. The application should consist of the following key components:

#### Redux Integration:
Integrate Redux into the React application to manage the state related to the shopping cart.

#### Payment Option: 
Implement a "Proceed to Payment" button within the shopping cart. Clicking this button should redirect users to the payment page.

#### Credit Card Payment:
Include a form on the payment page for users to enter credit card details. 

#### Payment Page: 
Create a payment page where users can view their shopping cart contents. Provide an option for users to return to their shopping cart if they wish to modify it before proceeding with payment.

#### Search Bar: 
Include search bar functionality that is missing from the video. Therefore, implement this feature based on your understanding. 

#### Redux Actions and Reducers:
Define Redux actions and reducers to handle state updates for adding items to the cart and removing items from the cart.

### Assignment - 5 Deployment
View the [Redux Store App](https://tutedude-redux-store-app-assignment-5.netlify.app/)

## Assignment - 7

### Objective
The Personal Finance Tracker application is designed to help users efficiently manage their finances by providing a comprehensive platform to track income, expenses, and budgets. This application consists of several key pages, each serving a specific purpose to enhance the user's financial awareness and control.

### Project Requirement:

#### Dashboard Page:
- Global Header and Footer across the app.
- Four summary cards: Total Income, Total Expenses, Remaining Budget, Savings.
- Interactive charts:
    – Monthly spending trend (bar or line).
    – Category-wise expense split (pie).
- “Today’s Expenses” table with amount, category, and note.
- Date filter to narrow all dashboard data to a specific day or range.

#### Transaction Page:
- Full transaction list in a sortable table with columns:
    – Type (Income/Expense)
    – Amount
    – Category
    – Date
    – Description (optional)
- Add a Transaction form/dialog that captures the same fields.
- Edit and Delete actions for every row with complete functionality.

#### Budgets Page
- Let users set a monthly budget per category (e.g., ₹ 10,000 Groceries).
- Visual progress (bars, rings, or meters) showing current spend vs. budget.
- Real-time overspend alert when any category exceeds its limit.

#### Profile Page:
- Display user details (name, email, etc.).
- Change the Default Currency dropdown (₹, $, €, £ …).
- Show lifetime Total Expenses and Total Savings.
- Edit Profile button to update user info.

#### Add React Toastify
- Use Toastify for success, error, and overspend notifications (e.g., “Transaction added”, “Budget exceeded”).
- Trigger toasts on add/edit/delete actions and overspend events.

#### General Front-End Rules
- Pure React JS (functional components, hooks, Context, or Redux for state).
- React Router for page navigation.
- Data persistence in localStorage or any mock API.
- Responsive design (mobile ↔ desktop).
- Clean the codebase and format all component files by using the Prettier VS Code extension.
- Add some default data

### Assignment - 7 Deployment
View the [Finance App]()