# pkay-dev

Design and build a premium developer-focused AI web application called PKAY.

PKAY is an AI-powered platform that allows users to generate websites and web applications from natural-language prompts, similar in concept to modern AI coding platforms. It also includes a dedicated AI Cybersecurity workspace for safe security analysis, malware education, vulnerability explanations, code security review, and threat analysis.

Visual Direction

Use a sharp, square, minimal developer-tool aesthetic.

The interface must feel:

Professional

Technical

Calm

Trustworthy

Modern

Developer-focused

AI-native

Avoid excessive rounded cards, excessive gradients, glassmorphism, floating bubbles, playful illustrations, or overly colorful SaaS aesthetics.

Use mostly square corners:

Cards: 2–4px radius

Inputs: 2–4px radius

Buttons: 2–4px radius

Modals: 4px radius

Color System

Primary brand color: Dusty Rose.

Primary:
#B9828F

Primary Hover:
#A66F7D

Soft Primary:
#F1E2E5

Background:
#F4F4F5

Surface:
#FFFFFF

Main Text:
#171719

Secondary Text:
#303034

Muted Text:
#77777D

Border:
#E4E4E7

Dark Background:
#111113

Dark Surface:
#1B1B1F

Use Dusty Rose primarily for:

Primary CTA

Active navigation

AI indicators

Selected states

Focus states

Important highlights

Do not use Dusty Rose everywhere. Keep the majority of the UI neutral with gray and white.

Typography

Use a modern developer-friendly sans-serif font such as Inter.

Headings:
Strong, compact, slightly tight letter spacing.

Body:
Clean and highly readable.

Code:
Use a monospace font such as JetBrains Mono.

Application Structure

Create the following main areas:

Dashboard

Projects

AI Builder

Code Editor

Live Preview

Templates

Security Lab

AI Security Analyst

Settings

Main Layout

Use a desktop-first application shell.

Top navigation:

PKAY logo

Projects

Templates

Security Lab

Documentation

Search

Notifications

User avatar

Left sidebar:

New Project

Recent Projects

Favorites

Security Lab

Settings

Main workspace:
Use a split-pane developer workspace with:

AI conversation / build instructions

Code/editor area

Live preview

Build logs

AI Builder

The primary experience should be a large prompt composer.

Example placeholder:

"What do you want to build?"

Allow users to describe a website or application in natural language.

The interface should support:

Prompt input

File attachment

Context selection

Model selector

Generate button

Build progress

AI-generated change summaries

Undo / redo

Preview

Publish

During generation, show a compact build log:

✓ Created project
✓ Generated layout
✓ Added components
● Connecting database
○ Running checks
○ Preparing preview

Live Preview

Show a real-time website preview beside the AI builder.

Include:

Desktop / tablet / mobile preview controls

Refresh

Open preview

Share

Publish

Security Lab

Create a separate cybersecurity workspace.

Navigation:

Security Overview

Malware Analysis

Vulnerability Analysis

Code Security

Threat Intelligence

AI Security Analyst

Security Reports

The Security Dashboard should show:

Security Score
87 / 100

Critical Issues
0

High Risk
2

Warnings
4

Passed Checks
24

Use clear severity indicators:
Critical
High
Medium
Low
Informational

AI Security Analyst

Create a professional security-focused AI chat interface.

The AI should explain cybersecurity concepts, malware behavior, vulnerabilities, defensive techniques, and code-security issues in a safe educational and defensive manner.

Each analysis response should be structured into:

Summary
Risk Level
What Was Detected
Why It Matters
Technical Explanation
Indicators
Recommended Mitigation
Safe Next Steps

Use monospace blocks for code and technical indicators.

Components

Create a reusable component system including:

Button

Icon Button

Input

Textarea

Search

Dropdown

Tabs

Sidebar

Topbar

Card

Badge

Status Indicator

Code Block

Terminal

AI Message

Build Log

Security Finding

Risk Badge

Modal

Toast

Command Palette

File Tree

Editor Panel

Preview Panel

Interaction Design

Use subtle animations only.

Recommended:

120–180ms transitions

Smooth panel resizing

Subtle hover states

Cursor/focus feedback

Streaming AI text

Build progress animation

Skeleton loading states

Avoid large animations.

Responsive Design

Desktop:
3-panel developer workspace.

Tablet:
2-panel workspace.

Mobile:
Single-panel navigation with bottom/sheet-based tools.

Overall Design Goal

The final product should feel like:

"An AI-native developer operating system with a serious cybersecurity workspace."

It should visually combine the productivity of an AI coding platform with the credibility of a professional security tool.

Do not copy the exact UI of Lovable, Replit, or any other product. Use them only as conceptual references for workflow patterns.

The PKAY brand should feel original, sharp, square, minimal, and recognizable through its Dusty Rose + Gray + White visual identity.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2fb879b7-26f5-4508-822a-de7c9ab896e5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
