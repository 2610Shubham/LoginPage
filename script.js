
document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registration-form');
    const registrationSuccessMessage = document.getElementById('registration-success');
    const backToLoginLink = document.getElementById('back-to-login');
    const loginFormContainer = document.getElementById('login-form');
    const registrationFormContainer = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from actually submitting

        // Perform registration logic here (e.g., sending data to a server).
        // You can add an AJAX request to the server for registration.

        // After successful registration (you can simulate it), display the success message.
        registrationSuccessMessage.style.display = 'block';

        // Set a timer to hide the success message after a few seconds (e.g., 3 seconds).
        setTimeout(function () {
            registrationSuccessMessage.style.display = 'none';
        }, 3000); // 3000 milliseconds = 3 seconds

        // Optionally, you can clear the form fields or redirect the user to another page.
    });

    // Add an event listener to the "Go back to login" link.
    backToLoginLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginFormContainer.style.display = 'block'; // Show the login form container
        registrationFormContainer.style.display = 'none'; // Hide the registration form container
    });
});





const maxParticles = 2000;
const frequency = 10;
const initNum = maxParticles;
const maxTime = frequency * maxParticles;
let timeToRecreate = false;

// Enable repopulate
setTimeout(function () {
    timeToRecreate = true;
}, maxTime);

const tela = document.getElementById('particleCanvas');
tela.width = window.innerWidth;
tela.height = window.innerHeight;
const canvas = tela.getContext('2d');
const particles = [];

// Define rainbow colors, including green and yellow
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF', '#00FF00', '#FFFF00'];

let colorIndex = 0;

class Particle {
    constructor() {
        let random = Math.random();
        this.progress = 0;

        this.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        this.pointOfAttraction = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        if (Math.random() > 0.5) {
            this.x = window.innerWidth * Math.random();
            this.y = Math.random() > 0.5 ? -Math.random() - 100 : window.innerHeight + Math.random() + 100;
        } else {
            this.x = Math.random() > 0.5 ? -Math.random() - 100 : window.innerWidth + Math.random() + 100;
            this.y = window.innerHeight * Math.random();
        }

        this.s = Math.random() * 4;
        this.a = 0;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.radius = random > 0.2 ? Math.random() * 1 : Math.random() * 2;

        // Set the color based on the colorIndex
        this.color = rainbowColors[colorIndex];
        colorIndex = (colorIndex + 1) % rainbowColors.length;

        this.radius = random > 0.8 ? Math.random() * 2.2 : this.radius;
        this.color = random > 0.8 ? "#3CFBFF" : this.color;
    }

    calculateDistance(v1, v2) {
        let x = Math.abs(v1.x - v2.x);
        let y = Math.abs(v1.y - v2.y);
        return Math.sqrt(x * x + y * y);
    }

    render() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        canvas.lineWidth = 2;
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
    }

    move() {
        let p1 = { x: this.x, y: this.y };
        let distance = this.calculateDistance(p1, this.pointOfAttraction);
        let force = Math.max(200, 1 + distance);
        let attrX = (this.pointOfAttraction.x - this.x) / force;
        let attrY = (this.pointOfAttraction.y - this.y) / force;

        this.x += Math.cos(this.a) * this.s + attrX;
        this.y += Math.sin(this.a) * this.s + attrY;
        this.a += Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2;

        if (distance < 80 + Math.random() * 100) {
            return false;
        }

        this.render();
        this.progress++;
        return true;
    }
}

function popolate(num) {
    for (let i = 0; i < num; i++) {
        setTimeout(function (x) {
            return function () {
                particles.push(new Particle());
            };
        }(i), frequency * i);
    }
    return particles.length;
}

function clear() {
    canvas.globalAlpha = 0.08;
    canvas.fillStyle = '#110031';
    canvas.fillRect(0, 0, tela.width, tela.height);
    canvas.globalAlpha = 1;
}

function update() {
    particles.forEach(function (p, index, object) {
        if (!p.move()) {
            object.splice(index, 1);
        }
    });

    if (timeToRecreate) {
        if (particles.length < initNum) {
            popolate(1);
            console.log("Recreate");
        }
    }

    clear();
    requestAnimationFrame(update);
}

popolate(initNum);
update();















