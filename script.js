// ==================== IMAGE EDITOR ====================
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const brightnessSlider = document.getElementById('brightnessSlider');
const contrastSlider = document.getElementById('contrastSlider');
const saturateSlider = document.getElementById('saturateSlider');
const downloadImage = document.getElementById('downloadImage');
const resetImage = document.getElementById('resetImage');

let imageCanvas = null;
let imageCtx = null;

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                imageCanvas = document.createElement('canvas');
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                imageCtx = imageCanvas.getContext('2d');
                imageCtx.drawImage(img, 0, 0);
                
                imagePreview.innerHTML = '';
                imagePreview.appendChild(imageCanvas);
                updateImageFilters();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function updateImageFilters() {
    if (!imageCanvas || !imageCtx) return;
    
    const brightness = brightnessSlider.value;
    const contrast = contrastSlider.value;
    const saturate = saturateSlider.value;
    
    imageCanvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
}

brightnessSlider.addEventListener('input', updateImageFilters);
contrastSlider.addEventListener('input', updateImageFilters);
saturateSlider.addEventListener('input', updateImageFilters);

downloadImage.addEventListener('click', () => {
    if (!imageCanvas) {
        alert('Please upload an image first!');
        return;
    }
    const link = document.createElement('a');
    link.href = imageCanvas.toDataURL();
    link.download = 'edited-image.png';
    link.click();
});

resetImage.addEventListener('click', () => {
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    saturateSlider.value = 100;
    updateImageFilters();
});

// ==================== VIDEO EDITOR ====================
const videoInput = document.getElementById('videoInput');
const videoPlayer = document.getElementById('videoPlayer');
const videoSpeed = document.getElementById('videoSpeed');
const playVideo = document.getElementById('playVideo');
const pauseVideo = document.getElementById('pauseVideo');
const downloadVideo = document.getElementById('downloadVideo');

videoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        videoPlayer.src = url;
    }
});

playVideo.addEventListener('click', () => {
    if (videoPlayer.src) {
        videoPlayer.play();
    } else {
        alert('Please upload a video first!');
    }
});

pauseVideo.addEventListener('click', () => {
    videoPlayer.pause();
});

videoSpeed.addEventListener('input', () => {
    const speed = parseFloat(videoSpeed.value) || 1.0;
    videoPlayer.playbackRate = speed;
});

downloadVideo.addEventListener('click', () => {
    if (!videoPlayer.src) {
        alert('Please upload a video first!');
        return;
    }
    const link = document.createElement('a');
    link.href = videoPlayer.src;
    link.download = 'edited-video.mp4';
    link.click();
});

// ==================== AUDIO EDITOR ====================
const audioInput = document.getElementById('audioInput');
const audioPlayer = document.getElementById('audioPlayer');
const volumeSlider = document.getElementById('volumeSlider');
const playAudio = document.getElementById('playAudio');
const pauseAudio = document.getElementById('pauseAudio');
const downloadAudio = document.getElementById('downloadAudio');

audioInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
    }
});

playAudio.addEventListener('click', () => {
    if (audioPlayer.src) {
        audioPlayer.play();
    } else {
        alert('Please upload an audio file first!');
    }
});

pauseAudio.addEventListener('click', () => {
    audioPlayer.pause();
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

downloadAudio.addEventListener('click', () => {
    if (!audioPlayer.src) {
        alert('Please upload an audio file first!');
        return;
    }
    const link = document.createElement('a');
    link.href = audioPlayer.src;
    link.download = 'edited-audio.mp3';
    link.click();
});

// ==================== TEXT EDITOR ====================
const textInput = document.getElementById('textInput');
const textPreview = document.getElementById('textPreview');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const colorPicker = document.getElementById('colorPicker');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const copyText = document.getElementById('copyText');
const downloadText = document.getElementById('downloadText');
const clearText = document.getElementById('clearText');

let textStyles = {
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    fontSize: 16
};

function updateTextPreview() {
    let style = '';
    
    if (textStyles.bold) style += 'font-weight: bold; ';
    if (textStyles.italic) style += 'font-style: italic; ';
    if (textStyles.underline) style += 'text-decoration: underline; ';
    
    style += `color: ${textStyles.color}; `;
    style += `font-size: ${textStyles.fontSize}px; `;
    
    textPreview.style.cssText = style;
    textPreview.textContent = textInput.value || 'Preview will appear here';
}

boldBtn.addEventListener('click', () => {
    textStyles.bold = !textStyles.bold;
    boldBtn.style.opacity = textStyles.bold ? '1' : '0.5';
    updateTextPreview();
});

italicBtn.addEventListener('click', () => {
    textStyles.italic = !textStyles.italic;
    italicBtn.style.opacity = textStyles.italic ? '1' : '0.5';
    updateTextPreview();
});

underlineBtn.addEventListener('click', () => {
    textStyles.underline = !textStyles.underline;
    underlineBtn.style.opacity = textStyles.underline ? '1' : '0.5';
    updateTextPreview();
});

colorPicker.addEventListener('input', (e) => {
    textStyles.color = e.target.value;
    updateTextPreview();
});

fontSizeSelect.addEventListener('change', (e) => {
    textStyles.fontSize = parseInt(e.target.value);
    updateTextPreview();
});

textInput.addEventListener('input', updateTextPreview);

copyText.addEventListener('click', () => {
    if (!textInput.value) {
        alert('Please type some text first!');
        return;
    }
    navigator.clipboard.writeText(textInput.value).then(() => {
        alert('Text copied to clipboard! ✅');
    }).catch(() => {
        alert('Failed to copy text!');
    });
});

downloadText.addEventListener('click', () => {
    if (!textInput.value) {
        alert('Please type some text first!');
        return;
    }
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textInput.value));
    element.setAttribute('download', 'edited-text.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

clearText.addEventListener('click', () => {
    textInput.value = '';
    textStyles = {
        bold: false,
        italic: false,
        underline: false,
        color: '#000000',
        fontSize: 16
    };
    boldBtn.style.opacity = '0.5';
    italicBtn.style.opacity = '0.5';
    underlineBtn.style.opacity = '0.5';
    fontSizeSelect.value = 16;
    colorPicker.value = '#000000';
    updateTextPreview();
});

// ==================== TAB NAVIGATION ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// ==================== INITIAL SETUP ====================
document.addEventListener('DOMContentLoaded', () => {
    colorPicker.value = '#000000';
    fontSizeSelect.value = 16;
    boldBtn.style.opacity = '0.5';
    italicBtn.style.opacity = '0.5';
    underlineBtn.style.opacity = '0.5';
});
