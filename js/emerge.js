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
 * @returns overLay要素
 */
const _createTarget__emerge = function(option){
    let target;
    // jQuery使用可能の場合かつtargetがjQuery要素
    if(typeof jQuery !== 'undefined' && option.target instanceof jQuery){
        target = option.target.get(0);
    }else{
        // targetがdom要素かどうか
        if(option.target instanceof HTMLElement){
            target = option.target;
        }
    }
    return target;
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
    mainContent.style.cursor = 'move';
    let x;
    let y;
    let preTop;
    let preLeft;
    
    mainContent.ondragstart = function() {
        return false;
    };
    mainContent.onmousedown = function(event){
        console.log('マウスダウン');
        //要素内の相対座標を取得
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
        //ムーブイベントにコールバック
        document.addEventListener("mousemove",onMouseMove, false);
        document.addEventListener("mouseup",onMouseUp, false);
    }
    function onMouseMove(event){
        let top = event.pageY - y;
        let left = event.pageX - x;
        if(preTop == undefined || preTop - top > 2 || top - preTop > 2){
            mainContent.style.top = top + "px";
            preTop = top;
        }
        if(preLeft == undefined || preLeft - left > 2 || left - preLeft > 2){
            mainContent.style.left = left + "px";
            preLeft = left;
        }
    }
    function onMouseUp(event){
        console.log('マウスUp');
        document.removeEventListener("mousemove",onMouseMove);
        document.removeEventListener("mouseup",onMouseUp);
    }
    return mainContent;
}