<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="rules"
    :name="labelMessage"
  >
    <div class="container">
      <div class="input">
        <label class="title" :for="formComponentName">
          {{ labelMessage }}
        </label>
        <textarea
          :id="formComponentName"
          v-model="inputValueModel"
          
          :name="formComponentName"
          :maxlength="maxLength"
          :placeholder="placeHolderMessage"
          class="textarea"
        />
      </div>
      <!-- 入力値と最大文字数を親Componentで扱えるようにする -->
      <!-- <slot :inputValue="inputValue" :maxLength="maxLength" /> -->
      <p v-show="errors.length" class="attention">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
</template>
<script>
export default {
  props: {
    rules: {
      type: String,
      required: true
    },
    labelMessage: {
      type: String,
      required: true
    },
    textareaCols: {
      type: String,
      required: true
    },
    textareaRows: {
      type: String,
      required: true
    },
    formComponentName: {
      type: String,
      required: true
    },
    maxLength: {
      type: String,
      required: true
    },
    placeHolderMessage: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    }
  },
  computed: {
    inputValueModel: {
      get() {
        return this.$props.inputValue
      },
      set(val) {
        this.$emit('update:inputValue', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 300px;
  background-color: var(--white);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 16px 20px;
  border: 1px var(--gray3) solid;
}
.input {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 20px);
}
.title {
  display: block;
  width: 150px;
  font-size: var(--font-size-md);
  font-weight: 400;
}
.attention {
  padding-left: 150px;
  padding-top: 6px;
  color: var(--red);
}
.textarea {
  width: calc(100% - 150px);
  height: 100%;
  resize: none;
  overflow: auto;
}
</style>
