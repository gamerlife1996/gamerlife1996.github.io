<template>
  <div class="pa-2" align='center'>

    <v-btn
        class="ma-1"
        v-for="map in maps"
        :key="map.map"
        color="primary"
        @click="onClickMap(map)"
        >
        {{map.map}}
    </v-btn>

    <v-data-iterator
        :items="maps"
        item-key="name"
        :items-per-page=1
        :page.sync="page"
        hide-default-footer
    >
        <template v-slot:default="{ items }">
            <v-card
                v-for="map in items"
                :key="map.map"
                class="ma-4"
                color="#EEEEEE">
                <v-banner color="#222831" class="white--text" style="font-size:22px">{{map.map[0]}} 线 {{map.map.substring(2)}} 洞</v-banner>
                <div class="d-flex flex-wrap">
                    <v-card
                        class="ma-1"
                        outlined
                        width="230px"
                        v-for="shop in map.shops"
                        :key="shop.index">
                        <v-banner color="#00ADB5" class="white--text">{{ shop.title }}</v-banner>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-item
                                v-for="good in shop.goods"
                                :key="good.index">
                                
                                <v-tooltip right transition="none" >
                                    <template v-slot:activator="{ on }">
                                        <v-img 
                                            :src="`${starttime}/${map.map}/${good.index}.jpg`"
                                            width="198px"
                                            height="40px"
                                            @click="onClickImage(good)"
                                            v-on="on"></v-img>
                                    </template>
                                    <v-img :src="`${starttime}/${map.map}/${good.index}_detail.jpg`" ></v-img>
                                </v-tooltip>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </div>
            </v-card>
        </template>
    </v-data-iterator>
  </div>
</template>

<script>
import json from './data.json'

export default {
    data: () => ({
        page: 1,
        pageCount: json.maps.length,
        maps: json.maps,
        starttime: json.starttime,
    }),
    methods: {
        onClickImage(good) {
            this.$router.push('/search?q='+good.name)
        },
        onClickMap(btnmap) {
            const index = this.maps.findIndex((map, index) => {
                if (map.map === btnmap.map) {
                    return true
                }
            })
            this.page = index + 1
        },
    }
}
</script>