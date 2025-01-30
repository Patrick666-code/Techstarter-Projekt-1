const gameinfo = [
    {
        level: "Einfach",
        value: ["Hangman", "Server", "Computer", "Webseite", "Hardware", "Software", "Tastatur", "Google", "Dokument", "Sicherheit", "Internet", "Betriebssystem"]
    },
    {
        level: "Mittel",
        value: ["Hypertext", "Javascript", "Grafikdesign", "Webbrowser", "Computermaus", "Stylesheet", "Framework", "Komplexitaet", "Abstraktion", "Dekomposition"]
    },
    {
        level: "Schwer",
        value: ["Anglizismus", "Bundesausbildungsfoerderungsgesetz", "Arbeiterunfallversicherungsgesetz", "Netzwerktopologie", "Kryptographieverfahren"]
    },
];
const leveloptions = ["einfach", "mittel", "schwer"];
let SAVE = {
    levelchoice: "Einfach",
    minuspoints: 0,
};
let word = "";
let task = "";

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function buildGame() {
    console.log("Willkommen im Spiel Hangman!");
    console.log("Ziel ist es, das durch Striche (-------) angezeigte Wort zu erraten, indem man einzelne Buchstaben ansagt.");
    console.log("Ist dieser Buchstabe richtig, kannst du den nächsten Buchstaben angeben bis das Wort gelöst ist.");
    console.log("Ist der angegebene Buchstabe falsch, so bekommst du einen Minuspunkt. Bei 6 Minuspunkten ist das Spiel verloren.");
    console.log("Es wird immer nur der zuerst eingegebene Buchstabe gewertet.");
    console.log("Wähle eine Schwierigkeitsstufe: 'Einfach', 'Mittel' & 'Schwer'. 'Einfach' ist voreingestellt.");
    console.log("Gib dazu zum Beispiel folgendes ein: Mittel");
    console.log("Zum Starten des Spiels, gebe folgenden Befehl ein: Start");
    rl.question('Eingabe: ', (answer) => {
        if (answer.toLowerCase() === "start") {
            Start();
        }
        else if (leveloptions.includes(answer.toLowerCase())) {
            let lvl = answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
            Level(lvl); //z.B.: Level('Mittel')
        }
        else {
            console.log('!ERROR! Bitte gib eine gültige Eingabe ein.');
            setTimeout(buildGame, 1000); //1000 Millisekunden = 1 Sekunde ;)
        }
    });
}

function Level(choice) { //z.B.: Level('Mittel')
    SAVE.levelchoice = choice;
    console.log("Die Schwierigkeitsstufe wurde auf " + choice + " gestellt.");
    rl.question('Eingabe: ', (answer) => {
        if (answer.toLowerCase() === "start") {
            Start();
        } else if (leveloptions.includes(answer.toLowerCase())) {
            let lvl = answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
            Level(lvl);
        } else {
            console.log('!ERROR! Bitte gib eine gültige Eingabe ein.');
            setTimeout(buildGame, 1000);
        }
    });
}

function Start() {
    for (let i = 0; i < gameinfo.length; i++) {
        if (gameinfo[i].level === SAVE.levelchoice) {
            word = gameinfo[i].value[
                Math.floor(Math.random() * gameinfo[i].value.length)
            ];
        }
    }
    task = "-".repeat(word.length);
    console.log(task);
    rl.question('Buchstabe: ', (answer) => {
        let guess = answer.toLowerCase().trim().charAt(0);
        Try(guess); //z.B.: Try('a')
    });
}

function Try(letter) { //z.B.: Try('n'); word="Internet"; task="--------";
    let test = "falsch";
    let newTask = task.split(''); // newTask=["-","-","-","-","-","-","-","-"];

    for (let i = 0; i < word.length; i++) {
        if (letter === word.toLowerCase().charAt(i)) {
            test = "richtig";
            newTask[i] = word.charAt(i); // word="Internet"; newTask=["-","n","-","-","-","n","-","-"]
        }
    }

    console.log(letter + ' ist ' + test);//n ist richtig
    task = newTask.join(''); //task = "-n---n--"

    if (test === "falsch") {
        SAVE.minuspoints += 1; //SAVE.minuspoints = SAVE.minuspoints + 1;
        if (SAVE.minuspoints === 6) {
            console.log("Du hast verloren!");
            task = "";
            word = "";
            SAVE.minuspoints = 0;
            rl.close();
            setTimeout(buildGame, 1000);
            return;
        }
        console.log("Minuspunkte: " + SAVE.minuspoints);
    }
    else {
        console.log(task);
    }

    if (task.indexOf('-') === -1) {
        SAVE.minuspoints = 0;
        task = "";
        word = "";
        console.log("Du hast es geschafft!");
        rl.close();
        setTimeout(buildGame, 1000);
    }
    else {
        rl.question('Buchstabe: ', (answer) => {
            let guess = answer.toLowerCase().trim().charAt(0);
            Try(guess);
        });
    }
}

buildGame();