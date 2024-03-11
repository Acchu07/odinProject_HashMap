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
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#arrayCapacity; // ask for help mainly because if i dont modulo this with capacity i will get a value greater than array size but if i do the issue of inability to find value happens when array grows
        }

        return hashCode;
    }

    set(key, value)
    {
        const arrayIndex = this.hash(key); // 1. This will prevent it from creating at a index greater than array capacity as anything % arrayCapacity > arrayCapacity itself
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

    get(key){
        const arrayIndex = this.hash(key); // there is an issue here if the arrayCapacity increases the calculation will screw up as a result i wont find the value even if it is present issue affects set() too
        if (this.#hashArray[arrayIndex].contains(key)){
            return this.#hashArray[arrayIndex].findNodeAtIndex(this.#hashArray[arrayIndex].find(key)).data;
        }
        return null;
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
        const currentIndexesFilled = Math.round(this.#arrayCapacity * this.#loadFactor);
        let counter = 1;
        for (let index = 0; index < this.#arrayCapacity; index++)
        {
            if (this.#hashArray[index] !== undefined)
            {
                counter++;
                if(counter >= currentIndexesFilled){
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
stringMapTest.set('carlos', 'I am the new value.')
stringMapTest.set('mooka', 'I am merely a value.')

console.log(stringMapTest.get('carlos'))

// stringMapTest.printPrivateVariable();




// Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:


// 1 where to put this
// if (index < 0 || index > arrayCapacity) {
//   throw new Error("Trying to access index out of bound");
// }

