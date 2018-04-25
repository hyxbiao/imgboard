<style scoped>
.card{
    //width: 350px;
    text-align: left;
}
</style>
<template>
    <Card class="card">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{ detail.title }}
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            Refresh
        </a>
        <Row>
            <Col span="24">{{ detail.source }}</Col>
        </Row>
        <Row>
            <Col span="16">{{ detail.image }}</Col>
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
            changeLimit () {
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>

