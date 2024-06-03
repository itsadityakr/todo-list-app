# Advanced Activity Manager

## Website Link
https://itsadityakr.github.io/Todo-List/


## Overview
This repository contains the source code and documentation for the Advanced Activity Manager (AAM) application. AAM provides users with an interactive to-do list and calendar, along with voice command functionalities.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
  - [Terms of Use](#terms-of-use)
  - [Advanced Activity Manager](#advanced-activity-manager)
  - [Calendar Activity Manager](#calendar-activity-manager)
  - [Voice Functions](#voice-functions)
  - [Speech Alert](#speech-alert)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation
1. Clone the repository:
    git clone https://github.com/itsadityakr/Todo-List.git
   
3. Navigate to the project directory:
    cd Todo-List

4. Open the `index.html` file in your preferred web browser to view the Terms and Functions page.

## Usage
To use the Advanced Activity Manager application, simply open the provided HTML file in a web browser. The application includes interactive features such as a to-do list, calendar, and voice command functionality.

## Features

### Terms of Use
The Terms of Use govern access to and use of the services, including the website, applications, products, and content.

- **Acceptance of Terms**: Users must comply with the Terms to use the Services.
- **Description of Services**: The Services include information, resources, tools, and interactive features.
- **User Conduct**: Users must use the Services lawfully.
- **Intellectual Property**: All content and intellectual property rights belong to their respective owners.
- **Privacy**: The Privacy Policy outlines how user information is handled.
- **Limitation of Liability**: The service provider is not liable for any damages arising from the use of the Services.
- **Indemnification**: Users agree to indemnify and hold the service provider harmless from claims arising from the use of the Services.
- **Modifications to Terms**: The Terms may be modified without notice.
- **Termination**: Access to the Services can be terminated at any time.
- **Governing Law**: The Terms are governed by the laws of the specified jurisdiction.

### Advanced Activity Manager
A to-do list manager with features such as adding, deleting, and marking tasks as completed. Supports theme changes and local storage for user preferences.

**Functions Used:**
- `addToDo()`: Adds a new to-do item.
- `deleteCheck()`: Handles deletion and completion of to-do items.
- `renderTodos()`: Renders the to-do list.
- `savelocal()`: Saves to-do items to local storage.
- `getTodos()`: Retrieves to-do items from local storage.
- `removeLocalTodos()`: Removes to-do items from local storage.
- `changeTheme()`: Changes between light and dark themes.

### Calendar Activity Manager
An interactive calendar that allows users to navigate through months, add events, and view saved events.

**Functions Used:**
- `initCalendar()`: Initializes the calendar.
- `prevMonth()`: Moves to the previous month.
- `nextMonth()`: Moves to the next month.
- `gotoDate()`: Allows users to go to a specific date.
- `addListener()`: Adds event listeners to each day.
- `updateEvents()`: Updates the events for the selected day.
- `saveEvents()`: Saves events to local storage.
- `getEvents()`: Retrieves events from local storage.

### Voice Functions
Recognizes voice commands for interacting with the to-do list.

**Commands:**
- "Remove recent task": Removes the most recent task.
- "Create a task": Creates a new task.
- "Turn off mic": Stops speech recognition.

### Speech Alert
Users agree to the use of speech recognition by allowing microphone access. Data is stored locally and not transmitted over the internet. Users can decline microphone access and still use other features.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

