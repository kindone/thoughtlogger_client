import * as Quill from "quill"
import { IDelta } from "text-versioncontrol";
import * as _ from 'underscore'

export class QuillContent
{
    public static isEqual(content1:IDelta, content2:IDelta)
    {
        return _.isEqual(
            JSON.parse(JSON.stringify(this.normalizeContent(content1))),
            JSON.parse(JSON.stringify(this.normalizeContent(content2)))
        )
    }

    public static normalizeContent(content:IDelta)
    {
        const newContent = this.normalizeLastNewLine(content)
        // TODO: extra merge
        return newContent
    }

    public static normalizeLastNewLine(content:IDelta):IDelta {
        const insOp = {insert:"\n"}
        if(content.ops.length === 0)
            return {ops: [insOp]}

        const last = content.ops[content.ops.length-1].insert

        if(typeof last === 'string')
        {
            if(last.substr(last.length-1) !== '\n')
            {
                return {ops: content.ops.concat(insOp)}
            }
        }
        return content
    }

    public static fromString(str:string) {
        return new QuillContent([{insert: str}])
    }

    public static fromDelta(delta:Quill.Delta) {
        return delta.ops ? new QuillContent(delta.ops) : new QuillContent([])
    }

    public static empty() {
        return new QuillContent([{insert: ''}])
    }

    public constructor(public readonly ops:Quill.DeltaOperation[])
    {
    }
}