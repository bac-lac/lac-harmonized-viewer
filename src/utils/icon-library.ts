import { library, icon } from '@fortawesome/fontawesome-svg-core'
import {
    faBars,
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
    faAngleLeft,
    faAngleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faPlus,
    faMinus,
    faTimes
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faBars,
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
    faAngleLeft,
    faAngleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faPlus,
    faMinus,
    faTimes
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