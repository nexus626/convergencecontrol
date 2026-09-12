# convergencecontrol

Prototype of **The Convergence — Christmas Party 2026** control system.

## Pages
- `index.html` — main Control Station
- `master.html` — Keeper / Master Control
- `key.html?key=XXXX` — Convergence Key / QR prototype

## States
WELCOME → PHASE1 → PHASE1_COMPLETE → PHASE2 → CLEARED / PROVISIONAL → CASCADE → RESOLVED

## Prototype note
This first version uses browser `localStorage`, so the Master Control and Control Station synchronize only when opened in the same browser profile/device. The next step is connecting a shared backend (Google Apps Script) so phones, QR keys and the PC all receive the same live state.
