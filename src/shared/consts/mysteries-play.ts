import { MiracleType } from '@/shared/enums/miracle-type'
import { shallowRef } from '@vue/runtime-core'
import AsyncMysteries from '@/components/asyncCompoents/AsyncMysteries'

export const ASYNC_TEMPLATE = {
  [MiracleType.MIRACLE_CARD]: shallowRef(AsyncMysteries.MysCard),
  [MiracleType.MIRACLE_WHEEL]: shallowRef(AsyncMysteries.MysWheel),
  [MiracleType.MIRACLE_CLOUD]: shallowRef(AsyncMysteries.MysCloud),
}
