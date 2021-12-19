import { ColumnType } from 'ant-design-vue/lib/table'

export const BASE_COLUMNS: ColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    resizable: true,
    width: 150,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    title: 'Sub title',
    dataIndex: 'subtitle',
    key: 'subtitle',
    resizable: true,
    width: 200,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    title: 'Link',
    dataIndex: 'link',
    key: 'link',
    width: 150,
    align: 'center',
  },
  {
    title: 'Joined',
    key: 'isPlayed',
    dataIndex: 'isPlayed',
    width: 50,
    align: 'center',
  },
  {
    title: 'Result',
    key: 'selected',
    dataIndex: 'selected',
    width: 100,
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    width: 80,
  },
]
