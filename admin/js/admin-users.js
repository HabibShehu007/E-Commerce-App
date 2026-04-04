document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("searchInput");

  // Load users from localStorage (or empty array if none)
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Render users into table
  function renderUsers(list) {
    tableBody.innerHTML = "";
    if (list.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="6" class="text-center py-4 text-gray-500">
          <i class="fas fa-user-slash text-red-400 mr-2"></i>No registered users found.
        </td>
      `;
      tableBody.appendChild(row);
      return;
    }

    list.forEach((user, index) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";

      row.innerHTML = `
        <td class="px-4 py-2">${index + 1}</td>
        <td class="px-4 py-2">${user.username}</td>
        <td class="px-4 py-2">${user.email}</td>
        <td class="px-4 py-2 capitalize">${user.role}</td>
        <td class="px-4 py-2">${user.registered}</td>
        <td class="px-4 py-2 flex gap-2">
          <button class="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition block-btn" data-id="${user.id}">
            <i class="fas fa-ban"></i> Block
          </button>
          <button class="px-3 py-1 bg-gray-500 text-white rounded-md text-xs hover:bg-gray-600 transition delete-btn" data-id="${user.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Initial render
  renderUsers(users);

  // Search filter
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
    renderUsers(filtered);
  });

  // Handle Block/Delete actions
  tableBody.addEventListener("click", (e) => {
    if (e.target.closest(".block-btn")) {
      const id = e.target.closest(".block-btn").dataset.id;
      users = users.map((u) => (u.id == id ? { ...u, role: "blocked" } : u));
      localStorage.setItem("users", JSON.stringify(users));
      renderUsers(users);
    }

    if (e.target.closest(".delete-btn")) {
      const id = e.target.closest(".delete-btn").dataset.id;
      users = users.filter((u) => u.id != id);
      localStorage.setItem("users", JSON.stringify(users));
      renderUsers(users);
    }
  });
});
