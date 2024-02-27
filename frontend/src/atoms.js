import {atom} from 'recoil'

export const statusAtom = atom({
    key:"status",
    default: "not logged in"
})

export const notificationsAtom = atom({
    key:"notifications",
    default: 0
})

export const notificationsListAtom = atom({
    key: "notificationsList",
    default: []
})