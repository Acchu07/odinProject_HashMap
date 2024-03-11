import { Node } from "./linkedList.js";
import { LinkedList } from "./linkedList.js";

class HashMap
{
    #arrayCapacity = 20;
    #loadFactor = .75;
    #hashArray = [];

    constructor()
    {
        // yet to figure out
    }

    hash(key)
    {
        let hashCode = 0;

        const primeNumber = 7;
        for (let i = 0; i < key.length; i++)
        {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#arrayCapacity; // ask for help mainly because if i dont modulo this with capacity i will get a value greater than array size but if i do the issue of inability to find value happens when array grows
        }

        return hashCode;
    }

    set(key, value)
    {
        const arrayIndex = this.hash(key); // 1. This will prevent it from creating at a index greater than array capacity as anything % arrayCapacity > arrayCapacity itself
        if (this.isUndefined(arrayIndex))
        {
            this.#hashArray[arrayIndex] = new LinkedList(new Node(key, value))
            if (this.#checkLoad())
            {
                this.#arrayCapacity = Math.round(this.#arrayCapacity * 1.5);
            }
            return;
        }
        else if (this.#hashArray[arrayIndex].contains(key))
        {
            this.#hashArray[arrayIndex].findNodeAtIndex(this.#hashArray[arrayIndex].find(key)).data = value;
            return;
        }

        this.#hashArray[arrayIndex].listNodeAppend(new Node(key, value));
    }

    get(key)
    {
        const arrayIndex = this.hash(key); // there is an issue here if the arrayCapacity increases the calculation will screw up as a result i wont find the value even if it is present issue affects set() too
        if (this.isUndefined(arrayIndex))
        {
            return false;
        }
        if (this.#hashArray[arrayIndex].contains(key))
        {
            return this.#hashArray[arrayIndex].findNodeAtIndex(this.#hashArray[arrayIndex].find(key)).data;
        }
        return null;
    }

    has(key)
    {
        const arrayIndex = this.hash(key);
        if (this.isUndefined(arrayIndex))
        {
            return false;
        }
        if (this.#hashArray[arrayIndex].contains(key))
        {
            return true;
        }
        return false;
    }

    remove(key)
    {
        const arrayIndex = this.hash(key);

        if (this.isUndefined(arrayIndex))
        {
            return false;
        }
        if (this.#hashArray[arrayIndex].contains(key))
        {
            this.#hashArray[arrayIndex].removeNodeFromList(this.#hashArray[arrayIndex].find(key))
            return true;
        }
        return false;
    }

    length()
    {
        let totalAmountOfKeys = 0;
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            if (this.#hashArray[index] !== undefined)
            {
                totalAmountOfKeys += this.#hashArray[index].findSize();
            }
        }
        return totalAmountOfKeys;
    }

    clear(){
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            this.#hashArray[index] = undefined
        }
    }

    keys(){
        let arrayContainingKeys = [];
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            if (this.#hashArray[index] !== undefined)
            {
                arrayContainingKeys.push(...this.#hashArray[index].getKeysOrValues('key'))
            }
        }
        return arrayContainingKeys;
    }

    values(){
        let arrayContainingValues = [];
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            if (this.#hashArray[index] !== undefined)
            {
                arrayContainingValues.push(...this.#hashArray[index].getKeysOrValues('data'))
            }
        }
        return arrayContainingValues;
    }

    #checkLoad()
    {
        const maxEmptyIndexesAllowed = this.#arrayCapacity - Math.round(this.#arrayCapacity * this.#loadFactor);
        const currentIndexesFilled = Math.round(this.#arrayCapacity * this.#loadFactor);
        let counter = 1;
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            if (this.#hashArray[index] !== undefined)
            {
                counter++;
                if (counter >= currentIndexesFilled)
                {
                    return true;
                }
            }
        }
        return false;
    }

    isUndefined(arrayIndex)
    {
        if (this.#hashArray[arrayIndex] === undefined)
        {
            return true;
        }
        return false;
    }

    printPrivateVariable()
    {
        // for (let index = 0; index < this.#arrayCapacity; index++)
        // {
        //     console.log(`value at ${index} is ${this.#hashArray[index]}`)
        // }
        // console.log(this.#arrayCapacity)
        console.log(this.#hashArray[18]);
    }
}


const stringMapTest = new HashMap();

stringMapTest.set('carlos', 'I am the old value.')
stringMapTest.set('loscar', 'I am the old value.')
stringMapTest.set('carlos', 'I am the new value.')
stringMapTest.set('raclos', 'I am a value.')
stringMapTest.set('odin', 'somevalue')

// console.log(stringMapTest.get('carlos'))
// console.log(stringMapTest.has('carlos'))
// console.log(stringMapTest.length());


// stringMapTest.printPrivateVariable();
console.log(stringMapTest.keys());





// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:


// 1 where to put this
// if (index < 0 || index > arrayCapacity) {
//   throw new Error("Trying to access index out of bound");
// }

