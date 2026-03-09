# Contributing to MAHAGENCO Centralized Monitoring System

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL 13+
- Redis 6+
- Docker & Docker Compose (recommended)
- Git

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/mahagenco/centralized-monitoring.git
cd centralized-monitoring

# Create .env file
cp .env.example .env

# Start development environment
docker-compose up -d

# OR manual setup
npm install
npm run db:setup
npm start
```

## Development Workflow

### 1. Create Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# OR for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

Follow the coding standards and conventions:

#### JavaScript/React
- **Code Style:** ESLint + Prettier (Airbnb config)
- **File Structure:** Modular components
- **Naming:** camelCase for variables, PascalCase for components
- **Comments:** JSDoc for functions/components
- **Imports:** Absolute imports from project root

```javascript
// Example: src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '@services/api/dashboard';
import { LineChart } from '@components/Charts';

/**
 * Dashboard Component
 * Displays real-time monitoring widgets for power plants
 * @component
 */
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data on mount
  }, []);

  return (
    <div className="dashboard-container">
      {/* Component content */}
    </div>
  );
};

export default Dashboard;
```

#### Node.js/Express
- **Code Style:** ESLint + Prettier (Airbnb config)
- **Async/Await:** Preferred over promises
- **Error Handling:** Try-catch with custom error classes
- **Comments:** JSDoc for APIs
- **Logging:** Use Winston logger

```javascript
// Example: src/api/generation/controller.js
const GenerationService = require('@services/GenerationService');
const { AppError } = require('@utils/errors');
const logger = require('@utils/logger');

/**
 * Get current generation status
 * @async
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @throws {AppError}
 */
const getGenerationStatus = async (req, res, next) => {
  try {
    const { plantId } = req.params;
    const status = await GenerationService.getStatus(plantId);
    
    res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    logger.error(`Error fetching generation status: ${error.message}`);
    next(error);
  }
};

module.exports = {
  getGenerationStatus,
};
```

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific workspace tests
npm test --workspace frontend
npm test --workspace backend

# With coverage
npm run test:coverage

# Watch mode for development
npm test --workspace frontend -- --watch
```

### 4. Lint and Format

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### 5. Commit Changes

**Commit Message Format:**
```
[TYPE] Brief description (50 chars or less)

Detailed explanation if needed (72 chars per line)

Fixes #123
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test additions/modifications
- `chore` - Build, dependency updates, etc.

**Examples:**
```
[feat] Add equipment health score widget

Implements real-time equipment health monitoring with:
- EFDS integration for fault detection
- Health percentage calculation
- Component-wise breakdown display
- Alert triggering on score degradation

Closes #45
```

```
[fix] Resolve APC calculation overflow issue

Fixed floating-point precision error in APC percentage
calculation that was causing values >100% in edge cases.

- Use Math.round() for precise rounding
- Add boundary validation
- Update tests with edge cases

Fixes #78
```

### 6. Push and Create Pull Request

```bash
# Push feature branch
git push origin feature/your-feature-name

# Create pull request on GitHub
# Link any related issues: "Fixes #123" in PR description
```

## Pull Request Guidelines

### PR Title
- Use clear, descriptive title
- Follow same format as commit messages
- Example: `[feat] Add real-time generation dashboard`

### PR Description
```markdown
## Description
Brief summary of changes

## Changes
- Change 1
- Change 2
- Change 3

## Related Issues
Fixes #123
Relates to #456

## Testing
- [ ] Unit tests added
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Linting passes
- [ ] Tests pass locally
- [ ] No breaking changes
- [ ] Documentation updated
- [ ] Screenshots added (if UI change)
```

### PR Review Process
1. Automated checks (CI/CD pipeline)
2. Code review by maintainers
3. Requested changes (if any)
4. Approval and merge

## Code Review Standards

### What We Look For
- **Correctness:** Code solves the problem correctly
- **Performance:** No obvious performance issues
- **Maintainability:** Code is readable and well-documented
- **Testing:** Adequate test coverage
- **Security:** No security vulnerabilities
- **Style:** Follows project conventions

### Common Review Comments

```javascript
// ❌ What to avoid
const data = fetch(url);
const result = JSON.parse(data);

// ✅ Better approach
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response failed');
  const result = await response.json();
} catch (error) {
  logger.error(`Fetch error: ${error.message}`);
  // Handle error appropriately
}
```

## Reporting Bugs

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Node version: v18.x
- Branch: main/develop

## Screenshots
Add screenshots if relevant

## Additional Context
Any other relevant information
```

### Bug Labels
- `bug` - Confirmed bug
- `documentation` - Documentation issue
- `enhancement` - Feature request
- `critical` - Blocking issue
- `help-wanted` - Looking for community help

## Feature Requests

Submit feature requests using GitHub Issues with:
- Clear description of the feature
- Use case and benefit
- Any relevant mockups/designs
- Acceptance criteria

## Documentation

### Update Documentation When
- Adding new features
- Changing API endpoints
- Modifying data structures
- Creating new components
- Adding configuration options

### Documentation Locations
- API docs: `docs/API_SPECIFICATION.md`
- Architecture: `docs/ARCHITECTURE.md`
- User guide: `docs/USER_GUIDE.md`
- Component docs: Comments in code (JSDoc)

## Git Workflow Summary

```bash
# 1. Create and switch to feature branch
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "[feat] Your feature description"

# 3. Push to remote
git push origin feature/your-feature

# 4. Create PR on GitHub

# 5. After approval, merge via GitHub (not local)

# 6. Clean up local branch
git checkout main
git pull origin main
git branch -d feature/your-feature
```

## Performance Guidelines

### Frontend
- Bundle size < 500KB (gzipped)
- Page load time < 2 seconds
- Lighthouse score > 80
- Use React.memo for expensive renders
- Lazy load routes and components

### Backend
- API response time < 500ms (95th percentile)
- Database queries optimized
- Use connection pooling
- Cache frequently accessed data
- Rate limiting on public endpoints

## Security Guidelines

- Never commit `.env` files or secrets
- Validate all user inputs
- Use parameterized queries
- Implement CSRF protection
- Set secure HTTP headers
- Use HTTPS in production
- Regular dependency updates
- Follow OWASP guidelines

## Need Help?

- **Questions:** Create discussion in GitHub Discussions
- **Issues:** Search existing issues first
- **Documentation:** Check README and docs/ folder
- **Slack:** Join team Slack channel (internal only)

## Recognition

Contributors will be recognized:
- In CONTRIBUTORS.md file
- On project GitHub page
- In release notes

---

**Thank you for contributing to MAHAGENCO Dashboard!** 🎉
