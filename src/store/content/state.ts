export class ContentState {
    list: IContactItem[] = [];
}

export interface IContactItem {
    id: string;
    scope?: 'fas' | 'fab';
    text: string;
    link: string;
}
