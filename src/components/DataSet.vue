<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <ButtonGroup>
                    <Button type="primary" @click="prev" :disabled="page===0">
                        <Icon type="chevron-left"></Icon>
                        Prev
                    </Button>
                    <Button type="primary" @click="next">
                        Next
                        <Icon type="chevron-right"></Icon>
                    </Button>
                </ButtonGroup>
                <Button type="primary" icon="ios-search">Search</Button>
            </Header>
            <Content>
				<Row>
                    <Col span="8" v-for="item in items" :key="item.image">
                        <ImageCard v-on:predict="predict" :detail="item" :ref="item.id"></ImageCard>
                    </Col>
				</Row>
            </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
</template>
<script>
    //import ImageCard from '@/components/ImageCard'
    export default {
        components: {
            //ImageCard,
            ImageCard: () => import('@/components/ImageCard')
        },
        data () {
            return {
                page: 0,
                size: 9,
                items: [{
                    id: 1,
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx',
                    attr: {
                        label: 1
                    }
                }, {
                    id: 2,
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx2222',
                    attr: {
                        label: 1
                    }
                }, {
                    id: 3,
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx3322',
                    attr: {
                        label: 1
                    }
                }, {
                    id: 4,
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx4522',
                    attr: {
                        label: 1
                    }
                },
                ],
            }
        },
        methods: {
            getdataset () {
                this.$http.get('/dataset', {params: {page: this.page, size: this.size}}).then(response => {

                    console.log(response.body);
                    // get body data
                    this.items = response.body.data;
                }, response => {
                    // error callback
                    console.log(response);
                });
            },
            prev () {
                this.page -= 1
                this.getdataset()
            },
            next () {
                //const id = 3;
                //console.log(this.$refs[id][0].detail);
                this.page += 1
                this.getdataset()
            },
            predict (detail) {
                this.page += 1
                this.getdataset()
                console.log(detail);
            }
        },
        mounted () {
            this.getdataset()
        },
        destroyed() {
        },
        onMessage(data) {
        },
    }
</script>

