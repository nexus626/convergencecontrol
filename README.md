# convergencecontrol v4

## Modifiche principali
- Control Station bloccata a `100dvh`: nessuno scroll verticale.
- Inserimento dei codici tramite popup centrale.
- `WELCOME`: Archive Status = `PENDING`.
- `PHASE1`: blu, stabile, Archive reconstruction.
- `PHASE2`: modalità critica rossa con plasma/glitch/audio, **senza countdown**.
- `CLEARED`: falsa conclusione calma.
- `AUTO_ANCHOR`: piano B per saltare la Phase II se la serata è in ritardo.
- `CASCADE`: rosso critico, plasma, allarme e unico countdown della serata.
- `RESOLVED`: Timeline Integrity = `100.00%`, Distributed Anchor, Merry Christmas.
- Web Audio generativo: cliccare `INITIALIZE AUDIO` una volta prima dell'arrivo degli ospiti.
- Backend Google Apps Script incluso per controllo remoto da telefono.

## File
- `index.html` — Control Station
- `master.html` — pannello Master da telefono
- `key.html` — pagina QR / Convergence Key
- `remote-config.js` — URL del backend
- `Code.gs` — backend Google Apps Script

## Test locale
Senza configurare Apps Script, le pagine continuano a funzionare con `localStorage` sullo stesso browser.

## Controllo remoto
1. Crea un progetto Google Apps Script.
2. Incolla `Code.gs`.
3. Cambia `MASTER_PIN`.
4. Deploy > New deployment > Web app.
5. Execute as: Me.
6. Access: Anyone.
7. Copia l'URL `/exec`.
8. In `remote-config.js`, imposta:
   `window.CONV_API_URL = "https://script.google.com/macros/s/.../exec";`
9. Carica/aggiorna `remote-config.js` nella root GitHub.

Il PC della festa può tenere aperto `index.html`; tu e Gianluca aprite `master.html` dal telefono.
