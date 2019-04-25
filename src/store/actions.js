
export const getDefaultActions = {
    sampleAction(context,payload){
        context.commit('updateSampleState',payload);
    },
}
