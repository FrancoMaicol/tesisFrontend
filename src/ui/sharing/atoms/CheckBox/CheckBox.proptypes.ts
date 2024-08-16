export type CheckBoxProps = {
    id?: number;
    identifier?: string;
    state: boolean;
    dispatch: (state: boolean, id: number, identifier: string) => void;
}
