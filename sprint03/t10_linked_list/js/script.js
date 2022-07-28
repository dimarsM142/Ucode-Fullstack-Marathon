class LinkedList {
    constructor(data) {
      this.data = data;
      this.next = 0;
    }
    add(value) {
      let obj = {};
      let i = 0;
      let data_temp;
      for (data_temp of this) {
            obj[i] = data_temp;
            i++;
      }
      obj[i] = value;
      this.data = obj;
    }
    remove(value) {
        let obj = {};
        let count = 0;
        let find = false;
        let temp_data;
        for (temp_data of this) {
            if (temp_data === value && find == false) {
                find = true;
                continue;
            }
            obj[count] = temp_data;
            count++;
            find = false;
        }
        this.data = obj;
    }
    contains(value) {
        let temp_data;
        for (temp_data of this) {
            if (temp_data == value) {
                return true;
            }
        }
        return false;
    }
    [Symbol.iterator] = () => {
        return {
            current: this.next,
            structure: this.data,
            next() {
                if (this.structure[this.current] == undefined) {
                    return { 
                        done: true 
                    };
                } else {
                    return {
                         done: false, 
                         value: this.structure[this.current++] };
                }
            },
        };
    };
    clear() {
        this.data = {};
    }
    count() {
        let size = 0;
        let temp_data;
        for (temp_data of this) {
            size++;
        }
        return size;
    }
    log() {
        let linked_list = Array.from(this);
        console.log(linked_list.join(","));
    }
}
function createLinkedList(array) {
    return new LinkedList(array);
}