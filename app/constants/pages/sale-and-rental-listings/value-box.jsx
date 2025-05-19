import {MoneyBag02Icon} from '@hugeicons/react'

const bestDeal = {
  id: 0,
  title: 'Best deal',
  icon: <MoneyBag02Icon
    className={'wh-big-4'}
    size={'100%'}
    variant={'solid'}
    type={'rounded'} />
}

const medianPrice = {
  id: 1,
  title: 'Median price',
  icon: <MoneyBag02Icon
    className={'wh-big-4'}
    size={'100%'}
    variant={'solid'}
    type={'rounded'} />
}

const mostExpensive = {
  id: 2,
  title: 'Most expensive',
  icon: <MoneyBag02Icon
    className={'wh-big-4'}
    size={'100%'}
    variant={'solid'}
    type={'rounded'} />
}

const allValueBoxes = [bestDeal, medianPrice, mostExpensive]

const valueBox = {
  bestDeal, medianPrice, mostExpensive, allValueBoxes
}

export default valueBox
