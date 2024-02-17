export const store = {
    lists: [],
};

export function addList(listState) {
    if (store.lists.find((list) => list.id === listState.id)) {
        throw new Error(`Failed to add list, duplicated id detected ${listState.id}`);
    }
    const newItem = {
        id: listState.id,
        name: listState.name || 'List',
        items: listState.items || [],
    };
    store.lists.push(newItem);
    return newItem;
}

export function removeList(listId) {
    store.lists = store.lists.filter((list) => list.id !== listId);
}

export function addListItem(listId, item) {
    const list = store.lists.find((list) => list.id === listId); 
    if (!list) {
        throw new Error(`Failed to add item to list with id ${listId}`);
    }
    list.items.push({
        id: item.id,
        name: item.name || 'Item',
        tagged: item.tagged || false,
    });
}

export function removeListItem(listId, itemId) {
    const list = store.lists.find((list) => list.id === listId); 
    if (!list) {
        return;
    }
    list.items = list.items.filter((item) => item.id !== itemId);
}
