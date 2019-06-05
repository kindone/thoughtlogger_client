import * as Quill from "quill"
import { Change } from "text-versioncontrol";
import * as _ from 'underscore'

export class QuillContent
{
    public static isEqual(content1:Change, content2:Change)
    {
        return _.isEqual(
            JSON.parse(JSON.stringify(this.normalizeContent(content1))),
            JSON.parse(JSON.stringify(this.normalizeContent(content2)))
        )
    }

    public static normalizeContent(content:Change)
    {
        const newContent = this.normalizeLastNewLine(content)
        // TODO: extra merge
        return newContent
    }

    public static normalizeLastNewLine(content:Change):Change {
        const insOp = {insert:"\n"}
        if(content.ops.length === 0)
            return {ops: [insOp]}

        const last = content.ops[content.ops.length-1].insert

        if(typeof last === 'string' && last.substr(last.length-1) !== '\n')
        {
            content.ops[content.ops.length-1].insert = content.ops[content.ops.length-1].insert + "\n"
            return content
        }
        else if(typeof last === 'object')
        {
            return {ops: content.ops.concat(insOp)}
        }
        return content
    }

    public static fromString(str:string) {
        return new QuillContent([{insert: str}])
    }

    public static fromDelta(delta:Change) {
        return delta.ops ? new QuillContent(delta.ops) : new QuillContent([])
    }

    public static empty() {
        return new QuillContent([{insert: '\n'}])
    }

    public constructor(public readonly ops:Quill.DeltaOperation[])
    {
    }
}