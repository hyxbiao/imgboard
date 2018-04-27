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
.popwin{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
.image {
    height: auto; 
    width: auto; 
    max-height: 480px;
    margin: 5px;
    display: inline-block;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
				<RadioGroup v-model="dataset" type="button" @on-change="changedataset">
					<Radio label="Train"></Radio>
					<Radio label="Test"></Radio>
					<Radio label="Predict"></Radio>
				</RadioGroup>
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
                    <Col span="8" v-for="(item, index) in items" :key="item.image">
                        <ImageCard v-on:show="show" :detail="item" :index="index" :ref="item.id"></ImageCard>
                    </Col>
				</Row>
            </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
        <Modal
            :title="items[popindex].title"
            v-model="popwin"
            width="80%"
            :styles="{top: '20px'}"
            class-name="popwin">
            <Carousel 
                v-model="popindex"
                v-if="popwin"
                dots="outside">
                <CarouselItem v-for="(item, index) in items" :key="index">
                    <Row>
                        <Col span="12">
                            <img :src="item.image" class="image" :key="item.image">
                        </Col>
                        <Col span="12">
                            <p>
                                result
                            </p>
                            <img :src="transform(item, 'topleft')" class="image" :key="item.id">
                            <img :src="transform(item, 'topright')" class="image" :key="item.id">
                            <img :src="transform(item, 'bottomleft')" class="image" :key="item.id">
                            <img :src="transform(item, 'bottomright')" class="image" :key="item.id">
                        </Col>
                    </Row>
                </CarouselItem>
            </Carousel>
            <div slot="footer">
            </div>
        </Modal>
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
                popwin: false,
                popindex: 0,
                page: 0,
                size: 9,
                dataset: 'Train',
                items: [
                ],
            }
        },
        computed: {
        },
        methods: {
            getdataset () {
                const params = {
                    dataset: this.dataset.toLowerCase(),
                    page: this.page,
                    size: this.size,
                }
                this.$http.get('/dataset/index', {params: params}).then(response => {

                    console.log(response.body.data);
                    // get body data
                    this.items = response.body.data;
                }, response => {
                    // error callback
                    console.log(response);
                });
            },
            transform (item, method) {
                return '/dataset/data?dataset=' + this.dataset.toLowerCase() + '&index=' + item.id + '&method=' + method
            },
            changedataset(select) {
                console.log(select)
                this.getdataset()
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
            show (payload) {
                this.popindex = payload.index
                this.popwin = true
            },
            predict (detail) {
                this.page += 1
                this.getdataset()
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

