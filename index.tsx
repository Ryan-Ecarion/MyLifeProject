/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Interfaces ---
interface Story {
  id: string;
  name: string;
  content: string;
  fontSize: string;
  isExpanded?: boolean;
}

interface DestinyContent {
  title: string;
  subtitle: string;
  backgroundImage?: string | null;
}

// --- Constants & Keys ---
const LOCAL_STORAGE_KEY_STORIES = 'myLifeProjectStories';
const LOCAL_STORAGE_KEY_DESTINY = 'myLifeProjectDestinyContent';
const LOCAL_STORAGE_KEY_STORY_SORT_ORDER = 'myLifeProjectStorySortOrder';
const LOCAL_STORAGE_KEY_THEME = 'myLifeProjectTheme';
const LOCAL_STORAGE_KEY_LANGUAGE = 'myLifeProjectLanguage';

const DEFAULT_DESTINY_BG = "url('https://i.pinimg.com/736x/7e/87/d5/7e87d51d71af0cb7e863b9051114049a.jpg')";
const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 30;
const FONT_SIZE_STEP = 2;

type StorySortOrder = 'newest-first' | 'oldest-first';
type AppTheme = 'dark' | 'light';
type AppLanguage = 'id' | 'en';

// --- SVG Icons ---
const ICON_KEBAB_MENU = `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="display: block; margin: auto;"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>`;
const ICON_CLOSE_X = `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="display: block; margin: auto;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`;

// --- Internationalization (i18n) ---
const translations = {
  en: {
    sidebarTitle: "MyLifeProject",
    navDestiny: "Destiny",
    navMyStory: "My Story",
    navGoal: "Goal",
    navAchievement: "Achievement",
    destinyDefaultTitle: "What is the meaning of life?",
    destinyDefaultSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    editDestinyButton: "Edit Destiny Content",
    editDestinyButtonTitle: "Change Destiny Content",
    myStoryMainTitle: "My Story",
    addPageButton: "Add Page",
    searchStoryPlaceholder: "Search pages...",
    searchStoryLabel: "Search story pages",
    sortStoriesNewestTitle: "Sort from Oldest",
    sortStoriesOldestTitle: "Sort from Newest",
    sortStoriesNewestLabel: "Sort stories from oldest",
    sortStoriesOldestLabel: "Sort stories from newest",
    storyPageDefaultContent: "Start writing your story...",
    editStoryButtonLabel: (name: string) => `Edit content ${name}`,
    editStoryButtonTitle: "Edit story",
    kebabMenuLabel: "More options",
    kebabMenuCloseLabel: "Close options",
    saveStoryButtonLabel: (name: string) => `Save ${name}`,
    saveStoryButtonTitle: "Save story",
    cancelEditButtonLabel: (name: string) => `Cancel edit ${name}`,
    cancelEditButtonTitle: "Cancel edit",
    deletePageButtonLabel: (name: string) => `Delete ${name}`,
    deletePageButtonTitle: "Delete page",
    fontDecreaseButtonLabel: (name: string) => `Decrease font size ${name}`,
    fontDecreaseButtonTitle: "Decrease font size",
    fontIncreaseButtonLabel: (name: string) => `Increase font size ${name}`,
    fontIncreaseButtonTitle: "Increase font size",
    editPageTitleLabel: "Edit page name",
    addPageModalTitle: "Create New Page",
    pageNameLabel: "Page name:",
    pageNamePlaceholder: "e.g., my biggest dream",
    confirmButton: "Yes",
    cancelButton: "Cancel",
    deleteConfirmModalTitle: "Confirm Deletion",
    deleteConfirmMessage: (name: string) => `Are you sure you want to delete the page "${name}"? This action cannot be undone.`,
    editDestinyModalTitle: "Edit Destiny Content",
    destinyModalTitleLabel: "Title:",
    destinyModalTitlePlaceholder: "Enter main title",
    destinyModalSubtitleLabel: "Subtitle:",
    destinyModalSubtitlePlaceholder: "Enter subtitle or description",
    destinyModalBgLabel: "Change Background (Optional):",
    destinyModalBgButton: "Select Your File",
    destinyModalBgPreviewNote: "Preview",
    saveButton: "Save",
    settingsModalTitle: "Settings",
    languageLabel: "Language:",
    themeLabel: "Theme:",
    darkTheme: "Dark Mode",
    lightTheme: "Light Mode",
    resetSettingsButton: "Reset to Default",
    resetConfirmMessage: "Are you sure you want to reset all settings and data? This will delete all your stories and custom content.",
    pageNameEmptyAlert: "Page name cannot be empty.",
    destinyTitleEmptyAlert: "Title cannot be empty.",
    imageLoadErrorAlert: "Failed to load image. Please try again.",
    toggleIconExpanded: "Collapse section",
    toggleIconCollapsed: "Expand section",
    settingsButtonLabel: "Open Settings",
    settingsButtonTitle: "Settings",
    closeSettingsButtonLabel: "Close Settings",
    goalPageContent: "Content for Goal...",
    achievementPageContent: "Content for Achievement...",
  },
  id: {
    sidebarTitle: "MyLifeProject",
    navDestiny: "Destiny",
    navMyStory: "Ceritaku",
    navGoal: "Tujuan",
    navAchievement: "Pencapaian",
    destinyDefaultTitle: "Apa makna hidup?",
    destinyDefaultSubtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    editDestinyButton: "Ubah Konten Destiny",
    editDestinyButtonTitle: "Ubah konten Destiny",
    myStoryMainTitle: "Ceritaku",
    addPageButton: "Tambah Halaman",
    searchStoryPlaceholder: "Cari halaman...",
    searchStoryLabel: "Cari halaman cerita",
    sortStoriesNewestTitle: "Urutkan dari Terlama",
    sortStoriesOldestTitle: "Urutkan dari Terbaru",
    sortStoriesNewestLabel: "Urutkan cerita dari yang terlama",
    sortStoriesOldestLabel: "Urutkan cerita dari yang terbaru",
    storyPageDefaultContent: "Mulai tulis ceritamu...",
    editStoryButtonLabel: (name: string) => `Edit konten ${name}`,
    editStoryButtonTitle: "Edit cerita",
    kebabMenuLabel: "Opsi lainnya",
    kebabMenuCloseLabel: "Tutup opsi",
    saveStoryButtonLabel: (name: string) => `Simpan ${name}`,
    saveStoryButtonTitle: "Simpan cerita",
    cancelEditButtonLabel: (name: string) => `Batal edit ${name}`,
    cancelEditButtonTitle: "Batal edit",
    deletePageButtonLabel: (name: string) => `Hapus ${name}`,
    deletePageButtonTitle: "Hapus halaman",
    fontDecreaseButtonLabel: (name: string) => `Perkecil font ${name}`,
    fontDecreaseButtonTitle: "Perkecil font",
    fontIncreaseButtonLabel: (name: string) => `Perbesar font ${name}`,
    fontIncreaseButtonTitle: "Perbesar font",
    editPageTitleLabel: "Edit nama halaman",
    addPageModalTitle: "Buat Halaman Baru",
    pageNameLabel: "Nama halaman:",
    pageNamePlaceholder: "contoh: mimpiku terbesar",
    confirmButton: "Ya",
    cancelButton: "Batal",
    deleteConfirmModalTitle: "Konfirmasi Hapus",
    deleteConfirmMessage: (name: string) => `Yakin ingin menghapus halaman "${name}"? Tindakan ini tidak dapat diurungkan.`,
    editDestinyModalTitle: "Ubah Konten Ini",
    destinyModalTitleLabel: "Judul:",
    destinyModalTitlePlaceholder: "Masukkan judul utama",
    destinyModalSubtitleLabel: "Subjudul:",
    destinyModalSubtitlePlaceholder: "Masukkan subjudul atau deskripsi",
    destinyModalBgLabel: "Ubah Latar Belakang (Opsional):",
    destinyModalBgButton: "Pilih Berkas Anda",
    destinyModalBgPreviewNote: "Pratinjau",
    saveButton: "Simpan",
    settingsModalTitle: "Pengaturan",
    languageLabel: "Bahasa:",
    themeLabel: "Tema:",
    darkTheme: "Mode Gelap",
    lightTheme: "Mode Terang",
    resetSettingsButton: "Reset Setelan Default",
    resetConfirmMessage: "Yakin ingin mereset semua pengaturan dan data? Ini akan menghapus semua cerita dan konten kustom Anda.",
    pageNameEmptyAlert: "Nama halaman tidak boleh kosong.",
    destinyTitleEmptyAlert: "Judul tidak boleh kosong.",
    imageLoadErrorAlert: "Gagal memuat gambar. Silakan coba lagi.",
    toggleIconExpanded: "Tutup bagian",
    toggleIconCollapsed: "Buka bagian",
    settingsButtonLabel: "Buka Pengaturan",
    settingsButtonTitle: "Pengaturan",
    closeSettingsButtonLabel: "Tutup Pengaturan",
    goalPageContent: "Konten untuk Tujuan...",
    achievementPageContent: "Konten untuk Pencapaian...",
  }
};
type TranslationKey = keyof typeof translations.en;

let currentLanguage: AppLanguage = 'id'; // Default language
let currentTheme: AppTheme = 'dark'; // Default theme


function getTranslatedString<K extends TranslationKey>(
  key: K,
  ...args: typeof translations.en[K] extends (...a: any[]) => string ? Parameters<typeof translations.en[K]> : []
): string {
  const langBundle = translations[currentLanguage];
  const stringOrFn = langBundle[key] || translations.en[key]; // Fallback to English if key missing in current lang

  if (typeof stringOrFn === 'function') {
    // @ts-ignore - TS struggles with dynamic function calls here
    return stringOrFn(...args);
  }
  return stringOrFn as string;
}

function App() {
  console.log("MyLifeProject App Loaded.");

  // --- DOM Element Selections ---
  const appElement = document.getElementById('app') as HTMLDivElement;
  const navLinks = document.querySelectorAll('.nav-item a');
  const pageSections = document.querySelectorAll('.page-section');
  const navItems = document.querySelectorAll('.nav-item');

  // Story Elements
  const addStoryPageBtn = document.getElementById('add-story-page-btn') as HTMLButtonElement | null;
  const storyPagesContainer = document.getElementById('story-pages-container') as HTMLDivElement | null;
  const addPageModal = document.getElementById('add-page-modal') as HTMLDivElement | null;
  const pageNameInput = document.getElementById('page-name-input') as HTMLInputElement | null;
  const createPageSubmitBtn = document.getElementById('create-page-submit-btn') as HTMLButtonElement | null;
  const cancelPageBtn = document.getElementById('cancel-page-btn') as HTMLButtonElement | null;
  const searchStoryInput = document.getElementById('search-story-input') as HTMLInputElement | null;
  const sortStoriesBtn = document.getElementById('sort-stories-btn') as HTMLButtonElement | null;
  const sortStoriesIcon = document.getElementById('sort-stories-icon') as HTMLElement | null;

  // Delete Confirmation Modal
  const deleteConfirmModal = document.getElementById('delete-confirm-modal') as HTMLDivElement | null;
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn') as HTMLButtonElement | null;
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn') as HTMLButtonElement | null;
  const deleteModalMessage = document.getElementById('delete-modal-message') as HTMLParagraphElement | null;

  // Destiny Section
  const destinySectionElement = document.getElementById('destiny') as HTMLElement | null;
  const destinyMainTitleElement = document.getElementById('destiny-main-title') as HTMLHeadingElement | null;
  const destinySubtitleElement = document.getElementById('destiny-subtitle-text') as HTMLParagraphElement | null;
  const editDestinyBtn = document.getElementById('edit-destiny-btn') as HTMLButtonElement | null;
  
  // Destiny Edit Modal
  const editDestinyModal = document.getElementById('edit-destiny-modal') as HTMLDivElement | null;
  const destinyTitleInput = document.getElementById('destiny-title-input') as HTMLInputElement | null;
  const destinySubtitleInput = document.getElementById('destiny-subtitle-input') as HTMLTextAreaElement | null;
  const destinyBgInput = document.getElementById('destiny-bg-input') as HTMLInputElement | null;
  const destinyBgInputTriggerBtn = document.getElementById('destiny-bg-input-trigger-btn') as HTMLButtonElement | null;
  const destinyBgPreview = document.getElementById('destiny-bg-preview') as HTMLImageElement | null;
  const saveDestinyBtn = document.getElementById('save-destiny-btn') as HTMLButtonElement | null;
  const cancelEditDestinyBtn = document.getElementById('cancel-edit-destiny-btn') as HTMLButtonElement | null;

  // Settings Modal Elements
  const settingsBtn = document.getElementById('settings-btn') as HTMLButtonElement | null;
  const settingsModal = document.getElementById('settings-modal') as HTMLDivElement | null;
  const settingsModalCloseBtn = document.getElementById('settings-modal-close-btn') as HTMLButtonElement | null;
  const langIdRadio = document.getElementById('lang-id') as HTMLInputElement | null;
  const langEnRadio = document.getElementById('lang-en') as HTMLInputElement | null;
  const themeDarkRadio = document.getElementById('theme-dark') as HTMLInputElement | null;
  const themeLightRadio = document.getElementById('theme-light') as HTMLInputElement | null;
  const resetSettingsBtn = document.getElementById('reset-settings-btn') as HTMLButtonElement | null;

  // --- Global State ---
  let storyIdToDeleteGlobally: string | null = null;
  let storyNameToDeleteGlobally: string | null = null;
  let currentSelectedDestinyBg: string | null = null;
  let currentStorySortOrder: StorySortOrder = 'newest-first';

  // --- Language and Theme Functions ---
  function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate-key') as TranslationKey;
        if (key) {
            el.textContent = getTranslatedString(key);
        }
    });

    const elementsWithPlaceholder = document.querySelectorAll('[data-translate-key-placeholder]');
    elementsWithPlaceholder.forEach(el => {
        const key = el.getAttribute('data-translate-key-placeholder') as TranslationKey;
        if (key) {
            (el as HTMLInputElement | HTMLTextAreaElement).placeholder = getTranslatedString(key);
        }
    });

    const elementsWithAria = document.querySelectorAll('[data-translate-key-aria]');
    elementsWithAria.forEach(el => {
        const key = el.getAttribute('data-translate-key-aria') as TranslationKey;
        if (key) {
            el.setAttribute('aria-label', getTranslatedString(key));
        }
    });
    
    const elementsWithTitle = document.querySelectorAll('[data-translate-key-title]');
     elementsWithTitle.forEach(el => {
        const key = el.getAttribute('data-translate-key-title') as TranslationKey;
        if (key) {
            (el as HTMLElement).title = getTranslatedString(key);
        }
    });

    // Update dynamic text not covered by data-attributes
    updateSortButtonVisuals(); // This updates its own title/aria-label
    if(settingsBtn) {
        settingsBtn.title = getTranslatedString('settingsButtonTitle');
        settingsBtn.setAttribute('aria-label', getTranslatedString('settingsButtonLabel'));
    }
    if(settingsModalCloseBtn) {
        settingsModalCloseBtn.setAttribute('aria-label', getTranslatedString('closeSettingsButtonLabel'));
    }
     // Default Destiny text (if not loaded from localStorage)
    if (destinyMainTitleElement && destinyMainTitleElement.dataset.translateKey === 'destinyDefaultTitle') {
        destinyMainTitleElement.textContent = getTranslatedString('destinyDefaultTitle');
    }
    if (destinySubtitleElement && destinySubtitleElement.dataset.translateKey === 'destinyDefaultSubtitle') {
        destinySubtitleElement.textContent = getTranslatedString('destinyDefaultSubtitle');
    }
    // Story page empty content placeholder needs to be re-evaluated when stories are rendered
    // This will be handled in createStoryPageElement
  }

  function setLanguage(lang: AppLanguage) {
    currentLanguage = lang;
    localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, lang);
    if (langIdRadio) langIdRadio.checked = lang === 'id';
    if (langEnRadio) langEnRadio.checked = lang === 'en';
    applyTranslations();
    loadStoriesFromLocalStorage(); // Reload stories to apply new language to dynamic parts
    loadDestinyContentFromLocalStorage(); // Reload destiny to apply new language to defaults
  }

  function setTheme(theme: AppTheme) {
    currentTheme = theme;
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, theme);
    if (themeDarkRadio) themeDarkRadio.checked = theme === 'dark';
    if (themeLightRadio) themeLightRadio.checked = theme === 'light';
    
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
  }

  // --- LocalStorage Functions ---
  function getStoriesFromLocalStorage(): Story[] { /* ... (no change in logic) ... */ 
    try {
      const storedStories = localStorage.getItem(LOCAL_STORAGE_KEY_STORIES);
      if (storedStories) {
        return JSON.parse(storedStories) as Story[];
      }
    } catch (error) {
      console.error("Error reading stories from localStorage:", error);
    }
    return [];
  }

  function saveStoriesToLocalStorage() { /* ... (no change in logic) ... */ 
    if (!storyPagesContainer) {
        console.warn("[SAVE STORIES] storyPagesContainer not found. Aborting save.");
        return;
    }
    const stories: Story[] = [];
    const storyPageElements = storyPagesContainer.querySelectorAll('.story-page');

    storyPageElements.forEach(pageElement => {
      const storyPageDiv = pageElement as HTMLDivElement;
      const titleElement = storyPageDiv.querySelector('.story-page-title') as HTMLElement | null;
      const contentElement = storyPageDiv.querySelector('.story-page-content') as HTMLDivElement | null;
      const headerDiv = storyPageDiv.querySelector('.story-page-header') as HTMLDivElement | null;

      if (storyPageDiv.id && titleElement && contentElement && headerDiv) {
        stories.push({
          id: storyPageDiv.id,
          name: titleElement.textContent || 'Untitled',
          content: contentElement.innerHTML,
          fontSize: window.getComputedStyle(contentElement).fontSize,
          isExpanded: headerDiv.getAttribute('aria-expanded') === 'true'
        });
      }
    });

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch (error) {
      console.error("[SAVE STORIES] Error saving stories to localStorage:", error);
    }
  }
  
  function parseTimestampFromId(id: string): number { /* ... (no change) ... */ 
    const parts = id.split('-');
    const timestampStr = parts[parts.length - 1];
    const timestamp = parseInt(timestampStr, 10);
    return isNaN(timestamp) ? 0 : timestamp;
  }

  function loadStoriesFromLocalStorage() {
    if (!storyPagesContainer) return;
    let stories = getStoriesFromLocalStorage();

    stories.sort((a, b) => {
        const timestampA = parseTimestampFromId(a.id);
        const timestampB = parseTimestampFromId(b.id);
        if (currentStorySortOrder === 'newest-first') {
            return timestampB - timestampA;
        } else {
            return timestampA - timestampB;
        }
    });
    
    storyPagesContainer.innerHTML = ''; 
    stories.forEach(storyData => {
      createStoryPageElement(storyData, storyPagesContainer);
    });
  }

  function getDestinyContentFromLocalStorage(): DestinyContent | null { /* ... (no change) ... */ 
    try {
        const storedDestiny = localStorage.getItem(LOCAL_STORAGE_KEY_DESTINY);
        if (storedDestiny) {
            return JSON.parse(storedDestiny) as DestinyContent;
        }
    } catch (error) {
        console.error("Error reading Destiny content from localStorage:", error);
    }
    return null;
  }

  function saveDestinyContentToLocalStorage(title: string, subtitle: string, backgroundImage: string | null) { /* ... (no change) ... */ 
    try {
        const destinyContent: DestinyContent = { title, subtitle, backgroundImage };
        localStorage.setItem(LOCAL_STORAGE_KEY_DESTINY, JSON.stringify(destinyContent));
    } catch (error) {
        console.error("Error saving Destiny content to localStorage:", error);
    }
  }

  function applyDestinyBackground(imageUrl: string | null | undefined) { /* ... (no change) ... */ 
    if (destinySectionElement) {
        const bgToApply = imageUrl ? `url('${imageUrl}')` : DEFAULT_DESTINY_BG;
        // The gradient should ensure text is readable. Light theme CSS might need to adjust this if images vary wildly.
        const gradient = currentTheme === 'light' ? 
            'linear-gradient(rgba(200, 200, 200, 0.6), rgba(220, 220, 220, 0.85))' : // Lighter overlay for light theme
            'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.95))'; // Dark overlay for dark theme
        destinySectionElement.style.background = `${gradient}, ${bgToApply} no-repeat center center`;
        destinySectionElement.style.backgroundSize = 'cover';
    }
  }

  function loadDestinyContentFromLocalStorage() {
    const content = getDestinyContentFromLocalStorage();
    if (destinyMainTitleElement && destinySubtitleElement) {
        if (content) {
            destinyMainTitleElement.textContent = content.title;
            destinySubtitleElement.textContent = content.subtitle;
            // Remove data-translate-key attributes if content is loaded from storage
            destinyMainTitleElement.removeAttribute('data-translate-key');
            destinySubtitleElement.removeAttribute('data-translate-key');
            applyDestinyBackground(content.backgroundImage);
        } else {
            // Apply default (translated) if nothing in local storage
            destinyMainTitleElement.textContent = getTranslatedString('destinyDefaultTitle');
            destinySubtitleElement.textContent = getTranslatedString('destinyDefaultSubtitle');
            // Ensure data-translate-key attributes are present for defaults
            destinyMainTitleElement.setAttribute('data-translate-key', 'destinyDefaultTitle');
            destinySubtitleElement.setAttribute('data-translate-key', 'destinyDefaultSubtitle');
            applyDestinyBackground(null);
        }
    }
  }

  // --- UI Update Functions ---
  function updateSortButtonVisuals() {
    if (!sortStoriesBtn || !sortStoriesIcon) return;
    if (currentStorySortOrder === 'newest-first') {
        sortStoriesIcon.innerHTML = '&#x2191;'; 
        sortStoriesBtn.title = getTranslatedString('sortStoriesNewestTitle');
        sortStoriesBtn.setAttribute('aria-label', getTranslatedString('sortStoriesNewestLabel'));
        sortStoriesBtn.classList.remove('sort-active');
        sortStoriesBtn.setAttribute('aria-pressed', 'false');
    } else { 
        sortStoriesIcon.innerHTML = '&#x2193;'; 
        sortStoriesBtn.title = getTranslatedString('sortStoriesOldestTitle');
        sortStoriesBtn.setAttribute('aria-label', getTranslatedString('sortStoriesOldestLabel'));
        sortStoriesBtn.classList.add('sort-active');
        sortStoriesBtn.setAttribute('aria-pressed', 'true');
    }
  }

  function showSection(targetId: string) { /* ... (no change in core logic) ... */ 
    pageSections.forEach(section => {
      const htmlSection = section as HTMLElement;
      if (section.id === targetId) {
        htmlSection.style.display = 'flex';
        if (targetId === 'destiny') {
            htmlSection.style.justifyContent = 'center';
        } else {
            htmlSection.style.justifyContent = 'flex-start';
        }
      } else {
        htmlSection.style.display = 'none';
      }
    });

    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${targetId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // --- Initial Setup ---
  const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) as AppLanguage | null;
  if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
    currentLanguage = savedLanguage;
  }
  if (langIdRadio) langIdRadio.checked = currentLanguage === 'id';
  if (langEnRadio) langEnRadio.checked = currentLanguage === 'en';

  const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as AppTheme | null;
  if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
    currentTheme = savedTheme;
  }
  // setTheme will check/uncheck radio and apply class
  setTheme(currentTheme); // Apply theme first, then translations

  applyTranslations(); // Apply translations after language is set

  const savedSortOrder = localStorage.getItem(LOCAL_STORAGE_KEY_STORY_SORT_ORDER) as StorySortOrder | null;
  if (savedSortOrder === 'oldest-first' || savedSortOrder === 'newest-first') {
      currentStorySortOrder = savedSortOrder;
  }
  updateSortButtonVisuals(); 

  pageSections.forEach(section => {
    if (section.id !== 'destiny') {
        (section as HTMLElement).style.display = 'none';
    } else {
        (section as HTMLElement).style.display = 'flex';
        (section as HTMLElement).style.justifyContent = 'center';
    }
  });
  document.querySelector('.nav-item a[href="#destiny"]')?.parentElement?.classList.add('active');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const targetId = (link as HTMLAnchorElement).getAttribute('href')?.substring(1);
      if (targetId) {
        showSection(targetId);
      }
    });
  });

  // --- "My Story" Functionality ---
  if (addStoryPageBtn && addPageModal && pageNameInput && createPageSubmitBtn && cancelPageBtn && storyPagesContainer && searchStoryInput && sortStoriesBtn) {
    addStoryPageBtn.addEventListener('click', () => {
      addPageModal.style.display = 'flex';
      pageNameInput.value = ''; 
      pageNameInput.focus();
    });

    cancelPageBtn.addEventListener('click', () => {
      addPageModal.style.display = 'none';
    });

    createPageSubmitBtn.addEventListener('click', () => {
      const pageName = pageNameInput.value.trim();
      if (pageName) {
        const defaultFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('--default-story-content-font-size').trim() || '15px';
        const newStoryData: Story = {
          id: `story-${pageName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
          name: pageName,
          content: '', 
          fontSize: defaultFontSize,
          isExpanded: false
        };
        
        let currentStories = getStoriesFromLocalStorage();
        currentStories.push(newStoryData);
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(currentStories));
        } catch (error) {
            console.error("[CREATE STORY] Error saving new story to localStorage:", error);
        }
        
        loadStoriesFromLocalStorage(); 
        filterStoryPages(); 

        pageNameInput.value = '';
        addPageModal.style.display = 'none';
      } else {
        alert(getTranslatedString('pageNameEmptyAlert'));
        pageNameInput.focus();
      }
    });

    searchStoryInput.addEventListener('input', filterStoryPages);

    sortStoriesBtn.addEventListener('click', () => {
        currentStorySortOrder = currentStorySortOrder === 'newest-first' ? 'oldest-first' : 'newest-first';
        localStorage.setItem(LOCAL_STORAGE_KEY_STORY_SORT_ORDER, currentStorySortOrder);
        updateSortButtonVisuals();
        loadStoriesFromLocalStorage();
        filterStoryPages(); 
    });

  } else {
    console.error("One or more elements for 'My Story' functionality are missing.");
  }

  // --- Delete Confirmation Modal Logic ---
  if (deleteConfirmModal && confirmDeleteBtn && cancelDeleteBtn && deleteModalMessage) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (storyIdToDeleteGlobally) {
        let stories = getStoriesFromLocalStorage();
        stories = stories.filter(story => story.id !== storyIdToDeleteGlobally);
        localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(stories));
        loadStoriesFromLocalStorage(); 
        filterStoryPages();
      }
      deleteConfirmModal.style.display = 'none';
      storyIdToDeleteGlobally = null;
      storyNameToDeleteGlobally = null;
    });

    cancelDeleteBtn.addEventListener('click', () => {
      deleteConfirmModal.style.display = 'none';
      storyIdToDeleteGlobally = null;
      storyNameToDeleteGlobally = null;
    });
  } else {
    console.error("One or more elements for delete confirmation modal are missing.");
  }

  // --- "Destiny" Section Edit Functionality ---
  if (editDestinyBtn && editDestinyModal && destinyTitleInput && destinySubtitleInput && saveDestinyBtn && cancelEditDestinyBtn && destinyMainTitleElement && destinySubtitleElement && destinyBgInput && destinyBgInputTriggerBtn && destinyBgPreview && destinySectionElement) {
    editDestinyBtn.addEventListener('click', () => {
        const currentContent = getDestinyContentFromLocalStorage();
        destinyTitleInput.value = currentContent?.title || destinyMainTitleElement.textContent || '';
        destinySubtitleInput.value = currentContent?.subtitle || destinySubtitleElement.textContent || '';
        
        currentSelectedDestinyBg = currentContent?.backgroundImage || null; 
        if (currentSelectedDestinyBg) {
            destinyBgPreview.src = currentSelectedDestinyBg;
            destinyBgPreview.style.display = 'block';
        } else {
            destinyBgPreview.style.display = 'none';
            destinyBgPreview.src = '#'; 
        }

        editDestinyModal.style.display = 'flex';
        destinyTitleInput.focus();
    });

    destinyBgInputTriggerBtn.addEventListener('click', () => {
        destinyBgInput.click(); 
    });

    destinyBgInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentSelectedDestinyBg = e.target?.result as string;
                if (currentSelectedDestinyBg) {
                    destinyBgPreview.src = currentSelectedDestinyBg;
                    destinyBgPreview.style.display = 'block';
                    applyDestinyBackground(currentSelectedDestinyBg); 
                }
            };
            reader.onerror = () => {
                console.error("Error reading file for Destiny background.");
                alert(getTranslatedString('imageLoadErrorAlert'));
                currentSelectedDestinyBg = getDestinyContentFromLocalStorage()?.backgroundImage || null; 
                if (currentSelectedDestinyBg) {
                    destinyBgPreview.src = currentSelectedDestinyBg;
                    destinyBgPreview.style.display = 'block';
                } else {
                    destinyBgPreview.style.display = 'none';
                    destinyBgPreview.src = '#';
                }
                applyDestinyBackground(currentSelectedDestinyBg); 
            };
            reader.readAsDataURL(file);
        }
    });

    cancelEditDestinyBtn.addEventListener('click', () => {
        editDestinyModal.style.display = 'none';
        currentSelectedDestinyBg = null; 
        loadDestinyContentFromLocalStorage(); 
    });

    saveDestinyBtn.addEventListener('click', () => {
        const newTitle = destinyTitleInput.value.trim();
        const newSubtitle = destinySubtitleInput.value.trim();

        if (newTitle) { 
            destinyMainTitleElement.textContent = newTitle;
            destinySubtitleElement.textContent = newSubtitle;
            destinyMainTitleElement.removeAttribute('data-translate-key'); // User content, not default
            destinySubtitleElement.removeAttribute('data-translate-key');
            saveDestinyContentToLocalStorage(newTitle, newSubtitle, currentSelectedDestinyBg);
            applyDestinyBackground(currentSelectedDestinyBg); 
            editDestinyModal.style.display = 'none';
        } else {
            alert(getTranslatedString('destinyTitleEmptyAlert'));
            destinyTitleInput.focus();
        }
    });
  } else {
    console.error("One or more elements for 'Destiny' edit functionality are missing.");
  }

  // --- Settings Modal Functionality ---
  if (settingsBtn && settingsModal && settingsModalCloseBtn && langIdRadio && langEnRadio && themeDarkRadio && themeLightRadio && resetSettingsBtn) {
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });
    settingsModalCloseBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    // Close on clicking outside modal content
    settingsModal.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });


    langIdRadio.addEventListener('change', () => setLanguage('id'));
    langEnRadio.addEventListener('change', () => setLanguage('en'));
    themeDarkRadio.addEventListener('change', () => setTheme('dark'));
    themeLightRadio.addEventListener('change', () => setTheme('light'));

    resetSettingsBtn.addEventListener('click', () => {
        if (confirm(getTranslatedString('resetConfirmMessage'))) {
            localStorage.removeItem(LOCAL_STORAGE_KEY_STORIES);
            localStorage.removeItem(LOCAL_STORAGE_KEY_DESTINY);
            localStorage.removeItem(LOCAL_STORAGE_KEY_STORY_SORT_ORDER);
            localStorage.removeItem(LOCAL_STORAGE_KEY_THEME);
            localStorage.removeItem(LOCAL_STORAGE_KEY_LANGUAGE);
            location.reload();
        }
    });
  } else {
    console.error("One or more elements for Settings Modal functionality are missing.");
  }


  function filterStoryPages() { /* ... (no change in logic) ... */ 
    if (!searchStoryInput || !storyPagesContainer) return;
    const searchTerm = searchStoryInput.value.toLowerCase();
    const storyPages = storyPagesContainer.querySelectorAll('.story-page');
    
    storyPages.forEach(page => {
        const titleElement = page.querySelector('.story-page-title') as HTMLElement | null;
        const pageDiv = page as HTMLDivElement;
        if (titleElement) {
            const title = titleElement.textContent?.toLowerCase() || '';
            if (title.includes(searchTerm)) {
                pageDiv.style.display = '';
            } else {
                pageDiv.style.display = 'none';
            }
        }
    });
  }

  function createStoryPageElement(storyData: Story, container: HTMLElement) {
    const { id: storyPageId, name: initialPageName, content: initialContent, fontSize: initialFontSize, isExpanded: initialIsExpanded } = storyData;
    const contentId = `${storyPageId}-content`;
    let originalContent = ""; 
    let isKebabMenuOpen = false;

    const storyPageDiv = document.createElement('div');
    storyPageDiv.id = storyPageId; 
    storyPageDiv.className = 'story-page';
    storyPageDiv.setAttribute('role', 'region');
    storyPageDiv.setAttribute('aria-labelledby', `${storyPageId}-title`);

    const headerDiv = document.createElement('div');
    headerDiv.className = 'story-page-header';
    headerDiv.setAttribute('tabindex', '0'); 

    const titleH3 = document.createElement('h3');
    titleH3.id = `${storyPageId}-title`;
    titleH3.className = 'story-page-title';
    titleH3.textContent = initialPageName;

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'story-page-controls';

    const editBtn = document.createElement('button');
    editBtn.className = 'story-control-btn edit-btn';
    editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="display: block; margin: auto;"><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path></svg>`;
    editBtn.setAttribute('aria-label', getTranslatedString('editStoryButtonLabel', initialPageName));
    editBtn.title = getTranslatedString('editStoryButtonTitle');

    const kebabMenuBtn = document.createElement('button');
    kebabMenuBtn.className = 'story-control-btn kebab-menu-btn';
    kebabMenuBtn.innerHTML = ICON_KEBAB_MENU;
    kebabMenuBtn.setAttribute('aria-label', getTranslatedString('kebabMenuLabel'));
    kebabMenuBtn.setAttribute('aria-haspopup', 'true');
    kebabMenuBtn.setAttribute('aria-expanded', 'false');
    kebabMenuBtn.title = getTranslatedString('kebabMenuLabel');

    const saveBtn = document.createElement('button');
    saveBtn.className = 'story-control-btn save-btn hidden';
    saveBtn.innerHTML = '✔️';
    saveBtn.setAttribute('aria-label', getTranslatedString('saveStoryButtonLabel', initialPageName));
    saveBtn.title = getTranslatedString('saveStoryButtonTitle');

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'story-control-btn cancel-btn hidden';
    cancelBtn.innerHTML = '❌';
    cancelBtn.setAttribute('aria-label', getTranslatedString('cancelEditButtonLabel', initialPageName));
    cancelBtn.title = getTranslatedString('cancelEditButtonTitle');

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'story-control-btn delete-btn hidden'; 
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.setAttribute('aria-label', getTranslatedString('deletePageButtonLabel', initialPageName));
    deleteBtn.title = getTranslatedString('deletePageButtonTitle');

    const fontDecreaseBtn = document.createElement('button');
    fontDecreaseBtn.className = 'story-control-btn font-decrease-btn hidden';
    fontDecreaseBtn.innerHTML = 'A-';
    fontDecreaseBtn.setAttribute('aria-label', getTranslatedString('fontDecreaseButtonLabel', initialPageName));
    fontDecreaseBtn.title = getTranslatedString('fontDecreaseButtonTitle');

    const fontIncreaseBtn = document.createElement('button');
    fontIncreaseBtn.className = 'story-control-btn font-increase-btn hidden';
    fontIncreaseBtn.innerHTML = 'A+';
    fontIncreaseBtn.setAttribute('aria-label', getTranslatedString('fontIncreaseButtonLabel', initialPageName));
    fontIncreaseBtn.title = getTranslatedString('fontIncreaseButtonTitle');
    
    const toggleIconSpan = document.createElement('span');
    toggleIconSpan.className = 'story-page-toggle-icon';
    toggleIconSpan.innerHTML = initialIsExpanded ? '&#9650;' : '&#9660;'; 
    toggleIconSpan.setAttribute('aria-hidden', 'true');

    controlsDiv.appendChild(editBtn);
    controlsDiv.appendChild(kebabMenuBtn);
    controlsDiv.appendChild(fontDecreaseBtn); 
    controlsDiv.appendChild(fontIncreaseBtn); 
    controlsDiv.appendChild(deleteBtn);       
    controlsDiv.appendChild(saveBtn);         
    controlsDiv.appendChild(cancelBtn);       
    controlsDiv.appendChild(toggleIconSpan); 

    headerDiv.appendChild(titleH3);
    headerDiv.appendChild(controlsDiv);
    headerDiv.setAttribute('aria-expanded', String(initialIsExpanded || false));
    
    const contentDiv = document.createElement('div');
    contentDiv.id = contentId;
    contentDiv.className = 'story-page-content';
    contentDiv.setAttribute('contenteditable', 'false'); 
    contentDiv.setAttribute('role', 'textbox');
    contentDiv.setAttribute('aria-multiline', 'true');
    contentDiv.innerHTML = initialContent || ''; 
    contentDiv.style.fontSize = initialFontSize || '15px'; 
    contentDiv.style.display = initialIsExpanded ? 'block' : 'none'; 

    // Set placeholder via ::before pseudo-element, but update it if necessary based on language
    if (!initialContent) {
        // The actual text is in CSS ::before, but we can force a re-evaluation if needed
        // Or, if managing placeholder directly with JS:
        // contentDiv.setAttribute('data-placeholder', getTranslatedString('storyPageDefaultContent'));
    }


    storyPageDiv.appendChild(headerDiv);
    storyPageDiv.appendChild(contentDiv);
    container.appendChild(storyPageDiv);

    titleH3.addEventListener('dblclick', () => {
        if (contentDiv.getAttribute('contenteditable') === 'true') return; 

        const currentTitleText = titleH3.textContent || '';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'story-page-title-input'; 
        titleInput.value = currentTitleText;
        titleInput.setAttribute('aria-label', getTranslatedString('editPageTitleLabel'));

        titleH3.replaceWith(titleInput);
        titleInput.focus();
        titleInput.select();

        const saveTitle = () => {
            const newTitle = titleInput.value.trim();
            if (newTitle && newTitle !== currentTitleText) {
                titleH3.textContent = newTitle;
                editBtn.setAttribute('aria-label', getTranslatedString('editStoryButtonLabel', newTitle));
                saveBtn.setAttribute('aria-label', getTranslatedString('saveStoryButtonLabel', newTitle));
                cancelBtn.setAttribute('aria-label', getTranslatedString('cancelEditButtonLabel', newTitle));
                deleteBtn.setAttribute('aria-label', getTranslatedString('deletePageButtonLabel', newTitle));
                fontDecreaseBtn.setAttribute('aria-label', getTranslatedString('fontDecreaseButtonLabel', newTitle));
                fontIncreaseBtn.setAttribute('aria-label', getTranslatedString('fontIncreaseButtonLabel', newTitle));
                saveStoriesToLocalStorage(); 
            } else {
                titleH3.textContent = currentTitleText; 
            }
            titleInput.replaceWith(titleH3);
        };

        titleInput.addEventListener('blur', saveTitle);
        titleInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveTitle();
            } else if (event.key === 'Escape') {
                titleInput.value = currentTitleText; 
                saveTitle(); 
            }
        });
    });

    const toggleKebabMenu = (forceClose = false) => {
        if (forceClose) {
            isKebabMenuOpen = false;
        } else {
            isKebabMenuOpen = !isKebabMenuOpen;
        }

        if (isKebabMenuOpen) {
            kebabMenuBtn.innerHTML = ICON_CLOSE_X;
            kebabMenuBtn.setAttribute('aria-label', getTranslatedString('kebabMenuCloseLabel'));
            kebabMenuBtn.setAttribute('aria-expanded', 'true');
            fontDecreaseBtn.classList.remove('hidden');
            fontIncreaseBtn.classList.remove('hidden');
            deleteBtn.classList.remove('hidden');
        } else {
            kebabMenuBtn.innerHTML = ICON_KEBAB_MENU;
            kebabMenuBtn.setAttribute('aria-label', getTranslatedString('kebabMenuLabel'));
            kebabMenuBtn.setAttribute('aria-expanded', 'false');
            fontDecreaseBtn.classList.add('hidden');
            fontIncreaseBtn.classList.add('hidden');
            deleteBtn.classList.add('hidden');
        }
    };

    kebabMenuBtn.addEventListener('click', () => toggleKebabMenu());

    headerDiv.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.story-control-btn') || 
          (e.target as HTMLElement).classList.contains('story-page-title-input')) {
        return; 
      }
      const isExpanded = headerDiv.getAttribute('aria-expanded') === 'true';
      headerDiv.setAttribute('aria-expanded', String(!isExpanded));
      contentDiv.style.display = isExpanded ? 'none' : 'block';
      toggleIconSpan.innerHTML = isExpanded ? '&#9660;' : '&#9650;';
      // Add appropriate aria-label for expand/collapse state to headerDiv
      headerDiv.setAttribute('aria-label', isExpanded ? getTranslatedString('toggleIconCollapsed') : getTranslatedString('toggleIconExpanded'));
      saveStoriesToLocalStorage(); 
    });
     headerDiv.addEventListener('keydown', (event) => {
        if ((event.target as HTMLElement).closest('.story-control-btn') ||
            (event.target as HTMLElement).classList.contains('story-page-title-input')) {
            return; 
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
            headerDiv.dispatchEvent(clickEvent);
        }
    });
    // Set initial ARIA label for expand/collapse state
    headerDiv.setAttribute('aria-label', (initialIsExpanded ? getTranslatedString('toggleIconExpanded') : getTranslatedString('toggleIconCollapsed')));


    editBtn.addEventListener('click', () => {
        originalContent = contentDiv.innerHTML;
        contentDiv.setAttribute('contenteditable', 'true');
        contentDiv.focus();
        
        editBtn.classList.add('hidden');
        kebabMenuBtn.classList.add('hidden'); 
        if(isKebabMenuOpen) toggleKebabMenu(true); 

        fontDecreaseBtn.classList.add('hidden'); 
        fontIncreaseBtn.classList.add('hidden');
        deleteBtn.classList.add('hidden'); 
        
        toggleIconSpan.classList.add('hidden'); 
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
    });

    const exitContentEditMode = () => {
        contentDiv.setAttribute('contenteditable', 'false');
        originalContent = ""; 
        editBtn.classList.remove('hidden');
        kebabMenuBtn.classList.remove('hidden'); 
        toggleKebabMenu(true); 

        fontDecreaseBtn.classList.add('hidden'); 
        fontIncreaseBtn.classList.add('hidden');
        deleteBtn.classList.add('hidden');

        toggleIconSpan.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
    };

    saveBtn.addEventListener('click', () => {
        exitContentEditMode();
        saveStoriesToLocalStorage();
    });

    cancelBtn.addEventListener('click', () => {
        contentDiv.innerHTML = originalContent;
        exitContentEditMode();
    });

    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        storyIdToDeleteGlobally = storyPageDiv.id;
        storyNameToDeleteGlobally = titleH3.textContent || 'this page'; 
        
        if (deleteConfirmModal && deleteModalMessage) {
            deleteModalMessage.textContent = getTranslatedString('deleteConfirmMessage', storyNameToDeleteGlobally);
            deleteConfirmModal.style.display = 'flex';
        } else {
            console.error("Delete confirmation modal elements not found.");
            // Fallback to direct delete if modal is broken, though not ideal UX
            let stories = getStoriesFromLocalStorage();
            stories = stories.filter(story => story.id !== storyIdToDeleteGlobally);
            localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(stories));
            loadStoriesFromLocalStorage();
            filterStoryPages();
        }
    });

    fontDecreaseBtn.addEventListener('click', () => {
        let currentSize = parseInt(window.getComputedStyle(contentDiv).fontSize);
        currentSize = Math.max(MIN_FONT_SIZE, currentSize - FONT_SIZE_STEP);
        contentDiv.style.fontSize = `${currentSize}px`;
        saveStoriesToLocalStorage();
    });

    fontIncreaseBtn.addEventListener('click', () => {
        let currentSize = parseInt(window.getComputedStyle(contentDiv).fontSize);
        currentSize = Math.min(MAX_FONT_SIZE, currentSize + FONT_SIZE_STEP);
        contentDiv.style.fontSize = `${currentSize}px`;
        saveStoriesToLocalStorage();
    });
  }

  // Load initial content
  loadDestinyContentFromLocalStorage(); 
  loadStoriesFromLocalStorage();
  filterStoryPages(); 
}

App();
