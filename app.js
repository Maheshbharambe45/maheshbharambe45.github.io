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
  <span class="c-teal">deploy</span>         - Trigger the visual GitOps CI/CD pipeline
  <span class="c-teal">kubernetes</span>     - Query EKS cluster pod metrics
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
        deploy: () => {
            const triggerBtn = document.getElementById('pipelineTriggerBtn');
            if (triggerBtn) {
                triggerBtn.click();
                return `<span class="c-green">Triggered CI/CD GitOps Pipeline via CLI.</span> Check the DevOps Sandbox dashboard below for visual pipeline tracking!`;
            }
            return `<span class="c-red">Error: CI/CD Pipeline Simulator visual components not found.</span>`;
        },
        kubernetes: () => {
            return `EKS Cluster Status: <span class="c-green">Active (Self-Healing)</span>
Replicas Running:   <span class="c-teal">4/4 Pods</span>
Active Namespace:   <span class="c-purple">production-env</span>
Services Exposed:   api-gateway (Port: 80), web-app (Port: 443)

Type <span class="c-yellow">deploy</span> to trigger a fresh rollout!`;
        },
        k8s: () => {
            return commands.kubernetes();
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
        const cmdHistory = [];
        let historyIndex = -1;

        // Direct focus to input on clicking terminal body
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputVal = terminalInput.value.trim();
                const cleanInput = inputVal.toLowerCase();
                
                if (inputVal !== '') {
                    // Push to history
                    cmdHistory.push(inputVal);
                    if (cmdHistory.length > 50) cmdHistory.shift();
                    historyIndex = cmdHistory.length;

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
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (cmdHistory.length > 0 && historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = cmdHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = cmdHistory[historyIndex];
                } else {
                    historyIndex = cmdHistory.length;
                    terminalInput.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const inputVal = terminalInput.value.trim().toLowerCase();
                if (inputVal === '') return;

                const commandList = Object.keys(commands).concat(['clear', 'sudo']);
                const matches = commandList.filter(cmd => cmd.startsWith(inputVal));

                if (matches.length === 1) {
                    terminalInput.value = matches[0] + ' ';
                } else if (matches.length > 1) {
                    createOutputLine(`<span class="terminal-prompt"><span class="c-teal">mahesh</span>@<span class="c-purple">portfolio</span>:~$</span> <span class="text-white">${terminalInput.value}</span>`);
                    createOutputLine(matches.map(m => `<span class="c-teal">${m}</span>`).join('  '));
                    
                    terminalBody.appendChild(currentInputRow);
                    terminalInput.focus();
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
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
        { text: '<div class="stats-line"><span class="stat-item"><span class="c-teal">Docker Images:</span> 12</span> <span class="stat-divider">|</span> <span class="stat-item"><span class="c-teal">Pipelines Run:</span> 1,248</span> <span class="stat-divider">|</span> <span class="stat-item"><span class="c-teal">Uptime:</span> 99.99%</span></div>', delay: 2300, isHtml: true }
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

    // Only activate cursor if not a mobile device (based on screen width)
    const isDesktop = window.innerWidth > 768;

    if (cursor && follower && isDesktop) {
        document.body.classList.add('custom-cursor-active');
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

    // ----------------------------------------------------
    // 10. Git Activity & Live Analytics
    // ----------------------------------------------------
    const githubUsername = 'Maheshbharambe45';
    
    // Fetch live statistics from GitHub API
    async function fetchGitHubStats() {
        const repoEl = document.getElementById('githubRepos');
        const followersEl = document.getElementById('githubFollowers');
        const yearsEl = document.getElementById('githubYears');
        
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}`);
            if (!response.ok) throw new Error('API fetch failed');
            
            const data = await response.json();
            
            // Update repositories and followers
            if (repoEl) repoEl.textContent = data.public_repos ?? 0;
            if (followersEl) followersEl.textContent = data.followers ?? 0;
            
            // Calculate active years
            if (data.created_at) {
                const createdDate = new Date(data.created_at);
                const currentDate = new Date();
                const diffTime = Math.abs(currentDate - createdDate);
                const diffYears = (diffTime / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
                if (yearsEl) yearsEl.textContent = `${diffYears} yrs`;
            }
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            // Fallback static metrics if API rate limit exceeded
            if (repoEl) repoEl.textContent = '14';
            if (followersEl) followersEl.textContent = '8';
            if (yearsEl) yearsEl.textContent = '2.5 yrs';
        }
    }
    
    // Generate contribution calendar cells dynamically
    function generateHeatmap() {
        const grid = document.getElementById('heatmapGrid');
        if (!grid) return;
        
        // Create tooltip element dynamically if not present
        let tooltip = document.querySelector('.heatmap-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'heatmap-tooltip';
            document.body.appendChild(tooltip);
        }
        
        // Detailed realistic DevOps commit messages
        const devopsCommits = [
            "Configured multi-stage Docker build for backend",
            "Deployed Prometheus dashboard cluster metrics tracking",
            "Provisioned AWS VPC, subnets, and Route53 DNS with Terraform",
            "Optimized Kubernetes replica configurations in deployment manifest",
            "Resolved Jenkins pipeline agent container compilation error",
            "Integrated SonarQube static analysis code checks in CI phase",
            "Configured AWS RDS Multi-AZ failover backend settings",
            "Updated bash scripting automated cron jobs on EC2 instance",
            "Setup Docker Compose local development testing profiles",
            "Secured ingress controllers using Let's Encrypt SSL certificates",
            "Added Trivy image vulnerability container scanning script",
            "Configured ArgoCD automated synchronization status check",
            "Created Ansible playbooks for server package deployment audits",
            "Configured Nginx reverse proxy routes for service communication",
            "Wrote unit tests configuration using pytest automation",
            "Updated dev credentials securely in AWS Systems Manager",
            "Optimized Grafana visualization alerting thresholds",
            "Setup Github Webhook repository automated trigger",
            "Refined IAM policies to apply principal of least privilege",
            "Fixed Docker Scout scan warning inside staging container"
        ];
        
        // Helper to check if a year is leap
        const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        
        const today = new Date();
        const totalDays = isLeapYear(today.getFullYear()) ? 366 : 365;
        
        // Start from 365 days ago, adjusted to align weekdays
        const calendarStart = new Date(today);
        calendarStart.setDate(today.getDate() - totalDays);
        
        // Generate contribution cells
        for (let i = 0; i <= totalDays; i++) {
            const cellDate = new Date(calendarStart);
            cellDate.setDate(calendarStart.getDate() + i);
            
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            // Randomly seed commit levels (representing active activity)
            // 0: 60%, 1: 20%, 2: 10%, 3: 7%, 4: 3%
            const r = Math.random();
            let commits = 0;
            let level = 0;
            
            if (r > 0.97) {
                commits = 4 + Math.floor(Math.random() * 4);
                level = 4;
            } else if (r > 0.90) {
                commits = 3;
                level = 3;
            } else if (r > 0.80) {
                commits = 2;
                level = 2;
            } else if (r > 0.60) {
                commits = 1;
                level = 1;
            }
            
            if (level > 0) {
                cell.classList.add(`lvl-${level}`);
            }
            
            // Set cell details data attributes
            const formattedDate = cellDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            let commitText = 'No contributions';
            if (commits > 0) {
                const logs = [];
                for (let k = 0; k < Math.min(commits, 3); k++) {
                    logs.push(`• ${devopsCommits[Math.floor(Math.random() * devopsCommits.length)]}`);
                }
                commitText = `${commits} contribution${commits > 1 ? 's' : ''} on ${formattedDate}<br>${logs.join('<br>')}`;
            } else {
                commitText = `No contributions on ${formattedDate}`;
            }
            
            cell.dataset.tooltipContent = commitText;
            
            // Add event listeners for tooltip
            cell.addEventListener('mouseenter', (e) => {
                tooltip.innerHTML = e.target.dataset.tooltipContent;
                tooltip.style.opacity = '1';
                
                // Position initial check
                const rect = cell.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX - tooltip.offsetWidth / 2 + 6}px`;
                tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;
            });
            
            cell.addEventListener('mousemove', (e) => {
                // Smooth moving tracking
                tooltip.style.left = `${e.clientX - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${e.clientY - tooltip.offsetHeight - 12}px`;
            });
            
            cell.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
            
            grid.appendChild(cell);
        }
    }
    

    // ----------------------------------------------------
    // 6. Skills Radar Chart (Pure Canvas)
    // ----------------------------------------------------
    function initRadarChart() {
        const canvas = document.getElementById('skillsRadarChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        const chartData = [
            { label: 'Cloud (AWS)', value: 85 },
            { label: 'Containers (K8s)', value: 80 },
            { label: 'IaC (Terraform)', value: 75 },
            { label: 'CI/CD (Jenkins)', value: 90 },
            { label: 'Scripting (Python)', value: 80 },
            { label: 'Monitoring (Prom)', value: 75 }
        ];

        function resizeChart() {
            const rect = canvas.parentNode.getBoundingClientRect();
            const size = Math.min(rect.width, rect.height, 280);
            canvas.width = size * window.devicePixelRatio;
            canvas.height = size * window.devicePixelRatio;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            drawChart(size);
        }

        function drawChart(size) {
            const cx = size / 2;
            const cy = size / 2;
            const radius = size * 0.33;
            const numSides = chartData.length;
            const angleStep = (Math.PI * 2) / numSides;

            // Clear canvas
            ctx.clearRect(0, 0, size, size);

            // Draw concentric hexagon grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let r = 1; r <= 5; r++) {
                const currentRadius = (radius / 5) * r;
                ctx.beginPath();
                for (let i = 0; i < numSides; i++) {
                    const angle = i * angleStep - Math.PI / 2;
                    const x = cx + currentRadius * Math.cos(angle);
                    const y = cy + currentRadius * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();

                // Grid label values
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.font = '8px monospace';
                ctx.fillText(r * 20, cx - 14, cy - currentRadius + 3);
            }

            // Draw axes and labels
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            for (let i = 0; i < numSides; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = cx + radius * Math.cos(angle);
                const y = cy + radius * Math.sin(angle);
                
                // Draw axis line
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(x, y);
                ctx.stroke();

                // Category labels
                const labelRadius = radius + 15;
                const lx = cx + labelRadius * Math.cos(angle);
                const ly = cy + labelRadius * Math.sin(angle);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.font = '10px Courier New, monospace';
                ctx.textBaseline = 'middle';

                // Prevent labels from clipping on margins
                if (Math.abs(Math.cos(angle)) < 0.1) {
                    ctx.textAlign = 'center';
                } else if (Math.cos(angle) > 0) {
                    ctx.textAlign = 'left';
                } else {
                    ctx.textAlign = 'right';
                }

                ctx.fillText(chartData[i].label, lx, ly);
            }

            // Draw data polygon
            ctx.beginPath();
            for (let i = 0; i < numSides; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const valPercent = chartData[i].value / 100;
                const x = cx + (radius * valPercent) * Math.cos(angle);
                const y = cy + (radius * valPercent) * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Glow border
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
            ctx.lineWidth = 2;
            ctx.shadowColor = 'rgba(0, 242, 254, 0.5)';
            ctx.shadowBlur = 10;
            ctx.stroke();

            // Reset shadows for fill
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;

            // Fill shape
            const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius);
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
            gradient.addColorStop(1, 'rgba(0, 242, 254, 0.25)');
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw glowing vertex dots
            for (let i = 0; i < numSides; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const valPercent = chartData[i].value / 100;
                const x = cx + (radius * valPercent) * Math.cos(angle);
                const y = cy + (radius * valPercent) * Math.sin(angle);

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#00f2fe';
                ctx.shadowColor = '#00f2fe';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }
        }

        window.addEventListener('resize', resizeChart);
        resizeChart();
    }
    
    // ----------------------------------------------------
    // 7. DevOps Sandbox Simulator (Pipeline & K8s)
    // ----------------------------------------------------
    function initSandbox() {
        // --- CI/CD Pipeline Simulator Logic ---
        const pipelineTriggerBtn = document.getElementById('pipelineTriggerBtn');
        const pipelineLogs = document.getElementById('pipelineLogs');
        const stages = {
            source: document.getElementById('stage-source'),
            build: document.getElementById('stage-build'),
            scan: document.getElementById('stage-scan'),
            deploy: document.getElementById('stage-deploy')
        };
        const connectors = {
            conn1: document.getElementById('conn-1'),
            conn2: document.getElementById('conn-2'),
            conn3: document.getElementById('conn-3')
        };

        let isPipelineRunning = false;

        function addLogLine(text, type = 'info') {
            if (!pipelineLogs) return;
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            const timestamp = new Date().toLocaleTimeString();
            
            let colorClass = 'text-white';
            if (type === 'system') colorClass = 'text-muted';
            else if (type === 'cmd') colorClass = 'c-yellow';
            else if (type === 'success') colorClass = 'c-green';
            else if (type === 'error') colorClass = 'c-red';
            else if (type === 'warning') colorClass = 'c-orange';

            logLine.innerHTML = `<span class="text-muted">[${timestamp}]</span> <span class="${colorClass}">${text}</span>`;
            pipelineLogs.appendChild(logLine);
            pipelineLogs.scrollTop = pipelineLogs.scrollHeight;
        }

        async function runPipeline() {
            if (isPipelineRunning) return;
            isPipelineRunning = true;
            pipelineTriggerBtn.disabled = true;
            pipelineTriggerBtn.innerHTML = `<span class="btn-text">Running...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

            // Reset stages classes except Source
            Object.keys(stages).forEach(key => {
                if (key !== 'source') {
                    stages[key].className = 'pipeline-stage';
                    stages[key].querySelector('.stage-status').innerHTML = '<span class="status-dot"></span>Idle';
                }
            });
            Object.keys(connectors).forEach(key => connectors[key].classList.remove('active'));

            pipelineLogs.innerHTML = '';
            addLogLine('Initializing GitOps Pipeline Runner...', 'system');
            
            // --- STAGE 1: SOURCE ---
            await sleep(800);
            stages.source.className = 'pipeline-stage active';
            stages.source.querySelector('.stage-status').innerHTML = '<span class="status-dot running"></span>Syncing';
            addLogLine('$ git fetch origin master && git merge origin/master', 'cmd');
            await sleep(1000);
            addLogLine('Source sync completed. Commit revision: f8b7921a - Mahesh Bharambe - Update main layouts', 'success');
            stages.source.className = 'pipeline-stage success';
            stages.source.querySelector('.stage-status').innerHTML = '<span class="status-dot success"></span>Sync OK';

            // --- STAGE 2: BUILD ---
            connectors.conn1.classList.add('active');
            await sleep(1200);
            stages.build.className = 'pipeline-stage active';
            stages.build.querySelector('.stage-status').innerHTML = '<span class="status-dot running"></span>Compiling';
            addLogLine('$ docker build -t mahesh/app:latest .', 'cmd');
            addLogLine('Step 1/4 : FROM node:20-alpine', 'system');
            await sleep(800);
            addLogLine('Step 2/4 : WORKDIR /usr/src/app', 'system');
            addLogLine('Step 3/4 : COPY package*.json ./ && RUN npm install', 'system');
            await sleep(1000);
            addLogLine('Step 4/4 : COPY . . && EXPOSE 80 && CMD ["npm", "start"]', 'system');
            addLogLine('Successfully built container image: sha256:d8291a27f6 (412MB)', 'success');
            stages.build.className = 'pipeline-stage success';
            stages.build.querySelector('.stage-status').innerHTML = '<span class="status-dot success"></span>Build OK';

            // --- STAGE 3: SECURITY SCAN ---
            connectors.conn2.classList.add('active');
            await sleep(1200);
            stages.scan.className = 'pipeline-stage active';
            stages.scan.querySelector('.stage-status').innerHTML = '<span class="status-dot running"></span>Auditing';
            addLogLine('$ trivy image --severity HIGH,CRITICAL mahesh/app:latest', 'cmd');
            await sleep(1500);
            addLogLine('Trivy scan results: 0 Critical, 0 High, 4 Medium, 9 Low vulnerabilities found.', 'success');
            addLogLine('DevSecOps policy check passed. Container image integrity signed.', 'success');
            stages.scan.className = 'pipeline-stage success';
            stages.scan.querySelector('.stage-status').innerHTML = '<span class="status-dot success"></span>Scan OK';

            // --- STAGE 4: DEPLOY ---
            connectors.conn3.classList.add('active');
            await sleep(1200);
            stages.deploy.className = 'pipeline-stage active';
            stages.deploy.querySelector('.stage-status').innerHTML = '<span class="status-dot running"></span>Rolling Out';
            addLogLine('$ helm upgrade --install web-app ./charts/web-app', 'cmd');
            await sleep(800);
            addLogLine('Deploying EKS manifests to namespace production-env...', 'system');
            addLogLine('Deployment spec updated. Initiating replica rollout.', 'warning');
            
            // Trigger visual replica restart in K8s Visualizer
            k8sRollingUpgradeSim();

            await sleep(1200);
            addLogLine('Release "web-app" upgraded. Rolling update finished.', 'success');
            stages.deploy.className = 'pipeline-stage success';
            stages.deploy.querySelector('.stage-status').innerHTML = '<span class="status-dot success"></span>Deploy OK';
            addLogLine('Pipeline execution finished successfully! EKS Cluster synced. 🚀', 'success');

            pipelineTriggerBtn.disabled = false;
            pipelineTriggerBtn.innerHTML = `<span class="btn-text">Run Pipeline</span> <i class="fa-solid fa-play"></i>`;
            isPipelineRunning = false;
        }

        if (pipelineTriggerBtn) {
            pipelineTriggerBtn.addEventListener('click', runPipeline);
        }


        // --- K8S Cluster Visualizer Logic ---
        const podGrid = document.getElementById('podGrid');
        const podCountTag = document.getElementById('podCountTag');
        const k8sScaleBtn = document.getElementById('k8sScaleBtn');
        const k8sOutageBtn = document.getElementById('k8sOutageBtn');
        const podDetailsContent = document.getElementById('podDetailsContent');

        let pods = [
            { id: 1, name: 'frontend-replica-1', ip: '10.244.0.11', cpu: '12%', mem: '140MB', status: 'running' },
            { id: 2, name: 'backend-replica-1', ip: '10.244.0.12', cpu: '18%', mem: '244MB', status: 'running' },
            { id: 3, name: 'auth-service-1', ip: '10.244.0.13', cpu: '5%', mem: '98MB', status: 'running' },
            { id: 4, name: 'api-gateway-1', ip: '10.244.0.14', cpu: '22%', mem: '180MB', status: 'running' }
        ];

        let podCounter = 4;

        function renderPods() {
            if (!podGrid) return;
            podGrid.innerHTML = '';
            
            pods.forEach(pod => {
                const node = document.createElement('div');
                node.id = `pod-${pod.id}`;
                node.className = `pod-node ${pod.status} active-pod`;
                
                let lightClass = '';
                if (pod.status === 'running') lightClass = 'running';
                else if (pod.status === 'pending') lightClass = 'pending';
                else if (pod.status === 'failed') lightClass = 'failed';

                node.innerHTML = `
                    <span class="pod-status-light ${lightClass}"></span>
                    <span class="pod-name">${pod.name}</span>
                `;
                
                node.addEventListener('click', () => showPodDetails(pod));
                podGrid.appendChild(node);
            });

            if (podCountTag) {
                const activeCount = pods.filter(p => p.status === 'running').length;
                podCountTag.textContent = `Active Pods: ${activeCount} / ${pods.length}`;
            }
        }

        function showPodDetails(pod) {
            document.querySelectorAll('.pod-node').forEach(n => n.classList.remove('selected'));
            const node = document.getElementById(`pod-${pod.id}`);
            if (node) node.classList.add('selected');

            podDetailsContent.innerHTML = `<pre class="yaml-code">apiVersion: v1
kind: Pod
metadata:
  name: ${pod.name}
  namespace: production-env
spec:
  containers:
  - name: web-app
    image: mahesh/app:latest
    ports:
    - containerPort: 80
status:
  phase: ${pod.status.toUpperCase()}
  podIP: ${pod.ip}
  resourceUsage:
    cpu: ${pod.cpu}
    memory: ${pod.mem}</pre>`;
        }

        async function scaleUp() {
            if (pods.length >= 6) {
                alert("Cluster resources limit reached (Max 6 Pods).");
                return;
            }
            podCounter++;
            const newId = podCounter;
            const newPod = {
                id: newId,
                name: `replica-scaler-${newId}`,
                ip: `10.244.0.${10 + newId}`,
                cpu: '0%',
                mem: '0MB',
                status: 'pending'
            };
            pods.push(newPod);
            renderPods();
            showPodDetails(newPod);

            // Container startup transition
            await sleep(1500);
            const podObj = pods.find(p => p.id === newId);
            if (podObj && podObj.status === 'pending') {
                podObj.status = 'running';
                podObj.cpu = `${10 + Math.floor(Math.random() * 15)}%`;
                podObj.mem = `${100 + Math.floor(Math.random() * 150)}MB`;
                renderPods();
                showPodDetails(podObj);
            }
        }

        async function triggerOutage() {
            const runningPods = pods.filter(p => p.status === 'running');
            if (runningPods.length === 0) return;

            // Kill a random pod
            const randomPod = runningPods[Math.floor(Math.random() * runningPods.length)];
            randomPod.status = 'failed';
            randomPod.cpu = '0%';
            randomPod.mem = '0MB';
            renderPods();
            showPodDetails(randomPod);

            // K8s scheduler response loop
            await sleep(2000);
            
            // Remove failed pod and initiate healing replica
            pods = pods.filter(p => p.id !== randomPod.id);
            podCounter++;
            const healerId = podCounter;
            const healerPod = {
                id: healerId,
                name: `self-healer-${healerId}`,
                ip: `10.244.0.${10 + healerId}`,
                cpu: '0%',
                mem: '0MB',
                status: 'pending'
            };
            pods.push(healerPod);
            renderPods();
            showPodDetails(healerPod);

            // Turn healer pod to running
            await sleep(1500);
            const activeHealer = pods.find(p => p.id === healerId);
            if (activeHealer) {
                activeHealer.status = 'running';
                activeHealer.cpu = `${10 + Math.floor(Math.random() * 15)}%`;
                activeHealer.mem = `${100 + Math.floor(Math.random() * 150)}MB`;
                renderPods();
                showPodDetails(activeHealer);
            }
        }

        async function k8sRollingUpgradeSim() {
            // Visually upgrade existing pods sequentially to represent Docker rollout
            for (let i = 0; i < pods.length; i++) {
                const pod = pods[i];
                pod.status = 'pending';
                pod.cpu = '0%';
                pod.mem = '0MB';
                renderPods();
                await sleep(800);
                
                pod.status = 'running';
                pod.cpu = `${12 + Math.floor(Math.random() * 10)}%`;
                pod.mem = `${120 + Math.floor(Math.random() * 120)}MB`;
                renderPods();
                await sleep(400);
            }
        }

        if (k8sScaleBtn) k8sScaleBtn.addEventListener('click', scaleUp);
        if (k8sOutageBtn) k8sOutageBtn.addEventListener('click', triggerOutage);

        // Helper sleep function
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Initial render
        renderPods();
    }

    // Initialize section
    fetchGitHubStats();
    generateHeatmap();
    initRadarChart();
    initSandbox();
});
