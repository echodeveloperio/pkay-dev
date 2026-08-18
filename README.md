# PKAY

AI-powered website and application builder with an integrated cybersecurity workspace.

## Product Structure

PKAY has two primary experiences:

### Homepage (`/`)

Premium developer-focused landing page introducing the product.

- Hero: "Build the web with AI."
- Product preview showing the Console layout
- Features: AI App Builder, Live Preview, AI Security
- Security section with findings preview

### Console (`/console`)

The main PKAY development environment.

- Left sidebar with navigation, workspace selector, projects
- AI Build input with mode selection (Standard / Fast / Thorough)
- Projects grid with search, filter tabs, and project cards
- Responsive: desktop sidebar, tablet collapsible, mobile drawer

### Builder (`/builder`)

The three-column AI development workspace:

- **Left**: AI Chat with conversational progress indicators
- **Center**: Live Preview with desktop/tablet/mobile switcher
- **Right**: Files & Folders tree

No terminal panel. No output panel. The AI communicates build progress through the chat.

### Security Lab (`/security`)

Defensive cybersecurity workspace with three-column layout:

- **Left**: Security AI chat
- **Center**: Security Analysis (renders sub-route content)
- **Right**: Findings list with severity indicators

Sub-routes: Overview, Malware, Vulnerabilities, Code Security, Threats, AI Analyst, Reports.

## Design System

Sharp, square, minimal developer-tool aesthetic.

- **Corner radius**: 2–4px everywhere
- **Primary**: Dusty Rose `#B9828F` (accent only)
- **Background**: `#F4F4F5`
- **Surface**: `#FFFFFF`
- **Dark Background**: `#111113`
- **Typography**: Inter (sans) + JetBrains Mono (code)
- **Theme**: Light / Dark / System toggle

## Tech Stack

- React 19
- TanStack Router (file-based routing)
- TanStack Start (SSR)
- Tailwind CSS v4
- Radix UI primitives
- Lucide icons
- Vite

## Development

Requires Node.js and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Build with Lovable

Continue developing in the [Lovable editor](https://lovable.dev).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable.
