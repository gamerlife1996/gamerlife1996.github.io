<template>
  <div class="about pa-6">
    <h1>玩具熊解密工具</h1>
    <div>破译记录：</div>
    <div v-for="record in records"> {{ record }} </div>
    
    <br/>

    <v-row no-gutters>

        <v-col cols="1" class="pr-4" >
            <v-text-field
            v-model="input"
            label="猜测组合"
            outlined
            dense
            @keydown.enter.prevent="onClickOk"
            ></v-text-field>
        </v-col>
        
        <v-col cols="1" class="pr-4" >
            <v-text-field
            v-model="correct_pos"
            label="正确位置个数"
            outlined
            dense
            @keydown.enter.prevent="onClickOk"
            ></v-text-field>
        </v-col>

        <v-col cols="1" class="pr-4" >
            <v-text-field
            v-model="correct_num"
            label="正确数字个数"
            outlined
            dense
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
    

    <div v-if="all_input.length > 0">
    共有可能组合 {{ allComibinatioons.length }} 个：<br/>
    <span v-for="comb in allComibinatioons"> {{ comb }}, </span>
    </div>
    
  </div>
</template>


<script>

function getNumCorrectCount(com,answer) {
    var count = 0
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (com[i] == answer[j] && i != j) {
                count++
            }
        }
    }
    return count
}

function getPosCorrectCount(com,answer) {
    var count = 0
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
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
            if (isNaN(numInput) || numInput < 0 || numInput > 99999) {
                alert("请输入五位数字！")
                this.input = ''
                return
            }

            this.all_input.push(this.input)
            this.all_correct_num.push(this.correct_num)
            this.all_correct_pos.push(this.correct_pos)

            this.allComibinatioons = []
            for (var first = 0; first < 10; first++) {

                for (var second = 0; second < 10; second++) {

                    for (var third = 0; third < 10; third++) {
                        for (var fourth = 0; fourth < 10; fourth++) {
                            for (var fifth = 0; fifth < 10; fifth++) {

                                if (first != second && first != third && first != fourth && first != fifth &&
                                    second != third && second != fourth && second != fifth &&
                                    third != fourth && third != fifth&&
                                    fourth != fifth) {
                                    var com = first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString()

                                    if (validationCheck(this.all_input, this.all_correct_num, this.all_correct_pos, com)) {
                                        this.allComibinatioons.push(com)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            this.records.push('第'+ (this.records.length+1) +'次破译：[' + this.input + '] ' + this.correct_pos + '个位置正确，' + this.correct_num + '个数字正确\n')
            this.input = ''
            this.correct_num = ''
            this.correct_pos = ''
        },
    },
};
</script>