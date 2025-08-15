// Enhanced CV Editor Management
class CVEditor {
    constructor() {
        this.currentSection = null;
        this.currentData = cvStorage.loadData();
        this.currentSettings = cvStorage.loadSettings();
        this.currentLanguage = 'de';
        this.undoStack = [];
        this.redoStack = [];
        this.currentZoom = 100;
        this.availableSections = this.getAvailableSections();

        this.initializeEventListeners();
        this.initializeTabs();
        this.loadFormData();
        this.updatePreview();
        this.updateSectionsManager();
    }

    getAvailableSections() {
        return {
            experience: {
                title: { de: 'Berufserfahrung', en: 'Work Experience' },
                icon: 'fas fa-briefcase',
                type: 'timeline'
            },
            education: {
                title: { de: 'Ausbildung', en: 'Education' },
                icon: 'fas fa-graduation-cap',
                type: 'timeline'
            },
            skills: {
                title: { de: 'Fähigkeiten', en: 'Skills' },
                icon: 'fas fa-cogs',
                type: 'list'
            },
            languages: {
                title: { de: 'Sprachen', en: 'Languages' },
                icon: 'fas fa-globe',
                type: 'list'
            },
            projects: {
                title: { de: 'Projekte', en: 'Projects' },
                icon: 'fas fa-project-diagram',
                type: 'timeline'
            },
            certifications: {
                title: { de: 'Zertifikate', en: 'Certifications' },
                icon: 'fas fa-certificate',
                type: 'timeline'
            },
            volunteer: {
                title: { de: 'Ehrenamt', en: 'Volunteer Work' },
                icon: 'fas fa-hands-helping',
                type: 'timeline'
            },
            awards: {
                title: { de: 'Auszeichnungen', en: 'Awards' },
                icon: 'fas fa-trophy',
                type: 'list'
            },
            publications: {
                title: { de: 'Publikationen', en: 'Publications' },
                icon: 'fas fa-book',
                type: 'list'
            },
            interests: {
                title: { de: 'Interessen', en: 'Interests' },
                icon: 'fas fa-heart',
                type: 'simple'
            },
            references: {
                title: { de: 'Referenzen', en: 'References' },
                icon: 'fas fa-user-friends',
                type: 'contact'
            }
        };
    }

    initializeEventListeners() {
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const template = e.currentTarget.dataset.template;
                this.selectTemplate(template);
            });
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Language toggle
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Customization controls
        this.initializeCustomizationControls();

        // Personal form
        const personalForm = document.getElementById('personal-form');
        if (personalForm) {
            personalForm.addEventListener('input', (e) => {
                if (e.target.id !== 'profile') {
                    this.updatePersonalData(e.target.id, e.target.value);
                }
            });
        }

        // Rich text editor
        this.initializeRichTextEditor();

        // Photo upload
        const photoUpload = document.getElementById('photo-upload');
        if (photoUpload) {
            photoUpload.addEventListener('change', (e) => {
                this.handlePhotoUpload(e);
            });
        }

        // Header buttons
        this.initializeHeaderButtons();

        // Zoom controls
        this.initializeZoomControls();

        // Modal event listeners
        this.initializeModalListeners();

        // Keyboard shortcuts
        this.initializeKeyboardShortcuts();
    }

    initializeCustomizationControls() {
        const fontFamily = document.getElementById('font-family');
        if (fontFamily) {
            fontFamily.addEventListener('change', (e) => {
                this.updateSetting('fontFamily', e.target.value);
            });
        }

        const fontSize = document.getElementById('font-size');
        if (fontSize) {
            fontSize.addEventListener('input', (e) => {
                this.updateSetting('fontSize', e.target.value);
                const rangeValue = document.querySelector('.range-value');
                if (rangeValue) {
                    rangeValue.textContent = e.target.value + 'px';
                }
            });
        }

        const primaryColor = document.getElementById('primary-color');
        if (primaryColor) {
            primaryColor.addEventListener('change', (e) => {
                this.updateSetting('primaryColor', e.target.value);
            });
        }

        const accentColor = document.getElementById('accent-color');
        if (accentColor) {
            accentColor.addEventListener('change', (e) => {
                this.updateSetting('accentColor', e.target.value);
            });
        }

        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                if (primaryColor) {
                    primaryColor.value = color;
                    this.updateSetting('primaryColor', color);
                }
            });
        });

        // Layout options
        document.querySelectorAll('.layout-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectLayout(e.currentTarget.dataset.layout);
            });
        });
    }

    initializeHeaderButtons() {
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveData();
            });
        }

        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                this.printCV();
            });
        }

        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        const importBtn = document.getElementById('import-btn');
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                document.getElementById('import-file').click();
            });
        }

        const importFile = document.getElementById('import-file');
        if (importFile) {
            importFile.addEventListener('change', (e) => {
                this.importData(e);
            });
        }

        const undoBtn = document.getElementById('undo-btn');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => {
                this.undo();
            });
        }

        const redoBtn = document.getElementById('redo-btn');
        if (redoBtn) {
            redoBtn.addEventListener('click', () => {
                this.redo();
            });
        }
    }

    initializeZoomControls() {
        const zoomIn = document.getElementById('zoom-in');
        if (zoomIn) {
            zoomIn.addEventListener('click', () => {
                this.zoomIn();
            });
        }

        const zoomOut = document.getElementById('zoom-out');
        if (zoomOut) {
            zoomOut.addEventListener('click', () => {
                this.zoomOut();
            });
        }

        const timelineView = document.getElementById('timeline-view');
        if (timelineView) {
            timelineView.addEventListener('click', () => {
                this.openTimelineView();
            });
        }

        const fullscreenPreview = document.getElementById('fullscreen-preview');
        if (fullscreenPreview) {
            fullscreenPreview.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
    }

    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        this.saveData();
                        break;
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        this.redo();
                        break;
                    case 'p':
                        e.preventDefault();
                        this.printCV();
                        break;
                }
            }
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    initializeTabs() {
        this.switchTab('design');
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        const activeContent = document.getElementById(`${tabName}-tab`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Update interface text and preview
        this.updateSectionsManager();
        this.updatePreview();
        this.showMessage(lang === 'de' ? 'Sprache auf Deutsch geändert' : 'Language changed to English', 'success');
    }

    selectTemplate(templateName) {
        // Update active card
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('active');
        });
        const activeCard = document.querySelector(`[data-template="${templateName}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }

        // Update template
        this.updateSetting('template', templateName);

        // Update CV container class
        const container = document.getElementById('cv-container');
        if (container) {
            container.className = `cv-container ${templateName}-template`;
        }

        this.updatePreview();
    }

    updateSetting(key, value) {
        this.saveState();
        this.currentSettings[key] = value;
        cvStorage.saveSettings(this.currentSettings);
        this.applySettings();
        this.updatePreview();
    }

    applySettings() {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', this.currentSettings.primaryColor);
        root.style.setProperty('--accent-color', this.currentSettings.accentColor);
        root.style.setProperty('--cv-font', this.currentSettings.fontFamily);
        if (this.currentSettings.fontSize) {
            root.style.setProperty('--cv-font-size', this.currentSettings.fontSize + 'px');
        }
    }

    updatePersonalData(field, value) {
        if (this.currentData.personal[field] !== value) {
            this.saveState();
            this.currentData.personal[field] = value;
            this.updatePreview();
            this.autoSave();
        }
    }

    loadFormData() {
        // Load personal data into form
        Object.keys(this.currentData.personal).forEach(key => {
            const input = document.getElementById(key);
            if (input && key !== 'profile') {
                input.value = this.currentData.personal[key] || '';
            }
        });

        // Load settings into controls
        const fontFamily = document.getElementById('font-family');
        if (fontFamily) {
            fontFamily.value = this.currentSettings.fontFamily || 'Inter';
        }

        const fontSize = document.getElementById('font-size');
        if (fontSize) {
            fontSize.value = this.currentSettings.fontSize || 14;
            const rangeValue = document.querySelector('.range-value');
            if (rangeValue) {
                rangeValue.textContent = (this.currentSettings.fontSize || 14) + 'px';
            }
        }

        const primaryColor = document.getElementById('primary-color');
        if (primaryColor) {
            primaryColor.value = this.currentSettings.primaryColor || '#2563eb';
        }

        const accentColor = document.getElementById('accent-color');
        if (accentColor) {
            accentColor.value = this.currentSettings.accentColor || '#1e40af';
        }

        // Apply settings
        this.applySettings();

        // Select active template
        this.selectTemplate(this.currentSettings.template || 'modern');
    }

    updatePreview() {
        const container = document.getElementById('cv-container');
        if (container && cvTemplates) {
            const html = cvTemplates.generateCV(
                this.currentSettings.template || 'modern',
                this.currentData,
                this.currentSettings
            );
            container.innerHTML = html;
        }
    }

    updateSectionsManager() {
        const container = document.getElementById('sections-list');
        if (!container) return;

        container.innerHTML = '';

        // Get current sections order
        const sectionsOrder = this.currentData.sectionsOrder || Object.keys(this.availableSections);

        sectionsOrder.forEach(sectionKey => {
            if (this.availableSections[sectionKey]) {
                const section = this.availableSections[sectionKey];
                const data = this.currentData[sectionKey] || [];
                const count = Array.isArray(data) ? data.length : (data ? 1 : 0);

                const sectionCard = document.createElement('div');
                sectionCard.className = 'section-item-card';
                sectionCard.dataset.section = sectionKey;

                sectionCard.innerHTML = `
                    <div class="section-item-info">
                        <i class="${section.icon} section-item-icon"></i>
                        <div class="section-item-details">
                            <h4>${section.title[this.currentLanguage]}</h4>
                            <p>${count} ${count === 1 ? 'Eintrag' : 'Einträge'}</p>
                        </div>
                    </div>
                    <div class="section-item-actions">
                        <button class="section-action-btn" onclick="cvEditor.editSection('${sectionKey}')" title="Bearbeiten">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                `;

                container.appendChild(sectionCard);
            }
        });
    }

    // Rich Text Editor
    initializeRichTextEditor() {
        const editor = document.getElementById('profile');
        const toolbar = document.querySelector('.editor-toolbar');

        if (!editor || !toolbar) return;

        // Toolbar button handlers
        toolbar.addEventListener('click', (e) => {
            if (e.target.classList.contains('toolbar-btn')) {
                e.preventDefault();
                const command = e.target.dataset.command;
                document.execCommand(command, false, null);
                this.updatePersonalData('profile', editor.innerHTML);
                this.updateToolbarStates();
            }
        });

        // Content change handler
        editor.addEventListener('input', () => {
            this.updatePersonalData('profile', editor.innerHTML);
        });

        // Load existing content
        if (this.currentData.personal.profile) {
            editor.innerHTML = this.currentData.personal.profile;
        }
    }

    updateToolbarStates() {
        const toolbar = document.querySelector('.editor-toolbar');
        if (!toolbar) return;

        const commands = ['bold', 'italic'];
        commands.forEach(command => {
            const btn = toolbar.querySelector(`[data-command="${command}"]`);
            if (btn) {
                if (document.queryCommandState(command)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }

    // Photo Upload
    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                this.showMessage('Datei zu groß. Maximale Größe: 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const photoPreview = document.getElementById('photo-preview');
                if (photoPreview) {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
                    photoPreview.classList.add('has-image');
                }
                this.updatePersonalData('photo', e.target.result);
                this.showMessage('Foto erfolgreich hochgeladen!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }

    // Undo/Redo System
    saveState() {
        this.undoStack.push(JSON.stringify({
            data: this.currentData,
            settings: this.currentSettings
        }));

        if (this.undoStack.length > 50) {
            this.undoStack.shift();
        }

        this.redoStack = [];
        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.undoStack.length > 0) {
            this.redoStack.push(JSON.stringify({
                data: this.currentData,
                settings: this.currentSettings
            }));

            const previousState = JSON.parse(this.undoStack.pop());
            this.currentData = previousState.data;
            this.currentSettings = previousState.settings;

            this.loadFormData();
            this.updatePreview();
            this.updateSectionsManager();
            this.updateUndoRedoButtons();

            this.showMessage('Rückgängig gemacht', 'success');
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            this.undoStack.push(JSON.stringify({
                data: this.currentData,
                settings: this.currentSettings
            }));

            const nextState = JSON.parse(this.redoStack.pop());
            this.currentData = nextState.data;
            this.currentSettings = nextState.settings;

            this.loadFormData();
            this.updatePreview();
            this.updateSectionsManager();
            this.updateUndoRedoButtons();

            this.showMessage('Wiederhergestellt', 'success');
        }
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');

        if (undoBtn) undoBtn.disabled = this.undoStack.length === 0;
        if (redoBtn) redoBtn.disabled = this.redoStack.length === 0;
    }

    // Zoom Controls
    zoomIn() {
        if (this.currentZoom < 200) {
            this.currentZoom += 25;
            this.updateZoom();
        }
    }

    zoomOut() {
        if (this.currentZoom > 50) {
            this.currentZoom -= 25;
            this.updateZoom();
        }
    }

    updateZoom() {
        const container = document.getElementById('cv-container');
        const zoomLevel = document.getElementById('zoom-level');

        if (container) {
            container.style.transform = `scale(${this.currentZoom / 100})`;
        }
        if (zoomLevel) {
            zoomLevel.textContent = this.currentZoom + '%';
        }
    }

    // Layout Management
    selectLayout(layoutName) {
        document.querySelectorAll('.layout-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = document.querySelector(`[data-layout="${layoutName}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }

        const container = document.getElementById('cv-container');
        if (container) {
            container.setAttribute('data-layout', layoutName);
        }

        this.updateSetting('layout', layoutName);
        this.updatePreview();
        this.showMessage('Layout geändert', 'success');
    }

    // Timeline View
    openTimelineView() {
        const modal = document.getElementById('timeline-modal');
        if (!modal) return;

        const container = document.getElementById('timeline-container');
        if (container) {
            container.innerHTML = this.generateTimelineHTML();
        }

        modal.classList.add('show');
    }

    generateTimelineHTML() {
        const timelineData = [];

        ['experience', 'education', 'projects', 'certifications'].forEach(sectionKey => {
            const data = this.currentData[sectionKey] || [];
            data.forEach(item => {
                const startYear = this.extractYear(item.startDate);
                const endYear = this.extractYear(item.endDate) || new Date().getFullYear();

                timelineData.push({
                    type: sectionKey,
                    title: item.position || item.degree || item.name,
                    company: item.company || item.institution || item.issuer,
                    startYear,
                    endYear,
                    description: item.description
                });
            });
        });

        timelineData.sort((a, b) => b.startYear - a.startYear);

        return `
            <div class="timeline">
                ${timelineData.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-date">${item.startYear}${item.endYear !== item.startYear ? ` - ${item.endYear}` : ''}</div>
                        <div class="timeline-content">
                            <h3>${item.title}</h3>
                            <h4>${item.company}</h4>
                            ${item.description ? `<p>${item.description}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    extractYear(dateString) {
        if (!dateString) return null;
        const match = dateString.match(/(\d{4})/);
        return match ? parseInt(match[1]) : null;
    }

    // Fullscreen Toggle
    toggleFullscreen() {
        const preview = document.querySelector('.cv-preview');
        if (!preview) return;

        if (preview.classList.contains('fullscreen')) {
            preview.classList.remove('fullscreen');
            document.body.classList.remove('preview-fullscreen');
        } else {
            preview.classList.add('fullscreen');
            document.body.classList.add('preview-fullscreen');
        }
    }

    // Modal Management
    initializeModalListeners() {
        // Add section button
        const addSectionBtn = document.getElementById('add-section-btn');
        if (addSectionBtn) {
            addSectionBtn.addEventListener('click', () => {
                this.openAddSectionModal();
            });
        }

        // Section modal save/cancel
        const saveSection = document.getElementById('save-section');
        if (saveSection) {
            saveSection.addEventListener('click', () => {
                this.saveSectionData();
            });
        }

        const cancelSection = document.getElementById('cancel-section');
        if (cancelSection) {
            cancelSection.addEventListener('click', () => {
                this.closeModal('section-modal');
            });
        }

        // Close modal buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('show');
                }
            });
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });
    }

    openAddSectionModal() {
        const modal = document.getElementById('add-section-modal');
        if (!modal) return;

        modal.classList.add('show');

        document.querySelectorAll('.section-type-card').forEach(card => {
            card.classList.remove('selected');
        });

        const customForm = document.getElementById('custom-section-form');
        if (customForm) {
            customForm.style.display = 'none';
        }

        const confirmBtn = document.getElementById('confirm-add-section');
        if (confirmBtn) {
            confirmBtn.disabled = true;
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    editSection(sectionKey) {
        this.openSectionModal(sectionKey);
    }

    openSectionModal(sectionKey) {
        this.currentSection = sectionKey;
        const modal = document.getElementById('section-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        if (!modal || !title || !body) return;

        const section = this.availableSections[sectionKey];
        if (section) {
            title.textContent = section.title[this.currentLanguage] + ' bearbeiten';
        }

        body.innerHTML = this.generateSectionForm(sectionKey);
        modal.classList.add('show');
    }

    generateSectionForm(sectionKey) {
        const data = this.currentData[sectionKey] || [];

        switch (sectionKey) {
            case 'experience':
            case 'education':
            case 'projects':
            case 'volunteer':
                return this.generateTimelineForm(sectionKey, data);
            case 'skills':
                return this.generateSkillsForm(data);
            case 'languages':
                return this.generateLanguagesForm(data);
            case 'certifications':
                return this.generateCertificationsForm(data);
            case 'awards':
            case 'publications':
                return this.generateListForm(sectionKey, data);
            case 'interests':
                return this.generateSimpleForm(sectionKey, data);
            case 'references':
                return this.generateContactForm(sectionKey, data);
            default:
                return '<p>Formular nicht verfügbar</p>';
        }
    }

    generateTimelineForm(sectionKey, data) {
        const isExperience = sectionKey === 'experience';
        const items = data.map((item, index) => `
            <div class="section-item" data-index="${index}">
                <div class="section-item-header">
                    <span class="section-item-title">${item.position || item.degree || 'Neuer Eintrag'}</span>
                    <button type="button" class="remove-item" onclick="cvEditor.removeItem(${index})">Entfernen</button>
                </div>
                <input type="text" name="position" placeholder="${isExperience ? 'Position' : 'Abschluss'}" value="${item.position || item.degree || ''}" required>
                <input type="text" name="company" placeholder="${isExperience ? 'Unternehmen' : 'Institution'}" value="${item.company || item.institution || ''}" required>
                <input type="text" name="startDate" placeholder="Startdatum (MM/YYYY)" value="${item.startDate || ''}" required>
                <input type="text" name="endDate" placeholder="Enddatum (MM/YYYY oder leer für 'Heute')" value="${item.endDate || ''}">
                <textarea name="description" placeholder="Beschreibung (optional)" rows="3">${item.description || ''}</textarea>
            </div>
        `).join('');

        return `
            <div class="section-form">
                ${items}
                <button type="button" class="add-item" onclick="cvEditor.addItem('${sectionKey}')">
                    ${isExperience ? 'Berufserfahrung' : 'Ausbildung'} hinzufügen
                </button>
            </div>
        `;
    }

    generateSkillsForm(data) {
        const items = data.map((item, index) => `
            <div class="section-item" data-index="${index}">
                <div class="section-item-header">
                    <span class="section-item-title">${item.name || 'Neue Fähigkeit'}</span>
                    <button type="button" class="remove-item" onclick="cvEditor.removeItem(${index})">Entfernen</button>
                </div>
                <input type="text" name="name" placeholder="Fähigkeit" value="${item.name || ''}" required>
            </div>
        `).join('');

        return `
            <div class="section-form">
                ${items}
                <button type="button" class="add-item" onclick="cvEditor.addItem('skills')">Fähigkeit hinzufügen</button>
            </div>
        `;
    }

    generateLanguagesForm(data) {
        const levels = ['Grundkenntnisse', 'Gute Kenntnisse', 'Sehr gute Kenntnisse', 'Fließend', 'Muttersprache'];
        const items = data.map((item, index) => `
            <div class="section-item" data-index="${index}">
                <div class="section-item-header">
                    <span class="section-item-title">${item.name || 'Neue Sprache'}</span>
                    <button type="button" class="remove-item" onclick="cvEditor.removeItem(${index})">Entfernen</button>
                </div>
                <input type="text" name="name" placeholder="Sprache" value="${item.name || ''}" required>
                <select name="level" required>
                    <option value="">Niveau wählen</option>
                    ${levels.map(level => `<option value="${level}" ${item.level === level ? 'selected' : ''}>${level}</option>`).join('')}
                </select>
            </div>
        `).join('');

        return `
            <div class="section-form">
                ${items}
                <button type="button" class="add-item" onclick="cvEditor.addItem('languages')">Sprache hinzufügen</button>
            </div>
        `;
    }

    generateCertificationsForm(data) {
        const items = data.map((item, index) => `
            <div class="section-item" data-index="${index}">
                <div class="section-item-header">
                    <span class="section-item-title">${item.name || 'Neues Zertifikat'}</span>
                    <button type="button" class="remove-item" onclick="cvEditor.removeItem(${index})">Entfernen</button>
                </div>
                <input type="text" name="name" placeholder="Zertifikat" value="${item.name || ''}" required>
                <input type="text" name="issuer" placeholder="Aussteller" value="${item.issuer || ''}" required>
                <input type="text" name="date" placeholder="Datum (MM/YYYY)" value="${item.date || ''}" required>
            </div>
        `).join('');

        return `
            <div class="section-form">
                ${items}
                <button type="button" class="add-item" onclick="cvEditor.addItem('certifications')">Zertifikat hinzufügen</button>
            </div>
        `;
    }

    generateListForm(sectionKey, data) {
        const items = data.map((item, index) => `
            <div class="section-item" data-index="${index}">
                <div class="section-item-header">
                    <span class="section-item-title">${item.name || 'Neuer Eintrag'}</span>
                    <button type="button" class="remove-item" onclick="cvEditor.removeItem(${index})">Entfernen</button>
                </div>
                <input type="text" name="name" placeholder="Name" value="${item.name || ''}" required>
                <textarea name="description" placeholder="Beschreibung (optional)" rows="2">${item.description || ''}</textarea>
            </div>
        `).join('');

        return `
            <div class="section-form">
                ${items}
                <button type="button" class="add-item" onclick="cvEditor.addItem('${sectionKey}')">
                    Eintrag hinzufügen
                </button>
            </div>
        `;
    }

    generateSimpleForm(sectionKey, data) {
        return `
            <div class="section-form">
                <textarea name="content" placeholder="Inhalt eingeben..." rows="6">${data || ''}</textarea>
            </div>
        `;
    }

    generateContactForm(sectionKey, data) {
        const items = data.map((item, index) => `
            <div class="section-item" data-index="${index}">
                <div class="section-item-header">
                    <span class="section-item-title">${item.name || 'Neue Referenz'}</span>
                    <button type="button" class="remove-item" onclick="cvEditor.removeItem(${index})">Entfernen</button>
                </div>
                <input type="text" name="name" placeholder="Name" value="${item.name || ''}" required>
                <input type="text" name="position" placeholder="Position" value="${item.position || ''}">
                <input type="text" name="company" placeholder="Unternehmen" value="${item.company || ''}">
                <input type="email" name="email" placeholder="E-Mail" value="${item.email || ''}">
                <input type="tel" name="phone" placeholder="Telefon" value="${item.phone || ''}">
            </div>
        `).join('');

        return `
            <div class="section-form">
                ${items}
                <button type="button" class="add-item" onclick="cvEditor.addItem('${sectionKey}')">
                    Referenz hinzufügen
                </button>
            </div>
        `;
    }

    addItem(sectionKey) {
        if (!this.currentData[sectionKey]) {
            this.currentData[sectionKey] = [];
        }

        const newItem = this.getEmptyItem(sectionKey);
        this.currentData[sectionKey].push(newItem);

        const body = document.getElementById('modal-body');
        if (body) {
            body.innerHTML = this.generateSectionForm(sectionKey);
        }
    }

    removeItem(index) {
        if (this.currentSection && this.currentData[this.currentSection]) {
            this.currentData[this.currentSection].splice(index, 1);

            const body = document.getElementById('modal-body');
            if (body) {
                body.innerHTML = this.generateSectionForm(this.currentSection);
            }
        }
    }

    getEmptyItem(sectionKey) {
        switch (sectionKey) {
            case 'experience':
            case 'projects':
            case 'volunteer':
                return { position: '', company: '', startDate: '', endDate: '', description: '' };
            case 'education':
                return { degree: '', institution: '', startDate: '', endDate: '', description: '' };
            case 'skills':
                return { name: '' };
            case 'languages':
                return { name: '', level: '' };
            case 'certifications':
                return { name: '', issuer: '', date: '' };
            case 'awards':
            case 'publications':
                return { name: '', description: '' };
            case 'references':
                return { name: '', position: '', company: '', email: '', phone: '' };
            default:
                return {};
        }
    }

    saveSectionData() {
        const form = document.querySelector('.section-form');
        if (!form || !this.currentSection) return;

        const section = this.availableSections[this.currentSection];

        if (section && section.type === 'simple') {
            const textarea = form.querySelector('textarea[name="content"]');
            if (textarea) {
                this.currentData[this.currentSection] = textarea.value;
            }
        } else {
            const items = form.querySelectorAll('.section-item');
            const sectionData = [];

            items.forEach(item => {
                const inputs = item.querySelectorAll('input, textarea, select');
                const itemData = {};

                inputs.forEach(input => {
                    if (input.name && input.value.trim()) {
                        itemData[input.name] = input.value.trim();
                    }
                });

                if (this.currentSection === 'education') {
                    if (itemData.position) {
                        itemData.degree = itemData.position;
                        delete itemData.position;
                    }
                    if (itemData.company) {
                        itemData.institution = itemData.company;
                        delete itemData.company;
                    }
                }

                if (Object.keys(itemData).length > 0) {
                    sectionData.push(itemData);
                }
            });

            this.currentData[this.currentSection] = sectionData;
        }

        this.updatePreview();
        this.updateSectionsManager();
        this.closeModal('section-modal');
        this.saveState();
        this.autoSave();

        this.showMessage('Abschnitt gespeichert!', 'success');
    }

    // Export/Import
    exportData() {
        const data = cvStorage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `lebenslauf-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showMessage('Daten erfolgreich exportiert!', 'success');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                const success = cvStorage.importData(importedData);

                if (success) {
                    this.currentData = cvStorage.loadData();
                    this.currentSettings = cvStorage.loadSettings();

                    this.loadFormData();
                    this.updatePreview();
                    this.updateSectionsManager();

                    this.showMessage('Daten erfolgreich importiert!', 'success');
                } else {
                    this.showMessage('Fehler beim Importieren der Daten.', 'error');
                }
            } catch (error) {
                this.showMessage('Ungültige Datei. Bitte wählen Sie eine gültige JSON-Datei.', 'error');
            }
        };
        reader.readAsText(file);

        event.target.value = '';
    }

    saveData() {
        const success = cvStorage.saveData(this.currentData);
        if (success) {
            this.showMessage('Daten erfolgreich gespeichert!', 'success');
        } else {
            this.showMessage('Fehler beim Speichern der Daten.', 'error');
        }
    }

    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            cvStorage.saveData(this.currentData);
        }, 1000);
    }

    printCV() {
        window.print();
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        document.body.appendChild(message);

        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 3000);
    }
}