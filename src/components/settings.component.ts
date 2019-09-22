import { MDCDialog } from '@material/dialog';
import { MDCSelect } from '@material/select';
import { Component, BaseComponent } from "./base.component";
import { SettingsOpen } from '../events/settings-open.event';
import { ConfigurationService } from '../services/config.service';

export class SettingsComponent extends BaseComponent implements Component {

    mdcDialog: MDCDialog;
    mdcLanguage: MDCSelect;

    selectLocale: HTMLSelectElement;

    buttonApply: HTMLButtonElement;
    buttonCancel: HTMLButtonElement;

    create() {

        const titleId = this.uniqueid();
        const contentId = this.uniqueid();

        const dialog = document.createElement('div');
        dialog.className = 'hv-settings mdc-dialog';
        dialog.setAttribute('role', 'alertdialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-labeledby', titleId);
        dialog.setAttribute('aria-describedby', contentId);

        const container = document.createElement('div');
        container.className = 'mdc-dialog__container';
        dialog.append(container);

        const surface = document.createElement('div');
        surface.className = 'mdc-dialog__surface';
        container.append(surface);

        const title = document.createElement('h2');
        title.className = 'mdc-dialog__title';
        title.id = titleId;
        title.textContent = 'Settings';
        surface.append(title);

        const content = document.createElement('div');
        content.className = 'mdc-dialog__content';
        content.id = contentId;
        surface.append(content);

        const layout = document.createElement('div');
        layout.className = 'hv-settings';
        content.append(layout);

        const inner = document.createElement('div');
        inner.className = 'hv-settings__inner';
        layout.append(inner);

        const cellLanguageLabel = document.createElement('div');
        cellLanguageLabel.className = 'hv-settings__cell-label';
        inner.append(cellLanguageLabel);

        const labelLanguage = document.createElement('label');
        labelLanguage.textContent = 'Language';
        cellLanguageLabel.append(labelLanguage);

        const cellLanguageControl = document.createElement('div');
        cellLanguageControl.className = 'hv-settings__cell-control';
        inner.append(cellLanguageControl);

        const selectLanguage = document.createElement('div');
        selectLanguage.className = 'mdc-select full-width';
        cellLanguageControl.append(selectLanguage);

        const selectLanguageIcon = document.createElement('i');
        selectLanguageIcon.className = 'mdc-select__dropdown-icon';
        selectLanguage.append(selectLanguageIcon);

        this.selectLocale = document.createElement('select');
        this.selectLocale.className = 'mdc-select__native-control';
        selectLanguage.append(this.selectLocale);

        this.instance.locale.list().forEach((locale) => {

            const option = document.createElement('option');
            option.value = locale.code;
            option.textContent = locale.name;
            option.selected = (this.instance.locale.current == locale.code);
            this.selectLocale.append(option);

        });

        const selectLanguageLabel = document.createElement('label');
        selectLanguageLabel.className = 'mdc-floating-label';
        selectLanguageLabel.textContent = this.t('language');
        selectLanguage.append(selectLanguageLabel);

        const selectLanguageRipple = document.createElement('div');
        selectLanguageRipple.className = 'mdc-line-ripple';
        selectLanguage.append(selectLanguageRipple);

        const footer = document.createElement('footer');
        footer.className = 'mdc-dialog__actions';
        surface.append(footer);

        this.buttonApply = document.createElement('button');
        this.buttonApply.type = 'button';
        this.buttonApply.className = 'mdc-button mdc-button--unelevated mdc-dialog__button';
        this.buttonApply.setAttribute('data-mdc-dialog-action', 'yes');
        footer.append(this.buttonApply);

        const buttonApplyLabel = document.createElement('span');
        buttonApplyLabel.className = 'mdc-button__label';
        buttonApplyLabel.textContent = 'Apply';
        this.buttonApply.append(buttonApplyLabel);

        this.buttonCancel = document.createElement('button');
        this.buttonCancel.type = 'button';
        this.buttonCancel.className = 'mdc-button mdc-dialog__button';
        this.buttonCancel.setAttribute('data-mdc-dialog-action', 'no');
        footer.append(this.buttonCancel);

        const buttonCancelLabel = document.createElement('span');
        buttonCancelLabel.className = 'mdc-button__label';
        buttonCancelLabel.textContent = 'Cancel';
        this.buttonCancel.append(buttonCancelLabel);

        const scrim = document.createElement('div');
        scrim.className = 'mdc-dialog__scrim';
        dialog.append(scrim);

        this.mdcDialog = new MDCDialog(dialog);
        this.mdcLanguage = new MDCSelect(selectLanguage);

        return dialog;
    }

    async bind() {

        this.instance.on('settings-open', (event: SettingsOpen) => this.mdcDialog.open());

        this.buttonApply.addEventListener('click', (ev: MouseEvent) => {
            this.instance.locale.set('fr');
            //ConfigurationService.save('HarmonizedViewer.Locale', this.selectLocale.value);
        });

    }

}