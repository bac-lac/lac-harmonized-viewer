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

    supportsActiveXPdf(): boolean {
        return !!this.createActiveXObject("AcroPDF.PDF") || !!this.createActiveXObject("PDF.PdfCtrl");
    }

    createActiveXObject(type: string): any {
        let activeX: any;
        try {
            activeX = new (window as any).ActiveXObject(type);
        } catch (e) {
            activeX = null;
        }

        return activeX;
    }

    render() {
        if (isIE11()) {
            return  <Host id="pdf-ie11">
                        {this.supportsActiveXPdf()
                            ?   <embed src={this.url} type="application/pdf" height="100%" width="100%">
                                    <span>{t('pdfNoEmbed')}</span>
                                </embed>

                            :  <div>
                                    <span>{t('pdfIE11NoRenderLine1')}</span>
                                    <span>{t('pdfIE11NoRenderLine2')}</span>
                                </div>
                        }
                    </Host>
        }

        return  <Host id="pdf-other">
                    <embed src={this.url} type="application/pdf" width="100%" height="100%">
                        <span>{t('pdfNoEmbed')}</span>
                    </embed>
                </Host>
    }
}
