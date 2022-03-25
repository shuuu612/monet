<template>
  <div class="wrapper">
    <header class="header">
      <h1>
       <Logo />
      </h1>
    </header>
    <main class="main">
      <div class="contact-form">
        <h2 class="title">お問い合わせ</h2>
        <div class="status-outer">
          <div class="status input" :class="{selected: $route.query.status === undefined}">入力</div>
          <div class="status check" :class="{selected: $route.query.status === 'check'}">確認</div>
          <div class="status thanks" :class="{selected: $route.query.status === 'thanks' || $route.query.status === 'failed'}">完了</div>
        </div>
        <div v-if="$route.query.status === undefined" class="form-outer">
          <validation-observer
            v-slot="{ invalid }"
            ref="observer"
            class="form"
            tag="form"
            @submit.prevent="check"
          >
            <FormValidationInput
              rules="required|max:30"
              labelMessage="お名前"
              inputType="text"
              formComponentName="name"
              maxLength="50"
              placeHolderMessage="山田太郎"
              :inputValue.sync="inputName"
            >
            </FormValidationInput>
            <FormValidationInput
              rules="required|email|max:256"
              labelMessage="メールアドレス"
              inputType="email"
              formComponentName="email"
              maxLength="256"
              placeHolderMessage="contact@example.com"
              :inputValue.sync="inputEmail"
            />
            <FormValidationTextarea
              rules="required|max:1000"
              labelMessage="お問い合わせ内容"
              textareaCols="20"
              textareaRows="10"
              formComponentName="message"
              maxLength="1000"
              placeHolderMessage="お問い合わせ内容をご入力ください"
              :inputValue.sync="inputMessage"
            >
            </FormValidationTextarea>
            <div class="buttons">
              <button class="button" type=”submit” :disabled="invalid" :class="{disabled: invalid}">確認</button>
            </div>
          </validation-observer>
        </div>
        <div v-else-if="$route.query.status == 'check'" class="form-outer">
          <div class="form">
            <FormInputCheck
            rules="required|max:30"
            labelMessage="お名前"
            :inputValue="inputName"
            />
            <FormInputCheck
            rules="required|email|max:256"
            labelMessage="メールアドレス"
            :inputValue="inputEmail"
            />
            <FormInputCheck
            rules="required|max:1000"
            labelMessage="お問い合わせ内容"
            :inputValue="inputMessage"
            />
            <div class="buttons">
              <button class="button" @click="back">戻る</button>
              <button class="button" :disabled="inputName === ''" :class="{disabled: inputName === ''}" @click="submit">送信</button>
            </div>
          </div>
        </div>
        <div v-else class="form-outer">
          <div v-if="$route.query.status === 'thanks'" class="comment">
            <p>送信が完了しました。</p>
            <p>お問い合わせありがとうございます。</p>
          </div>
          <div v-else-if="$route.query.status === 'failed'" class="comment">
            <p>送信に失敗しました。</p>
            <p>時間をおいて再度お問合せください。</p>
          </div>
          <div class="buttons">
              <a href="https://monet-design.com/" class="button home">ホーム</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
    data() {
        return {
            inputName: "",
            inputEmail: "",
            inputMessage: "",
            success: undefined,
        };
    },
    computed: {},
    mounted() {
        if(this.$route.query.status === 'check') {

          // ローカルストレージから情報を取得
          const contactJson = localStorage.getItem("contact");
          const contact = JSON.parse(contactJson);
          if (contact !== null) {
              this.$store.dispatch("contact/pushLocalStorage", contact);
          }
          this.inputName = this.$store.getters["contact/getName"];
          this.inputEmail = this.$store.getters["contact/getEmail"];
          this.inputMessage = this.$store.getters["contact/getMessage"];
        }
    },
    updated() {
      console.log('updated')
    },
    methods: {
      async check() {
        const isValid = await this.$refs.observer.validate();
        if (isValid) {
          this.$router.push({path: '', query: { status: 'check'}});
          // ローカルストレージに保存
          const postData = {
            name: this.inputName,
            email: this.inputEmail,
            message: this.inputMessage,
          };
          this.$store.dispatch("contact/pushInputData", postData)
          /* requestAnimationFrame(() => {
            this.$refs.observer.reset();
          }); */
        }
      },
      back() {
        this.$store.dispatch("contact/pushClear")
        this.$router.go(-1);
      },
      async submit() {
        console.log("ボタン押下");
        console.log(this.inputName);
        console.log(this.inputEmail);
        console.log(this.inputMessage);
        const postData = {
            name: this.inputName,
            email: this.inputEmail,
            message: this.inputMessage,
        };
        if (process.env.NODE_ENV === "production") {
            await this.$axios.post("https://inquiry.microcms.io/api/v1/contact", postData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-MICROCMS-API-KEY": "a266212255964abb9b0c7285d67907a390f7",
                },
            })
            .then(res => {
              console.log('成功',res)
              this.success = true;
            })
            .catch(error => {
              console.log('エラー',error)
              this.success = false;
            })
        }
        else {
            await this.$axios.post("/api/v1/contact", postData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-MICROCMS-API-KEY": "a266212255964abb9b0c7285d67907a390f7",
                },
            })
            .then(res => {
              console.log('成功',res)
              this.success = true;
            })
            .catch(error => {
              console.log('エラー',error)
              this.success = false;
            })
        }
        this.inputName = "";
        this.inputEmail = "";
        this.inputMessage = "";
        
        if(this.success) {
          this.$store.dispatch("contact/pushClear");
          this.$router.push({path: '', query: { status: 'thanks'}});
        }else {
          this.$store.dispatch("contact/pushClear");
          this.$router.push({path: '', query: { status: 'failed'}});
        }
      },
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: var(--gray1);
}
.header {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
}
.contact-form {
  --form-size: 800px;
  --label-size: 180px;

  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title {
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 40px;
}
.status-outer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}
.status {
  width: 100px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-md);
  font-weight: 400;
  &.input {
    &.selected {
      background-color: var(--colormode2);
      color: var(--white);
    }
  }
  &.check {
    &.selected {
      background-color: var(--colormode2);
      color: var(--white);
    }
  }
  &.thanks {
    &.selected {
      background-color: var(--colormode2);
      color: var(--white);
    }
  }
}

.input,.check {
  position: relative;
  margin-right: 60px;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 120px;
    width: 20px;
    height: 2px;
    background-image: url('/images/line.svg');
  }
}
.form-outer {
  width: 100%;
  max-width: var(--form-size);
}
.form {
  width: 100%;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.button {
  width: 130px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--black);
  color: var(--white);
  font-size: var(--font-size-lg);
  /* margin: 20px auto 0; */
  display: block;
  transition: background-color .2s;
  &.disabled {
    background-color: var(--gray6);
    pointer-events: none;
  }
  &:not(:first-child) {
    margin-left: 50px;
  }
  @include hover() {
    background-color: var(--gray10);
  }
  &.home {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
}
.comment {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: var(--font-size-3xl);
  line-height: 2em;
  margin-bottom: 150px;
}
</style>
