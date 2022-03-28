<template>
  <footer class="footer">
    <div class="menu">
      <div class="content">
        <nuxt-link class="link" to="/contact">お問い合わせ</nuxt-link>
      </div>
      <div class="content">
        <nuxt-link class="link" to="/policy">プライバシーポリシー</nuxt-link>
      </div>
    </div>
    <div class="copyright">
      <p>
        <small class="text">© Monet</small>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--footer-background);
  padding: 30px 30px 14px;

}
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}
.content {
  &:not(:first-child) {
    margin-left: 56px;
  }
  .link {
    text-decoration: none;
    color: var(--footer-text);
    font-size: var(--font-size-lg);
  }
}
.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
 .text {
   color: var(--footer-text);
   font-size: var(--font-size-lg);
 }
}
</style>
