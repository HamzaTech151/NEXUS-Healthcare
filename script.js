(function() {
    'use strict';

    var preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 1000);
        });
    }

    var modalOverlay = document.getElementById('modalOverlay');
    var modalTitle = document.getElementById('modalTitle');
    var modalMessage = document.getElementById('modalMessage');
    var modalBtn = document.getElementById('modalBtn');

    function showModal(title, message) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalMessage) modalMessage.innerHTML = message;
        if (modalOverlay) modalOverlay.classList.add('active');
    }

    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    function openBlog(topic) {
        var titles = {
            cardiology: '10 Signs You Should See a Cardiologist',
            neurology: 'Understanding Migraines: Causes and Treatments',
            pediatrics: 'Essential Vaccinations for Children in 2026'
        };
        var content = {
            cardiology: 'Learn about the warning signs of heart disease, including chest pain, shortness of breath, and fatigue. Early detection can save lives.',
            neurology: 'Discover the latest research on migraine prevention, including trigger identification, medication options, and lifestyle changes.',
            pediatrics: 'Stay informed about the recommended vaccine schedule for children, including important immunizations and their benefits.'
        };
        showModal(titles[topic] || 'Health Article', content[topic] || 'Read the full article on our blog.');
        return false;
    }

    function openResource(type) {
        var resources = {
            guides: {
                title: 'Health Guides',
                content: 'Browse our comprehensive health guides covering various conditions and treatments.<br><br>📚 Topics include:<br>• Heart Disease Prevention<br>• Diabetes Management<br>• Mental Health Awareness<br>• Nutrition & Wellness<br>• Senior Care'
            },
            videos: {
                title: 'Video Library',
                content: 'Watch educational videos from our medical experts on health and wellness.<br><br>🎥 Featured Videos:<br>• Understanding Your Heart Health<br>• Robotic Surgery Explained<br>• Maternity Care Tips<br>• Managing Chronic Pain<br>• Mental Health Matters'
            },
            downloads: {
                title: 'Downloadable Resources',
                content: 'Download patient handouts, checklists, and treatment guides in PDF format.<br><br>📄 Available Downloads:<br>• Patient Welcome Guide<br>• Pre-Surgery Checklist<br>• Post-Treatment Care Plan<br>• Medication Tracker<br>• Health Journal Template'
            },
            faq: {
                title: 'FAQ Section',
                content: 'Find answers to the most commonly asked questions about our services and treatments.<br><br>❓ Popular Questions:<br>• How do I book an appointment?<br>• What insurance do you accept?<br>• Do you offer telemedicine?<br>• What are your visiting hours?<br>• How do I get my test results?'
            }
        };
        
        var resource = resources[type];
        if (resource) {
            showModal(resource.title, resource.content);
        } else {
            showModal('Resource', 'Explore our health resources.');
        }
        return false;
    }

    window.openBlog = openBlog;
    window.openResource = openResource;

    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    function createParticles() {
        var container = document.getElementById('particles');
        if (!container) return;
        var colors = ['#1f7a8c', '#0b2a41', '#e6f3f7', '#2ecc71', '#f39c12'];
        for (var i = 0; i < 50; i++) {
            var particle = document.createElement('div');
            var size = Math.random() * 6 + 2;
            var left = Math.random() * 100;
            var top = Math.random() * 100;
            var opacity = Math.random() * 0.3 + 0.1;
            var duration = Math.random() * 10 + 10;
            var delay = Math.random() * 5;
            var color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.cssText = 
                'position: absolute;' +
                'width: ' + size + 'px;' +
                'height: ' + size + 'px;' +
                'background: ' + color + ';' +
                'border-radius: 50%;' +
                'left: ' + left + '%;' +
                'top: ' + top + '%;' +
                'opacity: ' + opacity + ';' +
                'animation: float-particle ' + duration + 's linear infinite;' +
                'animation-delay: ' + delay + 's;' +
                'pointer-events: none;';
            container.appendChild(particle);
        }
    }
    createParticles();

    var statNumbers = document.querySelectorAll('.stat-number');
    var countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        statNumbers.forEach(function(stat) {
            var target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) return;
            var current = 0;
            var increment = Math.ceil(target / 50);
            var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = current;
            }, 30);
        });
        countersAnimated = true;
    }
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        var heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
    } else {
        setTimeout(animateCounters, 1500);
    }

    var accordionHeaders = document.querySelectorAll('.service-accordion-header');
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            var item = this.parentElement;
            var isActive = item.classList.contains('active');
            document.querySelectorAll('.service-accordion-item').forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // DEPARTMENTS - 2 ROWS x 6 COLUMNS
    // ==========================================
    var departments = [
        { icon: 'fa-stethoscope', name: 'Internal Medicine', color: '#1f7a8c' },
        { icon: 'fa-heart', name: 'Cardiology', color: '#e74c3c' },
        { icon: 'fa-brain', name: 'Neurology', color: '#8e44ad' },
        { icon: 'fa-lungs', name: 'Pulmonology', color: '#3498db' },
        { icon: 'fa-bone', name: 'Orthopedics', color: '#e67e22' },
        { icon: 'fa-baby', name: 'Pediatrics', color: '#2ecc71' },
        { icon: 'fa-female', name: 'OB/GYN', color: '#e84393' },
        { icon: 'fa-eye', name: 'Ophthalmology', color: '#00b894' },
        { icon: 'fa-tooth', name: 'Dentistry', color: '#fd79a8' },
        { icon: 'fa-notes-medical', name: 'Psychiatry', color: '#6c5ce7' },
        { icon: 'fa-x-ray', name: 'Radiology', color: '#00b894' },
        { icon: 'fa-flask', name: 'Pathology', color: '#0984e3' }
    ];

    var deptContainer = document.getElementById('deptContainer');
    if (deptContainer) {
        var html = '';
        departments.forEach(function(dept) {
            html += 
                '<div class="dept-premium-item" style="--color: ' + dept.color + '">' +
                    '<div class="dept-premium-icon" style="background: ' + dept.color + '20; color: ' + dept.color + '">' +
                        '<i class="fas ' + dept.icon + '"></i>' +
                    '</div>' +
                    '<h4>' + dept.name + '</h4>' +
                    '<span class="dept-premium-badge">Specialty</span>' +
                '</div>';
        });
        deptContainer.innerHTML = html;
    }

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');
    var submitBtn = document.getElementById('submitBtn');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var isValid = true;
            var name = document.getElementById('fullName');
            var email = document.getElementById('email');
            var message = document.getElementById('message');
            [name, email, message].forEach(function(field) {
                if (field) field.style.borderColor = '';
            });
            if (!name.value.trim() || name.value.trim().length < 2) {
                name.style.borderColor = '#e74c3c';
                isValid = false;
            }
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
                email.style.borderColor = '#e74c3c';
                isValid = false;
            }
            if (!message.value.trim() || message.value.trim().length < 10) {
                message.style.borderColor = '#e74c3c';
                isValid = false;
            }
            if (isValid) {
                var originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                setTimeout(function() {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    formSuccess.classList.add('active');
                    setTimeout(function() {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        formSuccess.classList.remove('active');
                    }, 3000);
                }, 1500);
            }
        });
    }

    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                var btn = newsletterForm.querySelector('button');
                var originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.background = '#2ecc71';
                setTimeout(function() {
                    showModal('Subscribed!', 'Thank you for subscribing to our newsletter! You\'ll receive health tips and updates.');
                    input.value = '';
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 500);
            }
        });
    }

    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var sections = document.querySelectorAll('section[id]');
    var navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    if (sections.length && navLinksAll.length) {
        window.addEventListener('scroll', function() {
            var current = '';
            sections.forEach(function(section) {
                var sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinksAll.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    if ('IntersectionObserver' in window) {
        var revealElements = document.querySelectorAll('.why-card, .service-accordion-item, .testimonial-premium-card, .blog-card, .education-card-premium, .career-card');
        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            revealObserver.observe(el);
        });
    }

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var selectedDate = null;
    var selectedTime = null;

    function renderCalendar(month, year) {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var monthDisplay = document.getElementById('currentMonth');
        if (monthDisplay) monthDisplay.textContent = monthNames[month] + ' ' + year;
        var daysContainer = document.getElementById('calendarDays');
        if (!daysContainer) return;
        daysContainer.innerHTML = '';
        var firstDay = new Date(year, month, 1).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var today = new Date();
        for (var i = 0; i < firstDay; i++) {
            var emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            daysContainer.appendChild(emptyDay);
        }
        for (var d = 1; d <= daysInMonth; d++) {
            var day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = d;
            if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('today');
            }
            if (selectedDate && d === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                day.classList.add('selected');
            }
            day.addEventListener('click', function() {
                document.querySelectorAll('.calendar-day').forEach(function(el) {
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedDate = new Date(year, month, parseInt(this.textContent));
                document.querySelectorAll('.time-slot').forEach(function(el) {
                    el.classList.remove('selected');
                });
                selectedTime = null;
            });
            daysContainer.appendChild(day);
        }
    }

    var prevMonth = document.getElementById('prevMonth');
    var nextMonth = document.getElementById('nextMonth');
    if (prevMonth) {
        prevMonth.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }
    if (nextMonth) {
        nextMonth.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }
    renderCalendar(currentMonth, currentYear);

    document.querySelectorAll('.time-slot').forEach(function(slot) {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(function(el) {
                el.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedTime = this.textContent;
        });
    });

    var confirmAppointment = document.querySelector('.confirm-appointment');
    if (confirmAppointment) {
        confirmAppointment.addEventListener('click', function() {
            if (selectedDate && selectedTime) {
                showModal('Appointment Confirmed!', 'Your appointment has been scheduled for ' + selectedDate.toDateString() + ' at ' + selectedTime + '. We\'ll send you a confirmation email.');
            } else {
                showModal('Incomplete Selection', 'Please select both a date and time for your appointment.');
            }
        });
    }

    var chatToggle = document.getElementById('chatToggle');
    var chatBox = document.getElementById('chatBox');
    var chatClose = document.getElementById('chatClose');
    var chatInput = document.getElementById('chatInput');
    var chatSend = document.getElementById('chatSend');
    var chatMessages = document.getElementById('chatMessages');

    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            chatBox.classList.toggle('active');
        });
    }
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatBox.classList.remove('active');
        });
    }

    function addChatMessage(message, isBot) {
        if (!chatMessages) return;
        var msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg ' + (isBot ? 'bot' : 'user');
        msgDiv.innerHTML = 
            '<div class="msg-avatar"><i class="fas ' + (isBot ? 'fa-robot' : 'fa-user') + '"></i></div>' +
            '<div class="msg-content"><p>' + message + '</p><span class="msg-time">Just now</span></div>';
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendChatMessage() {
        if (!chatInput) return;
        var message = chatInput.value.trim();
        if (message) {
            addChatMessage(message, false);
            chatInput.value = '';
            setTimeout(function() {
                var responses = [
                    'I\'ll help you with that! Let me connect you to the right department.',
                    'Great question! Our AI diagnostics can help with that.',
                    'Let me check the availability for you right now.',
                    'I\'m here to help! Let me guide you through this.',
                    'Thank you for reaching out! How can I assist you further?'
                ];
                addChatMessage(responses[Math.floor(Math.random() * responses.length)], true);
            }, 1000);
        }
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    document.querySelectorAll('.chat-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var msg = this.getAttribute('data-msg');
            addChatMessage('I need help with: ' + msg, false);
            setTimeout(function() {
                addChatMessage('Great! Let me assist you with ' + msg + '. One moment please...', true);
            }, 1000);
        });
    });

    var appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showModal('Appointment Booked!', 'Your appointment has been successfully booked. We\'ll contact you shortly with confirmation details.');
            this.reset();
        });
    }

    var careersSection = document.getElementById('careers');
    var careerApplicationSection = document.getElementById('careerApplication');
    var applyingFor = document.getElementById('applyingFor');
    var cancelApplication = document.getElementById('cancelApplication');

    document.querySelectorAll('.career-apply').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var job = this.getAttribute('data-job');
            if (applyingFor) {
                applyingFor.textContent = 'Applying for: ' + job;
            }
            var form = document.getElementById('careerForm');
            if (form) {
                form.setAttribute('data-job', job);
            }
            if (careersSection) {
                careersSection.style.display = 'none';
            }
            if (careerApplicationSection) {
                careerApplicationSection.style.display = 'block';
                careerApplicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (cancelApplication) {
        cancelApplication.addEventListener('click', function() {
            if (careerApplicationSection) {
                careerApplicationSection.style.display = 'none';
            }
            if (careersSection) {
                careersSection.style.display = 'block';
            }
            var form = document.getElementById('careerForm');
            if (form) form.reset();
        });
    }

    var careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var firstName = document.getElementById('appFirstName');
            var lastName = document.getElementById('appLastName');
            var email = document.getElementById('appEmail');
            var phone = document.getElementById('appPhone');
            var experience = document.getElementById('appExperience');
            var reason = document.getElementById('appReason');
            var consent = document.getElementById('appConsent');
            var job = this.getAttribute('data-job') || 'Position';
            
            var isValid = true;
            
            if (!firstName.value.trim() || firstName.value.trim().length < 2) {
                firstName.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                firstName.style.borderColor = '';
            }
            
            if (!lastName.value.trim() || lastName.value.trim().length < 2) {
                lastName.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                lastName.style.borderColor = '';
            }
            
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
                email.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                email.style.borderColor = '';
            }
            
            if (!phone.value.trim() || phone.value.trim().length < 10) {
                phone.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                phone.style.borderColor = '';
            }
            
            if (!experience.value) {
                experience.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                experience.style.borderColor = '';
            }
            
            if (!reason.value.trim() || reason.value.trim().length < 20) {
                reason.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                reason.style.borderColor = '';
            }
            
            if (!consent.checked) {
                consent.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                consent.style.borderColor = '';
            }
            
            if (isValid) {
                var submitBtn = this.querySelector('button[type="submit"]');
                var originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    showModal(
                        'Application Submitted Successfully! 🎉',
                        'Dear ' + firstName.value + ' ' + lastName.value + ',<br><br>Thank you for applying for the position of <strong>' + job + '</strong>.<br><br>Our HR team will review your application and get back to you within 48 hours.<br><br><strong>Application ID:</strong> #NX' + Math.floor(100000 + Math.random() * 900000) + '<br><br>We wish you the best of luck!'
                    );
                    careerForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    if (careerApplicationSection) {
                        careerApplicationSection.style.display = 'none';
                    }
                    if (careersSection) {
                        careersSection.style.display = 'block';
                    }
                }, 2000);
            } else {
                showModal('Please Complete All Fields', 'Please fill in all required fields marked with * and ensure all information is correct.');
            }
        });
    }

    // ==========================================
    // TESTIMONIAL CAROUSEL
    // ==========================================
    var testimonialCarousel = document.getElementById('testimonialCarousel');
    var testimonialPrev = document.getElementById('testimonialPrev');
    var testimonialNext = document.getElementById('testimonialNext');
    var testimonialDots = document.getElementById('testimonialDots');

    if (testimonialCarousel) {
        var testimonialCards = testimonialCarousel.querySelectorAll('.testimonial-premium-card');
        var currentTestimonial = 0;
        var totalTestimonials = testimonialCards.length;
        var autoPlayInterval = null;
        var isTransitioning = false;

        if (testimonialDots) {
            testimonialDots.innerHTML = '';
            for (var i = 0; i < totalTestimonials; i++) {
                var dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', function() {
                    var index = parseInt(this.getAttribute('data-index'));
                    goToTestimonial(index);
                });
                testimonialDots.appendChild(dot);
            }
        }

        function goToTestimonial(index) {
            if (isTransitioning || index === currentTestimonial) return;
            isTransitioning = true;

            testimonialCards.forEach(function(card, i) {
                card.classList.remove('active');
                if (i === index) {
                    card.classList.add('active');
                }
            });

            var dots = testimonialDots.querySelectorAll('.carousel-dot');
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === index);
            });

            var offset = -index * 100;
            testimonialCarousel.style.transform = 'translateX(' + offset + '%)';

            currentTestimonial = index;

            setTimeout(function() {
                isTransitioning = false;
            }, 500);
        }

        function nextTestimonial() {
            var next = (currentTestimonial + 1) % totalTestimonials;
            goToTestimonial(next);
        }

        function prevTestimonial() {
            var prev = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            goToTestimonial(prev);
        }

        if (testimonialNext) {
            testimonialNext.addEventListener('click', function() {
                nextTestimonial();
                resetAutoPlay();
            });
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function() {
                prevTestimonial();
                resetAutoPlay();
            });
        }

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(function() {
                nextTestimonial();
            }, 5000);
        }

        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
        }

        var carouselContainer = document.querySelector('.testimonial-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', function() {
                if (autoPlayInterval) {
                    clearInterval(autoPlayInterval);
                }
            });
            carouselContainer.addEventListener('mouseleave', function() {
                startAutoPlay();
            });
        }

        testimonialCards.forEach(function(card, i) {
            card.classList.toggle('active', i === 0);
        });

        startAutoPlay();

        var touchStartX = 0;
        var touchEndX = 0;

        testimonialCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }

    console.log('%c✦ NEXUS Healthcare', 'font-size: 28px; font-weight: bold; color: #1f7a8c;');
    console.log('%c🏥 Premium Healthcare Experience', 'font-size: 14px; color: #0b2a41;');
    console.log('%c✨ All features loaded successfully!', 'font-size: 12px; color: #2ecc71;');

})();