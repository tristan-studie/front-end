// WHEN THE TRAINER LOADS/ON GAME START->
// #2 fill list-group left with button elements with the names, in a random order (amount set in settings, #8)
// #2 fill list-group right with img elements with the photos, in a random order (amount set in settings, #8)
// #4 Show amount of match-tries and amount of successful matches in the top corner of the screen.
// #5 Show countdown timer on top of the screen. the timer has the time from the settings(#7), and starts counting down.

// ON USER CLICK IMG/BUTTON ELEMENT->
// #3 select name/photo
// #3 add border around selected item
// #3 when there is already one img/button selected and user clicks another, remove previous one from selection

// ON USER MATCH TRY->
// #4 for both good and wrong: add 1 to total match tries
// compare selection: if belong together: successful try (see below) else: wrong try(see below)

//SUCCESSFUL TRY->
// #3 photo+name fade away(500ms)[CSS class?] (space stays intact)
// #4 add 1 to total correct tries

// WRONG TRY->
// Deselect both the name and photo [maybe selection border flashes red for 1 second before deselection?]

// ON ALL MATCHES (WIN)->
// Save score + date/time
// Show alert with score, after user confirm, return to home screen

//ON END OF TIME(NO WIN)->
// #5 Don't allow any new user input with the names/photos
// Save score + date/time
// Show alert with score, after user confirm, return to home screen
