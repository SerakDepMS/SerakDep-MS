// email.js - Integración con Email.js para SerakDep MS

document.addEventListener("DOMContentLoaded", function () {
  // Verificar que EmailJS está disponible antes de inicializar
  if (typeof emailjs !== "undefined") {
    initEmailJS();
    initContactForm();
  } else {
    console.error("EmailJS no se ha cargado correctamente");
  }
});

// Inicializar EmailJS con tu public key
function initEmailJS() {
  // Reemplaza 'YOUR_PUBLIC_KEY' con tu Public Key de EmailJS
  emailjs.init("KZquan0PhqC35uDYw");
  console.log("EmailJS inicializado correctamente");
}

// Configurar el formulario de contacto
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) {
    console.warn("Formulario de contacto no encontrado");
    return;
  }

  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearValidation);
  });

  contactForm.addEventListener("submit", handleFormSubmit);
}

// Validar campo individual
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.getAttribute("name");
  let isValid = true;
  let errorMessage = "";

  // Validaciones específicas para cada campo
  switch (fieldName) {
    case "name":
      if (value.length < 2) {
        isValid = false;
        errorMessage = "El nombre debe tener al menos 2 caracteres";
      }
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Por favor ingresa un email válido";
      }
      break;
    case "subject":
      if (value.length < 5) {
        isValid = false;
        errorMessage = "El asunto debe tener al menos 5 caracteres";
      }
      break;
    case "message":
      if (value.length < 10) {
        isValid = false;
        errorMessage = "El mensaje debe tener al menos 10 caracteres";
      }
      break;
  }

  if (!isValid) {
    showError(field, errorMessage);
  } else {
    clearError(field);
  }

  return isValid;
}

// Mostrar error en campo
function showError(field, message) {
  clearError(field);

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "#ef4444";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";
  errorDiv.textContent = message;

  field.style.borderColor = "#ef4444";
  field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearError(field) {
  field.style.borderColor = "#e5e7eb";

  const errorDiv = field.parentNode.querySelector(".error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Limpiar validación al escribir
function clearValidation(e) {
  const field = e.target;
  if (field.value.trim() !== "") {
    clearError(field);
  }
}

// Manejar envío del formulario
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  let isFormValid = true;
  const inputs = form.querySelectorAll("input, textarea");

  // Validar todos los campos antes de enviar
  inputs.forEach((input) => {
    // Crear un evento de blur para forzar la validación
    const event = new Event("blur", { bubbles: true });
    input.dispatchEvent(event);

    if (input.parentNode.querySelector(".error-message")) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    showNotification("Por favor corrige los errores en el formulario", "error");
    return;
  }

  // Cambiar estado del botón
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;

  // Preparar parámetros para EmailJS
  const templateParams = {
    from_name: formData.get("name"),
    from_email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Enviar el correo
  emailjs
    .send("service_3dlso3n", "template_bso642c", templateParams)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      showNotification(
        "Mensaje enviado correctamente. Te contactaremos pronto.",
        "success"
      );
      form.reset();
    })
    .catch(function (error) {
      console.error("FAILED...", error);
      showNotification(
        "Error al enviar el mensaje. Por favor intenta nuevamente.",
        "error"
      );
    })
    .finally(function () {
      // Restaurar el botón
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
}

// Mostrar notificación de estado
function showNotification(message, type) {
  // Eliminar notificaciones existentes
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Crear nueva notificación
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Estilos para la notificación
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.padding = "1rem 1.5rem";
  notification.style.borderRadius = "8px";
  notification.style.color = "white";
  notification.style.fontWeight = "500";
  notification.style.zIndex = "10000";
  notification.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
  notification.style.transform = "translateX(100%)";
  notification.style.transition = "transform 0.3s ease";

  // Colores según el tipo
  if (type === "success") {
    notification.style.background = "linear-gradient(135deg, #10b981, #059669)";
  } else {
    notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
  }

  // Añadir al DOM
  document.body.appendChild(notification);

  // Animación de entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Eliminar después de 5 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}
