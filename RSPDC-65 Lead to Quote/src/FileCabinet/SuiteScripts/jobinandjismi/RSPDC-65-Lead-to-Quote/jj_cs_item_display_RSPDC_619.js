/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/**********************************************************************************
 * RSPDC-619 : Restrict Items Display in Opportunity & Estimate Records to Service Items
 *
 *
 * ********************************************************************************
 *
 * ********************
 * company name
 *
 * Author: Jobin and Jismi IT Services
 *
 *
 * Date Created: 17-July-2024
 *
 * Description: To ensure that only service items are listed in the items subtab of the opportunity and 
 * estimate records,we can also use a simpler approach by leveraging custom fields and filtering within the field setup. 
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 17-July-2024: Created the initial build by JJ0352
 *
 *
 *
 **************/
define(['N/log', 'N/record'],
    /**
     * @param{log} log
     * @param{record} record
     
     */
    function (log, record) {

        

        function fieldChanged(scriptContext) {
            try {
                let currentRecord = scriptContext.currentRecord;
                let sublistId = 'item';
                let serviceFieldId = 'custcol_jj_service_item_filter';
                let itemFieldId = 'item';



                if (scriptContext.fieldId === serviceFieldId && scriptContext.sublistId === sublistId) {
                    
                    // Get the service item ID from the current line
                    let line = scriptContext.line;
                    let serviceItemId = currentRecord.getCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: serviceFieldId
                    });
                   

                    if (serviceItemId) {
                        // Select the current line
                        currentRecord.selectLine({
                            sublistId: sublistId,
                            line: line
                        });

                        // Set item field in sublist to selected service item
                        currentRecord.setCurrentSublistValue({
                            sublistId: sublistId,
                            fieldId: itemFieldId,
                            value: serviceItemId
                        });
                       

                        // Commit the sublist line
                        currentRecord.commitLine({
                            sublistId: sublistId
                        });
                        
                    }
                }
            } catch (error) {
                log.error('Error in fieldChanged', error);
            }
        }

        
       
        return {
            
            fieldChanged: fieldChanged
            
        };
    });