
export default class ExcerptDialogState
{
    constructor(
        public isOpen:boolean = false,
        public sourceUri:string = "", public sourceRev:number = 0,
        public sourceStart:number = 0, public sourceEnd:number = 0,
        public targetUri:string = "", public targetRev:number = 0,
        public targetStart:number = 0, public targetEnd:number = 0)
    {
    }
}