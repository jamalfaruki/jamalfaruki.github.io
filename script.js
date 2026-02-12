// ==================== TYPEWRITER ====================
const typewriter = document.querySelector(".typewriter-text");

const phrases = [
  "B.Tech CSE Final Year",
  "AI Enthusiast",
  "ML Developer",
  "Data Explorer",
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typewriter) return;

  if (index >= phrases.length) index = 0;
  const current = phrases[index];

  if (!isDeleting) {
    typewriter.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typewriter.textContent = current.substring(0, charIndex--);
    if (charIndex <= 0) {
      isDeleting = false;
      index++;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ==================== CANVAS PARTICLES ====================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 45 : 110;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = isMobile ? 2 : 2.5;
      this.dx = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.7);
      this.dy = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.7);
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "#00ff88";
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 6;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = isMobile ? 90 : 150;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,255,136,${1 - dist / maxDist})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();

  // Resize optimization
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }, 200);
  });
}

// ==================== PROGRESS BARS ====================
const progressBars = document.querySelectorAll(".progress-bar");

function animateBars() {
  progressBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();

    if (rect.top < window.innerHeight - 80) {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    }
  });
}

window.addEventListener("scroll", animateBars);
window.addEventListener("load", animateBars);

// ==================== PROJECT IFRAME MODAL ====================
const iframeModal = document.getElementById("iframeModal");
const projectFrame = document.getElementById("projectFrame");

function openProject(url) {
  if (!iframeModal || !projectFrame) return;

  projectFrame.src = url;
  iframeModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeProject() {
  if (!iframeModal || !projectFrame) return;

  iframeModal.style.display = "none";
  projectFrame.src = "";
  document.body.style.overflow = "auto";
}

iframeModal?.addEventListener("click", (e) => {
  if (e.target === iframeModal) closeProject();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProject();
});
