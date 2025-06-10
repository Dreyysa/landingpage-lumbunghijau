// Enhanced JavaScript for Lumbung Hijau with improved animations and navigation

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

  // Enhanced smooth scrolling with offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const target = document.querySelector(targetId)

      if (target) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const offsetTop = target.offsetTop - navbarHeight - 20

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

        // Update active nav link
        updateActiveNavLink(targetId)
      }
    })
  })

  // Active navigation link based on scroll position
  function updateActiveNavLink(activeId = null) {
    const navLinks = document.querySelectorAll(".nav-link")
    const sections = document.querySelectorAll("section[id]")

    if (activeId) {
      // Manual update when clicking nav link
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === activeId) {
          link.classList.add("active")
        }
      })
    } else {
      // Auto update based on scroll position
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active")
            }
          })
        }
      })
    }
  }

  // Update active nav on scroll
  window.addEventListener(
    "scroll",
    () => {
      updateActiveNavLink()
    },
    { passive: true },
  )

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
  document
    .querySelectorAll(".card, .hero-card, .info-card, .problem-card, .solution-card, .feature-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.02)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })

  // Enhanced phone mockup animations
  const phoneMockup = document.querySelector(".hero-image")
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

  // Scroll progress indicator
  function createScrollProgress() {
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
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

  // Preloader animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger entrance animations
    setTimeout(() => {
      document.querySelectorAll(".hero-content > *").forEach((element, index) => {
        if (element) {
          element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`
        }
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

// Download app function
function downloadApp() {
  // Simulate download process
  const button = event.target.closest(".btn")
  const originalText = button.innerHTML

  button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Memproses...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Download Dimulai!'

    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false

      // Show alert for demo purposes
      alert("Terima kasih! APK Lumbung Hijau akan segera tersedia untuk download.")
    }, 2000)
  }, 1500)
}

// Enhanced CSS animations via JavaScript
const enhancedStyles = document.createElement("style")
enhancedStyles.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
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

  .nav-link.active {
    color: var(--bs-success) !important;
    background-color: rgba(0, 170, 19, 0.1);
    font-weight: 600;
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
  .phone-card,
  .hero-content {
    will-change: transform;
  }

  .card:hover,
  .btn:hover,
  .solution-number:hover,
  .feature-icon:hover {
    will-change: transform;
  }
`

document.head.appendChild(enhancedStyles)
