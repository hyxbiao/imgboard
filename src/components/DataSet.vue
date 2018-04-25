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
                    <Button type="primary">
                        <Icon type="chevron-left"></Icon>
                        Prev
                    </Button>
                    <Button type="primary">
                        Next
                        <Icon type="chevron-right"></Icon>
                    </Button>
                </ButtonGroup>
                <Button type="primary" icon="ios-search">Search</Button>
            </Header>
            <Content>
				<Row>
                    <Col span="8" v-for="item in items">
                        <ImageCard v-bind:detail='item'></ImageCard>
                    </Col>
				</Row>
            </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
</template>
<script>
    import Socket from '@/base/js/socket'
    import ImageCard from '@/components/ImageCard'
    export default {
        components: {
            ImageCard,
        },
        data () {
            return {
                socket: '',
                items: [{
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx',
                    attr: {
                        label: 1
                    }
                }, {
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx2222',
                    attr: {
                        label: 1
                    }
                }, {
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx2222',
                    attr: {
                        label: 1
                    }
                }, {
                    title: 'Image hello',
                    source: 'image source ~~~~~~!!',
                    image: 'xxxxxxx2222',
                    attr: {
                        label: 1
                    }
                },
                ],
            }
        },
        mounted () {
            this.socket = new Socket('ws:localhost:8100');
            this.socket.connect(() => {
                this.socket.onMessage((data) => {
                    console.log(data)
                    this.onMessage(data);
                });
            });
        },
        destroyed() {
            this.socket && this.socket.close();
        },
        onMessage(data) {
        },
    }
</script>

