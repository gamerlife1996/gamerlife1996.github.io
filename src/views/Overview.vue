<template>
    <v-data-iterator
    :items="maps"
    item-key="name"
    :items-per-page=-1
    hide-default-footer
    >
        <template v-slot:default="{ items }">
            <div
                v-for="map in items"
                :key="map.map">
                <v-card class="ma-4" color="#EEEEEE">
                    <v-banner color="#222831" class="white--text" style="font-size:22px">{{map.map[0]}} 线 {{map.map.substring(2)}} 洞</v-banner>
                    <div class="d-flex flex-wrap">
                        <v-card
                            class="ma-1"
                            outlined
                            width="230px"
                            v-for="shop in map.shops"
                            :key="shop.title">
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
            </div>
        </template>
    </v-data-iterator>
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

export default {
    data: () => ({
        show_avail: true,
        show_not_avail: true,
        color: color,
        input: '',
        time_passed: time_passed,
        maps: json.maps,
        starttime: json.starttime,
    }),
    methods: {
        onClickImage(good) {
            this.$router.push('/search?q='+good.name)
        },
    }
}
</script>