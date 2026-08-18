# IntervAI
## AI-Powered Real-Time Interview Coach & Simulation Platform

**Document Type:** Product Requirements Document (PRD)  
**Version:** 2.0 (Advanced Technical Edition)  
**Status:** Ready for AI-Agent-Assisted Development  
**Target:** Web-first, responsive, SEO-optimized, globally accessible AI interview platform (optimized for Indian + international students)  
**Primary Users:** Students, freshers, job seekers, working professionals (India-first, global-ready)  
**Future Platforms:** Web, Desktop, Mobile  
**Author:** Gautam Kumar Maurya (GKM563)

---

## Version 2.0 Changelog

Version 2.0 extends the original v1.0 vision document into an **implementation-grade PRD** that an AI coding agent (or human dev team) can build directly from. New/expanded material in this version:

```text
✔ Detailed system architecture (component + sequence + data-flow diagrams)
✔ Concrete free-tier database & storage stack (no paid dependency to start)
✔ Full authentication flow: Register → Verify → Login → Forgot/Reset Password
✔ Detailed Dashboard UI/UX specification (layout, states, components)
✔ Resume upload → parse → store → analyze pipeline, fully specified
✔ Text-Mode Interview (chat-based, no mic/camera required) as first-class mode
✔ Human-like AI Interviewer Presence — 3D avatar + lip-sync + talking-head options
✔ Continuous Learn → Test → Review → Re-test loop, explicitly modeled as a state machine
✔ Landing page: section-by-section design + copywriting brief
✔ SEO, i18n (India + global), responsive breakpoints, and accessibility standards
✔ Updated technology stack, repo structure, and milestone plan (v2)
✔ Agent handoff instructions — how to feed this PRD to an AI coding agent
```

Everything from v1.0 below (Sections 1–117) remains valid and is the philosophical/product foundation. Sections 118 onward (at the end of this document) are the new v2.0 technical/implementation layer — **read those last, build from those first.**

---

# 1. Executive Summary

IntervAI is an AI-powered interview simulation and coaching platform designed to replicate realistic job interviews while providing detailed, personalized feedback after and during each interview.

A user will be able to:

1. Create an account.
2. Create a professional candidate profile.
3. Upload their resume.
4. Specify the target company.
5. Specify the target job role.
6. Upload or paste the job description.
7. Select interview type and difficulty.
8. Start a live AI-powered interview.
9. Communicate with the AI interviewer through voice and video.
10. Answer questions naturally.
11. Receive adaptive follow-up and cross-questions.
12. Have their answers analyzed for relevance, correctness, structure, clarity and depth.
13. Have observable speech and video communication metrics analyzed.
14. Receive a detailed interview report.
15. Practice weak areas.
16. Retry questions.
17. Track improvement across interviews.
18. Maintain persistent career-related memory.
19. Receive personalized practice schedules.
20. Prepare for different companies and roles.

The long-term objective is to build a unified AI career-interview coach available through web, desktop and mobile applications.

---

# 2. Product Vision

## Vision

Build an AI interviewer that does not simply ask predefined questions, but behaves like a realistic interviewer who understands the candidate's resume, target role, company context and previous performance.

The system should progressively learn:

- What the candidate knows.
- What the candidate does not know.
- How the candidate communicates.
- Which mistakes the candidate repeatedly makes.
- Which interview questions cause difficulty.
- Which areas are improving.
- Which areas require additional practice.

The platform should ultimately become a **personal interview coach**, not merely an AI chatbot.

---

# 3. Problem Statement

Most interview preparation platforms have one or more of the following limitations:

- Static question banks.
- Generic questions unrelated to the candidate's resume.
- No realistic follow-up questioning.
- Limited company/role personalization.
- No continuous memory across interviews.
- Limited analysis of communication.
- No meaningful longitudinal performance tracking.
- Feedback that gives scores without explaining how to improve.
- No adaptive practice schedule.
- Little connection between interview performance and future preparation.

A candidate may complete hundreds of questions without understanding:

> "What exactly am I doing wrong in an actual interview?"

IntervAI aims to solve this.

---

# 4. Core Product Principle

IntervAI should follow this loop:

```text
Prepare
   ↓
Interview
   ↓
Observe
   ↓
Analyze
   ↓
Explain
   ↓
Teach
   ↓
Practice
   ↓
Re-interview
   ↓
Measure Improvement
   ↓
Adapt Future Preparation
```

The system should not stop at:

> "Your score is 68."

It should explain:

> "Your answer was technically correct, but it was 2 minutes long for a question that could be answered in approximately 60–90 seconds. You also used several filler words and did not clearly state your personal contribution. Try using this structure..."

---

# 5. Product Goals

## 5.1 Primary Goals

### G1 — Realistic Interview Simulation

Create an interview experience that resembles a real:

- HR interview.
- Technical interview.
- Behavioral interview.
- Project interview.
- Coding interview.
- System design interview.

### G2 — Resume-Aware Interviewing

The interviewer must understand the candidate's resume and ask questions based on:

- Projects.
- Skills.
- Internships.
- Education.
- Certifications.
- Achievements.
- Experience.

### G3 — Role-Aware Interviewing

Questions must adapt to the target role.

Example:

```text
Software Engineer
→ DSA
→ Programming
→ Backend
→ Databases
→ System design
→ Projects
```

Whereas:

```text
Data Scientist
→ Python
→ Statistics
→ SQL
→ Machine Learning
→ Data analysis
→ Case studies
```

### G4 — Company-Aware Preparation

The interview should use:

- User-provided job description.
- Role requirements.
- Publicly available company/role information where appropriate.
- Candidate profile.

### G5 — Adaptive Questioning

The AI should ask follow-up questions based on the candidate's previous answer rather than following a completely fixed script.

### G6 — Multi-dimensional Analysis

Analyze:

- Answer quality.
- Technical knowledge.
- Communication.
- Speech patterns.
- Answer structure.
- Observable visual behaviour.
- Role alignment.
- Resume consistency.

### G7 — Personalized Coaching

Convert identified weaknesses into actionable training.

### G8 — Long-Term Candidate Memory

Remember relevant candidate information and previous performance with user control.

### G9 — Performance Tracking

Show improvement over time.

### G10 — Free/Open Technology Foundation

Prefer:

- Open-source models.
- Local inference.
- Self-hostable services.
- Browser-side processing.
- Free/open-source libraries.

Paid APIs may optionally be supported later, but the core architecture should not depend on them.

---

# 6. Non-Goals for Initial Release

The first version will NOT attempt to:

- Replace human recruiters.
- Guarantee job selection.
- Predict whether a candidate will be hired.
- Detect a person's mental state with certainty.
- Claim that facial expressions prove confidence, honesty or nervousness.
- Perform psychological diagnosis.
- Store every video recording permanently.
- Automatically apply to jobs.
- Make hiring decisions about candidates.

The platform provides **practice and coaching**, not employment decisions.

---

# 7. Target Users

## Persona 1 — College Student

### Example

Third-year/final-year engineering student preparing for placements.

Needs:

- Resume-based questions.
- Technical interviews.
- HR interviews.
- DSA practice.
- Project explanation practice.
- Communication improvement.

---

## Persona 2 — Fresher

Preparing for:

- Campus placements.
- Off-campus jobs.
- Internships.
- Graduate programs.

Needs:

- Interview confidence.
- Resume explanation.
- Behavioral questions.
- Basic/medium technical questions.

---

## Persona 3 — Experienced Professional

Preparing for:

- Job switching.
- Senior engineering roles.
- Leadership interviews.
- System design.

Needs:

- Role-specific interviews.
- Advanced technical questioning.
- System design.
- Leadership/behavioral interviews.

---

## Persona 4 — Career Coach / Institution

Future B2B user.

Could use IntervAI to provide:

- Mock interviews.
- Student analytics.
- Placement preparation.
- Cohort-level performance reports.

This is a future product direction.

---

# 8. User Journey

```text
Landing Page
      ↓
Create Account
      ↓
Create Profile
      ↓
Upload Resume
      ↓
Resume Analysis
      ↓
Select Target Role
      ↓
Select Target Company
      ↓
Upload/Paste Job Description
      ↓
Configure Interview
      ↓
System Creates Interview Plan
      ↓
Pre-Interview Setup
      ↓
Live Interview
      ↓
Question
      ↓
Candidate Answer
      ↓
Analysis
      ↓
Follow-up Question
      ↓
...
      ↓
Interview Complete
      ↓
Detailed Report
      ↓
Weakness Detection
      ↓
Personalized Practice
      ↓
Progress Tracking
      ↓
Adaptive Future Interview
```

---

# 9. Feature Architecture

The product will consist of the following major modules:

```text
1. Authentication
2. User Profile
3. Resume Management
4. Job Description Analysis
5. Interview Configuration
6. Interview Planning
7. AI Interviewer
8. Real-Time Voice
9. Real-Time Video
10. Speech Analysis
11. Visual Analysis
12. Answer Evaluation
13. Interview Memory
14. Performance Analytics
15. Coaching Engine
16. Practice System
17. Scheduling
18. Notifications
19. Dashboard
20. Administration
```

---

# 10. Authentication & Account Management

## Requirements

Users must be able to:

- Register.
- Login.
- Logout.
- Reset password.
- Verify email.
- Manage profile.
- Delete account.
- Export personal data.
- Delete interview history.
- Manage memory.

Future:

- Google login.
- GitHub login.
- Microsoft login.

---

# 11. User Profile

Each user will have a structured candidate profile.

## Profile Fields

```text
Name
Profile photo
Email
Phone (optional)
Location (optional)
Education
College
Degree
Graduation year
Experience
Skills
Projects
Certifications
Achievements
GitHub
LinkedIn
Portfolio
Target roles
Target companies
Preferred interview language
Preferred communication language
Experience level
Career goals
```

The user can edit these fields at any time.

---

# 12. Resume Management

## Upload

Supported initial format:

- PDF

Future:

- DOCX
- TXT

## Resume Processing

```text
Resume
 ↓
Text Extraction
 ↓
Section Detection
 ↓
Entity Extraction
 ↓
Structured Profile
 ↓
Validation
 ↓
Database
```

## Resume Sections

The parser should attempt to identify:

- Name.
- Contact information.
- Education.
- Skills.
- Experience.
- Internships.
- Projects.
- Certifications.
- Achievements.
- Publications.
- Links.

---

# 13. Resume Intelligence

The system should create a structured representation of the resume.

Example:

```json
{
  "skills": [
    "Java",
    "Spring Boot",
    "SQL"
  ],
  "projects": [
    {
      "name": "Project A",
      "technologies": [
        "Java",
        "Spring Boot",
        "PostgreSQL"
      ],
      "description": "...",
      "role": "Backend Developer"
    }
  ]
}
```

This structured representation becomes part of the interview context.

---

# 14. Target Company

User can enter:

```text
Company:
Microsoft
```

The system stores the target company.

A user can maintain multiple targets:

```text
Microsoft
Google
Amazon
Adobe
Startup X
```

Each company can have separate preparation history.

---

# 15. Target Role

Examples:

```text
Software Engineer
Backend Developer
Frontend Developer
Data Scientist
Data Analyst
Machine Learning Engineer
DevOps Engineer
Cybersecurity Analyst
Product Engineer
```

Custom roles should also be supported.

---

# 16. Job Description

The user can:

- Paste a job description.
- Upload a job description.
- Optionally enter a job URL where supported.

The system extracts:

```text
Required skills
Preferred skills
Responsibilities
Experience
Technologies
Education
Behavioral requirements
Domain knowledge
```

---

# 17. Job-Candidate Gap Analysis

The system compares:

```text
Candidate
      +
Job Description
```

and generates:

```text
Strong Match
Partial Match
Missing Skills
Weak Areas
Recommended Preparation
```

Example:

```text
Java             Strong
Spring Boot      Strong
SQL              Strong
AWS              Moderate
Docker            Weak
Kubernetes       Missing
System Design    Weak
```

This information influences interview generation.

---

# 18. Interview Configuration

Before starting an interview, the user configures:

## Interview Type

```text
HR
Behavioral
Technical
Coding
System Design
Project
Mixed
```

## Difficulty

```text
Beginner
Intermediate
Advanced
Expert
```

## Interviewer Style

```text
Friendly
Professional
Strict
Technical
Stress
Executive
Panel
```

## Duration

```text
15 minutes
30 minutes
45 minutes
60 minutes
Custom
```

## Interview Language

Initially:

- English

Future:

- Hindi.
- Hinglish.
- Other languages.

---

# 19. Interview Planning Engine

Before the interview starts, the system generates an internal interview plan.

Example:

```text
Interview Duration: 30 minutes

Introduction              2 min
Resume                     5 min
Projects                   7 min
Technical                  8 min
Behavioral                 5 min
Candidate Questions        3 min
```

The system should not necessarily reveal the exact question sequence to the candidate.

---

# 20. Interview State Machine

The interview engine will use explicit states.

```text
CREATED
   ↓
PREPARING
   ↓
READY
   ↓
INTRODUCTION
   ↓
RESUME
   ↓
PROJECT
   ↓
TECHNICAL
   ↓
BEHAVIORAL
   ↓
FOLLOW_UP
   ↓
CANDIDATE_QUESTIONS
   ↓
ENDING
   ↓
COMPLETED
   ↓
ANALYZING
   ↓
REPORT_READY
```

The LLM generates/adapts questions, while the Interview Engine controls the state.

---

# 21. AI Interviewer

The AI interviewer should behave like an interviewer rather than a tutor during the interview.

During the interview it should:

- Ask one question at a time.
- Listen to the candidate.
- Understand the answer.
- Determine whether the answer was sufficient.
- Ask follow-ups.
- Challenge unsupported claims.
- Ask for clarification.
- Change topic when appropriate.
- Maintain professional behaviour.

The interviewer should NOT continuously interrupt the candidate with coaching.

Coaching is primarily delivered after an answer or after the interview, depending on mode.

---

# 22. Adaptive Questioning

The interviewer must support:

### Direct follow-up

Candidate:

> "I used Spring Boot for the backend."

AI:

> "Why did you choose Spring Boot?"

### Cross-question

Candidate:

> "The application is scalable."

AI:

> "What specific design decisions make it scalable?"

### Evidence challenge

Candidate:

> "I improved performance significantly."

AI:

> "How did you measure that improvement?"

### Resume challenge

Candidate:

> "I worked on the backend."

AI:

> "Which backend components did you personally implement?"

### Technical depth

Candidate gives a shallow answer.

AI increases depth.

---

# 23. Interviewer Question Decision Logic

The AI should classify each answer approximately as:

```text
CORRECT
PARTIALLY_CORRECT
INCORRECT
INCOMPLETE
IRRELEVANT
VAGUE
OVERLY_LONG
STRONG
```

Then choose the next action:

```text
Strong
→ increase difficulty

Incomplete
→ clarification

Vague
→ ask for example

Incorrect
→ challenge/continue

Very strong
→ deeper question

Off-topic
→ redirect
```

---

# 24. Real-Time Voice System

The user should be able to speak naturally.

Pipeline:

```text
Microphone
 ↓
Voice Activity Detection
 ↓
Speech Recognition
 ↓
Transcript
 ↓
Interview Engine
 ↓
LLM
 ↓
Response
 ↓
Text-to-Speech
 ↓
AI Voice
```

The system should detect when the candidate has stopped speaking.

---

# 25. Speech-to-Text

The initial implementation should support local/open-source speech recognition.

Candidate speech becomes:

```text
Audio
→ Transcript
```

The transcript must retain:

- Timestamp.
- Sentence boundaries.
- Pauses where possible.
- Confidence where available.

---

# 26. Text-to-Speech

The AI interviewer should eventually speak responses.

Requirements:

- Natural voice.
- Low latency.
- Interruptible speech.
- Configurable voice.
- Professional tone.

The system should support interruption:

```text
AI speaking
      ↓
Candidate starts speaking
      ↓
AI stops speaking
      ↓
AI listens
```

This is important for realistic conversation.

---

# 27. Speech Analysis

The system should calculate measurable metrics.

## Metrics

### Speaking rate

```text
Words per minute
```

### Response duration

```text
seconds
```

### Pause frequency

```text
short pauses
long pauses
```

### Filler words

Examples:

```text
umm
uh
actually
basically
like
you know
```

### Repetition

Identify repeated words/phrases.

### Sentence complexity

Estimate overly complicated or fragmented answers.

### Answer length

Compare with expected answer length.

---

# 28. Communication Analysis

The system should analyze:

- Clarity.
- Conciseness.
- Relevance.
- Structure.
- Vocabulary.
- Fluency.
- Filler usage.
- Speaking pace.
- Excessive repetition.

The system should provide evidence for every major conclusion.

Bad:

> Confidence: 61%.

Better:

> Your speaking pace increased significantly during the technical question, and you used several filler words before giving your final answer.

---

# 29. Video Interview

The interview interface should support:

```text
Candidate Camera
AI Interviewer
Microphone
Camera toggle
Mute
Connection status
Interview timer
Question status
```

The interface should remain simple and professional.

---

# 30. Computer Vision Analysis

Computer vision should analyze observable behaviour.

Potential metrics:

### Face

- Face visibility.
- Face position.
- Camera engagement approximation.
- Head orientation.

### Hands

- Hand visibility.
- Movement frequency.
- Gesture frequency.
- Excessive repetitive movement.

### Pose

- Body position.
- Posture stability.
- Significant movement.

---

# 31. Important AI Safety Principle for Visual Analysis

The system must NOT claim:

```text
"You are nervous."
"You are dishonest."
"You lack confidence."
"You are psychologically unstable."
```

based solely on facial or body movement.

Instead it should say:

```text
"You looked away from the camera frequently."
"You changed posture repeatedly."
"Your hand movement increased during this answer."
```

Then provide coaching.

---

# 32. Client-Side Vision Processing

Where technically possible, visual landmark extraction should happen in the browser.

Advantages:

- Lower latency.
- Lower server cost.
- Better privacy.
- Less bandwidth.
- No need to continuously upload raw video frames.

The server should preferably receive derived metrics rather than every camera frame.

---

# 33. Interview Answer Evaluation

Every answer receives multiple evaluation dimensions.

Example:

```text
Relevance             8/10
Correctness            7/10
Technical depth        8/10
Clarity                6/10
Structure              5/10
Conciseness            5/10
Role alignment         8/10
```

The evaluator must also produce evidence.

---

# 34. STAR Analysis

For behavioral questions, detect:

```text
Situation
Task
Action
Result
```

Example:

```text
Situation       ✓
Task            ✓
Action          ✓
Result          ✗
```

Feedback:

> Your answer explained the situation and your actions, but it did not clearly communicate the outcome. End with a measurable result or concrete impact.

---

# 35. Technical Answer Analysis

For technical questions:

```text
Concept understanding
Correctness
Reasoning
Examples
Trade-offs
Depth
Practical experience
```

The system should distinguish between:

> "I know the definition."

and:

> "I can actually apply the concept."

---

# 36. Coding Interview

Future coding mode will provide:

```text
Problem Statement
Code Editor
Test Cases
Language Selector
AI Interviewer
```

The interviewer evaluates:

- Problem understanding.
- Approach.
- Complexity.
- Code quality.
- Edge cases.
- Debugging.
- Communication.

---

# 37. System Design Interview

Future system design mode:

```text
Requirements
      ↓
Architecture
      ↓
Database
      ↓
API
      ↓
Scaling
      ↓
Caching
      ↓
Queues
      ↓
Failure handling
```

AI can challenge the candidate:

> "What happens if traffic increases 100 times?"

> "Why SQL instead of NoSQL?"

> "Where would you introduce caching?"

---

# 38. Interview Report

After an interview, the system generates a comprehensive report.

## Overview

```text
Overall Score: 76/100

Technical: 82
Communication: 69
Problem Solving: 81
Behavioral: 64
Resume Knowledge: 91
Role Alignment: 78
```

---

# 39. Strength Analysis

Example:

```text
Your Strengths

1. Strong project understanding.
2. Good knowledge of Java.
3. Answers were generally relevant.
4. You explained implementation decisions well.
```

Each strength should reference evidence from the interview.

---

# 40. Weakness Analysis

Example:

```text
Your Weaknesses

1. Long answers
2. Weak behavioral structure
3. Filler words
4. Inconsistent eye/camera engagement
5. Limited discussion of measurable project impact
```

---

# 41. Improvement Recommendations

Every weakness must have an action.

Example:

```text
Problem:
Answers are too long.

Recommendation:
Use a 3-part structure:

1. Direct answer.
2. Explanation.
3. Example.

Practice:
60-second response challenge.
```

---

# 42. Answer Rewriting

For selected questions, the system can show:

```text
YOUR ANSWER

...

WHAT COULD BE BETTER

...

EXAMPLE STRUCTURE

...

TRY AGAIN
```

The system should not encourage the candidate to memorize a fake answer.

It should teach the structure.

---

# 43. Retry Mode

Every major weak answer can have:

```text
[Try Again]
```

Flow:

```text
Original Answer
      ↓
Feedback
      ↓
Teaching
      ↓
Retry
      ↓
New Evaluation
      ↓
Comparison
```

Example:

```text
Attempt 1     58
Attempt 2     69
Attempt 3     78
```

---

# 44. Personal Memory System

The system will maintain structured long-term memory.

## Memory Categories

```text
Profile
Career Goals
Skills
Projects
Target Roles
Target Companies
Strengths
Weaknesses
Interview History
Communication Patterns
Technical Gaps
Learning Progress
Preferences
Practice History
```

---

# 45. Memory Rules

The system should NOT blindly store every conversation.

It should store:

- Stable preferences.
- Career goals.
- Relevant resume information.
- Repeated weaknesses.
- Repeated strengths.
- Important learning progress.
- Interview outcomes.

Transient conversational content should have shorter retention or not become permanent memory.

---

# 46. User Memory Controls

Users must be able to:

```text
View Memory
Edit Memory
Delete Memory
Disable Memory
Clear All Memory
```

Example:

```text
AI Memory

✓ You are targeting Software Engineer roles.
✓ You frequently struggle with behavioral answers.
✓ Your project explanation is a strength.

[Edit]
[Delete]
```

---

# 47. Interview History

Each interview stores:

```text
Interview ID
Date
Company
Role
Type
Difficulty
Duration
Score
Transcript
Analysis
Feedback
Weaknesses
Strengths
Question list
Answer evaluations
```

Recording storage should be optional.

---

# 48. Longitudinal Performance

The dashboard should show trends.

Example:

```text
Interview 1     61
Interview 2     65
Interview 3     68
Interview 4     72
Interview 5     78
```

Category trends:

```text
Technical        ↑
Communication    ↑
Behavioral       ↑
DSA              →
System Design    ↓
```

---

# 49. Weakness Engine

The system identifies recurring problems.

Example:

```text
Weakness detected:

"Long answers"

Occurrences:
7 interviews
18 questions

Status:
Needs attention
```

Once performance improves:

```text
Previous:
7/10 interviews

Current:
2/10 interviews

Status:
Improving
```

---

# 50. AI Coaching Engine

The coaching engine transforms interview history into training plans.

Example:

```text
Detected Weakness:
Behavioral interviews

Recommended:

Day 1:
Tell me about yourself.

Day 2:
Leadership example.

Day 3:
Failure experience.

Day 4:
Conflict question.

Day 5:
Full behavioral interview.
```

---

# 51. Adaptive Schedule

The system should generate schedules based on:

```text
Target interview date
Target company
Target role
Available practice time
Current weaknesses
Performance history
```

Example:

```text
Interview in 14 days

Recommended plan:

Week 1
Technical fundamentals
Communication
Projects

Week 2
Company-focused mock interviews
Behavioral
Full simulation
```

---

# 52. Calendar

Users can create practice sessions.

Example:

```text
Monday 7 PM
DSA Practice

Wednesday 7 PM
HR Interview

Friday 7 PM
Full Mock Interview
```

Future integrations:

- Google Calendar.
- Outlook Calendar.

---

# 53. Dashboard

The dashboard should provide a high-level view.

## Dashboard Sections

```text
Welcome
Interview Readiness
Current Target
Upcoming Practice
Recent Interviews
Strengths
Weaknesses
Progress
Recommended Practice
```

---

# 54. Interview Readiness Score

The platform may calculate an overall readiness score.

Example:

```text
Interview Readiness
76/100
```

But this score should be clearly explained.

Example:

```text
Technical           82
Communication       69
Behavioral          64
Role Alignment      78
Resume              91
```

The score is for preparation guidance, not a prediction of hiring success.

---

# 55. Interview Modes

## Mode 1 — Full Mock Interview

Complete simulation.

## Mode 2 — Quick Interview

10–15 minute interview.

## Mode 3 — Weakness Practice

Focus exclusively on known weaknesses.

## Mode 4 — Resume Drill

Questions based only on resume.

## Mode 5 — HR Practice

Behavioral questions.

## Mode 6 — Technical Drill

Technical questions.

## Mode 7 — Stress Interview

More challenging interviewer behaviour.

## Mode 8 — Retry Interview

Questions previously answered poorly.

---

# 56. Interviewer Personality

Interviewer configuration can include:

```text
Tone
Strictness
Speaking speed
Question difficulty
Follow-up aggressiveness
Interruptions
Professionalism
```

Examples:

### Friendly HR

Supportive and conversational.

### Strict Technical

Short questions and deep follow-ups.

### Stress Interviewer

Challenges vague claims.

### Senior Engineer

Focuses on trade-offs and engineering reasoning.

---

# 57. AI Prompt Architecture

Do not use one giant prompt for the entire application.

Separate prompts/modules:

```text
Resume Parser
Job Analyzer
Interview Planner
Question Generator
Answer Evaluator
Follow-up Generator
Communication Analyzer
Feedback Generator
Coach
Memory Extractor
Schedule Generator
```

This makes the system easier to test and improve.

---

# 58. LLM Context Architecture

The LLM should receive only the information needed for the current task.

Example:

```text
Current Question
+
Current Answer
+
Relevant Resume Section
+
Relevant Job Requirement
+
Interview State
+
Previous Few Turns
```

Do not continuously send the entire user history.

---

# 59. Retrieval-Augmented Memory

For long-term memory:

```text
User Question/Interview
        ↓
Embedding
        ↓
Vector Search
        ↓
Relevant Memories
        ↓
LLM Context
```

Use PostgreSQL + pgvector initially.

---

# 60. Database Core Entities

Initial entities:

```text
users
profiles
resumes
resume_sections
target_roles
target_companies
job_descriptions
interviews
interview_questions
interview_answers
answer_analysis
speech_analysis
video_analysis
feedback
weaknesses
strengths
memories
practice_sessions
schedules
notifications
```

---

# 61. Simplified Relationship Model

```text
User
 │
 ├── Profile
 ├── Resumes
 ├── Target Roles
 ├── Target Companies
 ├── Job Descriptions
 ├── Interviews
 │      │
 │      ├── Questions
 │      │      └── Answers
 │      │              ├── Content Analysis
 │      │              ├── Speech Analysis
 │      │              └── Video Analysis
 │      │
 │      └── Interview Report
 │
 ├── Memories
 ├── Weaknesses
 ├── Strengths
 └── Practice Sessions
```

---

# 62. Backend Architecture

Recommended initial architecture:

```text
Spring Boot
│
├── auth
├── users
├── profiles
├── resumes
├── companies
├── jobs
├── interviews
├── questions
├── answers
├── reports
├── memories
├── schedules
└── notifications
```

The backend should expose REST APIs.

Real-time communication can use:

- WebSocket.
- WebRTC infrastructure.
- LiveKit.

---

# 63. AI Service

Python service:

```text
FastAPI
│
├── resume/
├── llm/
├── speech/
├── evaluation/
├── coaching/
├── memory/
└── scheduling/
```

Responsibilities:

- AI inference.
- Resume analysis.
- Speech processing.
- Answer evaluation.
- Coaching generation.
- Memory extraction.

---

# 64. Recommended Technology Foundation

## Frontend

```text
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
```

## Backend

```text
Spring Boot
Java
REST
WebSocket
```

## AI

```text
Python
FastAPI
Qwen3
Ollama
```

## Speech

```text
faster-whisper
VAD
Open-source TTS
```

## Video

```text
WebRTC
LiveKit
MediaPipe
```

## Database

```text
PostgreSQL
pgvector
```

## Cache

```text
Redis
```

## Infrastructure

```text
Docker
Docker Compose
Nginx
GitHub Actions
```

---

# 65. Initial Local Development Environment

The entire basic platform should ideally be runnable with:

```bash
docker compose up
```

Potential services:

```text
frontend
backend
ai-service
postgres
redis
ollama
livekit
nginx
```

This makes development reproducible.

---

# 66. API Design

Example APIs:

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

## Profile

```http
GET /api/profile
PUT /api/profile
```

## Resume

```http
POST /api/resumes
GET /api/resumes
GET /api/resumes/{id}
DELETE /api/resumes/{id}
POST /api/resumes/{id}/analyze
```

## Interview

```http
POST /api/interviews
GET /api/interviews
GET /api/interviews/{id}
POST /api/interviews/{id}/start
POST /api/interviews/{id}/answer
POST /api/interviews/{id}/complete
```

## Reports

```http
GET /api/interviews/{id}/report
```

## Memory

```http
GET /api/memory
DELETE /api/memory/{id}
```

## Practice

```http
GET /api/practice/recommendations
POST /api/practice/session
```

---

# 67. Real-Time Interview API

Real-time events may look conceptually like:

```text
interview.started

question.generated

candidate.speaking

candidate.paused

candidate.finished

transcript.partial

transcript.final

answer.analysis.started

answer.analysis.completed

followup.generated

interviewer.speaking

interviewer.interrupted

interview.completed
```

---

# 68. Performance Requirements

The system should aim for:

### Page load

Target:

```text
< 2–3 seconds
```

under normal conditions.

### UI interaction

Target:

```text
< 100ms
```

for normal local UI actions.

### Partial transcription

Target:

```text
near-real-time
```

rather than waiting for the complete interview.

### AI response

Target:

```text
as low as practical
```

with streaming generation.

### Video

Target:

```text
stable real-time WebRTC
```

rather than high-resolution video at the expense of latency.

---

# 69. Latency Strategy

To minimize latency:

```text
Client-side CV
+
Streaming STT
+
Streaming TTS
+
Streaming LLM
+
Pre-generated question plans
+
Short context windows
+
Caching
+
Local inference
```

Avoid unnecessary:

```text
Client
→ Server
→ AI
→ Server
→ Client
```

round trips.

---

# 70. Scalability Strategy

Initial architecture can run on one machine.

Later:

```text
Load Balancer
      ↓
Backend Instances
      ↓
AI Worker Pool
      ↓
GPU Worker Pool
```

AI processing can become asynchronous where real-time response is not required.

---

# 71. Queue Architecture

Use Redis-backed jobs for expensive operations:

```text
Resume Analysis
Report Generation
Memory Extraction
Long Video Processing
Analytics
```

Example:

```text
Upload Resume
     ↓
API
     ↓
Queue
     ↓
AI Worker
     ↓
Database
```

---

# 72. Security Requirements

Because the platform stores sensitive user data, security is a core requirement.

Must implement:

- Password hashing.
- Secure authentication.
- JWT/session security.
- HTTPS.
- Input validation.
- File validation.
- File-size limits.
- Secure file storage.
- SQL injection protection.
- XSS protection.
- CSRF protection where applicable.
- Rate limiting.
- Authorization checks.
- Secure API design.
- Secrets outside source code.

---

# 73. Resume Upload Security

Uploaded files must be validated.

Requirements:

```text
Allowed file types
Maximum file size
Filename sanitization
Malware scanning where practical
Storage isolation
Access control
```

Never trust uploaded filenames or MIME types blindly.

---

# 74. Privacy Requirements

Users must be able to:

```text
View data
Download data
Delete interview
Delete resume
Delete memory
Delete account
```

Recording should be opt-in.

The platform should clearly explain:

- What is stored.
- Why it is stored.
- How long it is stored.
- How to delete it.

---

# 75. AI Transparency

The system should clearly communicate that:

- AI analysis is an estimate.
- Visual behaviour analysis is based on observable signals.
- Scores are not scientifically validated measures of personality or employability.
- The platform does not guarantee interview success.

---

# 76. Error Handling

The system must gracefully handle:

### Internet interruption

```text
Connection lost
↓
Attempt reconnect
↓
Resume interview
```

### AI failure

```text
AI temporarily unavailable
↓
Retry
```

### Microphone failure

```text
Microphone unavailable
↓
Show diagnostic
↓
Allow text fallback
```

### Camera failure

Allow the interview to continue in voice mode.

### Speech recognition failure

Allow manual/text input.

---

# 77. Interview Recovery

If the browser closes unexpectedly:

```text
Interview state
      ↓
Saved periodically
      ↓
User returns
      ↓
Resume interview
```

This should be implemented for long interviews.

---

# 78. Accessibility

Support:

- Keyboard navigation.
- Screen-reader-friendly UI.
- Proper contrast.
- Captions/transcripts.
- Voice/text alternatives.
- Clear error messages.

---

# 79. Landing Page Requirements

## Hero

Headline:

> Practice Interviews Like the Real Thing.

Supporting message:

> Practice with an AI interviewer that understands your resume, adapts to your answers and gives you actionable feedback.

CTA:

```text
Start Free Interview
```

---

# 80. Landing Page Sections

```text
Hero
Trusted/technology section
How it works
AI Interview
Resume Intelligence
Real-time Analysis
Personalized Feedback
Progress Tracking
Adaptive Coaching
Interview Types
Features
FAQ
Privacy
CTA
Footer
```

---

# 81. Dashboard UI

Main navigation:

```text
Dashboard
Interviews
Practice
Resume
Progress
Schedule
Memory
Profile
Settings
```

---

# 82. Interview UI

The interview page should prioritize the interview itself.

Elements:

```text
AI interviewer
Candidate video
Question
Timer
Microphone
Camera
Connection
Transcript toggle
End Interview
```

Do not overload the screen with analytics while the interview is running.

---

# 83. Interview Report UI

Use sections:

```text
Overview
Score
Strengths
Weaknesses
Communication
Technical
Behavioral
Speech
Visual Metrics
Question Analysis
Recommended Practice
Retry Questions
```

---

# 84. Progress Dashboard

Show:

```text
Overall trend
Technical trend
Communication trend
Behavioral trend
Role readiness
Recurring weaknesses
Recently improved areas
```

---

# 85. Recommended Practice Engine

Every recommendation should answer:

```text
What is wrong?
Why does it matter?
How do I improve?
What should I practice?
```

Example:

```text
Weakness:
Long answers.

Why:
Your responses frequently exceed the expected length.

Improve:
Lead with the answer.

Practice:
60-second answer drill.

[Start Practice]
```

---

# 86. Notification System

Future notifications:

```text
Practice reminder
Interview scheduled
Weekly progress
Goal achievement
Weakness detected
Improvement milestone
```

Notifications must be user-controlled.

---

# 87. Gamification

Optional.

Possible:

```text
Interview streak
Practice streak
Improvement badges
Completed interviews
Skill milestones
```

Do not make gamification more important than actual learning.

---

# 88. Admin Panel

Admin should be able to see system-level information without exposing unnecessary user content.

Potential:

```text
Users
System health
AI usage
Interview counts
Errors
Model performance
Feedback reports
```

Sensitive interview content should require appropriate authorization.

---

# 89. Model Management

The system should not hard-code one model permanently.

Create a model abstraction:

```text
LLMProvider
 ├── OllamaProvider
 ├── OpenAIProvider
 ├── GeminiProvider
 └── OtherProvider
```

This allows future providers without rewriting the interview engine.

---

# 90. AI Evaluation Architecture

Evaluation should ideally be multi-stage.

```text
Candidate Answer
      ↓
Rule-based Metrics
      ↓
Speech Metrics
      ↓
Video Metrics
      ↓
LLM Evaluation
      ↓
Score Aggregation
      ↓
Feedback Generator
```

This prevents the LLM from being responsible for every measurement.

---

# 91. Scoring Engine

Use configurable weights.

Example:

```text
Technical Knowledge       25
Answer Quality            20
Communication             15
Problem Solving           15
Role Alignment            10
Resume Knowledge           5
Speech                      5
Visual Behaviour            5
```

Different interview types can use different weights.

---

# 92. Quality Control

AI-generated feedback should be checked for:

- Contradictions.
- Unsupported claims.
- Duplicate feedback.
- Incorrect technical evaluations.
- Unrealistic recommendations.

For important technical questions, the system should eventually use deterministic validators where possible.

---

# 93. Observability

Production system should include:

```text
Logs
Metrics
Error tracking
Request tracing
AI latency
STT latency
TTS latency
Interview completion rate
```

Track:

```text
Average AI response time
Average transcription delay
Interview failure rate
Model errors
WebRTC failures
```

---

# 94. Testing Strategy

## Unit Tests

For:

- Interview state machine.
- Scoring.
- Resume parsing.
- Memory extraction.
- API validation.

## Integration Tests

For:

- Database.
- Authentication.
- AI service.
- Interview flow.

## End-to-End

Test:

```text
Register
→ Upload resume
→ Configure interview
→ Start
→ Answer
→ Complete
→ Report
```

---

# 95. AI Evaluation Testing

Create a benchmark dataset containing:

```text
Question
Expected concepts
Good answer
Partial answer
Incorrect answer
```

Then evaluate whether the AI correctly classifies answers.

This is important because an impressive UI with poor AI evaluation is still a bad product.

---

# 96. MVP Definition

The MVP must include:

```text
✓ Authentication
✓ Profile
✓ Resume upload
✓ Resume parsing
✓ Target role
✓ Target company
✓ Job description
✓ Interview configuration
✓ AI interviewer
✓ Adaptive questions
✓ Interview history
✓ Basic answer analysis
✓ Basic report
✓ PostgreSQL
✓ Local LLM
```

The MVP does NOT require:

```text
✗ Desktop app
✗ Mobile app
✗ Advanced CV
✗ Company integrations
✗ Coding editor
✗ Google Calendar
✗ Complex subscription system
```

---

# 97. V2

Add:

```text
✓ Speech-to-text
✓ AI voice
✓ Streaming conversation
✓ Voice metrics
✓ Filler detection
✓ Speaking-rate analysis
```

---

# 98. V3

Add:

```text
✓ Live video
✓ WebRTC
✓ Face analysis
✓ Hand analysis
✓ Pose analysis
✓ Camera engagement
```

---

# 99. V4

Add:

```text
✓ Long-term memory
✓ Personalized coaching
✓ Adaptive schedules
✓ Progress tracking
✓ Retry system
✓ Weakness engine
```

---

# 100. V5

Add:

```text
✓ Coding interviews
✓ System design
✓ Advanced role preparation
✓ Company-specific preparation
✓ Desktop app
✓ Mobile app
```

---

# 101. Future V6 — Career Operating System

Long-term vision:

```text
                    IntervAI
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    Interview       Learning        Career
        │              │              │
     Mock HR         DSA            Jobs
     Technical       SQL            Resume
     System Design   Java           Applications
     Coding          ML             Tracking
```

IntervAI eventually becomes a broader personal career preparation platform.

---

# 102. Success Metrics

## Product Metrics

```text
Number of registered users
Number of completed interviews
Interview completion rate
Returning users
Weekly active users
Practice sessions
```

## AI Metrics

```text
Question relevance
Follow-up relevance
Evaluation accuracy
Average response latency
Speech recognition accuracy
```

## Learning Metrics

Most important:

```text
Improvement after repeated interviews
```

For example:

```text
Average communication score
Before practice: 64
After practice: 75
```

---

# 103. North Star Metric

The primary product metric should eventually be:

> **Percentage of users who demonstrate measurable improvement across repeated interviews.**

Not:

> Number of AI conversations.

Because our objective is improvement, not chatbot usage.

---

# 104. MVP Acceptance Criteria

The MVP is considered functional when:

### Authentication

- User can register.
- User can login.
- User can logout.

### Resume

- User can upload a PDF.
- Resume text is extracted.
- Resume information is structured.
- Resume is linked to the user's profile.

### Interview

- User can select role.
- User can select company.
- User can provide JD.
- User can configure interview.
- User can start interview.
- AI asks questions.
- AI generates follow-ups.
- Interview ends correctly.

### Evaluation

- Answers are stored.
- Answers are evaluated.
- Scores are generated.
- Feedback is generated.
- Report is available.

### History

- Previous interviews are visible.
- User can open an old report.

---

# 105. V1 User Story Examples

## US-001 — Registration

**As a user**, I want to create an account so that my interviews and progress are saved.

Acceptance:

```text
Given I am on the registration page
When I provide valid details
Then my account should be created
And I should be able to login.
```

---

## US-002 — Upload Resume

**As a candidate**, I want to upload my resume so that the interviewer can ask resume-specific questions.

Acceptance:

```text
Given I upload a valid PDF
When processing completes
Then the system should extract resume information
And show the parsed profile.
```

---

## US-003 — Start Interview

**As a candidate**, I want to configure my target company and role so that the interview matches my goal.

Acceptance:

```text
Given I select a company and role
When I start the interview
Then the AI should use that context when generating questions.
```

---

## US-004 — Adaptive Follow-up

**As a candidate**, I want the interviewer to ask follow-up questions based on my answer.

Acceptance:

```text
Given I answer a project question
When my answer contains a technical claim
Then the AI may ask a relevant follow-up about that claim.
```

---

## US-005 — Improvement

**As a candidate**, I want feedback that tells me how to improve.

Acceptance:

```text
Given my interview is completed
When I open the report
Then I should see strengths, weaknesses and actionable recommendations.
```

---

# 106. Product Differentiators

IntervAI should differentiate itself through:

### 1. Resume-aware interviewing

Not generic questions.

### 2. Adaptive cross-questioning

The AI reacts to what the candidate says.

### 3. Real-time voice/video

Closer to a real interview.

### 4. Multi-dimensional analysis

Content + speech + observable visual metrics.

### 5. Persistent memory

The system remembers relevant progress.

### 6. Retry-based learning

Bad answers become practice opportunities.

### 7. Longitudinal coaching

The system tracks improvement across weeks/months.

### 8. Open-source foundation

The core system can be self-hosted and built with open technologies.

---

# 107. Critical Product Rule

The AI must behave differently during and after interviews.

## During Interview

Priority:

```text
Realism
Natural conversation
Question quality
Follow-ups
Minimal interruption
```

## After Interview

Priority:

```text
Teaching
Analysis
Evidence
Feedback
Improvement
```

This separation is critical.

---

# 108. Example Complete Interview

```text
SYSTEM

Target:
Software Engineer

Company:
Example Corp

Resume:
Candidate Resume

JD:
Backend Java Developer
```

### AI

> "Good morning. Thanks for joining. Could you start by telling me about yourself?"

Candidate answers.

System analyzes:

```text
Duration: 94 sec
Filler events: 7
Relevance: High
Structure: Moderate
```

AI:

> "You mentioned that you built a Spring Boot backend. What problem was the backend designed to solve?"

Candidate:

> "It was basically a platform..."

AI detects vague explanation.

AI:

> "What was your specific contribution to that system?"

Candidate answers.

AI:

> "You mentioned using PostgreSQL. Why did you choose PostgreSQL instead of a NoSQL database?"

Candidate answers.

AI:

> "Suppose the number of users increases by 100 times. What part of your current architecture would become the first bottleneck?"

Candidate answers poorly.

AI marks:

```text
System Design:
Weak
```

Interview continues.

---

# 109. Post-Interview Result

```text
INTERVIEW RESULT

Overall
76/100

Technical
82

Communication
68

Behavioral
64

Project Knowledge
91

Role Alignment
79
```

### Top Strength

> Strong understanding of your own projects.

### Top Weakness

> Your technical knowledge is stronger than your ability to communicate the reasoning behind your decisions.

### Repeated Issue

> Answers become lengthy when explaining project architecture.

### Practice Recommendation

```text
Practice:
"Explain your project in 90 seconds."

Goal:
Project explanation under 90 seconds.

Target:
Clear architecture + personal contribution + result.
```

---

# 110. Long-Term Example

After 10 interviews:

```text
INTERVIEW PROGRESS

Technical
78 → 86

Communication
61 → 75

Behavioral
54 → 71

Project Explanation
67 → 89

System Design
48 → 63
```

AI coach:

> "Your project explanation and communication have improved significantly. System design remains your weakest area. Your next three practice sessions should focus on architecture, scalability and trade-off questions."

This is the core long-term value proposition.

---

# 111. Repository Structure

Recommended initial repository:

```text
intervai/
│
├── README.md
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── AI.md
│   ├── SECURITY.md
│   └── CONTRIBUTING.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── ai-service/
│   ├── app/
│   ├── models/
│   ├── services/
│   ├── prompts/
│   └── requirements.txt
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   └── docker-compose.yml
│
├── tests/
│
└── .github/
    └── workflows/
```

---

# 112. Development Principles

The project should follow:

```text
Clean Architecture
SOLID
DRY
Modular Design
API-first development
Security by default
Test-driven critical components
Observability
Documentation
```

Avoid:

```text
One giant backend file
One giant AI prompt
Hard-coded interview questions
Hard-coded scores
Storing everything forever
Direct database access from frontend
API keys inside frontend
```

---

# 113. Development Milestones

## Milestone 1

Project foundation.

Deliver:

```text
Repository
Docker
Frontend
Backend
Database
Basic authentication
```

---

## Milestone 2

Candidate profile.

Deliver:

```text
Profile
Resume upload
Resume parser
Resume dashboard
```

---

## Milestone 3

AI interviewer.

Deliver:

```text
Interview configuration
Question generation
Adaptive follow-ups
Interview state machine
```

---

## Milestone 4

Interview evaluation.

Deliver:

```text
Answer analysis
Scores
Feedback
Report
```

---

## Milestone 5

Voice.

Deliver:

```text
Microphone
STT
TTS
Streaming conversation
```

---

## Milestone 6

Video.

Deliver:

```text
WebRTC
LiveKit
Camera
Face
Hand
Pose
```

---

## Milestone 7

Memory.

Deliver:

```text
Persistent memory
Interview history
Weakness detection
Progress tracking
```

---

## Milestone 8

Coach.

Deliver:

```text
Practice plans
Retry system
Adaptive schedule
Progress recommendations
```

---

# 114. Final Product Architecture

```text
                         INTERVAI
                            │
                ┌───────────┴───────────┐
                │                       │
              WEB                   DESKTOP
                │                       │
                └───────────┬───────────┘
                            │
                       API Gateway
                            │
              ┌─────────────┼─────────────┐
              │             │             │
           Backend       AI Service    Real-Time
              │             │             │
         Spring Boot      FastAPI       LiveKit
              │             │             │
              │       ┌─────┼─────┐       │
              │       │     │     │       │
              │      LLM   STT   TTS      │
              │       │     │     │       │
              │       └─────┼─────┘       │
              │             │             │
              │        Analysis Engine    │
              │             │             │
              └─────────────┼─────────────┘
                            │
                    PostgreSQL + pgvector
                            │
                          Memory
                            │
                       AI Coaching
                            │
                      User Progress
```

---

# 115. Final Product Definition

IntervAI is not simply:

> "ChatGPT for interviews."

It is:

> **A persistent AI interview simulation and coaching platform that understands a candidate's resume, target role and career goals; conducts adaptive real-time interviews; evaluates answers and observable communication signals; identifies recurring weaknesses; teaches the candidate how to improve; and continuously adapts future practice based on historical performance.**

The core product loop is:

```text
YOUR RESUME
     +
YOUR TARGET ROLE
     +
YOUR TARGET COMPANY
     +
JOB DESCRIPTION
     +
YOUR PREVIOUS PERFORMANCE
          ↓
    AI INTERVIEWER
          ↓
   REAL-TIME INTERVIEW
          ↓
   ANSWER ANALYSIS
          ↓
   SPEECH ANALYSIS
          ↓
   VISUAL METRICS
          ↓
     REPORT
          ↓
   PERSONAL COACH
          ↓
   PRACTICE PLAN
          ↓
      RETRY
          ↓
   IMPROVEMENT
          ↓
   LONG-TERM MEMORY
          ↓
BETTER NEXT INTERVIEW
```

---

# 116. Immediate Development Decision

The first implementation should **not** attempt the complete system.

The correct development order is:

```text
STEP 1
Product architecture
        ↓
STEP 2
Database schema
        ↓
STEP 3
Repository setup
        ↓
STEP 4
Authentication
        ↓
STEP 5
Profile
        ↓
STEP 6
Resume upload + parser
        ↓
STEP 7
Target role/company/JD
        ↓
STEP 8
Interview state machine
        ↓
STEP 9
Local LLM interviewer
        ↓
STEP 10
Adaptive follow-up engine
        ↓
STEP 11
Answer evaluation
        ↓
STEP 12
Interview report
        ↓
STEP 13
Speech
        ↓
STEP 14
Real-time video
        ↓
STEP 15
Computer vision
        ↓
STEP 16
Long-term memory
        ↓
STEP 17
Coaching engine
        ↓
STEP 18
Adaptive scheduling
        ↓
STEP 19
Coding/System Design interviews
        ↓
STEP 20
Desktop + Mobile
```

# 117. Definition of Done for the Entire Product

The product will be considered mature when a new user can:

```text
Create account
       ↓
Build profile
       ↓
Upload resume
       ↓
Select Microsoft / Google / Amazon / any target
       ↓
Select Software Engineer / Data Scientist / etc.
       ↓
Upload JD
       ↓
Start realistic interview
       ↓
Talk naturally with AI
       ↓
Receive adaptive cross questions
       ↓
Be analyzed on answer + speech + observable video metrics
       ↓
Complete interview
       ↓
Receive evidence-based report
       ↓
Practice weak answers
       ↓
Retry interview
       ↓
See improvement
       ↓
Receive personalized schedule
       ↓
Return weeks later
       ↓
AI remembers relevant previous performance
       ↓
Next interview automatically adapts
```

That is the **actual product vision**.

The MVP is deliberately much smaller, but every architectural decision should leave a clean path toward this final system.
---

# 118. Detailed System Architecture (v2)

## 118.1 High-Level Component Diagram

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────────┐ │
│  │ Landing Pg │ │ Auth Pages │ │ Dashboard  │ │ Interview Room (Voice/  │ │
│  │ (SEO, SSR) │ │ (Login/Reg)│ │ (SPA)      │ │ Video/Text + 3D Avatar) │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────────┘ │
│        React 18 + TypeScript + Vite + Tailwind + shadcn/ui + R3F         │
└──────────────────────────────────┬───────────────────────────────────────┘
                                    │ HTTPS (REST) + WSS (Realtime)
┌──────────────────────────────────▼───────────────────────────────────────┐
│                             API GATEWAY / BFF                            │
│        Nginx / Node (Express) — TLS termination, rate limiting,          │
│        JWT validation, request routing, CORS, compression                │
└───────┬───────────────────┬───────────────────┬──────────────────────────┘
        │                   │                   │
┌───────▼────────┐  ┌───────▼─────────┐ ┌───────▼───────────┐
│  CORE BACKEND   │  │   AI SERVICE     │ │  REALTIME SERVICE  │
│  (Spring Boot / │  │   (FastAPI/Py)   │ │  (LiveKit/WebRTC)   │
│  Node/NestJS)   │  │                  │ │                     │
│  - Auth (JWT)   │  │ - Resume Parser  │ │ - Voice room        │
│  - Users        │  │ - JD Analyzer    │ │ - Video room        │
│  - Profiles     │  │ - Interview      │ │ - STT streaming     │
│  - Resume CRUD  │  │   Planner        │ │ - TTS streaming     │
│  - Interviews   │  │ - Question Gen   │ │ - Avatar viseme     │
│  - Reports      │  │ - Answer Eval    │ │   sync events       │
│  - Notifications│  │ - Speech/Vision  │ │                     │
│  - Scheduling   │  │   Analysis       │ │                     │
│  - Billing(future)│ │ - Coaching Engine│ │                     │
└───────┬─────────┘  └────────┬─────────┘ └──────────┬──────────┘
        │                     │                       │
        └──────────┬──────────┴───────────┬───────────┘
                    │                      │
        ┌───────────▼───────────┐  ┌───────▼────────────┐
        │   PRIMARY DATABASE     │  │   OBJECT STORAGE     │
        │  PostgreSQL + pgvector │  │  Resumes, avatars,   │
        │  (Supabase free tier)  │  │  audio/video clips    │
        │                        │  │  (Supabase Storage /  │
        │  Redis (session/cache/ │  │   Cloudinary free)    │
        │  queue - Upstash free) │  │                        │
        └────────────────────────┘  └────────────────────────┘
                    │
        ┌───────────▼───────────┐
        │   LLM / MODEL LAYER     │
        │  Local: Ollama (Qwen3,  │
        │  Llama 3.1) for dev      │
        │  Hosted free-tier:       │
        │  Groq / Gemini Flash     │
        │  (generous free quota)   │
        └──────────────────────────┘
```

## 118.2 Why This Split

- **Core Backend** owns identity, relational data, and business rules — it is the source of truth and the only service allowed to write to the primary tables.
- **AI Service** is stateless per-request: it receives context (resume chunk, question, answer) and returns structured JSON (score, feedback, next question). It never talks to the client directly — always via the gateway/backend — so prompts, models, and API keys stay server-side.
- **Realtime Service** exists only for voice/video/avatar streaming — it should not own business logic. It emits events (`answer_submitted`, `silence_detected`, `viseme_frame`) that the AI Service and Backend consume.
- This separation lets each layer scale and be swapped independently (e.g., swap Ollama for a hosted LLM without touching the backend).

## 118.3 Sequence Diagram — End-to-End Interview Turn

```text
User (mic/text)          Realtime Svc         AI Service         Backend         DB
     │  speaks/types            │                   │                │           │
     │─────────────────────────▶│                   │                │           │
     │                          │  audio chunk       │                │           │
     │                          │──(STT)────────────▶│                │           │
     │                          │                    │ transcript      │           │
     │                          │◀───────────────────│                │           │
     │                          │  transcript event   │                │           │
     │                          │────────────────────────────────────▶│           │
     │                          │                    │                │  save answer
     │                          │                    │                │──────────▶│
     │                          │                    │◀ fetch context ─│           │
     │                          │                    │  (resume, JD,   │           │
     │                          │                    │   prior turns)  │           │
     │                          │   evaluate + next Q │                │           │
     │                          │◀───────────────────│                │           │
     │                          │  TTS + viseme frames│                │           │
     │◀─────────────────────────│                    │                │           │
     │ hears/reads next question│                    │                │           │
```

## 118.4 Data Flow — Resume to First Question

```text
Upload PDF/DOCX
      │
      ▼
Object Storage (raw file, private bucket)
      │
      ▼
AI Service: Resume Parser (extract text → structured JSON)
      │
      ▼
Backend: persist structured resume (skills, projects, experience) → Postgres
      │
      ▼
AI Service: Embed resume sections → pgvector
      │
      ▼
Interview Planner: resume + JD + role → interview plan (question sequence + weights)
      │
      ▼
Interview Room opens with first question
```

---

# 119. Authentication Flow (Detailed)

## 119.1 Screens

```text
/                → Landing page (public)
/register        → Create account
/verify-email    → Email OTP / link confirmation
/login           → Login
/forgot-password → Request reset link
/reset-password  → Set new password (token-gated)
/dashboard       → Post-login home (protected)
```

## 119.2 Register Flow

```text
1. User enters: Full name, Email, Password, Confirm password
2. Client-side validation (password strength meter, email format)
3. POST /api/auth/register
4. Backend: hash password (bcrypt/argon2), create user row (status=UNVERIFIED)
5. Backend: send verification email (6-digit OTP, 10 min expiry) via free tier
   email provider (Resend / Brevo / SendGrid free tier — 100–300 emails/day free)
6. User redirected to /verify-email
7. User enters OTP → POST /api/auth/verify → status=ACTIVE → auto-login (JWT issued)
8. Redirect to /onboarding (first-time profile setup) → /dashboard
```

## 119.3 Login Flow

```text
1. POST /api/auth/login { email, password }
2. Backend verifies password hash, checks status=ACTIVE
3. Issue short-lived access token (JWT, 15 min) + long-lived refresh token
   (httpOnly, Secure, SameSite=Strict cookie, 7–30 days)
4. Frontend stores access token in memory (not localStorage) to reduce XSS risk
5. Silent refresh via /api/auth/refresh using the httpOnly cookie
6. On success → /dashboard
7. Rate-limit login attempts (e.g., 5/min per IP+email) to prevent brute force
```

## 119.4 Forgot / Reset Password Flow

```text
1. /forgot-password: user enters email
2. POST /api/auth/forgot-password → backend always responds 200 (never reveal
   whether the email exists — prevents account enumeration)
3. If account exists: generate single-use reset token (JWT or random string,
   30 min expiry), store hash of token in DB, email a reset link
4. User clicks link → /reset-password?token=...
5. User sets new password → POST /api/auth/reset-password { token, newPassword }
6. Backend validates token hash + expiry, updates password hash,
   invalidates all existing refresh tokens (force re-login everywhere)
7. Redirect to /login with success toast
```

## 119.5 Security Requirements Summary

```text
Password hashing        bcrypt (cost 12) or argon2id
Token strategy           short-lived JWT access + httpOnly refresh cookie
Email verification       required before first interview
Rate limiting             login, register, forgot-password, OTP endpoints
CSRF protection           SameSite cookies + CSRF token on state-changing routes
Optional 2FA (v2 feature) TOTP-based, off by default
Social login (future)     Google OAuth2 (highest priority for Indian students),
                          GitHub OAuth2
```

---

# 120. Free & Open Database / Storage Strategy

The product must run entirely on free tiers for MVP and small-scale usage, with a clean upgrade path.

## 120.1 Recommended Stack (Free Tier)

```text
Primary DB        Supabase (managed PostgreSQL + pgvector, free tier:
                   500MB DB, 1GB file storage, 2GB bandwidth/month,
                   50k monthly active users on auth — plenty for MVP)
Object storage     Supabase Storage (bundled with above) — resumes,
                   profile photos, avatar assets, saved report PDFs
Cache/queue        Upstash Redis (free tier: 10k commands/day, serverless)
Vector search       pgvector extension inside the same Supabase Postgres
                   (no separate vector DB needed at MVP scale)
Email                Resend or Brevo free tier (verification + notifications)
LLM (dev)             Ollama running Qwen3 / Llama 3.1 locally — zero cost
LLM (hosted, free)     Groq (Llama 3.x, very low latency, generous free
                   requests/min) or Google Gemini Flash free tier as backup
STT                  faster-whisper (open-source, self-hosted, free)
TTS                  Piper / Coqui TTS (open-source) for MVP; upgrade to
                   ElevenLabs free tier for higher realism later
Deployment (free)   Frontend: Vercel/Netlify free tier
                   Backend + AI service: Render/Railway free tier or a
                   single free-tier VM (Oracle Cloud Always Free — 2 AMD
                   VMs / 1 ARM VM with 24GB RAM, genuinely free forever)
```

This stack has **zero mandatory monthly cost** for development and early user testing. Every component has a documented upgrade path (Supabase Pro, dedicated GPU inference, ElevenLabs paid tier, etc.) once the product has real traction — nothing needs to be re-architected, only re-pointed via environment variables.

## 120.2 Why Supabase Specifically

- It is Postgres, not a proprietary NoSQL store — matches the relational schema already defined in Section 60 (Database Core Entities) with zero translation cost.
- `pgvector` is a native extension, so resume/interview embeddings for retrieval-augmented memory (Section 59) live in the same database — no second system to run or pay for.
- Built-in auth, storage, and row-level security reduce backend boilerplate, but the app should NOT hard-couple to Supabase's auth SDK — keep a thin adapter layer so it can be swapped for a self-hosted Postgres + custom auth later without a rewrite.

## 120.3 What Gets Stored Where

```text
users, profiles, resumes(meta), interviews, questions, answers,
scores, reports, memory_notes, schedules      → Postgres (Supabase)
resume PDFs/DOCX, generated PDF reports,
avatar customization JSON, profile photos      → Object storage (Supabase Storage)
resume/answer embeddings (vector[1536])        → pgvector column in Postgres
session cache, rate-limit counters, active
interview turn state (for low-latency reads)   → Redis (Upstash)
```

Every uploaded resume is stored twice in effect: the **raw file** in object storage (for re-download / re-parsing / audit) and the **parsed structured JSON** in Postgres (for fast querying by the AI service). Nothing uploaded is ever silently discarded.

---

# 121. Landing Page — Detailed Design & Copy Brief

## 121.1 Section-by-Section Structure

```text
1. Sticky Nav        Logo | Product | How it works | Pricing | Login | Get Started (CTA)
2. Hero               Headline + subhead + primary CTA + animated 3D avatar
                      preview (idle-breathing loop) + trust strip (colleges/
                      companies logos, "1000+ mock interviews taken")
3. Problem/Agitation  3 short cards: "Generic questions." "No real feedback."
                      "No idea what to fix." — mirrors Section 3.
4. How It Works        4-step visual: Upload Resume → Set Target Role/Company
                      → Interview with AI → Get Report & Learn
5. Live Demo Preview   Embedded interactive widget: short 60-second sample
                      Q&A with the avatar, no signup required
6. Feature Grid        6 cards: Resume-aware AI, Voice+Video+Text modes,
                      Real-time follow-ups, Detailed report, Progress
                      tracking, Personalized coaching
7. Interview Modes     Visual tabs: Voice, Video (3D Avatar), Text-only —
                      emphasize accessibility (works on low bandwidth too)
8. Social Proof        Testimonials (placeholder until real users), college
                      logos strip, "Built for Indian placements + global
                      job hunts"
9. Sample Report        Screenshot/carousel of an actual generated report
10. Pricing              Free tier + Pro tier (clear, simple, INR + USD toggle)
11. FAQ                  8–10 Qs: data privacy, resume storage, is it free,
                       works for freshers?, works for non-CS branches?
12. Final CTA             "Start your first mock interview — free"
13. Footer                Product/Company/Legal columns, social links,
                       language selector
```

## 121.2 Visual/Brand Direction

```text
Palette        Deep navy/indigo primary (#0B1B3A range) + electric accent
              (teal/cyan or violet) — feels "AI/tech" and trustworthy,
              consistent with the user's existing navy/blue branding
              pattern used across other projects
Typography      A geometric sans (e.g., Inter/Poppins) for headings,
              a highly readable body font — no more than 2 font families
Motion          Subtle scroll-reveal animations, avatar idle animation
              in hero, no motion that blocks reading on slow connections
Imagery         Avoid generic stock "office handshake" photos — use the
              3D avatar, UI screenshots, and abstract geometric shapes
Tone of copy   Direct, encouraging, no corporate jargon — speaks to a
              nervous-but-ambitious student, not a recruiter
```

## 121.3 Sample Hero Copy (for the AI agent / copywriter to refine)

```text
Headline:   "Practice interviews with an AI that actually knows your resume."
Subhead:    "Upload your resume, pick your dream role, and talk to a
             realistic AI interviewer — voice, video, or text. Get a
             detailed report on exactly what to fix, then practice
             until you're ready."
CTA:        "Start Free Mock Interview"
Sub-CTA:    "No credit card. Takes 2 minutes to set up."
```

## 121.4 SEO Requirements (see also Section 127)

```text
Title tag           "IntervAI — AI Mock Interview Practice with Real-Time
                    Feedback | Free for Students"
Meta description    Under 160 chars, includes "AI interview practice",
                    "resume-based mock interview", "placement preparation"
H1                   Matches primary keyword intent, one per page
Structured data       Organization, SoftwareApplication, FAQPage schema.org
                    JSON-LD on landing page
Core Web Vitals       LCP < 2.5s, CLS < 0.1, INP < 200ms — hero must not
                    block on 3D avatar model load (lazy-load, show a 2D
                    poster image first, hydrate 3D on interaction/idle)
Sitemap & robots       /sitemap.xml, /robots.txt from day one
```

---

# 122. Dashboard — Detailed UI Specification

## 122.1 Layout

```text
┌─────────────────────────────────────────────────────────────────┐
│ Top bar: Logo | Search | Notifications | Avatar/Profile menu     │
├───────────┬─────────────────────────────────────────────────────┤
│ Sidebar    │  Main content area                                  │
│ - Home     │  ┌─────────────────────────────────────────────┐   │
│ - Resume   │  │ Readiness Score ring + trend                 │   │
│ - Interview│  ├─────────────────────────────────────────────┤   │
│ - Reports  │  │ "Start New Interview" primary card            │   │
│ - Practice │  │  (mode selector: Voice / Video / Text)        │   │
│ - Progress │  ├─────────────────────────────────────────────┤   │
│ - Schedule │  │ Recent interviews list (score, role, date)     │   │
│ - Settings │  ├─────────────────────────────────────────────┤   │
│            │  │ Weakness/strength summary (radar or bar chart) │   │
│            │  ├─────────────────────────────────────────────┤   │
│            │  │ Recommended practice for today                 │   │
└───────────┴─────────────────────────────────────────────────────┘
```

## 122.2 Empty States (First-Time User)

```text
No resume uploaded  → Big prompt card: "Upload your resume to unlock
                      personalized interviews" + drag-and-drop uploader
No interviews yet   → "Your first mock interview takes about 15 minutes.
                      Ready?" with role/company quick-select
No reports yet       → Illustration + "Complete an interview to see your
                      report here"
```

## 122.3 Resume Page

```text
- Drag-and-drop / browse upload (PDF, DOCX, max 5MB)
- Upload progress bar → "Analyzing your resume..." skeleton state
- On success: parsed view — Skills / Projects / Experience / Education
  chips, each editable inline (user can correct parser mistakes)
- "Re-upload" and "Download original" actions
- Resume score / completeness meter (e.g., "78% — add quantified impact
  to your project bullets")
- Version history if resume is re-uploaded (keep last 5)
```

## 122.4 Component Library Notes

Use shadcn/ui primitives (Card, Dialog, Tabs, Progress, Avatar, Toast, Sheet for mobile drawers) so the AI coding agent has a consistent, already-accessible base rather than inventing bespoke components.

---

# 123. Resume Upload → Analysis Pipeline (Implementation Detail)

```text
1. Client: file picker/drag-drop → client-side validation (type, size)
2. Client: PUT to pre-signed object-storage URL (direct upload, backend
   never proxies the raw bytes — keeps backend stateless and fast)
3. Client: POST /api/resumes { storagePath, originalFilename }
4. Backend: create `resumes` row (status=PROCESSING), enqueue parse job
   (Redis queue / simple async task)
5. AI Service worker: download file → extract text (pdfplumber / python-docx)
   → LLM-assisted structuring into JSON schema:
      { personalInfo, education[], experience[], projects[], skills[],
        certifications[], achievements[] }
6. AI Service: generate embeddings per section → write to pgvector
7. Backend: update `resumes` row (status=READY) with structured JSON
8. Backend: emit websocket/event → frontend live-updates from
   "Analyzing..." to the parsed view without a page refresh
9. Failure path: status=FAILED with a human-readable reason
   ("Couldn't read this PDF — try re-exporting or upload DOCX") — never
   a silent failure
```

Every resume, its parsed JSON, and its embeddings are retained (subject to the user's own delete/export controls from Section 10) so future interviews and the coaching engine can always reference the latest analyzed version.

---

# 124. Interview Modes — Text Mode Added (Expansion of Section 55)

## Mode 9 — Text-Only Interview (New, First-Class Mode)

For low-bandwidth users, accessibility needs, or users who simply prefer typing:

```text
- No microphone/camera required at all
- AI interviewer messages render as chat bubbles (optionally with TTS
  read-aloud as an opt-in toggle, and optionally the 3D avatar shown
  in a small "listening/typing" idle state for continuity of experience)
- User types answers in a chat input (supports code blocks for technical
  interviews, with syntax highlighting)
- Same evaluation pipeline as voice mode: relevance, correctness,
  structure, depth — minus speech/visual metrics (those sections of the
  report are simply omitted, not faked)
- Fully keyboard-navigable, screen-reader friendly — this mode doubles
  as the platform's core accessibility path
```

Text mode should share the same backend interview state machine (Section 20) and question-generation/evaluation engine as voice/video mode — only the transport and analysis inputs differ. This avoids building a second interview engine.

---

# 125. Human-Like AI Interviewer Presence (3D Avatar / Talking Head)

This is the most visible new capability requested: an interviewer that *looks and sounds* like a real person sitting across from the candidate — not just a chat window.

## 125.1 Goal

A visual, animated interviewer (male or female, professional attire) that:

```text
- Speaks the AI-generated questions aloud with lip-sync
- Shows idle behavior (blinking, subtle head movement, breathing) when
  not speaking, so it doesn't feel static/robotic
- Has a small set of expressive states: neutral, listening, thinking,
  approving nod, follow-up/probing look
- Can be swapped between a couple of avatar presets (e.g., "Priya —
  HR Manager", "Arjun — Senior Engineer") to match interview personality
  (Section 56)
```

## 125.2 Recommended Approach — Phased

### Phase 1 (MVP): Stylized 3D Avatar via Web Tech (fully free/open)

```text
Avatar model      Ready Player Me (free avatar creation, glTF export) or
                  a single custom-modeled glTF character
Rendering          three.js via react-three-fiber (@react-three/fiber,
                  @react-three/drei) directly in the browser — no server
                  video rendering cost
Lip-sync            Generate visemes from the TTS output:
                  - If using Piper/Coqui TTS: use phoneme timestamps →
                    map to a small viseme set (AA, E, I, O, U, MBP, FV,
                    rest) → drive morph targets/blend shapes on the glTF
                    mesh in real time
                  - rhubarb-lip-sync (open-source, offline) can also
                    generate viseme timing from an audio file as a
                    fallback if TTS doesn't expose phoneme timing
Animation           Idle/blink/head-turn via simple procedural animation
                  (sine-wave head bob, randomized blink timer) — no
                  motion-capture budget needed for MVP
Cost                 $0 — everything renders client-side in WebGL
```

This gives a genuinely "looking like a human, wearing a professional outfit, sitting across from you" experience without any per-minute API cost, which matters at scale (thousands of interview-minutes).

### Phase 2 (Upgrade path): Photoreal Talking-Head Video

Once there's budget/traction, swap in a higher-realism layer without changing the surrounding architecture:

```text
Options (evaluate at build time — pricing/availability changes):
 - Open-source: SadTalker or Wav2Lip (self-hosted, GPU required) —
   generates a lip-synced video from a single photo + audio
 - Hosted APIs: D-ID, HeyGen, Tavus, Synthesia-style avatar APIs —
   real-time or near-real-time streaming avatar video, paid per minute
```

The interview room UI should treat the "interviewer presence" as a pluggable component — `<InterviewerAvatar mode="3d" | "video" />` — so Phase 1 and Phase 2 are interchangeable behind one interface, and text-mode simply renders `mode="none"` with just the transcript.

## 125.3 Real-Time Flow (3D Avatar)

```text
AI Service generates answer text
        │
        ▼
TTS engine synthesizes audio + phoneme/viseme timing
        │
        ▼
Realtime Service streams: audio chunks + viseme events (over WebSocket)
        │
        ▼
Client: <audio> plays synced with requestAnimationFrame updates to the
avatar's morph targets, so mouth movement matches the audio in real time
```

## 125.4 Non-Negotiable UX Rule

The avatar must never be the bottleneck: if the 3D model fails to load (older device, low-end mobile, or WebGL unsupported), the interview must **gracefully fall back** to a 2D static portrait with audio, or to text mode — the candidate should never be blocked from starting an interview because of avatar rendering.

## 125.5 Ethical/Trust Note

The avatar is clearly labeled as an AI interviewer ("You're speaking with an AI-simulated interviewer") — consistent with Section 75 (AI Transparency). It is a coaching tool, not an impersonation of a real recruiter.

---

# 126. Continuous Learn → Test → Review → Re-Test Loop (State Machine)

This formalizes the cycle described by the user: interview → detailed breakdown of strengths/weaknesses → teaching/learning content → practice → re-test → measure improvement → repeat.

## 126.1 Loop as a State Machine

```text
        ┌───────────────────────────────────────────────────────┐
        │                                                        │
        ▼                                                        │
  [ INTERVIEW ] ──complete──▶ [ REPORT & ANALYSIS ] ──▶ [ LEARN ] │
        ▲                              │                    │    │
        │                              ▼                    │    │
        │                    [ WEAKNESS DETECTED? ]          │    │
        │                      │             │               │    │
        │                     yes            no               │    │
        │                      ▼             ▼                │    │
        │             [ RECOMMEND       [ MAINTAIN &          │    │
        │              PRACTICE PLAN ]   ADVANCE DIFFICULTY ]  │    │
        │                      │             │                │    │
        │                      └──────┬──────┘                │    │
        │                             ▼                        │    │
        │                     [ PRACTICE / TEACHING ]◀─────────┘    │
        │                             │                              │
        │                             ▼                              │
        │                    [ RETRY / RE-TEST ] ─────────completes──┘
        │                             │
        └─────── improvement < target ┘
```

## 126.2 What "Teach" Means Concretely

After a report is generated, for each detected weakness the system produces a **micro-lesson**, not just a score:

```text
Weakness detected:   "System design answers lack trade-off reasoning"
Micro-lesson:          - Short explanation of the concept (e.g., what
                          "trade-off reasoning" means in a system design
                          answer, with a good vs. weak example)
                        - A worked example rewrite of the user's own
                          answer (Section 42, Answer Rewriting)
                        - 2–3 practice questions targeting exactly this gap
                        - A "Mark as understood" / "Practice again" action
```

## 126.3 Data Model Addition

```text
learning_modules(id, weakness_tag, title, explanation_md, example_answer,
                  linked_practice_question_ids[])
user_learning_progress(user_id, learning_module_id, status
                  [NOT_STARTED|IN_PROGRESS|UNDERSTOOD], last_practiced_at)
```

This ties directly into the existing Weakness Engine (Section 49) and Adaptive Schedule (Section 51) — the loop is not a separate feature, it is those two sections made explicit and cyclical with a visible UI (a "Learning Path" tab on the dashboard).

## 126.4 Dashboard Surface

```text
New sidebar item: "Learning Path"
  → Shows all detected weaknesses across interview history, grouped,
    each with a progress bar (Not Started / Practicing / Mastered)
  → Clicking a weakness opens its micro-lesson + linked practice + a
    "Retest this area" button that launches a focused Mode-3 interview
    (Weakness Practice, Section 55)
```

---

# 127. Internationalization, SEO & Localization Standards

## 127.1 i18n Strategy

```text
Default locale         en-IN (English, India) — Indian placement
                       terminology (CGPA, campus placement, off-campus,
                       "on-campus drive") understood natively
Secondary locale        en-US/en-GB neutral English for global users —
                       toggle in footer/nav, detected via browser
                       Accept-Language header as a suggestion, never
                       forced
Currency display        Auto-detect via IP/locale: ₹ for India, $ for
                       US, with manual override
Framework                 react-i18next or next-intl (if using Next.js)
                       — all UI strings externalized to locale JSON from
                       day one, even if only one locale ships at launch,
                       so adding Hindi/regional languages later is a
                       content task, not a re-engineering task
Resume parsing            Must not assume US-style resumes — support
                       Indian resume conventions (CGPA out of 10,
                       academic percentage, "10th/12th" schooling
                       references, Indian college/university names)
```

## 127.2 SEO Checklist (beyond Section 121.4)

```text
✔ Server-rendered or statically generated landing/marketing pages
  (Next.js SSG/ISR, or a separate static marketing site) — the SPA
  dashboard behind auth does NOT need SEO, but the public landing,
  pricing, and blog/content pages do
✔ Semantic HTML (nav, main, article, section) — not div-soup
✔ Descriptive alt text on all images
✔ Canonical URLs, no duplicate content across locale variants
✔ Blog/content hub (e.g., "Placement interview questions for [Company]",
  "How to answer 'Tell me about yourself'") — this is the primary
  organic-growth channel for an Indian student audience and should be
  planned as a CMS-backed section (Markdown/headless CMS) from v1
✔ Fast TTFB via edge/CDN hosting (Vercel/Netlify edge network)
```

## 127.3 Accessibility (WCAG 2.1 AA target)

```text
✔ Full keyboard navigation, visible focus states
✔ Screen-reader labels on all interactive elements
✔ Color contrast ≥ 4.5:1 for body text
✔ Captions/transcript always available during voice/video interviews
  (ties directly into Text Mode, Section 124, which doubles as the
  accessible interview path)
✔ Respect prefers-reduced-motion for avatar/scroll animations
```

---

# 128. Responsive Design Standards

```text
Breakpoints (Tailwind defaults, used as-is unless a strong reason not to):
  sm   640px   Large phones
  md   768px   Tablets
  lg  1024px   Small laptops
  xl  1280px   Desktops
  2xl 1536px   Large desktops

Mobile-first rules:
  - Sidebar (Section 122.1) collapses to a bottom nav bar or hamburger
    drawer below `md`
  - 3D avatar canvas scales down and drops to a lower poly/quality
    preset below `md` to preserve performance and battery
  - Interview room on mobile: avatar/video minimized to a small
    picture-in-picture circle, transcript takes the primary viewport —
    mirrors familiar video-call UI patterns (WhatsApp/Zoom) for
    instant familiarity to Indian mobile-first users
  - All tap targets ≥ 44x44px
  - Forms (register/login/resume upload) tested on 360px-wide viewports
    as the primary target, not an edge case — a large share of the
    Indian student user base is mobile-first
```

---

# 129. Updated Technology Stack Summary (v2, Free-Tier-First)

```text
Frontend            React 18 + TypeScript + Vite (or Next.js if SSR/SEO
                    on marketing pages is prioritized) + Tailwind CSS +
                    shadcn/ui + react-i18next
3D/Avatar             three.js + @react-three/fiber + @react-three/drei,
                    Ready Player Me avatars (glTF)
Backend               Spring Boot (Java) OR Node.js/NestJS — pick one;
                    NestJS lowers the barrier for a single full-stack
                    AI coding agent to generate both frontend and backend
                    in a consistent language (TypeScript end-to-end),
                    which is the pragmatic recommendation for this
                    project's stated goal of AI-agent-driven generation
AI Service             Python + FastAPI
LLM                    Ollama (Qwen3 / Llama 3.1) local dev; Groq or
                    Gemini Flash free tier for hosted low-cost inference
Speech                  faster-whisper (STT), Piper/Coqui (TTS)
Realtime                LiveKit (self-hostable, has a free tier) or
                    plain WebRTC + WebSocket for MVP
Database                PostgreSQL + pgvector via Supabase free tier
Object storage           Supabase Storage
Cache/Queue               Upstash Redis free tier
Auth                       JWT (access + refresh), bcrypt/argon2,
                        Google OAuth2 (Indian + global users overwhelmingly
                        prefer "Continue with Google")
Email                       Resend or Brevo free tier
Hosting                     Vercel/Netlify (frontend) + Render/Railway
                        or Oracle Cloud Always Free (backend + AI
                        service)
CI/CD                        GitHub Actions
Monitoring (free tier)         Sentry (error tracking), Better Uptime
                        or UptimeRobot (uptime), simple structured
                        logging to start
```

---

# 130. Updated Repository Structure (v2)

```text
intervai/
│
├── README.md
├── docs/
│   ├── PRD.md                  ← this document
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── AI.md
│   ├── AVATAR.md               ← 3D avatar + lip-sync implementation notes
│   ├── SEO_I18N.md
│   ├── SECURITY.md
│   └── CONTRIBUTING.md
│
├── frontend/
│   ├── src/
│   │   ├── pages/ (landing, auth, dashboard, interview, reports)
│   │   ├── components/ (shadcn-based UI)
│   │   ├── avatar/ (three.js scene, viseme driver)
│   │   ├── i18n/
│   │   └── lib/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── resumes/
│   │   ├── interviews/
│   │   ├── reports/
│   │   └── scheduling/
│   └── package.json (or pom.xml if Spring Boot)
│
├── ai-service/
│   ├── app/
│   ├── models/
│   ├── services/ (resume_parser, question_gen, evaluator, coach)
│   ├── prompts/
│   └── requirements.txt
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   └── docker-compose.yml
│
├── tests/
└── .github/workflows/
```

---

# 131. Updated Development Milestones (v2)

```text
M1  Foundation           Repo, Docker, Supabase project, Auth (register/
                         login/verify/forgot-reset password), landing
                         page skeleton, deployed on free hosting
M2  Profile & Resume      Profile CRUD, resume upload → parse → store
                         pipeline, resume dashboard UI
M3  Text-Mode Interview   Interview state machine + question generation
                         + evaluation, working end-to-end in TEXT MODE
                         ONLY first (fastest path to a usable product,
                         no audio/video complexity yet)
M4  Report & Learning     Interview report UI, weakness detection,
                         Learning Path tab (Section 126)
M5  Voice Mode             STT/TTS integration, mic-based interview,
                         same engine as M3 with an audio transport
M6  3D Avatar (Phase 1)     Ready Player Me integration, viseme lip-sync,
                         idle animations, graceful fallback to 2D/text
M7  Video/Vision (optional) Webcam capture, computer-vision metrics
                         (Sections 29–32), clearly framed as observational
                         only, no over-claiming
M8  Memory & Coaching        Long-term memory (pgvector), coaching engine,
                         adaptive scheduling, full Learn→Test→Retest loop
M9  Polish & SEO              i18n, accessibility pass, SEO/content hub,
                         responsive QA across devices, performance budget
M10 Growth features (v3+)     Gamification, admin panel, institution/B2B
                         mode, Phase 2 photoreal avatar upgrade
```

This ordering deliberately gets a **usable, resume-aware, text-based interview product live first** (M1–M4) before layering on voice, avatars, and vision — matching the original document's principle in Section 116 of not attempting the complete system at once, while still delivering the "human-like interviewer" experience by M6.

---

# 132. Handoff Instructions for AI Coding Agents

When giving this PRD to an AI coding agent (e.g., Claude Code, Cursor, Devin, or similar) to generate the product, provide these instructions alongside the document:

```text
1. Build in milestone order (Section 131). Do not attempt to scaffold
   the entire system in one pass — generate M1 fully working end-to-end
   (including a working docker-compose up) before starting M2.

2. Treat Sections 60–61 (Database Core Entities) and Section 120
   (Free Database Strategy) as the schema source of truth. Generate
   an actual SQL migration file before writing any backend code that
   touches the database.

3. Treat Section 118 (System Architecture) as the service-boundary
   source of truth. Do not merge the AI Service and Core Backend into
   one codebase — keep them separate services even in local dev.

4. Every new feature must include: the API contract (request/response
   shape), the DB migration (if any), the frontend component, and a
   short test. Do not generate UI without a working backend behind it,
   and do not generate backend endpoints with no frontend consumer —
   build vertical slices per milestone, not horizontal layers.

5. Secrets (LLM API keys, Supabase service key, JWT secret) must only
   ever exist in backend/ai-service environment variables — never in
   frontend code or committed to the repo. Provide a .env.example.

6. After each milestone, produce a short CHANGELOG.md entry and a
   README section explaining how to run and verify that milestone
   locally.

7. Default to the free-tier stack in Section 129 unless explicitly
   told otherwise. Do not introduce a paid dependency without flagging
   it clearly first.

8. Respect Section 6 (Non-Goals) throughout — the agent must not add
   scope-creep features like auto-applying to jobs or hiring predictions.
```

