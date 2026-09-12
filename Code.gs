/**
 * THE CONVERGENCE — shared live state backend
 * Google Apps Script Web App
 *
 * IMPORTANT:
 * - Keep this file in Apps Script, NOT in the public GitHub repo.
 * - Change MASTER_PIN before the event.
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
  stateChangedAt: "0",
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

  if (action === "master_auth") {
    return json_({ ok: String(data.pin || "") === MASTER_PIN });
  }

  if (action === "validate_phase1") {
    if (normalize_(data.code) !== normalize_(get_("phase1Code"))) {
      return json_({ ok:false, error:"INVALID_CODE" });
    }
    transition_("PHASE1_COMPLETE");
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "validate_phase2") {
    if (normalize_(data.code) !== normalize_(get_("phase2Code"))) {
      return json_({ ok:false, error:"INVALID_CODE" });
    }
    set_("selectedAnchor","NOVA");
    transition_("CLEARED");
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "override") {
    if (normalize_(data.command) !== normalize_(get_("finalCommand"))) {
      return json_({ ok:false, error:"INVALID_COMMAND" });
    }
    transition_("RESOLVED");
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "timeline_attempt") {
    set_("selectedAnchor", String(data.timeline || ""));
    touch_();
    return json_({ ok:true, state:publicState_() });
  }

  if (action === "master_set_state") {
    if (!authorized_(data.pin)) return json_({ok:false,error:"UNAUTHORIZED"});

    const allowed = [
      "WELCOME",
      "PHASE1_COMPLETE",
      "PHASE2",
      "CLEARED",
      "AUTO_ANCHOR",
      "CASCADE",
      "RESOLVED"
    ];
    const next = String(data.state || "");
    if (allowed.indexOf(next) < 0) return json_({ok:false,error:"INVALID_STATE"});

    if (next === "CASCADE") {
      set_("cascadeStart", String(Date.now()));
      set_("selectedAnchor","");
    } else if (next === "WELCOME") {
      set_("cascadeStart","0");
      set_("selectedAnchor","");
    } else if (next === "CLEARED" || next === "AUTO_ANCHOR") {
      set_("selectedAnchor","NOVA");
    } else if (next === "RESOLVED") {
      set_("selectedAnchor","");
    }

    transition_(next);
    return json_({ok:true,state:publicState_()});
  }

  if (action === "master_save_settings") {
    if (!authorized_(data.pin)) return json_({ok:false,error:"UNAUTHORIZED"});
    if (data.phase1Code) set_("phase1Code", String(data.phase1Code));
    if (data.phase2Code) set_("phase2Code", String(data.phase2Code));
    if (data.finalCommand) set_("finalCommand", String(data.finalCommand));
    if (data.timerMinutes) set_("timerMinutes", String(data.timerMinutes));
    touch_();
    return json_({ok:true,state:publicState_()});
  }

  if (action === "master_reset") {
    if (!authorized_(data.pin)) return json_({ok:false,error:"UNAUTHORIZED"});
    const p = PropertiesService.getScriptProperties();
    Object.keys(DEFAULTS).forEach(k => p.setProperty(k, DEFAULTS[k]));
    transition_("WELCOME");
    return json_({ok:true,state:publicState_()});
  }

  return json_({ ok:false, error:"UNKNOWN_ACTION" });
}

function authorized_(pin) {
  return String(pin || "") === MASTER_PIN;
}

function transition_(state) {
  set_("state",state);
  set_("stateChangedAt",Date.now());
  touch_();
}

function publicState_() {
  return {
    state: get_("state"),
    timerMinutes: Number(get_("timerMinutes")),
    cascadeStart: Number(get_("cascadeStart")),
    selectedAnchor: get_("selectedAnchor"),
    stateChangedAt: Number(get_("stateChangedAt")),
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
