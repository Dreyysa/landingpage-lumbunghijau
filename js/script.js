// Custom JavaScript for Lumbung Hijau

// Import AOS and bootstrap
const AOS = window.AOS
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    } else {
      navbar.classList.remove("shadow")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)"
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero-section")
  const phoneContainer = document.querySelector(".phone-mockup-container")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    if (phoneContainer) {
      phoneContainer.style.transform = `translateY(${rate * 0.1}px)`
    }
  })

  // Add loading animation to cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded")
      }
    })
  }, observerOptions)

  // Observe all cards
  document.querySelectorAll(".card, .solution-item").forEach((card) => {
    card.classList.add("loading")
    observer.observe(card)
  })

  // Button hover effects
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add ripple effect to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Counter animation for statistics (if needed)
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      element.textContent = Math.floor(start)

      if (start >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }

  // Mobile menu close on link click
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Add floating animation to hero elements
  const floatingElements = document.querySelectorAll(".phone-mockup, .hero-content")

  floatingElements.forEach((element, index) => {
    element.style.animation = `float ${3 + index}s ease-in-out infinite`
    element.style.animationDelay = `${index * 0.5}s`
  })

  // Preloader (optional)
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
