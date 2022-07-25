import { createModel } from '@rematch/core';
import type { RootModel } from '.';

export type HomeStateType = {
  count: number;
};

const DefaultHomeState: HomeStateType = {
  count: 0,
};

export const homeModel = createModel<RootModel>()({
  state: DefaultHomeState,
  reducers: {
    increment: (state, payload: number) => {
      return {
        count: state.count + payload,
      };
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number, state) {
      console.log('This is current root state', state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
});
