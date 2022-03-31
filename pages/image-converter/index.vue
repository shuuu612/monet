<template>
  <div class="wrapper">
    <SimpleHeader />
    <main class="main">
      <div
        class="drop-area"
        :class="getClassDropArea"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover.prevent
        @drop.prevent="dropFile"
      >
        <p class="text">ファイルアップロード</p>
      </div>
      <div class="container">
        <div v-for="(file, index) in files" :key="index" class="contents">
          <img class="image" :src="getBeforeImage(index)" alt="">
          <button class="button" :class="getClassSubmitButton(index)" :disabled="getDisabledSubmitButton(index)" @click="submit(index)">変換</button>
          <button class="button" :class="getClassDownloadButton(index)" :disabled="getDisabledDownloadButton(index)" @click="download">ダウンロード</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEnter: false,
      files: [],
      filesBase64: [],
      resFiles: [],
    };
  },
  computed: {
    getClassDropArea() {
      return { enter: this.isEnter};
    },
    getDisabledSubmitButton() {
      return function(key) {
        return !(this.files[key] && this.filesBase64[key]);
      }
    },
    getClassSubmitButton() {
      return function(key) {
        return { disabled: !(this.files[key] && this.filesBase64[key]) };
      }
    },
    getDisabledDownloadButton() {
      return function(key) {
        return !this.resFiles[key];
      }
    },
    getClassDownloadButton() {
      return function(key) {
        return { disabled: !this.resFiles[key] };
      }
    },
    getBeforeImage() {
      return function(key) {
        return this.filesBase64[key];
      }
    }
  },
  mounted() {

  },
  updated() {
    
  },
  methods: {
    dragEnter() {
      this.isEnter = true;
    },
    dragLeave() {
      this.isEnter = false;
    },
    dropFile(event) {
      this.isEnter = false;
      // ドロップされたファイルを取得
      const files = [...event.dataTransfer.files];

      // 画像ファイルだけを抽出
      const imageFiles = files.filter(item => item.type === 'image/jpeg' || item.type === 'image/png');

      // Base64変換
      for(let i = 0; i < imageFiles.length; i++) {
        // そのまま保存
        this.files.push(imageFiles[i]);
        // Base64変換して保存
        const reader = new FileReader();
        reader.onload = () => {
          this.filesBase64.push(reader.result);
        }
        reader.readAsDataURL(imageFiles[i]);
      }
    },
    deleteUnwantedPart(str) {
      // データが大きすぎると処理が止まるので前から100文字だけ切り出してからDataURIを削除する
      const str1 = str.substr(0, 100).replace(/data:.*\/.*;base64,/, '');
      const str2 = str.substr(100);
      return str1 + str2;
    },
    async submit(index) {
      // 送信データを作成
      const data = {
        image: `${this.deleteUnwantedPart(this.filesBase64[index])}`
      };

      // API Gatewayへの送信処理
      if (process.env.NODE_ENV === "production") {
        await this.$axios.post("https://808l2nkkbf.execute-api.ap-northeast-1.amazonaws.com/dev/create", data, {
          headers: {
          "x-api-key": "RSzNuTJ85l7gjssXcAOB275XV6gALdTI9AQ3Hgab",
          },
        })
        .then(res => {
          console.log("成功", res);
        })
        .catch(error => {
          console.log("エラー", error);
        });
      }
      else {
        await this.$axios.post("/dev/create", data, {
          headers: {
          "x-api-key": "RSzNuTJ85l7gjssXcAOB275XV6gALdTI9AQ3Hgab",
          },
        })
        .then(res => {
          console.log("成功", res);
          // レスポンスボディーを取得
          const dataJson = res.data.body;
          // JSONをパースする
          const data = JSON.parse(dataJson);
          // Base64をfileに変換する
          const bin = atob(data.image);
          const buffer = new Uint8Array(bin.length);
          for(let j = 0; j < bin.length; j++){
            buffer[j] = bin.charCodeAt(j);
          }
          const file = new File([buffer.buffer], `${this.getDate()}.jpeg`, {
            type: "image/jpeg"
          });
          this.resFiles[index] = file;
          this.resFiles.splice();
        })
        .catch(error => {
          console.log("エラー", error);
        });
      }
    },
    download() {
      for(let i = 0; i < this.resFiles.length; i++) {
        const link = document.createElement('a');
        link.download = `${this.getDate()}.jpeg`;
        link.href = URL.createObjectURL(this.resFiles[i]);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    },
    getDate() {
      const today = new Date();
      const date =
        today.getFullYear() +
        (today.getMonth()+1).toString().padStart(2, "0") +
        (today.getDate()).toString().padStart(2, "0") +
        (today.getHours()).toString().padStart(2, "0") +
        (today.getMinutes()).toString().padStart(2, "0") +
        (today.getSeconds()).toString().padStart(2, "0") +
        (today.getMilliseconds()).toString().padStart(3, "0")
      return date;
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: var(--gray1);
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.drop-area {
  width: 500px;
  height: 300px;
  border: 5px var(--gray8) solid;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  .text {
    font-size: var(--font-size-lg);
    color: var(--gray8);
    font-weight: 400;
    pointer-events: none;
  }
  &.enter {
    background-color: var(--gray2);
  }
}
.container {
  .contents {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px var(--colormode9) solid;
    border-radius: 8px;
    padding: 10px;
    .image {
      width: 100px;
    }
    .button {
      width: 120px;
      height: 40px;
      border-radius: 10px;
      background-color: var(--black);
      color: var(--white);
      font-size: var(--font-size-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      &.disabled {
        background-color: var(--gray7);
      }
    }
  }
}
    

</style>
