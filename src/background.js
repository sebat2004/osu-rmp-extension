const ratings = require('@mtucourses/rate-my-professors').default;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Gets teacher id from teacher name and school id
    ratings.searchTeacher(request.instructorName, "U2Nob29sLTc0Mg==").then((teachers) => {
        if (teachers.length == 0) {
            sendResponse({ratingStats: null});
            return;
        }
        // Gets rating stats from teacher id
        ratings.getTeacher(teachers[0].id).then((ratingStats) => {
            sendResponse({ratingStats: ratingStats});
        });
    });
    return true;
});