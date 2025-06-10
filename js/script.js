// Enhanced JavaScript for Lumbung Hijau with improved animations

// Declare AOS and bootstrap variables
const AOS = window.AOS
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll) with better settings
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
      delay: 100,
      disable: () => {
        return window.innerWidth < 768 // Disable on mobile for better performance
      },
    })
  }

  // Enhanced navbar scroll effect
  const navbar = document.querySelector(".navbar")
  let lastScrollTop = 0
  let ticking = false

  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 50) {
      navbar.classList.add("shadow")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.classList.remove("shadow")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 1)"
      navbar.style.backdropFilter = "none"
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
    ticking = false
  }

  function requestNavbarUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestNavbarUpdate, { passive: true })

  // Enhanced smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const target = document.querySelector(targetId)

      if (target) {
        const offsetTop = target.offsetTop - 80

        // Smooth scroll with easing
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })

  // Enhanced parallax effect with performance optimization
  const heroSection = document.querySelector(".hero-section")
  const phoneContainer = document.querySelector(".phone-mockup-container")
  const heroContent = document.querySelector(".hero-content")
  let parallaxTicking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const heroHeight = heroSection ? heroSection.offsetHeight : 0

    if (scrolled < heroHeight) {
      const rate = scrolled * 0.5

      if (phoneContainer) {
        phoneContainer.style.transform = `translateY(${-rate * 0.1}px) translateZ(0)`
      }

      if (heroContent) {
        heroContent.style.transform = `translateY(${rate * 0.05}px) translateZ(0)`
      }
    }

    parallaxTicking = false
  }

  function requestParallaxUpdate() {
    if (!parallaxTicking && window.innerWidth > 768) {
      requestAnimationFrame(updateParallax)
      parallaxTicking = true
    }
  }

  window.addEventListener("scroll", requestParallaxUpdate, { passive: true })

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: [0.1, 0.3, 0.5],
    rootMargin: "0px 0px -50px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add("animate-in")
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)

        // Unobserve after animation
        animationObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Apply animation observer to elements
  const animatedElements = document.querySelectorAll(".card, .solution-item, .icon-circle, .solution-number")

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
    animationObserver.observe(element)
  })

  // Enhanced button interactions
  document.querySelectorAll(".btn").forEach((button) => {
    // Hover effects
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)"
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = ""
    })

    // Enhanced ripple effect
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `

      this.appendChild(ripple)

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove()
        }
      }, 600)
    })
  })

  // Card hover animations
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = ""
    })
  })

  // Enhanced phone mockup animations
  const phoneMockup = document.querySelector(".phone-mockup")
  if (phoneMockup) {
    // Floating animation
    phoneMockup.style.animation = "float 6s ease-in-out infinite"

    // Interactive hover
    phoneMockup.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused"
      this.style.transform = "scale(1.05) rotate(2deg)"
    })

    phoneMockup.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running"
      this.style.transform = ""
    })
  }

  // Solution number animations
  document.querySelectorAll(".solution-number").forEach((number, index) => {
    number.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.15) rotate(5deg)"
      this.style.boxShadow = "0 15px 35px rgba(0, 170, 19, 0.4)"
    })

    number.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
      this.style.boxShadow = ""
    })
  })

  // Icon circle animations
  document.querySelectorAll(".icon-circle").forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(10deg)"
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
      this.style.boxShadow = ""
    })
  })

  // Counter animation for numbers
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

  // Scroll progress indicator (optional)
  function createScrollProgress() {
    const progressBar = document.createElement("div")
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #00AA13, #008A10);
      z-index: 9999;
      transition: width 0.1s ease;
    `
    document.body.appendChild(progressBar)

    window.addEventListener(
      "scroll",
      () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        progressBar.style.width = scrollPercent + "%"
      },
      { passive: true },
    )
  }

  // Initialize scroll progress
  createScrollProgress()

  // Performance optimization: Reduce animations on low-end devices
  const isLowEndDevice = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4

  if (isLowEndDevice) {
    document.documentElement.style.setProperty("--animation-duration", "0.3s")
    document.documentElement.style.setProperty("--animation-delay", "0s")
  }

  // Preloader animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger entrance animations
    setTimeout(() => {
      document.querySelectorAll(".hero-content > *").forEach((element, index) => {
        element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`
      })
    }, 100)
  })

  // Resize handler for responsive animations
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      // Reinitialize AOS on resize
      if (typeof AOS !== "undefined") {
        AOS.refresh()
      }
    }, 250)
  })
})

// Enhanced CSS animations via JavaScript
const enhancedStyles = document.createElement("style")
enhancedStyles.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .animate-in {
    animation: fadeInUp 0.6s ease-out;
  }

  .btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .solution-number {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .icon-circle {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .phone-mockup {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Performance optimizations */
  .phone-mockup-container,
  .hero-content {
    will-change: transform;
  }

  .card:hover,
  .btn:hover,
  .solution-number:hover,
  .icon-circle:hover {
    will-change: transform;
  }
`

document.head.appendChild(enhancedStyles)
