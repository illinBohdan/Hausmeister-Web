const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки

  // Збираємо дані з полів форми
  const formData = {
    name: document.getElementById("user-name").value,
    email: document.getElementById("user-email").value,
    phone: document.getElementById("user-phone").value,
    description: document.getElementById("beschreibung").value,
  };

  //http://localhost:8080/api/users/register - для локального використання

  try {
    const response = await fetch(
      "https://hausmeister-backend-production-c177.up.railway.app/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (response.ok) {
      alert("Дякуємо! Ваша заявка успішно надіслана.");
      contactForm.reset(); // Очищуємо форму
    } else {
      alert("Помилка при відправці. Спробуйте пізніше.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Не вдалося з’єднатися з сервером.");
  }
});
