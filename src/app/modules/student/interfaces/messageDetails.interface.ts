import { groupType } from "../enums/groupType.enum"
import { senderType } from "../enums/senderType.enum"

export interface messageDetails {
    groupType: groupType | null
    content: string
    groupId: string,
    senderId : string | null,
    senderType : senderType
  }