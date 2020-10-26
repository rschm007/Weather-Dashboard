Weather Dashboard
-----------------------------

This webapp was designed as part of the UCI Web Development Bootcamp.

This app uses jQuery, moment.js, and the openweather API to give the user a present forecast and 5-day forecast for any given city. 

The project has been deployed to GitHub pages. To use the app you can follow the deployment link or download the source files for you to use as a template.


Prerequisites
-----------------------------

To install this application you will need a text editor like Visual Studio Code. You will also need to install the Moment.js library (https://momentjs.com/) and the openweather API (https://openweathermap.org/)


Summary
-----------------------------

The user is presented with a page containing a header with  the current date, a "clear all text" button, and then a series of labeled rows.
<img src="https://raw.githubusercontent.com/rschm007/Day-Planner/Assets/Demo%Images/demo-1.png" alt="Day Planner Demo Image" style="max-width:100%;">

The user is able to enter in their own text within each row.
<img src="https://raw.githubusercontent.com/rschm007/Day-Planner/main/Assets/Demo%20Images/demo-2.png" alt="Day Planner Demo Image" style="max-width:100%;">

Upon clicking the save button, the user's input is saved in localStorage and will persist through page resets.
<img src="https://raw.githubusercontent.com/rschm007/Day-Planner/main/Assets/Demo%20Images/demo-3.png" alt="Day Planner Demo Image" style="max-width:100%;">

Should the user want to reset their text, they can click the "Clear All Text" button to clear the localStorage and the text field values. The fields will then reset to show that they are empty.
<img src="https://raw.githubusercontent.com/rschm007/Day-Planner/main/Assets/Demo%20Images/demo-4.png" alt="Day Planner Demo Image" style="max-width:100%;">

The rows will dynamically change color based upon what time it currently is. Grey marks the past, red the present, and green the future.
<img src="https://raw.githubusercontent.com/rschm007/Day-Planner/main/Assets/Demo%20Images/demo-5.png" alt="Day Planner Demo Image" style="max-width:100%;">

Authors
-----------------------------
• Robert Schmahl - <a href="https://github.com/rschm007">GitHub Profile</a>
<br>
• UC Irvine Full Stack Web Development
<br>

Acknowledgements
-----------------------------
• UC Irvine Web Development program for providing project requirements and code examples
