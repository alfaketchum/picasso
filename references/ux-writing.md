# UX Writing Reference

Rules and patterns for writing UI text. Every string a user reads is a design decision.

---

## 1. Button Labels

Never use generic labels. Every button tells the user exactly what will happen.

### Banned Labels

| Never Use | Why |
|-----------|-----|
| OK | Tells user nothing about the action |
| Submit | Vague, form-era holdover |
| Yes / No | Forces user to re-read the question |
| Click here | Accessibility failure, no meaning |
| Cancel (alone) | Ambiguous without paired action context |

### Pattern: Verb + Object

`Save changes`, `Create account`, `Delete 3 items`, `Export as PDF`, `Send invitation`, `Publish post`

### Destructive Actions: Name the Destruction + Show Count

```
Delete 14 messages permanently?
This cannot be undone.
[Keep messages]  [Delete 14 messages]
```

### Paired Button Rules

| Scenario | Primary | Secondary |
|----------|---------|-----------|
| Save flow | Save changes | Discard |
| Creation | Create project | Cancel |
| Destructive | Keep items | Delete 5 items |
| Confirmation | Send invitation | Go back |
| Upload | Upload file | Choose different file |

The safe/non-destructive action is always visually more prominent (filled button). The destructive action is secondary (outlined or text-only).

---

## 2. Error Messages

### Formula: What Happened + Why + How to Fix

Every error message has three parts. Never skip "how to fix."

**Templates by type:**
- **Format error**: State what's wrong, show correct format, action to fix
- **Missing field**: Name the field, explain what's needed for context
- **Permission denied**: Explain who can do this, offer request access or go back
- **Network error**: Suggest checking connection, confirm data is saved locally
- **Server error (5xx)**: Acknowledge it's your fault, confirm data is safe, offer retry + support
- **Rate limit**: Show countdown timer, auto-enable retry button

### Rules
- Never blame the user. "Invalid input" becomes "This field needs a number between 1 and 100."
- Never use error codes alone. Always pair with human language.
- Never use "Oops!" or humor in error states.
- Place errors inline next to the field, not in a disappearing toast.
- Use red for error borders/icons, not for the entire message text.

---

## 3. Empty States

### Formula: Acknowledge + Explain Value + Action CTA + Optional Help

```
No projects yet
Projects help you organize work, track progress, and collaborate with your team.
[Create your first project]
Need help getting started? Read the quick-start guide.
```

### Rules
- Keep acknowledgment to one short line
- Value proposition answers "why would I want things here?"
- CTA uses verb+object pattern
- Help links open in context, never navigate away
- Never show a completely blank screen

---

## 4. Voice vs Tone

**Voice** is the personality (never changes): Clear, Confident, Helpful, Human.

| Voice Attribute | Means | Does Not Mean |
|----------------|-------|---------------|
| Clear | Short sentences, common words | Dumbed down or robotic |
| Confident | Direct statements, no hedging | Arrogant or dismissive |
| Helpful | Guides next step, anticipates needs | Condescending or hand-holding |
| Human | Natural phrasing, contractions OK | Slang, jokes, or emoji in UI text |

**Tone** adapts to the moment:

| Moment | Tone | Example |
|--------|------|---------|
| Success | Warm, encouraging | "Your account is ready. Let's set up your first project." |
| Error | Calm, direct | "That file is too large. The maximum size is 25 MB." |
| Destructive | Serious, precise | "This will permanently delete 14 messages. This cannot be undone." |
| Onboarding | Friendly, guiding | "Welcome. We'll walk you through the basics in about 2 minutes." |
| Empty state | Neutral, inviting | "No notifications yet. You'll see updates from your team here." |

Never use humor in error states, destructive actions, or security messages.

---

## 5. Accessibility Writing

### Link Text
Links must make sense when read alone (screen readers navigate by link list). "View our pricing plans" not "click here."

### Alt Text
Describe the information the image conveys, not the image itself. If the image were deleted, what information would be lost? That is your alt text. Use `alt=""` for purely decorative images.

### Icon Buttons
Every icon-only button needs `aria-label`. Pair with `title` for sighted users.

### Form Labels
Every input has a visible `<label>`. Placeholder text is not a label. Use both.

---

## 6. Translation Planning

### Expansion Percentages

| Language | Expansion | 10-char English becomes |
|----------|-----------|------------------------|
| German | +30% | ~13 characters |
| French | +20% | ~12 characters |
| Finnish | +30-40% | ~13-14 characters |
| Spanish | +15-20% | ~12 characters |
| Chinese | -30% | ~7 characters |
| Arabic | +25% (RTL) | ~12-13 characters |

### Design Rules
- Buttons: allow at least 30% extra width, never fixed-width for text
- Use pseudolocalization to test
- Truncate with `...` + `title` attribute for full text
- Never concatenate strings; use full-sentence templates with placeholders
- Use ICU MessageFormat for pluralization (Arabic has 6 plural forms)

---

## 7. Terminology Consistency

Pick one term. Use it everywhere.

| Use This | Not This |
|----------|----------|
| Delete | Remove, Trash, Erase |
| Settings | Preferences, Options, Configuration |
| Sign in | Log in, Login |
| Sign out | Log out, Logout |
| Sign up | Register, Create account |
| Search | Find, Look up |
| Edit | Modify, Change, Update |
| Save | Apply |
| Profile | Account |
| Workspace | Organization, Team |
| Member | User (in team context) |
| Notification | Alert (reserve for system-level) |

Create a glossary. Lint against it. Search entire codebase when renaming.

---

## 8. Loading State Copy

### Progressive Messages
- **0-2s**: Spinner only (no text)
- **2-5s**: "Loading your dashboard..."
- **5-15s**: "Crunching the numbers. This usually takes a few seconds."
- **15s+**: "Still working on it. Large datasets take a bit longer."
- **30s+**: "This is taking longer than usual. You can wait or [try again]."

Use skeleton screens for known layouts, spinners for unknown/variable layouts. For operations with known progress, show percentage or step count.

---

## 9. Confirmation Dialogs

### Structure
- **Title**: State what will happen (verb + object)
- **Body**: Consequences in plain language. Irreversibility if applicable.
- **Actions**: [Safe option] [Destructive option]

### Rules
- Safe action is visually prominent (filled, primary color)
- Destructive action is secondary (outlined, red)
- Never pre-select the destructive option
- Focus lands on the safe action by default
- Escape key triggers the safe action
- For high-stakes destructive actions, require type-to-confirm

---

## 10. Microcopy

### Placeholder vs Label
Placeholders vanish on input. Labels stay visible. Use both: visible `<label>` + helpful placeholder example.

### Helper Text
Place below input. Format hints, constraints, or context: "Must be at least 8 characters with one number and one symbol."

### Success Messages with Next Steps
Never dead-end after success. Always tell what comes next:
- "Account created. Check your email for a verification link."
- "Payment received. Your order #4821 will ship within 2 business days. [View order details]"

### Character Counts
Show remaining characters (not total limit), and only when 80%+ of limit reached.

### Toggle Labels
Label the current state, not the action. Or label both sides: `Notifications: Off [toggle] On`.
