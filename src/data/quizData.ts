import type { QuizQuestion } from '../types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is e-waste?',
    options: [
      'Discarded electrical or electronic devices',
      'Any waste produced in a college canteen',
      'Waste generated only by factories',
      'Paper and cardboard packaging',
    ],
    correctIndex: 0,
    explanation:
      'E-waste refers to discarded electrical or electronic equipment, from phones and laptops to chargers and batteries.',
  },
  {
    id: 2,
    question: 'Which of the following is an example of e-waste?',
    options: ['Paper notebook', 'Old smartphone', 'Food waste', 'Cotton bag'],
    correctIndex: 1,
    explanation:
      'Old smartphones contain electronic components and should be handled through responsible reuse or recycling channels.',
  },
  {
    id: 3,
    question: 'What is the correct way to dispose of an old laptop?',
    options: [
      'Throw it in the regular trash bin',
      'Leave it in a drawer forever',
      'Take it to an authorized e-waste collection point',
      'Burn it to reduce its size',
    ],
    correctIndex: 2,
    explanation:
      'Authorized e-waste collection points are equipped to safely dismantle and recycle electronics, keeping harmful materials out of landfills.',
  },
  {
    id: 4,
    question: 'Why should batteries never be thrown in regular waste bins?',
    options: [
      'They are too heavy for regular bins',
      'They can leak chemicals and pose environmental and safety hazards',
      'They make the bin smell unpleasant',
      'There is no real reason, it is just a rule',
    ],
    correctIndex: 1,
    explanation:
      'Batteries contain chemicals that can leak into soil and water, so they need dedicated recycling or disposal points.',
  },
  {
    id: 5,
    question: 'Before recycling a device, what is a smart first step to consider?',
    options: [
      'Immediately smash the screen',
      'Check if it can be reused, repaired, or donated instead',
      'Remove all warning labels',
      'Paint over any visible logos',
    ],
    correctIndex: 1,
    explanation:
      'Reuse and repair extend a device\u2019s life and reduce the amount of new e-waste created, and should be considered before recycling.',
  },
  {
    id: 6,
    question: 'What should you do with personal data before recycling an old phone or laptop?',
    options: [
      'Nothing, data disappears automatically',
      'Back it up and perform a secure factory reset or data wipe',
      'Leave your accounts logged in',
      'Give the device away without checking it',
    ],
    correctIndex: 1,
    explanation:
      'Backing up important files and securely wiping personal data protects your privacy before a device changes hands.',
  },
  {
    id: 7,
    question: 'What is one major environmental impact of improperly disposed e-waste?',
    options: [
      'It has no environmental impact at all',
      'It can release toxic substances into soil and water',
      'It improves soil fertility',
      'It reduces air pollution',
    ],
    correctIndex: 1,
    explanation:
      'Improperly handled e-waste can leach heavy metals and toxic chemicals into soil and water sources, harming ecosystems.',
  },
  {
    id: 8,
    question: 'What makes a recycling facility "authorized" for handling e-waste?',
    options: [
      'It has been certified or approved to safely process electronic waste',
      'It is simply the closest facility to your home',
      'It only accepts plastic bottles',
      'It has no formal certification',
    ],
    correctIndex: 0,
    explanation:
      'Authorized facilities follow certified processes to safely extract materials and handle hazardous components.',
  },
  {
    id: 9,
    question: 'Which components inside electronics can sometimes be recovered through responsible recycling?',
    options: [
      'Metals like copper, gold, and aluminum',
      'Nothing can ever be recovered',
      'Only the plastic casing',
      'Water',
    ],
    correctIndex: 0,
    explanation:
      'Responsible recycling can help recover valuable metals such as copper, gold, and aluminum from circuit boards and components.',
  },
  {
    id: 10,
    question: 'What is one simple action a student can take during an e-waste awareness campaign?',
    options: [
      'Ignore the campaign entirely',
      'Bring unused electronics to the campus collection point and spread awareness',
      'Hide old devices at home indefinitely',
      'Buy more gadgets without a plan to recycle old ones',
    ],
    correctIndex: 1,
    explanation:
      'Bringing unused electronics to a collection point and encouraging friends to do the same directly supports the campaign\u2019s goals.',
  },
]
