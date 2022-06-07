# calendar-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### Open application
Go to
```
http://localhost:8080/
```

### Run your unit tests
```
npm run test:unit
```

### Milestones

There are some features that I couldn't complete in time.
- [ ] Display reminders on the calendar view in the correct time order.
- [ ] Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

### Done
- [x] Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
- [x] Allow the user to select color when creating a reminder and display it appropriately.
- [x] Ability to edit reminders – including changing text, city, day, time and color.
- [x] (Please see note bellow) Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
- [x] Expand the calendar to support more than the current month.
- [x] Properly handle overflow when multiple reminders appear on the same date.
- [x] Functionality to delete one or ALL the reminders for a specific day.

#### Note: 
Dear reviewer, during development I noticed that the [openweathermap api](https://openweathermap.org/forecast16#name16) just returns the weather for
current date (`dt` value in `response` object).
In that case, to get the weather information, I'm considering only events that has been saved in the same date. This is the condition that I assumed
to call this API. SO, to see this feature working, you can add an event for the current date that you are.

### Contact author
If you want to contact me, don't hesitate in send an email to karine.liuti@gmail.com