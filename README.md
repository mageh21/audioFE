# Project Workspace

This repository is set up to help you track and restore changes to your project.

## Git Commands for Restoring Changes

### Basic Commands

- **Check status**: `git status` - Shows the current state of your working directory
- **View commit history**: `git log` - Lists all your commits

### Creating Restore Points

1. **Stage changes**: `git add <file>` or `git add .` (for all files)
2. **Create a restore point**: `git commit -m "Descriptive message"`

### Restoring Changes

1. **Discard changes to a specific file**: `git checkout -- <file>`
2. **Discard all uncommitted changes**: `git restore .`
3. **Restore to a specific commit**:
   - Find the commit ID using `git log`
   - Restore with `git checkout <commit-id>`
   - Return to latest version with `git checkout main`

### Working with Branches

1. **Create a new branch**: `git checkout -b <branch-name>`
2. **Switch between branches**: `git checkout <branch-name>`
3. **List all branches**: `git branch`

## Project Structure

- **audioFE/**: Audio frontend project (managed by its own git repository)

## Notes

- The audioFE directory is excluded from this git repository as it has its own version control
- Remember to commit your changes frequently to create restore points 