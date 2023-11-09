const soundProfiles = {
    rogue: {
        folder: "rogue",
        buttonSound: "Rogue-selected.ogg",
        soundFiles: [
            { fileName: "Cheap Shot.ogg", keyBind: "1" },
            { fileName: "Cloak Of Shadows.ogg", keyBind: "2" },
            { fileName: "Gouge.ogg", keyBind: "3" },
            { fileName: "Kick.ogg", keyBind: "4" },
            { fileName: "Kidney.ogg", keyBind: "5" },
            { fileName: "Shadow Dance.ogg", keyBind: "6" },
        ]
    },
    mage: {
        folder: "mage",
        buttonSound: "Mage-selected.ogg",
        soundFiles: [
            { fileName: "Alter Time.ogg", keyBind: "1" },
            { fileName: "Arcane Surge.ogg", keyBind: "2" },
            { fileName: "Combustion.ogg", keyBind: "3" },
            { fileName: "Counterspell.ogg", keyBind: "4" },
            { fileName: "Glacial Spike.ogg", keyBind: "5" },
            { fileName: "Icy Veins.ogg", keyBind: "6" }, 
        ]
    },
    priest: {
        folder: "priest",
        buttonSound: "Priest-selected.ogg",
        soundFiles: [
            { fileName: "Apotheosis.ogg", keyBind: "1" },
            { fileName: "Chastise.ogg", keyBind: "2" },
            { fileName: "Guardian Spirit.ogg", keyBind: "3" },
            { fileName: "Power Infusion.ogg", keyBind: "4" },
            { fileName: "Ray Of Hope.ogg", keyBind: "5" },
            { fileName: "Void Shift.ogg", keyBind: "6" },
        ]
    },
};


let activeProfile = null;

const loadSoundsForClass = (classKey) => {
    const soundsContainer = document.getElementById("soundsContainer");
    clearElementChildren(soundsContainer);

    const profile = soundProfiles[classKey];
    profile.soundFiles.forEach(sound => {
        const button = document.createElement("button");
        button.className = "sound-button";
        button.textContent = `${sound.fileName.split('.')[0]} - ${sound.keyBind}`;
        button.dataset.keybind = sound.keyBind;

        const audio = new Audio(`${profile.folder}/${sound.fileName}`);
        button.addEventListener("click", () => {
            audio.play();
            toggleActiveClass(button);
        });

        soundsContainer.appendChild(button);
    });

    activeProfile = classKey;
};

const playSoundByKey = (key) => {
    if (activeProfile) {
        const soundFile = soundProfiles[activeProfile].soundFiles.find(sound => sound.keyBind === key);
        if (soundFile) {
            const audio = new Audio(`${soundProfiles[activeProfile].folder}/${soundFile.fileName}`);
            audio.play();
            const buttons = document.querySelectorAll(`.sound-button[data-keybind="${soundFile.keyBind}"]`);
            buttons.forEach(button => {
                toggleActiveClass(button);
            });
        }
    }
};

document.addEventListener("keydown", (event) => {
    playSoundByKey(event.key);
});

const classButtons = ["rogue", "mage", "priest"];

classButtons.forEach(classKey => {
    const button = document.getElementById(`${classKey}Button`);
    button.addEventListener("click", () => {
    const soundPath = `${soundProfiles[classKey].folder}/${soundProfiles[classKey].buttonSound}`;
    const audio = new Audio(soundPath);
    audio.play();

    loadSoundsForClass(classKey);
    });
});


const clearElementChildren = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const toggleActiveClass = (button) => {
    button.classList.add("sound-button-active");
    setTimeout(() => {
        button.classList.remove("sound-button-active");
    }, 200);
};


