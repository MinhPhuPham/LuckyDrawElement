<template>
  <div class="flex justify-between mt-1">
    <!-- <a-button danger type="primary" @click="handleClear">
      <template #icon>
        <DeleteOutlined />
      </template>
      <span class="text-medium">Delete</span>
    </a-button> -->
    <span></span>

    <div>
      <a-button class="mr-1" @click="addDefault">
        <template #icon>
          <PlusOutlined />
        </template>
        <span class="text-medium">Add</span>
      </a-button>
      <a-button @click="saveAllEdit" type="primary">
        <template #icon>
          <SaveOutlined />
        </template>
        <span class="text-medium">Save</span>
      </a-button>
    </div>
  </div>

  <!-- :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" -->
  <a-table
    :loading="loading"
    :columns="columns"
    :data-source="dataSources"
    :pagination="{ position: ['topLeft', 'bottomRight'] }"
    @resizeColumn="handleResizeColumn"
    bordered
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'subtitle'].includes(column.dataIndex)">
        <a-input
          v-if="editableData[record.id]"
          v-model:value="editableData[record.id][column.dataIndex]"
          style="margin: -5px 0"
          :ref="`nameInput${column.dataIndex}${record.id}`"
          @pressEnter="onEnter(column.dataIndex)"
        />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-else-if="column.key === 'isPlayed'">
        <CheckSquareTwoTone :style="{ fontSize: '20px' }" two-tone-color="#52c41a" v-if="record.isPlayed" />
        <CloseSquareTwoTone :style="{ fontSize: '20px' }" two-tone-color="#eb2f96" v-else />
      </template>
      <template v-else-if="column.key === 'selected'">
        <a-tag color="geekblue" v-if="record.selected">
          {{ selected.name }} <br />
          {{ selected.dateSelected }}
        </a-tag>
        <span v-else>-</span>
      </template>
      <template v-else-if="column.key === 'link'">
        <TypographyParagraph style="margin-bottom: 0.5rem" code :copyable="{ text }">
          {{ $t('label.copy_link') }}
        </TypographyParagraph>
        <span @click="toggleQRViewer(record.id)">
          <AppstoreTwoTone />
          <a class="ml-haft">QR code</a>
        </span>
        <ms-qrcode v-if="qrCodeViewer[record.id]" level="L" :url="text" :keyValue="text" />
      </template>
      <template v-else-if="column.key === 'action'">
        <span v-if="editableData[record.id]">
          <a class="mr-haft" @click="onSave(record.id)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a-button class="action-max mb-haft" block @click="edit(record.id)">
            <template #icon>
              <EditOutlined />
            </template>
            Edit
          </a-button>

          <a-popconfirm title="Sure to delete?" @confirm="onDelete(record.id)">
            <a-button class="action-max" block>
              <template #icon>
                <DeleteOutlined />
              </template>
              Delete
            </a-button>
          </a-popconfirm>
        </span>
      </template>
      <!-- next-version -->
      <!-- <component
        :is="components[selectedMiracle.type]"
        @save="onSave"
        @edit="edit"
        v-bind="{ column, text, record, editableData }"
      ></component> -->
    </template>
  </a-table>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import uniqid from 'uniqid'
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  EditOutlined,
  AppstoreTwoTone,
} from '@ant-design/icons-vue'
import { Table } from 'ant-design-vue'

import { MiracleType } from '@/shared/enums/miracle-type'
import { OPTIONS_DEFAULT_DATASOUCE, BASE_COLUMNS } from '@/shared/consts'

// import asyncTableTemplate from '@/shared/composables/table/templates/asyncTableTemplate'

import { IDataSource } from '@/shared/models/datasources'
import { IMiracle } from '@/shared/models/miracle'

// Remove in next version
import { Input, Popconfirm, TypographyParagraph, Tag } from 'ant-design-vue'
import QRCode from '@/shared/composables/qr-code/QRCode.vue'
import { MYSTERIES_ACTION } from '@/store/mysteries/actions'
import DatasourcesSerivce from '@/services/data-sources'
import { successNotification } from '@/helpers/notification'

@Options({
  components: {
    [Table.name]: Table,
    [QRCode.name]: QRCode,
    [Input.name]: Input,
    [Tag.name]: Tag,
    [Popconfirm.name]: Popconfirm,
    CheckSquareTwoTone,
    CloseSquareTwoTone,
    TypographyParagraph,
    PlusOutlined,
    DeleteOutlined,
    SaveOutlined,
    EditOutlined,
    AppstoreTwoTone,
  },
  name: 'ms-datasource',
})
export default class DataSourceTable extends Vue {
  get loading() {
    return this.$store.getters.dataSourceLoading
  }

  get selectedMiracle(): IMiracle {
    return this.$store.getters.miracle
  }

  get userId() {
    return this.$store.getters.userId
  }

  get dataSources(): IDataSource[] {
    return this.$store.getters.datasources
  }

  set dataSources(value: IDataSource[]) {
    this.$store.commit(MYSTERIES_ACTION.SET_DATASOURCE, value)
  }

  get baseDatasource() {
    return OPTIONS_DEFAULT_DATASOUCE[this.selectedMiracle.type as MiracleType]
  }

  // components = {
  //   [MiracleType.MIRACLE_CARD]: markRaw(asyncTableTemplate.CardTableTemplate),
  //   [MiracleType.MIRACLE_WHEEL]: asyncTableTemplate.WheelTableTemplate,
  //   [MiracleType.MIRACLE_CLOUD]: asyncTableTemplate.CloudTableTemplate,
  // }

  routerName = {
    [MiracleType.MIRACLE_CARD]: 'mysCard',
    [MiracleType.MIRACLE_WHEEL]: 'mysCloud',
    [MiracleType.MIRACLE_CLOUD]: 'mysWheel',
  }

  columns = BASE_COLUMNS
  previousKey = ''
  // eslint-disable-next-line
  editableData: any = {}
  // eslint-disable-next-line
  qrCodeViewer: any = {}

  onEnter(indexKey: string) {
    this.addDefault()
  }

  edit(id: string) {
    this.editableData[id] = JSON.parse(JSON.stringify(this.dataSources.find((item) => id === item.id)))
  }

  onSave(id: string) {
    if (this.isEmptyRequired(id)) {
      return
    }

    new DatasourcesSerivce(this.$database, this.selectedMiracle.id)
      .upsertDataSource(this.editableData[id])
      .then((res) => {
        successNotification(`${this.$t('message.success')} ${this.$t('message.save_datasource')}`)
        delete this.editableData[id]
      })
  }

  async onDelete(id: string) {
    await new DatasourcesSerivce(this.$database, this.selectedMiracle.id).deleteDataSource(id).then(() => {
      successNotification(`${this.$t('message.success')} ${this.$t('message.delete_datasource')}`)
    })
  }

  cancel(id: string) {
    delete this.editableData[id]
  }

  handleClear() {}

  onSelectChange() {}

  addDefault() {
    if (this.isEmptyRequired()) {
      return
    }

    const uniqueId = uniqid()
    const datasource: IDataSource = {
      ...this.baseDatasource,
      id: uniqueId,
      link: this.renderLinkShare(uniqueId),
    }

    this.dataSources.unshift(datasource)

    this.edit(datasource.id)
    this.previousKey = datasource.id

    this.$nextTick(() => {
      ;(this.$refs[`nameInputname${datasource.id}`] as HTMLInputElement)?.focus()
    })
  }

  toggleQRViewer(resourceId: string) {
    if (this.qrCodeViewer[resourceId]) {
      delete this.qrCodeViewer[resourceId]
    } else {
      this.qrCodeViewer[resourceId] = true
    }
  }

  isEmptyRequired(key?: string) {
    return this.editableData[key || this.previousKey] && !this.editableData[key || this.previousKey]?.name
  }

  renderLinkShare(resourceId: string) {
    const path = this.$router.resolve({
      name: this.routerName[this.selectedMiracle.type as MiracleType],
      params: {
        userId: this.userId,
        miracleId: this.selectedMiracle.id,
      },
      query: {
        resourceId: resourceId,
      },
    })?.fullPath

    return location.origin + path
  }

  saveAllEdit() {
    const datasourcesKeepEdit = Object.values(this.editableData) as IDataSource[]

    if (datasourcesKeepEdit.length) {
      new DatasourcesSerivce(this.$database, this.selectedMiracle.id)
        .addMultipleDatasource(datasourcesKeepEdit)
        .then(() => {
          successNotification(`${this.$t('message.success')} ${this.$t('message.save_datasource')}`)
          this.$store.commit(MYSTERIES_ACTION.SET_MULTI_DATASOURCE, datasourcesKeepEdit)
          this.editableData = {}
        })
    }
  }

  handleResizeColumn(width: string, column: { width: string }) {
    column.width = width
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.action-max {
  max-width: 120px;
}
</style>
