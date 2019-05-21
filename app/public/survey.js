let questionArr = [
    "I am generous. I love to share with others.",
    "I love a good debate. I can argue any point.",
    "I am self-disciplinced. I have no trouble staying on a routine.",
    "I often feel anxious. There are some things I constantly worry about.",
    "I am open to new experiences. Let's try it!",
    "I am reserved. I would rather be quiet than mindlessly talk.",
    "I am warm. I have compassion for others even strangers.",
    "I am disorganized. It's around here...somewhere...",
    "I am calm and stable. I am a rock.",
    "I love convention. Let's stay inside the box."
];

function loadQuestions() {
    let html = "";
    for (let index = 0; index < questionArr.length; index++) {
        const item = questionArr[index];
        html += getQuestionHtml(index, item);
    }

    $("#questionArr").html(html);
    $("#submit").on('click', checkScores);
}

function getQuestionHtml(index, item) {
    return `
    <div class="shadow row rounded" id="question-row">
        <div class="col-sm-8">
            <div class="question"> ${item}
                <form>
                    <input type="radio" id="${index}.0" name="question${index}">Strongly Agree<br>
                    <input type="radio" id="${index}.1" name="question${index}">Agree<br>
                    <input type="radio" id="${index}.2" name="question${index}">Neutral<br>
                    <input type="radio" id="${index}.3" name="question${index}">Disagree<br>
                    <input type="radio" id="${index}.4" name="question${index}">Strongly Disagree<br>
                </form>
            </div>
        </div>
    </div>`
}

function checkScores() {
    let missingData = false;

    const scores = [];
    for (let questionIndex = 0; questionIndex < questionArr.length; questionIndex++) {
        const item = questionArr[questionIndex];
        let score = -1;

        for (let scoreIndex = 0; score < 0 && scoreIndex < 5; scoreIndex++) {
            let element = document.getElementById(`${questionIndex}.${scoreIndex}`);
            if (element.checked) {
                // we found which answer the user picked
                score = scoreIndex + 1;
                break;
            }
        }

        scores.push(score);
        if (score < 0) {
            missingData = true;
        }
    }

    const name = $("#name").val().trim();
    const image = $("#image").val().trim();

    if (missingData) {
        alert("Please answer all questions.")
        // TODO HighLight which or keep array and display which are unanswered
    } else if (!name) {
        alert("Please provide your name.")
        // TODO HighLight which or keep array and display which are unanswered
    } else if (!image) {
        alert("Please provide an image.")
        // TODO HighLight which or keep array and display which are unanswered
    } else {
        postAnswers(scores, name, image);
    };
}

function postAnswers(scores, name, photo) {
    const newFriend = {
        name,
        photo,
        scores,
    };
    console.log(newFriend);

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.
    $.post("/api/friends", newFriend, processResponse);
}

function processResponse(data) {
    console.log(data);
    
    if (data) {
        console.log("Match found: " + JSON.stringify(data));

        
        $("#match-name").html(data.name);
        $("#match-image").html(`<img src="${data.photo}" alt="${data.name}">`);
        $("#myModal").modal();
        $("#startOver").on('click', clear);
        

    } else {
        alert("No match found.");
    }
}

function clear() {
    location.reload();
}

loadQuestions();
