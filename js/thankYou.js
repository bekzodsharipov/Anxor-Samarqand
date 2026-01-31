async function sendFormData() {
  const raw = localStorage.getItem("formData");
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("Invalid formData JSON:", e);
    return;
  }

  const fd = new FormData();
  fd.append("sheetName", "Lead");

  fd.append("Telefon raqam", data.TelefonRaqam || "");
  fd.append("Royhatdan o'tgan vaqti", data.SanaSoat || "");

  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycby1QajqfyRSAUppkHieapM_RsQ_jMv6eVJhRSOhKVZFR7pLo_wezdYZyugKVBli-RQ/exec",
      { method: "POST", body: fd }
    );

    if (!res.ok) throw new Error("API response was not ok");

    localStorage.removeItem("formData");
  } catch (err) {
    console.error("Error submitting form:", err);
    const msg = document.getElementById("errorMessage");
    if (msg) msg.style.display = "block";
  }
}

window.addEventListener("load", sendFormData);
