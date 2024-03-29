// // Gets school id from school name
// ratings.searchSchool('University of Texas at Austin').then((schools) => {
//     console.log(schools)
// });

import getRating from './scripts/background/getRating';
import pageViewEvent from './scripts/analytics/pageViewEvent';
import rmpClickedEvent from './scripts/analytics/rmpClickedEvent';

chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    if (request.action === "getRating") {
        getRating(request, sender, sendResponse);
    } else if (request.action === "pageViewEvent") {
        pageViewEvent(request, sender, sendResponse);
    } else if (request.action === "rmpClickedEvent") {
        rmpClickedEvent(request, sender, sendResponse);
    }
    return true;
});
