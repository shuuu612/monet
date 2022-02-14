<template>
  <div class="wrapper" :class="getSideMenuOpen">
    <Loading />
    <Header
    @search="keywordSearchStart"
    />
    <Buttons 
    :tag="selectedTag"
    :sort="selectedSort"
    @update="update"
    />
    <MenuBar 
    :tag="selectedTag"
    :sort="selectedSort"
    @update="update"
    />
    <SideMenu
    :tag="tag"
    :selectedtag="selectedTag"
    :contentswidth="contentsElement.clientWidth"
    @autoSizing="pushAutoSizing"
    @deviceChange="changeDevice"
    @sliderChange="changeSliderSize"
    @multideviceCancel="monitorReturnToSingledevice"
    />
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
            <div v-for="content in getDisplayingContent" :key="content.id" class="content" :class="getStateSliderStep">
              <div class="contentImage">
                <Images
                :content="content"
                />
              </div>
              <transition name="modal">
                <div v-if="getActiveModal(content.id)" class="modal" :class="getModalOpen" @click="closeModal">
                  <button class="modalButton" @click="closeModal">
                    <span class="modalBar"></span>
                    <span class="modalBar"></span>
                  </button>
                  <div class="modalContent" @click.stop>
                    <div class="modalImageWrapper">
                      <a :href="`${content.url}`" target="_blank" rel="noopener noreferrer" class="modalImages">
                        <img
                          id="modalImage"
                          class="modalImage"
                          :src="`${getPath(content.imagePC.url)}-1200.jpg`"
                          :srcset="`
                          ${getPath(content.imagePC.url)}-1200.jpg 1x,
                          ${getPath(content.imagePC.url)}-2400.jpg 2x
                          `"
                          :alt="`${content.name}`"
                          @load="modalInfoSizing"
                        >
                      </a>
                    </div>
                    <div class="modalInfoWrapper" :style="modalInfoStyle">
                      <div class="modalName">
                        <a :href="`${content.url}`" target="_blank" rel="noopener noreferrer" class="nameLink">{{content.name}}</a>
                      </div>
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
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.industry" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/industry=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.impression" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/impression=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.layout" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/layout=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.color" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/color=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.pickup" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/pickup=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.technique" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/technique=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                          <div v-for="item in content.technology" :key="item.id" class="modalTagContent">
                            <nuxt-link :to="`/tag/technology=${item.id}*and`" class="modalTagLink button">
                              <div class="modalTagName">#{{item.name}}</div>
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
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
                <button class="infoButton detail" aria-label="Detail Open" @click="openModal(content.id)">
                  <svg class="detailImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.69 425.69" fill="#333333">
                    <path d="M255.61,165.44H203.18V113a18.88,18.88,0,0,0-37.75,0v52.44H113a18.88,18.88,0,1,0,0,37.75h52.42v52.43a18.88,18.88,0,0,0,37.75,0V203.19h52.43a18.88,18.88,0,1,0,0-37.75Z"/>
                    <path d="M416.48,372l-81.67-81.66a183.05,183.05,0,0,0,33.8-106C368.61,82.69,285.93,0,184.31,0S0,82.69,0,184.31,82.68,368.62,184.31,368.62a183.13,183.13,0,0,0,106-33.8L372,416.47A31.46,31.46,0,1,0,416.48,372ZM37.75,184.31c0-80.82,65.75-146.56,146.56-146.56s146.55,65.74,146.55,146.56S265.12,330.87,184.31,330.87,37.75,265.13,37.75,184.31Z"/>
                  </svg>
                  <div class="comment">詳細</div>
                </button>
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
import { backfaceFixed } from '../utils/backfaceFixed';
export default {
    async asyncData({ params, $microcms }) {
        // タグページ用
        const selectedTag = params.tagId;
        let apiFilters
        if(selectedTag !== undefined && selectedTag !== 'bookmark') {
          apiFilters = `(type[contains]${selectedTag}[or]industry[contains]${selectedTag}[or]impression[contains]${selectedTag}[or]layout[contains]${selectedTag}[or]color[contains]${selectedTag}[or]pickup[contains]${selectedTag}[or]technique[contains]${selectedTag}[or]technology[contains]${selectedTag})[and]hide[equals]false[and]link[equals]false`
        }else {
          apiFilters = "hide[equals]false[and]link[equals]false";
        }
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
            dummy: [],
            dummyStyle: {},
            keywordContents: [],
            bookmarkContents: [],
            displayingContent: [],
            displayingLimit: 30,
            displayingPageOriginal: 0,
            displayingPageKeyword: 0,
            displayingPageBookmark: 0,
            remainingContent: 0,
            displayingJpName: "",
            tagsJpName: "",
            contentStyle: {
                width: "",
                height: "",
            },
            infoButtonStyle: {
                width: "",
            },
            infoStyle: {
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
            modalOpen: false,
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
                bookmark: false,
                condition: "",
            },
            japaneseTags: '',
            darkmode: "",
            modalOpenElement: {},
            contentsElement: {},
            totalWidth: 0,
            columnContent: 0,
            meta: {
              title: 'すごーいデザイン | Webデザインギャラリー',
              keyword: 'デザイン,Webデザイン,Web design,参考,Webデザインギャラリー,ギャラリー,Webサイト',
              description: 'すごーいデザインはWeb制作の参考になるWebサイトを集めたギャラリー･リンク集です。日本国内の優れたWebデザインを厳選してご紹介しています。Webデザインの参考にぜひご活用ください。',
              type: 'website',
              url: 'https://sugoi-design.com/',
              image: 'https://sugoi-design.com/images/ogp/logo.png',
            },
        };
    },
    head() {
        return {
            htmlAttrs: {
                class: this.darkmode
            },
            title: this.meta.title,
            meta: [
              { hid: 'description', name: 'description', content: this.meta.description },
              { hid: 'keyword', name: 'keyword', content: this.meta.keyword },
              { hid: 'og:type', property: 'og:type', content: this.meta.type },
              { hid: 'og:title', property: 'og:title', content: this.meta.title },
              { hid: 'og:description', property: 'og:description', content: this.meta.description },
              { hid: 'og:url', property: 'og:url', content: this.meta.url },
              { hid: 'og:image', property: 'og:image', content: this.meta.image },
            ],
        };
    },
    computed: {
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
            if (this.$store.getters["status/getSearchKeyword"]) {
                // キーワード検索
                if (this.keywordContents.length === 0) {
                    return "一致する検索結果はありません";
                }
                else {
                    return "";
                }
            }else if (this.$store.getters["status/getSearchTag"]) {
                // 通常検索
                if(this.selectedTag === 'bookmark') {
                  if(this.bookmarkContents.length === 0) {
                    return "お気に入りは登録されていません";
                  }else {
                    return this.displayingJpName;
                  }
                }else if(this.selectedTag !== 'bookmark') {
                  if(this.contents.length === 0) {
                    return `「${this.displayingJpName}」はただいま準備中です。\n公開まで今しばらくお待ちください。`;
                  }else {
                    return this.displayingJpName;
                  }
                }else {
                  return ''
                }
            }else {
              return '';
            }
        },
        getActiveModal() {
            return function (id) {
                return this.activeModal.includes(id)
            };
        },
        getSideMenuOpen() {
            return { sideMenuOpen: this.$store.getters["sideMenu/getOpen"] };
        },
        getDisplayingContent() {
            return this.displayingContent;
        },
        
        getContentStyle() {
          console.log('getContentStyle',this.contentStyle)
          return this.contentStyle
        },
        getModalOpen() {
          return { open: this.modalOpen}
        },
        getUrl() {
          return function(url) {
            // 最後のスラッシュより後を切り出す
            const cutUrl = require(`~/static/images/site/${url.substr(url.lastIndexOf('/') + 1)}?resize&sizes[]=349&sizes[]=415&sizes[]=546&sizes[]=${349*2}&sizes[]=${415*2}&sizes[]=${546*2}&format=webp`);
            console.log(cutUrl)
            return cutUrl
          }
        },
        getPath() {
          return function(url) {
            // 前半の不要部分を切り取り
            const path1 = `/images/site/${url.substr(url.lastIndexOf('/') + 1)}`
            // .pngを切り取り
            const path2 = path1.substring(0, path1.indexOf(".png"))
            return path2
          }
        }
    },
    created() {
        console.log("created");
        // タグの日本語名を設定
        this.convertTagsToJapanese();
        // headを設定
        this.setHead();
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
        // ウィンドウサイズを取得
        this.setWindowSize();
        // ダークモードの変更を監視
        this.$store.watch(() => this.$store.getters["darkmode/getActive"], (value) => {
            if (value) {
                this.darkmode = this.$store.getters["darkmode/getHtmlClass"];
            }
            else {
                this.darkmode = "";
            }
        });
        // ローカルストレージの取得
        if (this.$storageAvailable('localStorage')) {
            this.getLocalStorage();
        }
        else {
            console.log("ブラウザのローカルストレージがオフになっています。");
        }
        
        // ページ遷移時の処理
        if(this.$store.getters["loaded/getLoaded"]) {
          console.log('ページ遷移の時だけ')
          // コンテンツ要素を取得
          this.setContentsElement();
          // ダミーコンテンツの作成
          this.createDummyContent();
          // コンテンツ初期表示
            this.InitialDisplay();
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

        // 検索キーワードを削除
        this.$store.dispatch('search/pushKeyword',this.keyword)
        this.$store.dispatch("status/pushSearchTag");
    },
    methods: {
        setHead() {
          // トップページ
          if(this.selectedTag === undefined) {
            // ベース設定のまま
          }else {
            // tagIDを日本語に変換
            this.meta.title = this.japaneseTags + ' | ' + this.meta.title;
            this.meta.keyword = this.japaneseTags + ',' + this.meta.keyword
          }
        },
        setContentsElement() {
          const contents = document.getElementById("contents");
          this.contentsElement = contents
        },
        InitialDisplay() {
          // コンテンツ初期表示

          this.filterByBookmarks();
          
          if(this.$store.getters["status/getSearchKeyword"]) {
            // キーワード検索中
            console.log('キーワード検索中で復帰')
            this.searchByKeyword();
          }else {
            console.log('通常表示')
            /* this.filterByBookmarks(); */
            this.setDisplayingContent();
          }
        },
        filterByBookmarks() {
            if(this.selectedTag !== 'bookmark') return;

            // store取得
            const bookmark = this.$store.getters["bookmark/getBookmark"];

            // ブックマークでフィルター
            const filterContents = this.contents.filter(function (value) {
                return bookmark.includes(value.id);
            });
            
            this.bookmarkContents = filterContents;
        },
        setDisplayingContent() {
            // 表示件数を増やす
            if (this.$store.getters["status/getSearchKeyword"]) {
                // キーワードで検索した結果を表示
                this.displayingPageKeyword = this.displayingPageKeyword + 1;
                const start = 0;
                const end = start + (this.displayingPageKeyword * this.displayingLimit);
                this.displayingContent = this.keywordContents.slice(start, end);
                this.remainingContent = this.keywordContents.length - this.displayingContent.length;
                this.displayingJpName = "";
                /* this.$store.dispatch("status/pushSearchKeyword"); */
            }else if(this.selectedTag === 'bookmark') {
                // ブックマークを表示
                this.displayingPageBookmark = this.displayingPageBookmark + 1;
                const start = 0;
                const end = start + (this.displayingPageBookmark * this.displayingLimit);
                this.displayingContent = this.bookmarkContents.slice(start, end);
                this.remainingContent = this.bookmarkContents.length - this.displayingContent.length;
                this.displayingJpName = this.japaneseTags;
                /* this.$store.dispatch("status/pushSearchTag"); */
            }else {
                // オリジナルの結果を表示
                this.displayingPageOriginal = this.displayingPageOriginal + 1;
                const start = 0;
                const end = start + (this.displayingPageOriginal * this.displayingLimit);
                this.displayingContent = this.contents.slice(start, end);
                this.remainingContent = this.contents.length - this.displayingContent.length;
                this.displayingJpName = this.japaneseTags;
                /* this.$store.dispatch("status/pushSearchTag"); */
            }
            this.createDummyContent();
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

            let width
            /* const height = Math.round(800 * value); */
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
            const infoWidth = width - 75;
            this.infoButtonStyle.width = `${infoWidth}px`;
            this.infoStyle.width = `${width}px`;
            // コンテンツ領域の大きさを設定
            /* this.contentStyle.width = `${width}px`;
            const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
            if (windowWidth < 576 && this.$store.getters["slider/getAutoSizing"] && (devicePattern === 4 || devicePattern === 5 || devicePattern === 6 || devicePattern === 7)) {
              this.contentStyle.height = 'auto';
              console.log('ここ')
            }else {
              this.contentStyle.height = `${height}px`;
              console.log('ここはダメ')
            } */
        },
        calculateAutoSizing() {
            console.log("calculateAutoSizingを起動");
            const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
            const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
            /* if (!this.$store.getters["slider/getAutoSizing"])
                return; */
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
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 2;
                        maxStep = 8;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 2;
                        maxStep = 9;
                    }
                    else if (windowWidth >= 1100 && windowWidth < 1200) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1200 && windowWidth < 1300) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1300 && windowWidth < 1400) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if (windowWidth >= 1400 && windowWidth < 1500) {
                        bestStep = 3;
                        maxStep = 10;
                    }
                    else if(windowWidth >= 1500) {
                        bestStep = 3;
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
                    else if(windowWidth >= 1500) {
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
                    else if(windowWidth >= 1500) {
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
                        bestStep = 1;
                        maxStep = 1;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 2;
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
                    else if(windowWidth >= 2100) {
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
                        bestStep = 2;
                        maxStep = 2;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 992 && windowWidth < 1100) {
                        bestStep = 4;
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
                    else if(windowWidth >= 2100) {
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
                        bestStep = 3;
                        maxStep = 3;
                    }
                    else if (windowWidth >= 830 && windowWidth < 900) {
                        bestStep = 3;
                        maxStep = 4;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 4;
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
                    else if(windowWidth >= 2100) {
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
                        bestStep = 5;
                        maxStep = 5;
                    }
                    else if (windowWidth >= 830 && windowWidth < 900) {
                        bestStep = 5;
                        maxStep = 6;
                    }
                    else if (windowWidth >= 900 && windowWidth < 992) {
                        bestStep = 6;
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
                    else if(windowWidth >= 2200) {
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
        resizeProcess() {
            this.setWindowSize();
            this.monitorReturnToAuto();
            this.modalInfoSizing();
            this.wrapChack();
        },
        setBookmark(id) {
            if (!this.$storageAvailable('localStorage')) {
                alert("ブラウザのローカルストレージがOFFになっています。\nお気に入り機能を使用するため、ブラウザの設定でローカルストレージをONにしてください。");
                return;
            }
            this.$store.dispatch("bookmark/pushBookmark", id);
        },
        convertTagsToJapanese() {
          // タグIDを日本語に変換する
          if(this.selectedTag === undefined) {
            this.japaneseTags = '';
          }else if (this.selectedTag === 'bookmark') {
            this.japaneseTags = 'お気に入り';
          }else {
            const selectedTag = this.selectedTag
            const type = this.tag.type.contents.find(function(item) {return item.id === selectedTag})
            if(type !== undefined) {
              this.japaneseTags = type.name;
              return
            }
            const industry = this.tag.industry.contents.find(function(item) {return item.id === selectedTag})
            if(industry !== undefined) {
              this.japaneseTags = industry.name;
              return
            }
            const impression = this.tag.impression.contents.find(function(item) {return item.id === selectedTag})
            if(impression !== undefined) {
              this.japaneseTags = impression.name;
              return
            }
            const layout = this.tag.layout.contents.find(function(item) {return item.id === selectedTag})
            if(layout !== undefined) {
              this.japaneseTags = layout.name;
              return
            }
            const color = this.tag.color.contents.find(function(item) {return item.id === selectedTag})
            if(color !== undefined) {
              this.japaneseTags = color.name;
              return
            }
            const pickup = this.tag.pickup.contents.find(function(item) {return item.id === selectedTag})
            if(pickup !== undefined) {
              this.japaneseTags = pickup.name;
              return
            }
            const technique = this.tag.technique.contents.find(function(item) {return item.id === selectedTag})
            if(technique !== undefined) {
              this.japaneseTags = technique.name;
              return
            }
            const technology = this.tag.technology.contents.find(function(item) {return item.id === selectedTag})
            if(technology !== undefined) {
              this.japaneseTags = technology.name;
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
            // 検索キーワード
            const searchJson = sessionStorage.getItem("search");
            const search = JSON.parse(searchJson);
            if (search !== null) {
                this.$store.dispatch("search/pushLocalStorage", search);
            }
            // 検索ステータス
            const statusJson = sessionStorage.getItem("status");
            const status = JSON.parse(statusJson);
            if (status !== null) {
                this.$store.dispatch("status/pushLocalStorage", status);
            }
        },
        openModal(id) {
            this.activeModal.push(id);
            /* this.$store.dispatch("modal/pushOpen"); */
            backfaceFixed(true);
        },
        closeModal() {
            this.activeModal.length = 0;
            this.activeModal.splice();
            this.modalOpenElement = {};
            this.modalOpen = false;
            setTimeout(()=>{backfaceFixed(false)},200);
        },
        searchByKeyword() {
            // 検索キーワードを取得
            const key = this.$store.getters["search/getKeyword"];
            // キーワードを一度入力してから削除したとき
            if (!key) {
                this.$store.dispatch("status/pushSearchTag");
                // 想定外の動きをしてもページをマイナスにしないための予防策
                if(this.displayingPageOriginal !== 0) {
                  this.displayingPageOriginal = this.displayingPageOriginal - 1;
                }
                this.setDisplayingContent();
                return;
            }
            // キーワードをスペースで分割
            let keySplit
            if(key.includes('　') || key.includes(' ')) {
              keySplit = key.split(/\s/)
              // 最後スペースの場合に作成される空文字（''）を削除
              keySplit = keySplit.filter(function(item) {return item !== ''})
            }

            // 検索対象のコンテンツを取得
            const contents = this.selectedTag === 'bookmark' ? this.bookmarkContents : this.contents;
            const bookmarkContents = this.$store.getters["bookmark/getBookmark"]

            // キーワードでフィルター（大文字・小文字・ひらがな・カタカナを区別しない）
            const searchFuzzy = contents.filter(function (content) {
                // 検索対象を抽出
                const name = content.name !== undefined ? content.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
                const url = content.url !== undefined ? content.url.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
                const typeId = content.type.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const typeName = content.type.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const typeKeyword = content.type.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const industryId = content.industry.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const industryName = content.industry.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const industryKeyword = content.industry.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const impressionId = content.impression.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const impressionName = content.impression.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const impressionKeyword = content.impression.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const layoutId = content.layout.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const layoutName = content.layout.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const layoutKeyword = content.layout.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const colorId = content.color.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const colorName = content.color.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const colorKeyword = content.color.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const pickupId = content.pickup.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const pickupName = content.pickup.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const pickupKeyword = content.pickup.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const techniqueId = content.technique.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const techniqueName = content.technique.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const techniqueKeyword = content.technique.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const technologyId = content.technology.map(function (item) {
                    return item.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const technologyName = content.technology.map(function (item) {
                    return item.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                });
                const technologyKeyword = content.technology.map(function (item) {
                    return item.keyword !== undefined ? item.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : '';
                });
                const keyword = content.keyword !== undefined ? content.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";

                // ブックマークに登録されている場合は、ブックマーク関連のキーワードも対象にする
                let bookmark;
                if(bookmarkContents.includes(content.id)) {
                  const bookmarkKeyword = ['bookmark','ブックマーク','お気に入り','favorite']
                  bookmark = bookmarkKeyword.map(function (item) {
                    return item.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                  });
                }else {
                  bookmark = [];
                }

                // フィルター処理
                if(keySplit === undefined) {
                  // 検索キーワードの書式を統一する
                  const lowerKey = key.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                  // 検索キーワードを正規表現に変換
                  const regExp = new RegExp(String.raw`${lowerKey}`);
                  // 一致判定
                  const result = (name.length !== 0 ? name.includes(lowerKey) : false) ||
                                 (url.length !== 0 ? url.includes(lowerKey) : false) ||
                                 (typeId.length !== 0 ? (typeId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (typeName.length !== 0 ? (typeName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (typeKeyword.length !== 0 ? (typeKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (industryId.length !== 0 ? (industryId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (industryName.length !== 0 ? (industryName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (industryKeyword.length !== 0 ? (industryKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (impressionId.length !== 0 ? (impressionId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (impressionName.length !== 0 ? (impressionName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (impressionKeyword.length !== 0 ? (impressionKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (layoutId.length !== 0 ? (layoutId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (layoutName.length !== 0 ? (layoutName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (layoutKeyword.length !== 0 ? (layoutKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (colorId.length !== 0 ? (colorId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (colorName.length !== 0 ? (colorName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (colorKeyword.length !== 0 ? (colorKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (pickupId.length !== 0 ? (pickupId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (pickupName.length !== 0 ? (pickupName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (pickupKeyword.length !== 0 ? (pickupKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (techniqueId.length !== 0 ? (techniqueId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (techniqueName.length !== 0 ? (techniqueName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (techniqueKeyword.length !== 0 ? (techniqueKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (technologyId.length !== 0 ? (technologyId.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (technologyName.length !== 0 ? (technologyName.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (technologyKeyword.length !== 0 ? (technologyKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                 (keyword.length !== 0 ? keyword.includes(lowerKey) : false) ||
                                 (bookmark.length !== 0 ? (bookmark.find(value => value.match(regExp)) !== undefined) : false);
  
                  return result;
                }else {
                  // 検索キーワードの書式を統一する
                  const lowerKey = keySplit.map(function (item) {
                      return item.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
                  });

                  let matchingCount = 0
                  lowerKey.forEach(function(key) {
                    // 検索キーワードを正規表現に変換
                    const regExp = new RegExp(String.raw`${key}`);
                    // 一致判定
                    const result = (name.length !== 0 ? name.includes(key) : false) ||
                                   (url.length !== 0 ? url.includes(key) : false) ||
                                   (typeId.length !== 0 ? (typeId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (typeName.length !== 0 ? (typeName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (typeKeyword.length !== 0 ? (typeKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (industryId.length !== 0 ? (industryId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (industryName.length !== 0 ? (industryName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (industryKeyword.length !== 0 ? (industryKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (impressionId.length !== 0 ? (impressionId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (impressionName.length !== 0 ? (impressionName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (impressionKeyword.length !== 0 ? (impressionKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (layoutId.length !== 0 ? (layoutId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (layoutName.length !== 0 ? (layoutName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (layoutKeyword.length !== 0 ? (layoutKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (colorId.length !== 0 ? (colorId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (colorName.length !== 0 ? (colorName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (colorKeyword.length !== 0 ? (colorKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (pickupId.length !== 0 ? (pickupId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (pickupName.length !== 0 ? (pickupName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (pickupKeyword.length !== 0 ? (pickupKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (techniqueId.length !== 0 ? (techniqueId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (techniqueName.length !== 0 ? (techniqueName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (techniqueKeyword.length !== 0 ? (techniqueKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (technologyId.length !== 0 ? (technologyId.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (technologyName.length !== 0 ? (technologyName.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (technologyKeyword.length !== 0 ? (technologyKeyword.find(value => value.match(regExp)) !== undefined) : false) ||
                                   (keyword.length !== 0 ? keyword.includes(key) : false) ||
                                   (bookmark.length !== 0 ? (bookmark.find(value => value.match(regExp)) !== undefined) : false);
                    // 検索キーワードに一致した場合はマッチングカウントをUP
                    if(result) matchingCount++
                  })

                  return lowerKey.length === matchingCount
                }
                  
            });
            this.keywordContents = searchFuzzy;
            // 想定外の動きをしてもページをマイナスにしないための予防策
            if(this.displayingPageKeyword !== 0) {
              this.displayingPageKeyword = this.displayingPageKeyword - 1;
            }
            /* this.displayingPageKeyword = this.displayingPageKeyword - 1; */
            this.setDisplayingContent();
        },
        setWindowScroll() {
            const scroll = window.pageYOffset;
            this.$store.dispatch("scroll/pushWindowScroll", scroll);
        },
        setWindowSize() {
            const width = window.innerWidth;
            this.$store.dispatch("windowSize/pushWindowWidth", width);
        },
        modalInfoSizing() {
            // モーダルが開いていない時は処理終了
            if (this.activeModal.length === 0)  return;

            // 初回だけ要素取得
            if(Object.keys(this.modalOpenElement).length === 0) {
              const modalImage = document.getElementById("modalImage")
              this.modalOpenElement = modalImage;
            }
            const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
            if(windowWidth >= 992) {
              const style = getComputedStyle(this.modalOpenElement, '');
              const height = style.height;
              this.modalInfoStyle.height = height;
            }else {
              this.modalInfoStyle.height = ""
            }
            
            // モーダルの透過を解除して表示する
            this.modalOpen = true;
            
        },
        update() {
            this.filterByBookmarks();
            // 検索フォームを空にする
            this.$nuxt.$emit('clearKeyword');
            // ステータスをオリジナルに変更
            this.$store.dispatch("status/pushSearchTag");
            // 想定外の動きをしてもページをマイナスにしないための予防策
            if(this.displayingPageOriginal !== 0) {
              this.displayingPageOriginal = this.displayingPageOriginal - 1;
            }
            this.setDisplayingContent();
        },
        keywordSearchStart() {
          // ステータスをキーワード検索に変更
          this.$store.dispatch("status/pushSearchKeyword");
          this.searchByKeyword();
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

.divider {
  position: relative;
  color: var(--main-text);
  transition: transform .25s ease-in;
  padding: 0px 0px 150px 0px;
  .sideMenuOpen & {
    transform: translateX(calc(0.5 * var(--sideMenuWidth)));
    transition: transform .25s ease-out;
  }
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
.contentsWrapper {
  position: relative;
  padding-top: 60px;
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
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
.modal {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-modal-outer-background);
  z-index: 120;
  position: fixed;
  top: 0;
  right: 0;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .2s;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    
  }
  @include responsive(lg) {
    padding: 100px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
  &.open {
    opacity: 1;
  }
}

.modal-leave-active {
  transition: opacity .2s;
}
.modal-leave-to {
  opacity: 0 !important;
}

.modalButton {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  .modalBar {
    background-color: var(--main-modal-button-bar);
    width: 25px;
    height: 2px;
    position: absolute;
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
  }
  @include hover() {
    .modalBar {
      background-color: var(--main-modal-button-bar-hover);
    }
  }
}

  

.modalContent {
  background-color: var(--main-modal-inner-background);
  position: relative;
  width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    
  }
  @include responsive(lg) {
    flex-direction: row;
    max-width: 1600px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }

}

.modalImageWrapper {
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    
  }
  @include responsive(lg) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.modalImage {
  height: 100%;
  width: 100%;
  max-width: 1200px;
  max-height: 100%;
  object-fit: contain;
}

.modalInfoWrapper {
  background-color: var(--main-modal-info-background);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  border-radius: 0 0 5px 5px;
  margin-top: -2px;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    
  }
  @include responsive(lg) {
    width: 40%;
    margin-top: -3px;
    border-radius: 0 5px 5px 0;
    max-height: 100%;
    min-width: 350px;
  }
  @include responsive(xl) {
    margin-top: -4px;
  }
  @include responsive(xxl) {
    
  }
}
.modalName {
  margin-top: 5px;
  font-weight: 500;
  font-size: var(--font-size-md);
  background: linear-gradient(to right, var(--gradation-start), var(--gradation-end));
  background-clip: text;
  display: inline-block;
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
  justify-content: left;
  flex-wrap: wrap;
}
.modalTagContent {
  margin: 1px;
}
.modalTagLink {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--main-modal-tag-text);
  padding: 3px;
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
  width: 100%;
  position: relative;
  margin: 0 auto;
  max-width: 91vw;
  margin-top: 10px;
}

.infoText {
  max-width: calc(100% - 75px);
  
}

.name {
  font-weight: 700;
  font-size: var(--font-size-md);
  background: linear-gradient(to right, var(--gradation-start), var(--gradation-end));
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
  color: transparent;
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
  .detailImage {
    width: 18px;
    transition: fill .25s;
    fill: var(--main-content-detail-button-icon);
  }
  @include hover() {
    background-color: var(--main-content-detail-button-hover);
    .detailImage {
      fill: var(--main-content-detail-button-icon-hover);
    }
  }
}

  

.bookmark {
  right: 3px;
  transition: background-color .25s;
  .bookmarkImage {
    width: 17px;
    stroke: var(--main-content-bookmark-button-icon);
    transition: stroke .25s, fill .25s;
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
  }
  @include hover() {
    background-color: var(--main-content-bookmark-button-hover);
    .bookmarkImage {
      stroke: var(--main-content-bookmark-button-icon-hover);
    }
    .bookmarkRegistered {
      fill: var(--main-content-bookmark-button-icon-hover-Registered);
    }
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
  
  @keyframes comment-open {
    100% {
      opacity: 1;
      
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

.detail,.bookmark {
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
  background-color: var(--main-more-button-background);
  /* background: linear-gradient(to right, var(--gradation-start), var(--gradation-end)); */
  color: var(--main-more-button-text);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
  @include hover() {
    background-color: var(--main-more-button-background-hover);
    /* background: linear-gradient(to right, var(--gradation-start-hover), var(--gradation-end-hover)); */
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