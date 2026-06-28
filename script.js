
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

  // Read values directly from the inputs
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject").value.trim();
  const message = document.getElementById("cf-message").value.trim();

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  if (!name || !email || !message) {
    status.textContent = "Please fill in all required fields.";
    status.style.color = "red";
    return;
  }

  const { data, error } = await supabaseClient
    .from("portfolio-db-contact")
    .insert([
      {
        name: name,
        email: email,
        subject: subject,
        message: message
      }
    ])
    .select();

  console.log(data);
  console.log(error);

  if (error) {
    status.textContent = error.message;
    status.style.color = "red";
    return;
  }

  status.textContent = "Message sent successfully!";
  status.style.color = "green";
  form.reset();
});