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
      // Отримуємо JSON з помилками від Spring Boot
      const errorData = await response.json();

      if (errorData.errors) {
        errorData.errors.forEach((err) => {
          // Знаходимо інпут за id. в HTML id: user-name, user-email тощо
          // В Java назви полів: name, email, phone, description
          let fieldId = err.field;
          if (fieldId === "name") fieldId = "user-name";
          if (fieldId === "email") fieldId = "user-email";
          if (fieldId === "phone") fieldId = "user-phone";
          if (fieldId === "description") fieldId = "beschreibung";

          const input = document.getElementById(fieldId);
          if (input) {
            // Встановлюємо власний текст помилки
            input.setCustomValidity(err.defaultMessage);
            // Змушуємо браузер показати це вікно негайно
            input.reportValidity();

            // Очищуємо помилку, коли користувач почне знову друкувати
            input.oninput = () => input.setCustomValidity("");
          }
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Не вдалося з’єднатися з сервером.");
  }
});
