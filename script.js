const cbutton = document.getElementById('colorButton');
const cname = document.getElementById('colorName');
const partyAudio = document.getElementById('partyaudio');
const buttonAudio = document.getElementById('buttonaudio');
const copyAudio = document.getElementById('copyaudio');

let hexColor = '#e0e0e0';
let hexColor2 = '#e0e0e0';
let pColor = 'black';
let lastTrailTime = 0;
const trailDelay = 1;
let clickCount = 0;
let lastClickTime = 0;
let timer = 400;


function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.width = `${Math.random() * 12 + 8}px`;
    particle.style.height = particle.style.width;
    document.body.appendChild(particle);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const red1 = Math.floor(Math.random()*256);
    const green1 = Math.floor(Math.random()*256);
    const blue1 = Math.floor(Math.random()*256);
    pColor = `rgb(${red1}, ${green1}, ${blue1})`;

    particle.style.backgroundColor = pColor;
    setTimeout(() => particle.remove(), 1000);
}

cbutton.addEventListener('click', function(){
    buttonAudio.currentTime = 0;
    buttonAudio.play();
    let currentClickTime = Date.now();
    if (currentClickTime - lastClickTime <= timer) {
        clickCount++;
        if (clickCount >= 5) {
            document.body.style.transition = 'background-color 0.1s';
            cbutton.style.transition = 'background-color 0.1s';
            let surprise = setInterval(() => {
                let r = Math.floor(Math.random()*256);
                let g = Math.floor(Math.random()*256);
                let b = Math.floor(Math.random()*256);
                document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                cbutton.style.backgroundColor = `rgb(${255-r}, ${255-g}, ${255-b})`;
                hhh.style.color = `rgb(${255-r}, ${255-g}, ${255-b})`;
                cname.textContent = 'Surprise!';
                cbutton.textContent = 'Party Time!';
                partyAudio.play();
                cbutton.disabled = true;
                cname.disabled = true;
                let xc1 = Math.random() * window.innerWidth;
                let yc1 = Math.random() * window.innerHeight;
                let xc2 = Math.random() * window.innerWidth;
                let yc2 = Math.random() * window.innerHeight;
                let xc3 = Math.random() * window.innerWidth;
                let yc3 = Math.random() * window.innerHeight;
                let xc4 = Math.random() * window.innerWidth;
                let yc4 = Math.random() * window.innerHeight;
                let xc5 = Math.random() * window.innerWidth;
                let yc5 = Math.random() * window.innerHeight;
                for (let i = 0; i < 15; i++) {
                    createParticle(xc1 + Math.random() * 50 - 25, yc1 + Math.random() * 50 - 25);
                    createParticle(xc2 + Math.random() * 50 - 25, yc2 + Math.random() * 50 - 25);
                    createParticle(xc3 + Math.random() * 50 - 25, yc3 + Math.random() * 50 - 25);
                    createParticle(xc4 + Math.random() * 50 - 25, yc4 + Math.random() * 50 - 25);
                    createParticle(xc5 + Math.random() * 50 - 25, yc5 + Math.random() * 50 - 25);
                }
            }, 100);
            setTimeout(() => {
                clearInterval(surprise);
                cbutton.disabled = false;
                cname.disabled = false;
                partyAudio.pause();
                partyAudio.currentTime = 0;
                cbutton.textContent = 'Change Color';
                document.body.style.transition = 'background-color 0.6s';
                cbutton.style.transition = 'background-color 0.6s, transform 0.2s';
                document.body.style.backgroundColor = hexColor;
                cbutton.style.backgroundColor = hexColor2;
                hhh.style.color = hexColor2;
                cname.textContent = `Hex: ${hexColor}`;
            }, 5000);
            clickCount = 0;
        } 
    } else {
        clickCount = 1;
    }
    lastClickTime = currentClickTime;
    
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);

    const rhex = red.toString(16).padStart(2, '0');
    const ghex = green.toString(16).padStart(2, '0');
    const bhex = blue.toString(16).padStart(2, '0');
    hexColor = `#${rhex}${ghex}${bhex}`;

    const redinv = 255 - red;
    const greeninv = 255 - green;
    const blueinv = 255 - blue;
    const rhexinv = redinv.toString(16).padStart(2, '0');
    const ghexinv = greeninv.toString(16).padStart(2, '0');
    const bhexinv = blueinv.toString(16).padStart(2, '0');
    hexColor2 = `#${rhexinv}${ghexinv}${bhexinv}`;

    document.body.style.backgroundColor = hexColor;
    cbutton.style.backgroundColor = hexColor2;
    hhh.style.color = hexColor2;

    cname.classList.add('fade');
    setTimeout(() => {
        cname.classList.remove('fade');
        cname.textContent = `Hex: ${hexColor}`;
    }, 200);
});

cname.addEventListener('click', function() {
    navigator.clipboard.writeText(hexColor).then(() => {
        cname.textContent = 'Copied!';
        copyAudio.currentTime = 0;
        copyAudio.play();
        setTimeout(() => {
            cname.textContent = `Hex: ${hexColor}`;
        }, 1000);
    });
});

document.body.addEventListener('click', function(e) {
    for (let i = 0; i < 15; i++) {
        createParticle(e.clientX + Math.random() * 50 - 30, e.clientY + Math.random() * 50 - 10);
    }
});

document.body.addEventListener('mousemove', function(e) {
    const currentTime = Date.now();
    if (currentTime - lastTrailTime > trailDelay) {
        createParticle(e.clientX, e.clientY);
        lastTrailTime = currentTime;
    }
});

