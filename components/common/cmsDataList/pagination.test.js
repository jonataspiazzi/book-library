import CmsDataListPagination from './pagination';

const defaultTest = (props, state) => {
  const propsObj = { 
    skip: props[0], 
    limit: props[1], 
    count: props[2]
  };

  const maxDisplayLength = props[3];

  const stateObj = {
    currentPage: state[0],
    pages: state[1]
  };

  test(`Should [${props}] result in [${state[0]},[${state[1]}]].`, () => {
    const resultState = CmsDataListPagination.getPaginationData(propsObj, maxDisplayLength);
    expect(resultState).toStrictEqual(stateObj);
  });
}

describe('Test CmsDataListPagination', () => {
  defaultTest([ 0, 5, 13, 4], [0, [0, 1, 2]]);
  defaultTest([ 5, 5, 13, 4], [1, [0, 1, 2]]);
  defaultTest([ 7, 5, 13, 4], [1, [0, 1, 2]]);
  defaultTest([10, 5, 13, 4], [2, [0, 1, 2]]);
  defaultTest([12, 5, 13, 4], [2, [0, 1, 2]]);

  defaultTest([ 0, 5, 13, 5], [0, [0, 1, 2]]);
  defaultTest([ 5, 5, 13, 5], [1, [0, 1, 2]]);
  defaultTest([ 7, 5, 13, 5], [1, [0, 1, 2]]);
  defaultTest([10, 5, 13, 5], [2, [0, 1, 2]]);
  defaultTest([12, 5, 13, 5], [2, [0, 1, 2]]);

  defaultTest([ 0, 6, 45, 5], [0, [0, 1, 2, 3, 4]]);
  defaultTest([ 6, 6, 45, 5], [1, [0, 1, 2, 3, 4]]);
  defaultTest([12, 6, 45, 5], [2, [0, 1, 2, 3, 4]]);
  defaultTest([18, 6, 45, 5], [3, [1, 2, 3, 4, 5]]);
  defaultTest([24, 6, 45, 5], [4, [2, 3, 4, 5, 6]]);
  defaultTest([30, 6, 45, 5], [5, [3, 4, 5, 6, 7]]);
  defaultTest([36, 6, 45, 5], [6, [3, 4, 5, 6, 7]]);
  defaultTest([42, 6, 45, 5], [7, [3, 4, 5, 6, 7]]);

  defaultTest([ 0, 6, 50, 6], [0, [0, 1, 2, 3, 4, 5]]);
  defaultTest([ 6, 6, 50, 6], [1, [0, 1, 2, 3, 4, 5]]);
  defaultTest([12, 6, 50, 6], [2, [0, 1, 2, 3, 4, 5]]);
  defaultTest([18, 6, 50, 6], [3, [1, 2, 3, 4, 5, 6]]);
  defaultTest([24, 6, 50, 6], [4, [2, 3, 4, 5, 6, 7]]);
  defaultTest([30, 6, 50, 6], [5, [3, 4, 5, 6, 7, 8]]);
  defaultTest([36, 6, 50, 6], [6, [3, 4, 5, 6, 7, 8]]);
  defaultTest([42, 6, 50, 6], [7, [3, 4, 5, 6, 7, 8]]);
  defaultTest([48, 6, 50, 6], [8, [3, 4, 5, 6, 7, 8]]);
});