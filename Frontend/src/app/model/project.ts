export interface IProjectFile{
       id?:Number , 
       name?:String ,
       size?:String ,
       fileUrl?:String ,
       fileStorageId?:String ,      
       uploadBy?:String
}
export interface IProject {
      projectName?: String,
      accountNo?: String,
      bankName?: String,
      projectTypeId?: String,
      projectTypeName?: String,
      responsibleBy?: String,
      refNo?: String,
      source?: String,
      startDate?: String,
      complete?: Number,
      statusId?: Number , 
      statusName?: String,
      description?: String,
      dateCreated?: String,
      lastUpdated?: String,
      createdBy?: String,
      lastUpdatedBy?: String,

      balance?: number,
      totalReceived?: number,
      totalExpanse?: number,
      balanceTransfer?: number,
      id?:Number , 
      lastReceive?: Date, 
      lastTransfer?:Date, 
      lastExpanse?:Date, 
      projectFile:IProjectFile[]


}