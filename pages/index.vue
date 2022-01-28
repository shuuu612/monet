<template>
  <div class="wrapper" :class="getSideMenuOpen">
    <div class="loaded" :class="getLoadingDisplayed"></div>
    <Header />
    <Buttons 
    :tag="selectedTag"
    :sort="selectedSort"
    @update="update"
    />
    <MenuBar 
    :tag="selectedTag"
    :sort="selectedSort"
    />
    <SideMenu
    :tag="tag"
    :selectedtag="analyzedSelectedTag"
    />
    <!-- <Search /> -->
    <ScrollTop />
    <Notice />
    <div id="divider" class="divider">
      <div v-cloak class="container">
        
        <div class="contentsWrapper">
          <Order
          :tag="selectedTag"
          :sort="selectedSort"
          />
          <div v-if="getNoContentComment.length > 0" class="noContent" style="white-space: pre-wrap;" v-text="getNoContentComment"></div>
          <div id="contents" class="contents">
            <div v-for="(content, index) in getDisplayingContent" :key="content.id" class="content" :class="getStateSliderStep">
              <div class="contentImage" :style="infoStyle">
                <a :href="`${content.url}`" target="_blank" rel="noopener noreferrer" class="images">
                  <img v-if="getPcHide" class="image" :src="`${content.imagePC.url}?w=${Math.round(873*getStateSliderSize)}`" :alt="`${content.name}`" :class="getMargin('pc')" :style="getMaxWidth('pc')" loading="lazy" @load="contentSizeChange(index)">
                  <img v-if="getTbHide" class="image" :src="`${content.imageTB.url}?w=${Math.round(600*getStateSliderSize)}`" :alt="`${content.name}`" :class="getMargin('tb')" :style="getMaxWidth('tb')" loading="lazy" @load="contentSizeChange(index)">
                  <img v-if="getSpHide" class="image" :src="`${content.imageSP.url}?w=${Math.round(369*getStateSliderSize)}`" :alt="`${content.name}`" :class="getMargin('sp')" :style="getMaxWidth('sp')" loading="lazy" @load="contentSizeChange(index)">
                </a>
              </div>
              <div class="modal" :class="getActiveModal(content.id)" @click="closeModal">
                <div class="modalContent" @click.stop>
                  <div class="modalButton button" @click="closeModal">
                    <span class="modalBar"></span>
                    <span class="modalBar"></span>
                  </div>
                  <div class="modalImageWrapper">
                    <img class="modalImage" :src="`${content.imagePC.url}?w=1200`" :alt="`${content.name}`" loading="lazy">
                  </div>
                  <div class="modalInfoWrapper" :style="modalInfoStyle">
                    <div class="modalName">{{content.name}}</div>
                    <div class="modalTimes">
                      <div class="modalTime">
                        <img class="modalTimeImage" src="/images/published.svg" alt="published">
                        <div>{{content.publishedAtJST}}</div>
                      </div>
                      <div v-if="content.updatedAtJST !== undefined &&  content.updatedAtJST !== content.publishedAtJST" class="modalTime">
                        <img class="modalTimeImage" src="/images/updated.svg" alt="updated">
                        <div>{{content.updatedAtJST}}</div>
                      </div>
                    </div>
                    <div class="modalTag">
                      <div class="modalTagTitle">タグ</div>
                      <div class="modalTagContents">
                        <div v-for="item in content.type" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/type=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.industry" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/industry=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.impression" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/impression=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.layout" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/layout=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.color" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/color=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.pickup" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/pickup=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.technique" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/technique=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                        <div v-for="item in content.technology" :key="item.id" class="modalTagContent">
                          <nuxt-link :to="`/tag/technology=${item.id}*and`" class="modalTagLink button">
                            <!-- <img class="modalTagImg" src="/images/tag.svg" alt="tag" /> -->
                            <div class="modalTagName">#{{item.name}}</div>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                </div>
              </div>
              <div class="info" :style="infoStyle">
                <div class="infoText" :style="infoButtonStyle">
                  <div class="name">
                    <a :href="`${content.url}`" target="_blank" rel="noopener noreferrer" class="nameLink">
                      {{content.name}}
                    </a>
                  </div>
                  <div class="time">
                    <div class="elapsed">{{content.elapsedDate}}</div>
                    <div class="published">{{'追加日 '+content.publishedAtJST}}</div>
                    <div class="updated">{{content.updatedAtJST !== undefined &&  content.updatedAtJST !== content.publishedAtJST? '更新日 '+content.updatedAtJST : ''}}</div>
                  </div>
                </div>
                <button class="infoButton detail" @click="openModal(content.id)">
                  <!-- <svg class="detailImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 36" fill="#333333">
                    <circle cx="18" cy="18" r="18"/>
                    <circle cx="86" cy="18" r="18"/>
                    <circle cx="154" cy="18" r="18"/>
                  </svg> -->
                  <svg class="detailImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.69 425.69" fill="#333333">
                    <path d="M255.61,165.44H203.18V113a18.88,18.88,0,0,0-37.75,0v52.44H113a18.88,18.88,0,1,0,0,37.75h52.42v52.43a18.88,18.88,0,0,0,37.75,0V203.19h52.43a18.88,18.88,0,1,0,0-37.75Z"/>
                    <path d="M416.48,372l-81.67-81.66a183.05,183.05,0,0,0,33.8-106C368.61,82.69,285.93,0,184.31,0S0,82.69,0,184.31,82.68,368.62,184.31,368.62a183.13,183.13,0,0,0,106-33.8L372,416.47A31.46,31.46,0,1,0,416.48,372ZM37.75,184.31c0-80.82,65.75-146.56,146.56-146.56s146.55,65.74,146.55,146.56S265.12,330.87,184.31,330.87,37.75,265.13,37.75,184.31Z"/>
                  </svg>
                  <div class="comment">詳細</div>
                </button>
                <button class="infoButton bookmark" @click="setBookmark(content.id)">
                  <!-- <svg class="bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 179">
                    <polygon :class="getAddedBookmark(content.id)" points="72 117.13 8 163.35 8 8 136 8 136 163.35 72 117.13" fill="#fff"/>
                    <path class="bookmarkRegistered" d="M128,16V147.71L81.37,114,72,107.26,62.63,114,16,147.71V16H128M138,0H6A6,6,0,0,0,0,6V179l72-52,72,52V6a6,6,0,0,0-6-6Z" fill="#333333"/>
                  </svg> -->
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
        <div class="moreButton button" :class="getNextContent" @click="setDisplayingContent">
          もっと見る（残り{{remainingContent}}サイト）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { backfaceFixed } from '../utils/backfaceFixed';
export default {
    async asyncData({ params, $microcms }) {
        // タグページ用
        const selectedTag = params.tagId;
        // 並び替え用
        const selectedSort = params.sortId;
        let order = "";
        if (selectedSort === "new") {
            order = "-publishedAt";
        }
        else if (selectedSort === "old") {
            order = "publishedAt";
        }
        else if (selectedSort === "popular") {
            order = "view";
        }
        else if (selectedSort === "update") {
            order = "-updatedAt";
        }
        else {
            order = "-publishedAt";
        }
        const apiOrder = order;
        // 取得するデータ数（全データを取得できること）
        const apiLimit = 1000;
        // 非表示またはリンク切れにチェックが入っているコンテンツは表示しない
        const apiFilters = "hide[equals]false[and]link[equals]false";
        // API通信
        console.log("Start API communication");
        const data = await $microcms.get({
            endpoint: "site",
            queries: {
                limit: apiLimit,
                orders: apiOrder,
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
            /* const hour = publishedDate.getHours();
            const minutes = publishedDate.getMinutes();
            const second = publishedDate.getSeconds(); */
            /* const formatDate = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0") + " " + hour.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + second.toString().padStart(2, "0"); */
            const formatDate = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
            content.publishedAtJST = formatDate;
            const updatedDate = new Date(content.updatedAt);
            if (String(publishedDate) === String(updatedDate)) {
                content.updatedAtJST = undefined;
            }
            else {
                const year = updatedDate.getFullYear();
                const month = updatedDate.getMonth() + 1;
                const day = updatedDate.getDate();
                /* const hour = updatedDate.getHours();
                const minutes = updatedDate.getMinutes();
                const second = updatedDate.getSeconds(); */
                /* const formatDate = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0") + " " + hour.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + second.toString().padStart(2, "0"); */
                const formatDate = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
                content.updatedAtJST = formatDate;
            }
            const nowDate = new Date();
            const elapsedDate = nowDate.getTime() - publishedDate.getTime();
            const elapsedSeconds = Math.floor(elapsedDate / 1000);
            const elapsedMinites = Math.floor(elapsedDate / 60000);
            const elapsedHour = Math.floor(elapsedDate / 3600000);
            const elapsedDay = Math.floor(elapsedDate / 86400000);
            const elapsedWeek = Math.floor(elapsedDate / 86400000 / (365 / 12 / 4));
            const elapsedMonth = Math.floor(elapsedDate / 86400000 / (365 / 12));
            const elapsedYear = Math.floor(elapsedDate / 86400000 / 365);
            if (Math.floor(elapsedSeconds < 60)) {
                content.elapsedDate = elapsedSeconds + "秒前";
            }
            else if (elapsedMinites < 60) {
                content.elapsedDate = elapsedMinites + "分前";
            }
            else if (elapsedHour < 24) {
                content.elapsedDate = elapsedHour + "時間前";
            }
            else if (elapsedDay < 14) {
                content.elapsedDate = elapsedDay + "日前";
            }
            else if (elapsedWeek < 5) {
                content.elapsedDate = elapsedWeek + "週間前";
            }
            else if (elapsedMonth < 12) {
                content.elapsedDate = elapsedMonth + "か月前";
            }
            else {
                content.elapsedDate = elapsedYear + "年前";
            }
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
        const tag = {
            type,
            industry,
            impression,
            layout,
            color,
            pickup,
            technique,
            technology,
        };
        return {
            ...data,
            tag,
            selectedTag,
            selectedSort,
        };
    },
    data() {
        return {
            dummy: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            dummyStyle: {},
            observer: undefined,
            availableSizes: undefined,
            data: {},
            searchTags: [],
            searchKeyword: [],
            searchMultiple: [],
            displayingContent: [],
            displayingLimit: 10,
            displayingPageTags: 0,
            displayingPageKeyword: 0,
            displayingPageMultiple: 0,
            remainingContent: 0,
            activeSearch: false,
            activeMultiple: false,
            displayingJpName: "",
            tagsJpName: "",
            multipleJpName: "",
            infoStyle: {
                width: "",
            },
            infoButtonStyle: {
                width: "",
            },
            imageStyle: {
                width: "",
            },
            imagePcStyle: {
                maxWidth: "",
            },
            imageTbStyle: {
                maxWidth: "",
            },
            imageSpStyle: {
                maxWidth: "",
            },
            modalStyle: {
                width: "",
            },
            modalInfoStyle: {
                height: "",
            },
            activeModal: [],
            updatedFlg: false,
            visit: "",
            analyzedSelectedTag: {
                type: [],
                industry: [],
                impression: [],
                layout: [],
                color: [],
                pickup: [],
                technique: [],
                technology: [],
            },
            darkmode: "",
        };
    },
    head() {
        return {
            htmlAttrs: {
                class: this.darkmode
            }
        };
    },
    computed: {
        /* getPcHide() {
            return { hide: !this.$store.getters["devicePattern/getActivePC"] };
        },
        getTbHide() {
            return { hide: !this.$store.getters["devicePattern/getActiveTB"] };
        },
        getSpHide() {
            return { hide: !this.$store.getters["devicePattern/getActiveSP"] };
        }, */
        getPcHide() {
            return this.$store.getters["devicePattern/getActivePC"];
        },
        getTbHide() {
            return this.$store.getters["devicePattern/getActiveTB"];
        },
        getSpHide() {
            return this.$store.getters["devicePattern/getActiveSP"];
        },
        getStateSliderSize() {
            return this.$store.getters["slider/getValue"];
        },
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
        getMargin() {
            return function (id) {
                const pattern = this.$store.getters["devicePattern/getStatePatternNumber"];
                if (pattern === 1 || pattern === 2 || pattern === 3) {
                    return { marginRight: false };
                }
                else if (pattern === 4) {
                    if (id === "pc") {
                        return { marginRight: true };
                    }
                    else if (id === "tb") {
                        return { marginRight: true };
                    }
                    else if (id === "sp") {
                        return { marginRight: false };
                    }
                    else {
                        console.log("Unexpected route");
                    }
                }
                else if (pattern === 5 || pattern === 6) {
                    if (id === "pc") {
                        return { marginRight: true };
                    }
                    else if (id === "tb") {
                        return { marginRight: false };
                    }
                    else if (id === "sp") {
                        return { marginRight: false };
                    }
                    else {
                        console.log("Unexpected route");
                    }
                }
                else if (pattern === 7) {
                    if (id === "pc") {
                        return { marginRight: false };
                    }
                    else if (id === "tb") {
                        return { marginRight: true };
                    }
                    else if (id === "sp") {
                        return { marginRight: false };
                    }
                    else {
                        console.log("Unexpected route");
                    }
                }
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
            if (!this.activeSearch) {
                // キーワード検索以外
                if (this.searchTags.length === 0) {
                    if (this.displayingJpName === "お気に入り") {
                        return "お気に入りは登録されていません";
                    }
                    else {
                        return `「${this.displayingJpName}」はただいま準備中です。\n公開まで今しばらくお待ちください。`;
                    }
                }
                else {
                    return this.displayingJpName;
                }
            }
            else if (this.activeSearch) {
                // キーワード検索
                if (this.searchKeyword.length === 0) {
                    return "一致する検索結果はありません";
                }
                else {
                    return "";
                }
            }
            else {
                return "";
            }
        },
        getActiveModal() {
            return function (id) {
                return { activeModal: this.activeModal.includes(id) };
            };
        },
        getLoadingDisplayed() {
            return { loading: !this.$store.getters["loaded/getLoadingDisplayed"] };
        },
        getSideMenuOpen() {
            return { sideMenuOpen: this.$store.getters["sideMenu/getOpen"] };
        },
        getDisplayingContent() {
            console.log("getDisplayingContent", this.displayingContent);
            return this.displayingContent;
        },
        getMaxWidth() {
            return function (key) {
                // コンテンツのmax-widthを設定
                const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
                const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
                let maxWidthPc;
                let maxWidthTb;
                let maxWidthSp;
                if (windowWidth < 576 && this.$store.getters["slider/getAutoSizing"]) {
                    switch (devicePattern) {
                        case 1:
                        case 2:
                        case 3:
                            maxWidthPc = "";
                            maxWidthTb = "";
                            maxWidthSp = "";
                            break;
                        case 4: // PC & TB & SP
                            maxWidthPc = `${873 / (873 + 10 + 600 + 10 + 369) * 100 * 0.97}%`;
                            maxWidthTb = `${600 / (873 + 10 + 600 + 10 + 369) * 100 * 0.97}%`;
                            maxWidthSp = `${369 / (873 + 10 + 600 + 10 + 369) * 100 * 0.97}%`;
                            break;
                        case 5: // PC & TB
                            maxWidthPc = `${873 / (873 + 10 + 600) * 100 * 0.978}%`;
                            maxWidthTb = `${600 / (873 + 10 + 600) * 100 * 0.978}%`;
                            maxWidthSp = "";
                            break;
                        case 6: // PC & SP
                            maxWidthPc = `${873 / (873 + 10 + 369) * 100 * 0.975}%`;
                            maxWidthTb = "";
                            maxWidthSp = `${369 / (873 + 10 + 369) * 100 * 0.975}%`;
                            break;
                        case 7: // TB & SP
                            maxWidthPc = "";
                            maxWidthTb = `${600 / (600 + 10 + 369) * 100 * 0.97}%`;
                            maxWidthSp = `${369 / (600 + 10 + 369) * 100 * 0.97}%`;
                            break;
                    }
                }
                else {
                    maxWidthPc = "";
                    maxWidthTb = "";
                    maxWidthSp = "";
                }
                if (key === "pc")
                    return { maxWidth: maxWidthPc };
                else if (key === "tb")
                    return { maxWidth: maxWidthTb };
                else if (key === "sp")
                    return { maxWidth: maxWidthSp };
            };
        },
    },
    created() {
        console.log("selectedTag");
    },
    mounted() {
        // ダークモードの変更を監視
        this.$store.watch(() => this.$store.getters["darkmode/getActive"], (value) => {
            if (value) {
                this.darkmode = this.$store.getters["darkmode/getHtmlClass"];
            }
            else {
                this.darkmode = "";
            }
        });
        console.log("mounted");
        // ローカルストレージの取得
        if (window.localStorage) {
            this.getLocalStorage();
        }
        else {
            console.log("ブラウザのローカルストレージがオフになっています。");
        }
        // コンテンツ表示処理
        this.setSearchTags();
        this.setDisplayingContent();
        // 読み込み完了を監視
        window.addEventListener("load", this.loadProcess);
        // ブラウザサイズの変更を監視
        window.addEventListener("resize", this.resizeProcess);
        // コンテンツのサイズ変更を監視
        /* this.setResizeObserver(); */
        // スクロールを監視
        window.addEventListener("scroll", this.scrolledWindow);
        // ローディング画面を終了させる
        window.setTimeout(this.setLoaded, 1500);
        // 検索キーワードの入力を監視
        this.$store.watch(() => this.$store.getters["search/getKeyword"], (value) => {
            this.setSearchKeyword(value);
        });
        // 複数選択タブのタグ選択を監視
        this.$store.watch(() => this.$store.getters["multipleSelect/getContents"], (value) => {
            this.setSearchTags(value);
        }, { deep: true });
        // 複数選択タブの決定キー押下を監視
        this.$store.watch(() => this.$store.getters["multipleSelect/getStart"], (value) => {
            if (value) {
                this.setDisplayingContent("multiple");
                this.$store.dispatch("multipleSelect/pushStart");
            }
        });
        // 自動調整オンを監視
        this.$store.watch(() => this.$store.getters["slider/getAutoSizing"], (value) => {
            if (value) {
                this.calculateAutoSizing();
            }
        });
        // デバイス切り替えを監視（imageのloadイベントでは非表示を検知できないため）
        this.$store.watch(() => this.$store.getters["devicePattern/getStatePatternNumber"], () => {
            this.createDummyContent();
            this.calculateAutoSizing();
        });
        window.matchMedia("(min-width:375px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:500px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:576px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:768px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:900px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:992px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1100px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1200px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1300px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1400px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1500px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1600px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1700px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1800px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1900px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:2000px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:2100px)").addEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:2200px)").addEventListener("change", this.calculateAutoSizing);
    },
    updated() {
        console.log("updated");
        // 「もっと見る」で表示件数を増やした時にダミーコンテンツを更新するタイミングがupdata以外にない
        /* if (!this.updatedFlg) {
            this.$nextTick(() => {
                this.resizeProcess();
            });
        }
        this.updatedFlg = !this.updatedFlg; */
    },
    beforeDestroy() {
        console.log("beforeDestroy");
        window.removeEventListener("load", this.loadProcess);
        window.removeEventListener("resize", this.resizeProcess);
        window.removeEventListener("scroll", this.scrolledWindow);
        /* this.observer.disconnect(); */
        window.matchMedia("(min-width:375px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:500px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:576px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:768px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:900px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:992px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1100px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1200px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1300px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1400px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1500px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1600px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1700px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1800px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:1900px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:2000px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:2100px)").removeEventListener("change", this.calculateAutoSizing);
        window.matchMedia("(min-width:2200px)").removeEventListener("change", this.calculateAutoSizing);
    },
    methods: {
        createDummyContent() {
            console.log("createDummyContentを実行");
            // 実行タイミング：デバイスの変更、コンテンツサイズの変更
            /* const contents = document.getElementById("contents"); */
            /* const viewWidth = contents.clientWidth; // 表示領域全体の幅 */
            const imageMaxWidth = this.$store.getters["devicePattern/getStatePatternMaxWidth"];
            const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
            const value = this.$store.getters["slider/getValue"];
            const sliderSteps = this.$store.getters["slider/getSteps"];
            const sliderStep = sliderSteps.indexOf(true); // 現在のスライダーステップ
            const marginLeftRight = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
            let width = Math.round(imageMaxWidth * value);
            switch (devicePattern) {
                case 4:
                    width = width + 20;
                    break;
                case 5:
                case 6:
                case 7:
                    width = width + 10;
                    break;
            }
            const marginLeft = marginLeftRight[sliderStep];
            const marginRight = marginLeftRight[sliderStep];
            /* const totalWidth = width + marginRight + marginLeft; // コンテンツ１つ辺りの幅（マージン含む）
            const columnContent = Math.floor(viewWidth / totalWidth); // １カラム内のコンテンツ数
            const contentQuantity = this.displayingContent.length; // １ページ内のコンテンツ数 */
            // ダミーコンテンツ作成
            /* this.dummy.length = 0;
            if (contentQuantity % columnContent !== 0 && contentQuantity > columnContent) {
                for (let i = 0; i < columnContent - (contentQuantity % columnContent); i++) {
                    this.$set(this.dummy, i, i);
                }
            } */
            this.dummy.splice();
            // ダミーコンテンツのスタイル設定
            this.dummyStyle.width = `${width}px`;
            this.dummyStyle.height = `0px`;
            this.dummyStyle.marginTop = `0px`;
            this.dummyStyle.marginBottom = `0px`;
            this.dummyStyle.marginRight = `${marginRight}px`;
            this.dummyStyle.marginLeft = `${marginLeft}px`;
            // info領域の大きさを設定
            const infoWidth = width - 75;
            this.infoStyle.width = `${width}px`;
            this.infoButtonStyle.width = `${infoWidth}px`;
        },
        calculateAutoSizing() {
            // 実行タイミング：createDummyContentのタイミング＋自動調整オンを押下、ウィンドウサイズが規定のサイズに達したとき、
            const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
            const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
            if (!this.$store.getters["slider/getAutoSizing"])
                return;
            console.log("calculateAutoSizingを実行");
            // コンテンツサイズ自動調整用の値を算出
            let sliderStep;
            switch (devicePattern) {
                case 1: // PC
                    if (windowWidth < 375) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 3;
                    }
                    else {
                        sliderStep = 3;
                    }
                    break;
                case 2: // TB
                    if (windowWidth < 375) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 6;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 6;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 4;
                    }
                    else {
                        sliderStep = 5;
                    }
                    break;
                case 3: // SP
                    if (windowWidth < 375) {
                        sliderStep = 7;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 8;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 6;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 7;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 8;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 8;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 8;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 8;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 8;
                    }
                    else {
                        sliderStep = 8;
                    }
                    break;
                case 4: // PC & TB & SP
                    if (windowWidth < 375) {
                        sliderStep = 0;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 0;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 1;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1600) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1700) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1800) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1900) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 2000) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 2100) {
                        sliderStep = 2;
                    }
                    else {
                        sliderStep = 3;
                    }
                    break;
                case 5: // PC & TB
                    if (windowWidth < 375) {
                        sliderStep = 0;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 1;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1600) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 1700) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 1800) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1900) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 2000) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 2100) {
                        sliderStep = 4;
                    }
                    else {
                        sliderStep = 4;
                    }
                    break;
                case 6: // PC & SP
                    if (windowWidth < 375) {
                        sliderStep = 1;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1600) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1700) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 1800) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1900) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 2000) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 2100) {
                        sliderStep = 4;
                    }
                    else {
                        sliderStep = 3;
                    }
                    break;
                case 7: // TB & SP
                    if (windowWidth < 375) {
                        sliderStep = 2;
                    }
                    else if (windowWidth < 576) {
                        sliderStep = 3;
                    }
                    else if (windowWidth < 768) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 900) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 992) {
                        sliderStep = 6;
                    }
                    else if (windowWidth < 1100) {
                        sliderStep = 6;
                    }
                    else if (windowWidth < 1200) {
                        sliderStep = 6;
                    }
                    else if (windowWidth < 1300) {
                        sliderStep = 7;
                    }
                    else if (windowWidth < 1400) {
                        sliderStep = 7;
                    }
                    else if (windowWidth < 1500) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1600) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 1700) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1800) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 1900) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 2000) {
                        sliderStep = 5;
                    }
                    else if (windowWidth < 2100) {
                        sliderStep = 4;
                    }
                    else if (windowWidth < 2200) {
                        sliderStep = 4;
                    }
                    else {
                        sliderStep = 5;
                    }
                    break;
            }
            const value = 0.25 + sliderStep * 0.075;
            // 自動調整用の値をstoreに設定
            this.$store.dispatch("slider/pushAptitudeValue", value);
        },
        loadProcess() {
            console.log("loadProcessを起動");
            // ロード済みフラグの設定（ResizeObserver用）
            this.$store.dispatch("loaded/pushLoaded");
            // ダミーコンテンツの作成
            this.createDummyContent();
            // モーダルの大きさを設定
            /* this.modalSizing(); */
            this.setWindowSize();
            this.calculateAutoSizing();
        },
        resizeProcess() {
            this.setWindowSize();
            this.setAutoSizing();
        },
        contentSizeChange(value) {
            if (this.$store.getters["loaded/getLoaded"]) {
                if (value === 0 || value === undefined) {
                    // コンテンツ自動調整
                    this.calculateAutoSizing();
                    this.createDummyContent();
                }
            }
        },
        setResizeObserver() {
            const elementAll = document.getElementsByClassName("content");
            const element = elementAll[0];
            this.observer = new ResizeObserver(() => {
                console.log("ResizeObserverを起動前");
                if (this.$store.getters["loaded/getLoaded"]) {
                    console.log("ResizeObserverを起動");
                    this.resizeProcess();
                }
            });
            if (element) {
                this.observer.observe(element);
            }
        },
        setBookmark(id) {
            if (!window.localStorage) {
                alert("ブラウザのローカルストレージ設定がオフになっています。"); // 変更要
            }
            this.$store.dispatch("bookmark/pushBookmark", id);
        },
        setSearchTags(multipleContent) {
            console.log("setSearchTagsを起動");
            if (this.selectedTag === undefined && multipleContent === undefined) {
                this.searchTags = this.contents;
                return;
            }
            // 例）tag/type=ecsite_portfolio*industry=design*and
            // 例）tag/type=ecsite%portfolio*industry=design*and
            // store取得
            const bookmarkContent = this.$store.getters["bookmark/getBookmark"];
            let type = [];
            let industry = [];
            let impression = [];
            let layout = [];
            let color = [];
            let pickup = [];
            let technique = [];
            let technology = [];
            let condition = "";
            let bookmark = false;
            let filterContents;
            if (multipleContent !== undefined) {
                type = multipleContent.type;
                industry = multipleContent.industry;
                impression = multipleContent.impression;
                layout = multipleContent.layout;
                color = multipleContent.color;
                pickup = multipleContent.pickup;
                technique = multipleContent.technique;
                technology = multipleContent.technology;
                condition = multipleContent.condition;
            }
            else {
                // URLを解析
                const tagTypes = this.selectedTag.split("*");
                // tagTypes = ['type=ecsite_portfolio','industry=design']
                tagTypes.forEach(function (item) {
                    const temp = item.split("=");
                    // temp = ['type','ecsite*portfolio']
                    if (temp[0] === "type") {
                        const typeTemp = temp[1];
                        type = typeTemp.split("%");
                        // type = 'ecsite*portfolio'
                    }
                    else if (temp[0] === "industry") {
                        const industryTemp = temp[1];
                        industry = industryTemp.split("%");
                    }
                    else if (temp[0] === "impression") {
                        const impressionTemp = temp[1];
                        impression = impressionTemp.split("%");
                    }
                    else if (temp[0] === "layout") {
                        const layoutTemp = temp[1];
                        layout = layoutTemp.split("%");
                    }
                    else if (temp[0] === "color") {
                        const colorTemp = temp[1];
                        color = colorTemp.split("%");
                    }
                    else if (temp[0] === "pickup") {
                        const pickupTemp = temp[1];
                        pickup = pickupTemp.split("%");
                    }
                    else if (temp[0] === "technique") {
                        const techniqueTemp = temp[1];
                        technique = techniqueTemp.split("%");
                    }
                    else if (temp[0] === "technology") {
                        const technologyTemp = temp[1];
                        technology = technologyTemp.split("%");
                    }
                    else if (temp[0] === "bookmark") {
                        bookmark = true;
                    }
                    else if (temp[0] === "and") {
                        condition = "and";
                    }
                    else if (temp[0] === "or") {
                        condition = "or";
                    }
                });
                // サイドメニュー用に現在表示中のタグを退避
                this.analyzedSelectedTag.type = type;
                this.analyzedSelectedTag.industry = industry;
                this.analyzedSelectedTag.impression = impression;
                this.analyzedSelectedTag.layout = layout;
                this.analyzedSelectedTag.color = color;
                this.analyzedSelectedTag.pickup = pickup;
                this.analyzedSelectedTag.technique = technique;
                this.analyzedSelectedTag.technology = technology;
            }
            // フィルター処理
            if (bookmark) {
                // ブックマークでフィルター
                filterContents = this.contents.filter(function (value) {
                    return bookmarkContent.includes(value.id);
                });
            }
            else {
                // タグでフィルター
                filterContents = this.contents.filter(function (value) {
                    let matchType = 0;
                    let matchIndustry = 0;
                    let matchImpression = 0;
                    let matchLayout = 0;
                    let matchColor = 0;
                    let matchPickup = 0;
                    let matchTechnique = 0;
                    let matchTechnology = 0;
                    let countType = 0;
                    let countIndustry = 0;
                    let countImpression = 0;
                    let countLayout = 0;
                    let countColor = 0;
                    let countPickup = 0;
                    let countTechnique = 0;
                    let countTechnology = 0;
                    type.forEach(function (item) {
                        if (value.type.find(data => data.id === item)) {
                            matchType++;
                        }
                        countType++;
                    });
                    industry.forEach(function (item) {
                        if (value.industry.find(data => data.id === item)) {
                            matchIndustry++;
                        }
                        countIndustry++;
                    });
                    impression.forEach(function (item) {
                        if (value.impression.find(data => data.id === item)) {
                            matchImpression++;
                        }
                        countImpression++;
                    });
                    layout.forEach(function (item) {
                        if (value.layout.find(data => data.id === item)) {
                            matchLayout++;
                        }
                        countLayout++;
                    });
                    color.forEach(function (item) {
                        if (value.color.find(data => data.id === item)) {
                            matchColor++;
                        }
                        countColor++;
                    });
                    pickup.forEach(function (item) {
                        if (value.pickup.find(data => data.id === item)) {
                            matchPickup++;
                        }
                        countPickup++;
                    });
                    technique.forEach(function (item) {
                        if (value.technique.find(data => data.id === item)) {
                            matchTechnique++;
                        }
                        countTechnique++;
                    });
                    technology.forEach(function (item) {
                        if (value.technology.find(data => data.id === item)) {
                            matchTechnology++;
                        }
                        countTechnology++;
                    });
                    let match;
                    if (condition === "and") {
                        if ((matchType > 0 ||
                            matchIndustry > 0 ||
                            matchImpression > 0 ||
                            matchLayout > 0 ||
                            matchColor > 0 ||
                            matchPickup > 0 ||
                            matchTechnique > 0 ||
                            matchTechnology > 0) &&
                            matchType === countType &&
                            matchIndustry === countIndustry &&
                            matchImpression === countImpression &&
                            matchLayout === countLayout &&
                            matchColor === countColor &&
                            matchPickup === countPickup &&
                            matchTechnique === countTechnique &&
                            matchTechnology === countTechnology) {
                            match = true;
                        }
                    }
                    else if (condition === "or") {
                        if (matchType > 0 ||
                            matchIndustry > 0 ||
                            matchImpression > 0 ||
                            matchLayout > 0 ||
                            matchColor > 0 ||
                            matchPickup > 0 ||
                            matchTechnique > 0 ||
                            matchTechnology > 0) {
                            match = true;
                        }
                    }
                    else {
                        console.log("AND/OR条件が設定されていません");
                    }
                    if (match) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
            // タグIDを日本語に変換する
            let allTag = [];
            let changeJp = [];
            if (bookmark) {
                changeJp[0] = "お気に入り";
            }
            else {
                if (type.length > 0) {
                    const newType = this.tag.type.contents.filter(function (item) {
                        return type.includes(item.id);
                    });
                    allTag = allTag.concat(newType);
                }
                if (industry.length > 0) {
                    const newIndustry = this.tag.industry.contents.filter(function (item) {
                        return industry.includes(item.id);
                    });
                    allTag = allTag.concat(newIndustry);
                }
                if (impression.length > 0) {
                    const newImpression = this.tag.impression.contents.filter(function (item) {
                        return impression.includes(item.id);
                    });
                    allTag = allTag.concat(newImpression);
                }
                if (layout.length > 0) {
                    const newLayout = this.tag.layout.contents.filter(function (item) {
                        return layout.includes(item.id);
                    });
                    allTag = allTag.concat(newLayout);
                }
                if (color.length > 0) {
                    const newColor = this.tag.color.contents.filter(function (item) {
                        return color.includes(item.id);
                    });
                    allTag = allTag.concat(newColor);
                }
                if (pickup.length > 0) {
                    const newPickup = this.tag.pickup.contents.filter(function (item) {
                        return pickup.includes(item.id);
                    });
                    allTag = allTag.concat(newPickup);
                }
                if (technique.length > 0) {
                    const newTechnique = this.tag.technique.contents.filter(function (item) {
                        return technique.includes(item.id);
                    });
                    allTag = allTag.concat(newTechnique);
                }
                if (technology.length > 0) {
                    const newTechnology = this.tag.technology.contents.filter(function (item) {
                        return technology.includes(item.id);
                    });
                    allTag = allTag.concat(newTechnology);
                }
                changeJp = allTag.map(item => item.name);
            }
            if (multipleContent !== undefined) {
                this.searchMultiple = filterContents;
                this.$store.dispatch("multipleSelect/pushHit", this.searchMultiple.length);
                this.multipleJpName = changeJp.join(" + ");
            }
            else {
                this.searchTags = filterContents;
                this.tagsJpName = changeJp.join(" + ");
            }
        },
        setDisplayingContent(id) {
            console.log("setDisplayingContentを起動");
            // 表示件数を増やす
            if (id === "keyword") {
                // キーワードで検索した結果を表示
                this.displayingPageKeyword = this.displayingPageKeyword + 1;
                const start = 0;
                const end = start + (this.displayingPageKeyword * this.displayingLimit);
                this.displayingContent = this.searchKeyword.slice(start, end);
                this.remainingContent = this.searchKeyword.length - this.displayingContent.length;
                this.displayingJpName = "";
            }
            else if (id === "multiple") {
                // 複数選択で検索した結果を表示
                this.displayingPageMultiple = this.displayingPageMultiple + 1;
                const start = 0;
                const end = start + (this.displayingPageMultiple * this.displayingLimit);
                this.displayingContent = this.searchMultiple.slice(start, end);
                this.remainingContent = this.searchMultiple.length - this.displayingContent.length;
                this.displayingJpName = this.multipleJpName;
            }
            else {
                // タグで検索した結果を表示
                this.displayingPageTags = this.displayingPageTags + 1;
                const start = 0;
                const end = start + (this.displayingPageTags * this.displayingLimit);
                /* this.displayingContent = this.searchTags.slice(start, end); */
                if (this.displayingContent.length === 0) {
                    console.log("1");
                    console.log("this.searchTags", this.searchTags);
                    this.displayingContent = this.searchTags.slice(start, end);
                    console.log(this.displayingContent);
                }
                else {
                    console.log("2");
                    console.log("this.searchTags", this.searchTags);
                    this.displayingContent.length = 0;
                    for (let i = 0; i < this.searchTags.slice(start, end).length; i++) {
                        this.$set(this.displayingContent, i, this.searchTags.slice(start, end)[i]);
                    }
                    this.displayingContent.splice();
                    console.log(this.displayingContent);
                }
                this.remainingContent = this.searchTags.length - this.displayingContent.length;
                this.displayingJpName = this.tagsJpName;
            }
        },
        getLocalStorage() {
            // 初回読み込み時にローカルストレージのデータをstoreに取り込み
            // ブックマーク
            console.log("初回読み込み時のローカルストレージアクセス");
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
        },
        openModal(id) {
            this.activeModal.push(id);
            this.modalInfoSizing();
            this.$store.dispatch("modal/pushOpen");
            backfaceFixed(true);
        },
        closeModal() {
            this.activeModal.length = 0;
            this.activeModal.splice();
            this.$store.dispatch("modal/pushOpen");
            backfaceFixed(false);
        },
        /* modalSizing() {
            // 表示領域（サイドバーを除く）を算出
            const divider = document.getElementById("divider");
            const width = divider.clientWidth;
            this.modalStyle.width = `${width}px`;
        }, */
        setLoaded() {
            this.$store.dispatch("loaded/pushLoadingDisplayed");
        },
        setSearchKeyword(key) {
            // キーワードを一度入力してから削除したとき
            if (key.length === 0) {
                this.setDisplayingContent();
                return;
            }
            // キーワードでフィルター（大文字・小文字・ひらがな・カタカナを区別しない）
            const searchFuzzy = this.contents.filter(function (content) {
                // 検索対象を抽出
                const name = content.name !== undefined ? content.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
                const url = content.url !== undefined ? content.url.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
                const typeId = content.type.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const typeName = content.type.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const industryId = content.industry.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const industryName = content.industry.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const impressionId = content.impression.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const impressionName = content.impression.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const layoutId = content.layout.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const layoutName = content.layout.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const colorId = content.color.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const colorName = content.color.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const pickupId = content.pickup.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const pickupName = content.pickup.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const techniqueId = content.technique.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const techniqueName = content.technique.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const technologyId = content.technology.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const technologyName = content.technology.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const keyword = content.keyword !== undefined ? content.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
                const lowerKey = key.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                // 一致判定
                const result = name.length !== 0 ? name.includes(lowerKey) : false ||
                    url.length !== 0 ? url.includes(lowerKey) : false ||
                    typeId.length !== 0 ? typeId.includes(lowerKey) : false ||
                    typeName.length !== 0 ? typeName.includes(lowerKey) : false ||
                    industryId.length !== 0 ? industryId.includes(lowerKey) : false ||
                    industryName.length !== 0 ? industryName.includes(lowerKey) : false ||
                    impressionId.length !== 0 ? impressionId.includes(lowerKey) : false ||
                    impressionName.length !== 0 ? impressionName.includes(lowerKey) : false ||
                    layoutId.length !== 0 ? layoutId.includes(lowerKey) : false ||
                    layoutName.length !== 0 ? layoutName.includes(lowerKey) : false ||
                    colorId.length !== 0 ? colorId.includes(lowerKey) : false ||
                    colorName.length !== 0 ? colorName.includes(lowerKey) : false ||
                    pickupId.length !== 0 ? pickupId.includes(lowerKey) : false ||
                    pickupName.length !== 0 ? pickupName.includes(lowerKey) : false ||
                    techniqueId.length !== 0 ? techniqueId.includes(lowerKey) : false ||
                    techniqueName.length !== 0 ? techniqueName.includes(lowerKey) : false ||
                    technologyId.length !== 0 ? technologyId.includes(lowerKey) : false ||
                    technologyName.length !== 0 ? technologyName.includes(lowerKey) : false ||
                    keyword.length !== 0 ? keyword.includes(lowerKey) : false;
                return result;
            });
            this.searchKeyword = searchFuzzy;
            this.setDisplayingContent("keyword");
            this.activeSearch = true;
        },
        scrolledWindow() {
            const scroll = window.pageYOffset;
            this.$store.dispatch("scroll/pushWindowScroll", scroll);
        },
        setWindowSize() {
            const width = window.innerWidth;
            this.$store.dispatch("windowSize/pushWindowWidth", width);
        },
        modalInfoSizing() {
            if (this.activeModal.length === 0)
                return;
            const modalImageAll = [...document.getElementsByClassName("modalImage")];
            const modalImage = modalImageAll.find(item => item.clientHeight > 0);
            if (modalImage === undefined || modalImage.length > 1)
                return;
            const height = modalImage.clientHeight;
            this.modalInfoStyle.height = `${height}px`;
        },
        update() {
            this.setSearchTags();
            this.displayingPageTags = this.displayingPageTags - 1;
            this.setDisplayingContent();
        },
        setAutoSizing() {
            // コンテンツサイズを手動で変更している時に、ウィンドウサイズが変更されたら、手動から自動に切り替える
            if (!this.$store.getters["slider/getAutoSizing"]) {
                this.$store.dispatch("slider/pushAutoSizing");
                // 自動調整オンの通知
                this.$store.dispatch("notice/pushDisplay", {id: 2, text: 'サイズの自動調整を有効にしました'});
                setTimeout(() => (this.$store.dispatch("notice/pushClose")),3000)
            }
        }
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
  &.sideMenuOpen {
  
  }

  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
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

.loaded {
  display: none;
}

.loading {
  display: block;
  background: linear-gradient(to bottom, #404957 50%, #6f88ad 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  opacity: 1;
  animation-name: loading;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  
  @keyframes loading {
    0% {
      
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  &:before {
    content: '';
    position: fixed;
    top: 50vh;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 999;
    background-color: var(--white);
    clip-path:inset(0 100% 0 0);
    animation-name: loadingLine;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @keyframes loadingLine {
      0% {
        
      }
      10% {
        clip-path:inset(0 100% 0 0);
      }
      30% {
        clip-path:inset(0 0 0 0);
      }
      40% {
        clip-path:inset(0 0 0 0);
      }
      60% {
        clip-path:inset(0 0 0 100%);
      }
      100% {
        
      }
    }
  }
}
.divider {
  position: relative;
  color: var(--main-text);
  /* padding: 20px 10px 150px 10px; */
  transition: transform .2s;
  .sideMenuOpen & {
    transform: translateX(calc(0.5 * var(--sideMenuWidth)));
  }
  /* overflow-y: hidden; */
  @include responsive(xs) {
    /* padding: 20px 20px 150px 20px; */
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
}

.selectedTag {
  display: inline-block;
}

.selectedTagButton {
  width: 15px;
  height: 15px;
  margin-right: 7px;
}

.selectedTagName {
  user-select: none;
}

.selectedTagTitle {
  font-size: var(--font-size-3xl);
  font-weight: 400;
  /* margin-left: 80px;
  margin-bottom: 30px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
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

/* .contentsWrapper {
  margin-top: 50px;
} */

.contentsWrapper {
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.contents {
  
  width: 100%;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
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
  max-width: 100%;
  margin: 0 auto;
}
.images {
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
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
// 注意：createDummyContent関数内で以下のborderの値をハードコーディングで使用しているため、
//      ここの値を変更する場合は、一緒にcreateDummyContentも変更必要（あとで直す）
.image {
  max-width: 100%;
  
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    border-radius: 5px;
    box-shadow: 1px 1px 5px var(--main-content-image-shadow);
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
/* .imagePc {
  max-width: calc(46.88507% * 0.97);
}
.imageTb {
  max-width: calc(32.223416% * 0.97);
}
.imageSp {
  max-width: calc(19.817401% * 0.97);
} */
.marginRight {
  margin-right: 10px;
}
.modal {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-modal-outer-background);
  z-index: 100;
  display: none;
  clip-path:inset(50% 50% 50% 50%);
  position: fixed;
  top: 0;
  right: 0;
  transition: clip-path 0.2s;
  padding: 100px 120px;
}

.modalContent {
  /* width: 500px;
  max-height: 70vh; */
  /* width: 100%;
  height: 100%; */
  background-color: var(--main-modal-inner-background);
  position: relative;
  /* padding: 40px; */
  overflow-y: auto;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  max-width: 1678px;
  /* border-radius: 0 5px 5px 0; */
}
/* .modalContent::-webkit-scrollbar {
  display:none;
} */

.modalButton {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
}

.modalBar {
  background-color: var(--main-modal-button-bar);
  width: 25px;
  height: 2px;
  position: absolute;
  /* transition: background-color .2s; */
  &:nth-child(1) {
    top: 14px;
    left: 2px;
    transform: rotate(45deg);
  }
  &:nth-child(2) {
    top: 14px;
    left: 2px;
    transform: rotate(135deg);
  }
  .modalButton:hover & {
    background-color: var(--main-modal-button-bar-hover);
  }
}

.modalImageWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modalImage {
  height: 100%;
  width: 100%;
  max-width: 1200px;
  object-fit: contain;
}

.modalInfoWrapper {
  width: 40%;
  overflow-y: auto;
  padding: 10px;
  border-radius: 0 5px 5px 0;
  background-color: var(--main-modal-info-background);
  overflow-x: hidden;
}
.modalName {
  margin-top: 5px;
  font-weight: 500;
  font-size: var(--font-size-md);
}
.modalTimes {
  display: flex;
  margin-top: 3px;
}
.modalTime {
  display: flex;
  &:first-child {
    margin-right: 10px;
  }
}
.modalTimeImage {
  width: 12px;
  margin-right: 3px;
  padding-top: 1px;
}

.modalTag {
  position: relative;
  margin-top: 25px;
  &::before {
    content: '';
    width: 120%;
    height: 1px;
    position: absolute;
    top: -10px;
    left: -10px;
    background-color: var(--main-modal-info-partition);
  }
}
.modalTagTitle {
  margin-top: 10px;
  font-weight: 500;
  font-size: var(--font-size-md);
}
.modalTagContents {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* justify-content: space-between; */
  justify-content: left;
  flex-wrap: wrap;
}
.modalTagContent {
  /* border: 1px var(--black) solid;
  padding: 5px 8px;
  border-radius: 15px; */
  margin: 1px;
  /* &:not(:last-child) {
    flex-grow: 1;
  } */
}
.modalTagLink {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--main-modal-tag-text);
  /* border: 1px var(--main-modal-tag-border) solid; */
  padding: 3px;
  /* border-radius: 15px; */
}
.modalTagName {
  margin-left: 5px;
}

.activeModal {
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path:inset(0 0 0 0);
}

.info {
  position: relative;
  margin: 0 auto;
  max-width: 100%;
  margin-top: 10px;
}

.infoText {
  max-width: calc(100% - 75px);
  
}

.name {
  /* margin-top: 10px; */
  font-weight: 700;
  font-size: var(--font-size-md);
  background: linear-gradient(to right, #005c97, #363795);
  background-clip: text;
  display: inline-block;
}

.time {
  margin-top: 3px;
}
.published {
  display: none;
}
.updated {
  display: none;
}

.nameLink {
  text-decoration: none;
  /* color: var(--main-content-name-text); */
  color: transparent;
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden; */
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
.detail {
  right: 40px;
  &:hover {
    background-color: var(--main-content-detail-button-hover);
  }
}

.detailImage {
  width: 18px;
  transition: fill .25s;
  fill: var(--main-content-detail-button-icon);
  .detail:hover &{
    fill: var(--main-content-detail-button-icon-hover);
  }
}

.bookmark {
  right: 3px;
  &:hover {
    background-color: var(--main-content-bookmark-button-hover);
  }
}

.bookmarkImage {
  width: 17px;
  stroke: var(--main-content-bookmark-button-icon);
  .bookmark:hover &{
    stroke: var(--main-content-bookmark-button-icon-hover);
  }
}

.bookmarkRegistered {
  stroke: var(--main-content-bookmark-button-icon-Registered);
  fill: var(--main-content-bookmark-button-icon-Registered);
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
  .bookmark:hover &{
    fill: var(--main-content-bookmark-button-icon-hover-Registered);
  }
}

.comment {
  position: absolute;
  top: 36px;
  height: 18px;
  border-radius: 3px;
  padding: 0 0 1px 1px;
  background-color: var(--main-content-button-comment-background);
  color: var(--main-content-button-comment-text);
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  font-size: var(--font-size-xxs);
  .detail:hover &,.bookmark:hover &{
    display: flex;
    animation-name: comment-open;
    animation-duration: .2s;
    animation-timing-function: ease;
    animation-delay: .3s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @keyframes comment-open {
      100% {
        opacity: 1;
        
      }
    }
  }
  .detail &{
    left: 0;
    width: 32px;
  }
  .bookmark &{
    left: -10px;
    width: 60px;
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
  height: 50px;
  background-color: var(--main-more-button-background);
  color: var(--main-more-button-text);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
  &:hover {
    background-color: var(--main-more-button-background-hover);
    color: var(--main-more-button-text-hover);
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

.working {
  display: none;
}
</style>