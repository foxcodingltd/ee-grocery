import { v4 as uuidv4 } from 'uuid';

export function createStore() {
    return {
        lists: {},
    }
}

export function addList(listState, store) {
    const id = listState.id || uuidv4();
    if (store.lists[id]) {
        throw new Error(`Failed to add list, duplicated id detected ${id}`);
    }
    const newItem = {
        id,
        name: listState.name || 'List',
        items: listState.items || [],
    };
    store.lists[id] = newItem;
    return newItem;
}

export function removeList(listId, store) {
    if (store.lists[listId]) {
        delete store.lists[listId];
    }
}

export function addListItem(listId, item, store) {
    const list = store.lists[listId]; 
    if (!list) {
        throw new Error(`Failed to add item to list with id ${listId}`);
    }
    list.items.push({
        id: item.id,
        name: item.name || 'Item',
        tagged: item.tagged || false,
    });
}

export function removeListItem(listId, itemId, store) {
    const list = store.lists[listId]; 
    if (!list) {
        return;
    }
    list.items = list.items.filter((item) => item.id !== itemId);
}

