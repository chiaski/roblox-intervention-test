class MidiController {
    constructor(sliderCount = 16, onSliderChange = null, onAudioChange = null) {
        this.midiOutput = null;
        this.sliderCount = sliderCount;
        this.sliders = [];
        this.onSliderChange = onSliderChange; // Callback for sine waves
        this.onAudioChange = onAudioChange;   // Callback for audio files
        this.controlMode = 'sineWave'; // Default control mode
        this.audioElements = [];
        this.isPlaying = [];
        this.knobStates = new Array(sliderCount).fill(0); // Track knob states independently
    }

    async initialize(soundFiles) {
        try {
            const midiAccess = await navigator.requestMIDIAccess();
            this.onMIDISuccess(midiAccess, soundFiles);
            this.resetMidiControllerValues();
        } catch (error) {
            this.onMIDIFailure();
        }

        // Key press listener for switching modes and stopping all audio
        document.addEventListener('keydown', (e) => {
            if (e.key === 'z') {
                this.controlMode = 'sineWave';
                this.updateLightsForCurrentMode(); // Reapply light states for sine wave mode
                console.log('Switched to sine wave control mode');
            } else if (e.key === 'x') {
                this.controlMode = 'audioFile';
                this.updateLightsForCurrentMode(); // Reapply light states for audio file mode
                console.log('Switched to audio file control mode');
            } else if (e.key === 'c') {
                this.stopAllAudio();
                console.log('Stopped all audio');
            }
        });
    }

    onMIDISuccess(midiAccess, soundFiles) {
        console.log("MIDI ready!");

        const outputs = Array.from(midiAccess.outputs.values());
        if (outputs.length > 0) {
            this.midiOutput = outputs[0];
        }

        midiAccess.inputs.forEach(input => {
            input.onmidimessage = this.handleMIDIMessage.bind(this);
        });

        // Initialize audio elements for each knob
        for (let i = 0; i < this.sliderCount; i++) {
            const audio = new Audio(soundFiles[i]);
            audio.preload = 'auto'; // Ensure the audio is preloaded
            audio.load(); // Preload audio
            audio.volume = 0; // Start at 0 volume
            audio.loop = true; // Auto-loop the audio

            this.audioElements.push(audio);
            this.isPlaying.push(false); // Initially, audio is not playing
        }
    }

    handleMIDIMessage(message) {
        const data = message.data;
        const command = data[0];
        const note = data[1];
        const velocity = data[2];

        // Check mode and route control appropriately
        if (this.controlMode === 'sineWave') {
            this.onSliderChange(note, velocity); // Sine wave volume
        } else if (this.controlMode === 'audioFile') {
            if (command >= 176 && command <= 191) { // MIDI Control Change message
                this.updateAudioPlayback(note, velocity / 127); // Adjust audio volume
            }
        }
        this.knobStates[note] = velocity / 127; // Update knob state
        this.updateKnobLight(note, this.knobStates[note]); // Update light based on knob's volume
    }

    updateAudioPlayback(sliderIndex, volume) {
        const audio = this.audioElements[sliderIndex];
        if (!audio) {
            console.error(`No audio file associated with slider index: ${sliderIndex}`);
            return;
        }

        audio.volume = volume; // Set the volume based on the MIDI knob

        if (volume > 0 && !this.isPlaying[sliderIndex]) {
            // If volume is non-zero and the audio is not playing, start it
            audio.currentTime = 0; // Restart from the beginning
            audio.play().catch((error) => {
                console.error(`Error playing audio file: ${error}`);
            });
            this.isPlaying[sliderIndex] = true;
        } else if (volume === 0 && this.isPlaying[sliderIndex]) {
            // If the volume is 0, pause the audio and reset its state
            audio.pause();
            this.isPlaying[sliderIndex] = false;
        }
    }

    updateKnobLight(index, value) {
        if (this.midiOutput) {
            const status = 0xB0; // Control Change message
            const lightValue = Math.floor(value * 127); // Convert volume to light value (0-127)
            this.midiOutput.send([status, index, lightValue]);
        }
    }

    updateLightsForCurrentMode() {
        // Reapply lights based on the current knob states and control mode
        for (let i = 0; i < this.sliderCount; i++) {
            if (this.controlMode === 'audioFile') {
                // Apply light based on knob state for audio mode
                this.updateKnobLight(i, this.knobStates[i]);
            } else if (this.controlMode === 'sineWave') {
                // Apply light based on some default or sine wave state if needed
                this.updateKnobLight(i, 0); // Default or sine wave state if needed
            }
        }
    }

    stopAllAudio() {
        // Loop through all audio elements and stop them
        for (let i = 0; i < this.audioElements.length; i++) {
            const audio = this.audioElements[i];
            audio.volume = 0; // Set volume to 0
            audio.pause(); // Pause the audio
            this.isPlaying[i] = false; // Mark audio as stopped
        }
    }

    resetMidiControllerValues() {
        if (this.midiOutput) {
            for (let i = 0; i < this.sliderCount; i++) {
                const status = 0xB0;
                const value = 0;
                this.midiOutput.send([status, i, value]);
            }
        }
    }

    onMIDIFailure() {
        console.log("Could not access your MIDI devices.");
    }
}
