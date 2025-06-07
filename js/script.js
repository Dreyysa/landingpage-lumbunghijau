// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Enhanced navbar scroll effect
  let lastScrollTop = 0
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Add/remove scrolled class for styling
    if (scrollTop > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
    lastScrollTop = scrollTop

    // Update active nav links
    updateActiveNavLinks()
  })

  // Function to update active navigation links
  function updateActiveNavLinks() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY + 150

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`)

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLink?.classList.add("active")
      } else {
        navLink?.classList.remove("active")
      }
    })
  }

  // Mobile menu collapse on click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all animated elements
  document.querySelectorAll(".animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    observer.observe(el)
  })

  // Enhanced button hover effects
  document.querySelectorAll(".btn-gradient").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Loading animation for buttons
  document.querySelectorAll(".btn-gradient").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading")
        const originalText = this.innerHTML
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...'

        setTimeout(() => {
          this.classList.remove("loading")
          this.innerHTML = originalText
        }, 2000)
      }
    })
  })

  // Add hover effects to cards
  document.querySelectorAll(".card-modern").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Enhanced button interactions
  document.querySelectorAll(".btn").forEach((btn) => {
    // Add ripple effect on click
    btn.addEventListener("click", function (e) {
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

    // Add hover sound effect (optional)
    btn.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer"
    })

    // Add focus handling for keyboard navigation
    btn.addEventListener("focus", function () {
      this.style.outline = "none"
    })

    // Add active state handling
    btn.addEventListener("mousedown", function () {
      this.style.transform = "translateY(1px) scale(0.98)"
    })

    btn.addEventListener("mouseup", function () {
      this.style.transform = ""
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
})

// Add CSS for scrolled navbar
const style = document.createElement("style")
style.textContent = `
  .navbar {
    transition: all 0.3s ease;
  }
  
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  
  .hover-text-white:hover {
    color: white !important;
    transition: color 0.3s ease;
  }
  
  .btn.loading {
    pointer-events: none;
    opacity: 0.8;
  }

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

// Tambahkan kode untuk animasi icon di bagian akhir file

// Icon animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate icons on hover
  document.querySelectorAll(".icon-circle, .number-circle").forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      const iconElement = this.querySelector("i")
      if (iconElement) {
        iconElement.classList.add("icon-pulse")
      }
    })

    icon.addEventListener("mouseleave", function () {
      const iconElement = this.querySelector("i")
      if (iconElement) {
        iconElement.classList.remove("icon-pulse")
      }
    })
  })

  // Add hover effect to all icons
  document.querySelectorAll(".fas, .fab, .far").forEach((icon) => {
    if (!icon.closest(".icon-circle") && !icon.closest(".number-circle")) {
      icon.classList.add("hover-icon-effect")
    }
  })

  // Staggered animation for feature icons
  const featureIcons = document.querySelectorAll("#fitur .icon-circle")
  featureIcons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add("animate-fade-in-up")
    }, index * 100)
  })
})
