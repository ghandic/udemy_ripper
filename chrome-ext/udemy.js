function getQuiz() {

    class Option {

        constructor(node){

            this.description = node.querySelector('div[class*=mc-quiz-answer--question-copy--]').innerText
            this.correct = node.querySelector('div[class*=mc-quiz-answer--correct--]') != null
        }
    }


    class Question {

        constructor(node){
            this.multiple = node.querySelector('input[type=radio]') === null
            this.description = node.querySelector('div[id=question-prompt]').innerText
            this.options = [...node.querySelector('ul[aria-labelledby=question-prompt]').querySelectorAll('li')].map(node => new Option(node))

            try {
              this.explanation = node.querySelector('div[class*=mc-quiz-question--explanation--]').querySelector('div').innerText
            } catch (error) {
              this.explanation = ""
            }

        }

    }

    class Quiz {

        constructor(node){
            this.title = document.URL.split("/")[3]
            this.problem_sets = [new ProblemSet(node)]
        }

    }

    class ProblemSet {

        constructor(node){
            this.title = document.querySelector("h2[data-purpose=title]").innerText
            this.intro = ""
            this.questions = [...node.querySelectorAll('div[class*=detailed-result-panel--question-container]')].map(node => new Question(node))
        }

    }

    return new Quiz(document.querySelector('body'))
//    var quiz = [...questions].map(node => new Question(node))
//
//    return quiz
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 4));
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
