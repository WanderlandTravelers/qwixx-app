// src/settings.js

/**
 * @typedef {Object} QwixxSettings
 * @property {boolean} is67RuleEnabled - Whether the "6-7" rule is enabled.
 */

/**
 * @type {QwixxSettings}
 */
export const defaultSettings = {
  is67RuleEnabled: true,
};

/**
 * Loads settings from localStorage. If no settings are found, it returns the default settings.
 * @returns {QwixxSettings} The loaded settings.
 */
export const loadSettings = () => {
  try {
    const serializedSettings = localStorage.getItem('QwixxSettings');
    if (serializedSettings === null) {
      return defaultSettings;
    }
    return { ...defaultSettings, ...JSON.parse(serializedSettings) };
  } catch (error) {
    console.error("Failed to load settings from localStorage", error);
    return defaultSettings;
  }
};

/**
 * Saves settings to localStorage.
 * @param {QwixxSettings} settings - The settings to save.
 */
export const saveSettings = (settings) => {
  try {
    const serializedSettings = JSON.stringify(settings);
    localStorage.setItem('QwixxSettings', serializedSettings);
  } catch (error) {
    console.error("Failed to save settings to localStorage", error);
  }
};
