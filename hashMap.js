import test from "./linkedList.js";
import { Node } from "./linkedList.js";
import { LinkedList } from "./linkedList.js";


const testIndex = 644

class HashMap
{
    #arrayCapacity = 16;
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
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#arrayCapacity;
        }

        return hashCode;
    }

    set(key, value)
    {
        const arrayIndex = this.hash(key); // 1. This will prevent it from creating at a index greater than array capacity
        if (this.#hashArray[arrayIndex] === undefined)
        {
            this.#hashArray[arrayIndex] = new LinkedList(new Node(key, value))
            if(this.#checkLoad()){
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

    printPrivateVariable()
    {
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            console.log(`value at ${index} is ${this.#hashArray[index]}`)
        }
        console.log(this.#arrayCapacity)
    }

    #checkLoad()
    {
        const maxEmptyIndexesAllowed = this.#arrayCapacity - Math.round(this.#arrayCapacity * this.#loadFactor);
        let counter = 1;
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            if (this.#hashArray[index] === undefined)
            {
                counter++;
                if(counter > maxEmptyIndexesAllowed){
                    return true;
                }
            }
        }
        return false;
    }
}


const stringMapTest = new HashMap();

stringMapTest.set('carlos', 'I am the old value.')
stringMapTest.set('loscar', 'I am the old value.')
stringMapTest.set('mooka', 'I am the new value.')

// stringMapTest.printPrivateVariable();




// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:


// Issue 1 where to put this
// if (index < 0 || index > arrayCapacity) {
//   throw new Error("Trying to access index out of bound");
// }

