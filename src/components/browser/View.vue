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
.header {
}
.tree {
    text-align: left
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
            <Header class="header">
                <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
                    <Col span="10">
                        <Input v-model="current" style="width: 320px" placeholder="root path..." rows=1>
                        <Button type="primary" slot="append" @click="getroot(current)">Set</Button>
                        </Input>
                    </Col>
                    <Col span="6">
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
                    </Col>
                    <Col span="8" offset="0">
                        <Input v-model="pattern" style="width: 300px" placeholder="pattern..." rows=1>
                            <Button type="primary" slot="append" icon="ios-search" @click="search">Search</Button>
                        </Input>
                    </Col>
                </Row>
            </Header>
            <Layout :style="{minHeight: '100vh'}">
                <Sider collapsible :collapsed-width="78" v-model="isCollapsed" :style="{background: '#fff'}">
                    <Tree ref="tree" class="tree" :data="dirs" :load-data="getdirs" @on-select-change="listfiles" width="auto"></Tree>
                </Sider>
                <Layout>
                    <Content>
                        <Row>
                            <Col span="6" v-for="(item, index) in files" :key="item">
                                <ImageFileCard v-on:show="show" :detail="item" :index="index" :ref="item.title"></ImageFileCard>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
        <Modal
            :title="poptitle()"
            v-model="popwin"
            width="90%"
            :styles="{top: '20px'}"
            class-name="popwin">
            <Carousel 
                v-model="popindex"
                v-if="popwin"
                dots="outside">
                <CarouselItem v-for="(item, index) in files" :key="index">
                    <Row>
                        <Col span="12">
                            <img :src="item.image" class="image" :key="item.image">
                        </Col>
                        <Col span="12">
                            <p>
                                result
                            </p>
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
    export default {
        components: {
            ImageFileCard: () => import('@/components/browser/ImageFileCard')
        },
        data () {
            return {
                isCollapsed: false,
                pattern: '',
                popwin: false,
                popindex: 0,
                root: '~/',
                current: '',
                page: 0,
                size: 16,
                dirs: [
                    {
                        title: '/root',
                        path: '',
                        loading: false,
                        children: []
                    }
                ],
                files: [
                ],
            }
        },
        computed: {
        },
        methods: {
            getdirs (item, callback) {
                //const path = (item.title == '/root' ? '/' : item.title + '/')
                const path = item.path
                const params = {
                    path: path,
                }
                this.$http.get('/dir', {
                    params: params,
                }).then(response => {
                    const data = response.body.data.map(v => {
                        return {
                            title: v,
                            path: path + '/' + v,
                            loading: false,
                            children: []
                        }
                    });
                    callback(data)
                }, response => {
                    console.error(response);
                })
            },
            getfiles () {
                const item = this.$refs.tree.getSelectedNodes()[0]
                if (!item) {
                    return
                }
                const path = item.path
                const root = (this.root.slice(-1) == '/') ? this.root.slice(0, -1) : this.root
                this.current = root + path
                const params = {
                    path: path,
                    page: this.page,
                    size: this.size,
                }
                this.$http.get('/file', {
                    params: params,
                }).then(response => {
                    // get body data
                    this.files = response.body.data.map(v => {
                        return {
                            title: v.split('/').pop(),
                            image: v,
                            attr: {
                            },
                        }
                    });
                }, response => {
                    // error callback
                    console.error(response);
                });
            },
            listfiles (selectedItems) {
                this.page = 0
                this.getfiles()
            },
            search () {
                const params = {
                    pattern: this.pattern,
                }
                this.$http.get('/search', {
                    params: params,
                }).then(response => {
                    // get body data
                    this.files = response.body.data.map(v => {
                        return {
                            title: v.split('/').pop(),
                            image: v,
                            attr: {
                            },
                        }
                    });
                }, response => {
                    // error callback
                    console.error(response);
                });
            },
            getroot (path) {
                const params = {
                    path: path ? path : '',
                }
                this.$http.get('/admin/root', {
                    params: params,
                }).then(response => {
                    this.root = response.body.data
                    this.current = this.root
                    if (path) {
                        this.dirs = [
                            {
                                title: '/root',
                                path: '',
                                loading: false,
                                children: []
                            }
                        ]
                        this.$refs.tree.rebuildTree()
                    }
                    console.log(this.$refs.tree)
                }, response => {
                    console.error(response);
                });
            },
            prev () {
                this.page -= 1
                this.getfiles()
            },
            next () {
                this.page += 1
                this.getfiles()
            },
            show (payload) {
                this.popindex = payload.index
                this.popwin = true
            },
            poptitle () {
                return this.files.length == 0 ? 'null' : this.files[this.popindex].image;
            },
        },
        mounted () {
            this.getroot()
        },
        destroyed() {
        },
        onMessage(data) {
        },
    }
</script>

