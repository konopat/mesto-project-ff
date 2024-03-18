import { initialCards } from './cards'
export const apiConfig = {
  token: 'd05a1e59-ee23-47c6-b813-a96f22087fe6',
  team: 'wff-cohort-8',
  url: 'https://mesto.nomoreparties.co/v1/',
  anon: {
    name: 'Аноним',
    about: 'Не удалось идентифицировать пользователя',
    avatar:
      'https://img.freepik.com/free-vector/hacker-realistic-composition_98292-38.jpg?t=st=1710733791~exp=1710737391~hmac=20661d5089703d242f7de39d0fe389cc28928ad4bcc00dc8f360be9a5c20ba45&w=1800',
  },
  defaultCards: initialCards,
}
