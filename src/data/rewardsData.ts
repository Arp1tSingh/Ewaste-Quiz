import type { Reward } from '../types'

export const rewards: Reward[] = [
  {
    id: 'cafe-coupon',
    icon: '🎟️',
    name: 'Campus Café Coupon',
    description: 'Redeem for a free item at the campus café.',
    cost: 50,
  },
  {
    id: 'mini-plant',
    icon: '🌱',
    name: 'Mini Plant',
    description: 'A small potted plant for your desk, on us.',
    cost: 100,
  },
  {
    id: 'merch',
    icon: '👜',
    name: 'Eco-Friendly Merchandise',
    description: 'A tote bag or mug made from sustainable materials.',
    cost: 150,
  },
  {
    id: 'certificate-reward',
    icon: '🏆',
    name: 'Green Champion Certificate',
    description: 'A printed certificate recognizing your eco leadership.',
    cost: 200,
  },
  {
    id: 'lucky-draw',
    icon: '🎁',
    name: 'Lucky Draw Entry',
    description: 'One entry into the campaign\u2019s end-of-semester lucky draw.',
    cost: 100,
  },
]
