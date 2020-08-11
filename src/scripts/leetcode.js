
class Leetcode {
    isCorrect() {
        $.get(check, function(response, status) {
            console.log(response)
            if (response.state === "SUCCESS" && response.status_msg === "Accepted") {
                storage.incrTimeToUse()
            } else if (response.state === "SUCCESS" && response.status_msg === "Wrong Answer") {
            }
        })
    }

    checkSubmission(problem) {
        var id;
        var request = `https://leetcode.com/api/submissions/${problem}/`
        $.get(request, function(response, status) {
            var alreadySolved = false;
            for (var i = 1; i < response.submissions_dump.length; i++) {
                if (response.submissions_dump[i].status_display === "Accepted") {
                    console.log("you already solved this!")
                    alreadySolved = true;
                    break;
                }
            }
            
            if (!alreadySolved) {
                id = response.submissions_dump[0].id;
                var check = `https://leetcode.com/submissions/detail/${id}/check/`
                var currTime = new Date().getTime();

                var interval = setInterval(function() {
                    $.get(check, function(response, status) {
                        if (response.state === "SUCCESS" && response.status_msg === "Accepted") {
                            storage.incrTimeToUse();
                            clearInterval(interval);
                        } else if (response.state === "SUCCESS" && response.status_msg === "Wrong Answer") {
                            clearInterval(interval);
                        }
                    })
                    if (new Date().getTime() - currTime > 3000) {
                        clearInterval(interval);
                    }
                }, 1000)
            }
            
        })        
    }
}