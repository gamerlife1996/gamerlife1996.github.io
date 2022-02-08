<template>
  <div class="about pa-6">
    <h1>解谜器</h1>
    破译记录：<br/>
    <div v-for="record in records"> {{ record }} </div>
    <br/>
    <div v-if="all_input.length > 0">
    共有可能组合 {{ allComibinatioons.length }} 个：<br/>
    <span v-for="comb in allComibinatioons"> {{ comb }}, </span>
    </div>
    
    <br/>

    <v-row no-gutters>

        <v-col cols="1" class="pr-6" >
            <v-text-field
            v-model="input"
            label="猜测组合"
            @keydown.enter.prevent="onClickOk"
            ></v-text-field>
        </v-col>

        <v-col cols="1" class="pr-6" >
            <v-text-field
            v-model="correct_num"
            label="正确数字个数"
            @keydown.enter.prevent="onClickOk"
            ></v-text-field>
        </v-col>

        <v-col cols="1" class="pr-6" >
            <v-text-field
            v-model="correct_pos"
            label="正确位置个数"
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
</template>


<script>

function getNumCorrectCount(com,answer) {
    var count = 0
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (com[i] == answer[j] && i != j) {
                count++
            }
        }
    }
    return count
}

function getPosCorrectCount(com,answer) {
    var count = 0
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (com[i] == answer[j] && i == j) {
                count++
            }
        }
    }
    return count
}

function validationCheck(all_input, all_correct_num, all_correct_pos, answer) {
    for (var i = 0; i < all_input.length; i++) {
        const numCorrectCount = getNumCorrectCount(all_input[i], answer)
        const posCorrectCount = getPosCorrectCount(all_input[i], answer)
        if (numCorrectCount != all_correct_num[i] || posCorrectCount != all_correct_pos[i]) {
            return false
        }
    }
    return true
}

export default {
    name: 'App',
    data: () => ({
        input: '',
        correct_num: '',
        correct_pos: '',
        all_input: [],
        all_correct_num: [],
        all_correct_pos: [],
        allComibinatioons: [],
        records: [],
    }),
    methods: {
        onClickOk () {
            var numInput = Number(this.input)
            if (isNaN(numInput) || numInput < 111 || numInput > 999) {
                alert("请输入三位数字！")
                this.input = ''
                return
            }

            this.all_input.push(this.input)
            this.all_correct_num.push(this.correct_num)
            this.all_correct_pos.push(this.correct_pos)

            this.allComibinatioons = []
            for (var first = 1; first < 10; first++) {

                for (var second = 1; second < 10; second++) {

                    for (var third = 1; third < 10; third++) {

                        if (first != second && second != third && first != third) {
                            var com = first.toString() + second.toString() + third.toString()

                            if (validationCheck(this.all_input, this.all_correct_num, this.all_correct_pos, com)) {
                                this.allComibinatioons.push(com)
                            }
                        }
                    }
                }
            }

            this.records.push('第'+ (this.records.length+1) +'次破译：[' + this.input + '] ' + this.correct_num + '个数字正确，' + this.correct_pos + '个位置正确\n')
            this.input = ''
            this.correct_num = ''
            this.correct_pos = ''
        },
    },
};
</script>