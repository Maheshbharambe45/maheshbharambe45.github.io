document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Hero Typewriter Effect
    // ----------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const words = ["CI/CD Pipelines.", "Kubernetes Clusters.", "Cloud Architectures.", "DevSecOps Workflows."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120; // Natural typing speed
        }

        // Handle word completions
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    if (typewriterElement) {
        type();
    }

    // ----------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------
    // 3. Scroll Reveal Animations
    // ----------------------------------------------------
    // Automatically add reveal class to main sections and cards
    const revealElements = [
        ...document.querySelectorAll('section'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.skills-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.contact-info-card'),
        ...document.querySelectorAll('.contact-form-wrap')
    ];

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on load

    // ----------------------------------------------------
    // 4. CLI Console Terminal Simulator
    // ----------------------------------------------------
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');
    const currentInputRow = document.getElementById('currentInputRow');
    const clearTerminalBtn = document.getElementById('clearTerminalBtn');

    // Terminal Commands Dataset
    const commands = {
        help: () => {
            return `Available commands:
  <span class="c-teal">about</span>          - Brief summary of who I am
  <span class="c-teal">skills</span>         - My technical stack inventory
  <span class="c-teal">experience</span>     - Visual layout of my career path
  <span class="c-teal">projects</span>       - Showcase of automated DevOps projects
  <span class="c-teal">certifications</span> - Verified course certificates and credentials
  <span class="c-teal">contact</span>        - How to get in touch with me
  <span class="c-teal">clear</span>          - Clear the screen
  <span class="c-teal">sudo [cmd]</span>      - Try your admin privileges`;
        },
        about: () => {
            return `Mahesh Bharambe | DevOps Engineer
--------------------------------------
Motto: "Aim the impossible"
Current Role: DevOps Engineer at SimplyFI Innovations
Education: MCA Candidate (Class of 2026)
Location: Bengaluru / Mumbai, India

Passionate about systems orchestration, infrastructure stability, and 
bridging the gap between software developers and IT operations.`;
        },
        skills: () => {
            return `TECHNICAL INVENTORY:
--------------------
<span class="c-teal">Cloud & DevOps:</span>  AWS, Kubernetes, Docker, Terraform, Jenkins, Ansible, Git
<span class="c-purple">Monitoring:</span>      Prometheus, Grafana, Alertmanager, Node Exporter
<span class="c-green">Backend/Db:</span>      Node.js, Express, MongoDB, MySQL, Redis
<span class="c-yellow">Languages:</span>       Python, JavaScript (ES6), HTML5/CSS3, Bash Shell`;
        },
        experience: () => {
            return `WORK TIMELINE:
--------------
1. <span class="c-teal">SimplyFI Innovations PTE Ltd</span> (Feb 2026 - Present)
   Role: DevOps Engineer
   Key tasks: Application containerization, DevSecOps pipelines, AWS automation.
   
2. <span class="c-purple">SparkNet Innovations</span> (Jul 2025 - Dec 2025)
   Role: DevOps Intern
   Key tasks: Server maintenance, shell scripting, Docker environments.

3. <span class="c-green">HEURISTIC TECHNOPARK</span> (Jan 2024 - Mar 2024)
   Role: Software Intern
   Key tasks: Front-end layouts using Bootstrap, Python scripting.`;
        },
        projects: () => {
            return `FEATURED PROJECTS:
------------------
1. <span class="c-teal">Hotstar Clone – DevSecOps CI/CD Pipeline</span>
   Tech: AWS EKS, Jenkins, Terraform, Docker Scout, OWASP ZAP, Prometheus
   Desc: Secure containerized pipeline handling 1000+ concurrent users on EKS.
   
2. <span class="c-purple">Python Jenkins Pipeline Automation</span>
   Tech: Python, Flask, Jenkins, Docker, Kubernetes (Minikube), Webhooks
   Desc: Automated pytest container workflows with automatic webhook execution.

3. <span class="c-green">Multi-Stage CI/CD GitOps Pipeline</span>
   Tech: Jenkins, ArgoCD, Docker, Kubernetes
   Desc: Automated deployments to local and cloud clusters with tests.
   
4. <span class="c-yellow">Infrastructure-as-Code AWS Deployer</span>
   Tech: Terraform, AWS VPC, RDS, EC2 Auto Scaling
   Desc: Provisioning modular secure environments automatically.
   
5. <span class="c-teal">DevSecOps Vulnerability Pipeline</span>
   Tech: Jenkins, SonarQube, Trivy, OWASP
   Desc: Integrated static analysis and Docker vulnerability scans.

6. <span class="c-purple">Prometheus & Grafana Monitoring</span>
   Tech: Prometheus, Grafana, Alertmanager
   Desc: Metrics dashboards with automated Slack notifications.`;
        },
        certifications: () => {
            return `ACQUIRED CREDENTIALS & CERTIFICATIONS:
--------------------------------------
🎓 <span class="c-teal">KodeKloud 100 Days of DevOps</span>
   Status: <span class="c-green">Verified</span> | Training in Jenkins, Ansible, Terraform, and K8s.

🎓 <span class="c-purple">KodeKloud Engineer - Docker (Level 1)</span>
   Status: <span class="c-green">Verified</span> | Verified proficiency in managing Docker systems.

🎓 <span class="c-orange">Postman API Fundamentals Student Expert</span>
   Status: <span class="c-green">Verified</span> | Expertise in API testing, collection runs, and schemas.`;
        },
        certs: () => {
            return commands.certifications();
        },
        contact: () => {
            return `CONNECT INTERFACES:
-------------------
📧 Email:     <a href="mailto:bharambemahesh7@gmail.com" class="c-teal">bharambemahesh7@gmail.com</a>
🔗 LinkedIn:  <a href="https://linkedin.com/in/mahesh-bharambe" target="_blank" class="c-teal">linkedin.com/in/mahesh-bharambe</a>
🐙 GitHub:    <a href="https://github.com/Maheshbharambe45" target="_blank" class="c-teal">github.com/Maheshbharambe45</a>
⚡ Bento:     <a href="http://bento.me/maheshbharambe" target="_blank" class="c-teal">bento.me/maheshbharambe</a>`;
        }
    };

    // Handle interactive terminal commands
    if (terminalInput && terminalBody) {
        // Direct focus to input on clicking terminal body
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputVal = terminalInput.value.trim();
                const cleanInput = inputVal.toLowerCase();
                
                if (inputVal !== '') {
                    // Create line showing what user typed
                    createOutputLine(`<span class="terminal-prompt"><span class="c-teal">mahesh</span>@<span class="c-purple">portfolio</span>:~$</span> <span class="text-white">${inputVal}</span>`);
                    
                    // Route commands
                    if (cleanInput === 'clear') {
                        clearTerminal();
                    } else if (commands[cleanInput]) {
                        // Standard command
                        createOutputLine(commands[cleanInput]());
                    } else if (cleanInput.startsWith('sudo ')) {
                        // Sudo easter egg
                        if (cleanInput === 'sudo rm -rf /') {
                            createOutputLine('<span class="c-red">WARNING: SYSTEM DELETION INITIATED...</span>');
                            createOutputLine('<span class="c-red">Access Denied: mahesh is not in the sudoers file. This incident will be reported.</span>');
                            createOutputLine('Just kidding! 😉 Aim the impossible.');
                        } else {
                            createOutputLine('<span class="c-yellow">Error: Elevated permissions required. Enter administrator password: **********</span>');
                            createOutputLine('<span class="c-red">Permission Denied.</span>');
                        }
                    } else {
                        // Default command fallback
                        createOutputLine(`bash: command not found: ${inputVal}. Type <span class="c-yellow">help</span> to view commands.`);
                    }
                } else {
                    // Just print empty prompt
                    createOutputLine(`<span class="terminal-prompt"><span class="c-teal">mahesh</span>@<span class="c-purple">portfolio</span>:~$</span>`);
                }
                
                // Reset input value
                terminalInput.value = '';
                
                // Reposition input row to bottom
                terminalBody.appendChild(currentInputRow);
                terminalInput.focus();
                
                // Scroll terminal to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    function createOutputLine(content) {
        const line = document.createElement('div');
        line.className = 'terminal-output-line';
        line.innerHTML = content;
        terminalBody.insertBefore(line, currentInputRow);
    }

    function clearTerminal() {
        const lines = terminalBody.querySelectorAll('.terminal-output-line');
        lines.forEach(line => line.remove());
        createOutputLine("Terminal console cleared. Type <span class='c-yellow'>help</span> to start.");
    }

    if (clearTerminalBtn) {
        clearTerminalBtn.addEventListener('click', clearTerminal);
    }

    // ----------------------------------------------------
    // 5. Contact Form Handler & Validations
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formName = document.getElementById('formName');
    const formEmail = document.getElementById('formEmail');
    const formSubject = document.getElementById('formSubject');
    const formMessage = document.getElementById('formMessage');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;

            // Name field validation
            if (formName.value.trim() === '') {
                showError(formName, 'nameError');
                isValid = false;
            } else {
                hideError(formName, 'nameError');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formEmail.value.trim() === '') {
                showError(formEmail, 'emailError', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(formEmail.value.trim())) {
                showError(formEmail, 'emailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(formEmail, 'emailError');
            }

            // Subject validation
            if (formSubject.value.trim() === '') {
                showError(formSubject, 'subjectError');
                isValid = false;
            } else {
                hideError(formSubject, 'subjectError');
            }

            // Message validation
            if (formMessage.value.trim() === '') {
                showError(formMessage, 'messageError');
                isValid = false;
            } else {
                hideError(formMessage, 'messageError');
            }

            // Submitting flow
            if (isValid) {
                const submitText = formSubmitBtn.querySelector('.btn-text');
                const submitIcon = formSubmitBtn.querySelector('i');
                
                // Loading State
                formSubmitBtn.disabled = true;
                submitText.textContent = 'Deploying Message...';
                submitIcon.className = 'fa-solid fa-spinner fa-spin';

                // Simulate network latency (DevOps deployment style!)
                setTimeout(() => {
                    // Reset Button State
                    formSubmitBtn.disabled = false;
                    submitText.textContent = 'Message Deployed!';
                    submitIcon.className = 'fa-solid fa-circle-check';
                    formSubmitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    formSubmitBtn.style.color = '#fff';

                    // Save locally for reference
                    const submission = {
                        name: formName.value.trim(),
                        email: formEmail.value.trim(),
                        subject: formSubject.value.trim(),
                        message: formMessage.value.trim(),
                        timestamp: new Date().toISOString()
                    };
                    
                    const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
                    existingSubmissions.push(submission);
                    localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));

                    // Show success terminal logging in window console
                    if (terminalBody) {
                        createOutputLine(`&nbsp;`);
                        createOutputLine(`<span class="c-green">[SUCCESS]</span> New contact request received from ${submission.name} (${submission.email})`);
                        createOutputLine(`<span class="c-teal">[INFO]</span> Subject: ${submission.subject}`);
                        createOutputLine(`<span class="c-teal">[INFO]</span> Status: 200 OK. Mail pipeline execution completed.`);
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                    }

                    // Reset Form fields after delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitText.textContent = 'Send Message';
                        submitIcon.className = 'fa-regular fa-paper-plane';
                        formSubmitBtn.removeAttribute('style');
                    }, 3000);

                }, 1500);
            }
        });
    }

    function showError(inputElement, errorId, customMessage) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.add('invalid');
        if (customMessage) {
            document.getElementById(errorId).textContent = customMessage;
        }
    }

    function hideError(inputElement, errorId) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.remove('invalid');
    }
});
