# SV XSS Demo.

A deliberately vulnerable web application built with Svelte 5 to demonstrate the three major types of Cross-Site Scripting (XSS). This project serves as an educational tool to understand how XSS vulnerabilities happen in modern frameworks and the real-world impact they carry.

## Overview

Modern frontend frameworks like Svelte provide excellent built-in protections against XSS. However, developers can still introduce critical vulnerabilities by explicitly bypassing these protections or mismanaging state and DOM interactions.

This repository contains three distinct, isolated vulnerable features built into a realistic community platform.

## Vulnerability Scenarios

While a simple `alert(1)` proves execution, the real danger of XSS lies in what an attacker can do once they run JavaScript in the context of another user's session.

### 1. Stored XSS (The Community Forum)

**Location:** `/` (Home Page)  
**Vector:** Forum posts are persisted to the database and rendered using `{@html post}`.

**Real Case Scenario: Session Hijacking**
An attacker posts an innocent-looking comment that contains a hidden script. When an administrator later views the community posts, the script executes silently in their browser. The script reads the administrator's `document.cookie` (which contains the session token) and automatically sends it via `fetch()` to an attacker-controlled server. The attacker, sitting across the world, can now inject that cookie into their browser and log in as the administrator without ever knowing the password.

### 2. Reflected XSS (The Search Function)

**Location:** `/search`  
**Vector:** The search query is extracted directly from the URL parameter and rendered using `{@html query}` to highlight the user's search term.

**Real Case Scenario: Targeted Phishing**
An attacker creates a convincing email that looks like an official support request from the platform. The email contains a link to `https://platform.com/search?q=<script>...`. When the victim clicks the link, the page loads normally, but the injected script immediately rewrites the DOM to display a fake "Your session has expired. Please log in again" modal. The credentials entered into this fake form are sent directly to the attacker.

### 3. DOM-Based XSS (The User Profile)

**Location:** `/profile`  
**Vector:** A client-side Svelte rune (`$effect`) reads the `location.hash` and unsafely manipulates the DOM by assigning it directly to `element.innerHTML`.

**Real Case Scenario: Action Forgery**
An attacker sends a link like `https://platform.com/profile#status=<script>...` to a victim. The Svelte application routing handles the page state, bypassing server-side security features and Web Application Firewalls (WAFs) entirely because the hash fragment `#` is never sent to the server. The script executes and automatically submits a hidden request to change the victim's email address or transfer funds, leveraging the victim's existing authenticated session.

## Getting Started

To run the application locally and explore the vulnerabilities:

1. Clone the repository.
2. Install dependencies using Bun:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

### Demo Accounts

The application uses a mock database with session-based cookie authentication to simulate a real platform. You can log in with either of these accounts:

- `admin` / `password`
- `test` / `testuser`

## Disclaimer

This application is intentionally vulnerable. Do not deploy this code to a production environment or expose it to the public internet. It is solely intended for educational purposes and local security testing.
