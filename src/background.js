const ratings = require('@mtucourses/rate-my-professors').default;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Gets school id from school name
    ratings.searchSchool(request.schoolName).then((schools) => {
        if (schools.length == 0) {
            sendResponse({ratingStats: null});
            return;
        }
        // Gets teacher id from teacher name and school id
        ratings.searchTeacher(request.instructorName, schools[0].id).then((teachers) => {
            if (teachers.length == 0) {
                sendResponse({ratingStats: null});
                return;
            }
            // Gets rating stats from teacher id
            ratings.getTeacher(teachers[0].id).then((ratingStats) => {
                sendResponse({ratingStats: ratingStats});
            });
        });
    });
    return true;
});