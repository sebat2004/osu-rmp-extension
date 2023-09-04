const ratings = require('@mtucourses/rate-my-professors').default;

// Gets school id from school name
ratings.searchSchool('University of Texas at Austin').then((schools) => {
    console.log(schools)
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // Gets teacher id from teacher name and school id
        ratings.searchTeacher(request.instructorName, request.schoolId).then((teachers) => {
            if (teachers.length === 0) {
                sendResponse({ratingStats: null});
                return;
            }

            // Gets rating stats from teacher id
            ratings.getTeacher(teachers[0].id).then((ratingStats) => {
                sendResponse({ratingStats: ratingStats});
                {/*
                    API FORMAT:
                    
                    avgDifficulty : 0
                    avgRating : 0
                    department : "Information Science"
                    firstName : "Yang"
                    id : "VGVhY2hlci0yNjIxODUw"
                    lastName : "Wang"
                    legacyId : "2621850"
                    numRatings : 0
                    school : {}
                    wouldTakeAgainPercent : -1
                */}
            });
        });
    return true;
});
