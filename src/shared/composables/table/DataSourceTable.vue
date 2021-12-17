<template>
  <div class="btn_line_group">
    <div class="">
      <a-button class="editable-add-btn" icon="plus" @click="addItemAuto"> Add </a-button>
      <a-button type="danger" class="editable-add-btn" icon="close" @click="handleClear"> Clear </a-button>
    </div>
    <div>
      <!-- <a-upload
            name="file"
            accept=".xlsx,.XLSX"
            :multiple="false"
            :before-upload="beforeUpload"
        >
          <a-button icon="cloud-upload" type="default" shape="circle"/>
        </a-upload>
        <xlsx-read :file="file">
          <xlsx-json>
            <template #default="{collection}">
              <div v-show="false">
                {{ uploadDataSource = collection }}
              </div>
            </template>
          </xlsx-json>
        </xlsx-read> -->
    </div>
  </div>

  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a @click="save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
// @ts-ignore
import { cloneDeep } from 'lodash-es'

interface DataItem {
  key: string
  name: string
  age: number
  address: string
}

@Options({
  components: {},
})
export default class DataSourceTable extends Vue {
  columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
    },
  ]

  // data: DataItem[] = []
}
</script>

<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
