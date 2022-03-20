<template>
  <div class="wrapper">
    <Loading />
    <Header
    :contents="contents"
    :tag="tag"
    :width="contentsWidth"
    @search="searchByKeyword"
    @autoSizing="pushAutoSizing"
    @deviceChange="changeDevice"
    @sliderChange="changeSliderSize"
    @multideviceCancel="monitorReturnToSingledevice"
    @colormodeChange="darkModeSetting"
    @update="searchByKeyword"
    />
    <ScrollTop />
    <Notice />
    <div id="divider" class="divider">
      <div v-cloak class="container">
        
        <div class="contentsWrapper">
          <div v-if="getNoContentComment.length > 0" class="noContent" style="white-space: pre-wrap;" v-text="getNoContentComment"></div>
          <div id="contents" class="contents">
            <div v-for="content in getDisplayingContent" :key="content.id" class="content" :class="getStateSliderStep">
              <div class="contentImage">
                <Images
                :content="content"
                />
              </div>
              <div class="info" :style="infoStyle">
                <div class="infoText" :style="infoButtonStyle">
                  <div class="name">
                    <a :href="`${content.url}`" target="_blank" rel="noopener noreferrer" class="nameLink">
                      <div class="nameText" :style="infoButtonStyle">
                        {{content.name}}
                      </div>
                    </a>
                  </div>
                  <div class="time">
                    <div class="published">{{content.publishedAtJST}}</div>
                  </div>
                </div>
                <button class="infoButton bookmark" aria-label="Add To Favorites" @click="setBookmark(content.id)">
                  <svg class="bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815" :class="getAddedBookmark(content.id)">
                    <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
                  </svg>
                  <div class="comment">お気に入り</div>
                </button>
              </div>
            </div>
            <div v-for="item in getDummyContent" :key="item" class="dummy" :style="dummyStyle"></div>
          </div>
        </div>
        <div class="moreButton button" :class="getNextContent" @click="clickMore">
          もっと見る（残り{{remainingContent}}サイト）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    async asyncData({ $microcms }) {
        const apiFilters = "hide[equals]false[and]link[equals]false";
        const apiOrderNew = "-publishedAt";
        const apiOrderOld = "publishedAt";
        const apiOrderUpdate = "-updatedAt";
        const apiLimit = 1000;
        // API通信
        console.log("Start API communication");
        const data = await $microcms.get({
            endpoint: "site",
            queries: {
                limit: apiLimit,
                orders: apiOrderNew,
                filters: apiFilters,
            }
        });
        const dataOld = await $microcms.get({
            endpoint: "site",
            queries: {
                limit: apiLimit,
                orders: apiOrderOld,
                filters: apiFilters,
            }
        });
        const dataUpdate = await $microcms.get({
            endpoint: "site",
            queries: {
                limit: apiLimit,
                orders: apiOrderUpdate,
                filters: apiFilters,
            }
        });
        console.log("End API communication");
        // 日本時間（publishedAtJST）と経過時間（elapsedDate）をデータ構造に追加
        data.contents.forEach(function (content) {
            const publishedDate = new Date(content.publishedAt);
            const year = publishedDate.getFullYear();
            const month = publishedDate.getMonth() + 1;
            const day = publishedDate.getDate();
            const formatDate = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
            content.publishedAtJST = formatDate;
        });
        dataOld.contents.forEach(function (content) {
            const publishedDate = new Date(content.publishedAt);
            const year = publishedDate.getFullYear();
            const month = publishedDate.getMonth() + 1;
            const day = publishedDate.getDate();
            const formatDate = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
            content.publishedAtJST = formatDate;
        });
        dataUpdate.contents.forEach(function (content) {
            const publishedDate = new Date(content.publishedAt);
            const year = publishedDate.getFullYear();
            const month = publishedDate.getMonth() + 1;
            const day = publishedDate.getDate();
            const formatDate = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
            content.publishedAtJST = formatDate;
        });
        const type = await $microcms.get({
            endpoint: "type",
            queries: {
                limit: 100,
            },
        });
        const industry = await $microcms.get({
            endpoint: "industry",
            queries: {
                limit: 100,
            },
        });
        const impression = await $microcms.get({
            endpoint: "impression",
            queries: {
                limit: 100,
            },
        });
        const layout = await $microcms.get({
            endpoint: "layout",
            queries: {
                limit: 100,
            },
        });
        const color = await $microcms.get({
            endpoint: "color",
            queries: {
                limit: 100,
            },
        });
        const pickup = await $microcms.get({
            endpoint: "pickup",
            queries: {
                limit: 100,
            },
        });
        const technique = await $microcms.get({
            endpoint: "technique",
            queries: {
                limit: 100,
            },
        });
        const technology = await $microcms.get({
            endpoint: "technology",
            queries: {
                limit: 100,
            },
        });
        const scheme = await $microcms.get({
            endpoint: "scheme",
            queries: {
                limit: 100,
            },
        });
        const tag = {
            type,
            industry,
            impression,
            layout,
            color,
            pickup,
            technique,
            technology,
            scheme,
        };
        const contents = data.contents;
        const contentsOld = dataOld.contents;
        const contentsUpdate = dataUpdate.contents;
        return {
            contents,
            contentsOld,
            contentsUpdate,
            tag,
        };
    },
    data() {
        return {
            dummy: [],
            dummyStyle: {},
            displayingContents: [],
            displayingContent: [],
            displayingLimit: 60,
            displayingPageOriginal: 0,
            displayingPageKeyword: 0,
            displayingPageBookmark: 0,
            remainingContent: 0,
            tagsJpName: "",
            infoButtonStyle: {
                width: "",
            },
            infoStyle: {
                width: "",
            },
            japaneseTags: '',
            colormode: [],
            contentsElement: {},
            totalWidth: 0,
            columnContent: 0,
            meta: {
              title: 'Monet | Webデザインギャラリー',
              keywords: 'デザイン,Webデザイン,Web design,参考,Webデザインギャラリー,ギャラリー,Webサイト',
              description: 'MonetはWeb制作の参考になるWebサイトを集めたギャラリー･リンク集です。日本国内の優れたWebデザインを厳選してご紹介しています。Webデザインの参考にぜひご活用ください。',
              type: 'website',
              url: 'https://mitsukaru-design.com/',
              image: 'https://mitsukaru-design.com/images/ogp/logo.png',
            },
            contentsWidth: {},
        };
    },
    head() {
        return {
            htmlAttrs: {
                class: this.colormode
            },
            title: this.japaneseTags === '' ? this.meta.title : this.japaneseTags + ' | ' + this.meta.title,
            meta: [
              { hid: 'description', name: 'description', content: this.meta.description },
              { hid: 'keywords', name: 'keywords', content: this.meta.keywords },
              { hid: 'og:type', property: 'og:type', content: this.meta.type },
              { hid: 'og:title', property: 'og:title', content: this.meta.title },
              { hid: 'og:description', property: 'og:description', content: this.meta.description },
              { hid: 'og:url', property: 'og:url', content: this.meta.url },
              { hid: 'og:image', property: 'og:image', content: this.meta.image },
            ],
        };
    },
    computed: {
        getStateSliderStep() {
            const steps = this.$store.getters["slider/getSteps"];
            return {
                step0: steps[0],
                step1: steps[1],
                step2: steps[2],
                step3: steps[3],
                step4: steps[4],
                step5: steps[5],
                step6: steps[6],
                step7: steps[7],
                step8: steps[8],
                step9: steps[9],
                step10: steps[10],
            };
        },
        getDummyContent() {
            return this.dummy;
        },
        getAddedBookmark() {
            return function (id) {
                return { bookmarkRegistered: this.$store.getters["bookmark/getInclusionBookmark"](id) };
            };
        },
        getNextContent() {
            return { hide: this.remainingContent === 0 };
        },
        getNoContentComment() {
          if (this.displayingContents.length === 0) {
            if(this.$route.query.bookmark === '1') {
              return "お気に入りは登録されていません";
            }else {
              return "一致するコンテンツがありません";
            }
          }else if(this.$route.query.bookmark === '1') {
              return "お気に入り";
          }else {
            return "";
          }
        },
        getDisplayingContent() {
            return this.displayingContent;
        },
    },
    watch: {
      $route: 'searchByKeyword'
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
        // ウィンドウサイズを取得
        this.setWindowSize();
        // ローカルストレージの取得
        if (this.$storageAvailable('localStorage')) {
            this.getLocalStorage();
        }
        else {
            console.log("ブラウザのローカルストレージがオフになっています。");
        }
        // ダークモードの初期設定
        this.darkModeSetting();

        // ページ遷移時の処理
        if(this.$store.getters["loaded/getLoaded"]) {
          this.pageTransitionProcess();
        }
        // 読み込み完了を監視
        window.addEventListener("load", this.loadProcess);
        // ブラウザサイズの変更を監視
        window.addEventListener("resize", this.resizeProcess);
        // スクロールを監視
        window.addEventListener("scroll", this.setWindowScroll);

        window.matchMedia("(min-width:375px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:400px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:450px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:500px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:576px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:630px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:660px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:700px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:768px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:830px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:900px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:992px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1030px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1100px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1200px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1230px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1300px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1400px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1500px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1600px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1620px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1700px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1800px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1900px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1920px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:2000px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:2100px)").addEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:2200px)").addEventListener("change", this.matchMediaProcess);
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log("beforeDestroy");

        window.removeEventListener("load", this.loadProcess);
        window.removeEventListener("resize", this.resizeProcess);
        window.removeEventListener("scroll", this.setWindowScroll);
        window.matchMedia("(min-width:375px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:400px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:450px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:500px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:576px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:630px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:660px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:700px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:768px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:830px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:900px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:992px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1030px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1100px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1200px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1230px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1300px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1400px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1500px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1600px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1620px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1700px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1800px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1900px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:1920px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:2000px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:2100px)").removeEventListener("change", this.matchMediaProcess);
        window.matchMedia("(min-width:2200px)").removeEventListener("change", this.matchMediaProcess);
    },
    methods: {
        darkModeSetting() {
          if(this.$store.getters["darkmode/getActive"]) {
            this.colormode = [this.$store.getters["colormode/getColormode"],'darkmode']
          }else {
            this.colormode = [this.$store.getters["colormode/getColormode"]];
          }
        },
        setContentsElement() {
          const contents = document.getElementById("contents");
          this.contentsElement = contents
        },
        InitialDisplay() {
          // コンテンツ初期表示
          // クエリパラメーターが存在するか確認
          if(Object.keys(this.$route.query).length === 0) {
            this.displayingContents = this.contents;
            this.updateDisplayingContent();
          }else {
            this.searchByKeyword();
          }
        },
        setDisplayingContent() {
            // 表示件数を増やす
            this.displayingPageOriginal = this.displayingPageOriginal + 1;
            const start = 0;
            const end = start + (this.displayingPageOriginal * this.displayingLimit);
            this.displayingContent = this.displayingContents.slice(start, end);
            this.remainingContent = this.displayingContents.length - this.displayingContent.length;

            this.createDummyContent();
        },
        updateDisplayingContent() {
            // 表示コンテンツを更新する（１ページ目から表示）
            this.displayingPageOriginal = 1;
            const start = 0;
            const end = start + (this.displayingPageOriginal * this.displayingLimit);
            this.displayingContent = this.displayingContents.slice(start, end);
            this.remainingContent = this.displayingContents.length - this.displayingContent.length;

            this.createDummyContent();
            // headを設定
            this.convertTagsToJapanese();
        },
        wrapChack() {
            // コンテンツの折り返しをチェック
            const columnContent = Math.floor(this.contentsElement.clientWidth / this.totalWidth); // １カラム内のコンテンツ数
            if(this.columnContent !== columnContent) {
                this.createDummyContent();
            }
        },
        clickMore() {
            this.setDisplayingContent();
        },
        createDummyContent() {
            console.log("createDummyContentを起動");
            // 実行タイミング：デバイスの変更、コンテンツサイズの変更
            // コンテンツの幅を計算
            const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
            const value = this.$store.getters["slider/getValue"];

            let width;
            switch(devicePattern) {
                case 1:
                    width = Math.round(873 * value);
                    break;

                case 2:
                    width = Math.round(600 * value);
                    break;

                case 3:
                    width = Math.round(369 * value);
                    break;

                case 4:
                    width = Math.round(873 * value) + Math.round(600 * value) + Math.round(369 * value) + 20;
                    break;

                case 5:
                    width = Math.round(873 * value) + Math.round(600 * value) + 10;
                    break;

                case 6:
                    width = Math.round(873 * value) + Math.round(369 * value) + 10;
                    break;
                    
                case 7:
                    width = Math.round(600 * value) + Math.round(369 * value) + 10;
                    break;
            }
            // 画像にボーダーをつけて、"box-sizing: content-box;"としたため
            /* const border = 1;
            width = width + (border * 2); */

            // 左右マージンを計算
            const marginLeftRight = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
            const sliderSteps = this.$store.getters["slider/getSteps"];
            const sliderStep = sliderSteps.indexOf(true); // 現在のスライダーステップ
            const marginLeft = marginLeftRight[sliderStep];
            const marginRight = marginLeftRight[sliderStep];

            const viewWidth = this.contentsElement.clientWidth; // 表示領域全体の幅
            const totalWidth = width + marginRight + marginLeft; // コンテンツ１つ辺りの幅（マージン含む）
            const columnContent = Math.floor(viewWidth / totalWidth); // １カラム内のコンテンツ数
            const contentQuantity = this.displayingContent.length; // １ページ内のコンテンツ数

            // wrapChack用に退避
            this.totalWidth = totalWidth
            this.columnContent = columnContent
            // ダミーコンテンツ作成
            this.dummy.length = 0;
            if (contentQuantity % columnContent !== 0 && contentQuantity > columnContent) {
                for (let i = 0; i < columnContent - (contentQuantity % columnContent); i++) {
                    this.$set(this.dummy, i, i);
                }
            }
            this.dummy.splice();
            // ダミーコンテンツのスタイル設定
            this.dummyStyle.width = `${width}px`;
            this.dummyStyle.height = `0px`;
            this.dummyStyle.marginTop = `0px`;
            this.dummyStyle.marginBottom = `0px`;
            this.dummyStyle.marginRight = `${marginRight}px`;
            this.dummyStyle.marginLeft = `${marginLeft}px`;
            // info領域の大きさを設定
            const infoWidth = width - 40;
            this.infoButtonStyle.width = `${infoWidth}px`;
            this.infoStyle.width = `${width}px`;

            // コンテンツ領域の幅
            const contentWidth = totalWidth * columnContent - (marginLeft + marginRight);
            const windowSize =this.$store.getters["windowSize/getWindowWidth"];
            if(windowSize >= 768) {
              this.contentsWidth = { width: `${contentWidth}px`}
            }else {
              this.contentsWidth = { width: '100%'}
            }
        },
        calculateAutoSizing() {
            console.log("calculateAutoSizingを起動");
            const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
            const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ

            // コンテンツサイズ自動調整用の値を算出
            let bestStep;
            let maxStep;
            switch (devicePattern) {
                case 1: // PC
                    if (windowWidth < 375) {
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 375 && windowWidth < 500) {
                        bestStep = 2;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 500 && windowWidth < 576) {
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 576 && windowWidth < 768) {
                        bestStep = 4;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 768 && windowWidth < 900) {
                        bestStep = 4;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 1;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 2;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 2;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1300) {
                        bestStep = 2;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 2;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 2;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1500) {
                        bestStep = 2;
                        maxStep = 10;
                    }
                    break;

                case 2: // TB
                    if (windowWidth < 375) {
                        bestStep = 4;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 375 && windowWidth < 400) {
                        bestStep = 4;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 400 && windowWidth < 450) {
                        bestStep = 5;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 450 && windowWidth < 500) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 500 && windowWidth < 576) {
                        bestStep = 5;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 576 && windowWidth < 630) {
                        bestStep = 6;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 630 && windowWidth < 700) {
                        bestStep = 6;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 700 && windowWidth < 768) {
                        bestStep = 7;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 768 && windowWidth < 900) {
                        bestStep = 7;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1300) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1500) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    break;

                case 3: // SP
                    if (windowWidth < 375) {
                        bestStep = 7;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 375 && windowWidth < 400) {
                        bestStep = 8;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 400 && windowWidth < 576) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 576 && windowWidth < 768) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 768 && windowWidth < 900) {
                        bestStep = 6;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 7;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1300) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1500) {
                        bestStep = 8;
                        maxStep = 10;
                    }
                    break;

                case 4: // PC & TB & SP
                    if (windowWidth < 375) {
                        // 仕様変更により未使用
                        bestStep = 0;
                        maxStep = 0;
                    }
                    else if (windowWidth >= 375 && windowWidth < 576) {
                        // 仕様変更により未使用
                        bestStep = 2;
                        maxStep = 0;
                    }
                    else if (windowWidth >= 576 && windowWidth < 660) {
                        bestStep = 0;
                        maxStep = 0;
                    }
                    else if (windowWidth >= 660 && windowWidth < 768) {
                        bestStep = 0;
                        maxStep = 1;
                    }
                    else if (windowWidth >= 768 && windowWidth < 900) {
                        bestStep = 0;
                        maxStep = 1;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 1;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 2;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1230) {
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 1230 && windowWidth < 1300) {
                        bestStep = 3;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 4;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 5;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 1500 && windowWidth < 1600) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 1600 && windowWidth < 1620) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 1620 && windowWidth < 1700) {
                        bestStep = 5;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 1700 && windowWidth < 1800) {
                        bestStep = 5;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 1800 && windowWidth < 1900) {
                        bestStep = 2;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 1900 && windowWidth < 1920) {
                        bestStep = 2;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 1920 && windowWidth < 2000) {
                        bestStep = 2;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 2000 && windowWidth < 2100) {
                        bestStep = 2;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 2100) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    break;

                case 5: // PC & TB
                    if (windowWidth < 375) {
                        // 仕様変更により未使用
                        bestStep = 0;
                        maxStep = 0;
                    }
                    else if (windowWidth >= 375 && windowWidth < 576) {
                        // 仕様変更により未使用
                        bestStep = 2;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 576 && windowWidth < 660) {
                        bestStep = 1;
                        maxStep = 1;
                    }
                    else if (windowWidth >= 660 && windowWidth < 768) {
                        bestStep = 1;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 768 && windowWidth < 900) {
                        bestStep = 1;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 2;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 3;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 4;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1230) {
                        bestStep = 5;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 1230 && windowWidth < 1300) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 5;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 1500 && windowWidth < 1600) {
                        bestStep = 2;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 1600 && windowWidth < 1700) {
                        bestStep = 2;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 1700 && windowWidth < 1800) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1800 && windowWidth < 1900) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1900 && windowWidth < 2000) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2000 && windowWidth < 2100) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2100) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    break;

                case 6: // PC & SP
                    if (windowWidth < 375) {
                        // 仕様変更により未使用
                        bestStep = 1;
                        maxStep = 1;
                    }
                    else if (windowWidth >= 375 && windowWidth < 576) {
                        // 仕様変更により未使用
                        bestStep = 2;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 576 && windowWidth < 660) {
                        bestStep = 2;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 660 && windowWidth < 768) {
                        bestStep = 2;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 768 && windowWidth < 830) {
                        bestStep = 2;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 830 && windowWidth < 900) {
                        bestStep = 3;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 3;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 4;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1300) {
                        bestStep = 5;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 5;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 5;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 1500 && windowWidth < 1600) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1600 && windowWidth < 1700) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1700 && windowWidth < 1800) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1800 && windowWidth < 1900) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1900 && windowWidth < 2000) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2000 && windowWidth < 2100) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2100) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    break;

                case 7: // TB & SP
                    if (windowWidth < 375) {
                        // 仕様変更により未使用
                        bestStep = 2;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 375 && windowWidth < 576) {
                        // 仕様変更により未使用
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 576 && windowWidth < 660) {
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 660 && windowWidth < 700) {
                        bestStep = 4;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 700 && windowWidth < 768) {
                        bestStep = 4;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 768 && windowWidth < 830) {
                        bestStep = 4;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 830 && windowWidth < 900) {
                        bestStep = 4;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 5;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1030) {
                        bestStep = 6;
                        maxStep = 7;
                    }
                    else if (windowWidth >= 1030 && windowWidth < 1100) {
                        bestStep = 6;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 6;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1300) {
                        bestStep = 7;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 7;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1500 && windowWidth < 1600) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1600 && windowWidth < 1700) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1700 && windowWidth < 1800) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1800 && windowWidth < 1900) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1900 && windowWidth < 2000) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2000 && windowWidth < 2100) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2100 && windowWidth < 2200) {
                        bestStep = 4;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 2200) {
                        bestStep = 5;
                        maxStep = 10;
                    }
                    break;

            }

            // ステップを倍率に変換
            const value = (0.25*1000 + bestStep * (0.075*1000))/1000;
            const maxValue = (0.25*1000 + maxStep * (0.075*1000))/1000;

            // 自動調整用の値を退避
            this.$store.dispatch("slider/pushAptitudeValue", value);
            // スライダー最大値を退避
            this.$store.dispatch("slider/pushMaxValue", maxValue);

            // ブラウザサイズ変更により最大値を超えてしまった場合
            const nowValue = this.$store.getters["slider/getValue"]
            if(nowValue > maxValue) {
              this.$store.dispatch('slider/pushSlider',maxValue)
            }
        },
        loadProcess() {
            // ロード済みフラグの設定
            this.$store.dispatch("loaded/pushLoaded");
            // コンテンツ要素を取得
            this.setContentsElement();
            // 自動サイズ調整処理
            this.calculateAutoSizing();
            // ダミーコンテンツの作成
            this.createDummyContent();
            // コンテンツ初期表示
            this.InitialDisplay();
        },
        pageTransitionProcess() {
            // コンテンツ要素を取得
            this.setContentsElement();
            // ダミーコンテンツの作成
            this.createDummyContent();
            // コンテンツ初期表示
            this.InitialDisplay();
            // ダークモードボタンのクリックカウントをクリア
            this.$store.dispatch("darkmode/pushClickCountClear")
        },
        resizeProcess() {
            this.setWindowSize();
            this.monitorReturnToAuto();
            this.wrapChack();
        },
        setBookmark(id) {
            if(!this.$storageAvailable('localStorage')) {
                alert("ブラウザのローカルストレージがOFFになっています。\nお気に入り機能を使用するため、ブラウザの設定でローカルストレージをONにしてください。");
                return;
            }
            this.$store.dispatch("bookmark/pushBookmark", id);
        },
        convertTagsToJapanese() {
          // タグIDを日本語に変換する
          if (this.$route.query.bookmark === '1') {
            this.japaneseTags = 'お気に入り';
          }else {
            const selectedTags = [];
            let count = 0;
            const site = this.contents;
            const type = this.tag.type.contents;
            const impression = this.tag.impression.contents;
            const industry = this.tag.industry.contents;
            const pickup = this.tag.pickup.contents;
            const technique = this.tag.technique.contents;
            const layout = this.tag.layout.contents;
            const color = this.tag.color.contents;
            const scheme = this.tag.scheme.contents;
            const technology = this.tag.technology.contents;
            if(this.$route.query.site !== undefined) {
              const query = this.$route.query.site.split('_');
              query.forEach(function(item) {
                const tag = site.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.type !== undefined) {
              const query = this.$route.query.type.split('_');
              query.forEach(function(item) {
                const tag = type.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.impression !== undefined) {
              const query = this.$route.query.impression.split('_');
              query.forEach(function(item) {
                const tag = impression.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.industry !== undefined) {
              const query = this.$route.query.industry.split('_');
              query.forEach(function(item) {
                const tag = industry.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.pickup !== undefined) {
              const query = this.$route.query.pickup.split('_');
              query.forEach(function(item) {
                const tag = pickup.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.technique !== undefined) {
              const query = this.$route.query.technique.split('_');
              query.forEach(function(item) {
                const tag = technique.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.layout !== undefined) {
              const query = this.$route.query.layout.split('_');
              query.forEach(function(item) {
                const tag = layout.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.color !== undefined) {
              const query = this.$route.query.color.split('_');
              query.forEach(function(item) {
                const tag = color.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.scheme !== undefined) {
              const query = this.$route.query.scheme.split('_');
              query.forEach(function(item) {
                const tag = scheme.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(this.$route.query.technology !== undefined) {
              const query = this.$route.query.technology.split('_');
              query.forEach(function(item) {
                const tag = technology.find(key => key.id === item);
                selectedTags.push(tag.name);
                count++;
              })
            }
            if(count > 0) {
              this.japaneseTags = selectedTags.join('+');
            }else {
              this.japaneseTags = '';
            }
          }
        },
        getLocalStorage() {
            // 初回読み込み時にローカルストレージのデータをstoreに取り込み
            // ブックマーク
            const bookmarkJson = localStorage.getItem("bookmark");
            const bookmark = JSON.parse(bookmarkJson);
            if (bookmark !== null) {
                this.$store.dispatch("bookmark/pushLocalStorage", bookmark);
            }
            // デバイスパターン
            const devicePatternJson = localStorage.getItem("device-pattern");
            const devicePattern = JSON.parse(devicePatternJson);
            if (devicePattern !== null) {
                this.$store.dispatch("devicePattern/pushLocalStorage", devicePattern);
            }
            // スライダー
            const sliderJson = localStorage.getItem("slider");
            const slider = JSON.parse(sliderJson);
            if (slider !== null) {
                this.$store.dispatch("slider/pushLocalStorage", slider);
            }
            // ビューパターン
            const viewPatternJson = localStorage.getItem("view-pattern");
            const viewPattern = JSON.parse(viewPatternJson);
            if (viewPattern !== null) {
                this.$store.dispatch("viewPattern/pushLocalStorage", viewPattern);
            }
            // お気に入りのタグ
            const favoriteTagsJson = localStorage.getItem("favoriteTags");
            const favoriteTags = JSON.parse(favoriteTagsJson);
            if (favoriteTags !== null) {
                this.$store.dispatch("favoriteTags/pushLocalStorage", favoriteTags);
            }
            // ダークモード
            const darkmodeJson = localStorage.getItem("darkmode");
            const darkmode = JSON.parse(darkmodeJson);
            if (darkmode !== null) {
                this.$store.dispatch("darkmode/pushLocalStorage", darkmode);
            }
            // カラーモード
            const colormodeJson = localStorage.getItem("colormode");
            const colormode = JSON.parse(colormodeJson);
            if (colormode !== null) {
                this.$store.dispatch("colormode/pushLocalStorage", colormode);
            }
        },
        searchByKeyword() {
            // クエリパラメーターから検索キーワードを取得
            const site = this.$route.query.site !== undefined ? this.$route.query.site.split('_') : [];
            const type = this.$route.query.type !== undefined ? this.$route.query.type.split('_') : [];
            const impression = this.$route.query.impression !== undefined ? this.$route.query.impression.split('_') : [];
            const industry = this.$route.query.industry !== undefined ? this.$route.query.industry.split('_') : [];
            const pickup = this.$route.query.pickup !== undefined ? this.$route.query.pickup.split('_') : [];
            const technique = this.$route.query.technique !== undefined ? this.$route.query.technique.split('_') : [];
            const layout = this.$route.query.layout !== undefined ? this.$route.query.layout.split('_') : [];
            const color = this.$route.query.color !== undefined ? this.$route.query.color.split('_') : [];
            const scheme = this.$route.query.scheme !== undefined ? this.$route.query.scheme.split('_') : [];
            const technology = this.$route.query.technology !== undefined ? this.$route.query.technology.split('_') : [];
            const order = this.$route.query.order;
            const bookmark = this.$route.query.bookmark;

            // ブックマークページ用
            if(bookmark !== undefined) {
              // store取得
              const bookmark = this.$store.getters["bookmark/getBookmark"];

              // ブックマークでフィルター
              const bookmarkContents = this.contents.filter(function (value) {
                  return bookmark.includes(value.id);
              });

              // ブックマークコンテンツを設定
              this.displayingContents = bookmarkContents;
              this.updateDisplayingContent();
              return;
            }

            // ソート処理
            let sortContents;
            const sort = this.$route.query.sort !== undefined ? this.$route.query.sort : 'new';
            if(sort === 'new') {
              sortContents = this.contents;
            }else if(sort === 'old') {
              sortContents = this.contentsOld;
            }else if(sort === 'update') {
              sortContents = this.contentsUpdate;
            }

            const allNum =
              site.length +
              type.length +
              impression.length +
              industry.length +
              pickup.length +
              technique.length +
              layout.length +
              color.length +
              scheme.length +
              technology.length;

            // キーワードを一度入力してから削除したとき
            if (allNum === 0) {
                // すべてのコンテンツを設定
                this.displayingContents = sortContents;
                this.updateDisplayingContent();
                return;
            }

            // 検索対象のコンテンツを取得
            const contents = sortContents;

            // キーワードでフィルター（大文字・小文字・ひらがな・カタカナを区別しない）
            const searchFuzzy = contents.filter(function (content) {

                // フィルター処理
                let matchingCount = 0
                site.forEach(function(key) {
                  const result = (content.id === key);
                  if(result) matchingCount++;
                })
                type.forEach(function(key) {
                  const result = (content.type.length !== 0 ? content.type.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                industry.forEach(function(key) {
                  const result = (content.industry.length !== 0 ? content.industry.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                impression.forEach(function(key) {
                  const result = (content.impression.length !== 0 ? content.impression.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                layout.forEach(function(key) {
                  const result = (content.layout.length !== 0 ? content.layout.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                color.forEach(function(key) {
                  const result = (content.color.length !== 0 ? content.color.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                pickup.forEach(function(key) {
                  const result = (content.pickup.length !== 0 ? content.pickup.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                technique.forEach(function(key) {
                  const result = (content.technique.length !== 0 ? content.technique.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                technology.forEach(function(key) {
                  const result = (content.technology.length !== 0 ? content.technology.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })
                scheme.forEach(function(key) {
                  const result = (content.scheme.length !== 0 ? content.scheme.some(value => value.id === key) : false);
                  if(result) matchingCount++;
                })

                if(order === undefined || order === 'and') {
                  return allNum === matchingCount;
                }else {
                  return matchingCount > 0;
                }
                  
            });
            this.displayingContents = searchFuzzy;
            this.updateDisplayingContent();
        },
        setWindowScroll() {
            const scroll = window.pageYOffset;
            this.$store.dispatch("scroll/pushWindowScroll", scroll);
        },
        setWindowSize() {
            const width = window.innerWidth;
            this.$store.dispatch("windowSize/pushWindowWidth", width);
        },
        pushAutoSizing() {
          if(this.$store.getters["slider/getAutoSizing"]) {
            this.calculateAutoSizing();
            this.createDummyContent();
          }
        },
        changeDevice() {
          this.calculateAutoSizing();
          this.createDummyContent();
        },
        changeSliderSize() {
          this.createDummyContent();
        },
        matchMediaProcess() {
          this.calculateAutoSizing();
          this.createDummyContent();
        },
        monitorReturnToAuto() {
            // コンテンツサイズが手動設定のときに、ウィンドウサイズが変更されたら、手動から自動に切り替える
            if (!this.$store.getters["slider/getAutoSizing"]) {
                this.$store.dispatch("slider/pushAutoSizing");
                this.calculateAutoSizing();
                this.createDummyContent();
                // 自動調整オンの通知
                this.$store.dispatch("notice/pushDisplay", {id: 2, text: 'サイズの自動調整を有効にしました'});
                setTimeout(() => (this.$store.dispatch("notice/pushClose")),3000)
            }
        },
        monitorReturnToSingledevice() {
          // マルチデバイス解除の通知
          this.$store.dispatch("notice/pushDisplay", {id: 2, text: 'マルチデバイスを解除しました'});
          setTimeout(() => (this.$store.dispatch("notice/pushClose")),3000)
        },
    },
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
  opacity: 0;
}
.wrapper {
  overflow-x: hidden;
  min-height: 100vh;
}

.divider {
  position: relative;
  transition: transform .25s ease-in;
  padding: 0px 0px 150px 0px;
  @include responsive(xs) {

  }
  @include responsive(sm) {
    padding: 0px 0px 150px 0px;
  }
  @include responsive(md) {
    padding: 20px 40px 150px 90px;
  }
  @include responsive(lg) {
    padding: 20px 90px 150px 90px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.container {
  margin: 0 auto;
  max-width: 1600px;
}

.noContent {
  font-size: var(--font-size-3xl);
  margin-top: -20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2em;
  text-align: center;
  color: var(--category-name);
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    margin-bottom: 30px;
  }
  @include responsive(md) {
    margin-top: 50px;
    margin-bottom: 100px;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.contentsWrapper {
  position: relative;
}

.contents {
  width: 100%;
  margin-top: 16px;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  @include responsive(md) {
    
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.content {
  width: 100%;
  max-width: 100%;
  margin-bottom: 30px;
  @include responsive(xs) {

  }
  @include responsive(sm) {
    width: auto;
  }
  @include responsive(md) {
    max-width: 90vw;
  }
  @include responsive(lg) {

  }
  @include responsive(xl) {

  }
  @include responsive(xxl) {

  }
}

.contentImage {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.info {
  width: 100%;
  position: relative;
  margin: 0 auto;
  max-width: 91vw;
  margin-top: 10px;
}

.infoText {
  max-width: calc(100% - 40px);
  
}

.name {
  font-weight: 400;
  font-size: var(--font-size-md);
  display: inline-block;
  width: 100%;
}

.time {
  margin-top: 3px;
  color: var(--site-time);
  font-size: var(--font-size-xs);
  display: flex;
  align-items: center;
}

.published {
  margin-right: 10px;
}

.updated {
  display: none;
}

.nameLink {
  text-decoration: none;
  color: var(--site-name);
  width: 100%;
}

.nameText {
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.infoButton {
  position: absolute;
  top: -5px;
  width: 32px;
  height: 32px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .25s;
}

.bookmark {
  right: 3px;
  transition: background-color .25s;
  .bookmarkImage {
    width: 15px;
    stroke: var(--favorite-icon-stroke);
    transition: stroke .25s, fill .25s;
  }
  .bookmarkRegistered {
    stroke: var(--favorite-icon);
    fill: var(--favorite-icon);
    animation-name: like;
    animation-duration: .3s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @keyframes like {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
  @include hover() {
    background-color: var(--favorite-icon-hover);
    .bookmarkImage {
      stroke: var(--favorite-icon);
    }
    .bookmarkRegistered {
      fill: var(--favorite-icon);
    }
  }
}

.comment {
  position: absolute;
  top: 36px;
  height: 18px;
  border-radius: 3px;
  padding: 0 0 1px 1px;
  background-color: var(--black-forDarkMode);
  color: var(--white-forDarkMode);
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  font-size: var(--font-size-xxs);
  
  @keyframes comment-open {
    100% {
      opacity: 1;
      
    }
  }
  .bookmark &{
    left: -10px;
    width: 60px;
  }
}

.bookmark {
  @include hover() {
    .comment {
      display: flex;
      animation-name: comment-open;
      animation-duration: .2s;
      animation-timing-function: ease;
      animation-delay: .3s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: forwards;
      animation-play-state: running;
    } 
  }
}

// 注意：createDummyContent関数内で以下のmarginの値をハードコーディングで使用しているため、
//      ここの値を変更する場合は、一緒にcreateDummyContentも変更必要（あとで直す）

@include responsive(sm) {
  .step0 {
    margin: 16px 10px;
  }
  .step1 {
    margin: 18px 12px;
  }
  .step2 {
    margin: 20px 14px;
  }
  .step3 {
    margin: 22px 16px;
  }
  .step4 {
    margin: 24px 18px;
  }
  .step5 {
    margin: 26px 20px;
  }
  .step6 {
    margin: 28px 22px;
  }
  .step7 {
    margin: 30px 24px;
  }
  .step8 {
    margin: 32px 26px;
  }
  .step9 {
    margin: 34px 28px;
  }
  .step10 {
    margin: 36px 30px;
  }
}
.moreButton {
  width: 330px;
  max-width: 90%;
  height: 50px;
  background-color: var(--more-button);
  color: var(--more-button-text);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
  @include hover() {
    background-color: var(--more-button-hover);
  }
  margin: 50px auto 0 auto;
}

.hide {
  width: 0;
  height: 0;
  display: none;
}

.button {
  user-select: none;
  cursor: pointer;
}
</style>
