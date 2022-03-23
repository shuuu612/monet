<template>
  <div class="contact-form">
    <p class="title">お問い合わせ</p>
    <validation-observer
      class="form"
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
      <FormValidationInput
        rules="required|max:50"
        labelMessage="お名前"
        inputType="text"
        formComponentName="name"
        maxLength="50"
        placeHolderMessage="山田太郎"
        :inputValue.sync="inputName"
      >
        <!-- <template v-slot="inputProps">
          <p>
            {{ inputProps.inputValue.length + '/' + inputProps.maxLength }}
          </p>
        </template> -->
      </FormValidationInput>
      <!-- メールアドレスには入力文字数を表示しない -->
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
        <!-- <template v-slot="inputProps">
          <p>
            {{ inputProps.inputValue.length + '/' + inputProps.maxLength }}
          </p>
        </template> -->
      </FormValidationTextarea>
      <button class="submit" type="submit" :disabled="invalid" :class="{disabled: invalid}">
        送信
      </button>
    </validation-observer>
  </div>
</template>
<script>
/* import $axios from "axios"; */
export default {
  /* components: {
    FormValidationInput: () =>
      import('@/components/validation/FormValidationInput'),
    FormValidationTextarea: () =>
      import('@/components/validation/FormValidationTextarea')
  }, */
  data() {
    return {
      inputName: '',
      inputEmail: '',
      inputMessage: '',
    }
  },
  methods: {
    async submit() {
      console.log('ボタン押下')
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        console.log(this.inputName)
        console.log(this.inputEmail)
        console.log(this.inputMessage)
        const postData = {
          name: this.inputName,
          email: this.inputEmail,
          message: this.inputMessage,
        }
        await this.$axios.post('https://inquiry.microcms.io/api/v1/contact',postData, {
          headers: {
            'Content-Type': 'application/json',
            'X-MICROCMS-API-KEY': 'a266212255964abb9b0c7285d67907a390f7', // 作成したAPI-KEY
          },
        })
        // バリデーション通過時の処理(例：サーバーに値を送信する等)
        // サンクスページに遷移
        this.$router.push('/contact/success')

        requestAnimationFrame(() => {
          this.$refs.observer.reset();
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  background-color: var(--gray1);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title {
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 30px;
}
.form {
  width: 100%;
  max-width: 700px;
}
.submit {
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: var(--black);
  color: var(--white);
  font-size: var(--font-size-lg);
  margin: 20px auto 0;
  display: block;
  &.disabled {
    background-color: var(--gray7);
    pointer-events: none;
  }
}
</style>
