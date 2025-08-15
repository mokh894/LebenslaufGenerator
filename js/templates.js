// CV Template Generator
class CVTemplates {
    constructor() {
        this.templates = {
            modern: this.modernTemplate,
            professional: this.professionalTemplate,
            minimal: this.minimalTemplate
        };
    }

    // Generate CV HTML based on template and data
    generateCV(templateName, data, settings) {
        const template = this.templates[templateName];
        if (!template) {
            console.error('Template nicht gefunden:', templateName);
            return '';
        }
        return template.call(this, data, settings);
    }

    // Modern Template
    modernTemplate(data, settings) {
        return `
            <div class="cv-content">
                <header class="cv-header">
                    <h1 class="cv-name">${data.personal.firstName} ${data.personal.lastName}</h1>
                    <p class="cv-title">${data.personal.profile ? 'Profil' : ''}</p>
                    <div class="cv-contact">
                        ${data.personal.email ? `<div class="cv-contact-item">📧 ${data.personal.email}</div>` : ''}
                        ${data.personal.phone ? `<div class="cv-contact-item">📱 ${data.personal.phone}</div>` : ''}
                        ${data.personal.address ? `<div class="cv-contact-item">📍 ${data.personal.address}, ${data.personal.city} ${data.personal.postalCode}</div>` : ''}
                        ${data.personal.birthDate ? `<div class="cv-contact-item">🎂 ${this.formatDate(data.personal.birthDate)}</div>` : ''}
                        ${data.personal.nationality ? `<div class="cv-contact-item">🌍 ${data.personal.nationality}</div>` : ''}
                    </div>
                </header>

                ${data.personal.profile ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Profil</h2>
                    <p class="cv-profile">${data.personal.profile}</p>
                </section>
                ` : ''}

                ${data.experience.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Berufserfahrung</h2>
                    ${data.experience.map(exp => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <div>
                                    <div class="cv-item-title">${exp.position}</div>
                                    <div class="cv-item-company">${exp.company}</div>
                                </div>
                                <div class="cv-item-date">${exp.startDate} - ${exp.endDate || 'Heute'}</div>
                            </div>
                            ${exp.description ? `<div class="cv-item-description">${exp.description}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                ${data.education.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Ausbildung</h2>
                    ${data.education.map(edu => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <div>
                                    <div class="cv-item-title">${edu.degree}</div>
                                    <div class="cv-item-company">${edu.institution}</div>
                                </div>
                                <div class="cv-item-date">${edu.startDate} - ${edu.endDate || 'Heute'}</div>
                            </div>
                            ${edu.description ? `<div class="cv-item-description">${edu.description}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                ${data.skills.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Fähigkeiten</h2>
                    <div class="cv-skills">
                        ${data.skills.map(skill => `<span class="cv-skill">${skill.name}</span>`).join('')}
                    </div>
                </section>
                ` : ''}

                ${data.languages.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Sprachen</h2>
                    <div class="cv-languages">
                        ${data.languages.map(lang => `
                            <div class="cv-language">
                                <span class="cv-language-name">${lang.name}</span>
                                <span class="cv-language-level">${lang.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}

                ${data.certifications.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Zertifikate</h2>
                    ${data.certifications.map(cert => `
                        <div class="cv-item">
                            <div class="cv-item-header">
                                <div>
                                    <div class="cv-item-title">${cert.name}</div>
                                    <div class="cv-item-company">${cert.issuer}</div>
                                </div>
                                <div class="cv-item-date">${cert.date}</div>
                            </div>
                        </div>
                    `).join('')}
                </section>
                ` : ''}
            </div>
        `;
    }

    // Professional Template
    professionalTemplate(data, settings) {
        return `
            <header class="cv-header">
                <div>
                    <h1 class="cv-name">${data.personal.firstName} ${data.personal.lastName}</h1>
                    <p class="cv-title">${data.personal.profile ? 'Professionelles Profil' : ''}</p>
                </div>
                <div class="cv-contact">
                    ${data.personal.email ? `<div class="cv-contact-item">${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="cv-contact-item">${data.personal.phone}</div>` : ''}
                    ${data.personal.address ? `<div class="cv-contact-item">${data.personal.address}</div>` : ''}
                    ${data.personal.city ? `<div class="cv-contact-item">${data.personal.city} ${data.personal.postalCode}</div>` : ''}
                </div>
            </header>

            ${data.personal.profile ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Profil</h2>
                <p class="cv-profile">${data.personal.profile}</p>
            </section>
            ` : ''}

            ${data.experience.length > 0 ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Berufserfahrung</h2>
                ${data.experience.map(exp => `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <div class="cv-item-title">${exp.position}</div>
                                <div class="cv-item-company">${exp.company}</div>
                            </div>
                            <div class="cv-item-date">${exp.startDate} - ${exp.endDate || 'Heute'}</div>
                        </div>
                        ${exp.description ? `<div class="cv-item-description">${exp.description}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            ${data.education.length > 0 ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Ausbildung</h2>
                ${data.education.map(edu => `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <div class="cv-item-title">${edu.degree}</div>
                                <div class="cv-item-company">${edu.institution}</div>
                            </div>
                            <div class="cv-item-date">${edu.startDate} - ${edu.endDate || 'Heute'}</div>
                        </div>
                        ${edu.description ? `<div class="cv-item-description">${edu.description}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                ${data.skills.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Fähigkeiten</h2>
                    <div class="cv-skills">
                        ${data.skills.map(skill => `<span class="cv-skill">${skill.name}</span>`).join('')}
                    </div>
                </section>
                ` : ''}

                ${data.languages.length > 0 ? `
                <section class="cv-section">
                    <h2 class="cv-section-title">Sprachen</h2>
                    <div class="cv-languages">
                        ${data.languages.map(lang => `
                            <div class="cv-language">
                                <span class="cv-language-name">${lang.name}</span>
                                <span class="cv-language-level">${lang.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}
            </div>
        `;
    }

    // Minimal Template
    minimalTemplate(data, settings) {
        return `
            <header class="cv-header">
                <h1 class="cv-name">${data.personal.firstName} ${data.personal.lastName}</h1>
                <p class="cv-title">Lebenslauf</p>
                <div class="cv-contact">
                    ${data.personal.email ? `<span>${data.personal.email}</span>` : ''}
                    ${data.personal.phone ? `<span>${data.personal.phone}</span>` : ''}
                    ${data.personal.address ? `<span>${data.personal.address}, ${data.personal.city}</span>` : ''}
                </div>
            </header>

            ${data.personal.profile ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Profil</h2>
                <p class="cv-profile">${data.personal.profile}</p>
            </section>
            ` : ''}

            ${data.experience.length > 0 ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Berufserfahrung</h2>
                ${data.experience.map(exp => `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <div class="cv-item-title">${exp.position}</div>
                                <div class="cv-item-company">${exp.company}</div>
                            </div>
                            <div class="cv-item-date">${exp.startDate} - ${exp.endDate || 'Heute'}</div>
                        </div>
                        ${exp.description ? `<div class="cv-item-description">${exp.description}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            ${data.education.length > 0 ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Ausbildung</h2>
                ${data.education.map(edu => `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <div>
                                <div class="cv-item-title">${edu.degree}</div>
                                <div class="cv-item-company">${edu.institution}</div>
                            </div>
                            <div class="cv-item-date">${edu.startDate} - ${edu.endDate || 'Heute'}</div>
                        </div>
                    </div>
                `).join('')}
            </section>
            ` : ''}

            ${data.skills.length > 0 ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Fähigkeiten</h2>
                <div class="cv-skills">
                    ${data.skills.map(skill => `<span class="cv-skill">${skill.name}</span>`).join('')}
                </div>
            </section>
            ` : ''}

            ${data.languages.length > 0 ? `
            <section class="cv-section">
                <h2 class="cv-section-title">Sprachen</h2>
                <div class="cv-languages">
                    ${data.languages.map(lang => `
                        <div class="cv-language">
                            <span class="cv-language-name">${lang.name}</span>
                            <span class="cv-language-level">${lang.level}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        `;
    }

    // Helper method to format dates
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

// Initialize templates instance
const cvTemplates = new CVTemplates();