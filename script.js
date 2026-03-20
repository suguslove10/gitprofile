/* ══════════════════════════════════════════════════
   PARTICLE CANVAS — Network Topology Animation
══════════════════════════════════════════════════ */
(function initCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const COUNT = 70;
  const DIST  = 140;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.8 + 0.6,
      blue: Math.random() > 0.45,
      a:  Math.random() * 0.5 + 0.2,
    }));
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < DIST) {
          const alpha = (1 - dist / DIST) * 0.28;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,180,255,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.blue ? `rgba(0,180,255,${p.a})` : `rgba(0,245,212,${p.a})`;
      ctx.fill();
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  createParticles();
  loop();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();


/* ══════════════════════════════════════════════════
   TYPEWRITER EFFECT
══════════════════════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const texts   = ['Cloud Engineer', 'DevOps Engineer', 'Kubernetes Wrangler', 'AWS Specialist', 'Infrastructure Nerd'];
  let tIdx      = 0;
  let charIdx   = 0;
  let deleting  = false;

  function type() {
    const full = texts[tIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = full.slice(0, charIdx);
      if (charIdx === full.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 75);
    } else {
      charIdx--;
      el.textContent = full.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 38);
    }
  }

  type();
})();


/* ══════════════════════════════════════════════════
   NAVBAR — Scroll Behaviour + Active Link
══════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled style
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════
   MOBILE HAMBURGER
══════════════════════════════════════════════════ */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ══════════════════════════════════════════════════
   SCROLL FADE-IN — IntersectionObserver
══════════════════════════════════════════════════ */
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger siblings in same parent
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.fade-up:not(.visible)'));
        const delay    = siblings.indexOf(e.target) * 80;
        setTimeout(() => e.target.classList.add('visible'), delay);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════
   STAT COUNTER ANIMATION
══════════════════════════════════════════════════ */
(function initCounters() {
  const nums = document.querySelectorAll('[data-target]');
  if (!nums.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1200;
      const step   = target / (dur / 16);
      let   cur    = 0;

      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(cur);
        }
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
})();


/* ══════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════ */
(function initBtt() {
  const btn = document.getElementById('btt');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ══════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ══════════════════════════════════════════════════
   SANDBOX TERMINAL ENGINE
══════════════════════════════════════════════════ */
(function initSandbox() {
  const output = document.getElementById('sbOutput');
  const input  = document.getElementById('sbInput');
  if (!output || !input) return;

  let cmdHistory = [];
  let histIdx    = -1;

  // ── Utilities ───────────────────────────────────────────
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function addLine(html) {
    const d = document.createElement('div');
    d.className = 'sb-line';
    d.innerHTML = html;
    output.appendChild(d);
    output.scrollTop = output.scrollHeight;
  }

  function addLines(lines, lineDelay = 22) {
    lines.forEach((l, i) => setTimeout(() => addLine(l), i * lineDelay));
  }

  function errLine(msg) {
    addLine(`<span class="sb-red">bash: ${esc(msg)}</span>`);
  }

  // ── Welcome screen ──────────────────────────────────────
  function welcome() {
    addLines([
      `<span class="sb-cyan">╔═══════════════════════════════════════════════════════╗</span>`,
      `<span class="sb-cyan">║</span>  <span class="sb-blue">✦ Sugu's Interactive Cloud Terminal</span> <span class="sb-dim">v1.0.0 (demo)</span>  <span class="sb-cyan">║</span>`,
      `<span class="sb-cyan">║</span>  <span class="sb-dim">Simulated DevOps env — explore freely</span>               <span class="sb-cyan">║</span>`,
      `<span class="sb-cyan">╚═══════════════════════════════════════════════════════╝</span>`,
      ``,
      `Type <span class="sb-yellow">help</span> to list all commands. Use <span class="sb-dim">↑ ↓</span> for history.`,
      `Start here: <span class="sb-yellow">kubectl get pods</span> · <span class="sb-yellow">terraform plan</span> · <span class="sb-yellow">neofetch</span>`,
      ``,
    ], 55);
  }

  // ── Command registry ────────────────────────────────────
  const CMDS = {

    help() {
      addLines([
        ``,
        `<span class="sb-cyan">╔═══ Commands ═══════════════════════════════════════════╗</span>`,
        `<span class="sb-cyan">║</span>                                                       <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-yellow">whoami / about</span>    Who is Sugu?                      <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-yellow">skills</span>            Full tech stack breakdown          <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-yellow">projects</span>          List all projects                  <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-yellow">project [1-4]</span>     Deep-dive a project               <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-yellow">certs</span>             Certifications                    <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-yellow">contact</span>           Get in touch                      <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>                                                       <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-green">kubectl get pods|nodes|deployments</span>                   <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-green">terraform plan|init|version</span>                          <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-green">docker ps|images</span>                                     <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-green">aws s3 ls|ec2 describe-instances</span>                     <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-green">git log --oneline|status|branch</span>                      <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-green">neofetch|uptime|top|ping|ls|cat|echo|date</span>            <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>                                                       <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-red">sudo hire sugu</span>    🔑 secret command                  <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">║</span>  <span class="sb-dim">clear · history · exit · resume</span>                     <span class="sb-cyan">║</span>`,
        `<span class="sb-cyan">╚═══════════════════════════════════════════════════════╝</span>`,
        ``,
      ], 14);
    },

    whoami() {
      addLines([
        ``,
        `  <span class="sb-blue">Name:</span>      Suguresh (Sugu)`,
        `  <span class="sb-blue">Role:</span>      Associate Cloud &amp; DevOps Engineer`,
        `  <span class="sb-blue">Company:</span>   Seabed2Crest`,
        `  <span class="sb-blue">Location:</span>  Bangalore, India 🇮🇳`,
        `  <span class="sb-blue">Focus:</span>     AWS · Kubernetes · Terraform · CI/CD`,
        `  <span class="sb-blue">GitHub:</span>    github.com/suguslove10`,
        ``,
        `  <span class="sb-dim">"Automate it once, trust it always."</span>`,
        ``,
        `  <span class="sb-green">● Open to full-time roles</span>`,
        ``,
      ], 28);
    },

    skills() {
      addLines([
        ``,
        `<span class="sb-cyan">── Cloud ────────────────────────────────────────────────</span>`,
        `  <span class="sb-yellow">AWS</span>         EC2 · EKS · S3 · VPC · IAM · Route53 · ACM · CloudWatch`,
        `  <span class="sb-yellow">GCP</span>         Compute Engine · GKE · Cloud Storage`,
        ``,
        `<span class="sb-cyan">── Containers &amp; Orchestration ──────────────────────────</span>`,
        `  <span class="sb-yellow">Docker</span>      Containerization · Multi-stage builds · Compose`,
        `  <span class="sb-yellow">Kubernetes</span>  EKS · Helm · HPA/VPA · RBAC · Network Policies`,
        `  <span class="sb-yellow">ArgoCD</span>      GitOps · App of Apps · Sync Waves`,
        ``,
        `<span class="sb-cyan">── Infrastructure as Code ───────────────────────────────</span>`,
        `  <span class="sb-yellow">Terraform</span>   Modules · Remote State · Atlantis · Workspaces`,
        `  <span class="sb-yellow">Ansible</span>     Playbooks · Roles · Dynamic Inventory`,
        ``,
        `<span class="sb-cyan">── CI / CD ──────────────────────────────────────────────</span>`,
        `  <span class="sb-yellow">GitHub Actions</span>  Workflows · Matrix builds · OIDC auth to AWS`,
        `  <span class="sb-yellow">Jenkins</span>         Declarative Pipelines · Shared Libraries`,
        ``,
        `<span class="sb-cyan">── Monitoring ───────────────────────────────────────────</span>`,
        `  <span class="sb-yellow">Prometheus</span>  Exporters · PromQL · Recording Rules · SLO`,
        `  <span class="sb-yellow">Grafana</span>     Dashboards · Alerting · Data source federation`,
        ``,
        `<span class="sb-cyan">── Languages / OS ───────────────────────────────────────</span>`,
        `  <span class="sb-yellow">Python · Bash · YAML</span>   Linux · Git`,
        ``,
      ], 22);
    },

    projects() {
      addLines([
        ``,
        `  <span class="sb-dim">#   Project                          Stack</span>`,
        `  <span class="sb-dim">───────────────────────────────────────────────────────</span>`,
        `  <span class="sb-cyan">1</span>   Production EKS Cluster           EKS · Terraform · ArgoCD · Helm`,
        `  <span class="sb-cyan">2</span>   Zero-Downtime CI/CD Pipeline     GitHub Actions · Docker · ECR`,
        `  <span class="sb-cyan">3</span>   AWS Multi-Env IaC                Terraform · VPC · Atlantis`,
        `  <span class="sb-cyan">4</span>   Full-Stack Observability         Prometheus · Grafana · AlertManager`,
        ``,
        `  Type <span class="sb-yellow">project 1</span> through <span class="sb-yellow">project 4</span> for deep-dive details.`,
        ``,
      ], 28);
    },

    project(args) {
      const n = parseInt(args[0]);
      const details = {
        1: [
          ``,
          `<span class="sb-cyan">── Project 1: Production EKS Cluster on AWS ─────────────</span>`,
          ``,
          `  <span class="sb-blue">Problem:</span>  App team needed production K8s with GitOps delivery`,
          `  <span class="sb-blue">Stack:</span>    AWS EKS · Terraform · ArgoCD · Helm · HPA/VPA · ALB`,
          ``,
          `  <span class="sb-blue">What I built:</span>`,
          `    • Multi-AZ EKS cluster provisioned with Terraform modules`,
          `    • ArgoCD for GitOps — git push triggers deployment automatically`,
          `    • HPA/VPA for workload autoscaling under variable load`,
          `    • AWS ALB Ingress for TLS termination + path-based routing`,
          `    • Pod Disruption Budgets for zero-downtime cluster upgrades`,
          ``,
          `  <span class="sb-green">Result:</span>  99.9% uptime · 40% cost cut via right-sizing`,
          ``,
        ],
        2: [
          ``,
          `<span class="sb-cyan">── Project 2: Zero-Downtime CI/CD Pipeline ──────────────</span>`,
          ``,
          `  <span class="sb-blue">Problem:</span>  Manual deploys took 2+ hrs with regular downtime windows`,
          `  <span class="sb-blue">Stack:</span>    GitHub Actions · Docker · ECR · EKS · Blue/Green`,
          ``,
          `  <span class="sb-blue">Pipeline stages:</span>`,
          `    lint ──→ unit test ──→ docker build`,
          `    ──→ ecr push ──→ eks rolling update`,
          `    ──→ smoke test ──→ slack notify`,
          ``,
          `  <span class="sb-blue">Key features:</span>`,
          `    • Blue/Green strategy — absolutely zero downtime`,
          `    • Auto-rollback on failed smoke test`,
          `    • OIDC-based AWS auth (no long-lived credentials)`,
          ``,
          `  <span class="sb-green">Result:</span>  2 hrs ──→ 8 min · 100% automated · no deploy anxiety`,
          ``,
        ],
        3: [
          ``,
          `<span class="sb-cyan">── Project 3: AWS Multi-Env Infrastructure as Code ──────</span>`,
          ``,
          `  <span class="sb-blue">Problem:</span>  Snowflake dev/staging/prod — inconsistent, fragile, manual`,
          `  <span class="sb-blue">Stack:</span>    Terraform · VPC · EC2 · RDS · IAM · Route53 · Atlantis`,
          ``,
          `  <span class="sb-blue">Architecture:</span>`,
          `    • Reusable modules per resource type`,
          `    • Workspace-based env separation (dev / staging / prod)`,
          `    • Remote state: S3 + DynamoDB locking`,
          `    • Atlantis for PR-based plan/apply approval workflow`,
          `    • Scheduled drift detection via cron + terraform plan`,
          ``,
          `  <span class="sb-green">Result:</span>  100% reproducible · 70% faster provisioning`,
          ``,
        ],
        4: [
          ``,
          `<span class="sb-cyan">── Project 4: Full-Stack Observability Platform ─────────</span>`,
          ``,
          `  <span class="sb-blue">Problem:</span>  K8s running blind — users found issues before ops team`,
          `  <span class="sb-blue">Stack:</span>    Prometheus · Grafana · AlertManager · Helm · SLO`,
          ``,
          `  <span class="sb-blue">What I built:</span>`,
          `    • kube-prometheus-stack deployed via Helm on EKS`,
          `    • Custom Grafana dashboards: cluster, pods, network, SLO`,
          `    • AlertManager with PagerDuty escalation policies`,
          `    • Runbook links embedded directly in alert body`,
          `    • Recording rules for faster dashboard queries`,
          ``,
          `  <span class="sb-green">Result:</span>  MTTR 45min ──→ 8min · 15+ alert rules · SLO live`,
          ``,
        ],
      };
      if (details[n]) {
        addLines(details[n], 22);
      } else {
        errLine(`project: usage: project [1|2|3|4]`);
      }
    },

    certs() {
      addLines([
        ``,
        `  <span class="sb-yellow">✓</span>  <span class="sb-blue">AWS Partner Technical Accredited</span>`,
        `     Amazon Web Services · 2024`,
        ``,
        `  <span class="sb-yellow">✓</span>  <span class="sb-blue">DevOps &amp; Software Engineering Fundamentals</span>`,
        `     IBM / Coursera · 2023`,
        ``,
        `  <span class="sb-yellow">✓</span>  <span class="sb-blue">Google Cloud Fundamentals: Core Infrastructure</span>`,
        `     Google Cloud · 2023`,
        ``,
        `  <span class="sb-dim">In progress: AWS Solutions Architect Associate ★</span>`,
        ``,
      ], 30);
    },

    contact() {
      addLines([
        ``,
        `  <span class="sb-blue">Email:</span>    suguresh@email.com`,
        `  <span class="sb-blue">GitHub:</span>   github.com/suguslove10`,
        `  <span class="sb-blue">LinkedIn:</span> linkedin.com/in/suguresh`,
        ``,
        `  <span class="sb-green">Open to:</span>  Full-time · Contract · Interesting infra challenges`,
        ``,
      ], 28);
    },

    kubectl(args) {
      const sub = args.join(' ').toLowerCase();
      if (/^get pods?/.test(sub)) {
        addLines([
          ``,
          `<span class="sb-dim">NAMESPACE     NAME                                      READY   STATUS    RESTARTS   AGE</span>`,
          `<span class="sb-dim">───────────────────────────────────────────────────────────────────────────────────</span>`,
          `default       <span class="sb-green">frontend-deploy-7d9f8c4b6-xk2pq</span>          1/1     <span class="sb-green">Running</span>   0          2d4h`,
          `default       <span class="sb-green">backend-api-5b9dc8f7d-m3nt8</span>              1/1     <span class="sb-green">Running</span>   0          2d4h`,
          `default       <span class="sb-green">postgres-sts-0</span>                            1/1     <span class="sb-green">Running</span>   1          5d12h`,
          `default       <span class="sb-green">redis-cache-6c4f9d8b5-j7xw2</span>              1/1     <span class="sb-green">Running</span>   0          3d8h`,
          `monitoring    <span class="sb-green">prometheus-server-76b8d9f4-k9p2m</span>         1/1     <span class="sb-green">Running</span>   0          7d`,
          `monitoring    <span class="sb-green">grafana-7f9c8d5b6-n4xq1</span>                  1/1     <span class="sb-green">Running</span>   0          7d`,
          `monitoring    <span class="sb-green">alertmanager-0</span>                            1/1     <span class="sb-green">Running</span>   0          7d`,
          `argocd        <span class="sb-green">argocd-server-5d8f9c7b4-p2lm3</span>            1/1     <span class="sb-green">Running</span>   0          14d`,
          `argocd        <span class="sb-green">argocd-repo-server-6f8c9d4b-n5xp2</span>        1/1     <span class="sb-green">Running</span>   0          14d`,
          `kube-system   <span class="sb-green">aws-node-4gk9s</span>                            1/1     <span class="sb-green">Running</span>   0          30d`,
          `kube-system   <span class="sb-green">coredns-5d78c9d6c-j2pqn</span>                  1/1     <span class="sb-green">Running</span>   0          30d`,
          ``,
          `<span class="sb-dim">All pods healthy · Cluster uptime: 30d 14h · Region: us-east-1</span>`,
          ``,
        ], 26);
      } else if (/^get nodes?/.test(sub)) {
        addLines([
          ``,
          `<span class="sb-dim">NAME                                            STATUS   ROLES    AGE   VERSION</span>`,
          `<span class="sb-dim">───────────────────────────────────────────────────────────────────────────────</span>`,
          `ip-10-0-1-42.us-east-1.compute.internal   <span class="sb-green">Ready</span>    &lt;none&gt;   30d   v1.28.5-eks-a59e1f0`,
          `ip-10-0-2-87.us-east-1.compute.internal   <span class="sb-green">Ready</span>    &lt;none&gt;   30d   v1.28.5-eks-a59e1f0`,
          `ip-10-0-3-156.us-east-1.compute.internal  <span class="sb-green">Ready</span>    &lt;none&gt;   30d   v1.28.5-eks-a59e1f0`,
          ``,
          `<span class="sb-dim">3/3 nodes ready · t3.medium · us-east-1a, 1b, 1c</span>`,
          ``,
        ], 32);
      } else if (/^get deploy/.test(sub)) {
        addLines([
          ``,
          `<span class="sb-dim">NAME              READY   UP-TO-DATE   AVAILABLE   AGE</span>`,
          `<span class="sb-dim">──────────────────────────────────────────────────────</span>`,
          `frontend-deploy   3/3     3            3           2d4h`,
          `backend-api       2/2     2            2           2d4h`,
          `redis-cache       1/1     1            1           3d8h`,
          ``,
        ], 30);
      } else if (sub === 'cluster-info') {
        addLines([
          ``,
          `Kubernetes control plane: <span class="sb-blue">https://ABC123XYZ.gr7.us-east-1.eks.amazonaws.com</span>`,
          `CoreDNS: <span class="sb-green">running</span>   kube-proxy: <span class="sb-green">running</span>   AWS CNI: <span class="sb-green">running</span>`,
          ``,
          `<span class="sb-green">Cluster healthy. 3 nodes · 12 pods running.</span>`,
          ``,
        ], 25);
      } else if (sub === 'version') {
        addLines([``, `Client Version: <span class="sb-yellow">v1.28.5</span>`, `Server Version: <span class="sb-yellow">v1.28.5-eks-a59e1f0</span>`, ``], 20);
      } else {
        errLine(`kubectl: unknown subcommand '${esc(sub)}'. Try: kubectl get pods|nodes|deployments|cluster-info`);
      }
    },

    terraform(args) {
      const sub = args[0];
      if (sub === 'plan') {
        addLines([
          ``,
          `<span class="sb-dim">Initializing the backend... done.</span>`,
          `<span class="sb-dim">Initializing provider plugins... hashicorp/aws v5.30.0</span>`,
          ``,
          `Terraform will perform the following actions:`,
          ``,
          `  <span class="sb-dim"># aws_eks_cluster.prod will be created</span>`,
          `  <span class="sb-green">+</span> resource <span class="sb-yellow">"aws_eks_cluster"</span> <span class="sb-blue">"prod"</span> {`,
          `      <span class="sb-green">+</span> name     = <span class="sb-yellow">"prod-eks-cluster"</span>`,
          `      <span class="sb-green">+</span> version  = <span class="sb-yellow">"1.28"</span>`,
          `      <span class="sb-green">+</span> role_arn = <span class="sb-yellow">"arn:aws:iam::123456789012:role/eks-role"</span>`,
          `      <span class="sb-green">+</span> endpoint = <span class="sb-dim">(known after apply)</span>`,
          `    }`,
          ``,
          `  <span class="sb-dim"># aws_eks_node_group.workers will be created</span>`,
          `  <span class="sb-green">+</span> resource <span class="sb-yellow">"aws_eks_node_group"</span> <span class="sb-blue">"workers"</span> {`,
          `      <span class="sb-green">+</span> cluster_name   = <span class="sb-yellow">"prod-eks-cluster"</span>`,
          `      <span class="sb-green">+</span> instance_types = <span class="sb-yellow">["t3.medium"]</span>`,
          `      <span class="sb-green">+</span> desired_size   = <span class="sb-yellow">3</span>  max_size = <span class="sb-yellow">10</span>`,
          `    }`,
          ``,
          `  <span class="sb-dim"># aws_vpc.main will be created</span>`,
          `  <span class="sb-green">+</span> resource <span class="sb-yellow">"aws_vpc"</span> <span class="sb-blue">"main"</span> {`,
          `      <span class="sb-green">+</span> cidr_block = <span class="sb-yellow">"10.0.0.0/16"</span>`,
          `      <span class="sb-green">+</span> id         = <span class="sb-dim">(known after apply)</span>`,
          `    }`,
          ``,
          `<span class="sb-dim">──────────────────────────────────────────────────────────</span>`,
          `<span class="sb-green">Plan: 12 to add, 2 to change, 0 to destroy.</span>`,
          ``,
          `<span class="sb-dim">Note: run terraform apply to execute.</span>`,
          ``,
        ], 28);
      } else if (sub === 'init') {
        addLines([
          ``,
          `<span class="sb-dim">Initializing the backend...</span>`,
          `<span class="sb-dim">- Downloading hashicorp/aws v5.30.0...</span>`,
          `<span class="sb-dim">- Downloading hashicorp/kubernetes v2.24.0...</span>`,
          ``,
          `<span class="sb-green">Terraform has been successfully initialized!</span>`,
          ``,
        ], 35);
      } else if (sub === 'apply') {
        addLines([
          ``,
          `<span class="sb-yellow">⚠ Demo environment — apply is disabled.</span>`,
          `Run <span class="sb-yellow">terraform plan</span> to preview the execution plan.`,
          ``,
        ], 20);
      } else if (sub === 'version') {
        addLines([``, `Terraform <span class="sb-yellow">v1.6.4</span>  on linux_amd64`, ``], 20);
      } else {
        errLine(`terraform: try: terraform plan|init|apply|version`);
      }
    },

    docker(args) {
      const sub = args.join(' ').toLowerCase();
      if (sub === 'ps' || sub === 'ps -a') {
        addLines([
          ``,
          `<span class="sb-dim">CONTAINER ID   IMAGE                       STATUS          PORTS</span>`,
          `<span class="sb-dim">──────────────────────────────────────────────────────────────</span>`,
          `a3f9d21e5c8b   nginx:alpine                <span class="sb-green">Up 3 days</span>       80/tcp`,
          `b7c2e4f1d9a0   node:20-alpine              <span class="sb-green">Up 3 days</span>       3000/tcp`,
          `e5a8f3c6b2d1   postgres:15                 <span class="sb-green">Up 5 days</span>       5432/tcp`,
          `c9d4b7e2a6f0   redis:7-alpine              <span class="sb-green">Up 5 days</span>       6379/tcp`,
          `f2b6e9c4d8a3   prom/prometheus:latest      <span class="sb-green">Up 7 days</span>       9090/tcp`,
          `d1c8f4a7b3e9   grafana/grafana:latest      <span class="sb-green">Up 7 days</span>       3001/tcp`,
          ``,
          `<span class="sb-dim">6 containers running · 0 stopped</span>`,
          ``,
        ], 26);
      } else if (sub === 'images') {
        addLines([
          ``,
          `<span class="sb-dim">REPOSITORY             TAG         IMAGE ID       SIZE</span>`,
          `<span class="sb-dim">────────────────────────────────────────────────────</span>`,
          `myapp/frontend         1.2.4       a3f9d21e5c8b   45.2MB`,
          `myapp/backend          2.1.0       b7c2e4f1d9a0   128MB`,
          `postgres               15          e5a8f3c6b2d1   376MB`,
          `redis                  7-alpine    c9d4b7e2a6f0   40.8MB`,
          `prom/prometheus        latest      f2b6e9c4d8a3   236MB`,
          `grafana/grafana        latest      d1c8f4a7b3e9   381MB`,
          ``,
        ], 26);
      } else if (sub === 'version') {
        addLines([``, `Docker version <span class="sb-yellow">24.0.7</span>, build afdd53b`, ``], 20);
      } else {
        errLine(`docker: try: docker ps|images|version`);
      }
    },

    aws(args) {
      const sub = args.join(' ').toLowerCase();
      if (sub === 's3 ls') {
        addLines([
          ``,
          `2024-01-15 09:23  <span class="sb-yellow">prod-terraform-state-bucket</span>`,
          `2024-01-15 09:24  <span class="sb-yellow">prod-app-assets-bucket</span>`,
          `2024-01-20 14:45  <span class="sb-yellow">stg-terraform-state-bucket</span>`,
          `2024-01-20 14:46  <span class="sb-yellow">dev-app-assets-bucket</span>`,
          `2024-02-01 11:12  <span class="sb-yellow">logs-archive-bucket</span>`,
          `2024-02-10 08:55  <span class="sb-yellow">cicd-artifacts-bucket</span>`,
          ``,
        ], 26);
      } else if (sub.startsWith('ec2 describe-instances')) {
        addLines([
          ``,
          `<span class="sb-dim">Instances in us-east-1:</span>`,
          ``,
          `  <span class="sb-blue">i-0a1b2c3d4e5f6</span>   t3.medium   <span class="sb-green">running</span>   eks-worker-node-1`,
          `  <span class="sb-blue">i-0f9e8d7c6b5a4</span>   t3.medium   <span class="sb-green">running</span>   eks-worker-node-2`,
          `  <span class="sb-blue">i-0b3c4d5e6f7a8</span>   t3.medium   <span class="sb-green">running</span>   eks-worker-node-3`,
          ``,
          `<span class="sb-dim">3 instances · us-east-1 · All healthy</span>`,
          ``,
        ], 26);
      } else if (sub === 'sts get-caller-identity') {
        addLines([
          ``,
          `{`,
          `    <span class="sb-yellow">"UserId"</span>:  <span class="sb-green">"AIDACKCEVSQ6C2EXAMPLE"</span>,`,
          `    <span class="sb-yellow">"Account"</span>: <span class="sb-green">"123456789012"</span>,`,
          `    <span class="sb-yellow">"Arn"</span>:     <span class="sb-green">"arn:aws:iam::123456789012:user/sugu-devops"</span>`,
          `}`,
          ``,
        ], 22);
      } else if (sub === '--version') {
        addLines([``, `aws-cli/<span class="sb-yellow">2.15.0</span> Python/3.11.6 Linux/5.19 botocore/2.15.0`, ``], 20);
      } else {
        errLine(`aws: try: aws s3 ls | ec2 describe-instances | sts get-caller-identity`);
      }
    },

    git(args) {
      const sub = args.join(' ').toLowerCase();
      if (sub.startsWith('log')) {
        addLines([
          ``,
          `<span class="sb-yellow">a4f2e1c</span> feat: add VPA autoscaler for backend deployment`,
          `<span class="sb-yellow">b8d3f9a</span> fix: prometheus scrape interval causing high cardinality`,
          `<span class="sb-yellow">c1e5b7d</span> chore: upgrade EKS cluster to v1.28`,
          `<span class="sb-yellow">d9f6c2e</span> feat: implement blue/green deployment strategy`,
          `<span class="sb-yellow">e3a8d4b</span> fix: terraform state lock not releasing on plan error`,
          `<span class="sb-yellow">f7c1e9a</span> feat: add alertmanager pagerduty integration`,
          `<span class="sb-yellow">g2b5f3c</span> refactor: extract vpc module for reuse across envs`,
          `<span class="sb-yellow">h6d9e1b</span> feat: OIDC auth for github-actions → aws (no creds)`,
          `<span class="sb-yellow">i4a7f2d</span> fix: coredns crashloopbackoff due to memory limits`,
          `<span class="sb-yellow">j8e3c6a</span> feat: initial eks cluster setup with terraform`,
          ``,
        ], 26);
      } else if (sub === 'status') {
        addLines([
          ``,
          `On branch <span class="sb-green">main</span>`,
          `Your branch is up to date with <span class="sb-yellow">'origin/main'</span>.`,
          ``,
          `nothing to commit, working tree clean`,
          ``,
        ], 22);
      } else if (sub === 'branch') {
        addLines([
          ``,
          `* <span class="sb-green">main</span>`,
          `  feature/eks-v1-29-upgrade`,
          `  fix/prometheus-high-cardinality`,
          `  hotfix/cert-rotation-automation`,
          ``,
        ], 22);
      } else {
        errLine(`git: try: git log --oneline|status|branch`);
      }
    },

    neofetch() {
      addLines([
        ``,
        `        <span class="sb-blue">   ██████</span> <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span>  <span class="sb-blue">██████</span>  <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span>       <span class="sb-blue">sugu</span><span class="sb-dim">@</span><span class="sb-cyan">aws-cloud</span>`,
        `        <span class="sb-blue">  ██</span>     <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span> <span class="sb-blue">██</span>       <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span>       <span class="sb-dim">───────────────────────────</span>`,
        `        <span class="sb-blue">   █████</span> <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span> <span class="sb-blue">██   ███</span> <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span>       <span class="sb-blue">OS:</span>      Ubuntu 22.04 LTS (cloud)`,
        `        <span class="sb-blue">       ██</span><span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span> <span class="sb-blue">██    ██</span> <span class="sb-cyan"> ██</span>    <span class="sb-cyan">██</span>       <span class="sb-blue">Kernel:</span>  5.19.0-1028-aws`,
        `        <span class="sb-blue">  ██████</span>  <span class="sb-cyan"> ██████</span>  <span class="sb-blue"> ██████</span>  <span class="sb-cyan">  ██████</span>        <span class="sb-blue">Uptime:</span>  <span class="sb-green">847 days, 14:22 (99.97%)</span>`,
        ``,
        `        <span class="sb-blue">Cloud:</span>     AWS us-east-1`,
        `        <span class="sb-blue">K8s:</span>       v1.28.5-eks`,
        `        <span class="sb-blue">Terraform:</span> v1.6.4`,
        `        <span class="sb-blue">Docker:</span>    24.0.7`,
        `        <span class="sb-blue">Helm:</span>      v3.13.2`,
        `        <span class="sb-blue">Shell:</span>     zsh 5.8.1`,
        `        <span class="sb-blue">CPU:</span>       AWS Graviton3 (4) @ 2.6GHz`,
        `        <span class="sb-blue">Memory:</span>    4.2 GiB / 8.0 GiB`,
        ``,
        `        <span style="color:#ff9900">████</span><span style="color:#00b4ff">████</span><span style="color:#00f5d4">████</span><span style="color:#00ff88">████</span><span style="color:#a855f7">████</span><span style="color:#f43f5e">████</span>`,
        ``,
      ], 36);
    },

    uptime() {
      const d = 847, h = 14, m = 22;
      addLine(`\n <span class="sb-dim">${new Date().toLocaleTimeString()}</span> up <span class="sb-green">${d} days, ${h}:${String(m).padStart(2,'0')}</span>, 3 users, load average: <span class="sb-yellow">0.12, 0.18, 0.14</span>\n`);
    },

    top() {
      addLines([
        ``,
        `<span class="sb-dim">top - ${new Date().toLocaleTimeString()} up 847 days · load: 0.12</span>`,
        `<span class="sb-dim">Tasks: 142 total,  2 running, 140 sleeping</span>`,
        `<span class="sb-dim">%Cpu:  3.2 us · 1.1 sy · 95.4 id</span>`,
        `<span class="sb-dim">MiB Mem: 8192 total · 4201 used · 3842 free</span>`,
        ``,
        `<span class="sb-dim">  PID  USER     %CPU  %MEM  COMMAND</span>`,
        `<span class="sb-dim">──────────────────────────────────────────</span>`,
        ` 1337  sugu      2.4   5.2  terraform plan`,
        ` 2048  sugu      1.8   3.1  kubectl apply`,
        `  420  root      0.6   8.4  kubelet`,
        ` 4096  sugu      0.4   2.2  prometheus`,
        ` 8192  sugu      0.2   1.8  grafana-server`,
        ``,
        `<span class="sb-dim">Press q to quit (simulated)</span>`,
        ``,
      ], 22);
    },

    ping(args) {
      const host = esc(args[0] || 'sugu.dev');
      addLines([
        ``,
        `PING <span class="sb-yellow">${host}</span> (104.21.36.82): 56 data bytes`,
        `64 bytes from 104.21.36.82: icmp_seq=0 ttl=56 time=<span class="sb-green">4.2 ms</span>`,
        `64 bytes from 104.21.36.82: icmp_seq=1 ttl=56 time=<span class="sb-green">3.8 ms</span>`,
        `64 bytes from 104.21.36.82: icmp_seq=2 ttl=56 time=<span class="sb-green">4.1 ms</span>`,
        ``,
        `--- <span class="sb-yellow">${host}</span> ping statistics ---`,
        `3 packets transmitted, 3 received, <span class="sb-green">0% packet loss</span>`,
        `rtt min/avg/max = 3.8/4.0/4.2 ms`,
        ``,
      ], 130);
    },

    ls(args) {
      addLines([
        ``,
        `<span class="sb-blue">drwxr-xr-x</span>  infrastructure/   <span class="sb-dim">Terraform AWS modules</span>`,
        `<span class="sb-blue">drwxr-xr-x</span>  kubernetes/        <span class="sb-dim">Helm charts &amp; manifests</span>`,
        `<span class="sb-blue">drwxr-xr-x</span>  ci-cd/             <span class="sb-dim">GitHub Actions workflows</span>`,
        `<span class="sb-blue">drwxr-xr-x</span>  monitoring/        <span class="sb-dim">Prometheus &amp; Grafana configs</span>`,
        `<span class="sb-blue">drwxr-xr-x</span>  scripts/           <span class="sb-dim">Bash automation scripts</span>`,
        `<span class="sb-green">-rw-r--r--</span>  README.md          <span class="sb-dim">5.2 KB</span>`,
        `<span class="sb-green">-rwxr-xr-x</span>  deploy.sh          <span class="sb-dim">3.1 KB</span>`,
        `<span class="sb-green">-rw-r--r--</span>  resume.pdf         <span class="sb-dim">182 KB</span>`,
        ``,
      ], 24);
    },

    cat(args) {
      const f = (args[0] || '').toLowerCase();
      if (f === 'deploy.sh') {
        addLines([
          ``,
          `<span class="sb-dim">#!/bin/bash</span>`,
          `<span class="sb-dim">set -euo pipefail</span>`,
          ``,
          `IMAGE_TAG=<span class="sb-yellow">$(git rev-parse --short HEAD)</span>`,
          `ECR=<span class="sb-yellow">123456789012.dkr.ecr.us-east-1.amazonaws.com/app</span>`,
          ``,
          `aws ecr get-login-password | docker login --username AWS --password-stdin <span class="sb-blue">$ECR</span>`,
          `docker build -t <span class="sb-green">$ECR:$IMAGE_TAG</span> .`,
          `docker push <span class="sb-green">$ECR:$IMAGE_TAG</span>`,
          `kubectl set image deployment/app app=<span class="sb-green">$ECR:$IMAGE_TAG</span>`,
          `kubectl rollout status deployment/app --timeout=120s`,
          ``,
          `<span class="sb-green">echo "✓ Deployment complete: $IMAGE_TAG"</span>`,
          ``,
        ], 25);
      } else if (f === 'resume.pdf' || f === 'resume') {
        addLines([``, `<span class="sb-dim">Binary file. Try:</span>  <span class="sb-yellow">whoami</span>  or scroll up for the Download Resume button.`, ``], 20);
      } else {
        errLine(`cat: ${esc(args[0] || '(no file)')}: No such file or directory`);
      }
    },

    echo(args) {
      if (!args.length) { addLine(''); return; }
      const MAP = {
        '$aws_region':          'us-east-1',
        '$kube_context':        'arn:aws:eks:us-east-1:123456789012:cluster/prod-eks',
        '$terraform_workspace': 'prod',
        '$user':                'sugu',
        '$shell':               '/bin/zsh',
        '$home':                '/home/sugu',
        '$k8s_version':         'v1.28.5-eks',
      };
      const raw = args.join(' ');
      const val = MAP[raw.toLowerCase()] || raw;
      addLines([``, val, ``], 0);
    },

    date() {
      addLines([``, new Date().toString(), ``], 0);
    },

    history() {
      if (!cmdHistory.length) {
        addLines([``, `<span class="sb-dim">No history yet.</span>`, ``], 0);
        return;
      }
      const lines = [``, ...cmdHistory.slice().reverse().map((c, i) => `  <span class="sb-dim">${i + 1}</span>  ${esc(c)}`), ``];
      addLines(lines, 14);
    },

    resume() {
      addLines([``, `<span class="sb-blue">📄 Resume available on GitHub:</span>`, `   <span class="sb-yellow">github.com/suguslove10</span>`, ``, `<span class="sb-dim">Or click "Download Resume" in the hero section.</span>`, ``], 22);
    },

    clear() {
      output.innerHTML = '';
    },

    sudo(args) {
      const sub = args.join(' ').toLowerCase().trim();
      if (sub === 'hire sugu' || sub === 'hire sugu --now' || sub === 'hire sugu -y') {
        addLines([
          ``,
          `<span class="sb-dim">Checking credentials... </span><span class="sb-green">✓</span>`,
          `<span class="sb-dim">Verifying AWS expertise... </span><span class="sb-green">✓</span>`,
          `<span class="sb-dim">Verifying Kubernetes skills... </span><span class="sb-green">✓</span>`,
          `<span class="sb-dim">Verifying Terraform proficiency... </span><span class="sb-green">✓</span>`,
          `<span class="sb-dim">Running references check... </span><span class="sb-green">✓</span>`,
          `<span class="sb-dim">Checking attitude &amp; culture fit... </span><span class="sb-green">✓✓✓</span>`,
          ``,
          `<span class="sb-cyan">╔══════════════════════════════════════════════════╗</span>`,
          `<span class="sb-cyan">║</span>                                                  <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   <span class="sb-green">✅  HIRE APPROVED — all checks passed</span>           <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>                                                  <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   Candidate:  <span class="sb-blue">Suguresh (Sugu)</span>                     <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   Role:       <span class="sb-blue">Cloud &amp; DevOps Engineer</span>              <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   Clearance:  <span class="sb-green">AWS · K8s · Terraform · CI/CD</span>       <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   Status:     <span class="sb-green">Open to Work ●</span>                      <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>                                                  <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   → <span class="sb-yellow">suguresh@email.com</span>                          <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>   → <span class="sb-yellow">github.com/suguslove10</span>                     <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">║</span>                                                  <span class="sb-cyan">║</span>`,
          `<span class="sb-cyan">╚══════════════════════════════════════════════════╝</span>`,
          ``,
          `<span class="sb-dim">Congratulations — your infra won't break at 3AM anymore.</span>`,
          ``,
        ], 50);
      } else if (sub.includes('rm -rf')) {
        addLines([``, `<span class="sb-red">Permission denied.</span> <span class="sb-dim">Action logged. Nice try though. 👀</span>`, ``], 20);
      } else {
        addLines([``, `<span class="sb-red">sudo: ${esc(sub)}: command not found.</span>`, `<span class="sb-dim">Hint: try  sudo hire sugu</span>`, ``], 20);
      }
    },

    exit() {
      addLines([``, `<span class="sb-dim">You can't quit me that easily 😄  — type help to keep exploring.</span>`, ``], 20);
    },

    // Aliases
    about(a) { CMDS.whoami(a); },
    k(a)     { CMDS.kubectl(a); },
    tf(a)    { CMDS.terraform(a); },
    '?'(a)   { CMDS.help(a); },
  };

  // ── Execution ───────────────────────────────────────────
  function execute(raw) {
    const parts   = raw.trim().split(/\s+/);
    const base    = parts[0].toLowerCase();
    const args    = parts.slice(1);
    const handler = CMDS[base];
    if (handler) {
      handler(args);
    } else {
      addLines([
        ``,
        `<span class="sb-red">${esc(base)}: command not found</span>`,
        `<span class="sb-dim">Type <span class="sb-yellow">help</span> for available commands.</span>`,
        ``,
      ], 14);
    }
  }

  // ── Input handling ──────────────────────────────────────
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      input.value = '';
      histIdx = -1;
      if (!cmd) return;
      cmdHistory.unshift(cmd);
      addLine(`<span class="sb-prompt-echo">sugu@cloud:~$</span> <span class="sb-cmd-echo">${esc(cmd)}</span>`);
      execute(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) { histIdx++; input.value = cmdHistory[histIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = cmdHistory[histIdx]; }
      else { histIdx = -1; input.value = ''; }
    }
  });

  output.addEventListener('click', () => input.focus());

  // Global fill function for hint buttons
  window.sbFill = function(cmd) { input.value = cmd; input.focus(); };

  // Boot
  welcome();
})();


/* ══════════════════════════════════════════════════
   RESUME BUTTON PLACEHOLDER
══════════════════════════════════════════════════ */
(function initResume() {
  const url = '#'; // Replace with actual resume URL e.g. 'https://drive.google.com/...'
  ['navResume', 'resumeDownload'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', e => {
        if (url === '#') {
          e.preventDefault();
          // Show subtle alert — replace url variable with real link
          alert('Resume link coming soon! Connect with me on LinkedIn.');
        }
      });
    }
  });
})();
