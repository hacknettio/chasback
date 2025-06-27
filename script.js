        // Preloader
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1000);
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Dark Mode Toggle
        const modeToggle = document.querySelector('.mode-toggle');
        const body = document.body;
        const modeIcon = modeToggle.querySelector('i');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.toggle('dark-mode', savedTheme === 'dark');
            updateModeIcon();
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateModeIcon();
        });

        function updateModeIcon() {
            const isDark = body.classList.contains('dark-mode');
            modeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links a');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close mobile menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').className = 'fas fa-bars';
            });
        });

        // Mobile dropdown toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Hero Swiper
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });

        // Testimonial Swiper
        const testimonialSwiper = new Swiper('.testimonial-swiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });

        // Fleet Tabs
        const fleetTabs = document.querySelectorAll('.fleet-tab');
        const fleetContents = document.querySelectorAll('.fleet-content');

        fleetTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                fleetTabs.forEach(t => t.classList.remove('active'));
                fleetContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Date Picker
        flatpickr('.datepicker', {
            dateFormat: 'm/d/Y',
            minDate: 'today',
            defaultDate: 'today'
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active Navigation Link
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll to Top Button
        const scrollTopBtn = document.querySelector('.scroll-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Booking Modal
        const modal = document.getElementById('booking-modal');
        const rentNowBtns = document.querySelectorAll('.rent-now-btn');
        const modalClose = document.querySelector('.modal-close');
        const modalNext = document.querySelector('.modal-next');
        const modalPrev = document.querySelector('.modal-prev');
        const modalBook = document.querySelector('.modal-book');
        const bookingSteps = document.querySelectorAll('.booking-step');
        const bookingStepContents = document.querySelectorAll('.booking-step-content');

        let currentStep = 1;

        // Open modal when rent now button is clicked
        rentNowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const carName = btn.getAttribute('data-car');
                const carCard = btn.closest('.car-card');
                const carImage = carCard.querySelector('.car-image img').src;
                const carPrice = carCard.querySelector('.price-amount').textContent;

                // Update modal with selected car details
                document.getElementById('selected-car-title').textContent = carName;
                document.getElementById('selected-car-image').src = carImage;
                document.getElementById('total-price').textContent = carPrice;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            currentStep = 1;
            updateBookingStep();
        }

        // Modal navigation
        modalNext.addEventListener('click', () => {
            if (currentStep < 3) {
                currentStep++;
                updateBookingStep();
            }
        });

        modalPrev.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateBookingStep();
            }
        });

        modalBook.addEventListener('click', () => {
            // Here you would typically send the booking data to your server
            alert('Booking completed! You will receive a confirmation email shortly.');
            closeModal();
        });

        function updateBookingStep() {
            // Update step indicators
            bookingSteps.forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index + 1 < currentStep) {
                    step.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    step.classList.add('active');
                }
            });

            // Update step content
            bookingStepContents.forEach((content, index) => {
                content.classList.remove('active');
                if (index + 1 === currentStep) {
                    content.classList.add('active');
                }
            });

            // Update buttons
            modalPrev.style.display = currentStep === 1 ? 'none' : 'inline-block';
            modalNext.style.display = currentStep === 3 ? 'none' : 'inline-block';
            modalBook.style.display = currentStep === 3 ? 'inline-block' : 'none';
        }

        // Newsletter Form
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });

        // Search Form
        const searchForm = document.querySelector('.search-form form');
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically process the search and show results
            alert('Searching for available cars...');
        });

        // Contact Form
        const contactForm = document.querySelector('.contact-form form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the message to your server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Animate numbers on scroll
        const animateNumbers = () => {
            const numberElements = document.querySelectorAll('[data-number]');
            
            numberElements.forEach(element => {
                const targetNumber = parseInt(element.getAttribute('data-number'));
                const currentNumber = parseInt(element.textContent);
                
                if (currentNumber < targetNumber) {
                    const increment = Math.ceil(targetNumber / 100);
                    const newNumber = Math.min(currentNumber + increment, targetNumber);
                    element.textContent = newNumber;
                    
                    if (newNumber < targetNumber) {
                        setTimeout(() => animateNumbers(), 20);
                    }
                }
            });
        };

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Animate numbers if they exist
                    const numberElements = entry.target.querySelectorAll('[data-number]');
                    if (numberElements.length > 0) {
                        animateNumbers();
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.car-card, .step-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });

        // Header scroll effect
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'var(--nav-bg)';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Lazy loading for images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });

        // Performance optimization: Debounce scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Apply debouncing to scroll events
        const debouncedScrollHandler = debounce(() => {
            // Handle scroll events here if needed
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler);

        // Keyboard navigation for modal
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowRight' && currentStep < 3) {
                    currentStep++;
                    updateBookingStep();
                } else if (e.key === 'ArrowLeft' && currentStep > 1) {
                    currentStep--;
                    updateBookingStep();
                }
            }
        });

        // Initialize tooltips (if needed)
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', (e) => {
                const tooltipText = e.target.getAttribute('data-tooltip');
                // Create and show tooltip
            });
        });

        // Error handling for failed image loads
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', () => {
                img.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Image+Not+Available';
            });
        });

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Additional initialization code can go here
            console.log('Chasbeck Car Rental website loaded successfully!');
        });

        // Service Worker registration (for PWA capabilities)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }

        // Car details configuration
        const carDetails = {
            'Toyota Aqua': {
                image: '/assets/AQUA.JPG',
                specs: {
                    passengers: '5 People',
                    bags: '2 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '25km/l',
                    ac: 'A/C',
                    fuelType: 'Petrol'
                },
                pricing: {
                    baseRate: 50,
                    insurance: 10,
                    taxes: 8
                }
            },
            'Toyota Vitz': {
                image: '/assets/VITZ.jpg',
                specs: {
                    passengers: '5 People',
                    bags: '2 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '23km/l',
                    ac: 'A/C',
                    fuelType: 'Petrol'
                },
                pricing: {
                    baseRate: 50,
                    insurance: 10,
                    taxes: 8
                }
            },
            'Toyota Avensis': {
                image: '/assets/AVENSIS.jpg',
                specs: {
                    passengers: '5 People',
                    bags: '2 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '19.5km/l',
                    ac: 'A/C',
                    fuelType: 'Petrol'
                },
                pricing: {
                    baseRate: 50,
                    insurance: 10,
                    taxes: 8
                }
            },
            'Toyota Hilux D4D': {
                image: '/assets/HILUX.png',
                specs: {
                    passengers: '5 People',
                    bags: '4 Bags',
                    transmission: 'Manual',
                    fuelEfficiency: '12km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 120,
                    insurance: 15,
                    taxes: 12
                }
            },
            'Toyota Fortuner D4D': {
                image: '/assets/FORTUNER.png',
                specs: {
                    passengers: '7 People',
                    bags: '4 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '12km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 120,
                    insurance: 15,
                    taxes: 12
                }
            },
            'Toyota Hilux GD6': {
                image: '/assets/HILUX GD6.png',
                specs: {
                    passengers: '5 People',
                    bags: '6 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '13km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 120,
                    insurance: 15,
                    taxes: 12
                }
            },
            'Toyota Fortuner GD6': {
                image: '/assets/FORTUNER.png',
                specs: {
                    passengers: '5 People',
                    bags: '4 Bags',
                    transmission: 'Manual',
                    fuelEfficiency: '14km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 200,
                    insurance: 20,
                    taxes: 15
                }
            },
            'Toyota Hiace': {
                image: '/assets/QUANTUM.jpg',
                specs: {
                    passengers: '5 People',
                    bags: '4 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '13km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 140,
                    insurance: 15,
                    taxes: 12
                }
            },
            'Toyota Ragius Quantum': {
                image: '/assets/RAGIUS.jpeg',
                specs: {
                    passengers: '7 People',
                    bags: '5 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '12km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 140,
                    insurance: 15,
                    taxes: 12
                }
            },
            'Mercedes-Benz E-250': {
                image: '/assets/E250.png',
                specs: {
                    passengers: '5 People',
                    bags: '3 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '15km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 150,
                    insurance: 20,
                    taxes: 15
                }
            },
            'Mercedes-Benz E-300': {
                image: '/assets/C300.png',
                specs: {
                    passengers: '5 People',
                    bags: '3 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '16km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 150,
                    insurance: 20,
                    taxes: 15
                }
            },
            'Mercedes-Benz C200': {
                image: '/assets/C-CLASS.png',
                specs: {
                    passengers: '5 People',
                    bags: '3 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '17km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 150,
                    insurance: 20,
                    taxes: 15
                }
            },
            'Toyota Land Cruiser V8': {
                image: '/assets/deals-13.png',
                specs: {
                    passengers: '5 People',
                    bags: '4 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '10km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 450,
                    insurance: 30,
                    taxes: 25
                }
            },
            'Mercedes-Benz GLE': {
                image: '/assets/deals-14.png',
                specs: {
                    passengers: '5 People',
                    bags: '4 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '9km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 450,
                    insurance: 30,
                    taxes: 25
                }
            },
            'Mercedes-Benz GLS': {
                image: '/assets/benzgls.JPG',
                specs: {
                    passengers: '7 People',
                    bags: '5 Bags',
                    transmission: 'Automatic',
                    fuelEfficiency: '11km/l',
                    ac: 'A/C',
                    fuelType: 'Diesel'
                },
                pricing: {
                    baseRate: 450,
                    insurance: 30,
                    taxes: 25
                }
            }
        };

        // Function to update car details in the modal
        function updateCarDetails(carName) {
            const car = carDetails[carName];
            if (!car) return;

            // Update car image
            document.getElementById('selected-car-image').src = car.image;
            
            // Update car title
            document.getElementById('selected-car-title').textContent = carName;
            
            // Update car specs
            const specs = car.specs;
            const specElements = document.querySelectorAll('.car-spec');
            specElements[0].innerHTML = `<i class="fas fa-user"></i> ${specs.passengers}`;
            specElements[1].innerHTML = `<i class="fas fa-suitcase"></i> ${specs.bags}`;
            specElements[2].innerHTML = `<i class="fas fa-cog"></i> ${specs.transmission}`;
            specElements[3].innerHTML = `<i class="fas fa-gas-pump"></i> ${specs.fuelEfficiency}`;
            specElements[4].innerHTML = `<i class="fas fa-snowflake"></i> ${specs.ac}`;
            specElements[5].innerHTML = `<i class="fas fa-tint"></i> ${specs.fuelType}`;
            
            // Update pricing
            const pricing = car.pricing;
            const total = pricing.baseRate + pricing.insurance + pricing.taxes;
            
            const priceElements = document.querySelectorAll('.price-row span:last-child');
            priceElements[0].textContent = `$${pricing.baseRate} per day`;
            priceElements[1].textContent = `$${pricing.insurance} per day`;
            priceElements[2].textContent = `$${pricing.taxes} per day`;
            priceElements[3].textContent = `$${total}`;
        }

        // Add click event listeners to all Rent Now buttons
        document.addEventListener('DOMContentLoaded', function() {
            const rentButtons = document.querySelectorAll('.rent-now-btn');
            rentButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const carName = this.getAttribute('data-car');
                    updateCarDetails(carName);
                });
            });
        });
