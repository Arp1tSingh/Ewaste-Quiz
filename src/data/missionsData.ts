import type { Mission } from '../types'

export const missions: Mission[] = [
  {
    id: 'learn-facts',
    icon: '📚',
    title: 'Learn 3 E-Waste Facts',
    description: 'Read through three quick facts about e-waste and its impact on the environment.',
    points: 5,
  },
  {
    id: 'identify-electronics',
    icon: '📱',
    title: 'Identify Your Old Electronics',
    description: 'Identify one unused electronic item at home and learn how it should be responsibly recycled.',
    points: 5,
  },
  {
    id: 'battery-safety',
    icon: '🔋',
    title: 'Learn About Battery Safety',
    description: 'Understand why batteries need special handling and where they should be dropped off.',
    points: 5,
  },
  {
    id: 'collection-point',
    icon: '♻️',
    title: 'Bring E-Waste to the Campus Collection Point',
    description: 'Drop off an old device or accessory at the designated campus e-waste collection point.',
    points: 20,
  },
  {
    id: 'invite-friend',
    icon: '👥',
    title: 'Invite a Friend',
    description: 'Invite a friend to join the E-Waste Awareness Campaign and start their own passport.',
    points: 5,
  },
  {
    id: 'collection-drive',
    icon: '🌍',
    title: 'Participate in the Campus Collection Drive',
    description: 'Take part in the campus-wide e-waste collection drive event.',
    points: 20,
  },
]

export const currentMission = {
  id: 'give-new-life',
  icon: '♻️',
  title: 'Give Your Old Electronics a New Life',
  description:
    'Identify one unused electronic item at home and learn how it should be responsibly recycled.',
  points: 20,
}
