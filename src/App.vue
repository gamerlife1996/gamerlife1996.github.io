<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      >
      <v-list-item>
        <v-list-item-content>
            <v-chip
              :color="color"
              text-color="white"
            >
              <v-icon left>
                mdi-clock-outline
              </v-icon>
              更新时间：{{ this.time_passed }}前
            </v-chip>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import json from './views/data.json'

var pass_seconds = Math.trunc(Date.now() / 1000 - json.starttime)
const pass_days = Math.trunc(pass_seconds / 86400)
pass_seconds -= pass_days * 86400
const pass_hours = Math.trunc(pass_seconds / 3600)
pass_seconds -= pass_hours * 3600
const pass_mins =  Math.trunc(pass_seconds / 60)
var time_passed = ''
if (pass_days > 0) {
  time_passed += pass_days + "天"
}
if (pass_hours > 0) {
  time_passed += pass_hours + "小时"
}
if (pass_mins > 0) {
  time_passed += pass_mins + "分钟"
}

var color = 'green'
if (pass_days >= 1) {
  color = 'red'
} else if (pass_hours >= 12) {
  color = 'orange'
}
export default {
  name: 'App',
  data: () => ({
        color: color,
        time_passed: time_passed,
    drawer: true,
    items: [
      { title: '市场总览', icon: 'mdi-store', to: '/overview' },
      { title: '市场搜索', icon: 'mdi-magnify', to: '/search' },
      { title: '解密游戏', icon: 'mdi-numeric', to: '/puzzle' },
      { title: '解密工具', icon: 'mdi-calculator', to: '/solve' },
      { title: '关于', icon: 'mdi-help-box', to: '/about' },
    ],
  }),
};
</script>
