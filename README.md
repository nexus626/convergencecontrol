# convergencecontrol v5

## Flusso aggiornato

### WELCOME = PHASE I
La festa parte direttamente con:
- `WELCOME TO THE CONVERGENCE`
- `ARCHIVE RECONSTRUCTION REQUIRED`
- `MEMORY RECORD ANOMALY`
- `CORRUPTED PRE-CONVERGENCE ASSOCIATIONS DETECTED`
- pulsante `ENTER ARCHIVE RECONSTRUCTION CODE`

Non esiste più un comando separato `START PHASE I`.

### PHASE I COMPLETE
Dopo il codice corretto:
- Archive restored
- 4 Timelines detected
- `AUTOMATIC REFERENCE ANCHOR PENDING...`

Da Master Control si può:
- avviare PHASE II completa;
- usare `AUTO-ANCHOR (PLAN B)` se manca tempo.

### PHASE II
- rosso / critico;
- nessun countdown;
- anelli di contenimento instabili;
- scariche plasma originate dalla NOVA;
- log tecnici autocompilati sotto il pulsante `ENTER ANCHOR PROTOCOL`;
- allarmi industriali intermittenti.

### CLEARED
Falsa conclusione calma:
- Primary Reference Anchor = NOVA
- Convergence stable
- Case closed

### CASCADE
- unica fase con countdown;
- layout separato senza sovrapposizioni;
- log tecnici a sinistra e destra del timer;
- NOVA cresce e diventa più instabile man mano che il timer scende;
- anelli tentano di contenerla;
- plasma parte dalla NOVA;
- quattro Timeline selezionabili;
- `manual override` quasi nascosto sotto;
- allarme industriale molto più frequente.

### RESOLVED
- Timeline Integrity = 100.00%
- Distributed Anchor
- All Timelines coexist
- Merry Christmas

## Audio
I browser richiedono un'interazione manuale per autorizzare l'audio.

Prima dell'arrivo degli ospiti sul PC:
1. aprire `index.html`;
2. cliccare `INITIALIZE CONTROL AUDIO`;
3. verificare che compaia `AUDIO ONLINE`.

Dopo questo click il sito può generare hum, allarmi, glitch e scariche nelle fasi critiche.

## Master PIN
`master.html` resta bloccato finché il PIN non viene validato.

In modalità locale di test:
- PIN temporaneo: `6260`.

Con Google Apps Script:
- il PIN viene verificato sul backend;
- il PIN non deve essere inserito nei file pubblici GitHub;
- cambiarlo dentro `Code.gs` prima della festa.

Il PIN corretto viene salvato soltanto in `sessionStorage` sul telefono del Keeper, così non va reinserito per ogni comando durante quella sessione.

## Controllo remoto
File:
- `Code.gs` → incollare in Google Apps Script, non su GitHub.
- `remote-config.js` → contiene l'URL `/exec` della Web App.

Procedura:
1. creare progetto Apps Script;
2. incollare `Code.gs`;
3. cambiare `MASTER_PIN`;
4. Deploy → New deployment → Web app;
5. Execute as: Me;
6. Access: Anyone;
7. copiare URL `/exec`;
8. inserirlo in `remote-config.js`;
9. caricare `remote-config.js` nella repo.

PC:
- `index.html`

Telefono Keepers:
- `master.html`

QR partecipanti:
- `key.html?key=...`


## v6 refinements
- Right telemetry column right-aligned to avoid overlap.
- Cascade right-side diagnostics right-aligned and clipped inside their column.
- Rolling diagnostics now type themselves character by character.
- Phase II siren starts at entry and fades after ~5 seconds.
- Phase III siren continues until resolution, with repeating voice warning when supported by the browser.
- Cascade NOVA enlarged and placed as a background crisis core behind the countdown.


## v6.1
- Finale: `CONVERGENCE RESTORED` e `MERRY CHRISTMAS` sono ora visualizzati entrambi come titolo principale, con la stessa dimensione.

## v7
- Radio warning voice uses only an English `speechSynthesis` voice (`en-US`/`en-GB`/`en-*`). If the browser has no English voice, voice warning is skipped.
- Industrial alarm redesigned with much lower horn-like frequencies and harmonics.
- Resolution is now a 5.6 s transition: red → orange → yellow/white → green/cyan → blue.
- Final Christmas mode includes:
  - falling snow;
  - blinking colored bulbs around the screen perimeter;
  - a public-domain Jingle Bells instrumental motif generated with Web Audio;
  - final blue/green stabilized Convergence visuals.
