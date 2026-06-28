
const supabaseUrl = "https://tugojovqzczwboascqdl.supabase.co";
const supabaseKey = "sb_publishable_TIhun6pTcm0DVhWex4vqIQ_THjc7tq8";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Sending...";
  status.style.color = "#888";

  // Read form values
  const formData = new FormData(form);

  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const subject = formData.get("subject")?.trim();
  const message = formData.get("message")?.trim();

  // Debugging
  console.log("========== FORM DATA ==========");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("===============================");

  // Prevent empty submission
  if (!name || !email || !message) {
    status.textContent = "Please fill in all required fields.";
    status.style.color = "#ef4444";
    return;
  }

  // Insert into Supabase
  const { error } = await supabaseClient
    .from("portfolio-db-contact")
    .insert([
      {
        name,
        email,
        subject,
        message
      }
    ]);

  if (error) {
    console.error(error);

    status.textContent = "Error: " + error.message;
    status.style.color = "#d80a0a";
  } else {
    console.log("Message saved successfully!");

    status.textContent = "✅ Message sent successfully!";
    status.style.color = "#098902";

    form.reset();
  }
});