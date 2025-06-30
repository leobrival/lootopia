# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lootopia is a digital treasure hunt platform combining augmented reality, geolocation, and virtual currency. The project enables players to explore worlds rich in puzzles and allows organizers to create personalized adventures for brand promotion or events.

This repository contains project management and sprint planning tools for organizing the development backlog and generating analytics.

## Common Development Commands

### Primary Development Commands
- `npm run dev` - Runs the complete development pipeline (clears console, executes all scripts)
- `npm run send` - Runs development pipeline then sends backlog to Jira

### Script Execution Order
The `npm run dev` command executes scripts in this sequence:
1. `node script/backlog_to_csv.js` - Converts backlog to CSV format
2. `node script/check-dependencies.js` - Validates dependencies 
3. `node script/calc-backlog-time.js` - Calculates time estimates
4. `node script/sprint-planning.js` - Generates sprint planning with team capacity analysis

### Individual Script Execution
- `node script/backlog_to_csv.js` - Convert backlog markdown to CSV
- `node script/check-dependencies.js` - Check dependency integrity
- `node script/calc-backlog-time.js` - Calculate backlog time estimates
- `node script/sprint-planning.js` - Generate sprint planning and capacity analysis
- `node script/send-backlog-to-jira.js` - Send backlog data to Jira

## Architecture and Structure

### Core Components
- **Backlog Management**: User stories are defined in `MVP-UserStories.md` with functional and technical specifications
- **Sprint Planning Engine**: Advanced sprint planning system in `script/sprint-planning.js` with:
  - Team capacity management by specialization (front-end, back-end, blockchain)
  - Dependency chain analysis 
  - MVP-focused prioritization (must/should requirements first)
  - Workload balancing across team roles

### Data Flow
1. User stories defined in `MVP-UserStories.md` with priority, estimation, dependencies
2. Scripts parse markdown and convert to structured data
3. Sprint planning algorithm distributes work based on:
   - Team capacity per role (200h/sprint: 80h front, 80h back, 40h blockchain)
   - Dependency resolution (tasks can only start when dependencies are complete)
   - Priority-based selection (MVP features prioritized)

### Key Configuration
- **Team Composition**: 2 front-end, 2 back-end, 1 blockchain developer
- **Sprint Duration**: 5 days with 8 hours/day capacity per developer
- **Priority Levels**: must (MVP core) → should (MVP extended) → could → won't

### Output Files
- `backlog.csv` - Complete backlog export
- `sprint-planning.csv` - 12-sprint detailed planning with capacity allocation

## Project Management Integration

- **Jira Board**: [LP Project Board](https://supdevinci-po.atlassian.net/jira/software/projects/LP/boards/39)
- **Figma**: [Lootopia Design Board](https://www.figma.com/board/0ewK97NYcmYfjvC4AgAEdt/Lootopia)

## User Story Structure

Each user story in `MVP-UserStories.md` follows this format:
- **User Story**: As a user perspective
- **Functional Rules**: Business logic and constraints  
- **Technical Implementation**: Specific technical requirements
- **Acceptance Criteria**: Testable completion criteria

Stories include metadata for sprint planning:
- Priority (must/should/could/won't)
- Estimation (XS/S/M/L/XL) 
- Dependencies on other stories
- Technical specialization requirements