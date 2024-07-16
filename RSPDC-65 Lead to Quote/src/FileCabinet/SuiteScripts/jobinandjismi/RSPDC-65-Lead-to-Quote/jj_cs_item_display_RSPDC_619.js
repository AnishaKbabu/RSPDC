/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/record', 'N/search'],
    /**
     * @param{log} log
     * @param{record} record
     * @param{search} search
     */
    function(log, record, search) {
        
        function pageInit(scriptContext) {
            // Page initialization code if any
        }
    
        function fieldChanged(scriptContext) {
            try {
                let currentRecord = scriptContext.currentRecord;
                let sublistId = 'item';
                let serviceFieldId = 'custcol_jj_service_item_filter';
                log.debug('fieldId', serviceFieldId);
    
                if (scriptContext.fieldId === serviceFieldId && scriptContext.sublistId === sublistId) {
                    
                    let lineCount = currentRecord.getLineCount({ sublistId: sublistId });
                    for (let i = 0; i < lineCount; i++) {
                        let serviceItemId = currentRecord.getSublistValue({
                            sublistId: sublistId,
                            fieldId: serviceFieldId,
                            line: i
                        });
                        log.debug('Service Item ID', serviceItemId);
                        currentRecord.selectLine({
                            sublistId: sublistId,
                            line: i
                        });
    
                        // Set item field in sublist to selected service item
                        currentRecord.setCurrentSublistValue({
                            sublistId: sublistId,
                            fieldId: 'item',
                            value: serviceItemId,
                            line: i
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
    
        function postSourcing(scriptContext) {
            // Post sourcing code if any
        }
    
        function sublistChanged(scriptContext) {
            // Sublist change code if any
        }
    
        function lineInit(scriptContext) {
            // Line initialization code if any
        }
    
        function validateField(scriptContext) {
            // Field validation code if any
        }
    
        function validateLine(scriptContext) {
            // Line validation code if any
        }
    
        function validateInsert(scriptContext) {
            // Insert validation code if any
        }
    
        function validateDelete(scriptContext) {
            // Delete validation code if any
        }
    
        function saveRecord(scriptContext) {
            // Record save validation code if any
        }
    
        return {
            // pageInit: pageInit,
            fieldChanged: fieldChanged
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
    });
