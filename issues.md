---
TASKS FOR THIS PROJECT
---
Choose your tasks from the given list

== BUG FIXING (15-20 mins) ==

## BUG 1 — Win Condition Broken
Puzzle never shows success even when correct.
- Verify correct tile order
- Display a “You Won!” message or popup after completion

---

## BUG 2 — Invalid Movement Allowed
Tiles far from empty tile still move.
- Only allow movement when tile is adjacent (top / bottom / left / right)
- Fix movement validation logic

---

## BUG 3 — Timer Starts Multiple Times
Timer restarts every time shuffle is clicked.
- Continue the timer even if the shuffle is clicked.

---

## BUG 4 — Tiles Visually Move but Game State Does Not Update Correctly

Sometimes when users click a tile:

- The UI shows the tile moving but there is no actual change.
- Correct the logic for this problem.

---


== Features Building (30-40 min) ==

## FEATURE 1 — Show Original Image 
Add a button:

Show full picture for **3 seconds**, then return to puzzle layout.

---

##  FEATURE 2 — Smart Shuffle 
Puzzle must **always be solvable**.
- Use a valid shuffling algorithm
- Check puzzle solvability before starting game

---


