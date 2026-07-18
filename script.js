// =========================
// Supabase Configuration
// =========================

const supabaseUrl = "https://jtmnrxfofgaoynhneqma.supabase.co";
const supabaseKey = "sb_publishable_WMB8_h-odPWeTzoRcZGz5A_IgZUtB7a";

const { createClient } = supabase;
const db = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase Connected");

// =========================
// Contact Form
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("❌ contactForm not found!");
        return;
    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const full_name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!full_name || !email || !phone || !subject || !message) {
            alert("⚠️ Please fill all fields.");
            return;
        }

        try {

            // =========================
            // Save to Supabase
            // =========================

            const { error } = await db
                .from("import")
                .insert([
                    {
                        full_name,
                        email,
                        phone,
                        subject,
                        message
                    }
                ]);

            if (error) throw error;

            console.log("✅ Saved to Supabase");

           // Save to Google Sheet
await fetch("https://script.google.com/macros/s/AKfycby5QJjpvjAG6pY_6hgrvhbU8mWRLssiMf3SxgVQmb3aBTwz1aXvwRho70LRuGk-osef/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        full_name: full_name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
    })
});

console.log("✅ Saved to Google Sheet");
            

            alert("✅ Message Sent Successfully!");

            form.reset();

        } catch (err) {

            console.error(err);

            alert("❌ " + err.message);

        }

    });

});