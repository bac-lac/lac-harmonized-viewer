import { library, icon } from '@fortawesome/fontawesome-svg-core'
import {
    faShareAlt,
    faHome,
    faDownload,
    faCog,
    faExpand,
    faCompress,
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faChevronUp,
    faPlus,
    faMinus
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faShareAlt,
    faHome,
    faDownload,
    faCog,
    faExpand,
    faCompress,
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faChevronUp,
    faPlus,
    faMinus
)

export function fromContentType(contentType: string) {

    let prefix = null
    let iconName = null

    switch (contentType) {

        case 'application/pdf':
            prefix = 'fas'
            iconName = 'file-pdf'
            break

        default:
            prefix = 'fas'
            iconName = 'file'
            break
    }

    return icon({
        prefix: prefix,
        iconName: iconName
    })
}