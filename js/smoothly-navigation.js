!function () {
    let view = document.querySelector('nav')
    let controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let coords = {y: currentTop}
            let s = targetTop - currentTop
            let t = Math.abs((s / 100) * 300)
            if (t > 500) {
                t = 500
            }
            let tween = new TWEEN.Tween(coords)
                .to({y: targetTop}, t)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)
                })
                .start()
        },
        bindEvents: function () {
            aTags = this.view.querySelectorAll('nav > ul > li >a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget
                    href = a.getAttribute('href')
                    element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init(view)
}.call()
