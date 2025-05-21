import {HugeiconsIcon} from '@hugeicons/react'
import {MoneyBag02Icon} from '@hugeicons-pro/core-solid-rounded'

const bestDeal = {
  id: 0,
  title: 'Best deal',
  icon: <HugeiconsIcon icon={MoneyBag02Icon} className={'wh-big-4'} />
}

const medianPrice = {
  id: 1,
  title: 'Median price',
  icon: <HugeiconsIcon icon={MoneyBag02Icon} className={'wh-big-4'} />
}

const mostExpensive = {
  id: 2,
  title: 'Most expensive',
  icon: <HugeiconsIcon icon={MoneyBag02Icon} className={'wh-big-4'} />
}

const allValueBoxes = [bestDeal, medianPrice, mostExpensive]

const valueBoxConstant = {
  bestDeal, medianPrice, mostExpensive, allValueBoxes
}

export default valueBoxConstant
