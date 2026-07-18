// =========================
// Supabase Configuration
// =========================

const supabaseUrl = "https://jtmnrxfofgaoynhneqma.supabase.co";
const supabaseKey = "sb_publishable_WMB8_h-odPWeTzoRcZGz5A_IgZUtB7a";

const { createClient } = supabase;
const db = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase Connected");

// =========================
// Contact Form Submit
// =========================

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!full_name || !email || !phone || !subject || !message) {
        alert("⚠️ Please fill all fields.");
        return;
    }

    // Insert into Supabase
    const { data, error } = await db
        .from("import")
        .insert([
            {
                full_name: full_name,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            }
        ]);

    if (error) {
        console.error("Supabase Error:", error);
        alert("❌ Error: " + error.message);
    } else {
        console.log("Inserted:", data);
        alert("✅ Message Sent Successfully!");
        form.reset();
    }
});