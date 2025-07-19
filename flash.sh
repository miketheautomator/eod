#!/bin/bash

# flash.sh - Run Claude autonomously with a prompt file in a git worktree
# Usage: ./flash.sh <prompt_file> [worktree_name]

set -euo pipefail

# Check if prompt file is provided
if [ $# -lt 1 ]; then
    echo "Usage: $0 <prompt_file> [worktree_name]"
    echo "  prompt_file: Path to file containing the prompt"
    echo "  worktree_name: Optional name for git worktree (defaults to 'flash-<timestamp>')"
    exit 1
fi

PROMPT_FILE="$1"
WORKTREE_NAME="${2:-flash-$(date +%s)}"

# Validate prompt file exists
if [ ! -f "$PROMPT_FILE" ]; then
    echo "Error: Prompt file '$PROMPT_FILE' not found"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Read prompt from file
PROMPT=$(cat "$PROMPT_FILE")

# Create git worktree with new branch from main
BRANCH_NAME="flash-branch-$(date +%s)"
echo "Creating git worktree: $WORKTREE_NAME with branch $BRANCH_NAME from main"
git worktree add -b "$BRANCH_NAME" "$WORKTREE_NAME" main

# Change to worktree directory
cd "$WORKTREE_NAME"

echo "Running Claude autonomously in worktree: $WORKTREE_NAME"
echo "Prompt file: $PROMPT_FILE"
echo "----------------------------------------"

# Run Claude with the prompt in non-interactive mode and ensure output is visible
echo "$PROMPT" | claude --print --permission-mode bypassPermissions 2>&1