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

                const submission = {
                    name: formName.value.trim(),
                    email: formEmail.value.trim(),
                    subject: formSubject.value.trim(),
                    message: formMessage.value.trim(),
                    timestamp: new Date().toISOString()
                };

                // Send the message to your inbox via Formspree.
                // 1. Go to https://formspree.io, sign up free, create a new form.
                // 2. Copy the endpoint it gives you (looks like https://formspree.io/f/xxxxxxxx)
                // 3. Paste it in place of 'YOUR_FORM_ID' below.
                const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqglkpg';

                fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: new FormData(contactForm)
                })
                .then((response) => {
                    if (!response.ok) throw new Error('Request failed: ' + response.status);

                    // Reset Button State
                    formSubmitBtn.disabled = false;
                    submitText.textContent = 'Message Deployed!';
                    submitIcon.className = 'fa-solid fa-circle-check';
                    formSubmitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    formSubmitBtn.style.color = '#fff';

                    // Keep a local copy too, for your own reference
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
                })
                .catch((err) => {
                    formSubmitBtn.disabled = false;
                    submitText.textContent = 'Failed — Try Again';
                    submitIcon.className = 'fa-solid fa-triangle-exclamation';
                    formSubmitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                    formSubmitBtn.style.color = '#fff';

                    if (terminalBody) {
                        createOutputLine(`<span class="c-red">[ERROR]</span> Mail pipeline failed: ${err.message}`);
                    }

                    setTimeout(() => {
                        submitText.textContent = 'Send Message';
                        submitIcon.className = 'fa-regular fa-paper-plane';
                        formSubmitBtn.removeAttribute('style');
                    }, 3000);
                });
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

    // ----------------------------------------------------
    // 6. Spotlight Cursor Tracking for Cards
    // ----------------------------------------------------
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ----------------------------------------------------
    // 7. Hero Console Tabs and Boot Script
    // ----------------------------------------------------
    const tabBtnSysinfo = document.getElementById('tabBtnSysinfo');
    const tabBtnPipeline = document.getElementById('tabBtnPipeline');
    const tabSysinfo = document.getElementById('tabSysinfo');
    const tabPipeline = document.getElementById('tabPipeline');
    const sysinfoLogs = document.getElementById('sysinfoLogs');

    if (tabBtnSysinfo && tabBtnPipeline && tabSysinfo && tabPipeline) {
        tabBtnSysinfo.addEventListener('click', () => {
            tabBtnSysinfo.classList.add('active');
            tabBtnPipeline.classList.remove('active');
            tabSysinfo.style.display = 'block';
            tabPipeline.style.display = 'none';
        });

        tabBtnPipeline.addEventListener('click', () => {
            tabBtnPipeline.classList.add('active');
            tabBtnSysinfo.classList.remove('active');
            tabPipeline.style.display = 'block';
            tabSysinfo.style.display = 'none';
        });
    }

    const sysinfoLines = [
        { text: 'Initializing metrics collector...', delay: 300, type: 'gray' },
        { text: '✓ Connection to AWS Established [ap-south-1]', delay: 700, type: 'green' },
        { text: '✓ Kubernetes Cluster Status: <span class="status-pill text-green">HEALTHY</span>', delay: 1100, type: 'green' },
        { text: '✓ Active Role: DevOps Engineer at SimplyFI Innovations', delay: 1500, type: 'green' },
        { text: '✓ Educational Milestone: MCA \'26 Candidate', delay: 1900, type: 'green' },
        { text: '<div class="stats-line"><span class="c-teal">Docker Images:</span> 12 | <span class="c-teal">Pipelines Run:</span> 1,248 | <span class="c-teal">Uptime:</span> 99.99%</div>', delay: 2300, isHtml: true }
    ];

    function playSysinfo() {
        if (!sysinfoLogs) return;
        sysinfoLogs.innerHTML = '';
        sysinfoLines.forEach(line => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.style.marginBottom = '0.5rem';
                if (line.isHtml) {
                    p.innerHTML = line.text;
                } else {
                    const colorClass = line.type === 'green' ? 'c-green' : (line.type === 'gray' ? 'c-gray' : '');
                    const prefix = line.type === 'green' ? '<span class="c-green">✓</span> ' : '';
                    const coreText = line.text.replace('✓ ', '');
                    p.innerHTML = `${prefix}<span class="${colorClass}">${coreText}</span>`;
                }
                sysinfoLogs.appendChild(p);
            }, line.delay);
        });
    }

    // Auto-run sysinfo script on page load
    playSysinfo();

    // ----------------------------------------------------
    // 8. CI/CD Pipeline Simulator Loop
    // ----------------------------------------------------
    const btnTriggerPipeline = document.getElementById('btnTriggerPipeline');
    const pipelineLogs = document.getElementById('pipelineLogs');
    const pipelineStatusText = document.getElementById('pipelineStatusText');
    
    // Nodes & Connectors
    const nodes = {
        source: document.getElementById('node-source'),
        build: document.getElementById('node-build'),
        scan: document.getElementById('node-scan'),
        deploy: document.getElementById('node-deploy'),
        monitor: document.getElementById('node-monitor')
    };

    const connectors = {
        conn1: document.getElementById('conn-1'),
        conn2: document.getElementById('conn-2'),
        conn3: document.getElementById('conn-3'),
        conn4: document.getElementById('conn-4')
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    function logToPipeline(text, type = 'info') {
        if (!pipelineLogs) return;
        const p = document.createElement('p');
        p.style.margin = '0 0 0.35rem 0';
        let colorClass = 'c-gray';
        if (type === 'success') colorClass = 'c-green';
        if (type === 'warning') colorClass = 'c-yellow';
        if (type === 'error') colorClass = 'c-red';
        if (type === 'cmd') colorClass = 'c-teal';
        p.innerHTML = `<span class="${colorClass}">${text}</span>`;
        pipelineLogs.appendChild(p);
        pipelineLogs.scrollTop = pipelineLogs.scrollHeight;
    }

    async function runPipelineSimulation() {
        if (!btnTriggerPipeline || !pipelineLogs || !pipelineStatusText) return;

        // Reset state
        btnTriggerPipeline.disabled = true;
        pipelineStatusText.textContent = 'Executing...';
        pipelineStatusText.style.color = 'var(--teal)';
        pipelineLogs.innerHTML = '';

        // Reset nodes & connectors classes
        Object.values(nodes).forEach(n => {
            if (n) n.className = 'pipeline-node';
        });
        Object.values(connectors).forEach(c => {
            if (c) c.className = 'pipeline-connector';
        });

        // Stage 1: Commit
        logToPipeline('$ git commit -m "feat(rollout): optimize replica count" && git push origin main', 'cmd');
        await sleep(400);
        if (nodes.source) nodes.source.classList.add('active');
        logToPipeline('[source] Fetching commit delta from remote...', 'info');
        await sleep(600);
        logToPipeline('[source] Commit verified: sha1 9f3e4b09', 'success');
        logToPipeline('[source] Triggering pipeline execution via webhook...', 'info');
        await sleep(500);
        if (nodes.source) {
            nodes.source.classList.remove('active');
            nodes.source.classList.add('success');
        }

        // Connector 1 Pulse
        if (connectors.conn1) connectors.conn1.classList.add('running');
        await sleep(1000);
        if (connectors.conn1) connectors.conn1.classList.add('success');

        // Stage 2: Build
        if (nodes.build) nodes.build.classList.add('active');
        logToPipeline('[build] Cloning source code repository...', 'info');
        await sleep(500);
        logToPipeline('[build] Initiating docker container build process...', 'info');
        logToPipeline('[build] Running multi-stage Dockerfile executor...', 'info');
        await sleep(500);
        logToPipeline('[build] Docker: Step 1/8 FROM node:20-slim', 'info');
        logToPipeline('[build] Docker: Step 6/8 RUN npm run build', 'info');
        await sleep(700);
        logToPipeline('[build] Built container: mahesh45/portfolio:v2.1.0', 'success');
        logToPipeline('[build] Uploading container image to Docker Hub registry...', 'info');
        await sleep(600);
        logToPipeline('[build] Image pushed to Docker Hub successfully.', 'success');
        if (nodes.build) {
            nodes.build.classList.remove('active');
            nodes.build.classList.add('success');
        }

        // Connector 2 Pulse
        if (connectors.conn2) connectors.conn2.classList.add('running');
        await sleep(1000);
        if (connectors.conn2) connectors.conn2.classList.add('success');

        // Stage 3: Scan (Security)
        if (nodes.scan) nodes.scan.classList.add('active');
        logToPipeline('[scan] Initializing container image vulnerability scanner (Trivy)...', 'info');
        await sleep(600);
        logToPipeline('[scan] Scanning mahesh45/portfolio:v2.1.0...', 'info');
        await sleep(500);
        logToPipeline('[scan] Trivy: 0 Critical | 1 High | 4 Medium vulnerabilities detected', 'success');
        logToPipeline('[scan] Security Gate Passed. Quality threshold matches rules.', 'success');
        if (nodes.scan) {
            nodes.scan.classList.remove('active');
            nodes.scan.classList.add('success');
        }

        // Connector 3 Pulse
        if (connectors.conn3) connectors.conn3.classList.add('running');
        await sleep(1000);
        if (connectors.conn3) connectors.conn3.classList.add('success');

        // Stage 4: Deploy
        if (nodes.deploy) nodes.deploy.classList.add('active');
        logToPipeline('[deploy] Establishing secure context connection to AWS EKS...', 'info');
        await sleep(500);
        logToPipeline('[deploy] Fetching current deployment manifest files...', 'info');
        logToPipeline('[deploy] kubectl apply -f k8s/deployment.yaml', 'cmd');
        await sleep(600);
        logToPipeline('[deploy] deployment.apps/portfolio-app rolling update initiated', 'info');
        logToPipeline('[deploy] Waiting for replicas rollout status...', 'info');
        await sleep(500);
        logToPipeline('[deploy] Replica 1/2: Running. Replica 2/2: Running.', 'success');
        logToPipeline('[deploy] Service cluster ip active: routing rules configured.', 'success');
        if (nodes.deploy) {
            nodes.deploy.classList.remove('active');
            nodes.deploy.classList.add('success');
        }

        // Connector 4 Pulse
        if (connectors.conn4) connectors.conn4.classList.add('running');
        await sleep(1000);
        if (connectors.conn4) connectors.conn4.classList.add('success');

        // Stage 5: Monitor
        if (nodes.monitor) nodes.monitor.classList.add('active');
        logToPipeline('[monitor] Syncing alert rules to Alertmanager...', 'info');
        await sleep(500);
        logToPipeline('[monitor] Fetching container HTTP probe status...', 'info');
        await sleep(700);
        logToPipeline('[monitor] Healthcheck endpoint /health: 200 OK', 'success');
        logToPipeline('[monitor] Prometheus metrics scraping activated.', 'success');
        if (nodes.monitor) {
            nodes.monitor.classList.remove('active');
            nodes.monitor.classList.add('success');
        }

        logToPipeline('&nbsp;', 'info');
        logToPipeline('✓ PIPELINE COMPLETION STATUS: SUCCESS (Code: 200 OK)', 'success');
        logToPipeline('All stages finalized in 10.42 seconds.', 'success');
        
        pipelineStatusText.textContent = 'Pipeline Succeeded ✓';
        pipelineStatusText.style.color = '#10b981';
        btnTriggerPipeline.disabled = false;
    }

    if (btnTriggerPipeline) {
        btnTriggerPipeline.addEventListener('click', runPipelineSimulation);
    }

    // ----------------------------------------------------
    // 9. DevOps Custom Cursor & Particle Emitter
    // ----------------------------------------------------
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');

    // Only activate cursor if not a mobile device (based on screen width/touch checks)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth > 768 && !isTouchDevice;

    if (cursor && follower && isDesktop) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly position the small core pointer dot
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        // Use requestAnimationFrame for a smooth, laggy trailing ring follower
        function updateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(updateFollower);
        }
        requestAnimationFrame(updateFollower);

        // Event delegation on document to dynamically catch hovers on any interactive element
        const hoverSelector = 'a, button, input, textarea, select, .interactive-chip, .btn, .nav-link, .console-tab, #clearTerminalBtn, .terminal-btn-quick';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverSelector)) {
                cursor.classList.add('hovered');
                follower.classList.add('hovered');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverSelector)) {
                cursor.classList.remove('hovered');
                follower.classList.remove('hovered');
            }
        });

        // Click effect: spawn digital particle trail of 1s, 0s, and brackets
        document.addEventListener('click', (e) => {
            const particleCount = 6;
            const characters = ['0', '1', '{', '}', '+', '-', '<', '>', '/'];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.className = 'cursor-particle';
                
                // Pick a random DevOps symbol
                particle.textContent = characters[Math.floor(Math.random() * characters.length)];
                
                // Position at current cursor coordinates
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;
                
                // Random drift angles and distances
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                // Assign CSS custom variables for keyframe interpolation
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                
                document.body.appendChild(particle);
                
                // Clean up DOM after animation completes
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        });
    }
});
