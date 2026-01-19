import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SettingsDialog from './SettingsDialog';

describe('SettingsDialog', () => {
  it('renders correctly', () => {
    const settings = { is67RuleEnabled: true };
    const { getByText } = render(
      <SettingsDialog open={true} onClose={() => {}} settings={settings} onSettingsChange={() => {}} />
    );
    expect(getByText('Settings')).toBeInTheDocument();
    expect(getByText('Enable "6-7" Rule')).toBeInTheDocument();
  });

  it('reflects the settings prop', () => {
    const settings = { is67RuleEnabled: true };
    const { getByRole } = render(
      <SettingsDialog open={true} onClose={() => {}} settings={settings} onSettingsChange={() => {}} />
    );
    const switchControl = getByRole('checkbox');
    expect(switchControl.checked).toBe(true);
  });

  it('calls onSettingsChange when the switch is toggled', () => {
    const settings = { is67RuleEnabled: false };
    const onSettingsChange = jest.fn();
    const { getByRole } = render(
      <SettingsDialog open={true} onClose={() => {}} settings={settings} onSettingsChange={onSettingsChange} />
    );
    const switchControl = getByRole('checkbox');
    fireEvent.click(switchControl);
    expect(onSettingsChange).toHaveBeenCalledWith({ is67RuleEnabled: true });
  });
});
