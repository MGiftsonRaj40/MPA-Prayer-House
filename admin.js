const adminStatus = document.getElementById("adminStatus");
const saveAllButton = document.getElementById("saveAllButton");
const exportButton = document.getElementById("exportButton");
const importFileInput = document.getElementById("importFileInput");
const resetButton = document.getElementById("resetButton");
const backupOutput = document.getElementById("backupOutput");

let adminContent = window.ChurchContent.loadContent();

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const listConfigs = {
  news: {
    editorId: "newsEditor",
    fields: [
      { key: "category", label: "Category", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Description", type: "textarea" }
    ],
    createItem: () => ({ category: "Update", title: "New story", text: "Add a short update for the church family." })
  },
  notices: {
    editorId: "noticesEditor",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Notice", type: "textarea" }
    ],
    createItem: () => ({ title: "New notice", text: "Add an important reminder here." })
  },
  gallery: {
    editorId: "galleryEditor",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Caption", type: "textarea" },
      { key: "alt", label: "Alt Text", type: "text" },
      { key: "image", label: "Image URL", type: "text" }
    ],
    createItem: () => ({
      title: "New gallery image",
      text: "Add a caption for this moment.",
      alt: "Church photo",
      image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=900&q=80"
    }),
    fileUpload: true
  },
  events: {
    editorId: "eventsEditor",
    fields: [
      { key: "day", label: "Day", type: "text" },
      { key: "month", label: "Month", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Description", type: "textarea" }
    ],
    createItem: () => ({ day: "01", month: "MAY", title: "New event", text: "Add event details here." })
  },
  ministries: {
    editorId: "ministriesEditor",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Description", type: "textarea" }
    ],
    createItem: () => ({ title: "New ministry", text: "Describe who this ministry serves." })
  },
  services: {
    editorId: "servicesEditor",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "title", label: "Time", type: "text" },
      { key: "text", label: "Description", type: "textarea" }
    ],
    createItem: () => ({ label: "New gathering", title: "Time", text: "Describe this service or gathering." })
  }
};

function setStatus(message) {
  adminStatus.textContent = message;
}

function fillBasicInputs() {
  document.getElementById("brandMarkInput").value = adminContent.brand.mark;
  document.getElementById("brandNameInput").value = adminContent.brand.name;
  document.getElementById("brandTaglineInput").value = adminContent.brand.tagline;
  document.getElementById("heroEyebrowInput").value = adminContent.hero.eyebrow;
  document.getElementById("heroTitleInput").value = adminContent.hero.title;
  document.getElementById("heroTextInput").value = adminContent.hero.text;
  document.getElementById("heroPrimaryLabelInput").value = adminContent.hero.primaryButton.label;
  document.getElementById("heroPrimaryHrefInput").value = adminContent.hero.primaryButton.href;
  document.getElementById("heroSecondaryLabelInput").value = adminContent.hero.secondaryButton.label;
  document.getElementById("heroSecondaryHrefInput").value = adminContent.hero.secondaryButton.href;
  document.getElementById("footerTitleInput").value = adminContent.footer.title;
  document.getElementById("contactEmailInput").value = adminContent.footer.contact.email;
  document.getElementById("contactPhoneInput").value = adminContent.footer.contact.phone;
  document.getElementById("contactAddressInput").value = adminContent.footer.contact.address;
  document.getElementById("officeOneInput").value = adminContent.footer.office.lineOne;
  document.getElementById("officeTwoInput").value = adminContent.footer.office.lineTwo;
  document.getElementById("officeThreeInput").value = adminContent.footer.office.lineThree;
}

function renderListEditor(listName) {
  const config = listConfigs[listName];
  const container = document.getElementById(config.editorId);
  if (!container) {
    return;
  }

  container.innerHTML = adminContent[listName]
    .map((item, index) => {
      const fieldsMarkup = config.fields
        .map((field) => {
          const value = escapeHtml(item[field.key] || "");
          if (field.type === "textarea") {
            return `
              <label>
                ${field.label}
                <textarea data-list="${listName}" data-index="${index}" data-key="${field.key}" rows="3">${value}</textarea>
              </label>
            `;
          }

          return `
            <label>
              ${field.label}
              <input type="${field.type}" data-list="${listName}" data-index="${index}" data-key="${field.key}" value="${value}">
            </label>
          `;
        })
        .join("");

      const uploadMarkup = config.fileUpload
        ? `
          <label>
            Upload Image
            <input type="file" data-upload-list="${listName}" data-index="${index}" accept="image/*">
          </label>
        `
        : "";

      const previewMarkup = item.image
        ? `<div class="admin-image-preview"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title || "Preview")}"></div>`
        : "";

      return `
        <article class="admin-list-card">
          <div class="admin-grid two-column">
            ${fieldsMarkup}
            ${uploadMarkup}
          </div>
          ${previewMarkup}
          <button class="admin-remove" type="button" data-remove-list="${listName}" data-index="${index}">Remove</button>
        </article>
      `;
    })
    .join("");
}

function renderAllLists() {
  Object.keys(listConfigs).forEach(renderListEditor);
}

function collectBasicInputs() {
  adminContent.brand.mark = document.getElementById("brandMarkInput").value.trim();
  adminContent.brand.name = document.getElementById("brandNameInput").value.trim();
  adminContent.brand.tagline = document.getElementById("brandTaglineInput").value.trim();
  adminContent.hero.eyebrow = document.getElementById("heroEyebrowInput").value.trim();
  adminContent.hero.title = document.getElementById("heroTitleInput").value.trim();
  adminContent.hero.text = document.getElementById("heroTextInput").value.trim();
  adminContent.hero.primaryButton.label = document.getElementById("heroPrimaryLabelInput").value.trim();
  adminContent.hero.primaryButton.href = document.getElementById("heroPrimaryHrefInput").value.trim();
  adminContent.hero.secondaryButton.label = document.getElementById("heroSecondaryLabelInput").value.trim();
  adminContent.hero.secondaryButton.href = document.getElementById("heroSecondaryHrefInput").value.trim();
  adminContent.footer.title = document.getElementById("footerTitleInput").value.trim();
  adminContent.footer.contact.email = document.getElementById("contactEmailInput").value.trim();
  adminContent.footer.contact.phone = document.getElementById("contactPhoneInput").value.trim();
  adminContent.footer.contact.address = document.getElementById("contactAddressInput").value.trim();
  adminContent.footer.office.lineOne = document.getElementById("officeOneInput").value.trim();
  adminContent.footer.office.lineTwo = document.getElementById("officeTwoInput").value.trim();
  adminContent.footer.office.lineThree = document.getElementById("officeThreeInput").value.trim();
}

function saveAll() {
  collectBasicInputs();
  window.ChurchContent.saveContent(adminContent);
  backupOutput.value = JSON.stringify(adminContent, null, 2);
  setStatus("Changes saved in this browser.");
}

function addListItem(listName) {
  adminContent[listName].push(listConfigs[listName].createItem());
  renderListEditor(listName);
  setStatus("Item added.");
}

function removeListItem(listName, index) {
  adminContent[listName].splice(index, 1);
  renderListEditor(listName);
  setStatus("Item removed.");
}

function importContent(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      adminContent = Object.assign(window.ChurchContent.cloneContent(window.ChurchContent.defaultContent), JSON.parse(reader.result));
      fillBasicInputs();
      renderAllLists();
      backupOutput.value = JSON.stringify(adminContent, null, 2);
      setStatus("Content imported. Save to keep it.");
    } catch (error) {
      setStatus("Import failed. Please use a valid JSON file.");
    }
  };
  reader.readAsText(file);
}

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches("[data-list]")) {
    const listName = target.dataset.list;
    const index = Number(target.dataset.index);
    const key = target.dataset.key;
    adminContent[listName][index][key] = target.value;
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;

  if (target.matches("[data-upload-list]")) {
    const listName = target.dataset.uploadList;
    const index = Number(target.dataset.index);
    const file = target.files && target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      adminContent[listName][index].image = reader.result;
      renderListEditor(listName);
      setStatus("Image loaded. Save to keep it.");
    };
    reader.readAsDataURL(file);
  }

  if (target === importFileInput) {
    const file = importFileInput.files && importFileInput.files[0];
    if (file) {
      importContent(file);
    }
  }
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-list]");
  const removeButton = event.target.closest("[data-remove-list]");

  if (addButton) {
    addListItem(addButton.dataset.addList);
  }

  if (removeButton) {
    removeListItem(removeButton.dataset.removeList, Number(removeButton.dataset.index));
  }
});

saveAllButton.addEventListener("click", saveAll);

exportButton.addEventListener("click", () => {
  collectBasicInputs();
  backupOutput.value = JSON.stringify(adminContent, null, 2);
  setStatus("JSON export prepared below.");
});

resetButton.addEventListener("click", () => {
  adminContent = window.ChurchContent.resetContent();
  fillBasicInputs();
  renderAllLists();
  backupOutput.value = JSON.stringify(adminContent, null, 2);
  setStatus("Reset to default content.");
});

fillBasicInputs();
renderAllLists();
backupOutput.value = JSON.stringify(adminContent, null, 2);
