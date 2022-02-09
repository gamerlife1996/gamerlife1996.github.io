<template>
  <div class="home pa-2">
    <v-app-bar
      app
      elevation="1"
      >
    <v-row no-gutters class="pt-6">

      <v-col cols="4" >
        <v-text-field
          v-model="input"
          label="商品名称"
          @keydown.enter.prevent="onClickSearch"
        ></v-text-field>
      </v-col>

      <v-col cols="1" >
        <v-btn
          color="primary"
          width="100px"
          height="30px"
          class="ml-4"
          @click="onClickSearch"
        >
          搜索
        </v-btn>
      </v-col>

      
      <v-col cols="1" class="pt-1" >
        <v-checkbox
          v-model="show_avail"
          label="显示有货"
        ></v-checkbox>
      </v-col>

      <v-col cols="1" class="pt-1" >
        <v-checkbox
          v-model="show_not_avail"
          label="显示无货"
        ></v-checkbox>
      </v-col>

      <v-col cols="2" offset="3">
        <v-chip
          :color="color"
          text-color="white"
        >
          <v-icon left>
            mdi-clock-outline
          </v-icon>
          更新时间：{{ this.time_passed }}前
        </v-chip>
      </v-col>

    </v-row>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="goods"
      :search="query"
      items-per-page="50"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :page.sync="page"
      hide-default-footer
      @page-count="pageCount = $event"
    >
    
      <template v-slot:item.image="{ item }">
        <v-tooltip right transition="none" >
          <template v-slot:activator="{ on }">
            <v-img :src="item.image" width="198px" height="40px" v-on="on"></v-img>
          </template>
          <v-img :src="item.detail" ></v-img>
         </v-tooltip>
      </template>

    </v-data-table>
    
    <div class="pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        total-visible="10"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import json from './data.json'

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
if (pass_days >= 2) {
  color = 'red'
} else if (pass_days >= 1) {
  color = 'orange'
}

var tabledata = []
for (var i_map = 0; i_map < json.maps.length; i_map++)
{
  var map = json.maps[i_map];
  for (var i = 0; i < map.shops.length; i++)
  {
    var shop = map.shops[i];
    for (var j = 0; j < shop.goods.length; j++)
    {
      var good = shop.goods[j];
      tabledata.push({
        image: map.map+"/"+good.index+".jpg",
        name: good.name,
        price: good.price,
        shop: shop.title,
        map: map.map,
        avail: good.available,
        time: map.time,
        detail: map.map+"/"+good.index+"_detail.jpg",
      });
    }
  }
}
  export default {
    props: [
      'query',
    ],
    data() {
      return {
        show_avail: true,
        show_not_avail: true,
        color: color,
        input: '',
        time_passed: time_passed,
        sortBy: 'name',
        sortDesc: false,
        name: 'Home',
        headers: [
          { text: '截图', value: 'image', filterable: false, width: '300px' },
          { text: '名字', value: 'name', width: '300px' },
          { text: '价格', value: 'price', filterable: false, width: '300px' },
          { text: '有货', value: 'avail', width: '150px',
            filter: value => {
              if (value) {
                return this.show_avail
              } else {
                return this.show_not_avail
              }
            }
           },
          { text: '位置', value: 'map', filterable: false, width: '150px' },
          { text: '商店', value: 'shop', filterable: false },
        ],
        goods: tabledata,
        page: 1,
        pageCount: 0,
      }
    },
    methods: {
      onClickSearch () {
        if (this.input) {
          this.$router.push('/search?q='+this.input)
          this.$router.go()
        } else {
          this.$router.push('/')
          this.$router.go()
        }
      },
    },
  }
</script>
