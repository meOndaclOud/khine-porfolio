
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

const nameInput = document.getElementById("cf-name");
const emailInput = document.getElementById("cf-email");
const subjectInput = document.getElementById("cf-subject");
const messageInput = document.getElementById("cf-message");

console.log(nameInput);
console.log(emailInput);
console.log(subjectInput);
console.log(messageInput);

const formData = new FormData(form);

for (const pair of formData.entries()) {
    console.log(pair[0], "=", pair[1]);
}

  
console.log({
  name,
  email,
  subject,
  message
});
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
    status.textContent = " Error!" + error.message;
    status.style.color = "#ef4444";
  } else {
    status.textContent = " Message sent successfully!";
    status.style.color = "#10b981";
    form.reset();
  }
});