import * as React from 'react'
import { Document, JSONStringify, Delta, SharedString, Change, flattenChanges, Range } from 'text-versioncontrol';
import { Container } from 'semantic-ui-react';
import { Initial, Insert, Delete, InitialObj, InsertObj, Excerpted, Embedded } from './ContentUtil';


interface DocumentWithHistoryViewProps
{
    document: Document
    rev: number
    start: number
    end: number
}

export default class DocumentWithHistoryView extends React.Component<DocumentWithHistoryViewProps> {
    constructor(props: DocumentWithHistoryViewProps) {
        super(props)

    }

    public render() {
        return (
            <Container>
                { this.contentChangesVisualized(this.props.document) }
            </Container>
        )
    }

    private contentChangesVisualized(document:Document) {
        const initialContent = document.getContentAt(this.props.rev)
        const initialRange = new Range(this.props.start, this.props.end) // +1 to skip marker
        const changes = document.getChangesFrom(this.props.rev)
        const croppedChanges = initialRange.cropChanges(changes)

        if(croppedChanges.length > 0) {
            const rangesTransformed = initialRange.mapChanges(changes)
            const curRange = rangesTransformed[rangesTransformed.length-1]
            return this.getElements(initialContent, flattenChanges(...changes), curRange)
        }
        else {
            // const croppedContent = cropContent(initialContent, initialRange.start, initialRange.end)
            return this.getElements(initialContent, new Delta(), initialRange)
        }
    }

    private getElements(content:Change, change?:Change, range?:Range) {

        // apply change to content
        const ss = SharedString.fromDelta(content)
        if(change)
            ss.applyChange(change, '_')

        // mark range
        if(range) {
            const marker = new Delta().retain(range.start).insert('[').retain(range.end-range.start).insert(']')
            ss.applyChange(marker, '_')
        }

        const fragments = ss.toStyledJSON()
        const elements:JSX.Element[] = []

        console.log('fragments:', fragments)

        for(const fragment of fragments)
        {
            if(typeof fragment.value === 'string') {
                if(fragment.type === 'initial') {
                    elements.push(Initial(fragment.value))
                }
                else if(fragment.type === 'inserted') {
                    elements.push(Insert(fragment.value))
                }
                else if(fragment.type === 'deleted') {
                    elements.push(Delete(fragment.value))
                }
            }
            else if(fragment.value.type === 'embed') {
                const text = JSONStringify(fragment.value.value)
                let content:JSX.Element
                if(fragment.type === 'initial') {
                    content = InitialObj(text)
                }
                else if(fragment.type === 'inserted') {
                    content = InsertObj(text)
                }
                else {
                    content = Delete(text)
                }

                if(fragment.value.value.hasOwnProperty('excerpted'))
                    elements.push(Excerpted(content))
                else
                    elements.push(Embedded(content))
            }
        }

        return elements
    }
}
