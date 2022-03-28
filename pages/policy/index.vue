<template>
  <div class="wrapper">
    <SimpleHeader />
    <main class="main">
      <div class="policy">
        <div class="title-outer">
          <h2 class="title">プライバシーポリシー</h2>
        </div>
        <div class="container">
          <p>
            Monet（以下、「当サイト」といいます。）では、ユーザーの個人情報等の取扱いについて、以下のとおりプライバシーポリシー(以下「本ポリシー」といいます。)を定めます。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第１条（個人情報等の利用目的）</h3>
          <p class="content">
            当サイトは、お預かりした名前、メールアドレス、その他の個人に関わる情報（以下「個人情報等」といいます。）を、お問い合わせ、ご依頼等への対応に利用させていただき、ご本人の承諾なく、他の目的には利用いたしません。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第２条（個人情報等の第三者提供）</h3>
          <p class="content">
            当サイトでお預かりした個人情報等については、個人情報保護法及びその他の法令で認められる場合を除き、第三者へ提供することはありません。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第３条（お問い合わせ先）</h3>
          <p class="content">
            ご意見、ご質問等のお申出、その他個人情報等の取扱いに関するお問い合わせは、以下のお問い合わせ先までお願い致します。
          </p>
          <p class="info">
            【お問い合わせ先】
            <br>
            （メールアドレス）
            <br>
            contact@monet-design.com
            <br>
            （コンタクトフォーム）
            <br>
            https://monet-design.com/contact
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第４条（プライバシーポリシーの変更手続）</h3>
          <p class="content">
            当サイトは、個人情報等の取扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、本ポリシーを変更することがあります。変更した場合には、本サイトに掲載する方法で通知いたします。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第５条（免責事項）</h3>
          <p class="content">
            当サイトに掲載している情報の正確性には万全を期しておりますが、利用者が当サイトの情報を用いて行う行動及び、リンク先で生じた損失・損害に関して一切の責任を負わないものとします。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第６条（著作権・肖像権）</h3>
          <p class="content">
            当サイトで掲載している画像の著作権・肖像権は各サイトの権利者様に帰属します。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第７条（アクセス解析ツール）</h3>
          <p class="content">
            当サイトは、アクセス解析ツールとして｢Googleアナリティクス｣を利用しています。｢Googleアナリティクス｣はトラフィックデータの収集のため｢Cookie｣を使用します。なお、トラフィックデータは匿名で収集されており、個人を特定するものではありません。また、｢Cookie｣を無効にすることで収集を拒否することもできます。必要な場合はお使いのブラウザで設定ください。
          </p>
        </div>
        <div class="container">
          <h3 class="heading">第８条（広告）</h3>
          <p class="content">
            当サイトは、広告サービスとして｢Googleアドセンス｣を利用しています。｢Googleアドセンス｣は、｢Cookie｣を使用し、ユーザーが当サイトや他のサイトにアクセスした際の情報に基づいて、ユーザーの興味に応じた商品やサービスの広告を表示します。なお、このようなパーソナライズ広告は広告設定で無効にすることもできます。
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: var(--gray0);
}

.main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: var(--font-size-lg);
  color: var(--gray9);
  line-height: 1.7em;
  padding: 10px 10px;
  @include responsive(xs) {
    padding: 10px 10px;
  }
  @include responsive(sm) {
    padding: 30px 20px;
  }
  @include responsive(md) {
    padding: 50px 30px;
  }
  @include responsive(lg) {
    padding: 80px 50px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.policy {
  width: 100%;
  max-width: 800px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 0px 20px var(--gray2);
  padding: 120px 20px 50px;
  position: relative;
  @include responsive(xs) {
    padding: 120px 20px 50px;
  }
  @include responsive(sm) {
    padding: 130px 40px 50px;
  }
  @include responsive(md) {
    padding: 140px 70px 50px;
  }
  @include responsive(lg) {
    padding: 150px 70px 50px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.title-outer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--colormode2);
  border-radius: 10px 10px 0 0;
  height: 70px;
  @include responsive(xs) {
    height: 70px;
  }
  @include responsive(sm) {
    height: 80px;
  }
  @include responsive(md) {
    height: 90px;
  }
  @include responsive(lg) {
    height: 100px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.title {
  font-size: var(--font-size-xxl);
  color: var(--white);
}

.container {
  
  &:not(:last-child) {
    margin-bottom: 55px;
  }
}

.heading {
  margin-bottom: 18px;
  font-weight: 300;
  font-size: var(--font-size-lg);
}

.info {
  margin-top: 14px;
}
</style>
