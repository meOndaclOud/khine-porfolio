
const supabaseUrl = "https://tugojovqzczwboascqdl.supabase.co";
const supabaseKey = "sb_publishable_TIhun6pTcm0DVhWex4vqIQ_THjc7tq8";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Sending...";
  status.style.color = "#888";

  const name = document.getElementById("cf-name").value;
  const email = document.getElementById("cf-email").value;
  const subject = document.getElementById("cf-subject").value;
  const message = document.getElementById("cf-message").value;

  const { error } = await supabase
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
    status.textContent = " Error!" + error.message;
    status.style.color = "#ef4444";
  } else {
    status.textContent = " Message sent successfully!";
    status.style.color = "#10b981";
    form.reset();
  }
});