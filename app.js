// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed navbar
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
  '.section-header, .about-content, .timeline-item, .skill-category, .project-card, .experience-card, .achievement-card, .contact-container'
);

animatedElements.forEach(el => observer.observe(el));

// Projects Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.5s ease-out';
      } else {
        const category = card.getAttribute('data-category');
        if (category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// Animated counter for achievements
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Trigger counter animation when achievement cards are visible
const achievementNumbers = document.querySelectorAll('.achievement-number');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      achievementNumbers.forEach(number => {
        const text = number.textContent;
        const value = parseInt(text.replace('+', ''));
        number.textContent = '0+';
        animateCounter(number, value);
      });
    }
  });
}, { threshold: 0.5 });

if (achievementNumbers.length > 0) {
  counterObserver.observe(achievementNumbers[0].closest('.achievements-grid'));
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:sendtopriyank0302@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client will open to send the message.');
    contactForm.reset();
  });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const techCircles = document.querySelectorAll('.tech-circle');
    techCircles.forEach((circle, index) => {
      const speed = 0.5 + (index * 0.2);
      circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Add typing effect to hero text
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
  const text = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  let index = 0;
  
  function typeText() {
    if (index < text.length) {
      heroTitle.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeText, 50);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeText, 500);
}

// Skill bar animations
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillBars.forEach(bar => {
        bar.style.animation = 'fillBar 1.5s ease-out forwards';
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Add hover effect to project cards
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-10px)';
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});