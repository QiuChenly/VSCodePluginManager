<template>
  <div class="app-content">
    <div class="title">
      <input type="text" v-model="searchKey" />
      <div class="sums">{{ apps.length }}</div>
    </div>
    <div class="app-list">
      <div class="app" v-for="(it, inx) in apps">
        <div class="base-info">
          <!-- <div class="check-box">
            <div class="checked"></div>
            <div class="no-checked"></div>
          </div> -->
          <span class="name">
            {{ it.displayName }}
          </span>
          <div class="specs">
            <div class="version">{{ it.version }}</div>
          </div>
          <div class="actions">
            <div class="uninstall" @click="uninstall(it.identifier._lower)">
              卸载
            </div>
            <span class="publisher">
              {{ it.publisher }}
            </span>
          </div>
          <!-- <div class="tags">
            <div class="tag" v-for="tag in it.categories">
              {{ tag }}
            </div>
          </div> -->
        </div>
        <Logo class="logo" :src="it.logoUri" />
      </div>
    </div>
    <button @click="delall">全部卸载</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Extension } from "./define/ExtInfo";
import { Api } from "./Utils/Tools";
import Logo from "./components/Logo.vue";

const apps = ref<Extension[]>([]);
const searchCache = ref<Extension[]>([]);

const searchKey = ref("");

onMounted(() => {
  Api.listenMsg<Extension[]>("updateExtList", (extList) => {
    apps.value = [];
    if (extList) {
      apps.value = extList;
      searchCache.value = apps.value;
    }
  });
  Api.listenMsg("needUpdate", () => {
    Api.postMsg("getAllExtList");
  });

  Api.postMsg("getAllExtList");
});

const uninstall = (id: string) => {
  Api.postMsg("uninstall", {
    id: id,
  });
};

const delall = () => {
  for (let app of apps.value) {
    if (
      (app.categories != undefined &&
        app.categories.includes("Language Packs")) ||
      app.identifier.value.indexOf(".extmanager") != -1
    )
      continue;
    Api.postMsg("uninstall", {
      id: app.identifier._lower,
    });
  }
};

watch(searchKey, (ov, nv) => {
  if (searchKey.value.length == 0) {
    Api.postMsg("getAllExtList");
  } else {
    apps.value = [];
    for (let app of searchCache.value) {
      if (
        app.displayName.indexOf(searchKey.value) != -1 ||
        app.identifier._lower.indexOf(searchKey.value) != -1
      ) {
        apps.value.push(app);
      }
    }
  }
});
</script>

<style scoped lang="scss">
button {
  color: white;
  padding: 5px 10px;
  margin: 0 10px 10px 10px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  background-color: rgb(49, 49, 49);
  border: solid 1px rgb(90, 90, 90);

  &:hover {
    border: solid 1px rgb(0, 120, 212);
  }
}
.app-content {
  color: aliceblue;
  background-color: #000;
  width: 100vw;
  height: 100vh;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    display: flex;
    position: relative;
    input {
      background-color: rgb(49, 49, 49);
      color: rgb(204, 204, 204);
      border: none;

      outline: none;

      border: solid 1px rgb(60, 60, 60);
      height: 25px;
      box-sizing: border-box;
      margin: 10px;
      flex: 1;

      padding: 0 5px;

      &:focus {
        border: solid 1px rgb(0, 120, 212);
      }
    }

    .sums {
      font-size: 11px;
      background-color: #555555;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: calc(100% - 30px);
      line-height: 15px;
      border-radius: 15px;
      text-align: center;
      padding: 0 2px;
    }
  }
}

.app-list {
  flex: 1;
  margin: 10px;
  margin-top: 0;
  // background-color: #fff;
  overflow: scroll;
  .app {
    width: 100%;
    // background-color: rgb(46, 46, 50);
    height: 60px;
    transition: all 0.4s;

    overflow: hidden;
    display: flex;

    position: relative;

    .base-info {
      width: calc(100% - 16px);
      z-index: 1;
      transition: all 0.4s;
      position: relative;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;

      &:hover {
        backdrop-filter: blur(8px);
        &::before {
          width: 60%;
        }
        &::after {
          opacity: 1;
        }
      }

      &::after {
        content: " ";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        position: absolute;
        background-color: rgba(49, 49, 49, 0.8);
        border: solid 1px rgb(60, 60, 60);
        opacity: 0;
        z-index: -1;
        backdrop-filter: blur(5px);
        transition: all 0.4s ease-in-out;
      }

      &::before {
        z-index: -1;
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to right,
          rgba(black, 1) 80%,
          rgba(54, 54, 54, 0) 100%
        );
        transition: all 0.4s;
      }
    }

    .logo {
      width: 60px;
      height: 60px;
      position: absolute;
      right: 0;
      transition: all 0.6s;
    }

    &:hover {
      & > .logo {
        // width: 100px;
        // height: 100px;
        transform: rotate(-35deg) scale3d(3, 3, 3);
      }

      .specs {
        opacity: 1;
      }
    }

    // background-color: #fff;
    margin-bottom: 10px;

    .check-box {
      border: solid 1px #fff;
      width: 13px;
      height: 13px;
      border-radius: 10px;
    }

    .name {
      width: 85%;
      white-space: nowrap; /* 防止换行 */
      overflow: hidden; /* 隐藏溢出的部分 */
      text-overflow: ellipsis; /* 超出部分使用省略号 */
      font-weight: bolder;
    }

    .publisher {
      margin-left: 8px;
      font-weight: bold;
      font-size: 12px;
      color: rgb(209, 209, 209);
    }

    .specs {
      position: absolute;
      right: 10px;
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }

    .uninstall {
      display: inline-block;
      font-size: 12px;
      padding: 0 5px;
      border-radius: 2px;
      transition: all 0.3s;
      background-color: rgb(49, 49, 49);
      border: solid 1px rgb(0, 120, 212);
      cursor: pointer;

      &:hover {
        background-color: white;
        color: #000;
      }
    }

    .tags {
      font-size: 10px;
      display: flex;
      div {
        padding: 2px 5px;
        border-radius: 3px;
        background: #42b983;
        margin-right: 5px;
        max-lines: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
