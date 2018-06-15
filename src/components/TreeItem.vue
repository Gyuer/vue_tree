<template>
  <span class="span_item">
    <span @click="Expanded">
      <el-input v-if="node.status == 1" style="width: 100px;" v-model="node.label" size="small"></el-input>
      <span v-if="node.status != 1">{{node.label}}</span>
    </span>
    <span v-if="node.status == 1">
      <el-button style="margin-left: 8px;" size="small" type="success" icon="checkmark-circled"
                 @click="SaveEdit">确认</el-button>
      <el-button style="margin-left: 8px;" size="small" type="ghost" icon="checkmark-circled"
                 @click="CancelEdit">取消</el-button>
    </span>
    <span class="span_icon">
        <i class="el-icon-edit" v-if="node.status == 0" style="margin-left: 8px" @click="OpenEdit"></i>
       <i v-if="node.status == 0" style="margin-left: 8px" class="el-icon-plus" @click="Append"></i>
       <i v-if="node.status == 0&&node.children.length < 1" style="margin-left: 8px" class="el-icon-delete" color="red"
          size="18" @click="Delete"></i>
    </span>
  </span>
</template>

<script>
    export default {
        data() {
            return {
                node: this.value,
                nodeData: JSON.parse(JSON.stringify(this.value))
            }
        },
        props: {
            value: {
                default: function () {
                    return {}
                }
            },
            treeNode: {
                default: function () {
                    return {}
                }
            }
        },
        methods: {
            OpenEdit() {
                this.node.status = 1
                this.node.isAdd = false
            },
            Append() {
                //添加节点事件
                this.$emit('Append')
            },
            SaveEdit() {
                //保存节点事件
                this.$emit('SaveEdit', this.nodeData);
                this.node.status = 0
            },
            CancelEdit() {
                this.node.status = 0
                this.$emit('CancelEdit', this.nodeData)
            },
            Delete() {
                this.node.p = 1
                this.$emit('Delete', this.nodeData);
            },
            Expanded() {
                this.treeNode.expanded = this.treeNode.expanded ? false : true
            }
        },
        watch: {
            value: {
                handler: function (val, oldVal) {
                    this.node = val
                },
                deep: true
            },
            node: {
                handler: function (val) {
                    this.$emit('input', val)
                },
                deep: true
            }
        }
    }
</script>
<style>
    .span_item:hover .span_icon {
        display: inline;
    }

    .span_icon {
        margin-left: 10px;
        display: none;
    }
</style>
