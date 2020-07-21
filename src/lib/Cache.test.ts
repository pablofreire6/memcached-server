import { Cache } from './Cache';
import { Item } from './Item';

describe('Cache', () => {
  it('should add and get item to cache', () => {
    // Arrange
    let cache = Cache.getInstance();
    let item = new Item();
    item.setKey('apple');
    item.setFlags(0);
    item.setBytes(4);
    item.setCasId(1);
    item.setMessage('apple');

    // Act
    cache.add('apple', item);

    // Assert
    expect(cache.get('apple')).toBe(item);
  });

  it('should remove existing item from cache', () => {
    // Arrange
    let cache = Cache.getInstance();
    let item = new Item();
    item.setKey('apple');
    item.setFlags(0);
    item.setBytes(4);
    item.setCasId(1);
    item.setMessage('apple');
    cache.add('apple', item);

    // Act
    cache.remove('apple');

    // Assert
    expect(cache.get('apple')).toBe(null);
  });

  it('should update existing item from cache', () => {
    // Arrange
    let cache = Cache.getInstance();
    let item = new Item();
    item.setKey('apple');
    item.setFlags(0);
    item.setBytes(4);
    item.setCasId(1);
    item.setMessage('apple');
    cache.add('apple', item);
    let newItem = cache.get('apple');
    newItem.setMessage('appleupdated');
    newItem.setBytes(12);

    // Act
    cache.update('apple', newItem);

    // Assert
    expect(cache.get('apple')).toBe(newItem);
  });

  it('should return null when expired is requested', () => {
    // Arrange
    let cache = Cache.getInstance();
    let item = new Item();
    item.setKey('apple');
    item.setFlags(0);
    item.setBytes(4);
    item.setCasId(1);
    item.setExpirationTime(-100);
    item.setMessage('apple');
    cache.add('apple', item);

    // Act
    // Assert
    expect(cache.get('apple')).toBe(null);
  });

  it('should return null when expired is requested', () => {
    // Arrange
    let cache = Cache.getInstance();
    let item = new Item();
    item.setKey('apple');
    item.setFlags(0);
    item.setBytes(4);
    item.setCasId(1);
    item.setExpirationTime(-100);
    item.setMessage('apple');
    cache.add('apple', item);

    // Act
    cache.clearExpired();

    // Assert
    expect(cache.has('apple')).toBeFalsy();
  });
});
