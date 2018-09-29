import { AsnycStatus } from "app/utils/AsyncStatus";

export default class SaveAsModalState
{
    constructor(
        public isModalOpen:boolean = false,
        public status:AsnycStatus = AsnycStatus.INITIAL)
    {
    }
}