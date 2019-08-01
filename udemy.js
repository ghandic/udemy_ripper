function getQuiz() {

    class Answer {

        constructor(node){
            this.option = node.querySelector('div[class*=mc-quiz-answer--question-copy--]').innerText
            this.correct = node.querySelector('div[class*=mc-quiz-answer--correct--]') != null
        }
    }


    class Question {

        constructor(node){
            this.question = node.querySelector('div[id=question-prompt]').innerText
            this.multiple = node.querySelector('input[type=radio]') === null
            this.answers = [...node.querySelectorAll('li')].map(node => new Answer(node))

            try {
              this.explanation = node.querySelector('div[class*=mc-quiz-question--explanation--]').querySelector('div').innerText
            } catch (error) {
              this.explanation = null
            }

        }

    }

    questions = document.querySelectorAll('div[class*=detailed-result-panel--question-container]')
    var quiz = [...questions].map(node => new Question(node))

    return quiz
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function get_quiz_filename() {
    return document.URL.split("/")[3] + '_quiz_' + document.URL.split("/")[6]
}

downloadObjectAsJson(getQuiz(), get_quiz_filename())
