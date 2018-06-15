<template>
    <div style="margin-left: 5px;">
        <el-tree
                class="filter-tree"
                style="overflow:auto;"
                :data="treeData"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                ref="tree"
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent"
                default-expand-all>
        </el-tree>
        <el-button style="margin-top: 10px" type="info" @click="addNode" long>添加根目录</el-button>
    </div>
</template>

<script>
    import TreeItem from './TreeItem.vue'

    export default {
        data() {

            const data = [{
                id: 1,
                label: '一级 1',
                status: 0,
                value: 1,
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    status: 0,
                    value: 2,
                    children: [{
                        id: 9,
                        label: '三级 1-1-1',
                        status: -1,
                        children: [],
                        value: 3,
                    }, {
                        id: 10,
                        label: '三级 1-1-2',
                        status: -1,
                        children: [],
                        value: 4,
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                status: 0,
                value: 5,
                children: [{
                    id: 5,
                    label: '二级 2-1',
                    status: -1,
                    children: [],
                    value: 6,
                }, {
                    id: 6,
                    label: '二级 2-2',
                    status: -1,
                    children: [],
                    value: 7,
                }]
            }, {
                id: 3,
                label: '一级 3',
                status: 0,
                value: 8,
                children: [{
                    id: 7,
                    label: '二级 3-1',
                    status: -1,
                    children: [],
                    value: 9,
                }, {
                    id: 8,
                    label: '二级 3-2',
                    status: -1,
                    children: [],
                    value: 10,
                }]
            }];
            return {
                filterText: '',
                treeData: JSON.parse(JSON.stringify(data)),
                runParam: {}
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            addNode() {
                this.treeData.splice(0, 0, {
                    value: this.$utilHelper.generateUUID(),
                    label: '请输入模块名称',
                    children: [],
                    status: 1,
                    isAdd: true
                })
            },
            handleNodeClick(nodeData) {
                this.$emit('NodeClick', nodeData)
            },
            renderContent(h, {node, data, store}) {
                return h(TreeItem, {
                    props: {
                        value: data,
                        treeNode: node
                    },
                    on: {
                        input: (node) => {
                            data = node
                        },
                        Append: () => {
                            node.expanded = true
                            data.children.push({
                                value: this.$utilHelper.generateUUID(),
                                label: '请输入模块名称',
                                children: [],
                                status: 1,
                                isAdd: true
                            })
                        },
                        //删除节点
                        Delete: (nodeData) => {
                            //递归查找父节点
                            var parentNode = this.$utilHelper.clearTable(this.treeData, data.value).parentNode
                            this.runParam.parentNode = parentNode
                            this.runParam.data = data
                            this.runParam.nodeData = nodeData
                        },
                        //保存节点
                        SaveEdit: (nodeData) => {
                            //递归查找父节点
                            var parentNode = this.$utilHelper.getNode(this.treeData, data.value).parentNode
                            this.runParam.parentNode = parentNode
                            this.runParam.data = data
                            this.runParam.nodeData = nodeData
                        },
                        //撤销修改
                        CancelEdit: (nodeData) => {
                            //递归查找父节点
                            var parentNode = this.$utilHelper.getNode(this.treeData, data.value).parentNode
                            if (data.isAdd) {
                                parentNode.children.forEach((v, i) => {
                                    if (v.value == data.value) {
                                        parentNode.children.splice(i, 1)
                                    }
                                })
                            } else {
                                parentNode.children.forEach((v, i) => {
                                    if (v.value == data.value) {
                                        parentNode.children.splice(i, 1, JSON.parse(JSON.stringify(nodeData)))
                                    }
                                })
                            }
                        }
                    }
                })
            },
            CanSaveNext(isNext, nodeId) {
                let parentNode = this.runParam.parentNode
                let nodeData = this.runParam.nodeData
                let data = this.runParam.data
                if (isNext) {
                    parentNode.children.forEach((v, i) => {
                        if (v.value == data.value) {
                            if (this.HOST != "static" && data.isAdd) {
                                data.value = nodeId
                            }
                            data.status = 0
                            parentNode.children.splice(i, 1, data)
                        }
                    })
                } else {
                    if (!data.isAdd) {
                        parentNode.children.forEach((v, i) => {
                            if (v.value == nodeData.value) {
                                data.label = nodeData.label
                                parentNode.children.splice(i, 1, data)
                            }
                        })
                    }
                }
                this.runParam = {}
            },
            CanDelNext(isNext) {
                let parentNode = this.runParam.parentNode
                let nodeData = this.runParam.nodeData
                let data = this.runParam.data
                if (isNext) {
                    parentNode.children.forEach((v, i) => {
                        if (v.value == data.value) {
                            parentNode.children.splice(i, 1)
                        }
                    })
                }
                this.runParam = {}
            }
        },
        props: {
            value: Array
        },
        watch: {
            value: {
                handler: function (val, oldVal) {
                    this.treeData = val
                },
                deep: true
            },
            treeData: {
                handler: function (val) {
                    this.$emit('input', val)
                },
                deep: true
            }
        },
        components: {
            TreeItem
        }
    }
</script>
