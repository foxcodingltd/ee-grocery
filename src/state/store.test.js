import {
    store,
    addList,
    removeList,
    addListItem,
    removeListItem,
} from './store.js'


describe('STORE ACTIONS', () => {
    it('Adds a new list', () => {
        addList({
            id: 'fake-id',
            name: 'Snack list',
            items: [],
        });

        expect(store.lists).toHaveLength(1);
        expect(store.lists.find((list) => list.id === 'fake-id')).toBe(true);
    });
});
