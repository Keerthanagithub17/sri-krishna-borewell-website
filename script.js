const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const enquiryForm = document.getElementById("enquiryForm");
const formFeedback = document.getElementById("formFeedback");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) {
    return;
  }

  const formData = new FormData(enquiryForm);
  const name = String(formData.get("customerName")).trim();
  const phone = String(formData.get("customerPhone")).trim();
  const service = String(formData.get("serviceType")).trim();
  const location = String(formData.get("siteLocation")).trim();
  const message = String(formData.get("message")).trim();

  const phonePattern = /^[+]?[\d\s()-]{8,16}$/;
  if (!phonePattern.test(phone)) {
    formFeedback.textContent = "Please enter a valid contact number.";
    document.getElementById("customerPhone").focus();
    return;
  }

  const whatsappMessage = [
    "Hello Sri Krishna Borewell, I would like to make an enquiry.",
    "",
    `Name: ${name}`,
    `Contact number: ${phone}`,
    `Service required: ${service}`,
    `Site location: ${location}`,
    message ? `Requirement details: ${message}` : ""
  ].filter(Boolean).join("\n");

  const whatsappNumber = "919840192905";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  formFeedback.textContent = "Opening WhatsApp. Please review and send your enquiry there.";
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
