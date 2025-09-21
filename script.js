// ==================== SPEAK BUTTON ====================
// document.getElementById('speakBtn').addEventListener('click', () => {
//   const msg = new SpeechSynthesisUtterance(
//     "Hello! I'm Jamal Ahmad, a final-year Computer Science student passionate about Artificial Intelligence and Machine Learning. Welcome to my portfolio!"
//   );
//   speechSynthesis.speak(msg);
// });

// ==================== TYPEWRITER ====================
const typewriter = document.querySelector('.typewriter-text');
const phrases = ["B.Tech CSE Final Year", "AI Enthusiast", "ML Developer", "Data Explorer"];
let index = 0, charIndex = 0, isDeleting = false;

function type() {
  if(index >= phrases.length) index = 0;
  let current = phrases[index];
  if(!isDeleting){
    typewriter.textContent = current.substring(0, charIndex++);
    if(charIndex > current.length){ 
      isDeleting = true; 
      setTimeout(type, 1200); 
      return; 
    }
  } else {
    typewriter.textContent = current.substring(0, charIndex--);
    if(charIndex === 0){ 
      isDeleting = false; 
      index++; 
    }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ==================== THEME TOGGLE ====================
function toggleTheme(){ 
  document.body.classList.toggle('light-mode'); 
}

// ==================== CANVAS PARTICLES ====================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;
let particles = [];

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.radius = 2.5;
    this.dx = (Math.random()-0.5)*0.6;
    this.dy = (Math.random()-0.5)*0.6;
  }
  update(){ 
    this.x += this.dx; 
    this.y += this.dy; 
    if(this.x < 0 || this.x > canvas.width) this.dx *= -1; 
    if(this.y < 0 || this.y > canvas.height) this.dy *= -1; 
  }
  draw(){ 
    ctx.beginPath(); 
    ctx.fillStyle = '#00ff88'; 
    ctx.shadowColor = '#00ff88'; 
    ctx.shadowBlur = 6; 
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); 
    ctx.fill(); 
    ctx.shadowBlur = 0; 
  }
}
function initParticles(num){ 
  particles=[]; 
  for(let i=0;i<num;i++) particles.push(new Particle()); 
}
function connectParticles(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x - particles[j].x;
      const dy=particles[i].y - particles[j].y;
      const dist=Math.sqrt(dx*dx + dy*dy);
      if(dist < 150){ 
        ctx.beginPath(); 
        ctx.strokeStyle=`rgba(0,255,136,${1 - dist/150})`; 
        ctx.lineWidth=1; 
        ctx.moveTo(particles[i].x, particles[i].y); 
        ctx.lineTo(particles[j].x, particles[j].y); 
        ctx.stroke(); 
      }
    }
  }
}
function animate(){ 
  ctx.clearRect(0,0,canvas.width,canvas.height); 
  particles.forEach(p=>{p.update(); p.draw();}); 
  connectParticles(); 
  requestAnimationFrame(animate); 
}
initParticles(100); 
animate();
window.addEventListener('resize', ()=>{ 
  canvas.width=window.innerWidth; 
  canvas.height=window.innerHeight; 
  initParticles(100); 
});

// ==================== SKILLS CHART ====================
// const ctxChart = document.getElementById('skillsChart');
// if(ctxChart){
//   new Chart(ctxChart, {
//     type: 'radar',
//     data: {
//       labels: ['Python', 'Machine Learning', 'Data Analysis', 'Java'],
//       datasets: [{
//         label: 'Skill Level',
//         data: [90, 85, 80, 75],
//         backgroundColor: 'rgba(0, 255, 204, 0.2)',
//         borderColor: '#00ffcc',
//         pointBackgroundColor: '#00ccff'
//       }]
//     },
//     options: {
//       scales: {
//         r: {
//           angleLines: { color: '#444' },
//           grid: { color: '#555' },
//           ticks: { color: '#00ffcc', backdropColor: 'transparent' },
//           pointLabels: { color: '#00ffcc' }
//         }
//       }
//     }
//   });
// }

// ==================== PROGRESS BARS ON SCROLL ====================
const progressBars = document.querySelectorAll('.progress-bar');

function animateBars() {
  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      bar.style.width = bar.getAttribute('style').match(/width:\s*([^;]+)/)[1];
    }
  });
}
window.addEventListener('scroll', animateBars);
animateBars(); // trigger on load

// ==================== CERTIFICATES CAROUSEL ====================
const carouselTrack = document.querySelector('.carousel-track');
if(carouselTrack){
  let scrollAmount = 0;
  setInterval(() => {
    scrollAmount -= 1;
    if(Math.abs(scrollAmount) > carouselTrack.scrollWidth/2){
      scrollAmount = 0;
    }
    carouselTrack.style.transform = `translateX(${scrollAmount}px)`;
  }, 30);
}
