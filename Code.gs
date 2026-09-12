/**
 * THE CONVERGENCE — shared game state backend
 * Google Apps Script Web App
 *
 * 1) Cambia MASTER_PIN.
 * 2) Deploy > New deployment > Web app
 * 3) Execute as: Me
 * 4) Who has access: Anyone
 * 5) Copia l'URL che termina in /exec dentro remote-config.js
 */

const MASTER_PIN = "6260";

const DEFAULTS = {
  state: "WELCOME",
  phase1Code: "AR-4721",
  phase2Code: "NOVA-2974",
  finalCommand: "STABILIZE ALL TIMELINES",
  timerMinutes: "10",
  selectedAnchor: "",
  cascadeStart: "0",
  updatedAt: "0"
};

function doGet() {
  return json_(publicState_());
}

function doPost(e) {
  let data = {};
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json_({ ok:false, error:"INVALID_JSON" });
  }

  const action = String(data.action || "");

  if (action === "validate_phase1") {
    if (normalize_(data.code) !== normalize_(get_("phase1Code"))) {
      return json_({ ok:false, error:"INVALID_CODE" });
    }
    set_("state","PHASE1_COMPLETE");
    touch_();
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "validate_phase2") {
    if (normalize_(data.code) !== normalize_(get_("phase2Code"))) {
      return json_({ ok:false, error:"INVALID_CODE" });
    }
    set_("state","CLEARED");
    set_("selectedAnchor","NOVA");
    touch_();
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "override") {
    if (normalize_(data.command) !== normalize_(get_("finalCommand"))) {
      return json_({ ok:false, error:"INVALID_COMMAND" });
    }
    set_("state","RESOLVED");
    touch_();
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "timeline_attempt") {
    set_("selectedAnchor", String(data.timeline || ""));
    touch_();
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "master_set_state") {
    if (String(data.pin || "") !== MASTER_PIN) return json_({ok:false,error:"UNAUTHORIZED"});
    const allowed = ["WELCOME","PHASE1","PHASE1_COMPLETE","PHASE2","CLEARED","AUTO_ANCHOR","CASCADE","RESOLVED"];
    const state = String(data.state || "");
    if (allowed.indexOf(state) < 0) return json_({ok:false,error:"INVALID_STATE"});

    set_("state",state);

    if (state === "CASCADE") {
      set_("cascadeStart", String(Date.now()));
      set_("selectedAnchor","");
    } else if (state === "WELCOME") {
      set_("cascadeStart","0");
      set_("selectedAnchor","");
    } else if (state === "CLEARED" || state === "AUTO_ANCHOR") {
      set_("selectedAnchor","NOVA");
    } else if (state === "RESOLVED") {
      set_("selectedAnchor","");
    }
    touch_();
    return json_({ok:true,state:publicState_()});
  }

  if (action === "master_reset") {
    if (String(data.pin || "") !== MASTER_PIN) return json_({ok:false,error:"UNAUTHORIZED"});
    const p = PropertiesService.getScriptProperties();
    Object.keys(DEFAULTS).forEach(k => p.setProperty(k, DEFAULTS[k]));
    touch_();
    return json_({ok:true,state:publicState_()});
  }

  return json_({ ok:false, error:"UNKNOWN_ACTION" });
}

function publicState_() {
  return {
    state: get_("state"),
    timerMinutes: Number(get_("timerMinutes")),
    cascadeStart: Number(get_("cascadeStart")),
    selectedAnchor: get_("selectedAnchor"),
    updatedAt: Number(get_("updatedAt"))
  };
}

function get_(key) {
  const p = PropertiesService.getScriptProperties();
  let v = p.getProperty(key);
  if (v === null) {
    v = DEFAULTS[key];
    p.setProperty(key, v);
  }
  return v;
}

function set_(key,value) {
  PropertiesService.getScriptProperties().setProperty(key,String(value));
}

function touch_() {
  set_("updatedAt", Date.now());
}

function normalize_(value) {
  return String(value || "").trim().replace(/\s+/g," ").toUpperCase();
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
