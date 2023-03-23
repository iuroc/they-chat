import Poncon from 'ponconjs'

router()

document.ondragstart = () => false


/** 配置路由 */
function router() {
    const poncon = new Poncon()
    poncon.setPageList(['home', 'friend', 'about'])
    poncon.setPage('home', () => {

    })
    poncon.setPage('friend', () => {

    })
    poncon.setPage('about', () => {

    })
    poncon.start()
    autoMenuStats(poncon)
}

/** 自动切换导航菜单显示状态 */
function autoMenuStats(poncon: Poncon) {
    changeMenuStats(poncon)
    window.addEventListener('hashchange', (event) => {
        changeMenuStats(poncon)
    })
}

/**
 * 切换导航菜单状态
 * @param target 页面标识
 */
function changeMenuStats(poncon: Poncon) {
    let activeTarget = poncon.getTarget()
    const menuTabItemEles = document.querySelectorAll<HTMLImageElement>('.menu-tab-list .menu-item')
    const icons: Record<string, string[]> = {
        home: ['./img/chat-fill.svg', './img/chat.svg'],
        friend: ['./img/person-vcard-fill.svg', './img/person-vcard.svg'],
        about: ['./img/info-circle-fill.svg', './img/info-circle.svg'],
    }
    menuTabItemEles.forEach(menuTabItemEles => {
        let target = menuTabItemEles.getAttribute('data-target') as string
        const icon = icons[target]
        const imgEle = menuTabItemEles.querySelector('img') as HTMLImageElement
        imgEle.src = target == activeTarget ? icon[0] : icon[1]
    })
}