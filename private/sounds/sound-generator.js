class SoundGenerator {
    constructor(sliderCount = 16) {
        this.audioContext = null; // Delay creation until user interaction
        this.oscillators = [];
        this.gainNodes = [];
        this.pannerNodes = [];
        this.sliderCount = sliderCount;
//        this.baseFrequency = 440; // A4 pitch (440 Hz)
        this.baseFrequency = 220; // A4 pitch (440 Hz)
        this.pentatonicRatios = [1, 9/8, 5/4, 3/2, 5/3]; // Ratios for pentatonic scale

        // Create a synthetic reverb using delay
        this.delayNode = null;
        this.feedbackGainNode = null;
        this.filterNode = null;
    }

    initialize() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.createSyntheticReverb();

        const masterGain = this.audioContext.createGain();
        masterGain.gain.setValueAtTime(0.5, this.audioContext.currentTime); // Set master gain to 50%

        this.filterNode.connect(masterGain);
        masterGain.connect(this.audioContext.destination);

        for (let i = 0; i < this.sliderCount; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const pannerNode = this.audioContext.createStereoPanner();

            const frequency = this.calculateFrequency(i);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            
            // Pan oscillators from left (-1) to right (+1)
            pannerNode.pan.setValueAtTime((i / (this.sliderCount - 1)) * 2 - 1, this.audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(pannerNode);
            pannerNode.connect(this.delayNode); // Connect to delay/reverb
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Start with volume at 0
            oscillator.start();
            
            this.oscillators.push(oscillator);
            this.gainNodes.push(gainNode);
            this.pannerNodes.push(pannerNode);
        }
    }

    createSyntheticReverb() {
        // Create a delay node for the reverb effect
        this.delayNode = this.audioContext.createDelay();
        this.delayNode.delayTime.setValueAtTime(0.3, this.audioContext.currentTime); // 300ms delay time

        // Create a gain node for feedback
        this.feedbackGainNode = this.audioContext.createGain();
        this.feedbackGainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime); // Feedback gain

        // Create a low-pass filter to simulate reverb damping
        this.filterNode = this.audioContext.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(2500, this.audioContext.currentTime); // Low-pass filter frequency

        // Connect nodes to form the reverb chain
        this.delayNode.connect(this.feedbackGainNode);
        this.feedbackGainNode.connect(this.filterNode);
        this.feedbackGainNode.connect(this.delayNode); // Feedback loop

        // The filter node's output is the reverb output
    }

    calculateFrequency(index) {
        const octaveOffset = Math.floor(index / this.pentatonicRatios.length);
        const scaleIndex = index % this.pentatonicRatios.length;
        return this.baseFrequency * this.pentatonicRatios[scaleIndex] * Math.pow(2, octaveOffset);
    }

    setVolume(oscillatorIndex, value) {
        if (oscillatorIndex >= 0 && oscillatorIndex < this.sliderCount) {
            const gainValue = value / 127; // Convert MIDI value (0-127) to a gain value (0-1)
            this.gainNodes[oscillatorIndex].gain.setValueAtTime(gainValue, this.audioContext.currentTime);
        }
    }
}
