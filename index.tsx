/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Interface for Story data
interface Story {
  id: string;
  name: string;
  content: string;
  fontSize: string; // e.g., "16px"
  isExpanded?: boolean; // Optional: to store expansion state
}

// Interface for Destiny content
interface DestinyContent {
  title: string;
  subtitle: string;
  backgroundImage?: string | null; // base64 data URL or null
}

const LOCAL_STORAGE_KEY_STORIES = 'myLifeProjectStories';
const LOCAL_STORAGE_KEY_DESTINY = 'myLifeProjectDestinyContent';
const LOCAL_STORAGE_KEY_STORY_SORT_ORDER = 'myLifeProjectStorySortOrder';
const DEFAULT_DESTINY_BG = "url('https://i.pinimg.com/736x/7e/87/d5/7e87d51d71af0cb7e863b9051114049a.jpg')";

type StorySortOrder = 'newest-first' | 'oldest-first';

// SVG Icons
const ICON_KEBAB_MENU = `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="display: block; margin: auto;"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>`;
const ICON_CLOSE_X = `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style="display: block; margin: auto;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`;


function App() {
  console.log("MyLifeProject App Loaded.");

  const navLinks = document.querySelectorAll('.nav-item a');
  const pageSections = document.querySelectorAll('.page-section');
  const navItems = document.querySelectorAll('.nav-item');

  // Elements for "My Story" functionality
  const addStoryPageBtn = document.getElementById('add-story-page-btn') as HTMLButtonElement | null;
  const storyPagesContainer = document.getElementById('story-pages-container') as HTMLDivElement | null;
  const addPageModal = document.getElementById('add-page-modal') as HTMLDivElement | null;
  const pageNameInput = document.getElementById('page-name-input') as HTMLInputElement | null;
  const createPageSubmitBtn = document.getElementById('create-page-submit-btn') as HTMLButtonElement | null;
  const cancelPageBtn = document.getElementById('cancel-page-btn') as HTMLButtonElement | null;
  const searchStoryInput = document.getElementById('search-story-input') as HTMLInputElement | null;
  const sortStoriesBtn = document.getElementById('sort-stories-btn') as HTMLButtonElement | null;
  const sortStoriesIcon = document.getElementById('sort-stories-icon') as HTMLElement | null;


  // Elements for Delete Confirmation Modal
  const deleteConfirmModal = document.getElementById('delete-confirm-modal') as HTMLDivElement | null;
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn') as HTMLButtonElement | null;
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn') as HTMLButtonElement | null;
  const deleteModalMessage = document.getElementById('delete-modal-message') as HTMLParagraphElement | null;

  // Elements for "Destiny" section
  const destinySectionElement = document.getElementById('destiny') as HTMLElement | null;
  const destinyMainTitleElement = document.getElementById('destiny-main-title') as HTMLHeadingElement | null;
  const destinySubtitleElement = document.getElementById('destiny-subtitle-text') as HTMLParagraphElement | null;
  const editDestinyBtn = document.getElementById('edit-destiny-btn') as HTMLButtonElement | null;
  
  // Elements for "Destiny" edit modal
  const editDestinyModal = document.getElementById('edit-destiny-modal') as HTMLDivElement | null;
  const destinyTitleInput = document.getElementById('destiny-title-input') as HTMLInputElement | null;
  const destinySubtitleInput = document.getElementById('destiny-subtitle-input') as HTMLTextAreaElement | null;
  const destinyBgInput = document.getElementById('destiny-bg-input') as HTMLInputElement | null;
  const destinyBgInputTriggerBtn = document.getElementById('destiny-bg-input-trigger-btn') as HTMLButtonElement | null;
  const destinyBgPreview = document.getElementById('destiny-bg-preview') as HTMLImageElement | null;
  const saveDestinyBtn = document.getElementById('save-destiny-btn') as HTMLButtonElement | null;
  const cancelEditDestinyBtn = document.getElementById('cancel-edit-destiny-btn') as HTMLButtonElement | null;

  let storyIdToDeleteGlobally: string | null = null;
  let storyNameToDeleteGlobally: string | null = null;
  let currentSelectedDestinyBg: string | null = null; // To hold base64 of newly selected bg in modal
  let currentStorySortOrder: StorySortOrder = 'newest-first';


  const MIN_FONT_SIZE = 10;
  const MAX_FONT_SIZE = 30;
  const FONT_SIZE_STEP = 2;

  // --- LocalStorage Functions for Stories ---
  function getStoriesFromLocalStorage(): Story[] {
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

  function saveStoriesToLocalStorage() {
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
      // When saving from DOM, respect the current order which should be the sorted order
      localStorage.setItem(LOCAL_STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch (error) {
      console.error("[SAVE STORIES] Error saving stories to localStorage:", error);
    }
  }
  
  function parseTimestampFromId(id: string): number {
    const parts = id.split('-');
    const timestampStr = parts[parts.length - 1];
    const timestamp = parseInt(timestampStr, 10);
    return isNaN(timestamp) ? 0 : timestamp; // Fallback for IDs without a valid timestamp
  }

  function loadStoriesFromLocalStorage() {
    if (!storyPagesContainer) return;
    let stories = getStoriesFromLocalStorage();

    stories.sort((a, b) => {
        const timestampA = parseTimestampFromId(a.id);
        const timestampB = parseTimestampFromId(b.id);
        if (currentStorySortOrder === 'newest-first') {
            return timestampB - timestampA; // Newest (larger timestamp) first
        } else {
            return timestampA - timestampB; // Oldest (smaller timestamp) first
        }
    });
    
    storyPagesContainer.innerHTML = ''; 
    stories.forEach(storyData => {
      createStoryPageElement(storyData, storyPagesContainer);
    });
  }
  // --- End LocalStorage Functions for Stories ---

  // --- LocalStorage Functions for Destiny Content ---
  function getDestinyContentFromLocalStorage(): DestinyContent | null {
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

  function saveDestinyContentToLocalStorage(title: string, subtitle: string, backgroundImage: string | null) {
    try {
        const destinyContent: DestinyContent = { title, subtitle, backgroundImage };
        localStorage.setItem(LOCAL_STORAGE_KEY_DESTINY, JSON.stringify(destinyContent));
    } catch (error) {
        console.error("Error saving Destiny content to localStorage:", error);
    }
  }

  function applyDestinyBackground(imageUrl: string | null | undefined) {
    if (destinySectionElement) {
        const bgToApply = imageUrl ? `url('${imageUrl}')` : DEFAULT_DESTINY_BG;
        destinySectionElement.style.background = `linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.95)), ${bgToApply} no-repeat center center`;
        destinySectionElement.style.backgroundSize = 'cover';
    }
  }

  function loadDestinyContentFromLocalStorage() {
    const content = getDestinyContentFromLocalStorage();
    if (destinyMainTitleElement && destinySubtitleElement) {
        if (content) {
            destinyMainTitleElement.textContent = content.title;
            destinySubtitleElement.textContent = content.subtitle;
            applyDestinyBackground(content.backgroundImage);
        } else {
            // Apply default if nothing in local storage (e.g. first load)
            destinyMainTitleElement.textContent = "What is meaning of life?";
            destinySubtitleElement.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
            applyDestinyBackground(null); // Applies default
        }
    }
  }
  // --- End LocalStorage Functions for Destiny Content ---

  function updateSortButtonVisuals() {
    if (!sortStoriesBtn || !sortStoriesIcon) return;
    if (currentStorySortOrder === 'newest-first') {
        sortStoriesIcon.innerHTML = '&#x2191;'; // Up Arrow (Sort Oldest First on click)
        sortStoriesBtn.title = 'Urutkan dari Terlama';
        sortStoriesBtn.setAttribute('aria-label', 'Urutkan cerita dari yang terlama');
        sortStoriesBtn.classList.remove('sort-active');
        sortStoriesBtn.setAttribute('aria-pressed', 'false');
    } else { // oldest-first
        sortStoriesIcon.innerHTML = '&#x2193;'; // Down Arrow (Sort Newest First on click)
        sortStoriesBtn.title = 'Urutkan dari Terbaru';
        sortStoriesBtn.setAttribute('aria-label', 'Urutkan cerita dari yang terbaru');
        sortStoriesBtn.classList.add('sort-active');
        sortStoriesBtn.setAttribute('aria-pressed', 'true');
    }
  }


  function showSection(targetId: string) {
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

  // Initial setup for sort order
  const savedSortOrder = localStorage.getItem(LOCAL_STORAGE_KEY_STORY_SORT_ORDER) as StorySortOrder | null;
  if (savedSortOrder === 'oldest-first' || savedSortOrder === 'newest-first') {
      currentStorySortOrder = savedSortOrder;
  }
  updateSortButtonVisuals(); // Set initial button state

  // Initial setup for page sections
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

  // "My Story" Functionality
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
        
        loadStoriesFromLocalStorage(); // Reloads and renders all stories, sorted
        filterStoryPages(); // Apply search filter to the new list

        pageNameInput.value = '';
        addPageModal.style.display = 'none';
      } else {
        alert("Nama halaman tidak boleh kosong.");
        pageNameInput.focus();
      }
    });

    searchStoryInput.addEventListener('input', filterStoryPages);

    sortStoriesBtn.addEventListener('click', () => {
        currentStorySortOrder = currentStorySortOrder === 'newest-first' ? 'oldest-first' : 'newest-first';
        localStorage.setItem(LOCAL_STORAGE_KEY_STORY_SORT_ORDER, currentStorySortOrder);
        updateSortButtonVisuals();
        loadStoriesFromLocalStorage();
        filterStoryPages(); // Re-apply filter on sorted list
    });

  } else {
    console.error("One or more elements for 'My Story' functionality are missing.");
  }

  // Delete Confirmation Modal Logic
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

  // "Destiny" Section Edit Functionality
  if (editDestinyBtn && editDestinyModal && destinyTitleInput && destinySubtitleInput && saveDestinyBtn && cancelEditDestinyBtn && destinyMainTitleElement && destinySubtitleElement && destinyBgInput && destinyBgInputTriggerBtn && destinyBgPreview && destinySectionElement) {
    editDestinyBtn.addEventListener('click', () => {
        const currentContent = getDestinyContentFromLocalStorage();
        destinyTitleInput.value = currentContent?.title || destinyMainTitleElement.textContent || '';
        destinySubtitleInput.value = currentContent?.subtitle || destinySubtitleElement.textContent || '';
        
        currentSelectedDestinyBg = currentContent?.backgroundImage || null; // Initialize with saved or null
        if (currentSelectedDestinyBg) {
            destinyBgPreview.src = currentSelectedDestinyBg;
            destinyBgPreview.style.display = 'block';
        } else {
            destinyBgPreview.style.display = 'none';
            destinyBgPreview.src = '#'; // Clear src
        }

        editDestinyModal.style.display = 'flex';
        destinyTitleInput.focus();
    });

    destinyBgInputTriggerBtn.addEventListener('click', () => {
        destinyBgInput.click(); // Trigger the hidden file input
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
                    applyDestinyBackground(currentSelectedDestinyBg); // Live preview on main section
                }
            };
            reader.onerror = () => {
                console.error("Error reading file for Destiny background.");
                alert("Gagal memuat gambar. Silakan coba lagi.");
                currentSelectedDestinyBg = getDestinyContentFromLocalStorage()?.backgroundImage || null; // Revert to saved or null
                if (currentSelectedDestinyBg) {
                    destinyBgPreview.src = currentSelectedDestinyBg;
                    destinyBgPreview.style.display = 'block';
                } else {
                    destinyBgPreview.style.display = 'none';
                    destinyBgPreview.src = '#';
                }
                applyDestinyBackground(currentSelectedDestinyBg); // Revert live preview
            };
            reader.readAsDataURL(file);
        }
    });

    cancelEditDestinyBtn.addEventListener('click', () => {
        editDestinyModal.style.display = 'none';
        currentSelectedDestinyBg = null; // Reset temp variable
        loadDestinyContentFromLocalStorage(); // Re-apply original/saved background if user cancels
    });

    saveDestinyBtn.addEventListener('click', () => {
        const newTitle = destinyTitleInput.value.trim();
        const newSubtitle = destinySubtitleInput.value.trim();

        if (newTitle) { // Basic validation: title should not be empty
            destinyMainTitleElement.textContent = newTitle;
            destinySubtitleElement.textContent = newSubtitle;
            saveDestinyContentToLocalStorage(newTitle, newSubtitle, currentSelectedDestinyBg);
            applyDestinyBackground(currentSelectedDestinyBg); // Ensure final background is applied
            editDestinyModal.style.display = 'none';
        } else {
            alert("Judul tidak boleh kosong.");
            destinyTitleInput.focus();
        }
    });
  } else {
    console.error("One or more elements for 'Destiny' edit functionality are missing. Check IDs: destinyBgInput, destinyBgInputTriggerBtn, destinyBgPreview, destinySectionElement.");
  }


  function filterStoryPages() {
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
    editBtn.setAttribute('aria-label', `Edit konten ${initialPageName}`);
    editBtn.title = "Edit cerita";

    const kebabMenuBtn = document.createElement('button');
    kebabMenuBtn.className = 'story-control-btn kebab-menu-btn';
    kebabMenuBtn.innerHTML = ICON_KEBAB_MENU;
    kebabMenuBtn.setAttribute('aria-label', 'Opsi lainnya');
    kebabMenuBtn.setAttribute('aria-haspopup', 'true');
    kebabMenuBtn.setAttribute('aria-expanded', 'false');
    kebabMenuBtn.title = "Opsi lainnya";

    const saveBtn = document.createElement('button');
    saveBtn.className = 'story-control-btn save-btn hidden';
    saveBtn.innerHTML = '✔️';
    saveBtn.setAttribute('aria-label', `Simpan ${initialPageName}`);
    saveBtn.title = "Simpan cerita";

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'story-control-btn cancel-btn hidden';
    cancelBtn.innerHTML = '❌';
    cancelBtn.setAttribute('aria-label', `Batal edit ${initialPageName}`);
    cancelBtn.title = "Batal edit";

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'story-control-btn delete-btn hidden'; // Initially hidden
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.setAttribute('aria-label', `Hapus ${initialPageName}`);
    deleteBtn.title = "Hapus halaman";

    const fontDecreaseBtn = document.createElement('button');
    fontDecreaseBtn.className = 'story-control-btn font-decrease-btn hidden'; // Initially hidden
    fontDecreaseBtn.innerHTML = 'A-';
    fontDecreaseBtn.setAttribute('aria-label', `Perkecil font ${initialPageName}`);
    fontDecreaseBtn.title = "Perkecil font";

    const fontIncreaseBtn = document.createElement('button');
    fontIncreaseBtn.className = 'story-control-btn font-increase-btn hidden'; // Initially hidden
    fontIncreaseBtn.innerHTML = 'A+';
    fontIncreaseBtn.setAttribute('aria-label', `Perbesar font ${initialPageName}`);
    fontIncreaseBtn.title = "Perbesar font";
    
    const toggleIconSpan = document.createElement('span');
    toggleIconSpan.className = 'story-page-toggle-icon';
    toggleIconSpan.innerHTML = initialIsExpanded ? '&#9650;' : '&#9660;'; 
    toggleIconSpan.setAttribute('aria-hidden', 'true');

    // Order of controls
    controlsDiv.appendChild(editBtn);
    controlsDiv.appendChild(kebabMenuBtn);
    controlsDiv.appendChild(fontDecreaseBtn); // Hidden by default
    controlsDiv.appendChild(fontIncreaseBtn); // Hidden by default
    controlsDiv.appendChild(deleteBtn);       // Hidden by default
    controlsDiv.appendChild(saveBtn);         // Hidden for content edit
    controlsDiv.appendChild(cancelBtn);       // Hidden for content edit
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

    storyPageDiv.appendChild(headerDiv);
    storyPageDiv.appendChild(contentDiv);
    container.appendChild(storyPageDiv);

    // --- Title Edit Functionality ---
    titleH3.addEventListener('dblclick', () => {
        if (contentDiv.getAttribute('contenteditable') === 'true') return; // Don't allow title edit during content edit

        const currentTitleText = titleH3.textContent || '';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'story-page-title-input'; // CSS needed for this class
        titleInput.value = currentTitleText;
        titleInput.setAttribute('aria-label', 'Edit nama halaman');

        titleH3.replaceWith(titleInput);
        titleInput.focus();
        titleInput.select();

        const saveTitle = () => {
            const newTitle = titleInput.value.trim();
            if (newTitle && newTitle !== currentTitleText) {
                titleH3.textContent = newTitle;
                // Update aria-labels for buttons
                editBtn.setAttribute('aria-label', `Edit konten ${newTitle}`);
                saveBtn.setAttribute('aria-label', `Simpan ${newTitle}`);
                cancelBtn.setAttribute('aria-label', `Batal edit ${newTitle}`);
                deleteBtn.setAttribute('aria-label', `Hapus ${newTitle}`);
                fontDecreaseBtn.setAttribute('aria-label', `Perkecil font ${newTitle}`);
                fontIncreaseBtn.setAttribute('aria-label', `Perbesar font ${newTitle}`);
                saveStoriesToLocalStorage(); // Save all stories as name has changed in DOM
            } else {
                titleH3.textContent = currentTitleText; // Revert if empty or unchanged
            }
            titleInput.replaceWith(titleH3);
        };

        titleInput.addEventListener('blur', saveTitle);
        titleInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveTitle();
            } else if (event.key === 'Escape') {
                titleInput.value = currentTitleText; // Revert input value
                saveTitle(); // This will effectively replace input with h3
            }
        });
    });

    // --- Kebab Menu Functionality ---
    const toggleKebabMenu = (forceClose = false) => {
        if (forceClose) {
            isKebabMenuOpen = false;
        } else {
            isKebabMenuOpen = !isKebabMenuOpen;
        }

        if (isKebabMenuOpen) {
            kebabMenuBtn.innerHTML = ICON_CLOSE_X;
            kebabMenuBtn.setAttribute('aria-label', 'Tutup opsi');
            kebabMenuBtn.setAttribute('aria-expanded', 'true');
            fontDecreaseBtn.classList.remove('hidden');
            fontIncreaseBtn.classList.remove('hidden');
            deleteBtn.classList.remove('hidden');
        } else {
            kebabMenuBtn.innerHTML = ICON_KEBAB_MENU;
            kebabMenuBtn.setAttribute('aria-label', 'Opsi lainnya');
            kebabMenuBtn.setAttribute('aria-expanded', 'false');
            fontDecreaseBtn.classList.add('hidden');
            fontIncreaseBtn.classList.add('hidden');
            deleteBtn.classList.add('hidden');
        }
    };

    kebabMenuBtn.addEventListener('click', () => toggleKebabMenu());


    // --- Expand/Collapse Page Content ---
    headerDiv.addEventListener('click', (e) => {
      // Prevent expand/collapse if click was on title input or any control button
      if ((e.target as HTMLElement).closest('.story-control-btn') || 
          (e.target as HTMLElement).classList.contains('story-page-title-input')) {
        return; 
      }
      const isExpanded = headerDiv.getAttribute('aria-expanded') === 'true';
      headerDiv.setAttribute('aria-expanded', String(!isExpanded));
      contentDiv.style.display = isExpanded ? 'none' : 'block';
      toggleIconSpan.innerHTML = isExpanded ? '&#9660;' : '&#9650;';
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

    // --- Content Edit Functionality ---
    editBtn.addEventListener('click', () => {
        originalContent = contentDiv.innerHTML;
        contentDiv.setAttribute('contenteditable', 'true');
        contentDiv.focus();
        
        editBtn.classList.add('hidden');
        kebabMenuBtn.classList.add('hidden'); // Hide kebab menu
        if(isKebabMenuOpen) toggleKebabMenu(true); // Ensure its controlled buttons are hidden

        // These were controlled by kebab, ensure they are hidden
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
        kebabMenuBtn.classList.remove('hidden'); // Show kebab menu
        toggleKebabMenu(true); // Reset kebab menu to closed state

        fontDecreaseBtn.classList.add('hidden'); // Ensure these are hidden (kebab closed)
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

    // --- Other Controls (Delete, Font Size) ---
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        storyIdToDeleteGlobally = storyPageDiv.id;
        storyNameToDeleteGlobally = titleH3.textContent || 'halaman ini'; // Use current title
        
        if (deleteConfirmModal && deleteModalMessage) {
            deleteModalMessage.textContent = `Yakin ingin menghapus halaman "${storyNameToDeleteGlobally}"? Tindakan ini tidak dapat diurungkan.`;
            deleteConfirmModal.style.display = 'flex';
        } else {
            console.error("Delete confirmation modal elements not found.");
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

  // Load initial content when the app starts
  loadDestinyContentFromLocalStorage(); // Load Destiny content first
  loadStoriesFromLocalStorage();
  filterStoryPages(); 
}

App();