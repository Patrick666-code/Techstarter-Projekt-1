const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let gameinfo = [
    { level: "Einfach", value: ["Hangman", "Server", "Computer", "Webseite", "Hardware", "Software", "Tastatur", "Google", "Dokument", "Sicherheit", "Internet", "Betriebssystem"] },
    { level: "Mittel", value: ["Hypertext", "Javascript", "Grafikdesign", "Webbrowser", "Computermaus", "Stylesheet", "Framework", "Komplexitaet", "Abstraktion", "Dekomposition"] },
    { level: "Schwer", value: ["Anglizismus", "Bundesausbildungsfoerderungsgesetz", "Arbeiterunfallversicherungsgesetz", "Netzwerktopologie", "Kryptographieverfahren"] }
];

let SAVE = {
    levelchoice: "Einfach",
    minuspoints: 0,
    guessedLetters: [],
    wrongLetters: [],
    score: 0,
};

let word = "";
let task = "";
const HANGMAN_STAGES = [
    `\n\n\n\n\n\n\n========`,
    `\n\n\n\n\n\n\n|=======`,
    `\n  |\n  |\n  |\n  |\n  |\n  |\n========`,
    `  +---+\n  |   |\n      |\n      |\n      |\n      |\n========`,
    `  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n========`,
    `  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n========`,
    `  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n========`,
    `  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n========`,
    `  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========`
];

function buildGame() {
    console.clear();
    console.log("Willkommen im Spiel Hangman!");
    console.log("Ziel: Errate das geheime Wort, indem du einzelne Buchstaben angibst.");
    console.log("Ist der Buchstabe falsch, wird der Hangman Stück für Stück gezeichnet.");
    console.log("Schwierigkeiten: Einfach, Mittel, Schwer. Eingabe: z. B. 'Mittel'.");
    console.log("Starte das Spiel mit dem Befehl: Start");

    rl.question('Eingabe: ', (answer) => {
        if (answer.toLowerCase() === "start") {
            Start();
        } else if (["einfach", "mittel", "schwer"].includes(answer.toLowerCase())) {
            Level(answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase());
        } else {
            console.log("Ungültige Eingabe. Bitte erneut versuchen.");
            buildGame();
        }
    });
}

function Level(choice) {
    SAVE.levelchoice = choice;
    console.log("Schwierigkeit auf " + choice + " gesetzt.");
    buildGame();
}

function Start() {
    console.clear();
    console.log(`Schwierigkeit: ${SAVE.levelchoice}`);
    for (let i = 0; i < gameinfo.length; i++) {
        if (gameinfo[i].level === SAVE.levelchoice) {
            word = gameinfo[i].value[Math.floor(Math.random() * gameinfo[i].value.length)];
        }
    }
    task = "-".repeat(word.length);
    SAVE.guessedLetters = [];
    SAVE.wrongLetters = [];
    SAVE.minuspoints = 0;

    console.log(task);
    playTurn();
}

function playTurn() {
    console.log(HANGMAN_STAGES[SAVE.minuspoints]);
    console.log(`Erraten: ${SAVE.guessedLetters.join(", ")}`);
    console.log(`Falsch: ${SAVE.wrongLetters.join(", ")}`);

    rl.question('Buchstabe: ', (answer) => {
        let letter = answer.toLowerCase().trim();

        if (letter.length !== 1 || !/[a-zäöüß]/.test(letter)) {
            console.log("Bitte gib nur einen gültigen Buchstaben ein.");
            return playTurn();
        }

        if (SAVE.guessedLetters.includes(letter) || SAVE.wrongLetters.includes(letter)) {
            console.log("Du hast diesen Buchstaben schon geraten. Versuch es erneut.");
            return playTurn();
        }

        if (word.toLowerCase().includes(letter)) {
            console.log(`Richtig! Der Buchstabe ${letter} ist im Wort.`);
            SAVE.guessedLetters.push(letter);

           
            let newTask = task.split('');
            for (let i = 0; i < word.length; i++) {
                if (word[i].toLowerCase() === letter) {
                    newTask[i] = word[i];
                }
            }
            task = newTask.join('');
        } else {
            console.log(`Falsch! Der Buchstabe ${letter} ist nicht im Wort.`);
            SAVE.wrongLetters.push(letter);
            SAVE.minuspoints += 1;
        }

        if (SAVE.minuspoints >= HANGMAN_STAGES.length - 1) {
            console.log(HANGMAN_STAGES[SAVE.minuspoints]);
            console.log(`Du hast verloren! Das Wort war: ${word}`);
            return restartGame();
        }

        if (task === word) {
            console.log(`Herzlichen Glückwunsch! Du hast das Wort erraten: ${word}`);
            SAVE.score += 10;
            console.log(`Aktuelle Punktzahl: ${SAVE.score}`);
            return restartGame();
        }

        console.log(task);
        playTurn();
    });
}

function restartGame() {
    rl.question('Möchtest du nochmal spielen? (ja/nein): ', (answer) => {
        if (answer.toLowerCase() === "ja") {
            buildGame();
        } else {
            console.log("Danke fürs Spielen! Bis zum nächsten Mal.");
            rl.close();
        }
    });
}

buildGame();
