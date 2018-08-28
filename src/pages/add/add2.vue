<template>
<div class="row  gutter-sm" style="padding:10px">
    <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-8">
        <q-card inline class="fit shadow-6">
            <div class="row q-ma-lg q-pa-md">
                <div class="col-1 vertical-middle">标题：</div>
                <div class="col">
                    <q-input v-model="mypost.title" />
                </div>
            </div>
            <div class="row q-ma-lg q-pa-md">
                <div class="col-1">简述：</div>
                <div class="col">
                    <q-scroll-area style="height: 200px">
                        <q-input class="" type="textarea" v-model="mypost.shortContent" />
                    </q-scroll-area>

                </div>
            </div>
            <div id="editor">
                <mavon-editor v-model="mypost.mdContent" @change="editorChange" style="height: 100%"></mavon-editor>
            </div>
        </q-card>
    </div>
    <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-4">
        <q-card inline class="fit shadow-6 q-pa-md">
            <q-card-main>
                <div class="row q-mt-md">
                    <div class="col-4" style="line-height:40px">分类:</div>
                    <div class="col-5">
                        <q-select filter inverted color="blue" @input="get" v-model="mypost.catelog" :options="catelogs" />
                    </div>
                </div>
                <div class="row q-mt-lg">
                    <div class="col-4">系统标签:</div>
                    <div class="col-5">
                        <q-select multiple chips color="blue" v-model="mypost.tags" :options="tagOptions" />
                    </div>
                </div>
                <div class="row q-mt-lg">
                    <div class="col-4">关键词:</div>
                    <div class="col-5">
                        <q-chips-input color="blue" v-model="mypost.keyWord" placeholder="" />
                    </div>
                </div>
                <div class="row q-mt-lg">
                    <div class="col-4">排序:</div>
                    <div class="col-5">
                        <q-input type="number" v-model="mypost.sort" min="0" />
                    </div>
                </div>
                <div class="row q-mt-lg">
                    <div class="col-4">发布时间:</div>
                    <div class="col">
                        <q-datetime inverted  color="blue" v-model="mypost.publishedDate" type="datetime" />
                    </div>
                </div>
                <div class="row q-mt-lg">
                    <div class="col-2" style="line-height:35px">状态:</div>
                    <div class="col">
                        <q-option-group inline type="radio" color="secondary" v-model="mypost.status" :options="[
          { label: '草稿', value: 1, color: 'faded'},
          { label: '发布', value: 2, color: 'primary'},
          { label: '删除', value: 3, color: 'red' }
        ]" />
                    </div>
                </div>
            </q-card-main>
            <q-card-separator />
            <q-card-actions align="end">
                <q-btn color="blue" @click="savePost">保存</q-btn>
            </q-card-actions>
        </q-card>
    </div>
</div>
</template>

<script>
import {
    date
} from 'quasar'
export default {
    data() {
        return {
            mypost: {
                id: "",
                title: "",
                catelog: "sy",
                tags: [],
                keyWord: [],
                status: 0,
                sort: 0,
                mdContent: "",
                htmlContent: "",
                shortContent: "",
                isTimePublish: "",
                publishedDate: ""
            },
            catelogs: [{
                    label: "首页通知",
                    value: "sy"
                },
                {
                    label: "前端",
                    value: "qd"
                },
                {
                    label: "后端",
                    value: "hd"
                },
                {
                    label: "生活",
                    value: "sh"
                }
            ],
            tagOptions: [{
                    label: "wepack",
                    value: "wepack"
                },
                {
                    label: "vue",
                    value: "vue"
                },
                {
                    label: "quasar",
                    value: "quasar"
                },
                {
                    label: "react",
                    value: "react"
                },
                {
                    label: "angular",
                    value: "angular"
                }
            ],
        };
    },
    methods: {
        async fetchData() {
            if (!this.$route.params.id) {
                this.post = {
                    id: "",
                    title: "",
                    catelog: "",
                    tags: [],
                    keyWord: [],
                    status: 0,
                    sort: 0,
                    mdContent: "",
                    htmlContent: "",
                    shortContent: "",
                    isTimePublish: "",
                    publishedDate: undefined
                };
                return;
            }
            try {
                let res = await getPost(this.$route.params.id);
                let post = res.data.data;
                post.tags = post.tags.split(",");
                if (post.keyWord != "") {
                    post.keyWord = post.keyWord.split(",");
                } else {
                    post.keyWord = [];
                }

                if (post.publishedDate == 0) {
                    post.publishedDate = undefined;
                }

                this.post = post;
            } catch (e) {}
        },
        editorChange(value, render) {
            this.post.htmlContent = render;
        },
        async savePost() {
            let errorMsg = [];
            console.log(this.$route.path)
            if (this.post.title == "") {
                errorMsg.push("标题不能为空");
            }
            if (this.post.shortContent == "") {
                errorMsg.push("简述不能为空");
            }
            if (this.post.mdContent == "") {
                errorMsg.push("内容不能为空");
            }
            if (this.post.catelog == "") {
                errorMsg.push("分类不能为空");
            }
            if (errorMsg.length > 0) {
                this.$q.notify({
                    type: "negative",
                    message: errorMsg.join(","),
                    position: "bottom-right",
                    actions: [{
                        label: '关闭',
                        handler: () => {
                            console.log('关闭')
                        }
                    }]
                })
                return;
            }
            try {
                await savePost(this.post);
                this.$q.notify({
                    type: "positive",
                    message: "保存成功",
                    position: "bottom-right",
                    actions: [{
                        label: '关闭',
                        handler: () => {
                            console.log('关闭')
                        }
                    }]
                })
            } catch (e) {}
        },
        get() {
            console.log(this.post.catelog)

        },
        setDate() {
            let timeStamp = Date.now()
            let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:00.SSSZ')
            console.log(formattedString)
            this.mypost.publishedDate = formattedString
            //  2018-07-31T17:37:00.+08:00
            // 2018-07-31T05:19:00.000+08:00
        }

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        $route(to) {
            if (to.name == "post_edit" && this.$route.params.id != this.post.id) {
                this.fetchData();
            }
        }
    },
    mounted() {
        this.fetchData()
        this.setDate()
    }
}
</script>
<style>
#editor {
    margin: auto;
    width: 100%;
    height: 550px;
}
</style>



 
