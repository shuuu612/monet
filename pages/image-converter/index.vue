<template>
  <div class="wrapper">
    <SimpleHeader />
    <main class="main">
      <div class="switch-outer">
        <p class="switch-text">すべての画像に同じ設定を適応</p>
        <SwitchButton :on="allInOneSetting" @click="clickSwitch"/>
      </div>
      <div class="contents">
        <div v-for="(files, index) in getSettingFiles" :key="index" class="content">
          <div class="image-area">
            <div class="image-outer" :style="getImageStyle(index)">
              <img class="image" :style="getImageStyle(index)" :src="files[0].originalInfo + files[0].originalImage" alt="">
              <svg v-if="getMultiImage" class="multi-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350.03 294.47" fill="#231815">
                <path d="M331.53,67.78h-35.1v20h33.61v186.69H87.78v-33.61h-20v35.1c0,10.2,8.3,18.51,18.51,18.51h245.24c10.2,0,18.51-8.3,18.51-18.51V86.29c0-10.21-8.3-18.51-18.51-18.51Z"/>
                <rect width="282.25" height="226.69" rx="18.51" ry="18.51"/>
              </svg>
            </div>
          </div>
          <div class="boby-outer">
            <p class="name">{{files[0].originalName}}</p>
            <div v-for="(file, index2) in files" :key="index2 + 1000" class="setting-outer">
              <div class="setting-contents before">
                <div class="setting-content format">
                  <svg class="format-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 353.67 424.82" fill="#231815">
                    <path d="M353.67,116.6c0-.61-.11-1.2-.18-1.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H319.58c18.69,0,33.9-15.21,33.9-33.9V118.39c.07-.6,.18-1.17,.18-1.8Zm-37.64-14.59h-70.04V31.96l70.04,70.04Zm3.55,293.63H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91V390.92c0,2.6-2.12,4.72-4.72,4.72Z"/>
                  </svg>
                  <p class="text">{{getFormatName(file.originalFormat)}}</p>
                </div>
                <div class="setting-content size">
                  <svg class="size-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504.78 367.79" fill="#231815">
                    <path d="M479.17,367.79H25.61c-14.12,0-25.61-11.49-25.61-25.61V25.61C0,11.49,11.49,0,25.61,0H479.17c14.12,0,25.61,11.49,25.61,25.61V342.19c0,14.12-11.49,25.61-25.61,25.61ZM26,341.79H478.78V26H26V341.79Z"/>
                    <path d="M436.48,54.19c-.71-.12-1.44-.2-2.18-.2h-90.71c-7.18,0-13,5.82-13,13s5.82,13,13,13h79.58v77.89c0,7.18,5.82,13,13,13s13-5.82,13-13V67.17c0-7.08-5.66-12.82-12.69-12.98Z"/>
                    <path d="M160.08,289.52H80.49v-77.89c0-7.18-5.82-13-13-13s-13,5.82-13,13v90.71c0,7.08,5.66,12.82,12.69,12.98,.71,.12,1.44,.2,2.18,.2h90.71c7.18,0,13-5.82,13-13s-5.82-13-13-13Z"/>
                  </svg>
                  <p class="text">{{`${file.originalWidth}×${file.originalHeight}`}}</p>
                </div>
                <div class="setting-content capacity">
                  <svg class="capacity-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.25 346.08" fill="#231815">
                    <path d="M451.25,138.19c0-6.78-2.02-13.53-5.96-19.29h0c-6.37-9.36-16.99-14.96-28.31-14.96h-20.56v-27.46c-.03-9.12-3.61-17.77-10.04-24.23-6.47-6.43-15.11-10.01-24.23-10.04H175.17l-10.47-22.44h0C159.07,7.71,146.95,0,133.65,0H34.27C25.15,.03,16.5,3.61,10.04,10.04,3.61,16.5,.03,25.14,0,34.27V312.96c0,1.14,.39,2.16,.66,3.23,.67,5.27,2.22,10.43,5.3,14.94h0c6.37,9.36,16.98,14.96,28.31,14.96H362.16c14.1,0,26.73-8.62,31.88-21.74l.31-.87,54.83-173.61h-.05c1.38-3.79,2.13-7.74,2.13-11.67ZM27.41,34.27c-.03-1.71,.78-3.65,2.01-4.85,1.19-1.23,3.15-2.03,4.85-2.01h99.38c2.68,0,5.07,1.53,6.21,3.96h0l14.16,30.34c2.25,4.83,7.09,7.91,12.42,7.91h195.72c1.7-.03,3.65,.78,4.85,2.01,1.23,1.2,2.03,3.14,2.01,4.85v27.46H89.09c-14.09,0-26.73,8.62-31.88,21.74l-.31,.87-29.49,93.37V34.27Zm395.94,106.45l-.32,.88-54.59,172.83c-1.04,2.52-3.53,4.24-6.29,4.24H34.27c-2.28,0-4.38-1.12-5.66-2.99h0c-.8-1.18-1.19-2.5-1.19-3.86l.47-2.49,.32-.91,54.57-172.81c1.03-2.54,3.55-4.27,6.32-4.26H416.98c2.28,0,4.38,1.12,5.66,2.99h0c.79,1.16,1.19,2.5,1.19,3.85l-.48,2.52Z"/>
                  </svg>
                  <p class="text">{{getBeforeFileSize(file.originalFileSize)}}</p>
                </div>
              </div>
              <svg class="setting-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.47 324.84">
                <defs>
                  <linearGradient id="arrow" x1="0" y1="162.42" x2="451.47" y2="162.42" gradientTransform="matrix(1, 0, 0, 1, 0, 0)"  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#f3f3fa"/>
                  <stop offset=".33" stop-color="#ddd8eb"/>
                  <stop offset="1" stop-color="#b5a8d1"/>
                  </linearGradient>
                </defs>
                <path d="M451.47,162.42l-207.46,162.42V0l207.46,162.42ZM162.68,234.11h60.23V90.72h-60.23V234.11Zm-81.34,0h60.23V90.72h-60.23V234.11Zm-81.34,0H60.23V90.72H0V234.11Z" style="fill:url(#arrow);"/>
              </svg>
              <div class="setting-contents after">
                <div class="setting-content format">
                  <svg class="format-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 353.67 424.82" fill="#231815">
                    <path d="M353.67,116.6c0-.61-.11-1.2-.18-1.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H319.58c18.69,0,33.9-15.21,33.9-33.9V118.39c.07-.6,.18-1.17,.18-1.8Zm-37.64-14.59h-70.04V31.96l70.04,70.04Zm3.55,293.63H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91V390.92c0,2.6-2.12,4.72-4.72,4.72Z"/>
                  </svg>
                  <p class="text" :class="getChange(getFormatName(file.originalFormat),getFormatName(file.settingFormat, index,index2))">{{getFormatName(file.settingFormat, index,index2)}}</p>
                </div>
                <div class="setting-content size">
                  <svg class="size-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504.78 367.79" fill="#231815">
                    <path d="M479.17,367.79H25.61c-14.12,0-25.61-11.49-25.61-25.61V25.61C0,11.49,11.49,0,25.61,0H479.17c14.12,0,25.61,11.49,25.61,25.61V342.19c0,14.12-11.49,25.61-25.61,25.61ZM26,341.79H478.78V26H26V341.79Z"/>
                    <path d="M436.48,54.19c-.71-.12-1.44-.2-2.18-.2h-90.71c-7.18,0-13,5.82-13,13s5.82,13,13,13h79.58v77.89c0,7.18,5.82,13,13,13s13-5.82,13-13V67.17c0-7.08-5.66-12.82-12.69-12.98Z"/>
                    <path d="M160.08,289.52H80.49v-77.89c0-7.18-5.82-13-13-13s-13,5.82-13,13v90.71c0,7.08,5.66,12.82,12.69,12.98,.71,.12,1.44,.2,2.18,.2h90.71c7.18,0,13-5.82,13-13s-5.82-13-13-13Z"/>
                  </svg>
                  <p class="text" :class="getChange(`${file.originalWidth}×${file.originalHeight}`,`${file.settingWidth}×${file.settingHeight}`)">{{`${file.settingWidth}×${file.settingHeight}`}}</p>
                </div>
                <div class="setting-content capacity">
                  <svg class="capacity-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.25 346.08" fill="#231815">
                    <path d="M451.25,138.19c0-6.78-2.02-13.53-5.96-19.29h0c-6.37-9.36-16.99-14.96-28.31-14.96h-20.56v-27.46c-.03-9.12-3.61-17.77-10.04-24.23-6.47-6.43-15.11-10.01-24.23-10.04H175.17l-10.47-22.44h0C159.07,7.71,146.95,0,133.65,0H34.27C25.15,.03,16.5,3.61,10.04,10.04,3.61,16.5,.03,25.14,0,34.27V312.96c0,1.14,.39,2.16,.66,3.23,.67,5.27,2.22,10.43,5.3,14.94h0c6.37,9.36,16.98,14.96,28.31,14.96H362.16c14.1,0,26.73-8.62,31.88-21.74l.31-.87,54.83-173.61h-.05c1.38-3.79,2.13-7.74,2.13-11.67ZM27.41,34.27c-.03-1.71,.78-3.65,2.01-4.85,1.19-1.23,3.15-2.03,4.85-2.01h99.38c2.68,0,5.07,1.53,6.21,3.96h0l14.16,30.34c2.25,4.83,7.09,7.91,12.42,7.91h195.72c1.7-.03,3.65,.78,4.85,2.01,1.23,1.2,2.03,3.14,2.01,4.85v27.46H89.09c-14.09,0-26.73,8.62-31.88,21.74l-.31,.87-29.49,93.37V34.27Zm395.94,106.45l-.32,.88-54.59,172.83c-1.04,2.52-3.53,4.24-6.29,4.24H34.27c-2.28,0-4.38-1.12-5.66-2.99h0c-.8-1.18-1.19-2.5-1.19-3.86l.47-2.49,.32-.91,54.57-172.81c1.03-2.54,3.55-4.27,6.32-4.26H416.98c2.28,0,4.38,1.12,5.66,2.99h0c.79,1.16,1.19,2.5,1.19,3.85l-.48,2.52Z"/>
                  </svg>
                  <p class="text" :class="getChange(getBeforeFileSize(file.originalFileSize),getAfterFileSize(file.outputImageSize))">{{getAfterFileSize(file.outputImageSize)}}</p>
                </div>
              </div>
              <button class="setting-button" @click="openMenu(index, index2)">
                <svg class="setting-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.29 434.76" fill="#231815">
                  <path d="M371.29,338.69v-8.9c0-5.36-4.35-9.71-9.71-9.71h-6.45c-4.3,0-8.15-2.81-9.31-6.95-1.68-6-4.05-11.71-7.03-17.03-2.1-3.76-1.38-8.46,1.66-11.51l4.55-4.55c3.79-3.79,3.79-9.94,0-13.73l-6.29-6.29c-3.79-3.79-9.94-3.8-13.73,0l-4.57,4.56c-3.04,3.04-7.75,3.76-11.5,1.65-5.32-2.98-11.02-5.35-17.01-7.02-4.14-1.16-6.96-5.01-6.96-9.31v-6.45c0-5.36-4.35-9.71-9.71-9.71h-8.9c-5.36,0-9.71,4.35-9.71,9.71v6.45c0,4.3-2.81,8.16-6.96,9.31-6,1.68-11.71,4.05-17.03,7.03-3.76,2.11-8.47,1.39-11.51-1.66l-4.55-4.55c-3.79-3.79-9.95-3.79-13.74,0l-6.28,6.29c-3.79,3.79-3.79,9.94,0,13.73l4.56,4.56c3.04,3.04,3.76,7.75,1.66,11.51-2.98,5.32-5.35,11.03-7.03,17.02-1.16,4.14-5.01,6.95-9.31,6.95h-6.45c-5.36,0-9.71,4.35-9.71,9.71v8.9c0,5.36,4.35,9.71,9.71,9.71h6.45c4.3,0,8.15,2.81,9.31,6.95,1.68,6,4.05,11.7,7.03,17.02,2.1,3.76,1.39,8.46-1.66,11.51l-4.56,4.56c-3.79,3.79-3.79,9.94,0,13.73l6.28,6.28c3.79,3.79,9.94,3.8,13.74,0l4.55-4.55c3.05-3.04,7.76-3.76,11.51-1.65,5.32,2.99,11.03,5.36,17.03,7.04,4.14,1.16,6.96,5.01,6.96,9.31v6.44c0,5.36,4.35,9.71,9.71,9.71h8.9c5.36,0,9.71-4.35,9.71-9.71v-6.44c0-4.3,2.81-8.15,6.95-9.31,6-1.68,11.7-4.05,17.03-7.04,3.76-2.11,8.47-1.39,11.51,1.66l4.55,4.55c3.79,3.79,9.94,3.79,13.74,0l6.28-6.28c3.79-3.79,3.79-9.94,0-13.73l-4.55-4.55c-3.04-3.04-3.76-7.75-1.66-11.51,2.98-5.32,5.36-11.03,7.03-17.03,1.16-4.14,5.01-6.95,9.31-6.95h6.45c5.36,0,9.71-4.35,9.71-9.71Zm-73.83,22.25c-6.86,6.86-16.28,11.09-26.7,11.09s-19.84-4.23-26.71-11.09c-6.84-6.86-11.08-16.27-11.08-26.7s4.24-19.84,11.08-26.7c6.87-6.85,16.27-11.08,26.71-11.08s19.84,4.23,26.7,11.08c6.86,6.86,11.08,16.27,11.08,26.7s-4.22,19.84-11.08,26.7Z"/>
                  <path d="M353.49,114.8v-10.57c0-3.87-1.54-7.59-4.27-10.32L259.57,4.27c-2.73-2.73-6.45-4.27-10.32-4.27H33.9C15.21,0,0,15.21,0,33.9V390.92c0,18.69,15.21,33.9,33.9,33.9H164.28v-.02c7.92-.16,14.29-6.62,14.29-14.58h0c0-7.96-6.37-14.41-14.29-14.58v-.02H33.9c-2.6,0-4.71-2.12-4.71-4.72V33.9c0-2.6,2.12-4.71,4.71-4.71H216.8V116.6c0,8.07,6.53,14.6,14.59,14.6h92.91v97.94c-.01,.27-.04,.54-.04,.81,0,8.06,6.53,14.59,14.59,14.59s14.26-6.23,14.56-14.03h.08V118.39c.07-.6,.18-1.17,.18-1.79s-.11-1.2-.18-1.8Zm-107.5-12.79V31.96l70.04,70.04h-70.04Z"/>
                  <path d="M270.77,186.01H68.63c-8.28,0-15-6.72-15-15s6.72-15,15-15h202.14c8.28,0,15,6.72,15,15s-6.72,15-15,15Z"/>
                  <path d="M172.3,265.55H67.77c-8.28,0-15-6.72-15-15s6.72-15,15-15h104.54c8.28,0,15,6.72,15,15s-6.72,15-15,15Z"/>
                </svg>
              </button>
              <button class="delete-button" @click="deleteSetting(index, index2)">
                <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 153.78" fill="#231815">
                  <path d="M151.77,129.15l-53.36-53.36,51.16-51.16c5.64-5.64,5.64-14.77,0-20.4s-14.77-5.64-20.4,0l-51.16,51.16L26.84,4.23C21.21-1.41,12.08-1.41,6.44,4.23,.8,9.86,.8,19,6.44,24.63l51.16,51.16L4.23,129.15c-5.64,5.64-5.64,14.77,0,20.41,2.82,2.82,6.51,4.23,10.2,4.23s7.38-1.41,10.2-4.23l53.37-53.36,53.36,53.36c2.82,2.82,6.51,4.23,10.2,4.23s7.38-1.41,10.2-4.23c5.64-5.64,5.64-14.77,0-20.41Z"/>
                </svg>
              </button>
              <Menu
              :uniqueIndex="index"
              :uniqueIndex2="index2"
              :selectedIndex="selectedIndex"
              :selectedIndex2="selectedIndex2"
              :open="isOpenMenu"
              :format="settingFiles[index][index2].settingFormat"
              :formatLevel="settingFiles[index][index2].settingFormatLevel"
              :originalWidth="settingFiles[index][index2].originalWidth"
              :originalHeight="settingFiles[index][index2].originalHeight"
              :width="settingFiles[index][index2].settingWidth"
              :height="settingFiles[index][index2].settingHeight"
              :fit="settingFiles[index][index2].settingFit"
              :position="settingFiles[index][index2].settingPosition"
              :background="settingFiles[index][index2].settingBackground"
              :image="files[0].originalInfo + files[0].originalImage"
              :originalFormat="settingFiles[index][index2].originalFormat"
              @click-mask="closeMenu"
              @cancel="closeMenu"
              @disision="setReceiveData"
              />
            </div>
            <button class="add-button" @click="addSetting(index)">
              <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.73 207.73" fill="#231815">
                <path d="M195.51,91.65H116.09V12.22c0-6.75-5.47-12.22-12.22-12.22s-12.22,5.47-12.22,12.22V91.65H12.22c-6.75,0-12.22,5.47-12.22,12.22s5.47,12.22,12.22,12.22H91.65v79.43c0,6.75,5.47,12.22,12.22,12.22s12.22-5.47,12.22-12.22V116.09h79.43c6.75,0,12.22-5.47,12.22-12.22s-5.47-12.22-12.22-12.22Z"/>
              </svg>
            </button>
          </div>
          <div class="button-outer">
            <Button
            text="変換"
            width="120px"
            height="32px"
            type="white"
            :disabled="getDisabledSubmitButton(index)"
            :style="{marginBottom: '10px'}"
            @click="manageSubmit(index)"
            />
            <Button
            text="ダウンロード"
            width="120px"
            height="32px"
            type="purple"
            :disabled="getDisabledDownloadButton(index)"
            @click="manageDownload(index)"
            />
            <!-- <button class="button conversion" :class="getClassSubmitButton(index)" :disabled="getDisabledSubmitButton(index)" @click="submit(index)">変換</button>
            <button class="button download" :class="getClassDownloadButton(index)" :disabled="getDisabledDownloadButton(index)" @click="download(index)">ダウンロード</button> -->
          </div>
            
        </div>
      </div>
      <div
        class="drop-area"
        :class="getClassDropArea"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover.prevent
        @drop.prevent="dropFile"
      >
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.47 370.52" fill="#231815">
          <path id="d" d="M308.47,101.7c-.02-.52-.07-1.05-.16-1.56v-9.22c0-3.37-1.34-6.61-3.72-9L226.39,3.73c-2.39-2.38-5.62-3.73-8.99-3.73H29.57C13.25,.02,.02,13.25,0,29.57V340.95c.02,16.32,13.25,29.55,29.57,29.57h249.17c16.32-.02,29.55-13.25,29.57-29.57V103.26c.09-.52,.14-1.04,.16-1.57m-32.83-12.72h-61.09V27.88l61.09,61.09Zm3.1,256.1H29.57c-2.27,0-4.11-1.84-4.11-4.11V29.57c0-2.27,1.84-4.11,4.11-4.11H189.09V101.68c0,7.03,5.69,12.73,12.72,12.73h81.04v226.54c0,2.27-1.84,4.11-4.11,4.11"/>
          <path d="M197.43,201.89h-38.39v-38.39c0-4.54-3.68-8.23-8.23-8.23s-8.23,3.68-8.23,8.23v38.39h-38.39c-4.54,0-8.23,3.68-8.23,8.23s3.68,8.23,8.23,8.23h38.39v38.39c0,4.54,3.68,8.23,8.23,8.23s8.23-3.68,8.23-8.23v-38.39h38.39c4.54,0,8.23-3.68,8.23-8.23s-3.68-8.23-8.23-8.23Z"/>
        </svg>
        <div class="text-outer">
          <label for="upload" class="upload-outer">ここをクリック</label>
          <p class="text">またはドラッグ&ドロップでファイルを追加できます。</p>
        </div>
        <p class="text margin-top-20">対応ファイル：JPEG / PNG / WebP / GIF / TIFF / AVIF / HEIF / BMP</p>
        <input id="upload" class="upload" type="file" :accept="supportFormat" multiple @change="dropFile" />
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEnter: false,
      firstFiles: [],
      settingFiles: [],
      outputFiles: [],
      isOpenMenu: false,
      selectedIndex: 0,
      selectedIndex2: 0,
      allInOneSetting: false,
      supportFormat: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/avif',
        'image/heif',
        'image/tiff',
        'image/bmp',
      ],
      meta: {
        title: '画像変換ツール | Monet',
        keywords: '',
        description: '',
        type: 'website',
        url: 'https://mitsukaru-design.com/',
        image: 'https://mitsukaru-design.com/images/ogp/logo.png',
      },
    };
  },
  head() {
    return {
      htmlAttrs: {
        class: 'image-converter',
      },
      title: this.meta.title,
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
    getSettingFiles() {
      console.log('getSettingFiles');
      return this.allInOneSetting ? this.firstFiles : this.settingFiles;
    },
    getClassDropArea() {
      return { enter: this.isEnter };
    },
    getDisabledSubmitButton() {
      return function (key) {
        return !this.settingFiles[key];
      };
    },
    getDisabledDownloadButton() {
      return function (key) {
        const length = this.settingFiles[key].length;
        let count = 0;
        for (let i = 0; i < length; i++) {
          if (this.settingFiles[key][i].outputImage) count++;
        }
        return !(length === count);
      };
    },
    getFormatName() {
      return function (key, index, index2) {
        if (key === 'webp') return 'WebP';
        else if (key === 'original') return this.settingFiles[index][index2].originalFormat.toUpperCase();
        else return key.toUpperCase();
      };
    },
    getBeforeFileSize() {
      return function (key) {
        return this.formatFileSize(key);
      };
    },
    getAfterFileSize() {
      return function (key) {
        if (key === 0) {
          return '---';
        } else {
          return this.formatFileSize(key);
        }
      };
    },
    getImageStyle() {
      return function (index) {
        console.log('getImageStyle');
        if (this.settingFiles[index][0].originalWidth >= this.settingFiles[index][0].originalHeight) {
          return { width: '100%' };
        } else {
          return { height: '100%' };
        }
      };
    },
    getChange() {
      return function (before, after) {
        return { change: before !== after };
      };
    },
    getMultiImage() {
      return Object.keys(this.settingFiles).length > 1 && this.allInOneSetting;
    },
  },
  watch: {
    settingFiles(value) {
      console.log('settingFiles', value);
      this.firstFiles.length = 0;
      if (value.length === 0) {
        // 最後の設定を削除したとき
        this.firstFiles.splice();
      } else {
        this.firstFiles.push(value[0]);
      }
    },
  },
  mounted() {},
  updated() {},
  methods: {
    dragEnter() {
      this.isEnter = true;
    },
    dragLeave() {
      this.isEnter = false;
    },
    async dropFile(event) {
      this.isEnter = false;
      // ファイル選択またはドロップされたファイルを取得
      const inputFiles = event.target.files ? event.target.files : event.dataTransfer.files;
      const files = [...inputFiles];
      console.log(inputFiles);
      console.log(files);

      // 許可する画像ファイルだけを抽出
      const imageFiles = files.filter((item) => this.supportFormat.includes(item.type));

      // 対応ファイル以外のアップロードに対するメッセージを表示
      if (imageFiles.length === 0) {
        alert('このファイルは対象外です。');
      } else if (imageFiles.length < files.length) {
        alert('対象外のファイルが含まれていました。');
      }

      // データをローカルに保存
      for (let i = 0; i < imageFiles.length; i++) {
        // Base64変換
        let imageBase64;
        await this.conversionBase64(imageFiles[i])
          .then((res) => {
            imageBase64 = res;
          })
          .catch((err) => {
            console.log(err);
          });
        // フォーマット部分を抜き出し
        const format1 = imageBase64;
        const format2 = format1.substr(0, format1.indexOf(';'));
        const format = format2.substr(format2.indexOf('/') + 1);

        // 情報部を取得
        const info1 = imageBase64;
        const info = info1.substr(0, info1.indexOf('base64,') + 7);

        // 画像本体を取得
        const image1 = imageBase64;
        const image = image1.substr(image1.indexOf('base64,') + 7);

        // 画像サイズを取得
        let width;
        let height;
        await this.getImageSize(imageFiles[i])
          .then((res) => {
            width = res.width;
            height = res.height;
          })
          .catch((err) => {
            console.log(err);
          });
        // データを作成
        const data = [
          {
            originalName: imageFiles[i].name,
            originalFileSize: imageFiles[i].size,
            originalWidth: width,
            originalHeight: height,
            originalFormat: format,
            originalInfo: info,
            originalImage: image,
            settingFormat: 'original',
            settingFormatLevel: 'none',
            settingWidth: width,
            settingHeight: height,
            settingFit: 'cover',
            settingPosition: 'center',
            settingBackground: '#000000',
            outputInfo: '',
            outputImage: '',
            outputImageSize: 0,
          },
        ];
        this.settingFiles.push(data);
      }
    },
    conversionBase64(src) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(src);
      });
    },
    getImageSize(src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
        image.src = URL.createObjectURL(src);
      });
    },
    formatFileSize(data) {
      if (data / 1000 < 1000) return Math.round(data / 1000) + 'KB';
      else if (data / 1000000 < 1000) return Math.round((data / 1000000) * 10) / 10 + 'MB';
      else return data + 'B';
    },
    conversionFormatLevel(format, level) {
      console.log('conversionFormatLevel');
      // オリジナルまたはロスレスの場合は設定不要
      if (format === 'original' || level === 'lossless') return 0;

      if (format === 'jpeg' || format === 'webp' || format === 'tiff' || format === 'avif' || format === 'heif') {
        if (level === 'high') return 100;
        else if (level === 'middle') return 80;
        else if (level === 'low') return 50;
        else return 80;
      } else if (format === 'png') {
        if (level === 'high') return 9;
        else if (level === 'middle') return 6;
        else if (level === 'low') return 3;
        else return 6;
      } else {
        return 0;
      }
    },
    async manageSubmit(index) {
      const length = this.settingFiles[index].length;
      for (let i = 0; i < length; i++) {
        await this.submit(index, i);
      }
    },
    async submit(index, index2) {
      // 送信データを作成
      const data = {
        image: this.settingFiles[index][index2].originalImage,
        type: this.settingFiles[index][index2].originalFormat,
        format: this.settingFiles[index][index2].settingFormat,
        original: this.settingFiles[index][index2].settingFormat === 'original',
        level: this.conversionFormatLevel(
          this.settingFiles[index][index2].settingFormat,
          this.settingFiles[index][index2].settingFormatLevel
        ),
        lossless: this.settingFiles[index][index2].settingFormatLevel === 'lossless',
        resize:
          this.settingFiles[index][index2].originalWidth !== this.settingFiles[index][index2].settingWidth ||
          this.settingFiles[index][index2].originalHeight !== this.settingFiles[index][index2].settingHeight,
        width: this.settingFiles[index][index2].settingWidth,
        height: this.settingFiles[index][index2].settingHeight,
        fit: this.settingFiles[index][index2].settingFit,
        position: this.settingFiles[index][index2].settingPosition,
        background: this.settingFiles[index][index2].settingBackground,
      };
      // Amazon API Gatewayへの送信処理
      let success = true;
      let response;
      if (process.env.NODE_ENV === 'production') {
        await this.$axios
          .post('https://0nw778k56a.execute-api.ap-northeast-1.amazonaws.com/dev/v1/image-converter', data, {
            headers: {
              'x-api-key': 'RSzNuTJ85l7gjssXcAOB275XV6gALdTI9AQ3Hgab',
            },
          })
          .then((res) => {
            console.log('送受信成功', res);
            success = true;
            response = res;
          })
          .catch((err) => {
            console.log('エラー', err);
            success = false;
          });
      } else {
        await this.$axios
          .post('/dev/v1/image-converter', data, {
            headers: {
              'x-api-key': 'RSzNuTJ85l7gjssXcAOB275XV6gALdTI9AQ3Hgab',
            },
          })
          .then((res) => {
            console.log('送受信成功', res);
            success = true;
            response = res;
          })
          .catch((err) => {
            console.log('エラー', err);
            success = false;
          });
      }
      if (success) {
        // サーバー側でのエラーを検証
        if (response.data.errorMessage) {
          console.log('サーバーのエラー', response.data.errorMessage);
          if (response.data.errorMessage.includes('timed out')) {
            alert('タイムアウト\nファイルが大きすぎる可能性があります。');
          } else {
            alert('エラーが発生しました');
          }
          return;
        } else {
          console.log('サーバー処理正常');
        }

        // レスポンスボディーを取得
        const dataJson = response.data.body;

        // JSONをパースする
        const data = JSON.parse(dataJson);

        // Base64をfileに変換する
        const bin = atob(data.image);
        const buffer = new Uint8Array(bin.length);
        for (let j = 0; j < bin.length; j++) {
          buffer[j] = bin.charCodeAt(j);
        }
        const file = new File([buffer.buffer], `${this.getDate()}.${this.getFormat(index, index2)}`, {
          type: `image/${this.getFormat(index, index2)}`,
        });

        // 変換後の情報部を作成
        const info = this.settingFiles[index][index2].originalInfo.replace(
          this.settingFiles[index][index2].originalFormat,
          this.settingFiles[index][index2].settingFormat
        );

        this.settingFiles[index][index2].outputImage = data.image;
        this.settingFiles[index][index2].outputInfo = info;
        this.settingFiles[index][index2].outputImageSize = file.size;
        this.settingFiles.splice();
      } else {
        alert('送信に失敗しました。');
      }
    },
    async manageDownload(index) {
      const length = this.settingFiles[index].length;
      for (let i = 0; i < length; i++) {
        await this.download(index, i);
      }
    },
    async download(index, index2) {
      const link = document.createElement('a');
      link.download = `${this.getDate()}.${this.getFormat(index, index2)}`;
      link.href = this.settingFiles[index][index2].outputInfo + this.settingFiles[index][index2].outputImage;
      link.click();
      await URL.revokeObjectURL(link.href);
    },
    getDate() {
      const today = new Date();
      const date =
        today.getFullYear() +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        today.getDate().toString().padStart(2, '0') +
        today.getHours().toString().padStart(2, '0') +
        today.getMinutes().toString().padStart(2, '0') +
        today.getSeconds().toString().padStart(2, '0') +
        today.getMilliseconds().toString().padStart(3, '0');
      return date;
    },
    addSetting(index) {
      if (this.allInOneSetting) {
        const length = this.settingFiles.length;
        for (let i = 0; i < length; i++) {
          // データを作成
          const data = {
            originalName: this.settingFiles[i][0].originalName,
            originalFileSize: this.settingFiles[i][0].originalFileSize,
            originalWidth: this.settingFiles[i][0].originalWidth,
            originalHeight: this.settingFiles[i][0].originalHeight,
            originalFormat: this.settingFiles[i][0].originalFormat,
            originalInfo: this.settingFiles[i][0].originalInfo,
            originalImage: this.settingFiles[i][0].originalImage,
            settingFormat: 'original',
            settingFormatLevel: 'none',
            settingWidth: this.settingFiles[i][0].originalWidth,
            settingHeight: this.settingFiles[i][0].originalHeight,
            settingFit: 'cover',
            settingPosition: 'center',
            settingBackground: '#000000',
            outputInfo: '',
            outputImage: '',
            outputImageSize: 0,
          };
          this.settingFiles[i].push(data);
        }
      } else {
        // データを作成
        const data = {
          originalName: this.settingFiles[index][0].originalName,
          originalFileSize: this.settingFiles[index][0].originalFileSize,
          originalWidth: this.settingFiles[index][0].originalWidth,
          originalHeight: this.settingFiles[index][0].originalHeight,
          originalFormat: this.settingFiles[index][0].originalFormat,
          originalInfo: this.settingFiles[index][0].originalInfo,
          originalImage: this.settingFiles[index][0].originalImage,
          settingFormat: 'original',
          settingFormatLevel: 'none',
          settingWidth: this.settingFiles[index][0].originalWidth,
          settingHeight: this.settingFiles[index][0].originalHeight,
          settingFit: 'cover',
          settingPosition: 'center',
          settingBackground: '#000000',
          outputInfo: '',
          outputImage: '',
          outputImageSize: 0,
        };
        this.settingFiles[index].push(data);
      }
    },
    deleteSetting(index, index2) {
      if (this.allInOneSetting) {
        if (this.settingFiles[index].length === 1) {
          console.log('最後の設定');
          // 最後の設定ファイルのため、画像自体を削除
          this.settingFiles.length = 0;
          this.settingFiles.splice();
        } else {
          // 選択された設定ファイルを削除
          const length = this.settingFiles.length;
          for (let i = 0; i < length; i++) {
            this.settingFiles[i].splice(index2, 1);
          }
        }
      } else if (!this.allInOneSetting) {
        if (this.settingFiles[index].length === 1) {
          this.settingFiles.splice(index, 1);
        } else {
          this.settingFiles[index].splice(index2, 1);
        }
      }
    },
    openMenu(index, index2) {
      this.isOpenMenu = true;
      this.selectedIndex = index;
      this.selectedIndex2 = index2;
    },
    closeMenu() {
      this.isOpenMenu = false;
      this.selectedIndex = 0;
      this.selectedIndex2 = 0;
    },
    setReceiveData(res) {
      if (this.allInOneSetting) {
        const length = this.settingFiles.length;
        const index2 = res.index2;
        for (let i = 0; i < length; i++) {
          this.settingFiles[i][index2].settingFormat = res.format;
          this.settingFiles[i][index2].settingFormatLevel = res.formatLevel;
          this.settingFiles[i][index2].settingWidth = res.width;
          this.settingFiles[i][index2].settingHeight = res.height;
          this.settingFiles[i][index2].settingFit = res.fit;
          this.settingFiles[i][index2].settingPosition = res.position;
          this.settingFiles[i][index2].settingBackground = res.background;
          this.settingFiles[i][index2].outputInfo = '';
          this.settingFiles[i][index2].outputImage = '';
          this.settingFiles[i][index2].outputImageSize = 0;
        }
      } else {
        const index = res.index;
        const index2 = res.index2;
        this.settingFiles[index][index2].settingFormat = res.format;
        this.settingFiles[index][index2].settingFormatLevel = res.formatLevel;
        this.settingFiles[index][index2].settingWidth = res.width;
        this.settingFiles[index][index2].settingHeight = res.height;
        this.settingFiles[index][index2].settingFit = res.fit;
        this.settingFiles[index][index2].settingPosition = res.position;
        this.settingFiles[index][index2].settingBackground = res.background;
        this.settingFiles[index][index2].outputInfo = '';
        this.settingFiles[index][index2].outputImage = '';
        this.settingFiles[index][index2].outputImageSize = 0;
      }

      this.closeMenu();
    },
    getFormat(index, index2) {
      if (this.settingFiles[index][index2].settingFormat === 'original') {
        return this.settingFiles[index][index2].originalFormat;
      } else {
        return this.settingFiles[index][index2].settingFormat;
      }
    },
    clickSwitch() {
      this.allInOneSetting = !this.allInOneSetting;

      // すべての画像に１つ目の設定を適応
      if (this.allInOneSetting) {
        // オリジナルデータを退避
        const length = this.settingFiles.length;
        const originalData = [];
        for (let i = 0; i < length; i++) {
          const data = {
            originalName: this.settingFiles[i][0].originalName,
            originalFileSize: this.settingFiles[i][0].originalFileSize,
            originalWidth: this.settingFiles[i][0].originalWidth,
            originalHeight: this.settingFiles[i][0].originalHeight,
            originalFormat: this.settingFiles[i][0].originalFormat,
            originalInfo: this.settingFiles[i][0].originalInfo,
            originalImage: this.settingFiles[i][0].originalImage,
          };
          originalData.push(data);
        }

        // 設定データを退避
        const length2 = this.settingFiles[0].length;
        const settingData = [];
        for (let i = 0; i < length2; i++) {
          const data = {
            settingFormat: this.settingFiles[0][i].settingFormat,
            settingFormatLevel: this.settingFiles[0][i].settingFormatLevel,
            settingWidth: this.settingFiles[0][i].settingWidth,
            settingHeight: this.settingFiles[0][i].settingHeight,
            settingFit: this.settingFiles[0][i].settingFit,
            settingPosition: this.settingFiles[0][i].settingPosition,
            settingBackground: this.settingFiles[0][i].settingBackground,
            resize: !(
              originalData[0].originalWidth === this.settingFiles[0][i].settingWidth &&
              originalData[0].originalHeight === this.settingFiles[0][i].settingHeight
            ),
          };
          settingData.push(data);
        }

        // 新規に設定ファイルを作成
        this.settingFiles = [];
        for (let i = 0; i < length; i++) {
          // データを作成
          const data = [
            {
              originalName: originalData[i].originalName,
              originalFileSize: originalData[i].originalFileSize,
              originalWidth: originalData[i].originalWidth,
              originalHeight: originalData[i].originalHeight,
              originalFormat: originalData[i].originalFormat,
              originalInfo: originalData[i].originalInfo,
              originalImage: originalData[i].originalImage,
              settingFormat: settingData[0].settingFormat,
              settingFormatLevel: settingData[0].settingFormatLevel,
              settingWidth: settingData[0].resize ? settingData[0].settingWidth : originalData[i].originalWidth,
              settingHeight: settingData[0].resize ? settingData[0].settingHeight : originalData[i].originalHeight,
              settingFit: settingData[0].settingFit,
              settingPosition: settingData[0].settingPosition,
              settingBackground: settingData[0].settingBackground,
              outputInfo: '',
              outputImage: '',
              outputImageSize: 0,
            },
          ];
          this.settingFiles.push(data);
          for (let j = 1; j < length2; j++) {
            // データを作成
            const data = {
              originalName: originalData[i].originalName,
              originalFileSize: originalData[i].originalFileSize,
              originalWidth: originalData[i].originalWidth,
              originalHeight: originalData[i].originalHeight,
              originalFormat: originalData[i].originalFormat,
              originalInfo: originalData[i].originalInfo,
              originalImage: originalData[i].originalImage,
              settingFormat: settingData[j].settingFormat,
              settingFormatLevel: settingData[j].settingFormatLevel,
              settingWidth: settingData[j].resize ? settingData[j].settingWidth : originalData[i].originalWidth,
              settingHeight: settingData[j].resize ? settingData[j].settingHeight : originalData[i].originalHeight,
              settingFit: settingData[j].settingFit,
              settingPosition: settingData[j].settingPosition,
              settingBackground: settingData[j].settingBackground,
              outputInfo: '',
              outputImage: '',
              outputImageSize: 0,
            };
            this.settingFiles[i].push(data);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  min-height: 100vh;

  background-color: var(--color1);

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
  }
  @include responsive(lg) {
  }
  @include responsive(xl) {
    align-items: center;
    justify-content: center;
  }
  @include responsive(xxl) {
  }
}

.main {
  position: relative;

  display: flex;
  overflow-x: auto;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  /* width: 100%; */

  width: 1200px;
  min-height: calc(100vh - var(--header));
  margin-bottom: 50px;
  padding: 60px 30px 200px 30px;

  border-radius: 10px;
  background-color: var(--white);
}
.switch-outer {
  position: absolute;
  top: 12px;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
}
.switch-text {
  font-size: var(--font-size-xs);
  font-weight: 400;

  margin-right: 10px;

  color: var(--gray7);
}

.contents {
  width: 100%;
}
.content {
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  min-height: 224px;
  margin-bottom: 20px;
  padding: 10px 180px 10px 230px;

  border: 2px var(--color3) solid;
  border-radius: 8px;
  background-color: var(--color1);
}
.image-area {
  position: absolute;
  top: 10px;
  left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 200px;

  border-radius: 8px;
  background-color: var(--white);
  .image {
    /* width: 100%; */
  }
}
.image-outer {
  position: relative;
}

.multi-icon {
  position: absolute;
  top: 6px;
  right: 6px;

  width: 16px;

  fill: var(--white);
}
.boby-outer {
  position: relative;
  /* margin-left: 30px; */

  width: 100%;
  padding-bottom: 80px;
  /* overflow-x: auto; */
  /* min-width: 745px; */
}
.name {
  font-size: var(--font-size-lg);
  font-weight: 400;

  margin-bottom: 10px;

  color: var(--gray7);
}
.setting-outer {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 726px;
  padding: 8px 18px;

  border-radius: 8px;
  background-color: var(--white);
  &:not(:first-child) {
    margin-bottom: 10px;
  }
}
.setting-contents {
  display: flex;
  align-items: center;
  justify-content: center;
}
.setting-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 0 6px;
  .text {
    font-weight: 400;

    margin-left: 8px;

    color: var(--gray8);
    &.change {
      color: var(--color4);
    }
  }
}
.format {
  width: 60px;
}
.size {
  width: 100px;
}
.capacity {
  width: 70px;
}
.format-icon {
  width: 11px;

  fill: var(--color2);
}
.size-icon {
  width: 15px;

  fill: var(--color2);
}
.capacity-icon {
  width: 14px;

  fill: var(--color2);
}
.setting-arrow {
  width: 40px;
  margin: 0 16px;
}

.setting-button {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  margin-left: 20px;
  &::before {
    position: absolute;
    top: -1px;
    left: -14px;

    width: 1px;
    height: 32px;

    content: '';

    background-color: var(--color3);
  }
}
.setting-icon {
  width: 20px;

  fill: var(--gray7);
}
.delete-button {
  position: absolute;
  top: -5px;
  right: -5px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 18px;
  height: 18px;

  border: 1px var(--color3) solid;
  border-radius: 20px;
  background-color: var(--white);
}
.delete-icon {
  width: 8px;

  fill: var(--color3);
}

.button-outer {
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 150px;
  height: 144px;
  /* .button {
    width: 120px;
    height: 32px;
    border-radius: 50px;
    font-size: var(--font-size-md);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-of-type {
      margin-bottom: 10px;
    }
    
    &.conversion {
      background-color: var(--white);
      color: var(--gray7);
      border: 1px var(--color3) solid;
      &.disabled {
      }
    }
    &.download {
      background-color: var(--color4);
      color: var(--white);
      &.disabled {
        background-color: var(--gray4);
      }
    }
  } */
}
.add-button {
  position: absolute;
  bottom: 18px;
  left: calc(50% - 25px);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 50px;
  background-color: var(--white);
}
.add-icon {
  width: 20px;

  fill: var(--color3);
}
.drop-area {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding: 80px;

  border: 2px var(--color3) dashed;
  border-radius: 8px;
  background-color: var(--color1);
  .icon {
    width: 50px;

    fill: var(--color3);
  }
  .text-outer {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 10px;
  }
  .text {
    font-size: var(--font-size-lg);

    pointer-events: none;

    color: var(--gray6);
    &.margin-top-20 {
      margin-top: 20px;
    }
  }
  &.enter {
    background-color: var(--color5);
  }
}
.upload-outer {
  font-size: var(--font-size-md);

  z-index: 100;

  display: inline;

  margin-right: 6px;
  padding: 6px 12px;

  cursor: pointer;

  color: var(--white);
  border-radius: 20px;
  background-color: var(--color4);
}
.upload {
  display: none;
}

</style>
