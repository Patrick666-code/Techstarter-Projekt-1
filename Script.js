let gameinfo = [
    { value: ["Hangman","Server","Computer","Webseite","Hardware","Software","Tastatur","Google","Dokument","Sicherheit","Internet","Anwendung","Funktion","Code","Programm","Client","Informatik","Netzwerk","Snack","Monitor","Maus","Haus","Laus","Grafik","Handy","Speicher","Papierkorb","Arbeitsplatz","Datei","Api","Array","Binaer"] },
    { value: ["Hypertext", "Javascript", "Grafikdesign", "Webbrowser", "Computermaus", "Stylesheet", "Framework","Prozessor","Komplexitaet", "Abstraktion", "Dekomposition","Betriebssystem","Firewall","Malware","Virtualisierung","Darstellung","Grafikkarte","Smartphone","Festplatte","Bildschirm","Programmierung","Arbeitsspeicher","Pseudocode","Datenstruktur","Backup","Bandbreite","Blockchain"] },
    { value: ["Anglizismus", "Bundesausbildungsfoerderungsgesetz", "Arbeiterunfallversicherungsgesetz", "Netzwerktopologie","Prozessorleistung", "Kryptographieverfahren","Softwareentwicklung","Datenschutzbestimmungen","Dartellungsebene","Arbeitsspeicherauslastung","Konfigurationsdatei","Grafikkartenauslastung","Bildschirmfrequenz","Festplattenspeicher","Defragmentierung","Problembehandlung","Sytemkomponenten","Backendentwicklung","Frontendentwicklung","Algorithmus","Datenbankmanagementsystem","Programmierschnittstelle","Versionsverwaltungssystem","Netzwerksicherheitsprotokoll","Betriebssystemkompatibilität","Speicherverwaltungseinheit","Verschlüsselungsalgorithmus","Authentifizierungsmechanismus","Fehlertoleranzmechanismus","Benutzerfreundlichkeitstest","Softwareentwicklungszyklus"]}
];
let SAVE = {
    'levelchoice': 0,
    'minuspoints': 0,
};

let word = "";
let task = "";

let eren = document.getElementsByClassName("EvilErens")[0];

let timeout;

function Level(level) {
    SAVE.levelchoice = level;
}

function addWord(){
    document.getElementById('addWordBox').style.visibility="visible";
}
function Start() {
   
    eren.style.visibility = "visible";
    eren.id = "imageerenstandard";

    SAVE.minuspoints=0;
    if(document.getElementById('addedWord').value ==""){
    word = gameinfo[SAVE.levelchoice].value[Math.floor(Math.random() * gameinfo[SAVE.levelchoice].value.length)];
    }
    else {
        word=document.getElementById('addedWord').value;
        document.getElementById('addedWord').value="";
    }
    task = "-".repeat(word.length);
    document.getElementById('Task').innerText = task;
    document.getElementById('points').innerText="❤️❤️❤️❤️❤️";
    document.getElementsByClassName('image')[0].id='image0';
    document.getElementById('imageWin').style.visibility="hidden";
    document.getElementById('addWordBox').style.visibility="hidden";
    Letters = document.getElementsByClassName('letter');
    for (i = 0; i < Letters.length; i++) {
        document.getElementsByClassName('letter')[i].removeAttribute('disabled');
    }

}

function Try(clickedLetter) {
    let test = "falsch";
    clickedLetter.disabled = "true";
    letter = clickedLetter.value.toLowerCase();

    let newTask = task.split('');

    for (let i = 0; i < word.length; i++) {
        if (letter === word.toLowerCase().charAt(i)) {
            test = "richtig";
            newTask[i] = word.charAt(i);

            clearTimeout(timeout);
            eren.id = "imageerensauer";
            timeout = setTimeout(function () {
                eren.id = "imageerenstandard";
            }, 800);

        }
    }

    console.log(letter + ' ist ' + test);
    task = newTask.join('');


    if (test === "falsch") {
        SAVE.minuspoints += 1;
        document.getElementsByClassName('image')[0].id='image'+SAVE.minuspoints;
        document.getElementById('points').innerText=document.getElementById('points').innerText.slice(2);
        if (SAVE.minuspoints === 5) {
            document.getElementById('points').innerText="☠️";
            Letters = document.getElementsByClassName('letter');
            for (i = 0; i < Letters.length; i++) {
                document.getElementsByClassName('letter')[i].disabled="true";
            }
            clearTimeout(timeout);
            eren.id = "imageerenevil";
             

        }
        else {
            clearTimeout(timeout);
            eren.id = "imageerenhappy";
            timeout = setTimeout(function () {
                eren.id = "imageerenstandard";
            }, 800);
        }
    }
    else {
        document.getElementById('Task').innerText = task;
    }
    if (task.indexOf('-') === -1) {
        Letters = document.getElementsByClassName('letter');
            for (i = 0; i < Letters.length; i++) {
                document.getElementsByClassName('letter')[i].disabled="true";
            }
            document.getElementsByClassName('image')[0].id='image0';
            document.getElementById('imageWin').style.visibility='visible';
            
            clearTimeout(timeout);
            eren.id = "imageerensauer";
        }
    
}
