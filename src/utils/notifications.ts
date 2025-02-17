import { Notif_Source } from "@prisma/client";
import formatDateAndTime from "./formateDateTime";
export function notifications(data: any) {
    if (data.source === Notif_Source.Sales_Invoice) {
      return `${data.orgBranch} has created a sales invoice for ${(data.totalCost).toFixed(2)} due on ${formatDateAndTime(data.dueDate).formattedDate}.`;
    } 
    if( data.source=== Notif_Source.Inventory_Timeline_Added){
        return `Stock levels successfully updated for ${data.totalItems} items. Click here to see the addition to your inventory.`
    }
    if(data.source===Notif_Source.Inventory_Timeline_Removed){
        return `Stock levels successfully updated for ${data.totalItems} items. Click here to see items removed from inventory.`
    }
    if(data.source===Notif_Source.Inventory_Product_Expiry){
        return `${data.totalItems} units of ${data.productName} are ${data.expiry} days away from expiration. Evaluate your current inventory needs and consider adjusting levels accordingly.`
    }
    if(data.source===Notif_Source.Inventory_Product_Remain){
        return `Only ${data.totalItems} of ${data.productName} remaining. Replenish items soon for seamless operations.`
    }
    if(data.source===Notif_Source.Inventory_Product_MaxStock){
        return `${data.productName} has reached maximum stock level. Evaluate your current inventory needs and consider adjusting levels accordingly.`
    }
    if(data.source===Notif_Source.Expense_Invoice){
        return `${data.orgBranch} has created an expense invoice for ${(data.totalCost).toFixed(2)} due on ${formatDateAndTime(data.dueDate).formattedDate}. `
    }
    if(data.source===Notif_Source.Inventory_ProductBatch){
        return `Batch ${data.batchNumber} under ${data.productName} has reached expiry. Evaluate your current inventory needs and consider adjusting levels accordingly.`
    }
    if(data.source ===Notif_Source.Inventory_Update_Approval_Request){
        return `${data.name} wants to stock out ${data.totalItems} units of ${data.itemName}.`
    }
     if(data.source ===Notif_Source.Purchase_Order_Due){
        return `${data.purchaseReference} to ${data.distributor}. This invoice expires on ${formatDateAndTime(data.dueDate).formattedDate}.`
    }

    if(data.source ===Notif_Source.Payment_Edit_Approval_Request){
        return `${data.user} wants to edit ${data.partyName}'s payment receipt #${data.receipt}. `
    }
    if(data.source ===Notif_Source.Payment_Delete_Approval_Request){

        return `${data.user} wants to cancel ${data.partyName}'s payment receipt #${data.receipt}. `
    }
    
  }
  