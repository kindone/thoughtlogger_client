import * as React from 'react'
import { Container } from 'semantic-ui-react';
import { Document, Change, SharedString, Delta, JSONStringify, Range } from 'text-versioncontrol';
import { Initial, InitialObj, Excerpted, Embedded, Insert, InsertObj } from './ContentUtil';

interface DocumentViewProps {
    document: Document
    rev: number
    start: number
    end: number
}

export default class DocumentView extends React.Component<DocumentViewProps> {
    constructor(props: DocumentViewProps) {
        super(props)

    }

    public render() {
        const document = this.props.document
        const content = document.getContentAt(this.props.rev)
        return (
            <Container>
                { this.getElements(content, new Range(this.props.start, this.props.end)) }
            </Container>
        )
    }

    private getElements(content:Change, range?:Range) {

        // apply change to content
        const ss = SharedString.fromDelta(content)

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
                else
                    throw new Error(`An unexpected type ${fragment.type}.  Should be initial`)
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
                else
                    throw new Error(`An unexpected type ${fragment.type}.  Should be initial`)

                if(fragment.value.value.hasOwnProperty('excerpted'))
                    elements.push(Excerpted(content))
                else
                    elements.push(Embedded(content))
            }
        }

        return elements
    }
}