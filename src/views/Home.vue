<template>
  <div class="home pa-6">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="搜索"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :items-per-page=-1
    >
      <template v-slot:item.image="{item}">
        <v-img :src="item.image" width="198px" height="40px" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import json from './data.json'
var tabledata = []
for (var i = 0; i < json.shops.length; i++)
{
  var shop = json.shops[i];
  for (var j = 0; j < shop.goods.length; j++)
  {
    var good = shop.goods[j];
    tabledata.push({
      image: "1-1/"+good.index+".jpg",
      name: good.name,
      price: good.price,
      shop: shop.title,
      map: "1-1",
      avail: good.available,
      time: json.time,
    });
  }
}
  export default {
    data() {
      return {
        name: 'Home',
        search: '',
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
    }
  }
</script>
