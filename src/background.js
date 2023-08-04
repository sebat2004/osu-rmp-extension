const ratings = require('@mtucourses/rate-my-professors').default;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    ratings.searchSchool("Oregon State University").then((schools) => {
        console.log(request.instructorName, schools[0].id)
        ratings.searchTeacher(request.instructorName, schools[0].id).then((teachers) => {
            ratings.getTeacher(teachers[0].id).then((ratingStats) => {
                sendResponse({ratingStats: ratingStats});
            });
        });
    });
    return true;
});