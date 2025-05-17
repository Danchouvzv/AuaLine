# Contributing to AuaLine

Thank you for your interest in contributing to AuaLine! This document provides guidelines and instructions for contributing to this project.

## 📝 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Code Contributions](#code-contributions)
- [Development Workflow](#development-workflow)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
  - [Branching Strategy](#branching-strategy)
  - [Commit Guidelines](#commit-guidelines)
  - [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
  - [TypeScript Guidelines](#typescript-guidelines)
  - [React Best Practices](#react-best-practices)
  - [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by the [AuaLine Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@aualine.com](mailto:conduct@aualine.com).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicating. When creating a bug report, include as many details as possible, using the provided template.

**Bug Report Template:**
```markdown
**Description:**
A clear and concise description of the bug.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
A clear description of what you expected to happen.

**Screenshots:**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Device: [e.g. Desktop, iPhone 12]
 - OS: [e.g. Windows 10, iOS 15]
 - Browser: [e.g. Chrome 96, Safari 15]
 - Version: [e.g. 1.0.0]

**Additional Context:**
Add any other context about the problem here.
```

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature request, provide a clear description of the feature and the problem it solves.

**Feature Request Template:**
```markdown
**Problem:**
A clear description of the problem this feature would solve. 
E.g., "I'm frustrated when [...]"

**Proposed Solution:**
A clear description of what you want to happen.

**Alternative Solutions:**
Any alternative solutions or features you've considered.

**Additional Context:**
Any other context, screenshots, or mockups for the feature.
```

### Code Contributions

1. Search issues for something you'd like to work on.
2. Comment on the issue to let maintainers know you're interested.
3. Fork the repository and create your branch.
4. Make your changes following our coding standards.
5. Submit a pull request.

## Development Workflow

### Setting Up the Development Environment

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/AuaLine.git
   cd AuaLine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - For new features
- `bugfix/bug-name` - For bug fixes
- `hotfix/hotfix-name` - For critical production fixes

Always create your working branches from `develop`.

### Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect the code's meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(cart): add ability to save cart items for later
fix(auth): resolve token refresh issue for mobile users
docs: update API endpoints documentation
```

### Pull Request Process

1. Update the README.md with details of changes if necessary
2. Update the documentation if necessary
3. The PR should work in all major browsers
4. Ensure all tests pass
5. Get review from at least one maintainer
6. Once approved, a maintainer will merge your PR

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new files
- Define proper interfaces/types for all data structures
- Avoid using `any` type
- Use functional components with hooks instead of class components
- Use async/await instead of promises with then/catch

### React Best Practices

- Organize components by feature/module
- Keep components small and focused
- Use composition over inheritance
- Implement proper error boundaries
- Use React Query for API calls
- Follow the React hooks rules

### Testing Requirements

- Write unit tests for all new utils and hooks
- Write component tests for key UI components
- Write integration tests for critical user flows
- Maintain at least 70% test coverage

## Documentation

- Document all public APIs and components
- Use JSDoc style comments for functions and components
- Keep the README.md updated with new features
- Add examples for complex functionality

## Community

Join our community channels to discuss development:
- [Discord](https://discord.gg/aualine)
- [Twitter](https://twitter.com/AuaLine)

Thank you for contributing to AuaLine!

---

Made with ❤️ by the AuaLine Team 