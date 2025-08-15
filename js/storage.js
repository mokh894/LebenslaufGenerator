// Local Storage Management
class CVStorage {
    constructor() {
        this.storageKey = 'lebenslauf-data';
        this.settingsKey = 'lebenslauf-settings';
    }

    // Save CV data to localStorage
    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern der Daten:', error);
            return false;
        }
    }

    // Load CV data from localStorage
    loadData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : this.getDefaultData();
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
            return this.getDefaultData();
        }
    }

    // Save settings (template, colors, etc.)
    saveSettings(settings) {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern der Einstellungen:', error);
            return false;
        }
    }

    // Load settings
    loadSettings() {
        try {
            const settings = localStorage.getItem(this.settingsKey);
            return settings ? JSON.parse(settings) : this.getDefaultSettings();
        } catch (error) {
            console.error('Fehler beim Laden der Einstellungen:', error);
            return this.getDefaultSettings();
        }
    }

    // Get default CV data structure
    getDefaultData() {
        return {
            personal: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                birthDate: '',
                nationality: '',
                profile: ''
            },
            experience: [],
            education: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: []
        };
    }

    // Get default settings
    getDefaultSettings() {
        return {
            template: 'modern',
            fontFamily: 'Inter',
            primaryColor: '#2563eb',
            accentColor: '#1e40af'
        };
    }

    // Clear all data
    clearData() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.settingsKey);
            return true;
        } catch (error) {
            console.error('Fehler beim Löschen der Daten:', error);
            return false;
        }
    }

    // Export data as JSON
    exportData() {
        const data = this.loadData();
        const settings = this.loadSettings();
        return {
            data,
            settings,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    // Import data from JSON
    importData(importedData) {
        try {
            if (importedData.data) {
                this.saveData(importedData.data);
            }
            if (importedData.settings) {
                this.saveSettings(importedData.settings);
            }
            return true;
        } catch (error) {
            console.error('Fehler beim Importieren der Daten:', error);
            return false;
        }
    }
}

// Initialize storage instance
const cvStorage = new CVStorage();