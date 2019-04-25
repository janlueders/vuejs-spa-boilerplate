import { getDefaultState } from './state';

export const getDefaultMutations = {
    updateTask:(state,payload) =>{
        state.sampleState = payload;
    },
}
