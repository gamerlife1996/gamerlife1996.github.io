<template>
    <div class="about pa-6">
        <h1>推理密码</h1>

        <div v-if="status==0">
            密码为3位数。每位的取值范围为1~9<br/>
            猜测后我会告诉你有几个数字正确，几个位置正确<br/>
            数字正确-数字对了位置不对！<br/>
            位置正确-数字对了，位置也对了！<br/>
            破译记录：<br/>
            <div v-for="record in records"> {{ record }} </div>
            <br/>
            你一共有7次机会<br/>
            当前为第{{ this.records.length+1 }}次尝试<br/>
            请输入密码：（最大值输入999）

            <v-row no-gutters>

                <v-col cols="2" >
                    <v-text-field
                    v-model="input"
                    label=""
                    @keydown.enter.prevent="onClickOk"
                    ></v-text-field>
                </v-col>

                <v-col cols="1" >
                    <v-btn
                    color="primary"
                    @click="onClickOk"
                    >
                    确定
                    </v-btn>
                </v-col>

            </v-row>
        </div>

        <div v-if="status==1">
            恭喜你成功破译了密码！密码为：{{ answer }}<br/>
            破译记录：<br/>
            <div v-for="record in records"> {{ record}} </div>
        </div>


        <div v-if="status==2">
            你没有成功破译密码！密码为：{{ answer }}<br/>
            破译记录：<br/>
            <div v-for="record in records"> {{ record}} </div>
        </div>

    </div>
</template>

<script>

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var first = getRndInteger(1,10).toString()
var second = getRndInteger(1,10).toString()
while (second == first) {
    second = getRndInteger(1,10).toString()
}
var third = getRndInteger(1,10).toString()
while (third == first || third == second) {
    third = getRndInteger(1,10).toString()
}
const answer = first + second + third
// console.log(answer)

var records = []
export default {
    name: 'App',
    data: () => ({
        input: '',
        status: 0,
        answer: answer,
        records: records,
    }),
    methods: {
        onClickOk () {
            var numInput = Number(this.input)
            if (isNaN(numInput) || numInput < 111 || numInput > 999) {
                alert("请输入三位数字！")
                this.input = ''
                return
            }
            var correct_num = 0
            var correct_pos = 0
            for (var i = 0; i < 3; i++) {
                if (this.input[i] == answer[i]) {
                    correct_pos++
                } else {
                    for (var j = 0; j < 3; j++) {
                        if (this.input[i] == answer[j]) {
                            correct_num++
                            break
                        }
                    }
                }

            }
            records.push('第'+ (records.length+1) +'次破译：[' + this.input + '] ' + correct_num + '个数字正确，' + correct_pos + '个位置正确\n')
            if (this.input == answer) {
                alert("破译成功！")
                this.status = 1
            }
            else if (records.length >= 7) {
                this.status = 2
            }
            this.input = ''
        },
    },
};
</script>