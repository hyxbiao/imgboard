<style scoped>
.card{
    //width: 350px;
    text-align: left;
}
.image {
    height: auto; 
    width: auto; 
    max-width: 300px; 
    max-height: 300px;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
}
</style>
<template>
    <Card class="card">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{ detail.title }}
        </p>
        <a href="#" slot="extra" @click.prevent="predict">
            <Icon type="ios-loop-strong"></Icon>
            Predict
        </a>
        <div>
            <img :src="detail.image" class="image" :key="detail.image" @click="show">
        </div>
        <div>
            <Tag v-for="(value, key, index) in detail.attr" :color="colors[index%4]" :key="key">
                {{ key }}: {{ value }}
            </Tag>
        </div>
        <div v-if="detail.predict">
            <Progress v-for="(prob, index) in detail.predict.probs" :percent="percent(prob)" :key="index" :status="status(index)"></Progress>
        </div>
    </Card>
</template>
<script>
    export default {
        props: ['index', 'detail'],
        data () {
            return {
                index: this.index,
                detail: this.detail,
                colors: ['blue', 'green', 'red', 'yello'],
            }
        },
        computed: {
        },
        methods: {
            status (index) {
                return this.detail.attr.label!='?' && index==this.detail.predict.pred 
                    ? (index==this.detail.attr.label ? 'success' : 'wrong') 
                    : 'normal'
            },
            percent (prob) {
                return (prob*100).toFixed(2)
            },
            show () {
                this.$emit('show', { index: this.index })
            },
            predict () {
                //this.$emit('predict', { detail: this.detail })
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>

