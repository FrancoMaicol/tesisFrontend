/////////////// GENERAL TYPES FOR ALL CONTEXTS /////////////////////


/*** * OLD * ***/
//action type in reducers
export type DispatchAction<TEvents, TPayloadsTypes> = {
    event: TEvents,
    payload: TPayloadsTypes,
}
//context type using reducers
export type ContextWhitReducer<TContextState, TDispatchAction> = {
    state: TContextState, 
    dispatch: React.Dispatch<TDispatchAction>
}




/*** *  NEW  * ***/
export type DispatchActionWithPayload<TEvents, TPayloadsTypes> = {
    event: TEvents,
    payload: TPayloadsTypes,
}

//context type using reducers
export type useReducerContext<TContextState, TDispatchAction> = {
    state: TContextState, 
    dispatch: React.Dispatch<TDispatchAction>
}

export type useStateContext<TContextState, TDispatchAction> = {
    state: TContextState, 
    setState: React.Dispatch<TDispatchAction>
}