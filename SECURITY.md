# Security Architecture — Huffman AI Solutions

> **Internal document** for Reid and Jake. Reference when clients ask security questions, and use as a guide when setting up each client's agent.

---

## Table of Contents

1. [Client Isolation](#client-isolation)
2. [Data Flow](#data-flow)
3. [Email Security](#email-security)
4. [Access Controls](#access-controls)
5. [Audit & Monitoring](#audit--monitoring)
6. [Encryption](#encryption)
7. [Incident Response](#incident-response)
8. [Client Onboarding Security Checklist](#client-onboarding-security-checklist)
9. [Compliance](#compliance)

---

## Client Isolation

Each client gets a fully isolated environment. No shared state, no shared data, no cross-client access.

### Architecture

- **Dedicated OpenClaw instance** per client — separate process, separate workspace
- **Separate workspace, memory, and configuration** — each client's AI employee has its own agent memory, personality config, and workflow rules
- **Separate API keys** per client:
  - Anthropic API key (dedicated per client or usage-tracked)
  - Email OAuth2 tokens (per client)
  - CRM API credentials (per client)
- **No shared state** between clients — one client's data, logs, and agent memory are never accessible to another

### Infrastructure Recommendations

| Setup | Isolation Level | Recommended For |
|-------|----------------|-----------------|
| Separate VM/machine per client | 🟢 Highest | Enterprise clients, clients with strict compliance |
| Separate user accounts on shared infrastructure | 🟡 High | Standard clients |
| Containerized (Docker) per client | 🟡 High | Scaling to many clients |

**Current recommendation:** Separate machine/VM per client for maximum isolation, especially while client count is low.

---

## Data Flow

### Architecture Diagram

```
┌──────────────────┐     OAuth2      ┌─────────────────────┐
│  Client Email     │◄──────────────►│  OpenClaw Agent      │
│  (Gmail/Outlook)  │                │  (Client Instance)   │
└──────────────────┘                │                      │
                                     │  ┌─────────────┐    │
┌──────────────────┐                │  │ Agent Memory │    │
│  Client Calendar  │◄──────────────►│  │ & Logs       │    │
│  (Google/Outlook) │                │  └─────────────┘    │
└──────────────────┘                │                      │
                                     │         │ API call   │
┌──────────────────┐                │         ▼            │
│  Client CRM       │◄──────────────►│  ┌─────────────┐    │
│  (Bullhorn, etc.) │                │  │ Anthropic    │    │
└──────────────────┘                │  │ Claude API   │    │
                                     │  └─────────────┘    │
                                     └─────────────────────┘
```

### What Data Goes Where

| Data | Location | Notes |
|------|----------|-------|
| Emails, calendar events | Client's provider (Gmail/Outlook) | Accessed via OAuth2, not copied in bulk |
| Agent memory (context, style, preferences) | Local to client's OpenClaw instance | Encrypted at rest |
| Audit logs | Local to client's OpenClaw instance | Retained 90 days post-closure |
| Email drafts/cached content | Local to client's OpenClaw instance | Encrypted at rest, auto-purged |
| API requests to Anthropic | Transient — sent to Anthropic API, response returned | **Not retained by Anthropic for training** (API tier) |

### Anthropic Data Policy

- On the API tier, Anthropic **does not use input/output data to train models**
- Data is processed and returned — not stored long-term by Anthropic
- Reference: [Anthropic Privacy Policy](https://www.anthropic.com/policies/privacy)
- This is a key talking point for security-conscious clients

---

## Email Security

### Authentication

- **OAuth2 only** for Gmail and Outlook — we never store email passwords
- **Principle of least privilege** — request only the minimum OAuth scopes needed:
  - Gmail: `gmail.readonly`, `gmail.send`, `gmail.compose`, `gmail.modify`
  - Outlook: `Mail.ReadWrite`, `Mail.Send`, `Calendars.ReadWrite`
- OAuth tokens stored encrypted, never in plaintext

### Approval Workflow

- **Weeks 1–4 (onboarding):** Draft-review-send mode — AI drafts emails, client approves before sending
- **After onboarding:** Configurable auto-send rules based on email type:
  - **Auto-send:** Routine responses (acknowledgments, scheduling confirmations, follow-ups)
  - **Require approval:** Sensitive communications (offers, negotiations, client-facing, new contacts)
- Client can adjust these rules at any time

### Rate Limiting

- **Maximum outbound emails per hour:** Configurable (default: 20/hr)
- **Maximum outbound emails per day:** Configurable (default: 100/day)
- Exceeding limits triggers alert to client and pauses sending

### Block List

- Configurable list of domains/addresses the AI should **never auto-send to**
- Examples: competitor domains, personal emails, executive contacts
- Block list is client-controlled

### Audit Trail

Every email interaction is logged:
- Emails read (sender, subject, timestamp)
- Emails drafted (recipient, subject, timestamp, content hash)
- Emails sent (recipient, subject, timestamp, approval status)
- Emails flagged for review

---

## Access Controls

### Client Controls

- **Kill switch:** Client admin can instantly revoke all AI access (email, calendar, CRM) — takes effect immediately
- **Granular permissions:** Client can enable/disable specific capabilities (e.g., allow email reading but not sending)
- **Approval workflows:** Client controls what requires human approval vs. auto-action

### Huffman AI Team Access

- **No standing access** to client data — we cannot access client emails, calendar, or CRM by default
- **Support access:** Granted per-incident only, requires explicit client approval
- **Access logging:** All support access is logged with timestamp, team member, and reason
- **MFA required:** All Huffman AI team members must use multi-factor authentication on all systems

---

## Audit & Monitoring

### Action Logging

Every AI action is logged with:
- **Timestamp** (UTC)
- **Action type** (email read, email drafted, email sent, calendar event created, CRM updated, etc.)
- **Target** (recipient, calendar event, CRM record)
- **Outcome** (success, failed, pending approval)
- **Content hash** (for sent emails — allows verification without storing full content in logs)

### Client Reporting

- **Daily summary reports** available to client (email or dashboard)
- **On-demand audit log export** — client can request full logs at any time
- **Weekly activity digest** during onboarding period

### Anomaly Detection

Alert on unusual patterns:
- Mass email sending (exceeding rate limits)
- Accessing unusually old data
- Sending to new/unusual domains
- Unusual activity hours
- Failed authentication attempts

### Log Retention

- **Active accounts:** Logs retained for the duration of service
- **After account closure:** Logs retained for 90 days, then permanently deleted
- Client can request log export before deletion

---

## Encryption

| Layer | Standard | Details |
|-------|----------|---------|
| Data in transit | TLS 1.3 | All API calls, email access, and web traffic |
| Data at rest | AES-256 | Agent memory, cached emails, logs, configuration |
| Credentials | Encrypted vault | OAuth tokens, API keys — never stored in plaintext |
| Backups | Encrypted | Any backups follow the same encryption standards |

**No plaintext credentials stored anywhere** — all secrets managed through encrypted storage.

---

## Incident Response

### Process

1. **Detection:** Automated monitoring alerts or client/team report
2. **Assessment:** Determine scope and severity within 4 hours
3. **Containment:** Isolate affected systems, revoke compromised credentials
4. **Client notification:** Within **24 hours** of a confirmed breach
5. **Remediation:** Fix root cause, restore from clean state
6. **Post-incident report:** Delivered to affected client within **7 days**
7. **Lessons learned:** Update security procedures based on findings

### Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| Critical | Data breach, unauthorized access to client data | Immediate — within 1 hour |
| High | System compromise, credential exposure | Within 4 hours |
| Medium | Anomalous behavior, failed intrusion attempt | Within 24 hours |
| Low | Minor misconfiguration, non-security bug | Next business day |

### Contact

- **Security issues:** jake@huffmansolutionsai.com
- **Emergency:** Contact Jake directly (phone number shared with active clients)

---

## Client Onboarding Security Checklist

Use this checklist for every new client setup:

- [ ] Create isolated OpenClaw instance (separate VM/user account)
- [ ] Configure OAuth2 email access with minimum required scopes
- [ ] Set up approval workflow (draft-review-send mode for weeks 1–4)
- [ ] Configure rate limits (default: 20/hr, 100/day — adjust per client needs)
- [ ] Set up audit logging and verify logs are recording correctly
- [ ] Create client admin account with kill switch access
- [ ] Review client's data handling requirements (industry regulations, internal policies)
- [ ] Sign Data Processing Agreement (DPA) if EU client
- [ ] Test email integration in sandbox before going live with real emails
- [ ] Document client-specific configuration (custom rules, block lists, approval thresholds)
- [ ] Schedule week-1 review call to assess AI performance and adjust settings
- [ ] Verify encryption at rest is enabled for all stored data
- [ ] Confirm client understands approval workflow and kill switch
- [ ] Set up anomaly detection alerts

---

## Compliance

### GDPR Readiness Checklist

- [x] Lawful basis for processing documented (legitimate interest / contract performance)
- [x] Data Processing Agreement (DPA) template available for EU clients
- [x] Right to access — can export all client data on request
- [x] Right to deletion — can delete all client data within 30 days
- [x] Right to data portability — data exportable in standard formats
- [x] Right to object — client can revoke AI access at any time
- [x] Data minimization — only access data necessary for service
- [x] Privacy policy published and up to date
- [ ] Appoint Data Protection Officer (when required by scale)
- [ ] Conduct Data Protection Impact Assessment (DPIA) for high-risk processing

### CCPA Readiness Checklist

- [x] Privacy policy discloses categories of personal information collected
- [x] Right to know — can provide details of data collected and used
- [x] Right to delete — can delete all personal information on request
- [x] Right to opt-out of sale — we never sell personal data (N/A)
- [x] No discrimination for exercising privacy rights
- [ ] Verify annual compliance review process

### SOC 2 Roadmap

We are not yet SOC 2 certified but are building toward it:

| Control Area | Current Status | Target |
|-------------|---------------|--------|
| Access Controls | ✅ Implemented | — |
| Encryption (transit + rest) | ✅ Implemented | — |
| Audit Logging | ✅ Implemented | — |
| Incident Response | ✅ Documented | — |
| Change Management | 🟡 Informal | Formalize Q3 2026 |
| Vendor Management | 🟡 Informal | Formalize Q3 2026 |
| Risk Assessment | 🟡 Informal | Formal assessment Q4 2026 |
| SOC 2 Type I Audit | ❌ Not started | Target: Q1 2027 |
| SOC 2 Type II Audit | ❌ Not started | Target: Q3 2027 |

**Strategy:** Build SOC 2–aligned practices now so the audit is a formality, not a scramble.

---

*Last updated: February 2026*
*Contact: jake@huffmansolutionsai.com*
