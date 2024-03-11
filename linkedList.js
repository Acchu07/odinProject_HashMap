export class Node
{
    constructor(key, data, next, previous)
    {
        this.key = key;
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}


export class LinkedList
{

    constructor(node)
    {
        this.head = node;
        this.tail = node;
    }

    listNodeAppend(nodeObjectAdd)
    {
        if (this.head.next === null)
        {
            this.head.next = nodeObjectAdd;
            nodeObjectAdd.previous = this.head;
            this.tail = nodeObjectAdd;
            return;
        }
        this.tail.next = nodeObjectAdd;
        nodeObjectAdd.previous = this.tail;
        this.tail = nodeObjectAdd;
    }

    listNodePrepend(nodeObjectNewHead)
    {
        this.head.prev = nodeObjectNewHead;
        nodeObjectNewHead.next = this.head;
        this.head = nodeObjectNewHead;
    }

    findSize()
    {
        if (this.head.next === null)
        {
            return 1;
        }
        let size = 1;
        let traverseObject = this.head;
        while (traverseObject.next !== null)
        {
            traverseObject = traverseObject.next;
            size++;
        }
        return size;
    }

    static findSizeInternal(nodeObject)
    {
        if (nodeObject.next === null)
        {
            return 1;
        }
        let size = 1;
        while (nodeObject.next !== null)
        {
            nodeObject = nodeObject.next;
            size++;
        }
        return size;


    }

    findHead(nodeObject)
    {
        return this.head;
    }

    findTail(nodeObject)
    {
        return this.tail;
    }

    findNodeAtIndex(indexValue)
    {
        let nodeObjectTraverse = this.head;
        const checkSize = LinkedList.findSizeInternal(nodeObjectTraverse);
        if (checkSize < indexValue)
        {
            console.log('Cannot search index value greater than size')
            return 'Invalid Index';
        }
        let startSearchIndex = 1;
        while (startSearchIndex !== indexValue)
        {
            nodeObjectTraverse = nodeObjectTraverse.next;
            startSearchIndex++;
        }
        return nodeObjectTraverse;
    }

    pop()
    {
        this.tail.previous.next = null;
        this.tail = this.tail.previous;
    }

    contains(valueToSearch)
    {
        let nodeObjectTraverse = this.head;
        while (nodeObjectTraverse.next !== null)
        {
            if (valueToSearch === nodeObjectTraverse.key)
            {
                return true;
            }
            nodeObjectTraverse = nodeObjectTraverse.next;
        }

        if (valueToSearch === nodeObjectTraverse.key)
        {
            return true;
        }
        return false;
    }

    find(valueToSearch)
    {
        let nodeObjectTraverse = this.head;
        let index = 1;
        while (nodeObjectTraverse.next !== null)
        {
            if (valueToSearch === nodeObjectTraverse.key)
            {
                return index;
            }
            nodeObjectTraverse = nodeObjectTraverse.next;
            index++;
        }

        if (valueToSearch === nodeObjectTraverse.key)
        {
            return index;
        }

        return null;
    }

    toString()
    {
        let stringOfValues = '';
        let nodeObjectTraverse = this.head;
        let index = 1;
        while (nodeObjectTraverse.next !== null)
        {
            let stringValue = `(${nodeObjectTraverse.key}) -> `
            stringOfValues += stringValue;
            nodeObjectTraverse = nodeObjectTraverse.next;
        }
        stringOfValues = stringOfValues.concat('', `(${nodeObjectTraverse.key})`)
        return stringOfValues;

    }


    removeNodeFromList(indexValue)
    {
        let nodeObjectToRemove = this.head;
        let objectTraverseIndex = 1;
        let tailIndex = this.findSize();
        if (indexValue === objectTraverseIndex)
        {
            this.head = this.head.next;
            this.head.previous = null;
            return;
        }
        if (indexValue === tailIndex)
        {
            this.tail = this.tail.previous;
            this.tail.next = null;
            return;
        }

        while (objectTraverseIndex !== indexValue)
        {
            nodeObjectToRemove = nodeObjectToRemove.next;
            objectTraverseIndex++;
            if (objectTraverseIndex === indexValue)
            {
                let nodeBeforeObject = nodeObjectToRemove.previous
                let nodeAfterObject = nodeObjectToRemove.next
                nodeBeforeObject.next = nodeAfterObject
                nodeAfterObject.previous = nodeBeforeObject;
                return;
            }
        }

    }

    getKeysOrValues(whatToGet)
    {
        let arrayContainingValues = []
        let objectToTraverse = this.head;
        while (objectToTraverse !== this.tail)
        {
            arrayContainingValues.push(objectToTraverse[whatToGet]);
            objectToTraverse = objectToTraverse.next;
        }
        arrayContainingValues.push(objectToTraverse[whatToGet]);
        return arrayContainingValues;
    }

    getKeysAndValues()
    {
        let arrayContainingValues = []
        let objectToTraverse = this.head;
        while (objectToTraverse !== this.tail)
        {
            const miniArrayKeysAndValues = [];
            miniArrayKeysAndValues.push(objectToTraverse.key);
            miniArrayKeysAndValues.push(objectToTraverse.data);

            arrayContainingValues.push(miniArrayKeysAndValues);
            objectToTraverse = objectToTraverse.next;
        }
        const miniArrayKeysAndValues = [];
        miniArrayKeysAndValues.push(objectToTraverse.key);
        miniArrayKeysAndValues.push(objectToTraverse.data);
        arrayContainingValues.push(miniArrayKeysAndValues);
        
        return arrayContainingValues;

    }
}

