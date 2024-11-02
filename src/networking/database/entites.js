class UnitOfMeasurement {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
}
class Item {
    constructor(code, name, hsn_code, cgst, sgst, igst, unitOfMeasurements) {
        this.code = code;
        this.name = name;
        this.hsn_code = hsn_code;
        this.cgst = cgst;
        this.sgst = sgst;
        this.igst = igst;
        this.unitOfMeasurements = unitOfMeasurements;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getHSNCode() {
        return this.hsn_code;
    }
    getCGST() {
        return this.cgst;
    }
    getSGST() {
        return this.sgst;
    }
    getIGST() {
        return this.igst;
    }
    getUnitOfMeasurements() {
        return this.unitOfMeasurements;
    }
}

class State {
    constructor(code, name, alphaCode) {
        this.code = code;
        this.name = name;
        this.alphaCode = alphaCode;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getAlphaCode() {
        return this.alphaCode;
    }
}

class Trader {
    constructor(code, name, address, gst_num, reg_title_1, reg_value_1, contact_1, contact_2, contact_3, bank_custom_name, account_number, branch_name, ifsc_code, state_code) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.gst_num = gst_num;
        this.reg_title_1 = reg_title_1;
        this.reg_value_1 = reg_value_1;
        this.contact_1 = contact_1;
        this.contact_2 = contact_2;
        this.contact_3 = contact_3;
        this.bank_custom_name = bank_custom_name;
        this.account_number = account_number;
        this.branch_name = branch_name;
        this.ifsc_code = ifsc_code;
        this.state_code = state_code;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    getGSTNUM() {
        return this.gst_num;
    }
    getRegTitle1() {
        return this.reg_title_1;
    }
    getRegValue1() {
        return this.reg_value_1;
    }
    getContact1() {
        return this.contact_1;
    }
    getContact2() {
        return this.contact_2;
    }
    getContact3() {
        return this.contact_3;
    }
    getBankCustomName() {
        return this.bank_custom_name;
    }
    getAccountNumber() {
        return this.account_number;
    }
    getBranchName() {
        return this.branch_name;
    }
    getIFSCCode() {
        return this.ifsc_code;
    }
    getStateCode() {
        return this.state_code;
    }
}

class Customer {
    constructor(code, name, address, reg_title_1, reg_value_1, reg_title_2, reg_value_2, reg_title_3, reg_value_3, contact_1, contact_2, contact_3, state_code) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.reg_title_1 = reg_title_1;
        this.reg_value_1 = reg_value_1;
        this.reg_title_2 = reg_title_2;
        this.reg_value_2 = reg_value_2;
        this.reg_title_3 = reg_title_3;
        this.reg_value_3 = reg_value_3;
        this.contact_1 = contact_1;
        this.contact_2 = contact_2;
        this.contact_3 = contact_3;
        this.state_code = state_code;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    getRegTitle1() {
        return this.reg_title_1;
    }
    getRegValue1() {
        return this.reg_value_1;
    }
    getRegTitle2() {
        return this.reg_title_2;
    }
    getRegValue2() {
        return this.reg_value_2;
    }
    getRegTitle3() {
        return this.reg_title_3;
    }
    getRegValue3() {
        return this.reg_value_3;
    }
    getContact1() {
        return this.contact_1;
    }
    getContact2() {
        return this.contact_2;
    }
    getContact3() {
        return this.contact_3;
    }
    getStateCode() {
        return this.state_code;
    }
}
module.exports = { UnitOfMeasurement, Item, State, Trader, Customer };