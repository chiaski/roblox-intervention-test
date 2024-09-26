function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

let possibleCharsList = [
    ["♪"],
    ["+", "·", "."], 
    ["♪", "·", "✿"], 
    ["*", "#", "@"],
    ["▲", "●", "■"],
    ["♫","⋆", "｡", "♪","₊","˚","♬",".", "𝄞"],
    [" "],
];

let currentCharIndex = 0;
let possibleChars = possibleCharsList[currentCharIndex];


class Oscilloscope {
    constructor(audioContext, sourceNode) {
        this.audioContext = audioContext;
        this.analyserNode = this.audioContext.createAnalyser();
        this.sourceNode = sourceNode;
        this.textContainer = null;
        this.animationFrameId = null;
        this.frameInterval = 4;
        this.frameCounter = 0;
    }

    initialize(containerId) {
        this.textContainer = document.getElementById(containerId);

        // Configure the analyser node
        this.analyserNode.fftSize = 2048;
        this.bufferLength = this.analyserNode.fftSize;
        this.dataArray = new Uint8Array(this.bufferLength);

        // Connect the source node to the analyser node
        this.sourceNode.connect(this.analyserNode);

        // Start the oscilloscope drawing
        this.draw();
    }

    draw() {
        this.animationFrameId = requestAnimationFrame(this.draw.bind(this));

        // Skip frames to slow down the visualization
        this.frameCounter++;
        if (this.frameCounter % this.frameInterval !== 0) {
            return;
        }

        // Get the waveform data
        this.analyserNode.getByteTimeDomainData(this.dataArray);

        // Clear the text container
        this.textContainer.textContent = '';

        const rowCount = 40; // Number of rows in the ASCII display
        const colCount = 60; // Number of columns in the ASCII display
        const sliceWidth = Math.floor(this.bufferLength / colCount);

        let waveform = Array(rowCount).fill('').map(() => Array(colCount).fill(' '));

        for (let i = 0; i < colCount; i++) {
            const v = this.dataArray[i * sliceWidth] / 128.0;
            const y = Math.floor((v * rowCount) / 2);
          

             waveform[y] = waveform[y].map((char, index) => (index === i ? pick(possibleChars) : char));
    
        }

        // Render the ASCII waveform
        waveform.forEach(row => {
            this.textContainer.textContent += row.join('') + '\n';
        });
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.analyserNode.disconnect();
    }
}



document.addEventListener('keydown', (event) => {
    if (event.key === '9') {
        // Move forward through the character sets
        currentCharIndex = (currentCharIndex + 1) % possibleCharsList.length;
        possibleChars = possibleCharsList[currentCharIndex];
    } else if (event.key === '0') {
        // Move backward through the character sets
        currentCharIndex = (currentCharIndex - 1 + possibleCharsList.length) % possibleCharsList.length;
        possibleChars = possibleCharsList[currentCharIndex];
    }
});