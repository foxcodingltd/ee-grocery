import {
    addList,
    removeList,
    addListItem,
    removeListItem,
} from './store.js'

const testStore = {
    lists: {
        'fake-id': {
            id: 'fake-id',
            name: 'Snack list',
            items: [],
        },
        'fake-id2': {
            id: 'fake-id2',
            name: 'Snack list2',
            items: [],
        },
    },
}

const list1 = {
    id: 'fake-id',
    name: 'Snack list',
    items: [],
};

const list2 = {
    id: 'fake-id2',
    name: 'Snack list2',
    items: [],
};

const item1 = {
    id: 'fake-item-1',
    name: 'My item',
    tagged: false,
};

describe('STORE LIST ACTIONS', () => {
    it('Adds a new list', () => {
        const fakeStore = { lists: {} };
        addList(list1, fakeStore);

        expect(Object.keys(fakeStore.lists)).toHaveLength(1);
        expect(Object.keys(fakeStore.lists)[0]).toEqual(list1.id);
    });

    it('Throws if adding a new list with duplicate id', () => {
        const fakeStore = structuredClone(testStore);
        const list3 = {
            id: 'fake-id',
            name: 'Snack list 3',
            items: [],
        };
        expect(() => addList(list3, fakeStore)).toThrow('Failed to add list, duplicated id detected fake-id');

    });

    it('Removes a list', () => {
        const fakeStore = structuredClone(testStore);
        removeList('fake-id', fakeStore);

        expect(Object.keys(fakeStore.lists)).toHaveLength(1);
        expect(fakeStore.lists['fake-id']).toBe(undefined);
    });

    it('Does nothing if removing a list id that does not exist', () => {
        const fakeStore = structuredClone(testStore);
        removeList('fake-id-doesnt-exist', fakeStore);

        expect(Object.keys(fakeStore.lists)).toHaveLength(2);
    });

    it('Does nothing if removing a list id that does not exist with an empty store', () => {
        const fakeStore = { lists: {} }; 
        removeList('fake-id-doesnt-exist', fakeStore);
        expect(Object.keys(fakeStore.lists)).toHaveLength(0);
    });
});

describe('STORE ITEM ACTIONS', () => {
    it('Adds an item to the correct list', () => {
        const fakeStore = structuredClone(testStore);
        addListItem('fake-id2', item1, fakeStore);
        expect(fakeStore.lists['fake-id2'].items).toHaveLength(1);
        expect(fakeStore.lists['fake-id2'].items[0].id).toEqual(item1.id);
    });

    it('Removes an item from the correct list', () => {
        const fakeStore = { lists: { [list1.id]: list1, 'new-fake-list': {
            id: 'new-fake-list',
            name: 'for-testing',
            items: [{
                id: 'alpha',
                name: 'Alpha',
                tagged: false,
            }],
        }}};
        removeListItem('new-fake-list', 'alpha', fakeStore);
        expect(fakeStore.lists['new-fake-list'].items).toHaveLength(0);
    });
});
