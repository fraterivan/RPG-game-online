let stats = {
    "character_life": 100,
    "character_iq": 200,
    "character_endurance": 10,
    "experience": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Kezdő tanár, rossz fizetés!", "profile_lvl0.jpg"],
    ["Amatőr tanár, nem tud rendet tartani!","profile_lvl1.jpg"],
    ["Haladó tanár, sok házit ad fel.","profile_lvl2.jpg"],
    ["Mestertanár, hatalmas fizetés, nagy tekintéj.", "profile_lvl3.jpg"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "character_life": document.getElementById("character_life"),
    "character_iq": document.getElementById("character_iq"),
    "character_endurance": document.getElementById("character_endurance"),
    "experience": document.getElementById("experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "assets/"+lvl_description[lvl][1]
    profile_stats.character_life.innerHTML = stats.character_life;
    profile_stats.character_iq.innerHTML = stats.character_iq;
    profile_stats.character_endurance.innerHTML = stats.character_endurance;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();

    if (stats.character_life <= 0)
        story.innerHTML += "Elfogyott az életkedve, ezért felmondtál!br>";
}

refreshProfileStats();

function update_iq(){
    if(available_points > 0){
        available_points--;
        stats.character_iq += 25;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.character_endurance += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function javitas(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.character_endurance;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        fight("Tanulói butaság", 5, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szereztél! (+1)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "Dolgozat javítás közben megtámadott téged a " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            // ellenfél támad
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.character_endurance;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Elkezd fájni a fejed! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
                refreshProfileStats();
            }else{
                story.innerHTML += "Sikeresen megfékezted a fejfájást!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.character_endurance;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Próbálod csillapítani a fájdalmat! ("+e_name+" -"+stats.character_iq+" élet)<br>";
                e_life -= stats.character_iq;
                story.innerHTML += e_name + "-nek maradt " + e_life;
                refreshProfileStats();
            }else{
                story.innerHTML += "Ellenfeled sikeresen kikerül a csapásodat!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}

function tovabbkepzes() {
    stats.character_life -= 25;
    stats.character_iq += 50;
        refreshProfileStats();
    story.innerHTML += "A továbbképzésen szereztél 50 iq pontot!<br>";
}

function szabadsag() {
    stats.character_endurance += 50;
    refreshProfileStats();
    story.innerHTML += "Kitartóbb lettél a szabadságod alatt.<br>";
}