import * as React from 'react'
import { Popup } from "semantic-ui-react";


export const Initial = (text:string) => <span className='op-content'>{text}</span>
export const InitialObj = (text:string) => <span className='op-content-obj'>{text}</span>
export const Insert = (text:string) => <span className='op-insert'>{text}</span>
export const InsertObj = (text:string) => <span className='op-insert-obj'>{text}</span>
export const Delete = (text:string) => <span className='op-delete'>{text}</span>
export const Embedded = (content:JSX.Element) => <Popup trigger={<i className='fitted file code outline small blue icon'></i>}>
        <Popup.Content>
            {content}
        </Popup.Content>
    </Popup>
export const Excerpted = (content:JSX.Element) => <Popup trigger={<i className='fitted copy outline small blue icon'></i>}>
        <Popup.Content>
            {content}
        </Popup.Content>
    </Popup>