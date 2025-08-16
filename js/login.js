
  const modal = document.getElementById("modalOverlay");
  const resetInput = document.getElementById("resetEmail");
  const confirmModal = document.getElementById("confirmationModal");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmOK = document.getElementById("confirmOK");
  const confirmCancel = document.getElementById("confirmCancel");

  let redirectToDashboard = false;

  function showModal(modalElement) {
    modalElement.style.display = "flex";
  }

  function hideModal(modalElement) {
    modalElement.style.display = "none";
  }

  function showConfirmation(title, message, shouldRedirect = false) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    redirectToDashboard = shouldRedirect;
    showModal(confirmModal);
  }

  document.querySelector(".forgot-link").addEventListener("click", function (e) {
    e.preventDefault();
    resetInput.value = "";
    showModal(modal);
  });

  document.getElementById("closeModal").addEventListener("click", function () {
    hideModal(modal);
  });

  document.getElementById("sendReset").addEventListener("click", function () {
    const resetEmail = resetInput.value.trim();
    if (!resetEmail.includes("@")) {
      showConfirmation("Invalid Email", "Please enter a valid email address.");
      return;
    }
    hideModal(modal);
    showConfirmation("Reset Link Sent", `Instructions sent to ${resetEmail}`);
  });

  document.getElementById("confirmOK").addEventListener("click", function () {
    hideModal(confirmModal);
    if (redirectToDashboard) {
      window.location.href = "dashboard.html";
    }
  });

  document.getElementById("confirmCancel").addEventListener("click", function () {
    hideModal(confirmModal);
    redirectToDashboard = false;
  });

  document.querySelector(".google-btn").addEventListener("click", function () {
    showConfirmation("Google Account Found", `Sign up with habib@gmail.com?`, true);
  });

  document.querySelector(".apple-btn").addEventListener("click", function () {
    showConfirmation("Apple ID Found", `Sign up with habib@icloud.com?`, true);
  });

