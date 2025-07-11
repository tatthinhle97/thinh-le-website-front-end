import {HugeiconsIcon} from '@hugeicons/react'
import {MoneyBag02Icon} from '@hugeicons-pro/core-solid-rounded'

const minimumPrice = {
  id: 0,
  title: 'Minimum price',
  icon: <HugeiconsIcon icon={MoneyBag02Icon} className={'wh-big-4'} />
}

const medianPrice = {
  id: 1,
  title: 'Median price',
  icon: <HugeiconsIcon icon={MoneyBag02Icon} className={'wh-big-4'} />
}

const maximumPrice = {
  id: 2,
  title: 'Maximum price',
  icon: <HugeiconsIcon icon={MoneyBag02Icon} className={'wh-big-4'} />
}

const allValueBoxes = [minimumPrice, medianPrice, maximumPrice]

const valueBoxConstant = {
  minimumPrice, medianPrice, maximumPrice, allValueBoxes
}

export default valueBoxConstant
