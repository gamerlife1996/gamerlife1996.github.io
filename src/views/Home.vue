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
    </v-row>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :items-per-page=-1
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      @click:row="onClickRow"
    >
      <template v-slot:item.image="{item}">
        <v-img :src="item.image" width="198px" height="40px" />
      </template>

    </v-data-table>
      
    <v-overlay
      :value="overlay"
    >
      <v-img :src="currentDetail" v-click-outside="onClickOutside" />
    </v-overlay>
  </div>
</template>

<script>
import json from './data.json'
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
      'search',
    ],
    data() {
      return {
        sortBy: 'name',
        sortDesc: false,
        overlay: false,
        currentDetail: '',
        name: 'Home',
        headers: [
          { text: '截图', value: 'image' },
          { text: '名字', value: 'name' },
          { text: '价格', value: 'price' },
          { text: '商店', value: 'shop' },
          { text: '位置', value: 'map' },
          { text: '有货', value: 'avail' },
          { text: '时间', value: 'time' },
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
