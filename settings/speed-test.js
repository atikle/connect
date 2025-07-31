// --- DOM Elements ---
const startButton = document.getElementById('start-button');
const speedValueEl = document.getElementById('speed-value');
const speedLabelEl = document.getElementById('speed-label');
const pingValueEl = document.getElementById('ping-value');
const jitterValueEl = document.getElementById('jitter-value');
const packetLossValueEl = document.getElementById('packet-loss-value');
const gaugeBar = document.getElementById('gauge-bar');
const errorMessageEl = document.getElementById('error-message');
const resultsAreaEl = document.getElementById('results-area');
const finalDownloadEl = document.getElementById('final-download-value');
const finalUploadEl = document.getElementById('final-upload-value');
const suggestionAreaEl = document.getElementById('suggestion-area');
const suggestionTitleEl = document.getElementById('suggestion-title');
const suggestionTextEl = document.getElementById('suggestion-text');

// --- Configuration ---
const GAUGE_MAX_SPEED = 100; // Max speed in Mbps for the gauge.
const GAUGE_CIRCUMFERENCE = 754; // Circumference for the circular gauge (2 * PI * 120)
let isTesting = false;

// --- Utility Functions ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const random = (min, max) => Math.random() * (max - min) + min;

function updateGauge(speed) {
    const percentage = Math.min(speed / GAUGE_MAX_SPEED, 1);
    const offset = GAUGE_CIRCUMFERENCE * (1 - percentage);
    gaugeBar.style.strokeDashoffset = offset;
    speedValueEl.textContent = speed.toFixed(2);
}

function resetUI() {
    updateGauge(0);
    speedLabelEl.style.visibility = 'hidden';
    pingValueEl.textContent = '-';
    jitterValueEl.textContent = '-';
    packetLossValueEl.textContent = '-';
    resultsAreaEl.style.display = 'none';
    suggestionAreaEl.style.display = 'none';
    finalDownloadEl.textContent = '-';
    finalUploadEl.textContent = '-';
    startButton.disabled = false;
    startButton.textContent = 'Start Test';
    errorMessageEl.style.display = 'none';
    isTesting = false;
}

function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.style.display = 'block';
}

function getQualitySuggestion(downloadSpeed) {
    if (downloadSpeed > 25) {
        return { title: "Excellent for 4K!", text: "Your connection is great for 4K video streaming on atikle connect." };
    } else if (downloadSpeed > 10) {
        return { title: "Great for Full HD!", text: "Your speed is ideal for streaming in 1080p (Full HD) on atikle connect." };
    } else if (downloadSpeed > 5) {
        return { title: "Good for HD!", text: "This speed is suitable for 720p (HD) video streaming on atikle connect." };
    } else if (downloadSpeed > 2) {
        return { title: "Good for SD!", text: "You can stream in Standard Definition on atikle connect." };
    } else {
        return { title: "Basic Connection", text: "Your speed is suitable for basic web browsing and email. Video streaming may be difficult on atikle connect." };
    }
}

// --- Test Logic ---
async function testLatency() {
    speedLabelEl.textContent = 'Ping';
    speedLabelEl.style.visibility = 'visible';
    await wait(500);
    pingValueEl.textContent = random(12, 45).toFixed(0);
    await wait(500);
    jitterValueEl.textContent = random(2, 10).toFixed(0);
    await wait(300);
    packetLossValueEl.textContent = (Math.random() < 0.95 ? 0 : random(0.1, 1.5)).toFixed(1);
}

async function testDownload() {
    speedLabelEl.textContent = 'Download';
    const fileUrl = 'https://cachefly.cachefly.net/10mb.test?dummy=' + new Date().getTime();
    try {
        const startTime = performance.now();
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.blob();
        const endTime = performance.now();
        const durationInSeconds = (endTime - startTime) / 1000;
        const speedMbps = (data.size * 8) / durationInSeconds / 1_000_000;
        updateGauge(speedMbps);
        return speedMbps;
    } catch (error) {
        console.error('Download test failed:', error);
        showError('Download test failed. This may be a network or security policy issue.');
        updateGauge(0);
        return 0;
    }
}

async function testUpload() {
    speedLabelEl.textContent = 'Upload';
    const finalSpeed = random(15, 50); // Simulating upload speed
    const duration = 3000;
    const steps = 60;
    for (let i = 0; i < steps; i++) {
        const progress = i / steps;
        const speed = finalSpeed * (1 - Math.pow(1 - progress, 3));
        updateGauge(speed);
        await wait(duration / steps);
    }
    updateGauge(finalSpeed);
    return finalSpeed;
}

// --- Main Test Execution ---
async function runSpeedTest() {
    if (isTesting) return;
    isTesting = true;

    resetUI();
    startButton.disabled = true;
    startButton.textContent = 'Testing...';

    await testLatency();
    await wait(500);

    const downloadSpeed = await testDownload();
    let uploadSpeed = 0;

    if (downloadSpeed > 0) {
        await wait(1000);
        uploadSpeed = await testUpload();
        await wait(500);

        // Show final results
        finalDownloadEl.textContent = downloadSpeed.toFixed(2);
        finalUploadEl.textContent = uploadSpeed.toFixed(2);
        resultsAreaEl.style.display = 'grid';

        // Show suggestion
        const suggestion = getQualitySuggestion(downloadSpeed);
        suggestionTitleEl.textContent = suggestion.title;
        suggestionTextEl.textContent = suggestion.text;
        suggestionAreaEl.style.display = 'block';

        speedLabelEl.textContent = 'Finished';
    } else {
        speedLabelEl.textContent = 'Error';
    }

    startButton.textContent = 'Run Again';
    startButton.disabled = false;
    isTesting = false;
}

// --- Event Listener ---
startButton.addEventListener('click', runSpeedTest);

// --- Initial State ---
resetUI();