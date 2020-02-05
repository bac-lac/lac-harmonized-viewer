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
            // Isolate the IE11 component by itself eventually
            return  <Host id="pdf-ie11">
                        <object data={this.url} type="application/pdf" width="100%" height="100%">
                            <span>{t('pdfIE11NoRenderLine1')}</span>
                            <span>{t('pdfIE11NoRenderLine2')}</span>
                        </object>
                    </Host>
        }

        return  <Host id="pdf-other">
                    <embed src={this.url} type="application/pdf" width="100%" height="100%">
                        <span>{t('pdfNoEmbed')}</span>
                    </embed>
                </Host>
    }
}
