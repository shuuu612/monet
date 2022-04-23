<template>
  <div class="searchWrapper">
    <transition name="mask">
      <div v-if="menuOpen" class="mask" @click="closeMenu">
      </div>
    </transition>
    <div id="search" class="searchBlock" :class="{selected: menuOpenDelay}" @click="openMenu">
      <div class="imageWrapper">
        <svg class="searchImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393.47 393.47" fill="#000000">
          <path d="M383.52,335.43l-102-102c36.94-58.86,29.95-137.61-21.23-188.8-59.45-59.45-156.19-59.46-215.65,0s-59.45,156.19,0,215.65c51.19,51.17,129.94,58.18,188.81,21.24l102,102a34,34,0,1,0,48.08-48.09ZM232.77,232.76a113.64,113.64,0,1,1,0-160.71A113.77,113.77,0,0,1,232.77,232.76Z"/>
        </svg>
      </div>
      <button v-if="order" class="orders" @click.stop="clickOrder">
        <div class="swich" :class="{and: and}"></div>
        <div class="order or">OR</div>
        <div class="order and">AND</div>
      </button>
      <button v-for="item in selectedTag" :key="item.id" class="item searchBox" @click.stop="clickTag(item.id, item.name, item.schema)">
        <div>{{item.name}}</div>
        <div class="cancel">
          <svg class="cancelImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 323.12 323.12" fill="#000000">
            <polygon points="323.12 28.29 294.83 0 161.56 133.27 28.28 0 0 28.29 133.27 161.56 0 294.83 28.28 323.12 161.56 189.84 294.83 323.12 323.12 294.83 189.84 161.56 323.12 28.29"/>
          </svg>
        </div>
      </button>
      <input v-model="keyword" class="search" type="text" placeholder="検索" autocomplete="off" @input="setKeyword" @focus="openMenu">
    </div>
    <div id="menu" class="tags" :class="{open: menuOpen}">
      <div class="tag">
        <div class="title">SITE</div>
        <div class="items">
          <button v-for="(item, index) in site.slice(0, 5)" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'site')">{{item.name}}</button>
          <div v-if="!keyword" class="comment">キーワードを入力してサイト名での検索ができます。</div>
          <div v-if="keyword && site.length === 0" class="comment">一致するサイトがありません。</div>
        </div>
      </div>
      <div v-if="displayingType.length > 0" class="tag">
        <div class="title">TYPE</div>
        <div class="items">
          <button v-for="(item, index) in displayingType" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'type')">{{item.name}}</button>
        </div>
      </div>
      <div class="tag">
        <div class="title">IMPRESSION</div>
        <div class="items">
          <button v-for="(item, index) in displayingImpression" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'impression')">{{item.name}}</button>
          <div v-if="keyword && displayingImpression.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">INDUSTRY</div>
        <div class="items">
          <button v-for="(item, index) in displayingIndustry" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'industry')">{{item.name}}</button>
          <div v-if="keyword && displayingIndustry.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">PICKUP</div>
        <div class="items">
          <button v-for="(item, index) in displayingPickup" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'pickup')">{{item.name}}</button>
          <div v-if="keyword && displayingPickup.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">TECHNIQUE</div>
        <div class="items">
          <button v-for="(item, index) in displayingTechnique" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'technique')">{{item.name}}</button>
          <div v-if="keyword && displayingTechnique.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">LAYOUT</div>
        <div class="items">
          <button v-for="(item, index) in displayingLayout" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'layout')">{{item.name}}</button>
          <div v-if="keyword && displayingLayout.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">COLOR</div>
        <div class="items">
          <button v-for="(item, index) in displayingColor" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'color')">{{item.name}}</button>
          <div v-if="keyword && displayingColor.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">SCHEME</div>
        <div class="items">
          <button v-for="(item, index) in displayingScheme" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'scheme')">{{item.name}}</button>
          <div v-if="keyword && displayingScheme.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
      <div class="tag">
        <div class="title">TECHNOLOGY</div>
        <div class="items">
          <button v-for="(item, index) in displayingTechnology" :key="index" class="item" :class="getSelectedTag(item.id)" @click="clickTag(item.id, item.name, 'technology')">{{item.name}}</button>
          <div v-if="keyword && displayingTechnology.length === 0" class="comment">一致するタグがありません。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const unifiedFormattingChar = function (key) {
  return key.toLowerCase().replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 96));
};
const unifiedFormattingArray = function (keys) {
  return keys.map(function (key) {
    return key.toLowerCase().replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 96));
  });
};
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: undefined,
    },
    type: {
      type: Array,
      required: false,
      default: undefined,
    },
    impression: {
      type: Array,
      required: false,
      default: undefined,
    },
    industry: {
      type: Array,
      required: false,
      default: undefined,
    },
    pickup: {
      type: Array,
      required: false,
      default: undefined,
    },
    technique: {
      type: Array,
      required: false,
      default: undefined,
    },
    layout: {
      type: Array,
      required: false,
      default: undefined,
    },
    color: {
      type: Array,
      required: false,
      default: undefined,
    },
    scheme: {
      type: Array,
      required: false,
      default: undefined,
    },
    technology: {
      type: Array,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      keyword: '',
      menuOpen: false,
      menuOpenDelay: false,
      selectedTag: [],
      order: false,
      and: false,
      site: [],
      displayingType: [],
      displayingImpression: [],
      displayingIndustry: [],
      displayingPickup: [],
      displayingTechnique: [],
      displayingLayout: [],
      displayingColor: [],
      displayingScheme: [],
      displayingTechnology: [],
    };
  },
  computed: {
    getSelectedTag() {
      return function (key) {
        return { selected: this.selectedTag.find((item) => item.id === key) !== undefined };
      };
    },
  },
  watch: {
    $route: 'setInitialTags',
  },
  mounted() {
    this.setInitialTags();
  },
  beforeDestroy() {},
  methods: {
    setKeyword() {
      if (!this.keyword) {
        this.site.length = 0;
        this.displayingType = this.type;
        this.displayingImpression = this.impression;
        this.displayingIndustry = this.industry;
        this.displayingPickup = this.pickup;
        this.displayingTechnique = this.technique;
        this.displayingLayout = this.layout;
        this.displayingColor = this.color;
        this.displayingScheme = this.scheme;
        this.displayingTechnology = this.technology;
        return;
      }

      // キーワードをスペースで分割
      let key = [];
      if (this.keyword) {
        if (this.keyword.includes('　') || this.keyword.includes(' ')) {
          key = this.keyword.split(/\s/);
          // 最後スペースの場合に作成される空文字（''）を削除
          key = key.filter(function (item) {
            return item !== '';
          });
        } else {
          key.push(this.keyword);
        }
      }

      // 検索キーワードの書式を統一する
      const unifiedKey = unifiedFormattingArray(key);

      // ======================
      // サイト名を検索
      // ======================
      const contents = this.contents;
      const filterContents = contents.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const url = content.url !== undefined ? unifiedFormattingChar(content.url) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (url.length !== 0 ? url.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      this.site = filterContents;

      // ======================
      // タグをフィルター
      // ======================
      const filterType = this.type.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterImpression = this.impression.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterIndustry = this.industry.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterPickup = this.pickup.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterTechnique = this.technique.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterLayout = this.layout.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterColor = this.color.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterScheme = this.scheme.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      const filterTechnology = this.technology.filter(function (content) {
        // 検索対象を抽出
        const name = content.name !== undefined ? unifiedFormattingChar(content.name) : '';
        const id = content.id !== undefined ? unifiedFormattingChar(content.id) : '';
        const keyword =
          content.keyword !== undefined && content.keyword !== null ? unifiedFormattingChar(content.keyword) : '';

        let matchingCount = 0;
        unifiedKey.forEach(function (key) {
          // 一致判定
          const result =
            (name.length !== 0 ? name.includes(key) : false) ||
            (id.length !== 0 ? id.includes(key) : false) ||
            (keyword.length !== 0 ? keyword.includes(key) : false);
          // 検索キーワードに一致した場合はマッチングカウントをUP
          if (result) matchingCount++;
        });
        return unifiedKey.length === matchingCount;
      });
      this.displayingType = filterType;
      this.displayingImpression = filterImpression;
      this.displayingIndustry = filterIndustry;
      this.displayingPickup = filterPickup;
      this.displayingTechnique = filterTechnique;
      this.displayingLayout = filterLayout;
      this.displayingColor = filterColor;
      this.displayingScheme = filterScheme;
      this.displayingTechnology = filterTechnology;
    },
    setQueryParameter() {
      // selectedTagからidだけを抽出
      let site = [];
      let type = [];
      let impression = [];
      let industry = [];
      let pickup = [];
      let technique = [];
      let layout = [];
      let color = [];
      let scheme = [];
      let technology = [];
      if (this.selectedTag.length > 0) {
        site = this.selectedTag.filter(function (item) {
          return item.schema === 'site';
        });
        site = site.map(function (item) {
          return item.id;
        });
        type = this.selectedTag.filter(function (item) {
          return item.schema === 'type';
        });
        type = type.map(function (item) {
          return item.id;
        });
        impression = this.selectedTag.filter(function (item) {
          return item.schema === 'impression';
        });
        impression = impression.map(function (item) {
          return item.id;
        });
        industry = this.selectedTag.filter(function (item) {
          return item.schema === 'industry';
        });
        industry = industry.map(function (item) {
          return item.id;
        });
        pickup = this.selectedTag.filter(function (item) {
          return item.schema === 'pickup';
        });
        pickup = pickup.map(function (item) {
          return item.id;
        });
        technique = this.selectedTag.filter(function (item) {
          return item.schema === 'technique';
        });
        technique = technique.map(function (item) {
          return item.id;
        });
        layout = this.selectedTag.filter(function (item) {
          return item.schema === 'layout';
        });
        layout = layout.map(function (item) {
          return item.id;
        });
        color = this.selectedTag.filter(function (item) {
          return item.schema === 'color';
        });
        color = color.map(function (item) {
          return item.id;
        });
        scheme = this.selectedTag.filter(function (item) {
          return item.schema === 'scheme';
        });
        scheme = scheme.map(function (item) {
          return item.id;
        });
        technology = this.selectedTag.filter(function (item) {
          return item.schema === 'technology';
        });
        technology = technology.map(function (item) {
          return item.id;
        });
      }

      // AND/ORが必要かどうか判定
      if (this.selectedTag.length >= 2) {
        this.order = true;
      } else {
        this.order = false;
      }

      // クエリパラメーターを付加
      this.$router.push({
        path: '',
        query: {
          site: site.length > 0 ? site.join('_') : undefined,
          type: type.length > 0 ? type.join('_') : undefined,
          impression: impression.length > 0 ? impression.join('_') : undefined,
          industry: industry.length > 0 ? industry.join('_') : undefined,
          pickup: pickup.length > 0 ? pickup.join('_') : undefined,
          technique: technique.length > 0 ? technique.join('_') : undefined,
          layout: layout.length > 0 ? layout.join('_') : undefined,
          color: color.length > 0 ? color.join('_') : undefined,
          scheme: scheme.length > 0 ? scheme.join('_') : undefined,
          technology: technology.length > 0 ? technology.join('_') : undefined,
          order: this.order ? (this.and ? 'and' : 'or') : undefined,
          sort: this.$route.query.sort,
        },
      });
    },
    openMenu() {
      this.menuOpen = true;
      this.menuOpenDelay = true;
    },
    closeMenu() {
      this.menuOpen = false;
      setTimeout(() => {
        this.menuOpenDelay = false;
      }, 260);
    },
    setInitialTags() {
      // クエリパラメーターから検索フォームに選択中のタグを復元する
      // タグの解析
      const selectedTags = [];
      let count = 0;
      const site = this.contents;
      const type = this.type;
      const impression = this.impression;
      const industry = this.industry;
      const pickup = this.pickup;
      const technique = this.technique;
      const layout = this.layout;
      const color = this.color;
      const scheme = this.scheme;
      const technology = this.technology;
      if (this.$route.query.site !== undefined) {
        const query = this.$route.query.site.split('_');
        query.forEach(function (item) {
          const tag = site.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'site' });
          count++;
        });
      }
      if (this.$route.query.type !== undefined) {
        const query = this.$route.query.type.split('_');
        query.forEach(function (item) {
          const tag = type.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'type' });
          count++;
        });
      }
      if (this.$route.query.impression !== undefined) {
        const query = this.$route.query.impression.split('_');
        query.forEach(function (item) {
          const tag = impression.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'impression' });
          count++;
        });
      }
      if (this.$route.query.industry !== undefined) {
        const query = this.$route.query.industry.split('_');
        query.forEach(function (item) {
          const tag = industry.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'industry' });
          count++;
        });
      }
      if (this.$route.query.pickup !== undefined) {
        const query = this.$route.query.pickup.split('_');
        query.forEach(function (item) {
          const tag = pickup.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'pickup' });
          count++;
        });
      }
      if (this.$route.query.technique !== undefined) {
        const query = this.$route.query.technique.split('_');
        query.forEach(function (item) {
          const tag = technique.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'technique' });
          count++;
        });
      }
      if (this.$route.query.layout !== undefined) {
        const query = this.$route.query.layout.split('_');
        query.forEach(function (item) {
          const tag = layout.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'layout' });
          count++;
        });
      }
      if (this.$route.query.color !== undefined) {
        const query = this.$route.query.color.split('_');
        query.forEach(function (item) {
          const tag = color.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'color' });
          count++;
        });
      }
      if (this.$route.query.scheme !== undefined) {
        const query = this.$route.query.scheme.split('_');
        query.forEach(function (item) {
          const tag = scheme.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'scheme' });
          count++;
        });
      }
      if (this.$route.query.technology !== undefined) {
        const query = this.$route.query.technology.split('_');
        query.forEach(function (item) {
          const tag = technology.find((key) => key.id === item);
          selectedTags.push({ id: `${tag.id}`, name: `${tag.name}`, schema: 'technology' });
          count++;
        });
      }
      this.selectedTag = selectedTags;

      // オーダーの解析
      if (this.$route.query.order !== undefined) {
        this.and = this.$route.query.order === 'and';
      }
      // AND/ORが必要かどうか判定
      if (count >= 2) {
        this.order = true;
      } else {
        this.order = false;
      }

      // 初期値設定
      this.displayingType = this.type;
      this.displayingImpression = this.impression;
      this.displayingIndustry = this.industry;
      this.displayingPickup = this.pickup;
      this.displayingTechnique = this.technique;
      this.displayingLayout = this.layout;
      this.displayingColor = this.color;
      this.displayingScheme = this.scheme;
      this.displayingTechnology = this.technology;
    },
    clickTag(id, name, schema) {
      const key = { id: `${id}`, name: `${name}`, schema: `${schema}` };
      if (this.selectedTag.find((item) => item.id === id) !== undefined) {
        // 削除
        this.selectedTag.splice(
          this.selectedTag.findIndex((item) => item.id === id),
          1
        );
      } else {
        // 追加
        this.selectedTag.push(key);
      }
      this.setQueryParameter();
    },
    clickOrder() {
      this.and = !this.and;
      this.setQueryParameter();
    },
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: var(--black-transparent);
}

.mask-enter-active {
  transition: opacity .25s ease-out;
}

.mask-leave-active {
  transition: opacity .25s ease-in;
}

.mask-enter,.mask-leave-to {
  opacity: 0;
}
.searchWrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  width: 100%;
  height: 40px;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
  }
  @include responsive(lg) {
    margin-top: 0;
    width: 800px;
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}

.searchBlock {
  display: flex;
  overflow-x: hidden;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  border: 1px var(--search-border) solid;
  border-radius: 50px;
  background-color: var(--white);

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
  &.selected {
    z-index: 150;
  }
}
.imageWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchImage {
  margin-right: 10px;
  margin-left: 6px;
  width: 17px;

  fill: var(--search-icon);
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
.search {
  width: calc(100% - 20px);
  height: 36px;
  border-radius: 4px;
  color: var(--search-text);
  font-size: var(--font-size-sm);
}
::placeholder {
  color: var(--search-placeholder);
}
.tags {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 150;
  visibility: hidden;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  border: 1px var(--menu-border) solid;
  background-color: var(--menu-background);
  opacity: 0;
  transition: opacity .2s, transform .2s;
  transform: translateY(-10px);
  &.open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
}
.tag {
  margin-bottom: 24px;
}
.title {
  color: var(--menu-text);
  font-weight: 400;
  font-size: 15px;
}
.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 8px;
}
.item {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 3px 10px 5px;
  border: 1px var(--menu-border) solid;
  border-radius: 20px;
  background-color: var(--menu-background);
  color: var(--menu-item-text);
  font-weight: 400;
  font-size: var(--font-size-xs);
  &.selected {
    background-color: var(--menu-item-selected);
    color: var(--menu-text);
  }
}
.searchBox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  padding: 5px 6px 6px 10px;
  border: 1px var(--gray4) solid;
  background-color: var(--white);
  color: var(--gray13);
  white-space: nowrap;
}
.cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  width: 14px;
  height: 17px;
}
.cancelImage {
  margin-top: 3px;
  width: 9px;

  fill: var(--black);
}
.orders {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 5px 6px 6px 6px;
  border-radius: 50px;
  background-color: var(--gray3);
  .order {
    z-index: 10;
    margin-bottom: 1px;
    width: 30px;
    color: var(--black);
    font-weight: 400;
    font-size: 12px;

    &.and {
      margin-left: 2px;
    }
  }
  .swich {
    position: absolute;
    top: 3px;
    left: 4px;
    width: 33px;
    height: 23px;
    border-radius: 50px;
    background-color: var(--white);
    transition: width .1s, left .1s;
    &.and {
      left: 34px;
      width: 37px;
    }
  }
}

.comment {
  color: var(--menu-comment);
  font-weight: 400;
}

</style>
