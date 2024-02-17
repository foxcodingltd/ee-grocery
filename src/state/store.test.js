import {
    store,
    addList,
    removeList,
    addListItem,
    removeListItem,
} from './store.js'

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
        store.lists = [];
        addList(list1);

        expect(store.lists).toHaveLength(1);
        expect(store.lists.find((list) => list.id === 'fake-id')).toEqual(list1);
    });

    it('Throws if adding a new list with duplicate id', () => {
        store.lists = [list1, list2];
        const list3 = {
            id: 'fake-id',
            name: 'Snack list 3',
            items: [],
        };
        expect(() => addList(list3)).toThrow('Failed to add list, duplicated id detected fake-id');

    });

    it('Removes a list', () => {
        store.lists = [list1, list2];
        removeList('fake-id');

        expect(store.lists).toHaveLength(1);
        expect(store.lists[0]).toEqual(list2);
    });

    it('Does nothing if removing a list id that does not exist', () => {
        store.lists = [list1, list2];
        removeList('fake-id-doesnt-exist');

        expect(store.lists).toHaveLength(2);
    });

    it('Does nothing if removing a list id that does not exist with an empty store', () => {
        store.lists = [];
        removeList('fake-id-doesnt-exist');
        expect(store.lists).toHaveLength(0);
    });
});

describe('STORE ITEM ACTIONS', () => {
    it('Adds an item to the correct list', () => {
        store.lists = [list1, list2];
        addListItem('fake-id2', item1);
        expect(store.lists[1].items).toHaveLength(1);
        expect(store.lists[1].items[0]).toEqual(item1);
    });

    it('Removes an item from the correct list', () => {
        store.lists = [list1, {
            id: 'new-fake-list',
            name: 'for-testing',
            items: [{
                id: 'alpha',
                name: 'Alpha',
                tagged: false,
            }],
        }];
        removeListItem('new-fake-list', 'alpha');
        expect(store.lists[1].items).toHaveLength(0);
    });
});
