<style scoped>
.card{
    //width: 350px;
    text-align: left;
}
.image {
    height: auto; 
    width: auto; 
    max-width: 240px; 
    max-height: 240px;
    cursor: pointer;
    margin: 0;
    display: inline-block;
}
</style>
<template>
    <Card class="card">
        <p slot="title">
            {{ detail.title }}
        </p>
        <div>
            <img :src="detail.image" class="image" :key="detail.image" @click="show">
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
            show () {
                this.$emit('show', { index: this.index })
            },
            todo () {
                //this.$emit('predict', { detail: this.detail })
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>

