/**
 * emerge.js
 */
var Emerge = function(_option){
    // emerge初期化
    this.init(_option);
}

/**
 * 初期オプション
 */
const _initOption__emerge = {
    position: 'fixed',
    target: document.querySelector('html body'),
    animation: true,  // アニメーションの有無
    animationTime: 200, // ms
    headerTitle: 'Hello Emerge', // ヘッダータイトル
    contentHtml: 'Hello World', // メインコンテンツ内容
    width: '50%', // width
    height: '50%', // height
    zIndex: null, // z-index
    headerShow: true, // ヘッダー表示有無
    onOpen : function(){
        // console.log('モーダル開く直前');
    },
    onOpened : function(){
        // console.log('モーダル開いた直後');
    },
    onClose : function(){
        // console.log('モーダル閉じる直前');
    },
    onClosed : function(){
        // console.log('モーダル閉じた直後');
    },
    draggable: false, // ドラッグで移動可能
};

/**
 * モーダルinit
 * @returns Emerge
 */
 Emerge.prototype.init = function(_option) {
    // オプション設定をマージ
    this.option = Object.assign(_initOption__emerge, _option);
    this.target = _createTarget__emerge(this.option);
    this.emerge = null;
    this.mainContent = null;
    return this;
}

/**
 * モーダルopen
 * @returns Emerge
 */
Emerge.prototype.open = function() {
    const self = this;
    // 既にモーダル要素があるかどうか
    if(this.emerge == null){
        // 最もベースとなるモーダル要素
        let emerge = document.createElement("div");
        this.emerge = emerge;
        this.emerge.classList.add("emerge");
        this.emerge.style.position = this.option.position;
        if(this.option.zIndex != null){
            this.emerge.style.zIndex = this.option.zIndex;
        }
        // オーバーレイ要素生成
        let overLay = _createOverLay__emerge(this);
        this.emerge.appendChild(overLay);
        // メインコンテント要素作成
        this.mainContent = _createMainContent__emerge(this);
        this.emerge.appendChild(this.mainContent);
        // ターゲットにモーダル追加
        this.target.appendChild(this.emerge);
    }else{
        // 既にモーダルが存在する場合、クラス名closeをリムーブ
        this.emerge.classList.remove("close");
        this.mainContent.style.top = null;
        this.mainContent.style.left = null;
    }
    self.option.onOpen();
    // アニメーションの有無
    if(this.option.animation){
        setTimeout(function(){
            self.emerge.classList.add("open");
            self.option.onOpened();
        },0);
    }else{
        self.emerge.classList.add("open");
        self.option.onOpened();
    }
    return this;
}
/**
 * モーダルclose
 * @returns Emerge
 */
Emerge.prototype.close = function() {
    const self = this;
    // アニメーションの有無
    self.option.onClose();
    if(self.option.animation){
        setTimeout(function(){
            self.emerge.classList.remove("open");
            setTimeout(function(){
                self.emerge.classList.add("close");
                self.option.onClosed();
            },self.option.animationTime);
        },0);
    }else{
        self.emerge.classList.remove("open");
        self.emerge.classList.add("close");
        self.option.onClosed();
    }
    return this;
}

/**
 * target設定関数
 * HTML要素, jQuery要素、id文字列を許容
 * @returns overLay要素
 */
const _createTarget__emerge = function(option){
    try {
        let target;
        // jQuery使用可能の場合かつtargetがjQuery要素の場合
        if(typeof jQuery !== 'undefined' && option.target instanceof jQuery){
            target = option.target.get(0);
            return target;
        }
        // targetがdom要素の場合
        if(option.target instanceof HTMLElement){
            target = option.target;
            return target;
        }
        // targetが文字列の場合
        if(typeof (option.target) == "string" || option.target instanceof String){
            // id
            if(/^\#.+/.test(option.target)){
                let id = option.target.slice(1);
                target = document.getElementById(id);
                if(target instanceof HTMLElement){
                    return target;
                }
                throw new Error('idが"'+id+'"であるDOM要素が見つかりません。');
            }
            throw new Error('targetとして文字列を設定する場合、"#"から始まるidを指定してください。');
        }
        throw new Error('targetが存在していません。');
    } catch (e) {
        _showError__emerge(e.message)
    }
}

/**
 * オーバーレイ要素作成関数
 * @returns overLay要素
 */
const _createOverLay__emerge = function(self){
    // 対象要素を覆うオーバーレイを定義
    let overLay = document.createElement("div");
    overLay.classList.add("emerge-overlay");
    // オーバーレイクリック時にモーダルを閉じる
    overLay.addEventListener("click", function() {
        self.close();
    });
    return overLay;
}

/**
 * メインコンテンツ要素作成関数
 * @returns メインコンテンツ要素
 */
const _createMainContent__emerge = function(self){
    // 対象要素を覆うオーバーレイを定義
    let mainContent = document.createElement("div");
    mainContent.classList.add("emerge-main-content");
    // メインコンテンツスタイル設定
    _setMainContenStyle__emerge(self, mainContent);
    // メインコンテンツヘッダー要素作成
    if(self.option.headerShow){
        let mainContentHeader = document.createElement("div");
        mainContentHeader.classList.add("emerge-main-content-hader");
        mainContent.appendChild(mainContentHeader);
        // ヘッダータイトル
        let headerTitle = document.createElement("div");
        headerTitle.classList.add("emerge-content-header-title");
        headerTitle.textContent = self.option.headerTitle;
        mainContentHeader.appendChild(headerTitle);
        // 閉じるボタン作成
        let closeBtn = document.createElement("span");
        closeBtn.classList.add("emerge-main-content-close");
        closeBtn.textContent = '×';
        mainContentHeader.appendChild(closeBtn);
        closeBtn.addEventListener("click", function() {
            self.close();
        });
    }
    // メインコンテンツbody要素
    let mainContentBody = document.createElement("div");
    mainContentBody.classList.add("emerge-main-content-body");
    mainContent.appendChild(mainContentBody);
    // メインコンテンツbodyに内容適応
    mainContentBody.innerHTML = self.option.contentHtml;
    // ドラッグ設定
    if(self.option.draggable){
        _setDraggable__emerge(self, mainContent);
    }
    return mainContent;
}

/**
 * メインコンテンツスタイル設定
 * @returns メインコンテンツ要素
 */
const _setMainContenStyle__emerge = function(self, mainContent){
    mainContent.style.transition = self.option.animationTime + 'ms';
    mainContent.style.width = self.option.width;
    mainContent.style.height = self.option.height;
    return mainContent;
}

/**
 * メインコンテンツドラッグ移動処理設定
 * @returns メインコンテンツ要素
 */
const _setDraggable__emerge = function(self, mainContent){
    let dragTarget = mainContent;
    // ヘッダー表示時は、ヘッダーのみドラッグ可能とする。
    if(self.option.headerShow){
        dragTarget = mainContent.getElementsByClassName('emerge-main-content-hader')[0];
    }
    // \drag用のスタイル設定
    dragTarget.style.cursor = 'move';
    // デバイス確認
    let device = navigator.userAgent.match(/iphone|ipad|ipod|android/i) ? "sp" : "pc";
    // デバイス別のイベント名を格納
    let touchstart = device == "sp" ? "touchstart" : "mousedown";
    let touchend = device == "sp" ? "touchend" : "mouseup";
    let touchmove = device == "sp" ? "touchmove" : "mousemove";

    let dragData = {
        "start": false, "move": false, // flag
        "initialX": null, "initialY": null, // タップ位置
        "top": null, "left": null // 要素の初期位置
    };

    dragTarget.addEventListener(touchstart, touchStart, false);

    function touchStart(event) {
        mainContent.style.transition = null;
        event.preventDefault();
        // 位置取得 デバイスに応じて取得対象を変える
        let x = device == "sp" ? event.touches[0].clientX : event.clientX;
        let y = device == "sp" ? event.touches[0].clientY : event.clientY;
        // データ登録
        dragData = {
            "start": true, "move": false, // flag
            "initialX": x, "initialY": y, // タップ位置
            "top": mainContent.offsetTop, "left": mainContent.offsetLeft // 要素の初期位置
        }
        // eventリスナー登録
        document.addEventListener(touchend, touchEnd, false);
        document.addEventListener(touchmove, touchMove, false);
    }

    function touchMove(event) {
        if(dragData.start){
            event.preventDefault();
            // 位置取得 デバイスに応じて取得対象を変える
            let x = device == "sp" ? event.touches[0].clientX : event.clientX;
            let y = device == "sp" ? event.touches[0].clientY : event.clientY;
            let moveX = x - dragData.initialX; // ドラッグ距離 X
            let moveY = y - dragData.initialY; // ドラッグ距離 Y
            if (moveX !== 0 || moveY !== 0) {  // ドラッグ距離が0以外だったら
                mainContent.style.top = dragData.top + moveY + "px";
                mainContent.style.left = dragData.left + moveX + "px";
            }
        }
    }

    function touchEnd(event) {
        if(dragData.start){
            dragData.start = false;
            mainContent.style.transition = self.option.animationTime + 'ms';
            document.removeEventListener(touchend, touchEnd);
            document.removeEventListener(touchmove, touchMove);
        }
    }
}

/**
 * メインコンテンツドラッグ移動処理設定
 * @returns メインコンテンツ要素
 */
const _showError__emerge = function(msg){
    console.error('s-emerge : ' + msg);
}