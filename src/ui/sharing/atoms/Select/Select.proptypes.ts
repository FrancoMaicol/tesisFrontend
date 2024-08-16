import { SelectStates } from "@types"

export type SelectProps = {
  topText: string;
  elements: Array<{id: number, descripcion: string}>;
  identifier: string;
  dispatch: (states: SelectStates, id: number, identifier: string) => void;
  states: SelectStates;
  id?: number, 
}
