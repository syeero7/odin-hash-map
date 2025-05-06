export default class HashMap {
  #buckets;
  #loadFactor;
  #capacity;

  constructor(loadFactor) {
    this.#buckets = [];
    this.#loadFactor = loadFactor || 0.75;
    this.#capacity = 16;
  }

  #hash(key) {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  #throwIfRestricted(index) {
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  set(key, value) {
    if (this.length > this.#loadFactor * this.#capacity) {
      this.#capacity *= 2;
    }

    const index = this.#hash(key);
    this.#throwIfRestricted(index);
    let bucket = this.#buckets[index];

    if (!bucket) {
      this.#buckets[index] = { key, value };
      return;
    }

    do {
      if (bucket.key === key) {
        bucket.value = value;
        return;
      }

      if (!bucket.next) {
        bucket.next = { key, value };
        return;
      }

      bucket = bucket.next;
    } while (bucket);
  }

  get(key) {
    const index = this.#hash(key);
    this.#throwIfRestricted(index);
    let bucket = this.#buckets[index];
    if (!bucket) return null;

    do {
      if (bucket.key === key) return bucket.value;
      bucket = bucket.next;
    } while (bucket);

    return null;
  }

  has(key) {
    const index = this.#hash(key);
    this.#throwIfRestricted(index);
    let bucket = this.#buckets[index];
    if (!bucket) return false;

    do {
      if (bucket.key === key) return true;
      bucket = bucket.next;
    } while (bucket);

    return false;
  }

  remove(key) {
    const index = this.#hash(key);
    this.#throwIfRestricted(index);
    let previous = null;
    let bucket = this.#buckets[index];
    if (!bucket) return false;

    do {
      if (bucket.key === key) {
        if (!previous) this.#buckets[index] = bucket.next;
        else previous.next = bucket.next;

        return true;
      }

      previous = bucket;
      bucket = bucket.next;
    } while (bucket);

    return false;
  }

  get length() {
    let count = 0;

    for (const bucket of this.#buckets) {
      if (!bucket) continue;

      if (bucket.next) {
        let current = bucket;

        while (current) {
          count++;
          current = current.next;
        }
      } else {
        count++;
      }
    }

    return count;
  }

  clear() {
    this.#buckets = [];
  }

  keys() {
    const keys = [];

    for (const bucket of this.#buckets) {
      if (!bucket) continue;

      if (bucket.next) {
        let current = bucket;

        while (current) {
          keys.push(current.key);
          current = current.next;
        }
      } else {
        keys.push(bucket.key);
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.#buckets) {
      if (!bucket) continue;

      if (bucket.next) {
        let current = bucket;

        while (current) {
          values.push(current.value);
          current = current.next;
        }
      } else {
        values.push(bucket.value);
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.#buckets) {
      if (!bucket) continue;

      if (bucket.next) {
        let current = bucket;

        while (current) {
          entries.push([current.key, current.value]);
          current = current.next;
        }
      } else {
        entries.push([bucket.key, bucket.value]);
      }
    }

    return entries;
  }
}
