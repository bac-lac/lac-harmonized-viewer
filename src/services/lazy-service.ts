export class LazyLoading {

    static register(element: HTMLElement) {

        if (!element) {
            return undefined
        }

        const images = Array.from(
            element.querySelectorAll('img[data-src]:not(.is-observed)'))

        if ("IntersectionObserver" in window) {

            let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {

                    let image = entry.target as HTMLImageElement
                    if (image) {

                        image.classList.remove('is-loaded')
                        if (entry.isIntersecting) {

                            image.src = image.dataset.src
                            //lazyImage.srcset = lazyImage.dataset.srcset
                            image.classList.remove('is-loading')
                            image.classList.add('is-loading')

                            lazyImageObserver.unobserve(image)
                            image.classList.remove('is-observed')
                        }
                    }
                })
            })

            images.forEach((image) => {
                lazyImageObserver.observe(image)
                image.classList.add('is-observed')
            })

        } else {
            // Possibly fall back to a more compatible method here
        }
    }

}