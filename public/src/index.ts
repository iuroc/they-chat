import Poncon from 'ponconjs'

router()
setResizeDiv()

document.ondragstart = () => false


/** 配置路由 */
function router() {
    const poncon = new Poncon()
    poncon.setPageList(['home', 'friend', 'about'])
    // 主页
    poncon.setPage('home', () => {

    })
    // 通讯录
    poncon.setPage('friend', () => {

    })
    // 关于
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

/** 拖拽聊天输入框上边框，实现高度调整 */
function setResizeDiv() {
    const ele = document.querySelector('.chat-input-box .change-position') as HTMLDivElement
    const inputBoxEle = document.querySelector('.chat-input-box') as HTMLDivElement
    let isSelected = false
    let startHeight = 0
    let startY = 0
    ele?.addEventListener('mousedown', (event) => {
        isSelected = true
        startHeight = inputBoxEle.offsetHeight
        startY = event.pageY
        document.body.style.cursor = 'ns-resize'
    })
    document.body.addEventListener('mouseup', (event) => {
        isSelected = false
        document.body.style.cursor = ''
    })
    document.body.addEventListener('mousemove', (event) => {
        if (!isSelected) return
        const changeHeight = event.pageY - startY
        let height = startHeight - changeHeight
        if (height > 500) return
        if (height < 150) return
        inputBoxEle.style.height = height + 'px'
    })
}