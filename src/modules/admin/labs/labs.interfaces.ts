import { LabStatusEnum } from "@/common/enum/lab.enum"

export interface IUpdateLab {
  name?: string
  description?: string
  attachmentPath?: string
  status?: LabStatusEnum
}