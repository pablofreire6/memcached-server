"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetsCommand = void 0;
const GetCommand_1 = require("./GetCommand");
const utils_1 = require("../lib/utils");
class GetsCommand extends GetCommand_1.GetCommand {
    /**
     * Given a list of keys it will return all the items
     * found for them including the cas unique id
     *
     * @param keys string[]
     */
    findByKeys(keys) {
        let result = super.findByKeys(keys);
        let updateResult = result.map((item) => {
            // cloning the original instance to prevent mutation
            let newItem = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
            newItem.setCasId(utils_1.encodeMessage(item.getMessage()));
            return newItem;
        });
        return updateResult;
    }
}
exports.GetsCommand = GetsCommand;
