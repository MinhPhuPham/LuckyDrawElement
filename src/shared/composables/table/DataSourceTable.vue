<template>
  <div class="text-right">
    <div class="">
      <a-button>
        <template #icon>
          <PlusOutlined />
        </template>
        Add
      </a-button>
      <a-button type="danger" @click="handleClear">
        <template #icon>
          <DeleteOutlined />
        </template>
        Delete All Selected
      </a-button>
    </div>
    <div></div>
  </div>

  <a-table :columns="columns" :data-source="dataSource" :pagination="{ position: ['topLeft', 'bottomRight'] }" bordered>
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
            <template v-if="column.dataIndex === 'address'"
              ><ms-qrcode level="L" :url="text" :keyValue="text"
            /></template>
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
import cloneDeep from 'lodash/cloneDeep'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { Table, Input, Popconfirm } from 'ant-design-vue'
import QRCode from '@/shared/composables/qr-code/QRCode.vue'

interface DataItem {
  key: string
  name: string
  age: number
  address: string
}

@Options({
  components: {
    [Table.name]: Table,
    [Input.name]: Input,
    [Popconfirm.name]: Popconfirm,
    [QRCode.name]: QRCode,
    PlusOutlined,
    DeleteOutlined,
  },
  name: 'ms-datasource',
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
      width: '10%',
    },
  ]

  dataSource: DataItem[] = []
  // eslint-disable-next-line
  editableData: any = {}

  edit(key: string) {
    this.editableData[key] = cloneDeep(this.dataSource.filter((item) => key === item.key)[0])
  }

  save(key: string) {
    Object.assign(this.dataSource.filter((item) => key === item.key)[0], this.editableData[key])
    delete this.editableData[key]
  }

  cancel(key: string) {
    delete this.editableData[key]
  }

  handleClear() {}

  created() {
    for (let i = 0; i < 100; i++) {
      this.dataSource.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `https://firebase.google.com/docs/firestore/query-data/listen${i}`,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .editable-cell {
//   position: relative;
//   .editable-cell-input-wrapper,
//   .editable-cell-text-wrapper {
//     padding-right: 24px;
//   }

//   .editable-cell-text-wrapper {
//     padding: 5px 24px 5px 5px;
//   }

//   .editable-cell-icon,
//   .editable-cell-icon-check {
//     position: absolute;
//     right: 0;
//     width: 20px;
//     cursor: pointer;
//   }

//   .editable-cell-icon {
//     margin-top: 4px;
//     display: none;
//   }

//   .editable-cell-icon-check {
//     line-height: 28px;
//   }

//   .editable-cell-icon:hover,
//   .editable-cell-icon-check:hover {
//     color: #108ee9;
//   }

//   .editable-add-btn {
//     margin-bottom: 8px;
//   }
// }
// .editable-cell:hover .editable-cell-icon {
//   display: inline-block;
// }
</style>
