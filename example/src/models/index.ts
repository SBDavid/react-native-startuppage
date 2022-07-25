import type { Models } from '@rematch/core';

import { homeModel } from './Home';

export interface RootModel extends Models<RootModel> {
  homeModel: typeof homeModel;
}

export const models: RootModel = {
  homeModel,
};
