import { Component, h, Element, Prop, Host } from '@stencil/core';
import { isIE11 } from '../../utils/viewport';

import  { t } from '../../services/i18n-service';

@Component({
    tag: 'harmonized-embed',
    styleUrl: 'pdf-component.scss'
})
export class PdfComponent {

    @Element() el: HTMLElement

    @Prop() url: string

    render() {
        if (isIE11()) {
            return  <Host class="pdf-ie11">
                        <p>{t('pdfNoIE11Line1')}</p>
                        <p>{t('pdfNoIE11Line2')}</p>
                    </Host>
        }

        return  <embed src={this.url} type="application/pdf" width="100%" height="100%">
                    <span>{t('pdfNoEmbed')}</span>
                </embed>
    }
}
