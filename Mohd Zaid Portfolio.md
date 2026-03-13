# Mohd Zaid — Portfolio Profile Document
> Prepared for: Frontend Developer Agent
> Purpose: Source-of-truth profile data for portfolio website build

---

## 1. Personal Information

| Field | Value |
|---|---|
| **Full Name** | Mohd Zaid |
| **Location** | Coimbatore, India |
| **Phone** | +91 9943620876 |
| **Email** | mohdzaid2904@gmail.com |
| **GitHub** | https://github.com/dev-zaid |
| **LinkedIn** | https://linkedin.com/in/dev-zaid |

---

## 2. Professional Summary / Headline Options

Zaid has multiple resume variants targeting different roles. The portfolio should present a unified, strong identity. Below are the profile blurbs from each variant — the frontend agent can choose or blend as appropriate:

### Primary (Blockchain / Protocol Focus)
> Blockchain / Protocol Engineer (Go, Cosmos SDK/Evmos, EVM) with 2+ years building L1 systems and high-throughput indexers. Currently leading core protocol development for an Evmos-based chain: dual staking (token + NFT), EVM precompiles, epoch/validator logic, and validator telemetry across 100+ nodes. Shipped production systems handling 1M–10M+ on-chain events/day, with strong focus on correctness, testing, and security-minded development (audits, threat modeling, invariants).

### Secondary (Backend / Distributed Systems Focus)
> Backend and Distributed Systems Engineer with experience building and operating scalable Go services for production systems. Strong in microservices, low-latency APIs, and distributed system debugging with a focus on performance, reliability, and testability. Hands-on with gRPC + protobuf, Docker and AWS (EC2, IAM, ALB).

### Tertiary (General / Graduate Software Engineer)
> Graduate Software Engineer with 2+ years of hands-on experience through internships and industry projects. Strong foundation in data structures, algorithms, OOP, backend development, and distributed systems. Experienced in building scalable APIs, optimizing databases, writing unit and integration tests, and debugging production systems.

---

## 3. Education

| Field | Value |
|---|---|
| **Institution** | SRM University – KTR, Tamil Nadu, India |
| **Degree** | Bachelor of Technology (B.Tech) |
| **Major** | Computer Science and Engineering |
| **GPA** | 8.86 / 10 |
| **Duration** | July 2021 – June 2025 |

---

## 4. Work Experience (Chronological, Latest First)

### 4.1 DEnergy Networks Ltd.
- **Location:** Ras Al-Khaimah, UAE (Remote)
- **Duration:** January 2025 – Present
- **Role Variants:** Lead Blockchain Developer / Software Engineer – Distributed & Backend Systems
- **Highlights:**
  - Implemented protocol-level dual staking (token + NFT) integrated with validator selection and reward distribution; improved validator throughput by ~30%
  - Built EVM Go precompiles to expose staking/NFT primitives to smart contracts (EVM compatibility + gas-aware execution)
  - Designed epoch-based logic tied to network energy metrics; shipped on-chain energy tracking across 100+ validator nodes
  - Implemented service-to-service communication using gRPC + protobuf
  - Built and maintained containerized deployments using Docker + Docker Compose
  - Worked with AWS EC2 and ALB-based routing for scalable service deployments
  - 98% test coverage; partnered with auditors (CertiK) for a 50K+ LOC security audit
  - Collaborated cross-functionally with QA, security auditors, and protocol researchers across global time zones
  - Owned debugging for production incidents (protocol-level + distributed failure modes)
- **Tech:** Go, Cosmos SDK, Evmos, EVM Precompiles, gRPC/Protobuf, Docker, AWS EC2/ALB/ECR/ELB

---

### 4.2 Trench
- **Location:** Bangalore, India (Remote)
- **Duration:** December 2024 – June 2025
- **Role:** Founding Full-Stack Engineer / Software Engineer – Full-Stack Developer
- **Highlights:**
  - Built real-time trading platform serving 1,000+ concurrent users with WebSocket live feeds and sub-100ms end-to-end latency
  - Architected scalable REST + event-driven APIs handling ~15M+ daily events
  - Optimized PostgreSQL using partitioning + indexing, improving heavy-load query performance by ~40%
  - Integrated Redis caching + connection pooling to support low-latency, high-frequency production traffic
  - Managed API integration and testing coordination between backend and frontend teams
- **Tech:** Go, TypeScript, PostgreSQL, Redis, WebSockets, REST APIs

---

### 4.3 Avex
- **Location:** Bangalore, India
- **Duration:** September 2024 – November 2024
- **Role:** Backend & Blockchain Developer / Backend Software Engineer
- **Highlights:**
  - Architected and launched an NFT Marketplace Indexer processing 1M+ daily transactions with 98.9% uptime
  - Engineered a User Positions Indexer achieving 18% faster data retrieval
  - Implemented real-time monitoring reducing system downtime by 20%
- **Tech:** Go, Blockchain Indexing, PostgreSQL, Monitoring tools

---

### 4.4 Mable
- **Location:** Karlsruhe, Germany (Remote)
- **Duration:** August 2023 – July 2024
- **Role:** Software Development Engineer – Intern / SDE
- **Highlights:**
  - Implemented PostgreSQL table partitioning (pg_partman) reducing query latency from 2s to 500ms
  - Developed dynamic partitioning framework improving query performance by 75%
  - Achieved 95% test coverage across unit, integration, and functional tests in Go and TypeScript
  - Designed RESTful APIs with Redis caching and connection pooling, achieving sub-10ms response times for 100K+ daily requests
  - Built RabbitMQ message queue systems for event processing, consuming data streams from Facebook Ads API and Pinterest API
- **Tech:** Go, TypeScript, PostgreSQL, Redis, RabbitMQ, REST APIs, Node.js

---

## 5. Projects

### 5.1 Aptos NFT Marketplace Indexer *(Project Lead)*
- Built real-time blockchain indexer processing **10M+ transactions/day** using Go concurrency patterns
- Improved transaction parsing algorithm complexity from O(n²) → O(n) for faster decoding and lower CPU cost
- Increased overall indexer throughput by **~60%** via pipeline optimization (batching + worker pools)
- Validated all changes via unit/integration tests and regression runs
- **Tech:** Go, Aptos Blockchain, Concurrency Patterns

---

### 5.2 OD Automation SRM *(Project Lead)*
- Architected student leave management system serving **5,000+ users** with 99% uptime
- Reduced processing time by **70%** through digital signature integration and workflow optimization
- Led team of 4 developers to deliver project **2 weeks ahead of schedule**
- Implemented automated deployment pipeline reducing release time from 2 hours to **15 minutes**
- Wrote technical documentation and supported integration testing during releases
- **Tech:** Full-stack, Automated deployment, Digital signatures

---

### 5.3 PyREX — Intelligent Cross-Border Payment System
- Designed and implemented intelligent backend agents for decision-making and routing of cross-border payment requests
- Built AI-based agents to analyze incoming payment requests and dynamically split transaction amounts across multiple exchange paths to optimize effective exchange rates
- Developed routing algorithms evaluating liquidity, pricing, and availability constraints in real time to minimize conversion loss
- Implemented agent-driven orderbook management for currency sellers: order prioritization, matching, and settlement logic
- **Tech:** Go/Python, AI Agents, Payment routing algorithms

---

### 5.4 Otaku Verse *(Hackathon Project)*
- **Award:** Best DApp – Layer 2.0 Hackathon (March 2024)
- Crafted an anime streaming platform with rank-based NFT rewards
- Constructed smart contract for NFT minting on Shardeum Network
- **Tech:** Solidity, EVM, NFT standards, Wallet integration

---

### 5.5 Datalync — Ed-Tech Website
- Architected full-stack education platform serving **100+ concurrent users** with 99.9% uptime
- Integrated Razorpay payment gateway processing **$1K+ monthly transactions**
- Implemented JWT-based single-device authentication + session management, reducing unauthorized access by **~95%**
- **Tech:** Full-stack, Razorpay, JWT Auth

---

## 6. Skills

### Languages
`Go` · `TypeScript` · `JavaScript` · `Python` · `C` · `C++` · `Solidity`

### Blockchain / Web3
`Cosmos SDK` · `Evmos (EVM)` · `EVM Precompiles` · `RPC/Node Ops` · `Solidity` · `NFT Standards` · `Smart Contracts`

### Backend & Distributed Systems
`Microservices` · `gRPC / Protobuf` · `REST APIs` · `WebSockets` · `Concurrency` · `Event-driven Architecture` · `Client–Server Architecture`

### Databases & Caching
`PostgreSQL` (schema design, indexing, partitioning, query optimization) · `Redis` · `MongoDB`

### Cloud & Infrastructure
`AWS` (EC2, RDS, ALB, ECR, ELB, IAM) · `Docker` · `Docker Compose` · `Load Balancing` · `API Gateways` · `RabbitMQ`

### Testing & Quality
`Unit Testing` · `Integration Testing` · `Regression Testing` · `Test Automation` · `Debugging` · `Code Reviews`

### Tools & DevOps
`Git` · `CI/CD Pipelines` · `Linux` · `Jenkins` (familiar) · `Kubernetes` (familiar) · `Terraform` (familiar) · `Ansible` (familiar)

### Core CS
`Data Structures & Algorithms` · `OOP` · `Multithreading` · `System Design` · `DBMS`

---

## 7. Leadership & Campus Engagement

### Blockchain Club SRM — SRMIST
- **Role:** Associate Lead – Technical
- **Duration:** 2022 – 2024
- Spearheaded development of university-wide OD/ML Automation System, improving administrative efficiency by 60%
- Organized **Layer 2.0 Hackathon** for 500+ participants, coordinating technical workshops and judging criteria

### SRMKZILLA — SRMIST
- **Role:** Associate Lead – Technical
- **Duration:** 2021 – 2023
- Contributed to development of internal event management portal, streamlining operations for 10+ annual events
- Architected and deployed scalable mailing service handling **10,000+ monthly communications**
- Conducted 2 technical workshops, effectively training 50+ students through hands-on learning
- Contributed to 5 open-source projects, resolving 20+ critical issues and implementing 3 major features

---

## 8. Awards & Achievements

| Award | Event | Date |
|---|---|---|
| Best DApp Winner | Hackverse Hackathon | April 2024 |
| Best DApp Builder | Layer 2.0 Hackathon | March 2024 |
| Best Open Innovation | MesoHacks | September 2022 |

---

## 9. Certifications

- **C for Everyone: Programming Fundamentals** — Coursera
- **Web Application Technologies and Django** — Coursera

---

## 10. Languages (Spoken)

- English — Fluent
- Hindi — Fluent
- Tamil — Fluent

---

## 11. Key Metrics & Impact (For Homepage / Hero Section)

These are standout numbers that can be used as visual callouts on the portfolio:

| Metric | Value |
|---|---|
| On-chain events processed/day | 1M – 10M+ |
| Validator nodes managed | 100+ |
| Concurrent users supported | 1,000+ (trading) / 5,000+ (leave mgmt) |
| Daily transactions (Trench) | 15M+ |
| Test coverage (DEnergy) | 98% |
| Test coverage (Mable) | 95% |
| Query latency improvement | 2s → 500ms (75% faster) |
| Indexer throughput improvement | 60% |
| Security audit code coverage | 50,000+ LOC |
| Uptime (NFT Indexer) | 98.9% |
| Hackathon awards won | 3 |

---

## 12. Portfolio Sections Recommendation

For the frontend agent, here is a suggested site structure based on this profile:

1. **Hero / Landing** — Name, headline, CTA (GitHub / LinkedIn / Email), key metrics callouts
2. **About** — Short bio, photo placeholder, spoken languages, education
3. **Experience Timeline** — Vertical/horizontal timeline of all 4 companies
4. **Projects** — Card grid with tech tags, metrics, and links (5 projects)
5. **Skills** — Visual skill groupings (languages, infra, blockchain, etc.)
6. **Awards & Recognition** — Timeline or badge-style display
7. **Leadership** — Club roles and impact
8. **Contact** — Email, GitHub, LinkedIn

---

*Document compiled from 5 resume variants. All data cross-verified across sources.*
