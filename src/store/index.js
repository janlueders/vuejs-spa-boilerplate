import { getDefaultState } from './state';
import { getDefaultGetters } from './getters';
import { getDefaultMutations } from './mutations';
import { getDefaultActions } from './actions';

const state = getDefaultState();
const getters = getDefaultGetters;
const mutations = getDefaultMutations;
const actions = getDefaultActions;

export const store = {
    state,
    getters,
    mutations,
    actions
};


