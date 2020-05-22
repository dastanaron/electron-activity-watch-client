ActivityWatch client
===================================

This is a client for the [ActivityWatch](https://github.com/ActivityWatch/activitywatch) 
time tracker.

This client will send requests to the API to create a timer bundle for its host machine,
collect data about the AFK and window titles, compare it with the data of the built-in
tracker and generate reports.

When ActivityWatch can be used not only locally, this client will help users to monitor
their reports themselves, even if they do not have access to the ActivityWatch server.
In addition, this client will only need to calculate reports when the timer has been enabled.
