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
      <v-col cols="3" offset="4" class="blue--text text-right pt-1 pr-2">
        更新时间： {{ this.starttime }}
      </v-col>
    </v-row>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :items-per-page=-1
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:item.image="{item}">
        <v-img :src="item.image" width="198px" height="40px" />
      </template>
      <template v-slot:item.detail="{ item }">
        <v-btn
          small
          color="primary"
          class="mr-2"
          @click="onClickRow(item, $event)"
        >
        详情
        </v-btn>
      </template>

    </v-data-table>

    <v-overlay
      :value="overlay"
    >
      <v-img
        :src="currentDetail"
        position="left 0px top 0 px"
        v-click-outside="onClickOutside">
      </v-img>
    </v-overlay>
  </div>
</template>

<script>
import json from './data.json'
var tabledata = []
var starttime = ''
for (var i_map = 0; i_map < json.maps.length; i_map++)
{
  var map = json.maps[i_map];
  if (map.map == "1-1") {
    starttime = map.time
  }
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
      'search',
    ],
    data() {
      return {
        input: '',
        starttime: starttime,
        sortBy: 'name',
        sortDesc: false,
        overlay: false,
        currentDetail: '',
        name: 'Home',
        headers: [
          { text: '截图', value: 'image', width: '300px' },
          { text: '', value: 'detail', width: '150px' },
          { text: '名字', value: 'name', width: '300px' },
          // { text: '价格', value: 'price', width: '300px' },
          { text: '位置', value: 'map', width: '150px' },
          { text: '商店', value: 'shop' },
        ],
        desserts: tabledata,
      }
    },
    methods: {
      onClickRow(value) {
        this.currentDetail = value.detail
        this.overlay = true
      },
      onClickOutside () {
        this.overlay = false
      },
      onClickSearch () {
        if (this.input) {
          this.$router.push('/result/'+this.input)
        } else {
          this.$router.push('/')
        }
      },
    },
  }
</script>
