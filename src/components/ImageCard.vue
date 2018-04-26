<style scoped>
.card{
    //width: 350px;
    text-align: left;
}
.image {
    //width: calc(60% - 10px);
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
        <Row>
            <Col span="16">
                <img :src="detail.image" class="image" :key="detail.image">
            </Col>
            <Col span="8">
                <ul>
                    <li v-for="(value, key) in detail.attr">
                        {{ key }}
                        <span>{{ value }}</span>
                    </li>
                </ul>
            </Col>
        </Row>
    </Card>
</template>
<script>
    export default {
        props: ['detail'],
        data () {
            return {
                detail: this.detail,
            }
        },
        methods: {
            predict () {
                //this.$emit('predict', { detail: this.detail })
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>

